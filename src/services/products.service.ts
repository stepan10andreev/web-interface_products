import axios, { AxiosError, AxiosResponse } from 'axios'
import { IAuthData } from '../components/AuthForm/authForm.interface'
import { API_BASE_URL } from '@/utils/constants/general-constants'

export interface IProduct {
  id?: number
  title: string
  price: string
  category: string
  description: string
  image: string
}

export const ProductsService = {
  async getAll() {
    return axios.get<IProduct[]>(`${API_BASE_URL}/products`)
  },

  async getById(id: string) {
    return axios.get<IProduct>(`${API_BASE_URL}/products/${id}`)
  },

  async addProduct(product: IProduct) {
    return axios.post(`${API_BASE_URL}/products`, product)
  },

  async updateProduct(id: string, product: IProduct) {
    return axios.put(`${API_BASE_URL}/products/${id}`, product)
  },

  async deleteProduct(id: string) {
    return axios.delete(`${API_BASE_URL}/products/${id}`)
  },
}
