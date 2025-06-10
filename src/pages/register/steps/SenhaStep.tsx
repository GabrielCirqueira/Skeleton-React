import {
  Stack,
  FormControl,
  FormLabel,
  InputGroup,
  InputLeftElement,
  Input,
} from '@chakra-ui/react'
import { Lock } from 'lucide-react'

type Step4Props = {
  password: string
  confirmPassword: string
  setPassword: (value: string) => void
  setConfirmPassword: (value: string) => void
}

export default function SenhaStep({
  password,
  confirmPassword,
  setPassword,
  setConfirmPassword,
}: Step4Props) {
  return (
    <Stack spacing="4" mt="10">
      <FormControl>
        <FormLabel>Senha</FormLabel>
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <Lock size={18} color="#718096" />
          </InputLeftElement>
          <Input
            placeholder="••••••••"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </InputGroup>
      </FormControl>
      <FormControl>
        <FormLabel>Confirmar Senha</FormLabel>
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <Lock size={18} color="#718096" />
          </InputLeftElement>
          <Input
            placeholder="••••••••"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </InputGroup>
      </FormControl>
    </Stack>
  )
}
