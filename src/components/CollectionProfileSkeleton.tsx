import React from 'react';
import { Skeleton } from './ui/skeleton/skeleton';

const CollectionSkeleton = () => {
  return (
    <>
      <Skeleton className="h-[300px]" />

      <div className="pt-[5.5rem] lg:pt-24">
        <div className="relative h-40">
          <Skeleton />
        </div>

        <section className="dark:bg-jacarta-800 bg-light-base relative pb-12 pt-28">
          <div className="absolute left-1/2 top-0 z-10 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center">
            <div className="h-40 w-40 dark:border-jacarta-600 rounded-xl border-[5px] border-white">
              <Skeleton />
            </div>
          </div>

          <div className="container">
            <div className="text-center">
              <Skeleton className="h-12 w-64" />
              <div className="mb-8">
                <Skeleton className="h-4 w-20" />
              </div>

              <div className="dark:bg-jacarta-800 dark:border-jacarta-600 border-jacarta-100 mb-8 inline-flex flex-wrap items-center justify-center rounded-xl border bg-white">
                <div className="dark:border-jacarta-600 border-jacarta-100 w-1/2 rounded-l-xl border-r py-4 hover:shadow-md sm:w-32">
                  <Skeleton className="h-5 w-16" />
                  <Skeleton className="h-3 w-10" />
                </div>
                <div className="dark:border-jacarta-600 border-jacarta-100 w-1/2 rounded-l-xl py-4 hover:shadow-md sm:w-32">
                  <Skeleton className="h-5 w-16" />
                  <Skeleton className="h-3 w-10" />
                </div>
                <div className="dark:border-jacarta-600 border-jacarta-100 w-1/2 rounded-l-xl border-r py-4 hover:shadow-md sm:w-32">
                  <Skeleton className="h-5 w-16" />
                  <Skeleton className="h-3 w-10" />
                </div>
                <div className="dark:border-jacarta-600 border-jacarta-100 w-1/2 rounded-l-xl py-4 hover:shadow-md sm:w-32">
                  <Skeleton className="h-5 w-16" />
                  <Skeleton className="h-3 w-10" />
                </div>
              </div>

              <Skeleton />

              <div className="mt-6 flex items-center justify-center space-x-2.5 relative">
                <div className="dark:border-jacarta-600 dark:hover:bg-jacarta-600 border-jacarta-100 hover:bg-jacarta-100 dark:bg-jacarta-700 rounded-xl border bg-white">
                  <div className="js-likes relative inline-flex h-10 w-10 cursor-pointer items-center justify-center text-sm">
                    <Skeleton className="h-4 w-4" />
                  </div>
                </div>

                <Skeleton className="h-8 w-8" />

                <Skeleton className="h-8 w-8" />
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default CollectionSkeleton;
