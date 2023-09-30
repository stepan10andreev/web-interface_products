'use client'
import { IProduct, ProductsService } from '@/services/products.service'
import { useMutation, useQuery } from '@tanstack/react-query'

export function useDeleteProduct() {
  return useMutation({
    mutationKey: ['deleteProduct'],
    mutationFn: (id: string) => ProductsService.deleteProduct(id),
    onSuccess(data) {
      console.log(data)
    },
    onError(error) {
      console.log(error)
    },
  })
}
