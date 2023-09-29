'use client'
import { ProductList } from '@/components/ProductList/ProductList'
import { useProducts } from '@/components/hooks/useProducts'
import { IProduct } from '@/services/products.service'
import { AddIcon } from '@chakra-ui/icons'
import {
  Box,
  Button,
  ButtonGroup,
  CircularProgress,
  IconButton,
} from '@chakra-ui/react'
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
      height='100vh'
      mx='auto'
      display='flex'
      alignItems='center'
      justifyContent='center'
      flexWrap='wrap'
    >
      {isLoading ? (
        <CircularProgress isIndeterminate color='blue.700' size='100px' />
      ) : products.length ? (
        <>
          <ButtonGroup size='md' mb={5} isAttached variant='outline'>
            <Button>Add product</Button>
            <IconButton aria-label='Add to friends' icon={<AddIcon />} />
          </ButtonGroup>
          <ProductList products={products} />
        </>
      ) : (
        <div>Данных нет</div>
      )}
    </Box>
  )
}
