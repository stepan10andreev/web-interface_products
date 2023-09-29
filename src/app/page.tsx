import Image from 'next/image'
import styles from './page.module.css'
import { AuthForm } from '@/components/AuthForm/AuthForm'
import { Box } from '@chakra-ui/react'
import cls from './page.module.css'

export default function Home() {
  return (
    <Box p={5} maxW='600px' mx='auto'>
      <AuthForm />
    </Box>
  )
}
