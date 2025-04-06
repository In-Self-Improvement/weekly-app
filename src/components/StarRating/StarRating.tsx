"use client";

import { useState } from "react";

interface StarRatingProps {
  initialRating?: number;
  totalStars?: number;
  onRatingChange?: (rating: number) => void;
  readonly?: boolean;
  size?: "sm" | "md" | "lg";
}

export default function StarRating({
  initialRating = 0,
  totalStars = 5,
  onRatingChange,
  readonly = false,
  size = "md",
}: StarRatingProps) {
  const [rating, setRating] = useState(initialRating);
  const [hoverRating, setHoverRating] = useState(0);

  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
  };

  const starSize = sizeClasses[size];

  const handleClick = (selectedRating: number) => {
    if (readonly) return;

    setRating(selectedRating);
    if (onRatingChange) {
      onRatingChange(selectedRating);
    }
  };

  const handleMouseEnter = (hoveredRating: number) => {
    if (readonly) return;
    setHoverRating(hoveredRating);
  };

  const handleMouseLeave = () => {
    if (readonly) return;
    setHoverRating(0);
  };

  return (
    <div className="flex items-center">
      {[...Array(totalStars)].map((_, i) => {
        const starValue = i + 1;
        const isActive = (hoverRating || rating) >= starValue;

        return (
          <span
            key={i}
            onClick={() => handleClick(starValue)}
            onMouseEnter={() => handleMouseEnter(starValue)}
            onMouseLeave={handleMouseLeave}
            className={`cursor-${readonly ? "default" : "pointer"} text-${
              isActive ? "yellow-400" : "gray-300"
            } mr-1`}
            aria-label={`${starValue} 점`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className={starSize}
            >
              <path
                fillRule="evenodd"
                d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                clipRule="evenodd"
              />
            </svg>
          </span>
        );
      })}
      {!readonly && (
        <span className="ml-2 text-sm text-gray-600">
          {rating > 0 ? `${rating}점` : "평가하기"}
        </span>
      )}
    </div>
  );
}
