import { AuthForm } from '@/components/AuthForm/AuthForm'
import { useAuthStore } from '@/store/useAuth'
import { Box } from '@chakra-ui/react'
import { cookies } from 'next/headers'
import { useRouter } from 'next/navigation'

export default function Home() {
  return (
    <Box p={5} maxW='600px' mx='auto'>
      <AuthForm />
    </Box>
  )
}
