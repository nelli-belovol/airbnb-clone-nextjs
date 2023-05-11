'use client';

import Container from '@/app/components/Container';
import ListingInfo from '@/app/components/Listings/ListingInfo';
import { categories } from '@/app/components/Navbar/Categories';
import { SafeListing, SafeUser } from '@/app/types';
import { Reservation } from '@prisma/client';
import { useMemo } from 'react';
import ListingHead from '../../components/Listings/ListingHead';

interface ListingClientProps {
  listing: SafeListing & {
    user: SafeUser;
  };
  currentUser: SafeUser | null;
  reservation?: Reservation[];
}

const ListingClient: React.FC<ListingClientProps> = ({
  listing,
  currentUser,
  reservation,
}) => {
  const category = useMemo(() => {
    return categories.find((item) => item.label === listing.category);
  }, [listing.category]);

  return (
    <Container>
      <div className='mx-auto max-w-screen-lg'>
        <div className='flex flex-col gap-6'>
          <ListingHead
            title={listing.title}
            imageSrc={listing.imageSrc}
            locationValue={listing.locationValue}
            id={listing.id}
            currentUser={currentUser}
          />
          <div className='mt-6 grid grid-cols-1 md:grid-cols-7 md:gap-10'>
            <ListingInfo
              user={listing.user}
              category={category}
              roomCount={listing.roomCount}
              guestCount={listing.guestCount}
              bathroomCount={listing.bathroomCount}
              locationValue={listing.locationValue}
              description={listing.description}
            />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ListingClient;
