'use client'
import { IProduct, ProductsService } from '@/services/products.service'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export function usePostProduct() {
  return useMutation({
    mutationKey: ['addProduct'],
    mutationFn: (product: IProduct) => ProductsService.addProduct(product),
    onSuccess(data) {
      return data.data
    },
  })
}
