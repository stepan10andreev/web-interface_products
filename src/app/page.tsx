import { AuthForm } from '@/components/AuthForm/AuthForm'
import { Box } from '@chakra-ui/react'

export default function Home() {
  return (
    <Box p={5} maxW='600px' mx='auto'>
      <AuthForm />
    </Box>
  )
}
