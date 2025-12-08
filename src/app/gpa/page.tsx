"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface Subject {
  id: string;
  name: string;
  credit: number;
  grade: string;
  score: number;
}

interface GPAResult {
  totalGPA: number;
  totalCredits: number;
  totalScore: number;
  subjects: Subject[];
  gradeDistribution: { [key: string]: number };
}

const gradeOptions = [
  { grade: "A+", score: 4.5 },
  { grade: "A", score: 4.0 },
  { grade: "B+", score: 3.5 },
  { grade: "B", score: 3.0 },
  { grade: "C+", score: 2.5 },
  { grade: "C", score: 2.0 },
  { grade: "D+", score: 1.5 },
  { grade: "D", score: 1.0 },
  { grade: "F", score: 0.0 },
];

export default function GPAPage() {
  const [subjects, setSubjects] = useState<Subject[]>([
    {
      id: "1",
      name: "",
      credit: 3,
      grade: "A",
      score: 4.0,
    },
  ]);
  const [result, setResult] = useState<GPAResult | null>(null);
  const [error, setError] = useState<string>("");

  const addSubject = () => {
    const newId = Date.now().toString();
    setSubjects([
      ...subjects,
      {
        id: newId,
        name: "",
        credit: 3,
        grade: "A",
        score: 4.0,
      },
    ]);
  };

  const removeSubject = (id: string) => {
    if (subjects.length > 1) {
      setSubjects(subjects.filter((subject) => subject.id !== id));
    }
  };

  const updateSubject = (
    id: string,
    field: keyof Subject,
    value: string | number
  ) => {
    setSubjects(
      subjects.map((subject) => {
        if (subject.id === id) {
          const updatedSubject = { ...subject, [field]: value };

          // 성적 변경시 점수도 함께 업데이트
          if (field === "grade") {
            const gradeOption = gradeOptions.find(
              (option) => option.grade === value
            );
            updatedSubject.score = gradeOption?.score || 0;
          }

          return updatedSubject;
        }
        return subject;
      })
    );
  };

  const calculateGPA = () => {
    setError("");

    // 입력 검증
    for (const subject of subjects) {
      if (!subject.name.trim()) {
        setError("모든 과목명을 입력해주세요.");
        return;
      }
      if (subject.credit <= 0 || subject.credit > 10) {
        setError("학점은 1~10 사이의 값을 입력해주세요.");
        return;
      }
    }

    // GPA 계산
    let totalScore = 0;
    let totalCredits = 0;
    const gradeDistribution: { [key: string]: number } = {};

    subjects.forEach((subject) => {
      totalScore += subject.score * subject.credit;
      totalCredits += subject.credit;

      gradeDistribution[subject.grade] =
        (gradeDistribution[subject.grade] || 0) + 1;
    });

    const totalGPA = totalCredits > 0 ? totalScore / totalCredits : 0;

    setResult({
      totalGPA: Number(totalGPA.toFixed(2)),
      totalCredits,
      totalScore: Number(totalScore.toFixed(2)),
      subjects: [...subjects],
      gradeDistribution,
    });
  };

  const resetForm = () => {
    setSubjects([
      {
        id: "1",
        name: "",
        credit: 3,
        grade: "A",
        score: 4.0,
      },
    ]);
    setResult(null);
    setError("");
  };

  const getGPACategory = (gpa: number) => {
    if (gpa >= 4.0) {
      return {
        category: "우수",
        description: "매우 우수한 성적입니다!",
        color: "text-green-600",
        bgColor: "bg-green-50 border-green-200",
        advice: [
          "현재의 우수한 성적을 유지하세요",
          "전공 심화 학습이나 연구 활동에 참여해보세요",
          "후배들의 멘토 역할을 해보는 것도 좋습니다",
        ],
      };
    } else if (gpa >= 3.5) {
      return {
        category: "양호",
        description: "양호한 성적입니다",
        color: "text-blue-600",
        bgColor: "bg-blue-50 border-blue-200",
        advice: [
          "조금 더 노력하면 우수한 성적을 받을 수 있습니다",
          "부족한 과목을 집중적으로 학습해보세요",
          "스터디 그룹 참여를 고려해보세요",
        ],
      };
    } else if (gpa >= 3.0) {
      return {
        category: "보통",
        description: "평균적인 성적입니다",
        color: "text-yellow-600",
        bgColor: "bg-yellow-50 border-yellow-200",
        advice: [
          "체계적인 학습 계획을 세워보세요",
          "교수님이나 선배들에게 학습 방법을 조언받아보세요",
          "시간 관리와 학습 효율을 개선해보세요",
        ],
      };
    } else if (gpa >= 2.0) {
      return {
        category: "주의",
        description: "학습 개선이 필요합니다",
        color: "text-orange-600",
        bgColor: "bg-orange-50 border-orange-200",
        advice: [
          "학습 방법을 근본적으로 개선해야 합니다",
          "학업 상담을 받아보시기 바랍니다",
          "기초부터 차근차근 다시 시작해보세요",
        ],
      };
    } else {
      return {
        category: "심각",
        description: "즉시 학습 개선이 필요합니다",
        color: "text-red-600",
        bgColor: "bg-red-50 border-red-200",
        advice: [
          "전문적인 학업 상담이 필요합니다",
          "학습 계획을 완전히 재수립해야 합니다",
          "기초 과목부터 다시 학습하는 것을 권장합니다",
        ],
      };
    }
  };

  const gpaCategory = result ? getGPACategory(result.totalGPA) : null;

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-2xl mx-auto pt-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            학점 계산기 (GPA Calculator)
          </h1>
          <p className="text-muted-foreground">
            과목별 성적과 학점을 입력하여 평균 평점(GPA)을 계산하세요
          </p>
        </div>

        <Card className="mb-4">
          <CardHeader>
            <CardTitle className="text-center text-primary">
              📚 과목 정보 입력
            </CardTitle>
            <CardDescription className="text-center">
              수강한 과목의 정보를 입력해주세요
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {subjects.map((subject, index) => (
              <div
                key={subject.id}
                className="p-4 border border-border rounded-lg bg-muted"
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-medium text-primary">과목 {index + 1}</h3>
                  {subjects.length > 1 && (
                    <Button
                      onClick={() => removeSubject(subject.id)}
                      variant="outline"
                      size="sm"
                      className="text-red-600 hover:bg-red-50"
                    >
                      삭제
                    </Button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-primary mb-1">
                      과목명
                    </label>
                    <input
                      type="text"
                      placeholder="예: 데이터구조"
                      value={subject.name}
                      onChange={(e) =>
                        updateSubject(subject.id, "name", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-input rounded-lg focus:outline-none focus:ring-ring focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-primary mb-1">
                      학점
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="10"
                      value={subject.credit}
                      onChange={(e) =>
                        updateSubject(
                          subject.id,
                          "credit",
                          parseInt(e.target.value) || 1
                        )
                      }
                      className="w-full px-3 py-2 border border-input rounded-lg focus:outline-none focus:ring-ring focus:border-transparent text-center"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-primary mb-1">
                      성적
                    </label>
                    <select
                      value={subject.grade}
                      onChange={(e) =>
                        updateSubject(subject.id, "grade", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-input rounded-lg focus:outline-none focus:ring-ring focus:border-transparent"
                    >
                      {gradeOptions.map((option) => (
                        <option key={option.grade} value={option.grade}>
                          {option.grade} ({option.score})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            ))}

            <div className="flex justify-center">
              <Button onClick={addSubject} variant="outline">
                + 과목 추가
              </Button>
            </div>

            {error && (
              <div className="text-destructive text-sm text-center p-2 bg-destructive/10 rounded-lg border border-destructive/20">
                {error}
              </div>
            )}

            <div className="flex gap-2">
              <Button
                onClick={calculateGPA}
                className="flex-1 h-12 text-lg font-semibold"
              >
                GPA 계산하기
              </Button>

              {result && (
                <Button
                  onClick={resetForm}
                  variant="outline"
                  className="h-12 px-4"
                >
                  초기화
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {result && gpaCategory && (
          <Card className={`mb-4 ${gpaCategory.bgColor}`}>
            <CardHeader className="text-center">
              <CardTitle className={`text-3xl ${gpaCategory.color}`}>
                GPA {result.totalGPA}
              </CardTitle>
              <CardDescription
                className={`text-lg font-semibold ${gpaCategory.color}`}
              >
                {gpaCategory.category}
              </CardDescription>
              <p className="text-sm text-muted-foreground mt-2">
                {gpaCategory.description}
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="text-center p-3 bg-white/50 rounded-lg">
                  <div className="text-lg font-bold text-foreground">
                    {result.totalCredits}
                  </div>
                  <div className="text-sm text-muted-foreground">총 학점</div>
                </div>
                <div className="text-center p-3 bg-white/50 rounded-lg">
                  <div className="text-lg font-bold text-foreground">
                    {result.totalScore}
                  </div>
                  <div className="text-sm text-muted-foreground">총 점수</div>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <div className="text-sm font-medium text-primary mb-2">
                  💡 학업 개선 조언:
                </div>
                {gpaCategory.advice.map((advice, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-2 p-3 bg-white/50 rounded-lg"
                  >
                    <span className="text-indigo-500 mt-1">•</span>
                    <span className="text-primary text-sm">{advice}</span>
                  </div>
                ))}
              </div>

              <div className="p-3 bg-white/50 rounded-lg">
                <div className="text-sm font-medium text-primary mb-2">
                  📊 성적 분포:
                </div>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  {Object.entries(result.gradeDistribution).map(
                    ([grade, count]) => (
                      <div key={grade} className="text-center">
                        <span className="font-medium">{grade}</span>: {count}개
                      </div>
                    )
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardContent className="pt-6">
            <div className="text-center text-sm text-muted-foreground">
              <p className="mb-2">⚠️ 참고사항</p>
              <p className="text-xs">
                학교마다 성적 체계가 다를 수 있습니다. 정확한 GPA는 소속 대학의
                성적 체계를 확인하시기 바랍니다.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* 상세 설명 및 가이드 */}
        <div className="mt-8 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-center text-primary flex items-center justify-center gap-2">
                📊 GPA란 무엇인가요?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold text-foreground mb-2">
                  📚 Grade Point Average
                </h3>
                <p className="text-muted-foreground text-sm">
                  GPA는 학점평균평점으로, 학생의 전체적인 학업 성취도를 나타내는
                  지표입니다. 각 과목의 성적에 학점 수를 곱한 값들을 모두 더하여
                  총 학점 수로 나누어 계산합니다.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">
                  🧮 계산 공식
                </h3>
                <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-100">
                  <p className="text-center text-lg font-mono text-indigo-800">
                    GPA = (성적1×학점1 + 성적2×학점2 + ...) ÷ 총 학점
                  </p>
                  <p className="text-center text-sm text-muted-foreground mt-2">
                    예: A(4.0)×3학점 + B+(3.5)×2학점 = (12.0+7.0) ÷ 5학점 = 3.8
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-center text-primary">
                📋 성적 등급표
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {gradeOptions.map((option) => (
                <div
                  key={option.grade}
                  className="flex items-center justify-between p-3 bg-muted rounded-lg"
                >
                  <span className="font-semibold text-lg">{option.grade}</span>
                  <span className="text-muted-foreground">
                    {option.score} 점
                  </span>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-center text-primary">
                🎯 GPA 활용 방법
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold text-foreground mb-2">
                  🎓 학업 관리
                </h3>
                <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                  <li>• 학기별 성적 추이 파악</li>
                  <li>• 졸업 요건 충족 여부 확인</li>
                  <li>• 전공별 최소 GPA 기준 확인</li>
                  <li>• 성적 향상 목표 설정</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">
                  💼 취업 및 진학
                </h3>
                <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                  <li>• 기업 입사 지원 시 성적 기준</li>
                  <li>• 대학원 진학 시 성적 요구사항</li>
                  <li>• 장학금 신청 시 성적 기준</li>
                  <li>• 교환학생 프로그램 지원 기준</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-center text-primary">
                💡 성적 향상 전략
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold text-foreground mb-2">
                  📈 체계적인 학습
                </h3>
                <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                  <li>• 학기 초 강의계획서 꼼꼼히 분석</li>
                  <li>• 과목별 중요도에 따른 시간 배분</li>
                  <li>• 규칙적인 예습·복습 습관</li>
                  <li>• 중간·기말고사 대비 계획 수립</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">
                  🤝 적극적인 참여
                </h3>
                <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                  <li>• 수업 시간 적극적인 참여</li>
                  <li>• 교수님과의 면담 활용</li>
                  <li>• 스터디 그룹 참여</li>
                  <li>• 과제 및 프로젝트 성실히 수행</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-center text-primary">
                ❓ 자주 묻는 질문
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold text-foreground mb-2">
                  Q. 학교마다 GPA 계산법이 다른가요?
                </h3>
                <p className="text-muted-foreground text-sm">
                  A. 네, 대학마다 성적 등급과 점수가 다를 수 있습니다. 4.0 만점,
                  4.3 만점, 4.5 만점 등 다양한 체계가 있으므로 소속 대학의
                  규정을 확인하세요.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">
                  Q. P/F 과목은 GPA에 포함되나요?
                </h3>
                <p className="text-muted-foreground text-sm">
                  A. Pass/Fail 과목은 일반적으로 GPA 계산에 포함되지 않습니다.
                  단, 학교마다 규정이 다르므로 확인이 필요합니다.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">
                  Q. 재수강한 과목은 어떻게 처리되나요?
                </h3>
                <p className="text-muted-foreground text-sm">
                  A. 재수강 처리 방식은 학교마다 다릅니다. 최고 성적만 반영,
                  평균값 반영, 모두 반영 등 다양한 방식이 있습니다.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
