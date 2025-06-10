import { Box, Heading, Text, Button } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'

export function Component() {
  return (
    <Box textAlign="center" py={20}>
      <Heading fontSize="6xl" color="brand.500" mb={4}>
        404
      </Heading>
      <Text mb={6}>Página não encontrada.</Text>
      <Button as={RouterLink} colorScheme="brand" to="/">
        Voltar para a Home
      </Button>
    </Box>
  )
}
