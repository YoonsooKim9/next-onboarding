import EmptyState from '../components/EmptyState'
import ReservationsClient from './ReservationsClient'
import Container from '../components/Container'
import Heading from '../components/Heading'

import getCurrentUser from '../actions/getCurrentUser'
import getReservations from '../actions/getReservations'

const ReservationsPage = async () => {
  const currentUser = await getCurrentUser()

  if (!currentUser) {
    return <EmptyState title='Unauthorized' subtitle='Please login.' />
  }

  const reservations = await getReservations({
    authorId: currentUser.id,
  })

  if (reservations.length === 0) {
    return (
      <EmptyState
        title='No reservations found'
        subtitle='Looks like you have no reservations on your properties.'
      />
    )
  }

  return (
    <Container>
      <Heading title='Reservations' subtitle='Bookings on your properties' />
      <ReservationsClient
        reservations={reservations}
        currentUser={currentUser}
      />
    </Container>
  )
}

export default ReservationsPage
