import getCurrentUser from '../actions/getCurrentUser';
import getFavoriteListings from '../actions/getFavoriteListings';
import ClientOnly from '../components/ClientOnly';
import EmptyState from '../components/EmptyState';
import FavoriteClient from './FavoriteClient';

const ListingPage = async () => {
  const currentUser = await getCurrentUser();
  const listings = await getFavoriteListings();

  if (!listings.length) {
    return (
      <ClientOnly>
        <EmptyState
          title='No favorites'
          subtitle='Looks like you have no favorite listings.'
        />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <FavoriteClient currentUser={currentUser}
        listings={listings} />
    </ClientOnly>
  );
};

export default ListingPage;
