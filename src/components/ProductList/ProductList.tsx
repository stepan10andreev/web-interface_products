import React, { FC } from 'react'
import { IProductListProps } from './productList.interface'
import { ProductCard } from '../ProductCard/ProductCard'
import cls from './Product.module.css'
import { ButtonGroup, Button, IconButton } from '@chakra-ui/react'
import { AddIcon } from '@chakra-ui/icons'

export const ProductList: FC<IProductListProps> = ({ products }) => {
  return (
    <ul className={cls.list}>
      {products.map((product) => (
        <li key={product.id} className={cls.item}>
          <ProductCard
            id={product.id}
            title={product.title}
            image={product.image}
            price={product.price}
            category={product.category}
            description={product.description}
          />
        </li>
      ))}
    </ul>
  )
}
