import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom'
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'
import theme from '@app/themes/theme'
import { MainLayout } from '@app/layouts'
import Home from '@app/pages/Home'
import NotFound from '@app/pages/NotFound'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<MainLayout />}>
      <Route index element={<Home />} />
      <Route path="*" element={<NotFound />} />
    </Route>,
  ),
)

function App() {
  return (
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <RouterProvider router={router} />
    </ChakraProvider>
  )
}

export default App
