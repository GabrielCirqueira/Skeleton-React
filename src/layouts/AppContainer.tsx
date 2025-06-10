import { Container } from '@chakra-ui/react'

export default function AppContainer({ children }: { children?: React.ReactNode }) {
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
