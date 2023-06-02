import { useQueryClient } from '@tanstack/react-query'

export const useQueryClientHook = () => {
  // Get QueryClient from the context
  const queryClient = useQueryClient()
  return queryClient
}
