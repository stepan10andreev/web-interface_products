'use client'
import { IProduct, ProductsService } from '@/services/products.service'
import { useMutation, useQuery } from '@tanstack/react-query'

export function useDeleteProduct() {
  return useMutation({
    mutationKey: ['deleteProduct'],
    mutationFn: async (id: string) => await ProductsService.deleteProduct(id),
  })
}
