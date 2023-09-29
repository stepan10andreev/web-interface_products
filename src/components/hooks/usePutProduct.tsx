'use client'
import { IProduct, ProductsService } from '@/services/products.service'
import { useQuery } from '@tanstack/react-query'

export function usePutProduct(id: string, product: IProduct) {
  const { isLoading, isSuccess, data } = useQuery({
    queryKey: ['products'],
    queryFn: () => ProductsService.updateProduct(id, product),
    select: (data) => data.data,
  })

  return { data, isLoading, isSuccess }
}
