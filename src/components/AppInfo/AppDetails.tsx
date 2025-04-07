"use client";

import { useState } from "react";
import { App } from "@/types/app";

interface AppDetailsProps {
  app: App;
}

export default function AppDetails({ app }: AppDetailsProps) {
  const [activeTab, setActiveTab] = useState<
    "details" | "requirements" | "updates"
  >("details");

  const detailsData = {
    developer: "위클리 앱 개발팀",
    version: "1.0.0",
    lastUpdate: "2023-12-01",
    size: "4.2MB",
    language: "한국어",
    category:
      app.id === "app1"
        ? "생산성"
        : app.id === "app2"
        ? "업무 도구"
        : "유틸리티",
  };

  const requirementsData = {
    os: "Windows 10 이상, macOS 11.0 이상, iOS 14.0 이상, Android 10.0 이상",
    processor: "Intel Core i3 이상 또는 동등한 사양",
    memory: "최소 4GB RAM",
    storage: "100MB 이상의 여유 공간",
    internet: "앱 동기화를 위한 인터넷 연결 필요",
  };

  const updatesData = [
    {
      version: "1.0.0",
      date: "2023-12-01",
      notes: "최초 출시 버전",
    },
    {
      version: "0.9.5",
      date: "2023-11-15",
      notes: "베타 테스트 버전 - 주요 버그 수정 및 성능 개선",
    },
    {
      version: "0.9.0",
      date: "2023-10-30",
      notes: "알파 테스트 버전 - 핵심 기능 구현",
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="flex border-b">
        <button
          onClick={() => setActiveTab("details")}
          className={`flex-1 py-3 px-4 font-medium text-sm ${
            activeTab === "details"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          앱 정보
        </button>
        <button
          onClick={() => setActiveTab("requirements")}
          className={`flex-1 py-3 px-4 font-medium text-sm ${
            activeTab === "requirements"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          시스템 요구사항
        </button>
        <button
          onClick={() => setActiveTab("updates")}
          className={`flex-1 py-3 px-4 font-medium text-sm ${
            activeTab === "updates"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          업데이트 내역
        </button>
      </div>

      <div className="p-5">
        {activeTab === "details" && (
          <div className="space-y-4">
            {Object.entries(detailsData).map(([key, value]) => (
              <div key={key} className="flex border-b pb-2">
                <span className="w-1/3 text-gray-600 font-medium capitalize">
                  {key === "lastUpdate"
                    ? "최근 업데이트"
                    : key === "size"
                    ? "앱 크기"
                    : key === "language"
                    ? "지원 언어"
                    : key === "category"
                    ? "카테고리"
                    : key === "developer"
                    ? "개발자"
                    : key === "version"
                    ? "버전"
                    : key}
                </span>
                <span className="w-2/3 text-gray-800">{value}</span>
              </div>
            ))}
          </div>
        )}

        {activeTab === "requirements" && (
          <div className="space-y-4">
            {Object.entries(requirementsData).map(([key, value]) => (
              <div key={key} className="flex border-b pb-2">
                <span className="w-1/3 text-gray-600 font-medium capitalize">
                  {key === "os"
                    ? "운영체제"
                    : key === "processor"
                    ? "프로세서"
                    : key === "memory"
                    ? "메모리"
                    : key === "storage"
                    ? "저장공간"
                    : key === "internet"
                    ? "인터넷"
                    : key}
                </span>
                <span className="w-2/3 text-gray-800">{value}</span>
              </div>
            ))}
          </div>
        )}

        {activeTab === "updates" && (
          <div className="space-y-6">
            {updatesData.map((update, idx) => (
              <div
                key={idx}
                className={`${
                  idx !== updatesData.length - 1 ? "border-b pb-4" : ""
                }`}
              >
                <div className="flex justify-between mb-2">
                  <span className="font-semibold">버전 {update.version}</span>
                  <span className="text-gray-500 text-sm">{update.date}</span>
                </div>
                <p className="text-gray-700">{update.notes}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
