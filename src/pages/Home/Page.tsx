import { useColorMode } from '@app/components/ui/color-mode'
import {
  Box,
  Heading,
  VStack,
  SkeletonCircle,
  SkeletonText,
  Text,
  IconButton,
  List,
  ListItem,
  Link,
  useToken,
} from '@chakra-ui/react'
import { Sun, Moon } from 'lucide-react'
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts'
import { useEffect, useState } from 'react'

export function Component() {
  const { colorMode, toggleColorMode } = useColorMode()
  const [loading, setLoading] = useState(true)
  const [brand] = useToken('colors', ['brand.500'])

  const data = [
    { name: 'Jan', users: 30 },
    { name: 'Fev', users: 40 },
    { name: 'Mar', users: 35 },
    { name: 'Abr', users: 50 },
  ]

  useEffect(() => {
    const id = setTimeout(() => setLoading(false), 1500)
    return () => clearTimeout(id)
  }, [])

  return (
    <VStack gap={6} align="stretch">
      <IconButton
        aria-label="Toggle theme"
        alignSelf="flex-end"
        onClick={toggleColorMode}
      >
        {colorMode === 'light' ? <Moon /> : <Sun />}
      </IconButton>
      <Heading color="brand.500">Skeleton React</Heading>
      <Text fontSize="sm" color="fg">
        Este projeto demonstra o uso do Chakra UI v3 com TypeScript e React.
        Utilize o botão acima para alternar entre os temas claro e escuro.
      </Text>
      <Box borderWidth="1px" borderRadius="md" p={4}>
        {loading ? (
          <>
            <SkeletonCircle size="10" />
            <SkeletonText mt="4" noOfLines={4} gap="3" />
          </>
        ) : (
          <>
            <Text mb={4}>Exemplo de gráfico com dados fictícios:</Text>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart
                data={data}
                margin={{ left: 0, right: 0, top: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="users" stroke={brand} />
              </LineChart>
            </ResponsiveContainer>
          </>
        )}
      </Box>
      <Box>
        <Text>Links úteis:</Text>
        <List pl={4} styleType="disc" spacing={1} fontSize="sm" color="fg">
          <ListItem>
            <Link href="https://chakra-ui.com/docs/theming/overview" isExternal>
              Documentação de temas
            </Link>
          </ListItem>
          <ListItem>
            <Link
              href="https://chakra-ui.com/docs/get-started/migration"
              isExternal
            >
              Guia de migração para a versão 3
            </Link>
          </ListItem>
        </List>
      </Box>
    </VStack>
  )
}
