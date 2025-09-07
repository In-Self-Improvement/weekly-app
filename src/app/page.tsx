"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { supabase, type AppRequest } from "@/lib/supabase";
import { ArrowRight, ThumbsUp, Loader2 } from "lucide-react";

export default function RequestPage() {
  const [requestText, setRequestText] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [requests, setRequests] = useState<AppRequest[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [votedRequests, setVotedRequests] = useState<Set<string>>(new Set());

  // 로컬 스토리지에서 투표 기록 불러오기
  useEffect(() => {
    const voted = localStorage.getItem("votedRequests");
    if (voted) {
      setVotedRequests(new Set(JSON.parse(voted)));
    }
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from("app_requests")
      .select("*")
      .order("votes", { ascending: false })
      .order("created_at", { ascending: false });

    if (!error && data) {
      setRequests(data);
    }
    setIsLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!requestText.trim()) return;

    setIsSubmitting(true);
    const { error } = await supabase.from("app_requests").insert({
      request_text: requestText.trim(),
      user_email: userEmail.trim() || null,
    });

    if (!error) {
      setRequestText("");
      setUserEmail("");
      fetchRequests();
      alert("요청이 성공적으로 제출되었습니다!");
    } else {
      alert("요청 제출에 실패했습니다. 다시 시도해주세요.");
    }
    setIsSubmitting(false);
  };

  const handleVote = async (requestId: string) => {
    if (votedRequests.has(requestId)) {
      alert("이미 투표한 요청입니다.");
      return;
    }

    // 투표수 증가
    const { error: updateError } = await supabase
      .rpc("increment", {
        row_id: requestId,
        column_name: "votes",
        table_name: "app_requests",
      })
      .single();

    // RPC가 없는 경우 대체 방법
    if (updateError) {
      const { data: currentData } = await supabase
        .from("app_requests")
        .select("votes")
        .eq("id", requestId)
        .single();

      if (currentData) {
        await supabase
          .from("app_requests")
          .update({ votes: currentData.votes + 1 })
          .eq("id", requestId);
      }
    }

    // 로컬 스토리지에 투표 기록 저장
    const newVoted = new Set(votedRequests);
    newVoted.add(requestId);
    setVotedRequests(newVoted);
    localStorage.setItem("votedRequests", JSON.stringify(Array.from(newVoted)));

    fetchRequests();
  };

  const getStatusBadge = (status: string) => {
    const statusStyles = {
      pending: "bg-gray-100 text-gray-700",
      in_review: "bg-blue-100 text-blue-700",
      in_progress: "bg-yellow-100 text-yellow-700",
      completed: "bg-green-100 text-green-700",
      rejected: "bg-red-100 text-red-700",
    };

    const statusLabels = {
      pending: "검토 대기",
      in_review: "검토 중",
      in_progress: "개발 중",
      completed: "완료",
      rejected: "반려",
    };

    return (
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium ${
          statusStyles[status as keyof typeof statusStyles]
        }`}
      >
        {statusLabels[status as keyof typeof statusLabels]}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-4">
      <div className="max-w-4xl mx-auto pt-8">
        {/* 헤더 */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            🚀 Weekly Apps
          </h1>
          <p className="text-gray-600 mb-4">
            어떤 앱이 필요하신가요? 여러분의 아이디어를 들려주세요!
          </p>
          <Link href="/dashboard">
            <Button className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700">
              현재 앱 둘러보기 <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>

        {/* 요청 폼 */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>💡 새로운 앱 요청하기</CardTitle>
            <CardDescription>
              필요한 앱이나 기능을 자유롭게 요청해주세요
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <textarea
                  value={requestText}
                  onChange={(e) => setRequestText(e.target.value)}
                  placeholder="예: 포모도로 타이머 앱이 있으면 좋겠어요..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
                  rows={4}
                  required
                />
              </div>
              <div>
                <input
                  type="email"
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                  placeholder="이메일 (선택사항 - 개발 완료 시 알림)"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    제출 중...
                  </>
                ) : (
                  "요청 제출하기"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* 요청 목록 */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            📋 요청된 앱 목록
          </h2>

          {isLoading ? (
            <div className="text-center py-8">
              <Loader2 className="h-8 w-8 animate-spin mx-auto text-indigo-500" />
            </div>
          ) : requests.length === 0 ? (
            <Card>
              <CardContent className="text-center py-8 text-gray-500">
                아직 요청된 앱이 없습니다. 첫 번째 요청자가 되어보세요!
              </CardContent>
            </Card>
          ) : (
            requests.map((request) => (
              <Card
                key={request.id}
                className="hover:shadow-lg transition-shadow"
              >
                <CardContent className="pt-6">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex-1">
                      <p className="text-gray-800 mb-2">
                        {request.request_text}
                      </p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span>
                          {new Date(request.created_at).toLocaleDateString(
                            "ko-KR"
                          )}
                        </span>
                        {getStatusBadge(request.status)}
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleVote(request.id)}
                      disabled={votedRequests.has(request.id)}
                      className={
                        votedRequests.has(request.id)
                          ? "opacity-50 cursor-not-allowed"
                          : ""
                      }
                    >
                      <ThumbsUp className="h-4 w-4 mr-1" />
                      {request.votes}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
