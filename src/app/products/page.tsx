'use client'
import { ProductList } from '@/components/ProductList/ProductList'
import { useProducts } from '@/components/hooks/useProducts'
import { Box } from '@chakra-ui/react'

export default function Products() {
  const { data, isLoading, isSuccess } = useProducts()

  return (
    <Box
      p={5}
      maxW='1000px'
      mx='auto'
      display='flex'
      alignItems='center'
      justifyContent='space-between'
      flexWrap='wrap'
    >
      {data && <ProductList products={data} />}
    </Box>
  )
}
