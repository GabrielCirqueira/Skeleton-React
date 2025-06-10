import { extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
  fonts: {
    heading: "'Poppins', sans-serif",
    body: "'Inter', sans-serif",
  },
  colors: {
    brand: {
      50: '#E6FFFF',
      100: '#B3FFFF',
      200: '#80FFFF',
      300: '#4DFFFF',
      400: '#1AFFFF',
      500: '#00E6E6',
      600: '#00B3B3',
      700: '#008080',
      800: '#004D4D',
      900: '#001A1A',
    },
  },
  styles: {
    global: {
      body: {
        bg: 'gray.50',
      },
    },
  },
  components: {
    Button: {
      defaultProps: {
        colorScheme: 'brand',
      },
    },
    Input: {
      variants: {
        outline: {
          field: {
            _focus: {
              borderColor: 'brand.400',
              boxShadow: '0 0 0 1px var(--chakra-colors-brand-400)',
            },
          },
        },
      },
    },
  },
})

export default theme
