'use client'
import { ProductCard } from '@/components/ProductCard/ProductCard'
import { useDeleteProduct } from '@/components/hooks/useDeleteProduct'
import { useProduct } from '@/components/hooks/useProduct'
import { IProduct } from '@/services/products.service'
import {
  Badge,
  Box,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Heading,
  Stack,
  Text,
  Image,
  CircularProgress,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'

export default function Product({ params }: { params: { id: string } }) {
  const [cashedData, setCashedData] = useState<IProduct | null>(null)

  const { data, isLoading } = useProduct(params.id)

  useEffect(() => {
    if (!data) {
      const cashedProducts = sessionStorage.getItem('products')

      setCashedData(
        JSON.parse(cashedProducts as string).find(
          (product: IProduct) => String(product.id) === params.id
        )
      )
      return
    }
    setCashedData(data)
  }, [data, params.id])

  return (
    <Box p={5} maxW='600px' mx='auto'>
      {isLoading ? (
        <CircularProgress isIndeterminate color='blue.700' size='100px' />
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
