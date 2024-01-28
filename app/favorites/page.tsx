import { use } from 'react'

import getCurrentUser from '../actions/getCurrentUser'
import getFavoriteListings from '../actions/getFavoriteListings'

import EmptyState from '../components/EmptyState'
import FavoritesClient from './FavoritesClient'
import Container from '../components/Container'
import Heading from '../components/Heading'

const ListingPage = () => {
  const currentUser = use(getCurrentUser())
  const listings = use(getFavoriteListings())

  if (listings.length === 0) {
    return (
      <EmptyState
        title='No favorites found'
        subtitle='Looks like you have no favorite listing'
      />
    )
  }

  return (
    <Container>
      <Heading
        title='Favorites'
        subtitle='List of places you have favorited!'
      />
      <FavoritesClient listings={listings} currentUser={currentUser} />
    </Container>
  )
}

export default ListingPage
