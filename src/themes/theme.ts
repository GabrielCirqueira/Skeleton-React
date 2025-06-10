import { createSystem, defaultConfig, defineConfig } from '@chakra-ui/react'

const config = defineConfig({
  globalCss: {
    body: {
      bg: 'fluaui.grey.50',
      fontFamily: 'Lato, sans-serif',
    },
  },
  theme: {
    tokens: {
      colors: {
          brand: {
            50: { value: '#fff0f0' },
            100: { value: '#ffe4e3' },
            200: { value: '#ffcbcc' },
            300: { value: '#ffa0a4' },
            400: { value: '#ff6a73' },
            500: { value: '#fd5260' },
            600: { value: '#ea1430' },
            700: { value: '#c60a27' },
            800: { value: '#a60b28' },
            900: { value: '#8e0d29' },
            950: { value: '#4f0211' },
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

export const system = createSystem(defaultConfig, config)