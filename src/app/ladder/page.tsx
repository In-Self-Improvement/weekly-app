"use client";

import { useState, useRef, useEffect } from "react";
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
  const getCanvasWidth = () => Math.max(300, playerCount * LINE_SPACING + 100);
  const CANVAS_HEIGHT = 400;
  const getCanvasLeftPadding = () =>
    (getCanvasWidth() - (playerCount - 1) * LINE_SPACING) / 2;

  // Canvas 그리기 함수들
  const drawLadder = (ctx: CanvasRenderingContext2D) => {
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
  };

  const drawSelectedPath = (ctx: CanvasRenderingContext2D) => {
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
  };

  const renderCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    drawLadder(ctx);
    drawSelectedPath(ctx);
  };

  // Canvas 업데이트 useEffect
  useEffect(() => {
    renderCanvas();

    // 캔버스 크기가 변경될 때마다 컨테이너 너비도 업데이트
    const canvasContainer = document.getElementById("canvas-container");
    if (canvasContainer) {
      canvasContainer.style.width = `${getCanvasWidth()}px`;
    }
  }, [ladderLines, selectedPath, playerCount]);

  const handlePlayerCountChange = (count: number) => {
    setPlayerCount(count);
    const newPlayers = Array.from(
      { length: count },
      (_, i) => players[i] || `참가자${i + 1}`
    );
    const newResults = Array.from(
      { length: count },
      (_, i) => results[i] || `결과${i + 1}`
    );
    setPlayers(newPlayers);
    setResults(newResults);
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
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            🪜 사다리타기
          </h1>
          <p className="text-gray-600">공정한 선택을 위한 사다리타기 게임</p>
        </div>

        <div className="max-w-2xl mx-auto mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-center">게임 설정</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2 text-center">
                  참가자 수
                </label>
                <div className="flex gap-2 justify-center">
                  {Array.from({ length: 7 }, (_, i) => i + 2).map((count) => (
                    <Button
                      key={count}
                      variant={playerCount === count ? "default" : "outline"}
                      size="sm"
                      onClick={() => handlePlayerCountChange(count)}
                    >
                      {count}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="flex gap-4 justify-center">
                {!gameStarted ? (
                  <Button
                    onClick={startGame}
                    className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                  >
                    게임 시작
                  </Button>
                ) : (
                  <div className="text-center">
                    <p className="text-sm text-gray-600 mb-2">
                      참가자를 클릭하여 결과를 확인하세요
                    </p>
                    <Button onClick={resetGame} variant="outline" size="sm">
                      다시 하기
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="max-w-4xl mx-auto mb-8">
          <Card>
            <CardHeader>
              <CardTitle>사다리</CardTitle>
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
                            : "bg-white border-gray-400 text-gray-900 hover:bg-gray-50 hover:border-gray-500"
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
                        className="h-8 text-xs text-center border-2 border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white shadow-sm text-gray-900 font-medium placeholder-gray-500"
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
                    className="border-2 border-gray-300 rounded bg-gray-50 shadow-sm"
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
                            : "bg-white border-gray-400 text-gray-900"
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
                        className="h-8 text-xs text-center border-2 border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white shadow-sm text-gray-900 font-medium placeholder-gray-500"
                      />
                    );
                  })}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {finalResults.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>🎉 게임 결과</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {finalResults.map((result, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg"
                  >
                    <span className="font-medium text-gray-800">
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
    </div>
  );
}
