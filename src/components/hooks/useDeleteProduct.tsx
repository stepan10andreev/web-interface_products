'use client'
import { IProduct, ProductsService } from '@/services/products.service'
import { useQuery } from '@tanstack/react-query'

export function useDeleteProduct(id: string) {
  const { isLoading, isSuccess, data } = useQuery({
    queryKey: ['products'],
    queryFn: () => ProductsService.deleteProduct(id),
    select: (data) => data.data,
  })

  return { deletedProduct: data, isLoading, isSuccess }
}
