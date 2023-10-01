import axios, { AxiosError, AxiosResponse } from 'axios'
import { IAuthData } from '../components/AuthForm/authForm.interface'
import { API_BASE_URL } from '@/utils/constants/general-constants'

export interface IProduct {
  id?: number
  title: string
  price: number
  category: string
  description: string
  image?: string
}

export const ProductsService = {
  async getAll() {
    return axios.get<IProduct[]>(`${API_BASE_URL}/products?limit=6`)
  },

  async getById(id: string) {
    return axios.get<IProduct>(`${API_BASE_URL}/products/${id}`)
  },

  async addProduct(product: IProduct) {
    return axios.post<IProduct>(`${API_BASE_URL}/products`, product)
  },

  async updateProduct(product: IProduct) {
    return axios.put<IProduct>(
      `${API_BASE_URL}/products/${product.id}`,
      product
    )
  },

  async deleteProduct(id: string) {
    return axios.delete<IProduct>(`${API_BASE_URL}/products/${id}`)
  },
}
