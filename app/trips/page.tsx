import EmptyState from '../components/EmptyState'

import getCurrentUser from '../actions/getCurrentUser'
import getReservations from '../actions/getReservations'

import TripsClient from './TripsClient'
import Container from '../components/Container'
import Heading from '../components/Heading'

const TripsPage = async () => {
  const currentUser = await getCurrentUser()

  if (!currentUser) {
    return <EmptyState title='Unauthorized' subtitle='Please login.' />
  }

  const reservations = await getReservations({
    userId: currentUser.id,
  })

  if (reservations.length === 0) {
    return (
      <EmptyState
        title='No trips found.'
        subtitle="Looks like you haven't reserved any trips."
      />
    )
  }

  return (
    <Container>
      <Heading
        title='Trips'
        subtitle="Where you'be been and where you're heading"
      />
      <TripsClient reservations={reservations} currentUser={currentUser} />
    </Container>
  )
}

export default TripsPage
