import React from 'react';

const LoadingSkeleton = () => {
  return (
    <div className="animate-pulse">
      <div className="p-1 dark:hover:bg-jacarta-600 hover:bg-gray-400 hover:rounded-xl flex pr-3 pl-3 pt-2 pb-2">
        <div className="w-9 h-9 bg-gray-200 rounded-lg mr-5"></div>
        <div className="flex flex-col">
          <div className="w-36 h-4 bg-gray-200 rounded"></div>
          <div className="w-24 h-3 mt-1 bg-gray-200 rounded"></div>
        </div>
      </div>
      <div className="p-1 dark:hover:bg-jacarta-600 hover:bg-gray-400 hover:rounded-xl flex pr-3 pl-3 pt-2 pb-2">
        <div className="w-9 h-9 bg-gray-200 rounded-lg mr-5"></div>
        <div className="flex flex-col">
          <div className="w-36 h-4 bg-gray-200 rounded"></div>
          <div className="w-24 h-3 mt-1 bg-gray-200 rounded"></div>
        </div>
      </div>
      <div className="p-1 dark:hover:bg-jacarta-600 hover:bg-gray-400 hover:rounded-xl flex pr-3 pl-3 pt-2 pb-2">
        <div className="w-9 h-9 bg-gray-200 rounded-lg mr-5"></div>
        <div className="flex flex-col">
          <div className="w-36 h-4 bg-gray-200 rounded"></div>
          <div className="w-24 h-3 mt-1 bg-gray-200 rounded"></div>
        </div>
      </div>
      <div className="p-1 dark:hover:bg-jacarta-600 hover:bg-gray-400 hover:rounded-xl flex pr-3 pl-3 pt-2 pb-2">
        <div className="w-9 h-9 bg-gray-200 rounded-lg mr-5"></div>
        <div className="flex flex-col">
          <div className="w-36 h-4 bg-gray-200 rounded"></div>
          <div className="w-24 h-3 mt-1 bg-gray-200 rounded"></div>
        </div>
      </div>
      <div className="p-1 dark:hover:bg-jacarta-600 hover:bg-gray-400 hover:rounded-xl flex pr-3 pl-3 pt-2 pb-2">
        <div className="w-9 h-9 bg-gray-200 rounded-lg mr-5"></div>
        <div className="flex flex-col">
          <div className="w-36 h-4 bg-gray-200 rounded"></div>
          <div className="w-24 h-3 mt-1 bg-gray-200 rounded"></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingSkeleton