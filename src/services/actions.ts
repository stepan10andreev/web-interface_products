'use server'

import { cookies } from 'next/headers'

export async function createTokenCookie(token: string) {
  cookies().set('authToken', token)
}
