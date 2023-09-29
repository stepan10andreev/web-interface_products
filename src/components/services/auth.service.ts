import axios from 'axios'
import { IAuthData } from '../AuthForm/authForm.interface'
import { API_BASE_URL } from '@/utils/constants/general-constants'

export const AuthService = {
  async logIn(data: IAuthData) {
    return axios.post(`${API_BASE_URL}/auth/login`, data)
  },
}
