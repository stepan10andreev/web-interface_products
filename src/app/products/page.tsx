'use client'
import { ProductList } from '@/components/ProductList/ProductList'
import { useProducts } from '@/components/hooks/useProducts'
import { IProduct } from '@/services/products.service'
import { Box } from '@chakra-ui/react'
import { useEffect, useState } from 'react'

export default function Products() {
  const [products, setProducts] = useState<IProduct[]>([])

  const { data, isLoading, isSuccess } = useProducts()

  useEffect(() => {
    const cashedProducts = sessionStorage.getItem('products')

    if (cashedProducts) {
      setProducts(JSON.parse(cashedProducts))
      return
    }

    data &&
      (sessionStorage.setItem('products', JSON.stringify(data)),
      setProducts(data))
  }, [data])

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
      {isLoading ? (
        <div>...loading</div>
      ) : products.length ? (
        <ProductList products={products} />
      ) : (
        <div>Данных нет</div>
      )}
    </Box>
  )
}
