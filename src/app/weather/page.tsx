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
            현재 위치의 날씨와 추천 옷차림을 확인하세요
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
              <Button onClick={getLocation} className="w-full">
                📍 내 위치 날씨 확인
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
                <CardTitle className="flex items-center justify-center gap-2">
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
      </div>
    </div>
  );
}