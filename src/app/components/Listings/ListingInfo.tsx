import useCountries from '@/app/hooks/useCountries';
import { SafeUser } from '@/app/types';
import dynamic from 'next/dynamic';
import { IconType } from 'react-icons';
import Avatar from '../Avatar';
import ListingCategory from './ListingCategory';
import React from "react";

const Map = dynamic(() => import('../Map'));

interface ListingInfoProps {
  user: SafeUser;
  category:
    | {
        label: string;
        icon: IconType;
        description: string;
      }
    | undefined;
  roomCount: number;
  bathroomCount: number;
  guestCount: number;
  locationValue: string;
  description: string;
}

const ListingInfo: React.FC<ListingInfoProps> = ({
  user,
  category,
  roomCount,
  bathroomCount,
  guestCount,
  description,
  locationValue,
}) => {
  const { getByValue } = useCountries();

  const coordinates = getByValue(locationValue)?.latlng;

  return (
    <div className='col-span-4 flex flex-col gap-8'>
      <div className='flex flex-col gap-2'>
        <div className='flex flex-row items-center gap-2 text-xl font-semibold'>
          <div>Hosted by {user?.name}</div>
          <Avatar src={user.image} />
        </div>
        <div className='flex flex-row items-center gap-4 font-light text-neutral-500'>
          <div>{guestCount} guests</div>
          <div>{roomCount} rooms</div>
          <div>{bathroomCount} bathrooms</div>
        </div>
      </div>
      <hr />
      {category && (
        <ListingCategory
          icon={category.icon}
          label={category.label}
          description={category.description}
        />
      )}
      <hr />
      <div className='font-llight text-lg text-neutral-500'>{description}</div>
      <hr />
      <Map center={coordinates} />
    </div>
  );
};

export default ListingInfo;
