import Container from '@/app/components/Container'
import ListingCard from '@/app/components/listings/ListingCard'
import EmptyState from '@/app/components/EmptyState'

import getListings, { IListingsParams } from '@/app/actions/getListings'
import getCurrentUser from '@/app/actions/getCurrentUser'

import { use } from 'react'

interface HomeProps {
  searchParams: IListingsParams
}

export const dynamic = 'force-dynamic'

const Home = ({ searchParams }: HomeProps) => {
  const listings = use(getListings(searchParams))
  const currentUser = use(getCurrentUser())

  if (listings.length === 0) {
    return <EmptyState showReset />
  }

  return (
    <Container>
      <div
        className='
        pt-24
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
        {listings.map((listing) => {
          return (
            <ListingCard
              currentUser={currentUser}
              key={listing.id}
              data={listing}
            />
          )
        })}
      </div>
    </Container>
  )
}

export default Home
