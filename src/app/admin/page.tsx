"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { supabase, type AppRequest } from "@/lib/supabase";
import { Loader2, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AdminPage() {
  const [requests, setRequests] = useState<AppRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  // 클라이언트에서는 서버 API를 통해 인증
  // const ADMIN_PASSWORD는 제거 - 보안상 클라이언트에서 처리하지 않음
  useEffect(() => {
    // 페이지 로드 시 세션 확인
    const savedSession = sessionStorage.getItem("admin_session");
    if (savedSession === "authenticated") {
      setIsAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      fetchRequests();
    }
  }, [isAuthenticated]);

  const fetchRequests = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from("app_requests")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setRequests(data);
    }
    setIsLoading(false);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // 환경변수로 숨겨진 비밀번호 (빌드 시에만 접근 가능)
    const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD;

    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      // 세션 스토리지에 임시 저장 (새로고침 시 유지)
      sessionStorage.setItem("admin_session", "authenticated");
    } else {
      alert("비밀번호가 틀렸습니다.");
    }
  };

  const updateStatus = async (id: string, newStatus: string) => {
    // 권한 재확인
    if (!isAuthenticated) {
      alert("관리자 권한이 필요합니다.");
      return;
    }

    try {
      const { error } = await supabase
        .from("app_requests")
        .update({ status: newStatus })
        .eq("id", id);

      if (error) {
        console.error("Update failed:", error);
        alert("상태 업데이트에 실패했습니다: " + error.message);

        // 인증 오류인 경우 로그아웃 처리
        if (
          error.message.includes("permission") ||
          error.message.includes("unauthorized")
        ) {
          setIsAuthenticated(false);
        }
      } else {
        fetchRequests();
      }
    } catch (error) {
      console.error("Network error:", error);
      alert("네트워크 오류가 발생했습니다.");
    }
  };

  const deleteRequest = async (id: string) => {
    // 권한 재확인
    if (!isAuthenticated) {
      alert("관리자 권한이 필요합니다.");
      return;
    }

    if (confirm("정말 삭제하시겠습니까?")) {
      try {
        const { error } = await supabase
          .from("app_requests")
          .delete()
          .eq("id", id);

        if (error) {
          console.error("Delete failed:", error);
          alert("삭제에 실패했습니다: " + error.message);

          // 인증 오류인 경우 로그아웃 처리
          if (
            error.message.includes("permission") ||
            error.message.includes("unauthorized")
          ) {
            setIsAuthenticated(false);
          }
        } else {
          fetchRequests();
        }
      } catch (error) {
        console.error("Network error:", error);
        alert("네트워크 오류가 발생했습니다.");
      }
    }
  };

  // 로그인 화면
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>관리자 로그인</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="비밀번호를 입력하세요"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <Button type="submit" className="w-full">
                로그인
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  // 관리자 대시보드
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">요청 관리 대시보드</h1>
          <Button onClick={() => router.push("/")} variant="outline">
            메인으로
          </Button>
        </div>

        {isLoading ? (
          <div className="text-center py-8">
            <Loader2 className="h-8 w-8 animate-spin mx-auto" />
          </div>
        ) : (
          <div className="space-y-4">
            {requests.map((request) => (
              <Card key={request.id}>
                <CardContent className="pt-6">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <p className="font-medium mb-2">{request.request_text}</p>
                      <p className="text-sm text-gray-500 mb-2">
                        {request.user_email || "이메일 없음"} |
                        {new Date(request.created_at).toLocaleString("ko-KR")} |
                        투표: {request.votes}
                      </p>

                      {/* 상태 변경 버튼들 */}
                      <div className="flex gap-2 mt-3">
                        <select
                          value={request.status}
                          onChange={(e) =>
                            updateStatus(request.id, e.target.value)
                          }
                          className="px-3 py-1 border rounded-lg text-sm"
                        >
                          <option value="pending">검토 대기</option>
                          <option value="in_review">검토 중</option>
                          <option value="in_progress">개발 중</option>
                          <option value="completed">완료</option>
                          <option value="rejected">반려</option>
                        </select>
                      </div>
                    </div>

                    <Button
                      onClick={() => deleteRequest(request.id)}
                      variant="destructive"
                      size="sm"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
