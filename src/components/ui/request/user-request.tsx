import React, { useState } from 'react';

const UserRequest = ({ title, details }) => {
  const [likeVotes, setLikeVotes] = useState(0);
  const [dislikeVotes, setDislikeVotes] = useState(0)
  const [userVoted, setUserVoted] = useState(false);

  const handleLikeClick = () => {
    if (userVoted) {
      setLikeVotes((prevLikes) => prevLikes - 1);
      setUserVoted(false);
    } else {
      setLikeVotes((prevLikes) => prevLikes + 1);
      setUserVoted(true);
    }
  };

  const handleDisLikeClick = () => {
    if (userVoted) {
      setDislikeVotes((prevLikes) => prevLikes - 1);
      setUserVoted(false);
    } else {
      setDislikeVotes((prevLikes) => prevLikes + 1);
      setUserVoted(true);
    }
  };

  return (
    <div className='flex flex-row justify-between'>
      <div className='w-[470px] overflow-hidden text-ellipsis flex flex-col gap-2'>
        <p className='truncate'>{title}</p>
        <p className='text-sm text-gray-600'>{details}</p>
        <div>
          <p className='text-xs'>Status</p>
        </div>
      </div>
      <div className='flex flex-col gap-2'>
        <div
          className={`dark:bg-gray-700 dark:hover:bg-gray-600 pt-1 pb-1 pl-3 pr-3 flex items-center gap-2 rounded-md cursor-pointer ${userVoted ? 'bg-blue-500' : ''
            }`}
          onClick={handleLikeClick}
        >
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              width={26}
              height={26}
              className="fill-jacarta-500 h-[20px] w-[20px] dark:fill-jacarta-600 cursor-pointer"
            >
              <path fill="none" d="M0 0h24v24H0z" />
              <path d="M10 6l5 5H5l5-5z" />
            </svg>
          </span>
          <span className='text-xs'>{likeVotes}</span>
        </div>
        <div className='pt-1 pb-1 pl-3 pr-3 cursor-pointer flex flex-row gap-2 items-center' onClick={handleDisLikeClick}>
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              width={26}
              height={26}
              className="fill-jacarta-500 h-[20px] w-[20px] dark:fill-jacarta-600 cursor-pointer"
            >
              <path fill="none" d="M0 0h24v24H0z" />
              <path d="M10 14l-5-5h10l-5 5z" />
            </svg>
          </span>
          <span className='text-xs'>{dislikeVotes}</span>
        </div>
      </div>
    </div>
  );
};

export default UserRequest;
