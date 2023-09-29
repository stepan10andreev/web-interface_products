'use client'
import { ProductsService } from '@/services/products.service'
import { QueryClient, useQuery } from '@tanstack/react-query'

export function useProducts() {
  const { isLoading, isSuccess, data } = useQuery({
    queryKey: ['products'],
    queryFn: () => ProductsService.getAll(),
    select: (data) => data.data,
    staleTime: 60000 * 6,
  })

  return { data, isLoading, isSuccess }
}
