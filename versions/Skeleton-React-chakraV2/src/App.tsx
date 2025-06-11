import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom'
import theme from '@app/themes/theme'
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'
import { AnimatePresence } from 'framer-motion'
import { MainLayout } from '@app/layouts'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route element={<MainLayout />}>
        <Route index lazy={() => import('@app/pages/Home')} />
        <Route path="*" lazy={() => import('@app/pages/NotFound')} />
      </Route>
    </Route>,
  ),
)

function App() {
  return (
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <AnimatePresence mode="wait">
        <RouterProvider router={router} />
      </AnimatePresence>
    </ChakraProvider>
  )
}

export default App
