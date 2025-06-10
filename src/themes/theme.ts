import { extendTheme, type ThemeConfig } from '@chakra-ui/react'

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,
}

const theme = extendTheme({
  colors: {
    brand: {
      50: '#f8f8f8',
      100: '#e6e6e6',
      200: '#d4d4d4',
      300: '#b8b8b8',
      400: '#9c9c9c',
      500: '#808080',
      600: '#666666',
      700: '#4d4d4d',
      800: '#333333',
      900: '#1a1a1a',
    },
  },
  config,
})

export default theme
