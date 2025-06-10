import { useEffect, useState } from 'react'
import { Stack, FormControl, FormLabel, Select } from '@chakra-ui/react'
import axios from 'axios'

type Cidade = {
  id: number
  nome: string
  UF: string
}

type Step3Props = {
  cidadeOrigem: Cidade | null
  cidadeDestino: Cidade | null
  setCidadeOrigem: (value: Cidade) => void
  setCidadeDestino: (value: Cidade) => void
}

export default function CidadesStep({
  cidadeOrigem,
  cidadeDestino,
  setCidadeOrigem,
  setCidadeDestino,
}: Step3Props) {
  const [cities, setCities] = useState<Cidade[]>([])

  useEffect(() => {
    axios
      .get('/api/cidades')
      .then((response) => setCities(response.data))
      .catch((error) => console.error('Erro ao buscar cidades:', error))
  }, [])

  function handleOriginChange(id: string) {
    const cidadeSelecionada = cities.find((city) => city.id === Number(id))
    if (cidadeSelecionada) {
      setCidadeOrigem(cidadeSelecionada)
    }
  }

  function handleDestinationChange(id: string) {
    const cidadeSelecionada = cities.find((city) => city.id === Number(id))
    if (cidadeSelecionada) {
      setCidadeDestino(cidadeSelecionada)
    }
  }

  return (
    <Stack spacing={4} mt="10">
      <FormControl>
        <FormLabel>Cidade de Origem</FormLabel>
        <Select
          placeholder="Selecione a cidade de origem"
          value={cidadeOrigem?.id || ''}
          onChange={(e) => handleOriginChange(e.target.value)}
        >
          {cities.map((city) => (
            <option key={city.id} value={city.id}>
              {city.nome}
            </option>
          ))}
        </Select>
      </FormControl>
      <FormControl>
        <FormLabel>Cidade de Destino</FormLabel>
        <Select
          placeholder="Selecione a cidade de destino"
          value={cidadeDestino?.id || ''}
          onChange={(e) => handleDestinationChange(e.target.value)}
        >
          {cities.map((city) => (
            <option key={city.id} value={city.id}>
              {city.nome}
            </option>
          ))}
        </Select>
      </FormControl>
    </Stack>
  )
}
