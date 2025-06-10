import { Container } from '@chakra-ui/react'
import { ReactNode } from 'react'

export default function AppContainer({ children }: { children?: ReactNode }) {
  return (
    <Container
      maxW="full"
      flex={1}
      py={14}
      flexDirection="column"
      px={{ base: 4, md: 20 }}
      justifyItems="center"
    >
      {children}
    </Container>
  )
}
