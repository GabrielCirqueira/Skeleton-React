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
  Progress,
  Divider,
  IconButton,
  useColorModeValue,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import {
  Users,
  Settings,
  Bus,
  UserCheck,
  Plus,
  MoreVertical,
  Eye,
  Edit,
  Trash2,
  Clock,
  BarChart3,
  UserPlus,
  Car,
  Building,
  CheckCircle,
  XCircle,
  Shuffle,
  Vote,
} from 'lucide-react'
import type {
  DadosUsuario,
  UsuarioPendente,
  Carona,
  Enquete,
  Onibus,
  DestinoInstituicao,
  Estatisticas,
} from '@app/components/types'
import { dadosFalsos } from '@app/components/shared/mock'
import { ModalCadastroCidade } from '@app/components/modals/modal-cadastro-cidade'
import { ModalCadastroInstituicao } from '@app/components/modals/modal-cadastro-instituicao'
import { ModalCadastroOnibus } from '@app/components/modals/modal-cadastro-onibus'
import { ModalCadastroUsuario } from '@app/components/modals/modal-cadastro-usuario'
import { ModalVotoManual } from '@app/components/modals/modal-voto-manual'

const USAR_DADOS_FALSOS = true

export function Component() {
  const [usuariosPendentes, setUsuariosPendentes] = useState<UsuarioPendente[]>([])
  const [usuariosAprovados, setUsuariosAprovados] = useState<DadosUsuario[]>([])
  const [caronas, setCaronas] = useState<Carona[]>([])
  const [enqueteAtual, setEnqueteAtual] = useState<Enquete | null>(null)
  const [onibus, setOnibus] = useState<Onibus[]>([])
  const [destinos, setDestinos] = useState<DestinoInstituicao[]>([])
  const [estatisticas, setEstatisticas] = useState<Estatisticas | null>(null)
  const [carregando, setCarregando] = useState(true)

  const [modalCidadeAberto, setModalCidadeAberto] = useState(false)
  const [modalInstituicaoAberto, setModalInstituicaoAberto] = useState(false)
  const [modalOnibusAberto, setModalOnibusAberto] = useState(false)
  const [modalUsuarioAberto, setModalUsuarioAberto] = useState(false)
  const [modalVotoManualAberto, setModalVotoManualAberto] = useState(false)
  const [itemParaEditar, setItemParaEditar] = useState<any>(null)
  const [buscaUsuarios, setBuscaUsuarios] = useState('')
  const [buscaCidades, setBuscaCidades] = useState('')
  const [buscaOnibus, setBuscaOnibus] = useState('')

  const corFundo = useColorModeValue('gray.50', 'gray.900')
  const corFundoCard = useColorModeValue('white', 'gray.800')
  const corPrimaria = useColorModeValue('brand.600', 'brand.300')

  async function carregarDados() {
    try {
      if (USAR_DADOS_FALSOS) {
        await new Promise((resolve) => setTimeout(resolve, 1000))
        setUsuariosPendentes(dadosFalsos.usuariosPendentes)
        setCaronas(dadosFalsos.caronas)
        setEnqueteAtual(dadosFalsos.enquete)
        setDestinos(dadosFalsos.destinos)
        setEstatisticas(dadosFalsos.estatisticas)

        // Dados mockados para usuários aprovados
        setUsuariosAprovados([
          {
            ...dadosFalsos.dadosUsuario,
            id: 1,
            nome: 'Ana Silva',
            email: 'ana@email.com',
          },
          {
            ...dadosFalsos.dadosUsuario,
            id: 2,
            nome: 'Carlos Santos',
            email: 'carlos@email.com',
            tipo: 'LIDER',
          },
          {
            ...dadosFalsos.dadosUsuario,
            id: 3,
            nome: 'Maria Oliveira',
            email: 'maria@email.com',
            isCarona: true,
          },
        ])

        // Dados mockados para ônibus
        setOnibus([
          {
            id: 1,
            numero: '001',
            nome: 'Rota Centro',
            capacidade: 50,
            vagasDisponiveis: 12,
            horarioSaida: '17:30',
            motorista: 'João Silva',
            placa: 'ABC-1234',
            cidadeOrigemId: 1,
            cidadeDestinoId: 2,
            usuarios: Array.from({ length: 38 }, (_, i) => ({
              nome: `Passageiro ${i + 1}`,
              destino: 'UFABC',
              embarcou: i % 3 === 0,
            })),
          },
          {
            id: 2,
            numero: '002',
            nome: 'Rota Leste',
            capacidade: 45,
            vagasDisponiveis: 8,
            horarioSaida: '17:45',
            motorista: 'Ana Costa',
            placa: 'DEF-5678',
            cidadeOrigemId: 1,
            cidadeDestinoId: 3,
            usuarios: Array.from({ length: 37 }, (_, i) => ({
              nome: `Passageiro ${i + 1}`,
              destino: 'USP',
              embarcou: i % 4 === 0,
            })),
          },
        ])
        return
      }

      // Aqui viriam as chamadas reais para a API
      // const [pendentes, aprovados, caronasData] = await Promise.all([
      //   fetchComAuth('/api/gestor/usuarios-pendentes'),
      //   fetchComAuth('/api/gestor/usuarios-aprovados'),
      //   fetchComAuth('/api/gestor/caronas'),
      // ])
    } catch (error) {
      console.error('Erro ao carregar dados:', error)
    } finally {
      setCarregando(false)
    }
  }

  async function aprovarUsuario(id: number) {
    try {
      if (USAR_DADOS_FALSOS) {
        const usuario = usuariosPendentes.find((u) => u.id === id)
        if (usuario) {
          setUsuariosPendentes((prev) => prev.filter((u) => u.id !== id))
          setUsuariosAprovados((prev) => [
            ...prev,
            {
              ...usuario,
              tipo: 'USUARIO',
              status: 'APROVADO',
              isCarona: false,
              matricula: usuario.matricula || `MAT-${id}`,
            },
          ])
        }
        return
      }

      // await fetchComAuth(`/api/gestor/aprovar-usuario/${id}`, { method: 'POST' })
      carregarDados()
    } catch (error) {
      console.error('Erro ao aprovar usuário:', error)
    }
  }

  async function reprovarUsuario(id: number) {
    try {
      if (USAR_DADOS_FALSOS) {
        setUsuariosPendentes((prev) => prev.filter((u) => u.id !== id))
        return
      }

      // await fetchComAuth(`/api/gestor/reprovar-usuario/${id}`, { method: 'POST' })
      carregarDados()
    } catch (error) {
      console.error('Erro ao reprovar usuário:', error)
    }
  }

  useEffect(() => {
    carregarDados()
  }, [])

  if (carregando) {
    return (
      <Container maxW="container.xl" py="8" bg={corFundo} minH="100vh">
        <VStack spacing={6} justify="center" minH="50vh">
          <Text fontSize="lg">Carregando painel do gestor...</Text>
        </VStack>
      </Container>
    )
  }

  return (
    <Container maxW="container.xl" py="8" bg={corFundo} minH="100vh">
      <VStack spacing={6} align="stretch">
        <HStack justify="space-between" align="center">
          <Box>
            <Heading size="lg" color={corPrimaria}>
              Painel do Gestor
            </Heading>
            <Text color="gray.600">Gerencie usuários, ônibus e configurações do sistema</Text>
          </Box>
          <HStack spacing={2}>
            <Button
              leftIcon={<UserPlus size={20} />}
              colorScheme="brand"
              onClick={() => setModalUsuarioAberto(true)}
            >
              Cadastrar Usuário
            </Button>
            <Button
              leftIcon={<Plus size={20} />}
              variant="outline"
              colorScheme="brand"
              onClick={() => setModalOnibusAberto(true)}
            >
              Novo Ônibus
            </Button>
          </HStack>
        </HStack>

        {/* Cards de Estatísticas */}
        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6}>
          <Card bg={corFundoCard}>
            <CardBody>
              <Stat>
                <StatLabel>Usuários Pendentes</StatLabel>
                <StatNumber color="orange.500">{usuariosPendentes.length}</StatNumber>
                <StatHelpText>Aguardando aprovação</StatHelpText>
              </Stat>
            </CardBody>
          </Card>

          <Card bg={corFundoCard}>
            <CardBody>
              <Stat>
                <StatLabel>Usuários Ativos</StatLabel>
                <StatNumber color="green.500">{usuariosAprovados.length}</StatNumber>
                <StatHelpText>Aprovados no sistema</StatHelpText>
              </Stat>
            </CardBody>
          </Card>

          <Card bg={corFundoCard}>
            <CardBody>
              <Stat>
                <StatLabel>Votos Hoje</StatLabel>
                <StatNumber color="blue.500">{estatisticas?.totalVotos || 0}</StatNumber>
                <StatHelpText>Na enquete atual</StatHelpText>
              </Stat>
            </CardBody>
          </Card>

          <Card bg={corFundoCard}>
            <CardBody>
              <Stat>
                <StatLabel>Ônibus Ativos</StatLabel>
                <StatNumber color="purple.500">{onibus.length}</StatNumber>
                <StatHelpText>Em operação</StatHelpText>
              </Stat>
            </CardBody>
          </Card>
        </SimpleGrid>

        {/* Status da Enquete Atual */}
        {enqueteAtual && (
          <Alert status="info" borderRadius="md">
            <AlertIcon />
            <Box>
              <AlertTitle>Enquete #{enqueteAtual.id} em andamento</AlertTitle>
              <AlertDescription>
                Status: {enqueteAtual.status} • Limite: {enqueteAtual.limiteVagas}
              </AlertDescription>
            </Box>
          </Alert>
        )}

        <Tabs variant="enclosed" colorScheme="brand">
          <TabList>
            <Tab>
              <HStack spacing={2}>
                <UserCheck size={16} />
                <span>Aprovações</span>
                {usuariosPendentes.length > 0 && (
                  <Badge colorScheme="orange" borderRadius="full">
                    {usuariosPendentes.length}
                  </Badge>
                )}
              </HStack>
            </Tab>
            <Tab>
              <HStack spacing={2}>
                <Users size={16} />
                <span>Usuários</span>
              </HStack>
            </Tab>
            <Tab>
              <HStack spacing={2}>
                <Bus size={16} />
                <span>Ônibus</span>
              </HStack>
            </Tab>
            <Tab>
              <HStack spacing={2}>
                <Car size={16} />
                <span>Caronas</span>
              </HStack>
            </Tab>
            <Tab>
              <HStack spacing={2}>
                <BarChart3 size={16} />
                <span>Relatórios</span>
              </HStack>
            </Tab>
            <Tab>
              <HStack spacing={2}>
                <Settings size={16} />
                <span>Configurações</span>
              </HStack>
            </Tab>
            <Tab>
              <HStack spacing={2}>
                <Vote size={16} />
                <span>Votos Manuais</span>
              </HStack>
            </Tab>
            <Tab>
              <HStack spacing={2}>
                <Shuffle size={16} />
                <span>Distribuição</span>
              </HStack>
            </Tab>
          </TabList>

          <TabPanels>
            {/* Aba de Aprovações */}
            <TabPanel>
              <VStack spacing={4} align="stretch">
                <Heading size="md">Usuários Pendentes de Aprovação</Heading>

                {usuariosPendentes.length === 0 ? (
                  <Card bg={corFundoCard}>
                    <CardBody textAlign="center" py={8}>
                      <CheckCircle size={48} className="text-green-500 mx-auto mb-4" />
                      <Text fontSize="lg" fontWeight="medium" mb={2}>
                        Nenhum usuário pendente
                      </Text>
                      <Text color="gray.500">Todos os usuários foram processados</Text>
                    </CardBody>
                  </Card>
                ) : (
                  <VStack spacing={3}>
                    {usuariosPendentes.map((usuario) => (
                      <Card key={usuario.id} bg={corFundoCard} w="full">
                        <CardBody>
                          <HStack justify="space-between" align="center">
                            <HStack spacing={4}>
                              <Avatar name={usuario.nome} size="md" />
                              <Box>
                                <Text fontWeight="semibold">{usuario.nome}</Text>
                                <Text fontSize="sm" color="gray.500">
                                  {usuario.email}
                                </Text>
                                <HStack spacing={4} mt={1}>
                                  <Text fontSize="xs" color="gray.400">
                                    {usuario.cidadeOrigem.nome} → {usuario.cidadeDestino.nome}
                                  </Text>
                                  <Text fontSize="xs" color="gray.400">
                                    {new Date(usuario.dataCadastro).toLocaleDateString()}
                                  </Text>
                                </HStack>
                              </Box>
                            </HStack>

                            <HStack spacing={2}>
                              <Button
                                size="sm"
                                colorScheme="green"
                                leftIcon={<CheckCircle size={16} />}
                                onClick={() => aprovarUsuario(usuario.id)}
                              >
                                Aprovar
                              </Button>
                              <Button
                                size="sm"
                                colorScheme="red"
                                variant="outline"
                                leftIcon={<XCircle size={16} />}
                                onClick={() => reprovarUsuario(usuario.id)}
                              >
                                Reprovar
                              </Button>
                            </HStack>
                          </HStack>
                        </CardBody>
                      </Card>
                    ))}
                  </VStack>
                )}
              </VStack>
            </TabPanel>

            {/* Aba de Usuários */}
            <TabPanel>
              <VStack spacing={4} align="stretch">
                <HStack justify="space-between">
                  <Heading size="md">Usuários Aprovados</Heading>
                  <Button leftIcon={<UserPlus size={16} />} colorScheme="brand" size="sm">
                    Adicionar Usuário
                  </Button>
                </HStack>

                <TableContainer>
                  <Table variant="simple">
                    <Thead>
                      <Tr>
                        <Th>Usuário</Th>
                        <Th>Tipo</Th>
                        <Th>Origem → Destino</Th>
                        <Th>Status</Th>
                        <Th>Ações</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {usuariosAprovados.map((usuario) => (
                        <Tr key={usuario.id}>
                          <Td>
                            <HStack>
                              <Avatar name={usuario.nome} size="sm" />
                              <Box>
                                <Text fontWeight="medium">{usuario.nome}</Text>
                                <Text fontSize="sm" color="gray.500">
                                  {usuario.email}
                                </Text>
                              </Box>
                            </HStack>
                          </Td>
                          <Td>
                            <Badge
                              colorScheme={
                                usuario.tipo === 'GESTOR'
                                  ? 'purple'
                                  : usuario.tipo === 'LIDER'
                                    ? 'blue'
                                    : 'green'
                              }
                            >
                              {usuario.tipo}
                            </Badge>
                            {usuario.isCarona && (
                              <Badge colorScheme="orange" ml={1}>
                                Carona
                              </Badge>
                            )}
                          </Td>
                          <Td>
                            <Text fontSize="sm">
                              {usuario.cidadeOrigem.nome} → {usuario.cidadeDestino.nome}
                            </Text>
                          </Td>
                          <Td>
                            <Badge colorScheme="green">Ativo</Badge>
                          </Td>
                          <Td>
                            <Menu>
                              <MenuButton
                                as={IconButton}
                                icon={<MoreVertical size={16} />}
                                variant="ghost"
                                size="sm"
                              />
                              <MenuList>
                                <MenuItem icon={<Eye size={16} />}>Ver Detalhes</MenuItem>
                                <MenuItem icon={<Edit size={16} />}>Editar</MenuItem>
                                <MenuItem icon={<Trash2 size={16} />} color="red.500">
                                  Remover
                                </MenuItem>
                              </MenuList>
                            </Menu>
                          </Td>
                        </Tr>
                      ))}
                    </Tbody>
                  </Table>
                </TableContainer>
              </VStack>
            </TabPanel>

            {/* Aba de Ônibus */}
            <TabPanel>
              <VStack spacing={4} align="stretch">
                <HStack justify="space-between">
                  <Heading size="md">Gerenciar Ônibus</Heading>
                  <Button leftIcon={<Plus size={16} />} colorScheme="brand" size="sm">
                    Adicionar Ônibus
                  </Button>
                </HStack>

                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                  {onibus.map((bus) => (
                    <Card key={bus.id} bg={corFundoCard}>
                      <CardHeader>
                        <HStack justify="space-between">
                          <HStack>
                            <Box p={2} bg="brand.100" borderRadius="md">
                              <Bus size={20} className="text-brand-600" />
                            </Box>
                            <Box>
                              <Text fontWeight="bold">
                                Ônibus {bus.numero} - {bus.nome}
                              </Text>
                              <Text fontSize="sm" color="gray.500">
                                {bus.placa} • {bus.motorista}
                              </Text>
                            </Box>
                          </HStack>
                          <Menu>
                            <MenuButton
                              as={IconButton}
                              icon={<MoreVertical size={16} />}
                              variant="ghost"
                              size="sm"
                            />
                            <MenuList>
                              <MenuItem icon={<Eye size={16} />}>Ver Passageiros</MenuItem>
                              <MenuItem icon={<Edit size={16} />}>Editar</MenuItem>
                              <MenuItem icon={<Trash2 size={16} />} color="red.500">
                                Remover
                              </MenuItem>
                            </MenuList>
                          </Menu>
                        </HStack>
                      </CardHeader>
                      <CardBody pt={0}>
                        <VStack spacing={3} align="stretch">
                          <HStack justify="space-between">
                            <Text fontSize="sm">Capacidade:</Text>
                            <Text fontWeight="medium">{bus.capacidade} lugares</Text>
                          </HStack>

                          <HStack justify="space-between">
                            <Text fontSize="sm">Ocupação:</Text>
                            <Text fontWeight="medium">
                              {bus.capacidade - bus.vagasDisponiveis}/{bus.capacidade}
                            </Text>
                          </HStack>

                          <Progress
                            value={((bus.capacidade - bus.vagasDisponiveis) / bus.capacidade) * 100}
                            colorScheme="brand"
                            size="sm"
                            borderRadius="full"
                          />

                          <HStack justify="space-between">
                            <Text fontSize="sm">Horário de Saída:</Text>
                            <Badge colorScheme="blue">{bus.horarioSaida}</Badge>
                          </HStack>
                        </VStack>
                      </CardBody>
                    </Card>
                  ))}
                </SimpleGrid>
              </VStack>
            </TabPanel>

            {/* Aba de Caronas */}
            <TabPanel>
              <VStack spacing={4} align="stretch">
                <HStack justify="space-between">
                  <Heading size="md">Gerenciar Caronas</Heading>
                  <Button leftIcon={<Plus size={16} />} colorScheme="brand" size="sm">
                    Cadastrar Carona
                  </Button>
                </HStack>

                {caronas.length === 0 ? (
                  <Card bg={corFundoCard}>
                    <CardBody textAlign="center" py={8}>
                      <Car size={48} className="text-gray-400 mx-auto mb-4" />
                      <Text fontSize="lg" fontWeight="medium" mb={2}>
                        Nenhuma carona cadastrada
                      </Text>
                      <Text color="gray.500">Cadastre caronas para usuários sem celular</Text>
                    </CardBody>
                  </Card>
                ) : (
                  <VStack spacing={3}>
                    {caronas.map((carona) => (
                      <Card key={carona.id} bg={corFundoCard} w="full">
                        <CardBody>
                          <HStack justify="space-between" align="center">
                            <HStack spacing={4}>
                              <Box p={2} bg="orange.100" borderRadius="md">
                                <Car size={20} className="text-orange-600" />
                              </Box>
                              <Box>
                                <Text fontWeight="semibold">{carona.nome}</Text>
                                <Text fontSize="sm" color="gray.500">
                                  Responsável: {carona.responsavel}
                                </Text>
                                <Text fontSize="sm" color="gray.500">
                                  Destino: {carona.destino.nome}
                                </Text>
                                {carona.observacoes && (
                                  <Text fontSize="xs" color="gray.400">
                                    {carona.observacoes}
                                  </Text>
                                )}
                              </Box>
                            </HStack>

                            <Menu>
                              <MenuButton
                                as={IconButton}
                                icon={<MoreVertical size={16} />}
                                variant="ghost"
                                size="sm"
                              />
                              <MenuList>
                                <MenuItem icon={<Edit size={16} />}>Editar</MenuItem>
                                <MenuItem icon={<Trash2 size={16} />} color="red.500">
                                  Remover
                                </MenuItem>
                              </MenuList>
                            </Menu>
                          </HStack>
                        </CardBody>
                      </Card>
                    ))}
                  </VStack>
                )}
              </VStack>
            </TabPanel>

            {/* Aba de Relatórios */}
            <TabPanel>
              <VStack spacing={6} align="stretch">
                <Heading size="md">Relatórios e Estatísticas</Heading>

                {estatisticas && (
                  <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
                    <Card bg={corFundoCard}>
                      <CardHeader>
                        <Heading size="sm">Distribuição por Instituição</Heading>
                      </CardHeader>
                      <CardBody>
                        <VStack spacing={3} align="stretch">
                          {Object.entries(estatisticas.distribuicaoPorInstituicao).map(
                            ([instituicao, votos]) => (
                              <Box key={instituicao}>
                                <HStack justify="space-between" mb={1}>
                                  <Text fontSize="sm">{instituicao}</Text>
                                  <Text fontSize="sm" fontWeight="bold">
                                    {votos}
                                  </Text>
                                </HStack>
                                <Progress
                                  value={(votos / estatisticas.totalVotos) * 100}
                                  size="sm"
                                  colorScheme="brand"
                                  borderRadius="full"
                                />
                              </Box>
                            )
                          )}
                        </VStack>
                      </CardBody>
                    </Card>

                    <Card bg={corFundoCard}>
                      <CardHeader>
                        <Heading size="sm">Ocupação Geral</Heading>
                      </CardHeader>
                      <CardBody>
                        <VStack spacing={4}>
                          <Box textAlign="center">
                            <Text fontSize="3xl" fontWeight="bold" color="brand.500">
                              {estatisticas.ocupacaoTotal}%
                            </Text>
                            <Text fontSize="sm" color="gray.500">
                              da capacidade total
                            </Text>
                          </Box>
                          <Progress
                            value={estatisticas.ocupacaoTotal}
                            size="lg"
                            colorScheme="brand"
                            borderRadius="full"
                          />
                        </VStack>
                      </CardBody>
                    </Card>

                    <Card bg={corFundoCard}>
                      <CardHeader>
                        <Heading size="sm">Atividade Recente</Heading>
                      </CardHeader>
                      <CardBody>
                        <Stat>
                          <StatLabel>Votos na última hora</StatLabel>
                          <StatNumber>{estatisticas.votosUltimaHora}</StatNumber>
                          <StatHelpText>de {estatisticas.totalVotos} total</StatHelpText>
                        </Stat>
                      </CardBody>
                    </Card>
                  </SimpleGrid>
                )}
              </VStack>
            </TabPanel>

            {/* Aba de Configurações */}
            <TabPanel>
              <VStack spacing={6} align="stretch">
                <Heading size="md">Configurações do Sistema</Heading>

                <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={6}>
                  <Card bg={corFundoCard}>
                    <CardHeader>
                      <Heading size="sm">Configurações da Enquete</Heading>
                    </CardHeader>
                    <CardBody>
                      <VStack spacing={4} align="stretch">
                        <Box>
                          <Text fontSize="sm" fontWeight="medium" mb={2}>
                            Horário de Abertura
                          </Text>
                          <HStack>
                            <Clock size={16} className="text-gray-500" />
                            <Text>07:00</Text>
                            <Button size="xs" variant="outline">
                              Alterar
                            </Button>
                          </HStack>
                        </Box>

                        <Box>
                          <Text fontSize="sm" fontWeight="medium" mb={2}>
                            Horário de Fechamento
                          </Text>
                          <HStack>
                            <Clock size={16} className="text-gray-500" />
                            <Text>15:00</Text>
                            <Button size="xs" variant="outline">
                              Alterar
                            </Button>
                          </HStack>
                        </Box>

                        <Box>
                          <Text fontSize="sm" fontWeight="medium" mb={2}>
                            Limite de Vagas
                          </Text>
                          <HStack>
                            <Users size={16} className="text-gray-500" />
                            <Text>92 vagas</Text>
                            <Button size="xs" variant="outline">
                              Alterar
                            </Button>
                          </HStack>
                        </Box>

                        <Divider />

                        <Box>
                          <Text fontSize="sm" fontWeight="medium" mb={2}>
                            Enquete Extra
                          </Text>
                          <HStack justify="space-between">
                            <Text fontSize="sm" color="gray.600">
                              Permitir enquete extra quando lotado
                            </Text>
                            <Badge colorScheme="green">Ativado</Badge>
                          </HStack>
                        </Box>
                      </VStack>
                    </CardBody>
                  </Card>

                  <Card bg={corFundoCard}>
                    <CardHeader>
                      <Heading size="sm">Cidades e Destinos</Heading>
                    </CardHeader>
                    <CardBody>
                      <VStack spacing={4} align="stretch">
                        <Button
                          leftIcon={<Plus size={16} />}
                          variant="outline"
                          colorScheme="brand"
                          size="sm"
                        >
                          Adicionar Cidade
                        </Button>

                        <Button
                          leftIcon={<Building size={16} />}
                          variant="outline"
                          colorScheme="brand"
                          size="sm"
                        >
                          Gerenciar Instituições
                        </Button>

                        <Divider />

                        <Box>
                          <Text fontSize="sm" fontWeight="medium" mb={2}>
                            Cidades Ativas
                          </Text>
                          <VStack spacing={2} align="stretch">
                            <HStack justify="space-between">
                              <Text fontSize="sm">Santo André</Text>
                              <Badge colorScheme="green">Ativa</Badge>
                            </HStack>
                            <HStack justify="space-between">
                              <Text fontSize="sm">São Bernardo</Text>
                              <Badge colorScheme="green">Ativa</Badge>
                            </HStack>
                            <HStack justify="space-between">
                              <Text fontSize="sm">Diadema</Text>
                              <Badge colorScheme="yellow">Pendente</Badge>
                            </HStack>
                          </VStack>
                        </Box>
                      </VStack>
                    </CardBody>
                  </Card>
                </SimpleGrid>
              </VStack>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </VStack>

      {/* Modais */}
      <ModalCadastroCidade
        isOpen={modalCidadeAberto}
        onClose={() => setModalCidadeAberto(false)}
        onSalvar={async (cidade) => {
          // Lógica para salvar cidade
          console.log('Salvar cidade:', cidade)
        }}
        cidadeParaEditar={itemParaEditar}
      />

      <ModalCadastroInstituicao
        isOpen={modalInstituicaoAberto}
        onClose={() => setModalInstituicaoAberto(false)}
        onSalvar={async (instituicao) => {
          // Lógica para salvar instituição
          console.log('Salvar instituição:', instituicao)
        }}
        cidades={[]}
        instituicaoParaEditar={itemParaEditar}
      />

      <ModalCadastroOnibus
        isOpen={modalOnibusAberto}
        onClose={() => setModalOnibusAberto(false)}
        onSalvar={async (onibus) => {
          // Lógica para salvar ônibus
          console.log('Salvar ônibus:', onibus)
        }}
        onibusParaEditar={itemParaEditar}
      />

      <ModalCadastroUsuario
        isOpen={modalUsuarioAberto}
        onClose={() => setModalUsuarioAberto(false)}
        onSalvar={async (usuario) => {
          // Lógica para salvar usuário
          console.log('Salvar usuário:', usuario)
        }}
        cidades={[]}
        onibus={onibus}
        usuarioParaEditar={itemParaEditar}
      />

      <ModalVotoManual
        isOpen={modalVotoManualAberto}
        onClose={() => setModalVotoManualAberto(false)}
        onSalvar={async (voto) => {
          // Lógica para salvar voto manual
          console.log('Salvar voto manual:', voto)
        }}
        usuarios={usuariosAprovados}
        destinos={destinos}
      />
    </Container>
  )
}
