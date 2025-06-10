import { createSystem, defaultConfig, defineConfig } from '@chakra-ui/react'

const config = defineConfig({
  globalCss: {
    body: {
      bg: 'gray.50',
      fontFamily: 'Lato, sans-serif',
    },
  },
  theme: {
    tokens: {
      colors: {
        brand: {
          50: { value: '#eef6ff' },
          100: { value: '#d0e8ff' },
          200: { value: '#a8d4ff' },
          300: { value: '#80bfff' },
          400: { value: '#59aaff' },
          500: { value: '#3380ff' },
          600: { value: '#2a6ad9' },
          700: { value: '#1f51b3' },
          800: { value: '#173a8f' },
          900: { value: '#102467' },
          950: { value: '#091435' },
        },
      },
      fontSizes: {
        '2xs': { value: '0.625rem' },
      },
    },
    semanticTokens: {
      colors: {
        brand: {
          DEFAULT: { value: '{colors.brand.500}' },
          solid: { value: '{colors.brand.500}' },
          contrast: { value: '{colors.white}' },
        },
        background: { value: '{colors.fluaui.grey.50}' },
      },
    },
  },
})

export default createSystem(defaultConfig, config)
