import {
  Box,
  Button,
  Container,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  useColorModeValue,
  useDisclosure,
  useToast,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Bus } from 'lucide-react'
import AppContainer from '@app/layouts/AppContainer'
import NomeStep from './steps/NomeStep'
import EmailStep from './steps/EmailStep'
import CidadesStep from './steps/CidadesStep'
import SenhaStep from './steps/SenhaStep'
import axios from 'axios'

const MotionBox = motion(Box)

const stepTitles = [
  { title: 'Vamos começar!', subtitle: 'Qual o seu nome?' },
  { title: 'Quase lá!', subtitle: 'Informe seu melhor email' },
  { title: 'Detalhes da viagem', subtitle: 'Escolha origem e destino' },
  { title: 'Segurança', subtitle: 'Defina sua senha' },
]

type Cidade = {
  id: number
  nome: string
  UF: string
}

const variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -300 : 300,
    opacity: 0,
  }),
}

export function Component() {
  const [step, setStep] = useState(1)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [cidadeOrigem, setCidadeOrigem] = useState<Cidade | null>(null)
  const [cidadeDestino, setCidadeDestino] = useState<Cidade | null>(null)
  const [loadingConfirm, setLoadingConfirm] = useState(false)
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast()
  const [direction, setDirection] = useState(1)

  function handleNext() {
    if (step === 1 && name.trim() === '') {
      toast({
        title: 'Nome obrigatório.',
        description: 'Por favor, preencha seu nome.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
      return
    }
    if (step === 2 && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast({
        title: 'Email inválido.',
        description: 'Por favor, insira um email válido.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
      return
    }
    if (step === 3) {
      if (!cidadeOrigem?.nome || !cidadeDestino?.nome) {
        toast({
          title: 'Cidades obrigatórias.',
          description: 'Selecione a cidade de origem e destino.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        })
        return
      }
      if (cidadeOrigem.nome === cidadeDestino.nome) {
        toast({
          title: 'Cidades inválidas.',
          description: 'A origem e destino não podem ser iguais.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        })
        return
      }
    }
    if (step === 4) {
      if (!password || !confirmPassword) {
        toast({
          title: 'Senha obrigatória.',
          description: 'Preencha a senha e a confirmação.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        })
        return
      }

      if (password !== confirmPassword) {
        toast({
          title: 'Senhas diferentes!',
          description: 'As senhas não coincidem.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        })
        return
      }

      const senhaValida = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{5,}$/.test(password)

      if (!senhaValida) {
        toast({
          title: 'Senha inválida!',
          description:
            'A senha deve ter no mínimo 5 caracteres, 1 letra maiúscula, 1 letra minúscula e 1 número.',
          status: 'error',
          duration: 4000,
          isClosable: true,
        })
        return
      }

      onOpen()
      return
    }

    setDirection(1)
    setStep(step + 1)
  }

  function handleBack() {
    if (step > 1) {
      setDirection(-1)
      setStep(step - 1)
    }
  }

  async function handleConfirm() {
    setLoadingConfirm(true)
    try {
      const dados = { name, email, cidadeOrigem, cidadeDestino, password }

      await axios.post('/api/register', dados)

      const loginResponse = await fetch('/api/login_check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email, password: password }),
      })

      if (!loginResponse.ok) {
        throw new Error('Erro ao fazer login automático.')
      }

      const loginData = await loginResponse.json()
      localStorage.setItem('tokenUser', loginData.token)

      toast({
        title: 'Registro confirmado!',
        description: 'Seja bem-vindo ao OrganizaBus 🚍 Você será redirecionado em 4 segundos...',
        status: 'success',
        duration: 4000,
        isClosable: true,
      })

      setTimeout(() => {
        window.location.href = '/'
      }, 4000)
    } catch (error) {
      console.error('Erro no processo de registro:', error)
      toast({
        title: 'Erro ao registrar',
        description: 'Tente novamente mais tarde.',
        status: 'error',
        duration: 4000,
        isClosable: true,
      })
    } finally {
      setLoadingConfirm(false)
      onClose()
    }
  }

  return (
    <AppContainer>
      <Container maxW="lg" py={{ base: '12', md: '24' }} px={{ base: '0', sm: '8' }}>
        <AnimatePresence custom={direction} mode="wait">
          <MotionBox
            key={step}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3 }}
            py={{ base: '8', sm: '12' }}
            px={{ base: '6', sm: '12' }}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow="2xl"
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
                <Heading size="lg" color="gray.700" fontFamily="'Poppins', sans-serif">
                  {stepTitles[step - 1].title}
                </Heading>
                <Text color="gray.500" fontSize="md" fontWeight="medium">
                  {stepTitles[step - 1].subtitle}
                </Text>
              </Stack>
            </Stack>

            {step === 1 && <NomeStep name={name} setName={setName} />}

            {step === 2 && <EmailStep email={email} setEmail={setEmail} />}

            {step === 3 && (
              <CidadesStep
                cidadeOrigem={cidadeOrigem}
                cidadeDestino={cidadeDestino}
                setCidadeOrigem={setCidadeOrigem}
                setCidadeDestino={setCidadeDestino}
              />
            )}

            {step === 4 && (
              <SenhaStep
                password={password}
                confirmPassword={confirmPassword}
                setPassword={setPassword}
                setConfirmPassword={setConfirmPassword}
              />
            )}

            <Stack direction="row" spacing="4" mt="10" justify="space-between">
              <Button variant="outline" isDisabled={step === 1} onClick={handleBack}>
                Voltar
              </Button>
              <Button
                colorScheme="teal"
                onClick={handleNext}
                _hover={{ transform: 'translateY(-2px)', boxShadow: 'lg' }}
              >
                {step < 4 ? 'Próximo' : 'Registrar'}
              </Button>
            </Stack>
            <Stack>
              <Text textAlign="center" fontSize="sm" color="gray.500" mt="4">
                Já tem uma conta?{' '}
                <Text
                  as="span"
                  color="teal.500"
                  fontWeight="bold"
                  cursor="pointer"
                  _hover={{ textDecoration: 'underline' }}
                  onClick={() => (window.location.href = '/login')}
                >
                  Faça login
                </Text>
              </Text>
            </Stack>
          </MotionBox>
        </AnimatePresence>

        <Modal isOpen={isOpen} onClose={onClose} isCentered motionPreset="scale">
          <ModalOverlay />
          <ModalContent
            borderRadius="xl"
            p={{ base: 4, md: 6 }}
            bg={useColorModeValue('white', 'gray.800')}
            boxShadow="lg"
          >
            <ModalHeader
              textAlign="center"
              fontSize={{ base: '2xl', md: '3xl' }}
              fontWeight="bold"
              color={useColorModeValue('gray.700', 'gray.100')}
              pb={2}
            >
              🎉 Registro quase completo!
            </ModalHeader>

            <ModalCloseButton />

            <ModalBody>
              <Stack spacing={6} align="center" textAlign="center">
                <Box bg="teal.100" borderRadius="full" p="3" display="inline-flex">
                  <Bus size={40} color="#319795" />
                </Box>

                <Stack spacing={1}>
                  <Text
                    fontSize="lg"
                    fontWeight="semibold"
                    color={useColorModeValue('gray.600', 'gray.300')}
                  >
                    Confira seus dados:
                  </Text>

                  <Stack
                    spacing={2}
                    fontSize="md"
                    color={useColorModeValue('gray.600', 'gray.400')}
                  >
                    <Text>
                      <b>Nome:</b> {name}
                    </Text>
                    <Text>
                      <b>Email:</b> {email}
                    </Text>
                    <Text>
                      <b>Origem:</b> {cidadeOrigem?.nome}
                    </Text>
                    <Text>
                      <b>Destino:</b> {cidadeDestino?.nome}
                    </Text>
                  </Stack>
                </Stack>
              </Stack>
            </ModalBody>

            <ModalFooter
              mt={4}
              display="flex"
              flexDirection={{ base: 'column', md: 'row' }}
              gap="3"
            >
              <Button
                variant="ghost"
                w="full"
                onClick={onClose}
                _hover={{ bg: useColorModeValue('gray.100', 'gray.700') }}
              >
                Cancelar
              </Button>
              <Button
                colorScheme="teal"
                w="full"
                onClick={handleConfirm}
                isLoading={loadingConfirm}
                loadingText="Registrando..."
                _hover={{ transform: 'translateY(-2px)', boxShadow: 'md' }}
              >
                Confirmar
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Container>
    </AppContainer>
  )
}
