"use client";

import { useState } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface WeatherData {
  location: string;
  temperature: number;
  description: string;
  humidity: number;
  windSpeed: number;
  icon: string;
}

interface ClothingRecommendation {
  outfit: string;
  items: string[];
  color: string;
}

export default function WeatherPage() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getLocation = () => {
    setLoading(true);
    setError("");

    if (!navigator.geolocation) {
      setError("위치 서비스가 지원되지 않습니다.");
      setLoading(false);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        fetchWeather(position.coords.latitude, position.coords.longitude);
      },
      () => {
        setError("위치 정보를 가져올 수 없습니다.");
        setLoading(false);
      }
    );
  };

  const fetchWeather = async (lat: number, lon: number) => {
    try {
      const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
      if (!API_KEY || API_KEY === "your_openweathermap_api_key_here") {
        setError("날씨 API 키가 설정되지 않았습니다.");
        setLoading(false);
        return;
      }

      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=kr`
      );

      if (!response.ok) {
        throw new Error("날씨 정보를 가져올 수 없습니다.");
      }

      const data = await response.json();

      setWeather({
        location: data.name,
        temperature: Math.round(data.main.temp),
        description: data.weather[0].description,
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        icon: data.weather[0].icon,
      });
    } catch {
      setError("날씨 정보를 가져오는데 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const getClothingRecommendation = (temp: number): ClothingRecommendation => {
    if (temp >= 28) {
      return {
        outfit: "여름 복장",
        items: ["반팔티", "반바지", "샌들", "선글라스", "모자"],
        color: "text-red-600",
      };
    } else if (temp >= 23) {
      return {
        outfit: "초여름 복장",
        items: ["얇은 긴팔", "면바지/치마", "운동화", "가벼운 외투"],
        color: "text-orange-600",
      };
    } else if (temp >= 20) {
      return {
        outfit: "봄/가을 복장",
        items: ["긴팔티", "가디건", "청바지", "운동화"],
        color: "text-green-600",
      };
    } else if (temp >= 15) {
      return {
        outfit: "쌀쌀한 날씨",
        items: ["맨투맨", "후드티", "청바지", "운동화", "얇은 외투"],
        color: "text-blue-600",
      };
    } else if (temp >= 5) {
      return {
        outfit: "겨울 복장",
        items: ["두꺼운 상의", "코트", "목도리", "장갑", "겨울신발"],
        color: "text-purple-600",
      };
    } else {
      return {
        outfit: "혹한기 복장",
        items: ["패딩", "히트텍", "털모자", "두꺼운 장갑", "방한화"],
        color: "text-slate-600",
      };
    }
  };

  const clothing = weather
    ? getClothingRecommendation(weather.temperature)
    : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-md mx-auto pt-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            오늘의 날씨 & 옷차림
          </h1>
          <p className="text-gray-600">
            현재 위치의 실시간 날씨 정보와 기온에 맞는 옷차림을 추천받으세요
          </p>
        </div>

        {!weather && !loading && (
          <Card className="mb-4">
            <CardHeader className="text-center">
              <CardTitle>날씨 정보 가져오기</CardTitle>
              <CardDescription>
                현재 위치의 날씨를 확인하고 옷차림을 추천받으세요
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Button
                onClick={getLocation}
                className="w-full h-16 text-lg font-semibold bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <span className="text-2xl mr-2">📍</span>내 위치 날씨 확인
              </Button>
            </CardContent>
          </Card>
        )}

        {loading && (
          <Card className="mb-4">
            <CardContent className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">날씨 정보를 가져오는 중...</p>
            </CardContent>
          </Card>
        )}

        {error && (
          <Card className="mb-4 border-red-200 bg-red-50">
            <CardContent className="text-center py-4">
              <p className="text-red-600 mb-4">{error}</p>
              <Button onClick={getLocation} variant="outline">
                다시 시도
              </Button>
            </CardContent>
          </Card>
        )}

        {weather && (
          <>
            <Card className="mb-4">
              <CardHeader className="text-center">
                <CardTitle className="flex items-center justify-center gap-2 text-gray-800 font-bold">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
                    alt={weather.description}
                    className="w-12 h-12"
                  />
                  {weather.location}
                </CardTitle>
                <CardDescription className="text-2xl font-bold text-blue-600">
                  {weather.temperature}°C
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-4">
                  <p className="text-lg text-gray-700 mb-2">
                    {weather.description}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                  <div className="text-center">
                    <p className="font-medium">습도</p>
                    <p>{weather.humidity}%</p>
                  </div>
                  <div className="text-center">
                    <p className="font-medium">풍속</p>
                    <p>{weather.windSpeed} m/s</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {clothing && (
              <Card>
                <CardHeader>
                  <CardTitle className={`text-center ${clothing.color}`}>
                    👔 {clothing.outfit}
                  </CardTitle>
                  <CardDescription className="text-center">
                    오늘 기온 {weather.temperature}°C에 추천하는 옷차림
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 gap-2">
                    {clothing.items.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg"
                      >
                        <span className="text-blue-500">•</span>
                        <span className="text-gray-700">{item}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 pt-4 border-t text-center">
                    <Button onClick={getLocation} variant="outline" size="sm">
                      🔄 새로고침
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </>
        )}

        {/* 상세 설명 및 가이드 */}
        <div className="mt-8 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-center text-blue-700 flex items-center justify-center gap-2">
                🌤️ 날씨 앱 사용법
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">📍 위치 기반 날씨 정보</h3>
                <p className="text-gray-600 text-sm">
                  현재 계신 위치를 기반으로 실시간 날씨 정보를 제공합니다. 
                  GPS를 통해 정확한 지역의 기온, 습도, 풍속을 확인할 수 있습니다.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">👔 맞춤형 옷차림 추천</h3>
                <p className="text-gray-600 text-sm">
                  기온에 따라 최적의 옷차림을 자동으로 추천해드립니다. 
                  계절감과 체감온도를 고려한 실용적인 패션 가이드를 제공합니다.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-center text-blue-700">
                🌡️ 기온별 옷차림 가이드
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid gap-3">
                <div className="flex items-center gap-3 p-3 bg-red-50 rounded-lg border border-red-100">
                  <span className="text-red-600 font-bold">28°C+</span>
                  <span className="text-sm text-gray-700">반팔티, 반바지, 샌들 - 한여름 복장</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg border border-orange-100">
                  <span className="text-orange-600 font-bold">23-27°C</span>
                  <span className="text-sm text-gray-700">얇은 긴팔, 면바지 - 초여름 복장</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg border border-green-100">
                  <span className="text-green-600 font-bold">20-22°C</span>
                  <span className="text-sm text-gray-700">긴팔티, 가디건 - 봄/가을 복장</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg border border-blue-100">
                  <span className="text-blue-600 font-bold">15-19°C</span>
                  <span className="text-sm text-gray-700">맨투맨, 후드티 - 쌀쌀한 날씨</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg border border-purple-100">
                  <span className="text-purple-600 font-bold">5-14°C</span>
                  <span className="text-sm text-gray-700">코트, 목도리, 장갑 - 겨울 복장</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <span className="text-gray-600 font-bold">4°C 이하</span>
                  <span className="text-sm text-gray-700">패딩, 히트텍, 방한화 - 혹한기 복장</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-center text-blue-700">
                💡 옷차림 팁
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">🌊 습도 고려하기</h3>
                <p className="text-gray-600 text-sm">
                  습도가 높은 날에는 체감온도가 더 높게 느껴집니다. 
                  습도 70% 이상일 때는 한 단계 시원한 옷차림을 선택하세요.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">💨 바람 고려하기</h3>
                <p className="text-gray-600 text-sm">
                  풍속이 강할 때는 체감온도가 낮아집니다. 
                  바람막이나 외투를 준비하여 체온을 유지하세요.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">🌅 시간대별 변화</h3>
                <p className="text-gray-600 text-sm">
                  하루 종일 외출할 때는 아침과 저녁의 기온차를 고려하여 
                  벗거나 입을 수 있는 겉옷을 준비하세요.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-center text-blue-700">
                ❓ 자주 묻는 질문
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Q. 위치 정보 사용이 안전한가요?</h3>
                <p className="text-gray-600 text-sm">
                  A. 위치 정보는 날씨 데이터 조회에만 사용되며, 별도로 저장되지 않습니다. 
                  브라우저의 GPS 기능을 통해 안전하게 처리됩니다.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Q. 정확도는 어느 정도인가요?</h3>
                <p className="text-gray-600 text-sm">
                  A. OpenWeatherMap API를 사용하여 실시간 기상청 데이터를 제공합니다. 
                  일반적으로 매우 높은 정확도를 보입니다.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Q. 언제 업데이트되나요?</h3>
                <p className="text-gray-600 text-sm">
                  A. 새로고침 버튼을 누르면 최신 날씨 정보로 업데이트됩니다. 
                  실시간 데이터를 제공하므로 수시로 확인하실 수 있습니다.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
