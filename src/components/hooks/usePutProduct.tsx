'use client'
import { IProduct, ProductsService } from '@/services/products.service'
import { useMutation, useQuery } from '@tanstack/react-query'

export function usePutProduct(id: string, product: IProduct) {
  return useMutation({
    mutationKey: ['updateProduct'],
    mutationFn: () => ProductsService.updateProduct(id, product),
  })
}
