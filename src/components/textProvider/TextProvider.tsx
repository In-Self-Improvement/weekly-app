import React, { useState } from "react";
import "./TextProvider.css";

interface TextOption {
  id: number;
  text: string;
  category: "motivation" | "wisdom" | "happiness";
}

const TextProvider = () => {
  const [selectedText, setSelectedText] = useState<string>("");
  const [selectedCategory, setSelectedCategory] =
    useState<string>("motivation");

  const textOptions: TextOption[] = [
    { id: 1, text: "오늘도 좋은 하루 되세요!", category: "happiness" },
    { id: 2, text: "화이팅하세요!", category: "motivation" },
    { id: 3, text: "당신은 할 수 있습니다!", category: "motivation" },
    { id: 4, text: "작은 진전도 진전입니다.", category: "wisdom" },
    { id: 5, text: "실패는 성공의 어머니입니다.", category: "wisdom" },
    { id: 6, text: "오늘 하루도 감사합니다.", category: "happiness" },
  ];

  const handleTextSelect = () => {
    const filteredTexts = textOptions.filter(
      (option) => option.category === selectedCategory
    );
    const randomIndex = Math.floor(Math.random() * filteredTexts.length);
    setSelectedText(filteredTexts[randomIndex].text);
  };

  return (
    <div className="text-provider">
      <div className="category-selector">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="category-select"
        >
          <option value="motivation">동기부여</option>
          <option value="wisdom">지혜</option>
          <option value="happiness">행복</option>
        </select>
      </div>
      <button onClick={handleTextSelect} className="provider-button">
        메시지 받기
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
