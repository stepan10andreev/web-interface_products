'use client'
import { ProductCard } from '@/components/ProductCard/ProductCard'
import { useProduct } from '@/components/hooks/useProduct'
import { IProduct } from '@/services/products.service'
import { Box, CircularProgress } from '@chakra-ui/react'
import type { Metadata } from 'next'
import { useEffect, useState } from 'react'

export const metadata: Metadata = {
  title: 'Product',
}

export default function Product({ params }: { params: { id: string } }) {
  const [cashedData, setCashedData] = useState<IProduct | undefined>()

  const { data, isLoading } = useProduct(params.id)

  useEffect(() => {
    const cashedProducts = sessionStorage.getItem('products')
    if (cashedProducts) {
      setCashedData(
        JSON.parse(cashedProducts as string).find(
          (product: IProduct) => String(product.id) === params.id
        )
      )
    } else setCashedData(data)
  }, [data, params.id])

  return (
    <Box p={5} maxW='500px' mx='auto'>
      {isLoading ? (
        <Box p={5} width='100%' textAlign='center'>
          <CircularProgress isIndeterminate color='blue.700' size='100px' />
        </Box>
      ) : cashedData ? (
        <>
          <ProductCard
            id={cashedData.id}
            title={cashedData.title}
            image={cashedData.image}
            price={cashedData.price}
            category={cashedData.category}
            description={cashedData.description}
            detailed
          />
        </>
      ) : (
        <div>Data not found</div>
      )}
    </Box>
  )
}
