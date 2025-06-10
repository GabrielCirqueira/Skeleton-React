import {
  IconButton,
  type IconButtonProps,
  useColorMode,
  useColorModeValue as chakraUseColorModeValue,
  DarkMode as ChakraDarkMode,
  LightMode as ChakraLightMode,
} from '@chakra-ui/react'
import * as React from 'react'
import { LuMoon, LuSun } from 'react-icons/lu'

export function useColorModeValue<T>(light: T, dark: T) {
  return chakraUseColorModeValue(light, dark)
}

export const LightMode = ChakraLightMode
export const DarkMode = ChakraDarkMode

export const ColorModeButton = React.forwardRef<
  HTMLButtonElement,
  Omit<IconButtonProps, 'aria-label'>
>(function ColorModeButton(props, ref) {
  const { toggleColorMode } = useColorMode()
  const icon = chakraUseColorModeValue(<LuMoon />, <LuSun />)
  return (
    <IconButton
      onClick={toggleColorMode}
      variant="ghost"
      aria-label="Toggle color mode"
      size="sm"
      ref={ref}
      icon={icon}
      {...props}
    />
  )
})
