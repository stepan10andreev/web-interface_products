'use client'
import { IProduct, ProductsService } from '@/services/products.service'
import { useMutation, useQuery } from '@tanstack/react-query'

export function usePutProduct() {
  return useMutation({
    mutationKey: ['updateProduct'],
    mutationFn: (product: IProduct) => ProductsService.updateProduct(product),
  })
}
