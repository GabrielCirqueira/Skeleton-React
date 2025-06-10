import {
  Box,
  Button,
  Container,
  Heading,
  Spinner,
  Text,
  VStack,
  HStack,
  useToast,
  Badge,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  useDisclosure,
  IconButton,
  SimpleGrid,
  useBreakpointValue,
  Flex,
  Avatar,
  AvatarGroup,
  Tooltip,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  useColorModeValue,
  Progress,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  Fade,
  ScaleFade,
  SlideFade,
  Collapse,
  usePrefersReducedMotion,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuthInterceptor } from '@app/hooks/useAuthInterceptor'
import {
  Bus,
  Calendar,
  Clock,
  MapPin,
  User,
  Mail,
  Home,
  School,
  CheckCircle,
  XCircle,
  AlertCircle,
  Info,
  ChevronRight,
  ArrowLeft,
  RefreshCw,
  Plus,
  Minus,
  Vote,
  BarChart2,
  Users,
  ArrowRight,
  Check,
  Clock as ClockIcon,
  UserCheck,
  Ticket,
  Hash,
  Loader2,
  ArrowUpDown,
  Bell,
  BellOff,
  Settings,
  HelpCircle,
  MapPinHouse,
} from 'lucide-react'
import { keyframes } from '@emotion/react'

import { useEnquete } from '@app/hooks/useEnquete'
import { useDestinos } from '@app/hooks/useDestinos'
import { useUsuario } from '@app/hooks/useUsuario'
import { LoadingScreen } from '@app/components/shared/LoadingScreen'
import { ConfirmacaoVotoModal } from '@app/components/modals/ConfirmacaoVotoModal'
import { SelecaoDestinoModal } from '@app/components/modals/SelecaoDestinoModal'
import { DetalhesOnibusModal } from '@app/components/modals/DetalhesOnibusModal'
import { AjudaModal } from '@app/components/modals/AjudaModal'
import { EnqueteStatusCard } from '@app/components/cards/EnqueteStatusCard'
import { UsuarioInfoCard } from '@app/components/cards/UsuarioInfoCard'
import { VotoUsuarioCard } from '@app/components/cards/VotoUsuarioCard'
import { DestinoCard } from '@app/components/cards/DestinoCard'
import { OnibusCard } from '@app/components/cards/OnibusCard'
import { HeaderSection } from '@app/components/sections/HeaderSection'
import { EstatisticasSection } from '@app/components/sections/EstatisticasSection'
import { OnibusListSection } from '@app/components/sections/OnibusListSection'
import { useLogin } from '@app/auth/useLogin'

const CaixaAnimada = motion(Box)
const BotaoAnimado = motion(Button)
const CardAnimado = motion(Card)

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`

export function Component() {
  const {
    enquete,
    onibus,
    votoUsuario,
    carregando,
    atualizando,
    estatisticas,
    buscarEnqueteCompleta,
    buscarEstatisticas,
    votar,
    cancelarVoto,
    atualizarDados,
    setCarregando,
  } = useEnquete()

  const { destinos, destinoSelecionado, setDestinoSelecionado, buscarDestinos } = useDestinos()
  const { dadosUsuario, buscarDadosUsuario } = useUsuario()
  const { logout } = useLogin()

  const [notificacoesAtivas, setNotificacoesAtivas] = useState(true)
  const [mostrarEstatisticas, setMostrarEstatisticas] = useState(false)
  const toast = useToast()
  const prefersReducedMotion = usePrefersReducedMotion()

  const {
    isOpen: isDetalhesAberto,
    onOpen: abrirDetalhes,
    onClose: fecharDetalhes,
  } = useDisclosure()
  const {
    isOpen: isConfirmacaoAberta,
    onOpen: abrirConfirmacao,
    onClose: fecharConfirmacao,
  } = useDisclosure()
  const {
    isOpen: isSelecaoDestinoAberta,
    onOpen: abrirSelecaoDestino,
    onClose: fecharSelecaoDestino,
  } = useDisclosure()
  const { isOpen: isAjudaAberta, onOpen: abrirAjuda, onClose: fecharAjuda } = useDisclosure()

  const [onibusSelecionado, setOnibusSelecionado] = useState<Onibus | null>(null)
  const [tempoRestante, setTempoRestante] = useState('')

  const isMobile = useBreakpointValue({ base: true, md: false })

  const corPrimaria = useColorModeValue('brand.600', 'brand.300')
  const corFundoCard = useColorModeValue('white', 'gray.800')
  const corTexto = useColorModeValue('gray.800', 'whiteAlpha.900')
  const corDestaque = useColorModeValue('brand.100', 'brand.800')
  const corFundo = useColorModeValue('gray.50', 'gray.900')

  const animationPulse = prefersReducedMotion ? undefined : `${pulse} 2s infinite`

  function mostrarNotificacao({
    titulo,
    descricao,
    status,
    icone,
    duracao = 5000,
  }: {
    titulo: string
    descricao: string
    status: 'info' | 'warning' | 'success' | 'error'
    icone?: React.ReactNode
    duracao?: number
  }) {
    if (!notificacoesAtivas) return

    const corFundo = {
      info: 'blue.100',
      warning: 'orange.100',
      success: 'green.100',
      error: 'red.100',
    }[status]

    const corBorda = {
      info: 'blue.500',
      warning: 'orange.500',
      success: 'green.500',
      error: 'red.500',
    }[status]

    toast({
      title: titulo,
      description: descricao,
      status,
      duration: duracao,
      isClosable: true,
      position: 'top',
      icon: icone,
      containerStyle: {
        bg: corFundo,
        borderLeft: '4px solid',
        borderColor: corBorda,
        borderRadius: 'md',
        color: 'gray.800',
      },
    })
  }

  async function handleVotar() {
    const sucesso = await votar(onibusSelecionado, destinoSelecionado)
    if (sucesso) {
      atualizarDados()
      mostrarNotificacao({
        titulo: 'Voto realizado',
        descricao: 'Seu voto foi registrado com sucesso!',
        status: 'success',
        icone: <CheckCircle size={20} />,
      })
      fecharConfirmacao()
    } else {
      mostrarNotificacao({
        titulo: 'Erro ao votar',
        descricao: 'Ocorreu um erro ao registrar seu voto.',
        status: 'error',
        icone: <XCircle size={20} />,
      })
    }
  }

  async function handleCancelarVoto() {
    const sucesso = await cancelarVoto()
    if (sucesso) {
      atualizarDados()
      mostrarNotificacao({
        titulo: 'Voto cancelado',
        descricao: 'Seu voto foi cancelado com sucesso.',
        status: 'success',
        icone: <CheckCircle size={20} />,
      })
    } else {
      mostrarNotificacao({
        titulo: 'Erro ao cancelar',
        descricao: 'Ocorreu um erro ao cancelar seu voto.',
        status: 'error',
        icone: <XCircle size={20} />,
      })
    }
  }

  function calcularTempoRestante() {
    if (!enquete?.horarioFechamento) return ''

    const agora = new Date()
    const fechamento = new Date(enquete.horarioFechamento)
    const diferenca = fechamento.getTime() - agora.getTime()

    if (diferenca <= 0) return 'Enquete encerrada'

    const horas = Math.floor(diferenca / (1000 * 60 * 60))
    const minutos = Math.floor((diferenca % (1000 * 60 * 60)) / (1000 * 60))
    const segundos = Math.floor((diferenca % (1000 * 60)) / 1000)

    return `${horas}h ${minutos}m ${segundos}s`
  }

  useEffect(() => {
    Promise.all([buscarEnqueteCompleta(), buscarDestinos(), buscarDadosUsuario()]).finally(() =>
      setCarregando(false)
    )

    const intervalo = setInterval(() => {
      buscarEnqueteCompleta(true).then(({ novaEnquete }) => {
        if (novaEnquete) {
          mostrarNotificacao({
            titulo: 'Nova Enquete Aberta!',
            descricao: `Uma nova enquete foi aberta para hoje!`,
            status: 'info',
            icone: <Info size={24} />,
          })
        }
      })
    }, 10000)

    const intervaloHorario = setInterval(() => {
      setTempoRestante(calcularTempoRestante())
    }, 1000)

    return () => {
      clearInterval(intervalo)
      clearInterval(intervaloHorario)
    }
  }, [])

  const diasDaSemana = [
    'Domingo',
    'Segunda-feira',
    'Terça-feira',
    'Quarta-feira',
    'Quinta-feira',
    'Sexta-feira',
    'Sábado',
  ]
  const hoje = new Date()
  const nomeDiaSemana = diasDaSemana[hoje.getDay()]
  const dataFormatada = hoje.toLocaleDateString('pt-BR')

  const capacidadeTotalDoisOnibus = onibus
    .filter((bus) => bus.numero === '1' || bus.numero === '2')
    .reduce((total, bus) => total + (bus.capacidade - bus.vagasDisponiveis), 0)

  const doisOnibusLotados = capacidadeTotalDoisOnibus >= 92

  if (carregando) {
    return <LoadingScreen />
  }

  return (
    <Container
      maxW="container.md"
      py={{ base: 4, md: 8 }}
      px={{ base: 4, md: 6 }}
      bg={corFundo}
      minH="100vh"
    >
      <HeaderSection
        nomeDiaSemana={nomeDiaSemana}
        dataFormatada={dataFormatada}
        tempoRestante={tempoRestante}
        notificacoesAtivas={notificacoesAtivas}
        setNotificacoesAtivas={setNotificacoesAtivas}
        atualizarDados={atualizarDados}
        atualizando={atualizando}
        abrirAjuda={abrirAjuda}
        logout={logout}
      />

      <AnimatePresence>
        {enquete ? (
          <ScaleFade in={true} initialScale={0.95}>
            <EnqueteStatusCard enquete={enquete} corDestaque={corDestaque} />
          </ScaleFade>
        ) : (
          <SlideFade in={true} offsetY="20px">
            <Alert
              status="warning"
              borderRadius="md"
              variant="subtle"
              bg="orange.50"
              borderLeft="4px solid"
              borderColor="orange.500"
              mb={6}
            >
              <AlertIcon as={AlertCircle} color="orange.600" boxSize="24px" />
              <Box>
                <AlertTitle fontSize="md">Nenhuma enquete aberta</AlertTitle>
                <AlertDescription fontSize="sm">
                  Não há votação disponível no momento.
                </AlertDescription>
              </Box>
            </Alert>
          </SlideFade>
        )}
      </AnimatePresence>

      {dadosUsuario && (
        <SlideFade in={true} offsetY="20px">
          <UsuarioInfoCard dadosUsuario={dadosUsuario} corPrimaria={corPrimaria} />
        </SlideFade>
      )}

      {votoUsuario && (
        <ScaleFade in={true} initialScale={0.95}>
          <VotoUsuarioCard votoUsuario={votoUsuario} onCancelarVoto={handleCancelarVoto} />
        </ScaleFade>
      )}

      {enquete && !votoUsuario && (
        <SlideFade in={true} offsetY="20px">
          <DestinoCard
            destinoSelecionado={destinoSelecionado}
            destinos={destinos}
            abrirSelecaoDestino={abrirSelecaoDestino}
            corPrimaria={corPrimaria}
          />
        </SlideFade>
      )}

      {estatisticas && (
        <EstatisticasSection
          estatisticas={estatisticas}
          mostrarEstatisticas={mostrarEstatisticas}
          setMostrarEstatisticas={setMostrarEstatisticas}
          corPrimaria={corPrimaria}
          corFundoCard={corFundoCard}
        />
      )}

      {enquete && (
        <OnibusListSection
          onibus={onibus}
          doisOnibusLotados={doisOnibusLotados}
          votoUsuario={votoUsuario}
          destinoSelecionado={destinoSelecionado}
          setOnibusSelecionado={setOnibusSelecionado}
          abrirDetalhes={abrirDetalhes}
          abrirConfirmacao={abrirConfirmacao}
          corFundoCard={corFundoCard}
          corPrimaria={corPrimaria}
        />
      )}

      <ConfirmacaoVotoModal
        isOpen={isConfirmacaoAberta}
        onClose={fecharConfirmacao}
        onConfirm={handleVotar}
        onibusSelecionado={onibusSelecionado}
        destinoSelecionado={
          destinoSelecionado
            ? destinos.find((d) => d.id === destinoSelecionado)?.nome || null
            : null
        }
      />

      <SelecaoDestinoModal
        isOpen={isSelecaoDestinoAberta}
        onClose={fecharSelecaoDestino}
        destinos={destinos}
        destinoSelecionado={destinoSelecionado}
        setDestinoSelecionado={setDestinoSelecionado}
        isMobile={isMobile}
        corPrimaria={corPrimaria}
      />

      <DetalhesOnibusModal
        isOpen={isDetalhesAberto}
        onClose={fecharDetalhes}
        onibusSelecionado={onibusSelecionado}
        isMobile={isMobile}
        corFundoCard={corFundoCard}
      />

      <AjudaModal isOpen={isAjudaAberta} onClose={fecharAjuda} corPrimaria={corPrimaria} />
    </Container>
  )
}
