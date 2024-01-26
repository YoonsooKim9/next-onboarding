import { create } from 'zustand'

type State = {
  isOpen: boolean
}

type Actions = {
  onOpen: () => void
  onClose: () => void
}

const initialState: State = {
  isOpen: false,
}

const useRegisterModal = create<State & Actions>((set) => ({
  ...initialState,
  onOpen: () => set((state) => ({ isOpen: true })),
  onClose: () => set((state) => ({ isOpen: false })),
}))

export default useRegisterModal
