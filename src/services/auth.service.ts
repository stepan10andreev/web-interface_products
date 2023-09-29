import axios, { AxiosError, AxiosResponse } from 'axios'
import { IAuthData } from '../components/AuthForm/authForm.interface'
import { API_BASE_URL } from '@/utils/constants/general-constants'

interface ILogInReturn {
  success: boolean
  message?: string
  token?: string
}

export const AuthService = {
  async logIn(data: IAuthData): Promise<ILogInReturn> {
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/login`, data)
      return { success: true, token: response.data.token }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response && error.response.status === 401) {
          return { success: false, message: error?.response?.data }
        } else {
          return {
            success: false,
            message: 'Ошибка при авторизации. Повторите попытку.',
          }
        }
      }

      throw new Error('Ошибка запроса авторизации')
    }
  },
}
