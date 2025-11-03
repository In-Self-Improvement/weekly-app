import * as Phaser from "phaser";

interface UpgradeOption {
  id: string;
  name: string;
  description: string;
  icon: string;
  type: "stat" | "weapon" | "special";
}

export default class GameScene extends Phaser.Scene {
  private player!: Phaser.GameObjects.Arc;
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private wasd!: {
    W: Phaser.Input.Keyboard.Key;
    A: Phaser.Input.Keyboard.Key;
    S: Phaser.Input.Keyboard.Key;
    D: Phaser.Input.Keyboard.Key;
  };
  private enemies!: Phaser.GameObjects.Group;
  private projectiles!: Phaser.GameObjects.Group;
  private expOrbs!: Phaser.GameObjects.Group;
  private healthOrbs!: Phaser.GameObjects.Group;

  // 게임 상태
  private playerSpeed = 250;
  private playerHealth = 120; // 100 -> 120 (초기 생존성 향상)
  private playerMaxHealth = 120;
  private playerLevel = 1;
  private playerExp = 0;
  private playerExpToNextLevel = 10;

  // 무적 시간 시스템
  private isInvincible = false;

  // 경험치 자석
  private magnetRange = 0; // 업그레이드로 활성화

  // 킬 카운트
  private killCount = 0;

  // 난이도 멀티플라이어
  private enemySpeedMult = 1.0;
  private spawnIntervalMult = 1.0;
  private enemyHealthMult = 1.0;

  // 무기 시스템
  private weapons: Array<{
    type: string;
    level: number;
    lastFired: number;
    cooldown: number;
  }> = [];

  // 타이머
  private gameTime = 0;
  private gameDuration = 300; // 5분 (300초)
  private spawnTimer = 0;

  // UI 텍스트
  private healthText!: Phaser.GameObjects.Text;
  private levelText!: Phaser.GameObjects.Text;
  private timerText!: Phaser.GameObjects.Text;
  private killText!: Phaser.GameObjects.Text;
  private expBar!: Phaser.GameObjects.Graphics;

  constructor() {
    super({ key: "GameScene" });
  }

  create() {
    // 난이도 설정 로드
    if (typeof window !== "undefined") {
      interface WindowWithSettings extends Window {
        difficultySettings?: {
          playerSpeed: number;
          playerHealth: number;
          enemySpeedMult: number;
          spawnIntervalMult: number;
          enemyHealthMult: number;
        };
      }

      const settings = (window as WindowWithSettings).difficultySettings;
      if (settings) {
        this.playerSpeed = settings.playerSpeed;
        this.playerHealth = settings.playerHealth;
        this.playerMaxHealth = settings.playerHealth;
        this.enemySpeedMult = settings.enemySpeedMult;
        this.spawnIntervalMult = settings.spawnIntervalMult;
        this.enemyHealthMult = settings.enemyHealthMult;
      }
    }

    // 플레이어 생성 (파란 원)
    this.player = this.add.circle(400, 300, 20, 0x4a90e2);
    this.physics.add.existing(this.player);
    (this.player.body as Phaser.Physics.Arcade.Body).setCollideWorldBounds(
      true
    );

    // 키보드 입력 설정
    this.cursors = this.input.keyboard!.createCursorKeys();
    this.wasd = {
      W: this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.W),
      A: this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.A),
      S: this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.S),
      D: this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.D),
    };

    // 그룹 생성
    this.enemies = this.add.group();
    this.projectiles = this.add.group();
    this.expOrbs = this.add.group();
    this.healthOrbs = this.add.group();

    // 초기 무기 추가 - 3개로 시작 (레벨업으로 확장)
    for (let i = 0; i < 3; i++) {
      this.weapons.push({
        type: "bullet",
        level: 1,
        lastFired: i * 50, // 각 무기마다 50ms씩 딜레이
        cooldown: 350, // 밸런스 조정
      });
    }

    // UI 생성
    this.createUI();

    // 충돌 설정
    this.physics.add.overlap(
      this.projectiles,
      this.enemies,
      (obj1, obj2) => {
        if (obj1 instanceof Phaser.GameObjects.GameObject && obj2 instanceof Phaser.GameObjects.GameObject) {
          this.hitEnemy(obj1, obj2);
        }
      }
    );
    this.physics.add.overlap(
      this.player,
      this.enemies,
      (obj1, obj2) => {
        if (obj1 instanceof Phaser.GameObjects.GameObject && obj2 instanceof Phaser.GameObjects.GameObject) {
          this.hitPlayer(obj1, obj2);
        }
      }
    );
    this.physics.add.overlap(
      this.player,
      this.expOrbs,
      (obj1, obj2) => {
        if (obj1 instanceof Phaser.GameObjects.GameObject && obj2 instanceof Phaser.GameObjects.GameObject) {
          this.collectExp(obj1, obj2);
        }
      }
    );
    this.physics.add.overlap(
      this.player,
      this.healthOrbs,
      (obj1, obj2) => {
        if (obj1 instanceof Phaser.GameObjects.GameObject && obj2 instanceof Phaser.GameObjects.GameObject) {
          this.collectHealth(obj1, obj2);
        }
      }
    );
  }

  update(time: number, delta: number) {
    // 게임 시간 업데이트
    this.gameTime += delta / 1000;
    this.updateTimer();

    // 게임 승리 체크
    if (this.gameTime >= this.gameDuration) {
      this.gameWin();
      return;
    }

    // 플레이어 이동
    this.handlePlayerMovement();

    // 적 스폰
    this.spawnEnemies(time, delta);

    // 적 AI
    this.updateEnemies();

    // 무기 발사
    this.fireWeapons(time);

    // 경험치 자석 효과
    this.updateExpOrbs();

    // UI 업데이트
    this.updateUI();
  }

  private handlePlayerMovement() {
    const body = this.player.body as Phaser.Physics.Arcade.Body;
    body.setVelocity(0);

    let moveX = 0;
    let moveY = 0;

    if (this.cursors.left.isDown || this.wasd.A.isDown) {
      moveX = -1;
    } else if (this.cursors.right.isDown || this.wasd.D.isDown) {
      moveX = 1;
    }

    if (this.cursors.up.isDown || this.wasd.W.isDown) {
      moveY = -1;
    } else if (this.cursors.down.isDown || this.wasd.S.isDown) {
      moveY = 1;
    }

    // 대각선 이동 정규화
    if (moveX !== 0 && moveY !== 0) {
      moveX *= 0.707;
      moveY *= 0.707;
    }

    body.setVelocity(moveX * this.playerSpeed, moveY * this.playerSpeed);
  }

  private spawnEnemies(time: number, delta: number) {
    this.spawnTimer += delta;

    // 난이도에 따른 스폰 주기 (90초에 걸쳐 점진적 증가)
    const baseInterval = Math.max(800 - this.gameTime * 6, 300);
    const spawnInterval = baseInterval * this.spawnIntervalMult;

    if (this.spawnTimer > spawnInterval) {
      this.spawnTimer = 0;

      // 한 번에 1-3마리 생성 (시간대별 조정)
      const spawnCount =
        this.gameTime < 60
          ? 1
          : this.gameTime < 180
          ? Phaser.Math.Between(1, 2)
          : Phaser.Math.Between(2, 3);

      for (let i = 0; i < spawnCount; i++) {
        // 화면 밖에서 적 생성
        const side = Phaser.Math.Between(0, 3);
        let x, y;

        switch (side) {
          case 0: // 위
            x = Phaser.Math.Between(0, 800);
            y = -30;
            break;
          case 1: // 오른쪽
            x = 830;
            y = Phaser.Math.Between(0, 600);
            break;
          case 2: // 아래
            x = Phaser.Math.Between(0, 800);
            y = 630;
            break;
          default: // 왼쪽
            x = -30;
            y = Phaser.Math.Between(0, 600);
        }

        const enemy = this.add.circle(x, y, 15, 0xe74c3c);
        this.physics.add.existing(enemy);

        // 시간에 따라 체력 증가 (매 분마다 +1) + 난이도 멀티플라이어
        const baseHealth = 2;
        const timeBonus = Math.floor(this.gameTime / 60);
        (enemy as Phaser.GameObjects.Arc & { health: number }).health =
          Math.ceil((baseHealth + timeBonus) * this.enemyHealthMult);

        this.enemies.add(enemy);
      }
    }
  }

  private updateEnemies() {
    this.enemies.children.entries.forEach((enemy) => {
      const enemyObj = enemy as Phaser.GameObjects.Arc;
      const body = enemyObj.body as Phaser.Physics.Arcade.Body;

      // 플레이어를 향해 이동
      const angle = Phaser.Math.Angle.Between(
        enemyObj.x,
        enemyObj.y,
        this.player.x,
        this.player.y
      );

      // 5분 시점에도 플레이어보다 약간 빠른 수준 (290) + 난이도 멀티플라이어
      const baseSpeed = 50 + this.gameTime * 0.8;
      const speed = baseSpeed * this.enemySpeedMult;
      body.setVelocity(Math.cos(angle) * speed, Math.sin(angle) * speed);
    });
  }

  private updateExpOrbs() {
    // 자석 범위가 0이면 자석 효과 없음
    if (this.magnetRange <= 0) return;

    this.expOrbs.children.entries.forEach((orb) => {
      const orbObj = orb as Phaser.GameObjects.Arc;
      const distance = Phaser.Math.Distance.Between(
        this.player.x,
        this.player.y,
        orbObj.x,
        orbObj.y
      );

      // 자석 범위 안에 있으면 플레이어 쪽으로 끌려옴
      if (distance < this.magnetRange) {
        const angle = Phaser.Math.Angle.Between(
          orbObj.x,
          orbObj.y,
          this.player.x,
          this.player.y
        );

        const body = orbObj.body as Phaser.Physics.Arcade.Body;
        const speed = 300;
        body.setVelocity(Math.cos(angle) * speed, Math.sin(angle) * speed);
      }
    });
  }

  private fireWeapons(time: number) {
    this.weapons.forEach((weapon, index) => {
      if (time - weapon.lastFired > weapon.cooldown) {
        weapon.lastFired = time;

        switch (weapon.type) {
          case "bullet":
            this.fireBullet(index);
            break;
          case "laser":
            this.fireLaser();
            break;
          case "orbit":
            // 궤도 무기는 발사가 아닌 지속적인 회전
            break;
        }
      }
    });
  }

  private fireBullet(weaponIndex: number = 0) {
    // 가장 가까운 적 찾기
    const nearestEnemy = this.findNearestEnemy();
    if (!nearestEnemy) return;

    const baseAngle = Phaser.Math.Angle.Between(
      this.player.x,
      this.player.y,
      nearestEnemy.x,
      nearestEnemy.y
    );

    // 한 번에 3발을 부채꼴로 발사!
    const spreadAngles = [-0.2, 0, 0.2]; // 왼쪽, 중앙, 오른쪽

    // 무기 레벨에 따라 데미지 증가
    const weapon = this.weapons[weaponIndex];
    const baseDamage = 1;
    const damage = baseDamage + Math.floor(weapon.level / 2); // 레벨 2마다 데미지 +1

    spreadAngles.forEach((spread) => {
      const angle = baseAngle + spread;
      const projectile = this.add.circle(
        this.player.x,
        this.player.y,
        5,
        0xf39c12
      );
      this.physics.add.existing(projectile);

      const body = projectile.body as Phaser.Physics.Arcade.Body;
      body.setVelocity(Math.cos(angle) * 450, Math.sin(angle) * 450);

      (projectile as Phaser.GameObjects.Arc & { damage: number }).damage =
        damage;
      this.projectiles.add(projectile);

      // 화면 밖 제거
      this.time.delayedCall(3000, () => {
        if (projectile && projectile.scene) {
          projectile.destroy();
        }
      });
    });
  }

  private fireLaser() {
    // 레이저는 관통 공격
    const nearestEnemy = this.findNearestEnemy();
    if (!nearestEnemy) return;

    const laser = this.add.rectangle(
      this.player.x,
      this.player.y,
      200,
      5,
      0x9b59b6
    );
    this.physics.add.existing(laser);

    const angle = Phaser.Math.Angle.Between(
      this.player.x,
      this.player.y,
      nearestEnemy.x,
      nearestEnemy.y
    );

    laser.setRotation(angle);
    (laser as Phaser.GameObjects.Rectangle & { damage: number }).damage = 2;
    this.projectiles.add(laser);

    // 0.2초 후 제거
    this.time.delayedCall(200, () => {
      laser.destroy();
    });
  }

  private findNearestEnemy(): Phaser.GameObjects.Arc | null {
    let nearest: Phaser.GameObjects.Arc | null = null;
    let minDist = Infinity;

    this.enemies.children.entries.forEach((enemy) => {
      const enemyObj = enemy as Phaser.GameObjects.Arc;
      const dist = Phaser.Math.Distance.Between(
        this.player.x,
        this.player.y,
        enemyObj.x,
        enemyObj.y
      );

      if (dist < minDist) {
        minDist = dist;
        nearest = enemyObj;
      }
    });

    return nearest;
  }

  private hitEnemy(
    projectile:
      | Phaser.Types.Physics.Arcade.GameObjectWithBody
      | Phaser.Tilemaps.Tile,
    enemy: Phaser.Types.Physics.Arcade.GameObjectWithBody | Phaser.Tilemaps.Tile
  ) {
    type ProjectileWithDamage = Phaser.GameObjects.GameObject & {
      damage?: number;
      type?: string;
    };
    type EnemyWithHealth = Phaser.GameObjects.GameObject & { health: number };

    const projectileObj = projectile as Phaser.GameObjects.GameObject;
    const enemyObj = enemy as Phaser.GameObjects.GameObject;

    const damage = (projectileObj as ProjectileWithDamage).damage || 1;
    (enemyObj as EnemyWithHealth).health -= damage;

    if ((enemyObj as EnemyWithHealth).health <= 0) {
      // 킬 카운트 증가
      this.killCount++;

      // 경험치 오브 드롭
      const enemyArc = enemyObj as Phaser.GameObjects.Arc;
      this.dropExpOrb(enemyArc.x, enemyArc.y);

      // 체력 아이템 드롭 (15% 확률)
      if (Math.random() < 0.15) {
        this.dropHealthOrb(enemyArc.x, enemyArc.y);
      }

      enemyObj.destroy();
    }

    // 탄환은 제거 (레이저는 관통)
    if ((projectileObj as ProjectileWithDamage).type !== "laser") {
      projectileObj.destroy();
    }
  }

  private hitPlayer(
    player:
      | Phaser.Types.Physics.Arcade.GameObjectWithBody
      | Phaser.Tilemaps.Tile,
    enemy: Phaser.Types.Physics.Arcade.GameObjectWithBody | Phaser.Tilemaps.Tile
  ) {
    // 무적 상태면 데미지 무시
    if (this.isInvincible) return;

    const enemyObj = enemy as Phaser.GameObjects.GameObject;

    this.playerHealth -= 1;

    if (this.playerHealth <= 0) {
      this.gameOver();
      return;
    }

    // 무적 시간 활성화 (1초)
    this.isInvincible = true;
    this.time.delayedCall(1000, () => {
      this.isInvincible = false;
    });

    // 깜빡임 효과 (100ms 간격으로 10회 반복)
    this.tweens.add({
      targets: this.player,
      alpha: 0.3,
      duration: 100,
      yoyo: true,
      repeat: 9,
      onComplete: () => {
        this.player.alpha = 1; // 원래 투명도로 복구
      },
    });

    // 적 제거
    enemyObj.destroy();
  }

  private dropExpOrb(x: number, y: number) {
    const orb = this.add.circle(x, y, 8, 0x2ecc71);
    this.physics.add.existing(orb);
    (orb as Phaser.GameObjects.Arc & { expValue: number }).expValue = 1;
    this.expOrbs.add(orb);
  }

  private dropHealthOrb(x: number, y: number) {
    // 빨간색 하트 모양 아이템
    const health = this.add.circle(x, y, 10, 0xff6b6b);
    this.physics.add.existing(health);
    (health as Phaser.GameObjects.Arc & { healValue: number }).healValue = 10;
    this.healthOrbs.add(health);
  }

  private collectExp(
    player:
      | Phaser.Types.Physics.Arcade.GameObjectWithBody
      | Phaser.Tilemaps.Tile,
    orb: Phaser.Types.Physics.Arcade.GameObjectWithBody | Phaser.Tilemaps.Tile
  ) {
    type OrbWithExpValue = Phaser.GameObjects.GameObject & { expValue: number };
    const orbObj = orb as Phaser.GameObjects.GameObject;
    this.playerExp += (orbObj as OrbWithExpValue).expValue;
    orbObj.destroy();

    // 레벨업 체크
    if (this.playerExp >= this.playerExpToNextLevel) {
      this.levelUp();
    }
  }

  private collectHealth(
    player:
      | Phaser.Types.Physics.Arcade.GameObjectWithBody
      | Phaser.Tilemaps.Tile,
    orb: Phaser.Types.Physics.Arcade.GameObjectWithBody | Phaser.Tilemaps.Tile
  ) {
    type OrbWithHealValue = Phaser.GameObjects.GameObject & {
      healValue: number;
    };

    const orbObj = orb as Phaser.GameObjects.GameObject;
    const healAmount = (orbObj as OrbWithHealValue).healValue;
    this.playerHealth = Math.min(
      this.playerHealth + healAmount,
      this.playerMaxHealth
    );

    orbObj.destroy();
  }

  private levelUp() {
    this.playerLevel++;
    this.playerExp -= this.playerExpToNextLevel;
    this.playerExpToNextLevel = Math.floor(this.playerExpToNextLevel * 1.5);

    // 게임 일시정지
    this.scene.pause();

    // 레벨업 UI 표시
    this.showLevelUpChoice();
  }

  private showLevelUpChoice() {
    // 3개의 랜덤 업그레이드 옵션 생성
    const allUpgrades = this.getAllUpgradeOptions();
    const options = this.getRandomUpgrades(allUpgrades, 3);

    // React UI로 전달
    interface WindowWithHandleLevelUp extends Window {
      handleLevelUp?: (level: number, options: UpgradeOption[]) => void;
    }

    if (
      typeof window !== "undefined" &&
      (window as WindowWithHandleLevelUp).handleLevelUp
    ) {
      (window as WindowWithHandleLevelUp).handleLevelUp!(
        this.playerLevel,
        options
      );
    }

    // 선택 이벤트 리스너 등록
    const handleUpgradeSelected = (event: CustomEvent<UpgradeOption>) => {
      const selectedOption = event.detail;
      this.applyUpgrade(selectedOption);
      this.scene.resume();
      window.removeEventListener(
        "upgradeSelected",
        handleUpgradeSelected as EventListener
      );
    };

    window.addEventListener(
      "upgradeSelected",
      handleUpgradeSelected as EventListener
    );
  }

  private getAllUpgradeOptions() {
    return [
      {
        id: "speed",
        name: "속도 증가",
        description: "이동 속도가 15% 증가합니다",
        icon: "⚡",
        type: "stat" as const,
      },
      {
        id: "health",
        name: "체력 회복",
        description: "최대 체력 +20, 체력 전체 회복",
        icon: "❤️",
        type: "stat" as const,
      },
      {
        id: "damage",
        name: "공격력 증가",
        description: "모든 무기의 데미지 +1",
        icon: "💥",
        type: "stat" as const,
      },
      {
        id: "cooldown",
        name: "공격 속도",
        description: "무기 쿨다운 10% 감소",
        icon: "🔥",
        type: "stat" as const,
      },
      {
        id: "projectile_speed",
        name: "탄환 속도",
        description: "투사체 속도 20% 증가",
        icon: "🚀",
        type: "stat" as const,
      },
      {
        id: "more_bullets",
        name: "탄환 추가",
        description: "무기 2개 추가 획득",
        icon: "🎯",
        type: "weapon" as const,
      },
      {
        id: "area",
        name: "범위 증가",
        description: "투사체 크기 20% 증가",
        icon: "⭕",
        type: "stat" as const,
      },
      {
        id: "magnet",
        name: "자석 효과",
        description: "경험치 획득 범위 증가",
        icon: "🧲",
        type: "special" as const,
      },
    ];
  }

  private getRandomUpgrades(
    allUpgrades: UpgradeOption[],
    count: number
  ): UpgradeOption[] {
    const shuffled = [...allUpgrades].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
  }

  private applyUpgrade(option: UpgradeOption) {
    switch (option.id) {
      case "speed":
        this.playerSpeed *= 1.15;
        break;
      case "health":
        this.playerMaxHealth += 20;
        this.playerHealth = this.playerMaxHealth;
        break;
      case "damage":
        // 모든 무기 데미지 증가는 발사 시 적용
        this.weapons.forEach((weapon) => {
          weapon.level++;
        });
        break;
      case "cooldown":
        this.weapons.forEach((weapon) => {
          weapon.cooldown *= 0.9;
        });
        break;
      case "projectile_speed":
        // 투사체 속도는 전역 변수로 관리 필요
        break;
      case "more_bullets":
        // 무기 2개 추가
        for (let i = 0; i < 2; i++) {
          this.weapons.push({
            type: "bullet",
            level: 1,
            lastFired: 0,
            cooldown: 300,
          });
        }
        break;
      case "area":
        // 투사체 크기 증가
        break;
      case "magnet":
        // 경험치 자석 효과 활성화/확장
        if (this.magnetRange === 0) {
          this.magnetRange = 150; // 첫 업그레이드: 활성화
        } else {
          this.magnetRange += 50; // 재선택: 범위 확장
        }
        break;
    }
  }

  private createUI() {
    this.healthText = this.add
      .text(10, 10, `HP: ${this.playerHealth}/${this.playerMaxHealth}`, {
        fontSize: "20px",
        color: "#ffffff",
      })
      .setScrollFactor(0);

    this.levelText = this.add
      .text(10, 40, `Level: ${this.playerLevel}`, {
        fontSize: "20px",
        color: "#ffffff",
      })
      .setScrollFactor(0);

    this.killText = this.add
      .text(10, 70, `Kills: ${this.killCount}`, {
        fontSize: "20px",
        color: "#ffaa00",
      })
      .setScrollFactor(0);

    this.timerText = this.add
      .text(400, 10, this.formatTime(this.gameDuration), {
        fontSize: "24px",
        color: "#ffffff",
      })
      .setOrigin(0.5, 0)
      .setScrollFactor(0);

    this.expBar = this.add.graphics().setScrollFactor(0);
  }

  private updateUI() {
    // 체력 텍스트 (30% 이하일 때 빨간색)
    const healthColor =
      this.playerHealth / this.playerMaxHealth <= 0.3 ? "#ff0000" : "#ffffff";
    this.healthText.setText(`HP: ${this.playerHealth}/${this.playerMaxHealth}`);
    this.healthText.setColor(healthColor);

    this.levelText.setText(`Level: ${this.playerLevel}`);
    this.killText.setText(`Kills: ${this.killCount}`);

    // 경험치 바
    this.expBar.clear();
    this.expBar.fillStyle(0x2ecc71, 1);
    const expPercent = this.playerExp / this.playerExpToNextLevel;
    this.expBar.fillRect(10, 70, 200 * expPercent, 10);
    this.expBar.lineStyle(2, 0xffffff, 1);
    this.expBar.strokeRect(10, 70, 200, 10);
  }

  private updateTimer() {
    const timeLeft = this.gameDuration - this.gameTime;
    this.timerText.setText(this.formatTime(timeLeft));
  }

  private formatTime(seconds: number): string {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  }

  private gameOver() {
    this.scene.pause();
    this.add
      .text(400, 300, "GAME OVER\n\nPress R to Restart", {
        fontSize: "48px",
        color: "#ff0000",
        align: "center",
      })
      .setOrigin(0.5);

    const rKey = this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.R);
    rKey.on("down", () => {
      this.scene.restart();
    });
  }

  private gameWin() {
    this.scene.pause();
    this.add
      .text(400, 300, "YOU WIN!\n5 Minutes Survived!\n\nPress R to Restart", {
        fontSize: "48px",
        color: "#00ff00",
        align: "center",
      })
      .setOrigin(0.5);

    const rKey = this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.R);
    rKey.on("down", () => {
      this.scene.restart();
    });
  }
}
