import { Box, Heading, Text } from '@chakra-ui/react'

export default function NotFound() {
  return (
    <Box textAlign="center" py={10}>
      <Heading mb={4}>404</Heading>
      <Text>Page not found.</Text>
    </Box>
  )
}
