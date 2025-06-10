import { FormControl, FormLabel, Input, InputGroup, InputLeftElement } from '@chakra-ui/react'
import { User } from 'lucide-react'

type Step1Props = {
  name: string
  setName: (value: string) => void
}

export default function NomeStep({ name, setName }: Step1Props) {
  return (
    <FormControl mt="10">
      <FormLabel>Nome</FormLabel>
      <InputGroup>
        <InputLeftElement pointerEvents="none">
          <User size={18} color="#718096" />
        </InputLeftElement>
        <Input
          placeholder="Seu nome completo"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </InputGroup>
    </FormControl>
  )
}
