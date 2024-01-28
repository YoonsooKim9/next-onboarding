import ListingCard from '../components/listings/ListingCard'
import { SafeListing, SafeUser } from '@/type'

interface FavoritesClientProps {
  listings: SafeListing[]
  currentUser?: SafeUser | null
}

const FavoritesClient: React.FC<FavoritesClientProps> = ({
  listings,
  currentUser,
}) => {
  return (
    <div
      className='
          mt-10
          grid
          grid-cols-1
          sm:grid-cols-2
          md:grid-cols-3
          lg:grid-cols-4
          xl:grid-cols-5
          2xl:grid-cols-6
          gap-8
        '
    >
      {listings.map((listing) => (
        <ListingCard
          key={listing.id}
          currentUser={currentUser}
          data={listing}
        />
      ))}
    </div>
  )
}

export default FavoritesClient
