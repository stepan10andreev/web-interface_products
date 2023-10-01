'use client'
import { ProductsService } from '@/services/products.service'
import { useMutation } from '@tanstack/react-query'

export function useDeleteProduct() {
  return useMutation({
    mutationKey: ['deleteProduct'],
    mutationFn: (id: string) => ProductsService.deleteProduct(id),
  })
}
