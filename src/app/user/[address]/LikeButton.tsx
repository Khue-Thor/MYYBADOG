"use client";
import React, { useState } from "react";

const LikeButton = () => {
  const [likesImage, setLikesImage] = useState(false);

  return (
    <button onClick={() => setLikesImage((prev) => !prev)}>
      {likesImage ? (
        <svg className="icon dark:fill-jacarta-200 fill-jacarta-500 h-4 w-4">
          <use xlinkHref="/icons.svg#icon-heart-fill"></use>
        </svg>
      ) : (
        <svg className="icon dark:fill-jacarta-200 fill-jacarta-500 h-4 w-4">
          <use xlinkHref="/icons.svg#icon-heart"></use>
        </svg>
      )}
    </button>
  );
};

export default LikeButton;
