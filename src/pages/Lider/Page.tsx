'use client'

import {
  Container,
  VStack,
  HStack,
  Heading,
  Text,
  Card,
  CardHeader,
  CardBody,
  Button,
  Badge,
  SimpleGrid,
  Box,
  Avatar,
  Checkbox,
  useColorModeValue,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Divider,
  Stat,
  StatLabel,
  StatNumber,
  useToast,
} from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import { Bus, CheckCircle, XCircle, Clock, MessageSquare, Phone, MapPin } from 'lucide-react'
import type { VotoUsuario } from '@app/components/types'
// import { USAR_DADOS_FALSOS } from '@app/components/shared/mock'

interface PassageiroOnibus {
  id: number
  nome: string
  telefone?: string
  destino: string
  embarcou: boolean
  justificativa?: string
  horarioEmbarque?: string
}

interface ChamadaOnibus {
  onibus: Onibus
  passageiros: PassageiroOnibus[]
  chamadaRealizada: boolean
  horarioChamada?: string
}

export type Cidade = {
  id: number
  nome: string
  UF: string
}

export type DadosUsuario = {
  id: number
  nome: string
  email: string
  matricula?: string
  foto?: string
  tipo: 'USUARIO' | 'LIDER' | 'GESTOR'
  status: 'PENDENTE' | 'APROVADO' | 'REPROVADO'
  isCarona: boolean
  cidadeDestino: Cidade
  cidadeOrigem: Cidade
}

export type Onibus = {
  id: number
  numero: string
  nome: string
  capacidade: number
  vagasDisponiveis: number
  horarioSaida: string
  motorista: string
  placa?: string
  cidadeOrigemId: number
  cidadeDestinoId: number
  usuarios: {
    nome: string
    destino: string
    embarcou?: boolean
  }[]
}

const USAR_DADOS_FALSOS = true

interface UsuarioOnibus {
  id: number
  nome: string
  destino: string
  voto: VotoUsuario
}

interface AtribuicaoOnibus {
  onibus: Onibus
  usuarios: UsuarioOnibus[]
  cidadeLider: Cidade
}

export function Component() {
  const [dadosLider, setDadosLider] = useState<DadosUsuario | null>(null)
  const [atribuicaoOnibus, setAtribuicaoOnibus] = useState<AtribuicaoOnibus | null>(null)
  const [carregando, setCarregando] = useState(true)

  const corFundo = useColorModeValue('gray.50', 'gray.900')
  const corFundoCard = useColorModeValue('white', 'gray.800')
  const corPrimaria = useColorModeValue('brand.600', 'brand.300')

  async function carregarDados() {
    try {
      if (USAR_DADOS_FALSOS) {
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Dados mockados do líder
        setDadosLider({
          id: 1,
          nome: 'Carlos Santos',
          email: 'carlos.lider@email.com',
          matricula: 'LID-001',
          tipo: 'LIDER',
          status: 'APROVADO',
          isCarona: false,
          cidadeOrigem: { id: 1, nome: 'São Bernardo do Campo', UF: 'SP' },
          cidadeDestino: { id: 2, nome: 'Santo André', UF: 'SP' },
        })

        // Dados mockados da atribuição
        setAtribuicaoOnibus({
          onibus: {
            id: 1,
            numero: '001',
            nome: 'Rota Centro',
            capacidade: 50,
            vagasDisponiveis: 5,
            horarioSaida: '17:30',
            motorista: 'João Silva',
            placa: 'ABC-1234',
            cidadeOrigemId: 1,
            cidadeDestinoId: 2,
            usuarios: [],
          },
          usuarios: [
            {
              id: 1,
              nome: 'Ana Silva',
              destino: 'UFABC - Campus Santo André',
              voto: 'SIM',
            },
            {
              id: 2,
              nome: 'Pedro Santos',
              destino: 'UFABC - Campus Santo André',
              voto: 'SIM',
            },
            {
              id: 3,
              nome: 'Maria Oliveira',
              destino: 'FATEC - Santo André',
              voto: 'NAO',
            },
            {
              id: 4,
              nome: 'João Costa',
              destino: 'UFABC - Campus Santo André',
              voto: 'SIM',
            },
            {
              id: 5,
              nome: 'Fernanda Lima',
              destino: 'FATEC - Santo André',
              voto: 'NAO',
            },
          ],
          cidadeLider: { id: 1, nome: 'São Bernardo do Campo', UF: 'SP' },
        })
        return
      }

      // Aqui viriam as chamadas reais para a API
      // const [dadosLider, atribuicao] = await Promise.all([
      //   fetchComAuth('/api/lider/dados'),
      //   fetchComAuth('/api/lider/atribuicao-onibus'),
      // ])
    } catch (error) {
      console.error('Erro ao carregar dados:', error)
    } finally {
      setCarregando(false)
    }
  }

  useEffect(() => {
    carregarDados()
  }, [])

  if (carregando) {
    return (
      <Container maxW="container.lg" py="8" bg={corFundo} minH="100vh">
        <VStack spacing={6} justify="center" minH="50vh">
          <Text fontSize="lg">Carregando painel do líder...</Text>
        </VStack>
      </Container>
    )
  }

  if (!atribuicaoOnibus) {
    return (
      <Container maxW="container.lg" py="8" bg={corFundo} minH="100vh">
        <VStack spacing={6} align="stretch">
          <Box>
            <Heading size="lg" color={corPrimaria}>
              Painel do Líder
            </Heading>
            <Text color="gray.600">Olá, {dadosLider?.nome}</Text>
          </Box>

          <Alert status="info" borderRadius="md">
            <AlertIcon />
            <Box>
              <AlertTitle>Nenhum ônibus atribuído</AlertTitle>
              <AlertDescription>
                Você não possui um ônibus atribuído para hoje ou a enquete ainda não foi fechada.
              </AlertDescription>
            </Box>
          </Alert>
        </VStack>
      </Container>
    )
  }

  const usuariosDaCidade = atribuicaoOnibus.usuarios.filter(
    (usuario) => dadosLider?.cidadeOrigem.id === atribuicaoOnibus.cidadeLider.id
  )

  return (
    <Container maxW="container.lg" py="8" bg={corFundo} minH="100vh">
      <VStack spacing={6} align="stretch">
        <Box>
          <Heading size="lg" color={corPrimaria}>
            Painel do Líder
          </Heading>
          <Text color="gray.600">
            Olá, {dadosLider?.nome} • Ônibus {atribuicaoOnibus.onibus.numero}
          </Text>
        </Box>

        {/* Informações do Ônibus */}
        <Card bg={corFundoCard}>
          <CardHeader>
            <HStack spacing={3}>
              <Box p={2} bg="brand.100" borderRadius="md">
                <Bus size={20} className="text-brand-600" />
              </Box>
              <Box>
                <Heading size="md">
                  Ônibus {atribuicaoOnibus.onibus.numero} - {atribuicaoOnibus.onibus.nome}
                </Heading>
                <Text fontSize="sm" color="gray.500">
                  {atribuicaoOnibus.onibus.placa} • Motorista: {atribuicaoOnibus.onibus.motorista}
                </Text>
              </Box>
            </HStack>
          </CardHeader>
          <CardBody pt={0}>
            <SimpleGrid columns={{ base: 2, md: 4 }} spacing={4}>
              <Stat>
                <StatLabel>Horário de Saída</StatLabel>
                <StatNumber fontSize="lg">{atribuicaoOnibus.onibus.horarioSaida}</StatNumber>
              </Stat>
              <Stat>
                <StatLabel>Capacidade</StatLabel>
                <StatNumber fontSize="lg">{atribuicaoOnibus.onibus.capacidade}</StatNumber>
              </Stat>
              <Stat>
                <StatLabel>Passageiros</StatLabel>
                <StatNumber fontSize="lg">{atribuicaoOnibus.usuarios.length}</StatNumber>
              </Stat>
              <Stat>
                <StatLabel>Vagas Livres</StatLabel>
                <StatNumber fontSize="lg">{atribuicaoOnibus.onibus.vagasDisponiveis}</StatNumber>
              </Stat>
            </SimpleGrid>
          </CardBody>
        </Card>

        {/* Lista de Passageiros */}
        <Card bg={corFundoCard}>
          <CardHeader>
            <HStack justify="space-between">
              <Heading size="md">Lista de Passageiros</Heading>
            </HStack>
          </CardHeader>
          <CardBody pt={0}>
            <TableContainer>
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th>Passageiro</Th>
                    <Th>Destino</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {usuariosDaCidade.map((passageiro) => (
                    <Tr key={passageiro.id}>
                      <Td>
                        <HStack>
                          <Avatar name={passageiro.nome} size="sm" />
                          <Text fontWeight="medium">{passageiro.nome}</Text>
                        </HStack>
                      </Td>
                      <Td>
                        <HStack>
                          <MapPin size={14} className="text-gray-500" />
                          <Text fontSize="sm">{passageiro.destino}</Text>
                        </HStack>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
          </CardBody>
        </Card>
      </VStack>
    </Container>
  )
}
