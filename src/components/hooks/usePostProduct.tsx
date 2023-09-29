'use client'
import { IProduct, ProductsService } from '@/services/products.service'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export function usePostProduct(product: IProduct) {
  return useMutation({
    mutationKey: ['addProduct'],
    mutationFn: () => ProductsService.addProduct(product),
  })
}
