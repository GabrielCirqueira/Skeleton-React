import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom'
import './index.css'
import { ChakraProvider } from '@chakra-ui/react'
import { Component as AppLayout } from '@app/layouts'
import theme from '@app/themes/theme'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route path="*" lazy={() => import('@app/pages/NotFound')} />

      <Route path="login" lazy={() => import('@app/pages/Login')} />
      <Route path="user/error" lazy={() => import('@app/pages/UserErro')} />
      <Route path="register" lazy={() => import('@pages/register')} />

      <Route element={<AppLayout />}>
        <Route index lazy={() => import('@app/pages/Home')} />
        <Route path="lider" lazy={() => import('@pages/Lider')} />
        <Route path="gestor" lazy={() => import('@pages/Gestor')} />
        <Route path="locar" lazy={() => import('@pages/distribuicaoOnibus')} />
      </Route>
    </Route>
  )
)

function App() {
  return (
    <ChakraProvider value={theme}>
      <RouterProvider router={router} />
    </ChakraProvider>
  )
}

export default App
