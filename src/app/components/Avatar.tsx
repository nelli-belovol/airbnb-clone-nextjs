'use client';
import Image from 'next/image';
import React from 'react';

const Avatar = () => {
  return (
    <Image
      alt='avatar'
      src='/images/placeholder.jpg'
      height={30}
      width={30}
      className='rounded-full'
    />
  );
};

export default Avatar;
