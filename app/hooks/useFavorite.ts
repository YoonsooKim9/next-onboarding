import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useCallback, useMemo } from 'react'
import { toast } from 'react-hot-toast'
import { useMutation } from '@tanstack/react-query'

import { SafeUser } from '@/type'

import { useLoginModal } from './useModal'

interface IUseFavorite {
  listingId: string
  currentUser?: SafeUser | null
}

const useFavorite = ({ listingId, currentUser }: IUseFavorite) => {
  const router = useRouter()
  const loginModal = useLoginModal()

  const hasFavorited = useMemo(() => {
    const list = currentUser?.favoriteIds || []
    return list.includes(listingId)
  }, [currentUser, listingId])

  const { mutate } = useMutation({
    mutationFn: async () => {
      let request: () => Promise<void> = hasFavorited
        ? () => axios.delete(`/api/favorites/${listingId}`)
        : () => axios.post(`/api/favorites/${listingId}`)
      await request()
    },
    onSuccess: () => {
      router.refresh()
      toast.success('Success')
    },
    onError: () => toast.error('Something went wrong.'),
  })

  const toggleFavorite = useCallback(
    async (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation()

      if (!currentUser) {
        return loginModal.onOpen()
      }

      mutate()
    },
    [currentUser, loginModal, listingId, mutate]
  )

  return {
    hasFavorited,
    toggleFavorite,
  }
}

export default useFavorite
