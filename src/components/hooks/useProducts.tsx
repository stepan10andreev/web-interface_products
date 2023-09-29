'use client'
import { ProductsService } from '@/services/products.service'
import { QueryClient, useQuery } from '@tanstack/react-query'

export function useProducts() {
  return useQuery({
    queryKey: ['products'],
    queryFn: () => ProductsService.getAll(),
    select: (data) => data.data,
    staleTime: 60000 * 6,
  })
}
