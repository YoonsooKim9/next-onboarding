import getCurrentUser from '@/app/actions/getCurrentUser'
import getListingId from '@/app/actions/getListingById'

import EmptyState from '@/app/components/EmptyState'
import ListingClient from './ListingClient'
import getReservations from '@/app/actions/getReservations'
import Container from '@/app/components/Container'

interface IParams {
  listingId?: string
}

const ListingPage = async ({ params }: { params: IParams }) => {
  const listing = await getListingId(params)
  const reservations = await getReservations(params)
  const currentUser = await getCurrentUser()

  if (!listing) {
    return <EmptyState />
  }
  return (
    <Container>
      <div className='max-w-screen-lg mx-auto'>
        <ListingClient
          listing={listing}
          reservations={reservations}
          currentUser={currentUser}
        />
      </div>
    </Container>
  )
}

export default ListingPage
