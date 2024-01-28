'use client'

import { useCallback, useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'
import axios from 'axios'
import { useMutation } from '@tanstack/react-query'

import { SafeReservation, SafeUser } from '@/type'
import ListingCard from '../components/listings/ListingCard'

interface ReservationsClientProps {
  reservations?: SafeReservation[]
  currentUser?: SafeUser
}

const ReservationsClient: React.FC<ReservationsClientProps> = ({
  reservations,
  currentUser,
}) => {
  const router = useRouter()
  const [deletingId, setDeletingId] = useState('')

  const { mutate } = useMutation({
    mutationFn: async (id: string) =>
      await axios.delete(`/api/reservations/${id}`),
    onSuccess: () => {
      toast.success('Reservation canceled')
      router.refresh()
    },
    onError: (err: any) => toast.error('Something went wrong'),
    onMutate: (id) => setDeletingId(id),
    onSettled: () => setDeletingId(''),
  })

  const onCancel = useCallback((id: string) => mutate(id), [mutate])

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
          actionLabel='Cancel guest reservation'
          currentUser={currentUser}
        />
      ))}
    </div>
  )
}

export default ReservationsClient
