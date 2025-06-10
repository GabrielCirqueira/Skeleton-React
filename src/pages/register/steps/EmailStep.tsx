import { FormControl, FormLabel, Input, InputGroup, InputLeftElement } from '@chakra-ui/react'
import { Mail } from 'lucide-react'

type Step2Props = {
  email: string
  setEmail: (value: string) => void
}

export default function EmailStep({ email, setEmail }: Step2Props) {
  return (
    <FormControl mt="10">
      <FormLabel>Email</FormLabel>
      <InputGroup>
        <InputLeftElement pointerEvents="none">
          <Mail size={18} color="#718096" />
        </InputLeftElement>
        <Input
          placeholder="seu@email.com"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </InputGroup>
    </FormControl>
  )
}
