import React, { useState } from "react";
import "./TextProvider.css";

const TextProvider = () => {
  const [text, setText] = useState<string>("");

  const handleClick = () => {
    setText("안녕하세요! 이것은 임시 텍스트입니다.");
  };

  return (
    <div className="text-provider">
      <button onClick={handleClick} className="provider-button">
        텍스트 보기
      </button>
      {text && <p className="provided-text">{text}</p>}
    </div>
  );
};

export default TextProvider;
