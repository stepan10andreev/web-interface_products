'use client'
import { ProductsService } from '@/services/products.service'
import { useQuery } from '@tanstack/react-query'

export function useProducts(id: string) {
  const { isLoading, isSuccess, data } = useQuery({
    queryKey: ['products'],
    queryFn: () => ProductsService.getById(id),
    select: (data) => data.data,
  })

  return { data, isLoading, isSuccess }
}
