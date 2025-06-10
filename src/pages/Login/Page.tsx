import { useState } from 'react'
import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  ScaleFade,
  Stack,
  Text,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react'
import { Bus, Lock, Mail } from 'lucide-react'
import AppContainer from '@app/layouts/AppContainer'
import { Navigate } from 'react-router-dom'
import { useLogin } from '@app/auth/useLogin'

export function Component() {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const { login, loading } = useLogin()
  const token = localStorage.getItem('tokenUser')

  if (token) {
    return <Navigate to="/" replace />
  }

  return (
    <AppContainer>
      <Container maxW="lg" py={{ base: '12', md: '24' }} px={{ base: '0', sm: '8' }}>
        <ScaleFade initialScale={0.9} in={true}>
          <Stack spacing="8">
            <Box
              py={{ base: '8', sm: '12' }}
              px={{ base: '6', sm: '12' }}
              bg={useColorModeValue('white', 'gray.700')}
              boxShadow="xl"
              borderRadius="2xl"
              border="1px"
              borderColor={useColorModeValue('gray.100', 'gray.600')}
            >
              <Stack spacing="8" align="center">
                <Bus
                  size={64}
                  color="#00B3B3"
                  style={{
                    filter: 'drop-shadow(0px 2px 4px rgba(0, 179, 179, 0.3))',
                    transition: 'transform 0.3s ease-in-out',
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
                  onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                />
                <Stack spacing="3" textAlign="center">
                  <Heading
                    size="xl"
                    color="gray.700"
                    fontFamily="'Poppins', sans-serif"
                    letterSpacing="tight"
                  >
                    OrganizaBus
                  </Heading>
                  <Text color="gray.500" fontSize="lg" fontWeight="medium">
                    Entre para gerenciar sua viagem
                  </Text>
                </Stack>
              </Stack>

              <Box mt="12">
                <Stack spacing="6">
                  <FormControl>
                    <FormLabel>Email</FormLabel>
                    <InputGroup>
                      <InputLeftElement pointerEvents="none">
                        <Mail size={18} color="#718096" />
                      </InputLeftElement>
                      <Input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="seu@email.com"
                        bg={useColorModeValue('gray.50', 'gray.600')}
                        borderColor={useColorModeValue('gray.200', 'gray.500')}
                        _placeholder={{ color: 'gray.400' }}
                      />
                    </InputGroup>
                  </FormControl>

                  <FormControl>
                    <FormLabel>Senha</FormLabel>
                    <InputGroup>
                      <InputLeftElement pointerEvents="none">
                        <Lock size={18} color="#718096" />
                      </InputLeftElement>
                      <Input
                        type="password"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                        placeholder="••••••••"
                        bg={useColorModeValue('gray.50', 'gray.600')}
                        borderColor={useColorModeValue('gray.200', 'gray.500')}
                        _placeholder={{ color: 'gray.400' }}
                      />
                    </InputGroup>
                  </FormControl>

                  <Button
                    size="lg"
                    fontSize="md"
                    fontWeight="semibold"
                    h="56px"
                    isLoading={loading}
                    loadingText="Entrando..."
                    bg="brand.600"
                    colorScheme="teal"
                    onClick={() => login(email, senha)}
                    _hover={{
                      transform: 'translateY(-2px)',
                      boxShadow: 'lg',
                    }}
                    transition="all 0.2s"
                  >
                    Entrar
                  </Button>

                  <Stack pt="6" textAlign="center">
                    <Text color="gray.500" fontSize="sm">
                      Não tem uma conta?{' '}
                      <Text
                        as="span"
                        color="teal.500"
                        fontWeight="bold"
                        cursor="pointer"
                        _hover={{ textDecoration: 'underline' }}
                        onClick={() => (window.location.href = '/register')}
                      >
                        Registre-se
                      </Text>
                    </Text>
                  </Stack>
                </Stack>
              </Box>
            </Box>
          </Stack>
        </ScaleFade>
      </Container>
    </AppContainer>
  )
}
