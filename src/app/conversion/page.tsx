'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function ConversionPage() {
  const [pyeongValue, setPyeongValue] = useState<string>('');
  const [squareMeterValue, setSquareMeterValue] = useState<string>('');
  const [activeInput, setActiveInput] = useState<'pyeong' | 'meter'>('pyeong');

  // 1평 = 3.3058㎡
  const PYEONG_TO_SQM = 3.3058;

  const convertPyeongToSquareMeter = (pyeong: number): number => {
    return pyeong * PYEONG_TO_SQM;
  };

  const convertSquareMeterToPyeong = (sqm: number): number => {
    return sqm / PYEONG_TO_SQM;
  };

  const handlePyeongChange = (value: string) => {
    setPyeongValue(value);
    setActiveInput('pyeong');
    
    if (value === '' || isNaN(Number(value))) {
      setSquareMeterValue('');
      return;
    }
    
    const result = convertPyeongToSquareMeter(Number(value));
    setSquareMeterValue(result.toFixed(2));
  };

  const handleSquareMeterChange = (value: string) => {
    setSquareMeterValue(value);
    setActiveInput('meter');
    
    if (value === '' || isNaN(Number(value))) {
      setPyeongValue('');
      return;
    }
    
    const result = convertSquareMeterToPyeong(Number(value));
    setPyeongValue(result.toFixed(2));
  };

  const clearAll = () => {
    setPyeongValue('');
    setSquareMeterValue('');
    setActiveInput('pyeong');
  };

  const commonSizes = [
    { pyeong: 10, label: '10평 (소형)' },
    { pyeong: 15, label: '15평 (중소형)' },
    { pyeong: 20, label: '20평 (중형)' },
    { pyeong: 25, label: '25평' },
    { pyeong: 30, label: '30평 (중대형)' },
    { pyeong: 40, label: '40평 (대형)' },
    { pyeong: 50, label: '50평' },
  ];

  const handleQuickSelect = (pyeong: number) => {
    handlePyeongChange(pyeong.toString());
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-100 p-4">
      <div className="max-w-4xl mx-auto pt-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            평수 ↔ 제곱미터 변환
          </h1>
          <p className="text-gray-600 text-lg">
            평수와 제곱미터를 쉽게 변환해보세요
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* 평수 입력 */}
          <Card className="p-6">
            <div className="text-center mb-4">
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">평수</h2>
              <p className="text-gray-600 text-sm">평 단위로 입력</p>
            </div>
            <div className="relative">
              <input
                type="number"
                value={pyeongValue}
                onChange={(e) => handlePyeongChange(e.target.value)}
                placeholder="평수를 입력하세요"
                className={`w-full text-3xl text-center border-2 rounded-lg px-4 py-6 focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                  activeInput === 'pyeong' 
                    ? 'border-orange-500 bg-orange-50' 
                    : 'border-gray-300 bg-white'
                }`}
                step="0.01"
              />
              <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-2xl text-gray-500 font-semibold">
                평
              </span>
            </div>
          </Card>

          {/* 제곱미터 입력 */}
          <Card className="p-6">
            <div className="text-center mb-4">
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">제곱미터</h2>
              <p className="text-gray-600 text-sm">㎡ 단위로 입력</p>
            </div>
            <div className="relative">
              <input
                type="number"
                value={squareMeterValue}
                onChange={(e) => handleSquareMeterChange(e.target.value)}
                placeholder="제곱미터를 입력하세요"
                className={`w-full text-3xl text-center border-2 rounded-lg px-4 py-6 focus:outline-none focus:ring-2 focus:ring-red-500 ${
                  activeInput === 'meter' 
                    ? 'border-red-500 bg-red-50' 
                    : 'border-gray-300 bg-white'
                }`}
                step="0.01"
              />
              <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-2xl text-gray-500 font-semibold">
                ㎡
              </span>
            </div>
          </Card>
        </div>

        {/* 변환 정보 */}
        <Card className="p-6 mb-8 bg-gradient-to-r from-orange-100 to-red-100">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">변환 정보</h3>
            <p className="text-gray-700">
              <span className="font-semibold">1평 = 3.3058㎡</span> (약 3.3㎡)
            </p>
            <p className="text-gray-600 text-sm mt-1">
              평수는 한국 전통 면적 단위이며, 제곱미터는 국제표준 면적 단위입니다.
            </p>
          </div>
        </Card>

        {/* 자주 사용하는 평수 */}
        <Card className="p-6 mb-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">
            자주 사용하는 평수
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
            {commonSizes.map((size) => (
              <Button
                key={size.pyeong}
                onClick={() => handleQuickSelect(size.pyeong)}
                variant="outline"
                className="h-auto py-3 px-2 flex flex-col items-center hover:bg-orange-50 hover:border-orange-300"
              >
                <span className="font-semibold text-orange-600">{size.pyeong}평</span>
                <span className="text-xs text-gray-600 mt-1">
                  {convertPyeongToSquareMeter(size.pyeong).toFixed(1)}㎡
                </span>
              </Button>
            ))}
          </div>
        </Card>

        {/* 초기화 버튼 */}
        <div className="text-center mb-8">
          <Button
            onClick={clearAll}
            variant="outline"
            className="px-8 py-3 text-lg hover:bg-gray-50"
          >
            초기화
          </Button>
        </div>

        {/* 홈으로 돌아가기 */}
        <div className="text-center">
          <Button
            onClick={() => window.location.href = '/'}
            className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white px-8 py-3 text-lg"
          >
            홈으로 돌아가기
          </Button>
        </div>
      </div>
    </div>
  );
}