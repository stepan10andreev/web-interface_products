import React, { FC } from 'react'
import { IProductListProps } from './productList.interface'

export const ProductList: FC<IProductListProps> = ({ products }) => {
  return (
    <div>
      <ul>
        {products.map((product) => (
          <li key={product.id}>{product.title}</li>
        ))}
      </ul>
    </div>
  )
}
