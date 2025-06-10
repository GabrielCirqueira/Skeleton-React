import { useColorMode } from '@app/components/ui/color-mode'
import {
  Box,
  Heading,
  VStack,
  SkeletonCircle,
  SkeletonText,
  Text,
  IconButton,
  Button,
} from '@chakra-ui/react'
import { Sun, Moon } from 'lucide-react'
import { useEffect, useState } from 'react'

export function Component() {
  const { colorMode, toggleColorMode } = useColorMode()
  const [loading, setLoading] = useState(true)

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
      <Heading color="brand.500">Skeleton React Template</Heading>
      <Box borderWidth="1px" borderRadius="md" p={4}>
        {loading ? (
          <>
            <SkeletonCircle size="10" />
            <SkeletonText mt="4" noOfLines={4} gap="3" />
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
