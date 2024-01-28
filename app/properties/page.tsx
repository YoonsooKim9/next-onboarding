import EmptyState from '../components/EmptyState'

import getCurrentUser from '../actions/getCurrentUser'

import PropertiesClient from './PropertiesClient'
import getListings from '../actions/getListings'
import Container from '../components/Container'
import Heading from '../components/Heading'

const PropertiesPage = async () => {
  const currentUser = await getCurrentUser()

  if (!currentUser) {
    return <EmptyState title='Unauthorized' subtitle='Please login.' />
  }

  const listings = await getListings({
    userId: currentUser.id,
  })

  if (listings.length === 0) {
    return (
      <EmptyState
        title='No properties found.'
        subtitle='Looks like you have no properties.'
      />
    )
  }

  return (
    <Container>
      <Heading title='Properties' subtitle='List of your properties' />
      <PropertiesClient listings={listings} currentUser={currentUser} />
    </Container>
  )
}

export default PropertiesPage
