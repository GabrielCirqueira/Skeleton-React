import {
  Box,
  Heading,
  VStack,
  SkeletonCircle,
  SkeletonText,
  Text,
  IconButton,
  useColorMode,
} from '@chakra-ui/react'
import { Sun, Moon } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function Home() {
  const { colorMode, toggleColorMode } = useColorMode()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const id = setTimeout(() => setLoading(false), 1500)
    return () => clearTimeout(id)
  }, [])

  return (
    <VStack spacing={6} align="stretch">
      <IconButton
        aria-label="Toggle theme"
        alignSelf="flex-end"
        onClick={toggleColorMode}
        icon={colorMode === 'light' ? <Moon /> : <Sun />}
      />
      <Heading color="brand.500">Skeleton React Template</Heading>
      <Box borderWidth="1px" borderRadius="md" p={4}>
        {loading ? (
          <>
            <SkeletonCircle size="10" />
            <SkeletonText mt="4" noOfLines={4} spacing="3" skeletonHeight="2" />
          </>
        ) : (
          <Text>
            This template demonstrates Chakra UI skeleton components and Lucide
            icons.
          </Text>
        )}
      </Box>
    </VStack>
  )
}
