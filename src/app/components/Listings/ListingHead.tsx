'use client';
import React from "react";
import useCountries from '@/app/hooks/useCountries';
import { SafeUser } from '@/app/types';
import Image from 'next/image';
import Heading from '../Heading';
import HeartButton from '../HeartButton';

interface ListingHeadProps {
  title: string;
  imageSrc: string;
  locationValue: string;
  id: string;
  currentUser?: SafeUser | null;
}

const ListingHead: React.FC<ListingHeadProps> = ({
  title,
  imageSrc,
  locationValue,
  id,
  currentUser,
}) => {
  const { getByValue } = useCountries();

  const location = getByValue(locationValue);
  return (
    <>
      <Heading
        title={title}
        subtitle={`${location?.region}, ${location?.value}`}
      />
      <div className='relative h-[60vh] w-full overflow-hidden rounded-xl'>
        <Image
          alt='Image'
          src={imageSrc}
          fill
          className='w-full object-cover'
        />
        <div className='absolute right-5 top-5'>
          <HeartButton listingId={id}
            currentUser={currentUser} />
        </div>
      </div>
    </>
  );
};

export default ListingHead;
