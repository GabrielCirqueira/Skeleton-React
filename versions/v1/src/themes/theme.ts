import '@fontsource/lato'
import {
  extendTheme,
  type ThemeConfig,
  withDefaultColorScheme,
} from '@chakra-ui/react'

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,
}

const colors = {
  brand: {
    50: '#eef4ff',
    100: '#d3e3ff',
    200: '#a8cdff',
    300: '#7db6ff',
    400: '#519eff',
    500: '#287fff',
    600: '#1b64d6',
    700: '#154caf',
    800: '#103789',
    900: '#0a2566',
    950: '#051440',
  },
}

const styles = {
  global: {
    body: {
      fontFamily: 'Lato, sans-serif',
      bg: 'gray.100',
      color: 'gray.800',
      transition: 'background-color 0.2s, color 0.2s',
      _dark: { bg: 'gray.800', color: 'gray.100' },
    },
  },
}

const semanticTokens = {
  colors: {
    background: { default: 'gray.50', _dark: 'gray.800' },
    fg: { default: 'gray.800', _dark: 'gray.100' },
    brand: {
      default: 'brand.500',
    },
  },
}

const theme = extendTheme(
  {
    config,
    colors,
    styles,
    semanticTokens,
    fontSizes: {
      '2xs': '0.625rem',
    },
  },
  withDefaultColorScheme({ colorScheme: 'brand' }),
)

export default theme
