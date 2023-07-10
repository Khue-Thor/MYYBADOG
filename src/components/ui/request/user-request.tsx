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
      <div className='flex flex-col gap-3'>
        <div
          className={`dark:bg-gray-700 pt-1 pb-1 pl-3 pr-3 rounded-md cursor-pointer ${userVoted ? 'bg-blue-500' : ''
            }`}
          onClick={handleLikeClick}
        >
          <span className='text-xs'>{likeVotes}</span>
        </div>
        <div className='pt-1 pb-1 pl-3 pr-3 cursor-pointer' onClick={handleDisLikeClick}>
          <span className='text-xs'>{dislikeVotes}</span>
        </div>
      </div>
    </div>
  );
};

export default UserRequest;
