'use client'
import { ProductsService } from '@/services/products.service'
import { useQuery } from '@tanstack/react-query'

export function useProducts() {
  const { isLoading, isSuccess, data } = useQuery({
    queryKey: ['products'],
    queryFn: () => ProductsService.getAll(),
    select: (data) => data.data,
  })

  return { data, isLoading, isSuccess }
}
