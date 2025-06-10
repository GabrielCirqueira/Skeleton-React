# Skeleton React Template

This project provides a minimal React + TypeScript template using [Chakra UI](https://chakra-ui.com/) v3 and [Lucide](https://lucide.dev/) icons.
It includes basic routing, a custom theme with a `brand` color, and examples of Chakra's Skeleton components.

## Getting Started

```bash
npm install
make start    # start dev server
```

### Scripts

- `make start` – run Vite in development mode
- `make lint` – check code with ESLint
- `make fix` – automatically fix lint errors
- `make down` – stop the dev server

The same commands are available via `npm` scripts.

## Project Structure

```
src/
  layouts/        # layout components
  pages/          # application pages
  themes/         # Chakra theme configuration
  main.tsx        # app entry
```

## Example Usage

The home page demonstrates a basic Skeleton loader and theme toggle button:

```tsx
import { SkeletonCircle, SkeletonText } from '@chakra-ui/react'
```

Routes are defined using `react-router-dom` and a fallback 404 page is included.

## Formatting and Linting

ESLint and Prettier are configured. To automatically format on save, enable the appropriate extension in your editor.

## License

This project is released under the MIT License. See [LICENSE](LICENSE).
