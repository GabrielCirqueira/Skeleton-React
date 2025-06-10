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
  Select,
  Input,
  InputGroup,
  InputLeftElement,
  useColorModeValue,
  Progress,
  Divider,
  useToast,
} from '@chakra-ui/react'
import { useState, useEffect, useMemo } from 'react'
import { Bus, Users, Search, Shuffle, Save, MapPin, ArrowRight } from 'lucide-react'
import type {
  DadosUsuario,
  Onibus,
  Cidade,
  DistribuicaoOnibus,
  VotoUsuario,
} from '@app/components/types'
import { USAR_DADOS_FALSOS, dadosFalsos } from '@app/components/shared/mock'

export function Component() {
  const [usuarios, setUsuarios] = useState<DadosUsuario[]>([])
  const [onibus, setOnibus] = useState<Onibus[]>([])
  const [cidades, setCidades] = useState<Cidade[]>([])
  const [votos, setVotos] = useState<VotoUsuario[]>([])
  const [distribuicao, setDistribuicao] = useState<DistribuicaoOnibus[]>([])
  const [cidadeFiltro, setCidadeFiltro] = useState<string>('')
  const [busca, setBusca] = useState('')
  const [carregando, setCarregando] = useState(true)
  const [salvando, setSalvando] = useState(false)

  const toast = useToast()
  const corFundo = useColorModeValue('gray.50', 'gray.900')
  const corFundoCard = useColorModeValue('white', 'gray.800')
  const corPrimaria = useColorModeValue('brand.600', 'brand.300')

  // Filtros
  const usuariosFiltrados = useMemo(() => {
    return usuarios.filter((usuario) => {
      const filtroNome = usuario.nome.toLowerCase().includes(busca.toLowerCase())
      const filtroCidade = !cidadeFiltro || usuario.cidadeOrigem.id.toString() === cidadeFiltro
      const temVoto = votos.some((v) => v.id === usuario.id)
      return filtroNome && filtroCidade && temVoto && !usuario.onibusDesignado
    })
  }, [usuarios, busca, cidadeFiltro, votos])

  async function carregarDados() {
    try {
      if (USAR_DADOS_FALSOS) {
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Usuários que votaram
        const usuariosComVoto = [
          {
            ...dadosFalsos.dadosUsuario,
            id: 1,
            nome: 'Ana Silva',
            cidadeOrigem: { id: 1, nome: 'São Bernardo', UF: 'SP' },
          },
          {
            ...dadosFalsos.dadosUsuario,
            id: 2,
            nome: 'Carlos Santos',
            cidadeOrigem: { id: 1, nome: 'São Bernardo', UF: 'SP' },
          },
          {
            ...dadosFalsos.dadosUsuario,
            id: 3,
            nome: 'Maria Oliveira',
            cidadeOrigem: { id: 2, nome: 'Santo André', UF: 'SP' },
          },
          {
            ...dadosFalsos.dadosUsuario,
            id: 4,
            nome: 'João Costa',
            cidadeOrigem: { id: 1, nome: 'São Bernardo', UF: 'SP' },
          },
          {
            ...dadosFalsos.dadosUsuario,
            id: 5,
            nome: 'Fernanda Lima',
            cidadeOrigem: { id: 2, nome: 'Santo André', UF: 'SP' },
          },
          {
            ...dadosFalsos.dadosUsuario,
            id: 6,
            nome: 'Pedro Alves',
            cidadeOrigem: { id: 1, nome: 'São Bernardo', UF: 'SP' },
          },
        ]

        setUsuarios(usuariosComVoto)
        setCidades([
          { id: 1, nome: 'São Bernardo do Campo', UF: 'SP' },
          { id: 2, nome: 'Santo André', UF: 'SP' },
          { id: 3, nome: 'Diadema', UF: 'SP' },
        ])

        // Ônibus por cidade
        setOnibus([
          {
            id: 1,
            numero: '001',
            nome: 'Rota Centro',
            capacidade: 50,
            vagasDisponiveis: 50,
            horarioSaida: '17:30',
            motorista: 'João Silva',
            placa: 'ABC-1234',
            cidadeOrigemId: 1,
            cidadeDestinoId: 2,
            usuarios: [],
          },
          {
            id: 2,
            numero: '002',
            nome: 'Rota Leste',
            capacidade: 45,
            vagasDisponiveis: 45,
            horarioSaida: '17:45',
            motorista: 'Ana Costa',
            placa: 'DEF-5678',
            cidadeOrigemId: 1,
            cidadeDestinoId: 3,
            usuarios: [],
          },
          {
            id: 3,
            numero: '003',
            nome: 'Rota Sul',
            capacidade: 40,
            vagasDisponiveis: 40,
            horarioSaida: '17:30',
            motorista: 'Carlos Lima',
            placa: 'GHI-9012',
            cidadeOrigemId: 2,
            cidadeDestinoId: 1,
            usuarios: [],
          },
        ])

        // Votos mockados
        setVotos([
          { id: 1, destino: 'UFABC', criado_em: new Date().toISOString(), instituicaoId: 1 },
          { id: 2, destino: 'USP', criado_em: new Date().toISOString(), instituicaoId: 2 },
          { id: 3, destino: 'UFABC', criado_em: new Date().toISOString(), instituicaoId: 1 },
          { id: 4, destino: 'FATEC', criado_em: new Date().toISOString(), instituicaoId: 4 },
          { id: 5, destino: 'USP', criado_em: new Date().toISOString(), instituicaoId: 2 },
          { id: 6, destino: 'UFABC', criado_em: new Date().toISOString(), instituicaoId: 1 },
        ])

        // Inicializar distribuição
        const novaDistribuicao: DistribuicaoOnibus[] = []
        const cidadesUnicas = [...new Set(usuariosComVoto.map((u) => u.cidadeOrigem.id))]

        cidadesUnicas.forEach((cidadeId) => {
          const cidade = usuariosComVoto.find((u) => u.cidadeOrigem.id === cidadeId)?.cidadeOrigem
          const onibusNaCidade = onibus.filter((bus) => bus.cidadeOrigemId === cidadeId)

          onibusNaCidade.forEach((bus) => {
            novaDistribuicao.push({
              onibusId: bus.id,
              onibus: bus,
              usuarios: [],
              cidadeOrigem: cidade!,
            })
          })
        })

        setDistribuicao(novaDistribuicao)
        return
      }

      // Aqui viriam as chamadas reais para a API
    } catch (error) {
      console.error('Erro ao carregar dados:', error)
    } finally {
      setCarregando(false)
    }
  }

  function atribuirUsuarioAOnibus(usuarioId: number, onibusId: number) {
    const usuario = usuarios.find((u) => u.id === usuarioId)
    if (!usuario) return

    // Remover de outros ônibus
    setDistribuicao((prev) =>
      prev.map((dist) => ({
        ...dist,
        usuarios: dist.usuarios.filter((u) => u.id !== usuarioId),
      }))
    )

    // Adicionar ao ônibus selecionado
    setDistribuicao((prev) =>
      prev.map((dist) =>
        dist.onibusId === onibusId
          ? {
              ...dist,
              usuarios: [...dist.usuarios, { ...usuario, onibusDesignado: onibusId }],
            }
          : dist
      )
    )

    // Marcar usuário como designado
    setUsuarios((prev) =>
      prev.map((u) => (u.id === usuarioId ? { ...u, onibusDesignado: onibusId } : u))
    )
  }

  function removerUsuarioDoOnibus(usuarioId: number) {
    setDistribuicao((prev) =>
      prev.map((dist) => ({
        ...dist,
        usuarios: dist.usuarios.filter((u) => u.id !== usuarioId),
      }))
    )

    setUsuarios((prev) =>
      prev.map((u) => (u.id === usuarioId ? { ...u, onibusDesignado: undefined } : u))
    )
  }

  async function salvarDistribuicao() {
    setSalvando(true)
    try {
      if (USAR_DADOS_FALSOS) {
        await new Promise((resolve) => setTimeout(resolve, 1500))
        toast({
          title: 'Distribuição salva',
          description: 'A distribuição dos ônibus foi salva com sucesso!',
          status: 'success',
          duration: 3000,
          isClosable: true,
        })
        return
      }

      // await fetchComAuth('/api/gestor/salvar-distribuicao', {
      //   method: 'POST',
      //   body: JSON.stringify({ distribuicao })
      // })
    } catch (error) {
      toast({
        title: 'Erro ao salvar',
        description: 'Ocorreu um erro ao salvar a distribuição.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    } finally {
      setSalvando(false)
    }
  }

  function distribuirAutomaticamente() {
    // Lógica simples de distribuição automática por cidade
    let novaDistribuicao = [...distribuicao]

    // Limpar distribuição atual
    novaDistribuicao = novaDistribuicao.map((dist) => ({ ...dist, usuarios: [] }))

    const cidadesUnicas = [...new Set(usuariosFiltrados.map((u) => u.cidadeOrigem.id))]

    cidadesUnicas.forEach((cidadeId) => {
      const usuariosDaCidade = usuariosFiltrados.filter((u) => u.cidadeOrigem.id === cidadeId)
      const onibusDaCidade = novaDistribuicao.filter((dist) => dist.cidadeOrigem.id === cidadeId)

      let indiceOnibus = 0
      usuariosDaCidade.forEach((usuario, index) => {
        const dist = novaDistribuicao.find(
          (d) => d.onibusId === onibusDaCidade[indiceOnibus].onibusId
        )
        if (onibusDaCidade[indiceOnibus]) {
          novaDistribuicao = novaDistribuicao.map((dist) =>
            dist.onibusId === onibusDaCidade[indiceOnibus].onibusId
              ? {
                  ...dist,
                  usuarios: [...dist.usuarios, { ...usuario, onibusDesignado: dist.onibusId }],
                }
              : dist
          )

          // Verificar se o ônibus está lotado
          if (dist && dist.usuarios.length >= dist.onibus.capacidade - 5) {
            indiceOnibus = (indiceOnibus + 1) % onibusDaCidade.length
          }
        }
      })
    })

    setDistribuicao(novaDistribuicao)

    // Atualizar usuários
    setUsuarios((prev) =>
      prev.map((u) => {
        const distribuicaoUsuario = novaDistribuicao.find((dist) =>
          dist.usuarios.some((du) => du.id === u.id)
        )
        return distribuicaoUsuario ? { ...u, onibusDesignado: distribuicaoUsuario.onibusId } : u
      })
    )

    toast({
      title: 'Distribuição automática realizada',
      description: 'Os usuários foram distribuídos automaticamente nos ônibus.',
      status: 'info',
      duration: 3000,
      isClosable: true,
    })
  }

  useEffect(() => {
    carregarDados()
  }, [])

  if (carregando) {
    return (
      <Container maxW="container.xl" py="8" bg={corFundo} minH="100vh">
        <VStack spacing={6} justify="center" minH="50vh">
          <Text fontSize="lg">Carregando distribuição de ônibus...</Text>
        </VStack>
      </Container>
    )
  }

  const cidadesComDistribuicao = [...new Set(distribuicao.map((d) => d.cidadeOrigem.id))]

  return (
    <Container maxW="container.xl" py="8" bg={corFundo} minH="100vh">
      <VStack spacing={6} align="stretch">
        <HStack justify="space-between" align="center">
          <Box>
            <Heading size="lg" color={corPrimaria}>
              Distribuição de Ônibus
            </Heading>
            <Text color="gray.600">Organize os usuários que votaram nos ônibus disponíveis</Text>
          </Box>
          <HStack spacing={2}>
            <Button
              leftIcon={<Shuffle size={20} />}
              onClick={distribuirAutomaticamente}
              variant="outline"
            >
              Distribuir Automaticamente
            </Button>
            <Button
              leftIcon={<Save size={20} />}
              colorScheme="brand"
              onClick={salvarDistribuicao}
              isLoading={salvando}
            >
              Salvar Distribuição
            </Button>
          </HStack>
        </HStack>

        {/* Filtros */}
        <Card bg={corFundoCard}>
          <CardBody>
            <HStack spacing={4}>
              <Box flex={1}>
                <InputGroup>
                  <InputLeftElement>
                    <Search size={20} className="text-gray-400" />
                  </InputLeftElement>
                  <Input
                    placeholder="Buscar usuário por nome..."
                    value={busca}
                    onChange={(e) => setBusca(e.target.value)}
                  />
                </InputGroup>
              </Box>
              <Box minW="200px">
                <Select
                  value={cidadeFiltro}
                  onChange={(e) => setCidadeFiltro(e.target.value)}
                  placeholder="Todas as cidades"
                >
                  {cidades.map((cidade) => (
                    <option key={cidade.id} value={cidade.id}>
                      {cidade.nome} - {cidade.UF}
                    </option>
                  ))}
                </Select>
              </Box>
            </HStack>
          </CardBody>
        </Card>

        <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={6}>
          {/* Lista de Usuários Disponíveis */}
          <Card bg={corFundoCard}>
            <CardHeader>
              <HStack justify="space-between">
                <Heading size="md">
                  <HStack>
                    <Users size={20} />
                    <span>Usuários Disponíveis</span>
                  </HStack>
                </Heading>
                <Badge colorScheme="blue">{usuariosFiltrados.length}</Badge>
              </HStack>
            </CardHeader>
            <CardBody>
              {usuariosFiltrados.length === 0 ? (
                <Text color="gray.500" textAlign="center" py={8}>
                  Nenhum usuário disponível para distribuição
                </Text>
              ) : (
                <VStack spacing={3} align="stretch" maxH="500px" overflowY="auto">
                  {usuariosFiltrados.map((usuario) => {
                    const voto = votos.find((v) => v.id === usuario.id)
                    return (
                      <Box
                        key={usuario.id}
                        p={3}
                        border="1px"
                        borderColor="gray.200"
                        borderRadius="md"
                        bg="gray.50"
                        _hover={{ bg: 'gray.100' }}
                      >
                        <HStack justify="space-between">
                          <HStack>
                            <Avatar name={usuario.nome} size="sm" />
                            <Box>
                              <Text fontWeight="medium">
                                #{usuario.id} - {usuario.nome}
                              </Text>
                              <HStack spacing={2}>
                                <Text fontSize="xs" color="gray.500">
                                  <MapPin size={12} className="inline mr-1" />
                                  {usuario.cidadeOrigem.nome}
                                </Text>
                                <ArrowRight size={12} className="text-gray-400" />
                                <Text fontSize="xs" color="gray.500">
                                  {voto?.destino}
                                </Text>
                              </HStack>
                            </Box>
                          </HStack>
                          <Select
                            size="sm"
                            placeholder="Atribuir ônibus"
                            onChange={(e) =>
                              e.target.value &&
                              atribuirUsuarioAOnibus(usuario.id, Number.parseInt(e.target.value))
                            }
                          >
                            {distribuicao
                              .filter((dist) => dist.cidadeOrigem.id === usuario.cidadeOrigem.id)
                              .map((dist) => (
                                <option key={dist.onibusId} value={dist.onibusId}>
                                  #{dist.onibus.id} - {dist.onibus.numero} - {dist.onibus.nome} (
                                  {dist.usuarios.length}/{dist.onibus.capacidade})
                                </option>
                              ))}
                          </Select>
                        </HStack>
                      </Box>
                    )
                  })}
                </VStack>
              )}
            </CardBody>
          </Card>

          {/* Distribuição por Ônibus */}
          <Card bg={corFundoCard}>
            <CardHeader>
              <HStack justify="space-between">
                <Heading size="md">
                  <HStack>
                    <Bus size={20} />
                    <span>Distribuição nos Ônibus</span>
                  </HStack>
                </Heading>
                <Badge colorScheme="green">
                  {distribuicao.reduce((acc, d) => acc + d.usuarios.length, 0)} atribuídos
                </Badge>
              </HStack>
            </CardHeader>
            <CardBody>
              <VStack spacing={4} align="stretch" maxH="500px" overflowY="auto">
                {cidadesComDistribuicao.map((cidadeId) => {
                  const cidade = cidades.find((c) => c.id === cidadeId)
                  const distribuicaoCidade = distribuicao.filter(
                    (d) => d.cidadeOrigem.id === cidadeId
                  )

                  return (
                    <Box key={cidadeId}>
                      <Heading size="sm" mb={3} color={corPrimaria}>
                        {cidade?.nome} - {cidade?.UF}
                      </Heading>
                      <VStack spacing={3} align="stretch">
                        {distribuicaoCidade.map((dist) => (
                          <Box
                            key={dist.onibusId}
                            p={3}
                            border="1px"
                            borderColor="gray.200"
                            borderRadius="md"
                          >
                            <HStack justify="space-between" mb={2}>
                              <HStack>
                                <Bus size={16} className="text-brand-600" />
                                <Text fontWeight="medium">
                                  #{dist.onibus.id} - {dist.onibus.numero} - {dist.onibus.nome}
                                </Text>
                              </HStack>
                              <Badge
                                colorScheme={
                                  dist.usuarios.length >= dist.onibus.capacidade ? 'red' : 'green'
                                }
                              >
                                {dist.usuarios.length}/{dist.onibus.capacidade}
                              </Badge>
                            </HStack>
                            <Progress
                              value={(dist.usuarios.length / dist.onibus.capacidade) * 100}
                              colorScheme={
                                dist.usuarios.length >= dist.onibus.capacidade ? 'red' : 'green'
                              }
                              size="sm"
                              mb={2}
                            />
                            {dist.usuarios.length > 0 ? (
                              <VStack spacing={1} align="stretch">
                                {dist.usuarios.map((usuario) => (
                                  <HStack key={usuario.id} justify="space-between" fontSize="sm">
                                    <HStack>
                                      <Avatar name={usuario.nome} size="xs" />
                                      <Text>
                                        #{usuario.id} - {usuario.nome}
                                      </Text>
                                    </HStack>
                                    <Button
                                      size="xs"
                                      variant="ghost"
                                      colorScheme="red"
                                      onClick={() => removerUsuarioDoOnibus(usuario.id)}
                                    >
                                      Remover
                                    </Button>
                                  </HStack>
                                ))}
                              </VStack>
                            ) : (
                              <Text fontSize="sm" color="gray.500" textAlign="center">
                                Nenhum usuário atribuído
                              </Text>
                            )}
                          </Box>
                        ))}
                      </VStack>
                      {cidadeId !== cidadesComDistribuicao[cidadesComDistribuicao.length - 1] && (
                        <Divider my={4} />
                      )}
                    </Box>
                  )
                })}
              </VStack>
            </CardBody>
          </Card>
        </SimpleGrid>

        {/* Resumo da Distribuição */}
        <Card bg={corFundoCard}>
          <CardHeader>
            <Heading size="md">Resumo da Distribuição</Heading>
          </CardHeader>
          <CardBody>
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4}>
              <Box textAlign="center">
                <Text fontSize="2xl" fontWeight="bold" color="blue.500">
                  {usuarios.filter((u) => votos.some((v) => v.id === u.id)).length}
                </Text>
                <Text fontSize="sm" color="gray.500">
                  Total de Votos
                </Text>
              </Box>
              <Box textAlign="center">
                <Text fontSize="2xl" fontWeight="bold" color="green.500">
                  {distribuicao.reduce((acc, d) => acc + d.usuarios.length, 0)}
                </Text>
                <Text fontSize="sm" color="gray.500">
                  Usuários Atribuídos
                </Text>
              </Box>
              <Box textAlign="center">
                <Text fontSize="2xl" fontWeight="bold" color="orange.500">
                  {
                    usuarios.filter((u) => votos.some((v) => v.id === u.id) && !u.onibusDesignado)
                      .length
                  }
                </Text>
                <Text fontSize="sm" color="gray.500">
                  Pendentes de Atribuição
                </Text>
              </Box>
            </SimpleGrid>
          </CardBody>
        </Card>
      </VStack>
    </Container>
  )
}
