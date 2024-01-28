'use client'

import { useRouter } from 'next/navigation'
import { useState, useCallback } from 'react'
import axios from 'axios'

import { SafeReservation, SafeUser } from '@/type'
import { toast } from 'react-hot-toast'
import ListingCard from '../components/listings/ListingCard'

interface TripsClientProps {
  reservations?: SafeReservation[]
  currentUser?: SafeUser | null
}

const TripsClient: React.FC<TripsClientProps> = ({
  reservations,
  currentUser,
}) => {
  const router = useRouter()
  const [deletingId, setDeletingId] = useState('')

  const onCancel = useCallback(
    (id: string) => {
      setDeletingId(id)

      axios
        .delete(`/api/reservations/${id}`)
        .then(() => {
          toast.success('Reservation canceled')
          router.refresh()
        })
        .catch((err) => {
          toast.error(err?.response?.data?.error)
        })
        .finally(() => {
          setDeletingId('')
        })
    },
    [router]
  )

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
      {reservations?.map((reservation) => (
        <ListingCard
          key={reservation.id}
          data={reservation.listing}
          reservation={reservation}
          actionId={reservation.id}
          onAction={onCancel}
          disabled={deletingId === reservation.id}
          actionLabel='Cancel reservation'
          currentUser={currentUser}
        />
      ))}
    </div>
  )
}

export default TripsClient
