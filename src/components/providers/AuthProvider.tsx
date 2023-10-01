import { getTokenCookie } from '@/services/actions'
import { useAuthStore } from '@/store/useAuth'
import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies'
import { cookies } from 'next/headers'
import { useRouter } from 'next/navigation'
import React, { FC, PropsWithChildren, useEffect, useState } from 'react'

const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const router = useRouter()
  const { setAuth } = useAuthStore()
  useEffect(() => {
    const checkToken = async () => {
      const cookie = await getTokenCookie()
      if (!cookie?.value) {
        setAuth(false)
        router.push('/')
      } else {
        setAuth(true)
      }
    }
    checkToken()
  }, [])

  return children
}

export default AuthProvider
