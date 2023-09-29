'use client'
import { IProduct, ProductsService } from '@/services/products.service'
import { useQuery } from '@tanstack/react-query'

export function usePostProduct(product: IProduct) {
  const { isLoading, isSuccess, data } = useQuery({
    queryKey: ['products'],
    queryFn: () => ProductsService.addProduct(product),
    select: (data) => data.data,
  })

  return { data, isLoading, isSuccess }
}
