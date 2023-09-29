'use server'

import { cookies } from 'next/headers'
import { AuthService } from './auth.service'
import { IAuthData } from '../AuthForm/authForm.interface'

export async function create(data: IAuthData) {
  try {
    const cart = await AuthService.logIn(data)
    cookies().set('cartId', cart.data.toke)
  } catch (err) {
    console.log(err)
  }
}
