import React, { useState } from "react";
import "./TextProvider.css";

interface TextOption {
  id: number;
  text: string;
}

const TextProvider = () => {
  const [selectedText, setSelectedText] = useState<string>("");

  const textOptions: TextOption[] = [
    { id: 1, text: "오늘도 좋은 하루 되세요!" },
    { id: 2, text: "화이팅하세요!" },
    { id: 3, text: "당신은 할 수 있습니다!" },
  ];

  const handleTextSelect = () => {
    const randomIndex = Math.floor(Math.random() * textOptions.length);
    setSelectedText(textOptions[randomIndex].text);
  };

  return (
    <div className="text-provider">
      <button onClick={handleTextSelect} className="provider-button">
        응원 메시지 받기
      </button>
      {selectedText && (
        <div className="text-display">
          <p className="provided-text">{selectedText}</p>
        </div>
      )}
    </div>
  );
};

export default TextProvider;
