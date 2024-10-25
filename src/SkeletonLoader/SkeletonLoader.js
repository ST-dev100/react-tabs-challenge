// SkeletonLoader.js
import React from 'react';
import Skeleton from 'react-loading-skeleton';

const SkeletonLoader = ({ count = 4, height = 200 }) => {
  return (
    <div>
      <Skeleton height={height} count={count} style={{ margin: '10px 0' }} />
    </div>
  );
};

export default SkeletonLoader;
