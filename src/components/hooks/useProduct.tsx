'use client'
import { ProductsService } from '@/services/products.service'
import { Query, useQuery } from '@tanstack/react-query'

export function useProduct(id: string) {
  const { isLoading, isSuccess, data } = useQuery({
    queryKey: ['products', id],
    queryFn: () => ProductsService.getById(id),
    select: (data) => data.data,
    enabled: !!id,
  })

  return { data, isLoading, isSuccess }
}
