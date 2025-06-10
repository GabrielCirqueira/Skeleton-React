# Skeleton React Template

Este projeto fornece uma estrutura mínima utilizando **React** e **TypeScript** com o **Chakra UI v2.10.9**. A proposta é servir de ponto de partida para novos projetos, já configurado com tema personalizado, roteamento e modo de cor.

## Começando

```bash
npm install
npm run start
```

### Scripts Disponíveis

- `npm run start` &ndash; inicia o servidor de desenvolvimento (Vite)
- `npm run lint` &ndash; executa o ESLint
- `npm run lint:fix` &ndash; corrige problemas de lint automaticamente
- `npm run down` &ndash; encerra o servidor de desenvolvimento

## Estrutura do Projeto

```
src/
  layouts/      # layouts de página
  pages/        # páginas da aplicação
  themes/       # configuração do tema Chakra
  main.tsx      # ponto de entrada
```

## Recursos

- Tema customizado com paleta `brand` em tons de ciano para verde
- Componente de alternância de tema claro/escuro
- Página inicial demonstrativa com gráfico e links úteis
- Página 404 personalizada

## Chakra UI

O projeto utiliza a **versão 2.10.9** do Chakra UI. Consulte a [documentação de temas](https://v2.chakra-ui.com/docs/styled-system/theming/overview) e o [guia de migração](https://v2.chakra-ui.com/docs/getting-started/migration) para mais detalhes.

## Licença

Distribuído sob a licença MIT. Consulte o arquivo [LICENSE](LICENSE).
