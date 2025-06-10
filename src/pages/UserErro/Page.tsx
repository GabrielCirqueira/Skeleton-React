import { Box, Button, Container, Heading, Stack, Text, useColorModeValue } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { UserX } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const MotionBox = motion(Box)

export function Component() {
  const navigate = useNavigate()

  return (
    <Container maxW="lg" py={{ base: '12', md: '24' }} px={{ base: '0', sm: '8' }}>
      <MotionBox
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        py={{ base: '8', sm: '12' }}
        px={{ base: '6', sm: '12' }}
        bg={useColorModeValue('white', 'gray.700')}
        boxShadow="2xl"
        borderRadius="2xl"
        border="1px"
        borderColor={useColorModeValue('gray.100', 'gray.600')}
        textAlign="center"
      >
        <Stack spacing="6" align="center">
          <UserX size={64} color="#FF6B6B" />
          <Heading size="lg" color="gray.700">
            Erro ao carregar informações
          </Heading>
          <Text color="gray.500" fontSize="md">
            Não foi possível carregar os dados do usuário. Tente novamente mais tarde.
          </Text>

          <Button
            mt="6"
            colorScheme="teal"
            onClick={() => navigate('/')}
            _hover={{
              transform: 'translateY(-2px)',
              boxShadow: 'lg',
            }}
          >
            Voltar para Home
          </Button>
        </Stack>
      </MotionBox>
    </Container>
  )
}
