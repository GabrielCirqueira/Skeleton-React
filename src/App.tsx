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

      <Route path="user/error" lazy={() => import('@app/pages/UserErro')} />

      <Route element={<AppLayout />}>
        <Route index lazy={() => import('@app/pages/Home')} />
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
