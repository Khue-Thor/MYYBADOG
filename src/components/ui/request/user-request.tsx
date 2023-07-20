import React, { useState } from 'react';

const UserRequest = ({ title, details }) => {
  const [likeVotes, setLikeVotes] = useState(0);
  const [dislikeVotes, setDislikeVotes] = useState(0)
  const [userVoted, setUserVoted] = useState(false);
  const [userLikeVoted, setUserLikeVoted] = useState(false);
  const [userDisLikeVoted, setUserDisLikeVoted] = useState(false)

  const handleLikeClick = () => {
    if (userVoted) {
      setLikeVotes((prevLikes) => prevLikes - 1);
      setUserVoted(false);
      setUserLikeVoted(false);
    } else {
      setLikeVotes((prevLikes) => prevLikes + 1);
      setUserVoted(true);
      setUserLikeVoted(true);
    }
  };

  const handleDisLikeClick = () => {
    if (userVoted) {
      setDislikeVotes((prevLikes) => prevLikes - 1);
      setUserVoted(false);
      setUserDisLikeVoted(false);
    } else {
      setDislikeVotes((prevLikes) => prevLikes + 1);
      setUserVoted(true);
      setUserDisLikeVoted(true);
    }
  };

  return (
    <div className='flex flex-row justify-between gap-7'>
      <div className='md:w-[470px] overflow-hidden text-ellipsis flex flex-col gap-2 hover:cursor-pointer'>
        <p className='truncate'>{title}</p>
        <p className='text-sm text-gray-600 line-clamp-2 max-h-14 overflow-hidden text-ellipsis'>{details}</p>
        <div>
          <p className='text-xs'>Status</p>
        </div>
      </div>
      <div className='flex flex-col gap-2'>
        <div
          className={`dark:bg-gray-700 dark:hover:bg-gray-600 pl-3 pr-3 flex items-center gap-2 rounded-md cursor-pointer ${userVoted ? 'bg-blue-500' : ''
            }`}
          onClick={handleLikeClick}
        >
          {userLikeVoted ? (
            <span className='w-[20px] h-[20px] mt-2'>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                width={16}
                height={16}
                className="fill-jacarta-500 h-[13px] w-[13px] dark:fill-white cursor-pointer"
              >
                <path fill="none" d="M0 0h24v24H0z" />
                <path d="M17.293 5.293a1 1 0 010 1.414l-9 9a1 1 0 01-1.414 0l-5-5a1 1 0 011.414-1.414L8 13.586l8.293-8.293a1 1 0 011.414 0z" />
              </svg>
            </span>
          ) : (
            <span className='w-[20px] h-[20px] mt-2'>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                width={16}
                height={16}
                className="fill-jacarta-500 h-[20px] w-[20px] dark:fill-jacarta-600 cursor-pointer"
              >
                <path fill="none" d="M0 0h24v24H0z" />
                <path d="M10 6l5 5H5l5-5z" />
              </svg>
            </span>
          )}
          <span className="text-xs">{likeVotes}</span>
        </div>
        <div className='pl-3 pr-3 cursor-pointer flex flex-row gap-2 items-center' onClick={handleDisLikeClick}>
          {userDisLikeVoted ? (
            <span className='w-[20px] h-[20px] mt-2'>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                width={16}
                height={16}
                className="fill-jacarta-500 h-[13px] w-[13px] dark:fill-white cursor-pointer"
              >
                <path fill="none" d="M0 0h24v24H0z" />
                <path d="M17.293 5.293a1 1 0 010 1.414l-9 9a1 1 0 01-1.414 0l-5-5a1 1 0 011.414-1.414L8 13.586l8.293-8.293a1 1 0 011.414 0z" />
              </svg>
            </span>
          ) : (
            <span className='w-[20px] h-[20px] mt-2'>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                width={16}
                height={16}
                className="fill-jacarta-500 h-[20px] w-[20px] dark:fill-jacarta-600 cursor-pointer"
              >
                <path fill="none" d="M0 0h24v24H0z" />
                <path d="M5 10l5 5 5-5H5z" />
              </svg>
            </span>
          )}
          <span className='text-xs'>{dislikeVotes}</span>
        </div>

      </div>
    </div>
  );
};

export default UserRequest;
