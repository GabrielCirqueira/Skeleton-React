COMPOSER = composer
NPM = npm
SYMFONY = symfony
DOCKER_COMPOSE = docker compose

setup:
	test -f .env || cp .env.dist .env
	$(NPM) install
	$(NPM) start

up:
	$(NPM) start

down:
	pkill -f "npm start"

lint-tsx:
	npx eslint . --ext .tsx,.ts,.jsx,.js --fix
