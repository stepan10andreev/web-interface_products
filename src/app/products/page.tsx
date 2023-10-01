'use client'
import { AddButton } from '@/components/AddButton/AddButton'
import { ProductList } from '@/components/ProductList/ProductList'
import { useProducts } from '@/components/hooks/useProducts'
import { IProduct } from '@/services/products.service'
import { Box, CircularProgress } from '@chakra-ui/react'
import { Metadata } from 'next'
import { useEffect, useState } from 'react'

export default function Products() {
  const [products, setProducts] = useState<IProduct[]>([])

  const { data, isLoading } = useProducts()

  useEffect(() => {
    const cashedProducts = sessionStorage.getItem('products')
    if (cashedProducts) {
      setProducts(JSON.parse(cashedProducts))
      console.log(products.length)
      return
    }

    data &&
      (sessionStorage.setItem('products', JSON.stringify(data)),
      setProducts(data))
  }, [])

  return (
    <Box
      p={5}
      maxW='1000px'
      mx='auto'
      display='flex'
      alignItems='center'
      justifyContent='center'
      flexDirection='column'
    >
      {isLoading ? (
        <CircularProgress isIndeterminate color='blue.700' size='100px' />
      ) : products.length > 0 ? (
        <>
          <AddButton />
          <ProductList products={products} />
        </>
      ) : products.length === 0 ? (
        <>
          <AddButton />
          <div>There is no products</div>
        </>
      ) : (
        <div>Data not found</div>
      )}
    </Box>
  )
}
