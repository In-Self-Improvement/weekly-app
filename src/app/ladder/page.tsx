"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface LadderLine {
  from: number;
  to: number;
  level: number;
}

export default function LadderGame() {
  const [playerCount, setPlayerCount] = useState(2);
  const [players, setPlayers] = useState<string[]>(["", ""]);
  const [results, setResults] = useState<string[]>(["", ""]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [ladderLines, setLadderLines] = useState<LadderLine[]>([]);
  const [finalResults, setFinalResults] = useState<
    { player: string; result: string }[]
  >([]);
  const [animationPaths, setAnimationPaths] = useState<number[][]>([]);
  const [selectedPlayer, setSelectedPlayer] = useState<number | null>(null);
  const [selectedPath, setSelectedPath] = useState<number[]>([]);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const LADDER_HEIGHT = 6;
  const LINE_SPACING = 80;
  const LEVEL_HEIGHT = 50;
  const getCanvasWidth = useCallback(
    () => Math.max(300, playerCount * LINE_SPACING + 100),
    [playerCount]
  );
  const CANVAS_HEIGHT = 400;
  const getCanvasLeftPadding = useCallback(
    () => (getCanvasWidth() - (playerCount - 1) * LINE_SPACING) / 2,
    [getCanvasWidth, playerCount]
  );

  // Canvas 그리기 함수들
  const drawLadder = useCallback(
    (ctx: CanvasRenderingContext2D) => {
      ctx.clearRect(0, 0, getCanvasWidth(), CANVAS_HEIGHT);

      // 세로선 그리기
      ctx.strokeStyle = "#1f2937";
      ctx.lineWidth = 3;

      const leftPadding = getCanvasLeftPadding();

      for (let i = 0; i < playerCount; i++) {
        const x = leftPadding + i * LINE_SPACING;
        ctx.beginPath();
        ctx.moveTo(x, 40);
        ctx.lineTo(x, CANVAS_HEIGHT - 40);
        ctx.stroke();
      }

      // 가로선 그리기
      ladderLines.forEach((line) => {
        const x1 = leftPadding + line.from * LINE_SPACING;
        const x2 = leftPadding + line.to * LINE_SPACING;
        const y = 40 + line.level * LEVEL_HEIGHT;

        ctx.beginPath();
        ctx.moveTo(x1, y);
        ctx.lineTo(x2, y);
        ctx.stroke();
      });
    },
    [getCanvasWidth, getCanvasLeftPadding, playerCount, ladderLines]
  );

  const drawSelectedPath = useCallback(
    (ctx: CanvasRenderingContext2D) => {
      if (selectedPath.length === 0) return;

      ctx.strokeStyle = "#dc2626";
      ctx.lineWidth = 5;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      // 그림자 효과
      ctx.shadowColor = "rgba(220, 38, 38, 0.3)";
      ctx.shadowBlur = 3;

      const leftPadding = getCanvasLeftPadding();

      // 선택된 경로 그리기
      for (let i = 0; i < selectedPath.length - 1; i++) {
        const currentPos = selectedPath[i];
        const nextPos = selectedPath[i + 1];
        const currentY = 40 + i * LEVEL_HEIGHT;
        const nextY = 40 + (i + 1) * LEVEL_HEIGHT;

        // 가로선이 있는지 확인
        const hasHorizontalLine = ladderLines.some(
          (line) =>
            line.level === i + 1 &&
            ((line.from === currentPos && line.to === nextPos) ||
              (line.from === nextPos && line.to === currentPos))
        );

        const currentX = leftPadding + currentPos * LINE_SPACING;
        const nextX = leftPadding + nextPos * LINE_SPACING;

        if (hasHorizontalLine) {
          const horizontalY = 40 + (i + 1) * LEVEL_HEIGHT;

          // 수직 이동
          ctx.beginPath();
          ctx.moveTo(currentX, currentY);
          ctx.lineTo(currentX, horizontalY);
          ctx.stroke();

          // 수평 이동
          ctx.beginPath();
          ctx.moveTo(currentX, horizontalY);
          ctx.lineTo(nextX, horizontalY);
          ctx.stroke();

          // 수직 이동
          ctx.beginPath();
          ctx.moveTo(nextX, horizontalY);
          ctx.lineTo(nextX, nextY);
          ctx.stroke();
        } else {
          // 직선 이동
          ctx.beginPath();
          ctx.moveTo(currentX, currentY);
          ctx.lineTo(currentX, nextY);
          ctx.stroke();
        }
      }

      // 그림자 초기화
      ctx.shadowColor = "transparent";
      ctx.shadowBlur = 0;
    },
    [selectedPath, getCanvasLeftPadding, ladderLines]
  );

  const renderCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    drawLadder(ctx);
    drawSelectedPath(ctx);
  }, [drawLadder, drawSelectedPath]);

  // Canvas 업데이트 useEffect
  useEffect(() => {
    renderCanvas();

    // 캔버스 크기가 변경될 때마다 컨테이너 너비도 업데이트
    const canvasContainer = document.getElementById("canvas-container");
    if (canvasContainer) {
      canvasContainer.style.width = `${getCanvasWidth()}px`;
    }
  }, [renderCanvas, getCanvasWidth]);

  const handlePlayerCountChange = (count: number) => {
    setPlayerCount(count);
    // 참가자 수가 변경될 때마다 모든 데이터를 초기화하고 기본값으로 설정
    const newPlayers = Array.from(
      { length: count },
      (_, i) => `참가자${i + 1}`
    );
    const newResults = Array.from({ length: count }, (_, i) => `결과${i + 1}`);
    setPlayers(newPlayers);
    setResults(newResults);

    // 게임이 시작된 상태라면 리셋
    if (gameStarted) {
      resetGame();
    }
  };

  const updatePlayer = (index: number, value: string) => {
    const newPlayers = [...players];
    newPlayers[index] = value;
    setPlayers(newPlayers);
  };

  const updateResult = (index: number, value: string) => {
    const newResults = [...results];
    newResults[index] = value;
    setResults(newResults);
  };

  const generateLadder = () => {
    const lines: LadderLine[] = [];
    for (let level = 1; level <= LADDER_HEIGHT; level++) {
      const usedPositions = new Set<number>();
      for (let i = 0; i < playerCount - 1; i++) {
        if (
          Math.random() > 0.5 &&
          !usedPositions.has(i) &&
          !usedPositions.has(i + 1)
        ) {
          lines.push({ from: i, to: i + 1, level });
          usedPositions.add(i);
          usedPositions.add(i + 1);
        }
      }
    }
    return lines;
  };

  const tracePath = (startIndex: number, lines: LadderLine[]) => {
    const path = [startIndex];
    let currentPosition = startIndex;

    for (let level = 1; level <= LADDER_HEIGHT; level++) {
      const connectionLeft = lines.find(
        (line) => line.level === level && line.to === currentPosition
      );
      const connectionRight = lines.find(
        (line) => line.level === level && line.from === currentPosition
      );

      if (connectionLeft) {
        currentPosition = connectionLeft.from;
      } else if (connectionRight) {
        currentPosition = connectionRight.to;
      }

      path.push(currentPosition);
    }

    return path;
  };

  const startGame = () => {
    setGameStarted(true);
    const lines = generateLadder();
    setLadderLines(lines);

    const paths = players.map((_, index) => tracePath(index, lines));
    setAnimationPaths(paths);
  };

  const handlePlayerClick = (playerIndex: number) => {
    if (!gameStarted || isPlaying) return;

    setSelectedPlayer(playerIndex);
    setIsPlaying(true);

    const path = animationPaths[playerIndex];
    setSelectedPath(path);

    // 결과 즉시 표시
    const finalResult = {
      player: players[playerIndex] || `참가자${playerIndex + 1}`,
      result:
        results[path[path.length - 1]] || `결과${path[path.length - 1] + 1}`,
    };
    setFinalResults([finalResult]);
    setIsPlaying(false);
  };

  const resetGame = () => {
    setFinalResults([]);
    setLadderLines([]);
    setAnimationPaths([]);
    setGameStarted(false);
    setIsPlaying(false);
    setSelectedPlayer(null);
    setSelectedPath([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-4">
      <div className="max-w-4xl mx-auto pt-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-purple-800 mb-2">
            🪜 사다리타기
          </h1>
          <p className="text-purple-600">공정한 선택을 위한 사다리타기 게임</p>
        </div>

        <div className="max-w-4xl mx-auto mb-8">
          <Card className="border-2 border-purple-200">
            <CardHeader className="bg-purple-50">
              <CardTitle className="text-center text-purple-800">
                게임 설정
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2 text-center text-purple-700">
                  참가자 수
                </label>
                <div className="flex gap-2 justify-center">
                  {Array.from({ length: 7 }, (_, i) => i + 2).map((count) => (
                    <Button
                      key={count}
                      variant={playerCount === count ? "default" : "outline"}
                      size="sm"
                      onClick={() => handlePlayerCountChange(count)}
                      className={
                        playerCount === count
                          ? "bg-purple-600 hover:bg-purple-700"
                          : "text-purple-700 border-purple-300 hover:bg-purple-50"
                      }
                    >
                      {count}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="flex gap-4 justify-center">
                {!gameStarted ? (
                  <Button onClick={startGame}>게임 시작</Button>
                ) : (
                  <div className="text-center">
                    <p className="text-sm text-purple-700 mb-2">
                      참가자를 클릭하여 결과를 확인하세요
                    </p>
                    <Button
                      onClick={resetGame}
                      variant="outline"
                      size="sm"
                      className="text-purple-700 border-purple-300 hover:bg-purple-50"
                    >
                      다시 하기
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="max-w-4xl mx-auto mb-8">
          <Card className="border-2 border-purple-200">
            <CardHeader className="bg-purple-50">
              <CardTitle className="text-purple-800">사다리</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative">
                {/* 상단 참가자 입력/버튼 */}
                <div
                  className="relative mb-4"
                  style={{
                    height: "32px",
                    width: `${getCanvasWidth()}px`,
                    margin: "0 auto",
                  }}
                >
                  {players.map((player, index) => {
                    const leftPadding = getCanvasLeftPadding();
                    const lineX = leftPadding + index * LINE_SPACING;
                    const boxWidth = 64; // 박스 너비 명시적 정의
                    const boxLeft = lineX - boxWidth / 2; // 박스 너비의 절반을 빼서 중앙 정렬

                    return gameStarted ? (
                      <button
                        key={`top-btn-${index}`}
                        onClick={() => handlePlayerClick(index)}
                        disabled={isPlaying}
                        style={{
                          position: "absolute",
                          left: `${boxLeft}px`,
                          top: "0px",
                          width: `${boxWidth}px`,
                        }}
                        className={`h-8 text-xs text-center border-2 rounded shadow-sm font-medium transition-all duration-200 ${
                          selectedPlayer === index
                            ? "bg-red-500 border-red-600 text-white"
                            : "bg-blue-100 border-blue-300 text-blue-800"
                        } ${
                          isPlaying
                            ? "cursor-not-allowed opacity-50"
                            : "cursor-pointer"
                        }`}
                      >
                        {player || `참가자${index + 1}`}
                      </button>
                    ) : (
                      <input
                        key={`top-${index}`}
                        type="text"
                        value={player}
                        onChange={(e) => updatePlayer(index, e.target.value)}
                        placeholder={`참가자${index + 1}`}
                        style={{
                          position: "absolute",
                          left: `${boxLeft}px`,
                          top: "0px",
                          width: `${boxWidth}px`,
                        }}
                        className="h-8 text-xs text-center border-2 border-blue-400 rounded focus:outline-none focus:ring-ring bg-blue-50 shadow-sm text-blue-800 font-medium placeholder-blue-600"
                      />
                    );
                  })}
                </div>

                {/* Canvas 사다리 */}
                <div
                  id="canvas-container"
                  className="relative"
                  style={{ width: `${getCanvasWidth()}px`, margin: "0 auto" }}
                >
                  <canvas
                    ref={canvasRef}
                    width={getCanvasWidth()}
                    height={CANVAS_HEIGHT}
                    className="border-2 border-input rounded bg-white shadow-sm"
                    style={{
                      display: "block",
                      width: "100%",
                      height: "auto",
                    }}
                  />
                </div>

                {/* 하단 결과 입력/표시 */}
                <div
                  className="relative mt-4"
                  style={{
                    height: "32px",
                    width: `${getCanvasWidth()}px`,
                    margin: "0 auto",
                  }}
                >
                  {results.map((result, index) => {
                    const leftPadding = getCanvasLeftPadding();
                    const lineX = leftPadding + index * LINE_SPACING;
                    const boxWidth = 64; // 박스 너비 명시적 정의
                    const boxLeft = lineX - boxWidth / 2; // 박스 너비의 절반을 빼서 중앙 정렬

                    return gameStarted ? (
                      <div
                        key={`bottom-display-${index}`}
                        style={{
                          position: "absolute",
                          left: `${boxLeft}px`,
                          top: "0px",
                          width: `${boxWidth}px`,
                        }}
                        className={`h-8 text-xs text-center border-2 rounded shadow-sm font-medium flex items-center justify-center ${
                          finalResults.length > 0 &&
                          selectedPath[selectedPath.length - 1] === index
                            ? "bg-red-500 border-red-600 text-white animate-pulse"
                            : "bg-green-100 border-green-400 text-green-800"
                        }`}
                      >
                        {result || `결과${index + 1}`}
                      </div>
                    ) : (
                      <input
                        key={`bottom-${index}`}
                        type="text"
                        value={result}
                        onChange={(e) => updateResult(index, e.target.value)}
                        placeholder={`결과${index + 1}`}
                        style={{
                          position: "absolute",
                          left: `${boxLeft}px`,
                          top: "0px",
                          width: `${boxWidth}px`,
                        }}
                        className="h-8 text-xs text-center border-2 border-green-400 rounded focus:outline-none focus:ring-ring bg-green-50 shadow-sm text-green-800 font-medium placeholder-green-600"
                      />
                    );
                  })}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {finalResults.length > 0 && (
          <Card className="border-2 border-purple-200">
            <CardHeader className="bg-purple-50">
              <CardTitle className="text-purple-800">🎉 게임 결과</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {finalResults.map((result, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-purple-50 rounded-lg border border-purple-200"
                  >
                    <span className="font-medium text-purple-800">
                      {result.player}
                    </span>
                    <span className="text-lg font-bold text-purple-600">
                      → {result.result}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* 상세 설명 및 가이드 */}
      <div className="mt-8 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-center text-purple-700 flex items-center justify-center gap-2">
              🪜 사다리타기란?
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold text-foreground mb-2">
                🎲 공정한 선택
              </h3>
              <p className="text-muted-foreground text-sm">
                사다리타기는 여러 선택지 중에서 공정하고 랜덤하게 결과를 정하는
                전통적인 방법입니다. 누구도 결과를 예측할 수 없어 완전히 공평한
                선택이 가능합니다.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-2">
                🎯 간편한 결정
              </h3>
              <p className="text-muted-foreground text-sm">
                복잡한 선택 상황에서 빠르고 재미있게 결정을 내릴 수 있습니다.
                친구들과의 게임이나 일상의 작은 선택에서 유용하게 활용하세요.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-center text-purple-700">
              📋 사용법 가이드
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 bg-purple-50 rounded-lg border border-purple-100">
                <span className="text-purple-600 font-bold text-lg">1️⃣</span>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">
                    참가자 설정
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    참가자 수를 선택하고 각자의 이름을 입력하세요. (2~8명까지
                    가능)
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-purple-50 rounded-lg border border-purple-100">
                <span className="text-purple-600 font-bold text-lg">2️⃣</span>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">
                    결과 설정
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    각 결과에 해당하는 내용을 입력하세요. (예: 치킨, 피자, 족발,
                    보쌈)
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-purple-50 rounded-lg border border-purple-100">
                <span className="text-purple-600 font-bold text-lg">3️⃣</span>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">
                    게임 시작
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    &apos;게임 시작&apos; 버튼을 누르면 랜덤하게 생성된 사다리가
                    나타납니다.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-purple-50 rounded-lg border border-purple-100">
                <span className="text-purple-600 font-bold text-lg">4️⃣</span>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">
                    경로 확인
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    원하는 참가자를 클릭하면 해당 경로가 빨간색으로 표시되며
                    결과를 확인할 수 있습니다.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-center text-purple-700">
              🎮 활용 예시
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4">
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">🍕</span>
                  <h3 className="font-semibold text-foreground">음식 결정</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  오늘 뭘 먹을지 고민될 때 - 치킨, 피자, 중국음식, 한식 중에서
                  선택
                </p>
              </div>

              <div className="p-4 bg-green-50 rounded-lg border border-green-100">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">🎬</span>
                  <h3 className="font-semibold text-foreground">영화 선택</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  여러 명이 함께 볼 영화를 정할 때 - 각자 보고싶은 영화를 후보로
                  등록
                </p>
              </div>

              <div className="p-4 bg-orange-50 rounded-lg border border-orange-100">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">🎯</span>
                  <h3 className="font-semibold text-foreground">역할 분담</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  팀 프로젝트에서 역할 분담 - 기획, 디자인, 개발, 발표 등의 역할
                  배정
                </p>
              </div>

              <div className="p-4 bg-pink-50 rounded-lg border border-pink-100">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">🏆</span>
                  <h3 className="font-semibold text-foreground">순서 정하기</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  발표 순서, 게임 순서 등 - 1번, 2번, 3번... 순서로 결과 설정
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-center text-purple-700">
              💡 사다리타기 팁
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold text-foreground mb-2">
                🎲 완전한 랜덤성
              </h3>
              <p className="text-muted-foreground text-sm">
                사다리의 가로선은 컴퓨터가 완전히 랜덤하게 생성합니다. 누구도
                결과를 예측하거나 조작할 수 없어 100% 공정합니다.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-2">
                👥 적정 인원
              </h3>
              <p className="text-muted-foreground text-sm">
                2~8명이 가장 적절합니다. 너무 많으면 화면이 복잡해지고, 너무
                적으면 재미가 반감될 수 있습니다.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-2">
                📱 모바일 최적화
              </h3>
              <p className="text-muted-foreground text-sm">
                모바일에서도 편리하게 사용할 수 있도록 최적화되어 있습니다.
                친구들과 함께 있을 때 언제든 쉽게 사용하세요.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-center text-purple-700">
              ❓ 자주 묻는 질문
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold text-foreground mb-2">
                Q. 결과를 다시 바꿀 수 있나요?
              </h3>
              <p className="text-muted-foreground text-sm">
                A. &apos;새 게임&apos; 버튼을 눌러 처음부터 다시 시작할 수
                있습니다. 새로운 사다리가 생성되어 완전히 다른 결과를 얻게
                됩니다.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-2">
                Q. 정말 공정한가요?
              </h3>
              <p className="text-muted-foreground text-sm">
                A. 네, 컴퓨터의 난수 생성기를 사용하여 완전히 랜덤하게 사다리를
                만듭니다. 사람이 개입할 수 없어 100% 공정합니다.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-2">
                Q. 같은 이름으로 여러 번 참가할 수 있나요?
              </h3>
              <p className="text-muted-foreground text-sm">
                A. 네, 같은 이름도 입력 가능합니다. 하지만 구분을 위해 다른
                이름을 사용하는 것을 권장합니다.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
