import Container from '../components/Container';
import Heading from '../components/Heading';
import ListingCard from '../components/Listings/ListingCard';
import { SafeListing, SafeUser } from '../types';
import React from "react";
interface FavoriteClientProps {
  listings: SafeListing[];
  currentUser?: SafeUser | null;
}

const FavoriteClient: React.FC<FavoriteClientProps> = ({
  currentUser,
  listings,
}) => {
  return (
    <Container>
      <Heading title='Favorites'
        subtitle='List of places you have favorite!' />
      <div className='mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6'>
        {listings.map((listing) => (
          <ListingCard
            key={listing.id}
            data={listing}
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  );
};

export default FavoriteClient;
