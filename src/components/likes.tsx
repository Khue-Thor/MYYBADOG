"use client";

import Tippy from "@tippyjs/react";
import React, { useEffect, useState } from "react";

interface Props {
  like: string | number;
  classes?: string;
}

const Likes: React.FC<Props> = ({
  like,
  classes = "absolute top-3 right-3 flex items-center space-x-1 rounded-md",
}) => {
  const [likeState, setLikeState] = useState(
    typeof like === "string" ? +like - 1 : like - 1
  );
  const [likeNumber, setlikeNumber] = useState(likeState);

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    if (likeState >= likeNumber) {
      setlikeNumber((prev) => prev + 1);
    } else {
      setlikeNumber((prev) => prev - 1);
    }
  };

  return (
    <div
      className={classes}
      onClick={(event) => {
        handleLike(event);
      }}
    >
      <Tippy content={<span>Favorite</span>}>
        <button className="js-likes relative cursor-pointer">
          {likeState === likeNumber ? (
            <svg className="icon icon-heart-fill dark:fill-jacarta-200 fill-jacarta-500 hover:fill-red dark:hover:fill-red h-4 w-4">
              <use xlinkHref="/icons.svg#icon-hert-fill"></use>
            </svg>
          ) : (
            <svg className="icon icon-heart-fill dark:fill-jacarta-200 fill-jacarta-500 hover:fill-red dark:hover:fill-red h-4 w-4">
              <use xlinkHref="/icons.svg#icon-heart-fill"></use>
            </svg>
          )}
        </button>
      </Tippy>
      <span className="dark:text-jacarta-200 text-sm">{likeNumber}</span>
    </div>
  );
};

export default Likes;
