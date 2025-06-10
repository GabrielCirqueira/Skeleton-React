import { createSystem, defaultConfig, defineConfig } from '@chakra-ui/react'

const config = defineConfig({
  globalCss: {
    body: {
      fontFamily: 'Inter, sans-serif',
      bg: { base: 'gray.50', _dark: 'gray.800' },
      color: { base: 'gray.800', _dark: 'gray.100' },
      transition: 'background-color 0.2s, color 0.2s',
    },
  },
  theme: {
    tokens: {
      colors: {
        brand: {
          50: { value: '#e0faf9' },
          100: { value: '#b8f2ed' },
          200: { value: '#7fe2dc' },
          300: { value: '#33d4c6' },
          400: { value: '#00bfa5' },
          500: { value: '#00a389' },
          600: { value: '#008f74' },
          700: { value: '#00755c' },
          800: { value: '#005a47' },
          900: { value: '#00443a' },
          950: { value: '#002b25' },
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
        background: {
          value: { base: '{colors.gray.50}', _dark: '{colors.gray.800}' },
        },
        fg: {
          value: { base: '{colors.gray.800}', _dark: '{colors.gray.100}' },
        },
      },
    },
  },
})

export default createSystem(defaultConfig, config)
