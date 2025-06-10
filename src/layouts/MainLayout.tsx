import { Container } from '@chakra-ui/react'
import { Outlet } from 'react-router-dom'

export default function MainLayout() {
  return (
    <Container maxW="container.lg" py={8}>
      <Outlet />
    </Container>
  )
}
