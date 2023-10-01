'use server'

import { cookies } from 'next/headers'

export async function createTokenCookie(token: string) {
  cookies().set('authToken', token)
}

export async function getTokenCookie() {
  const cookieStore = cookies()
  const authToken = cookieStore.get('authToken')
  return authToken
}
