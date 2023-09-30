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
    return axios.get<IProduct[]>(`${API_BASE_URL}/products?limit=8`)
  },

  async getById(id: string) {
    return axios.get<IProduct>(`${API_BASE_URL}/products/${id}`)
  },

  async addProduct(product: IProduct) {
    console.log(await axios.post<IProduct>(`${API_BASE_URL}/products`, product))
    return axios.post<IProduct>(`${API_BASE_URL}/products`, product)
  },

  async updateProduct(id: string, product: IProduct) {
    return axios.put(`${API_BASE_URL}/products/${id}`, product)
  },

  async deleteProduct(id: string) {
    console.log(await axios.delete<IProduct>(`${API_BASE_URL}/products/${id}`))
    return axios.delete<IProduct>(`${API_BASE_URL}/products/${id}`)
  },
}
