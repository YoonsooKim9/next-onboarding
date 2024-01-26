import { use } from 'react'

import EmptyState from '../components/EmptyState'

import getCurrentUser from '../actions/getCurrentUser'
import getFavoriteListings from '../actions/getFavoriteListings'
import FavoritesClient from './FavoritesClient'

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

  return <FavoritesClient listings={listings} currentUser={currentUser} />
}

export default ListingPage
