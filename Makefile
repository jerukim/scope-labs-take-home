.PHONY: start-dev
start-dev: ## Start dev server
	pnpm dev

.PHONY: build
build: ## Build prod
	pnpm build

.PHONY: install-ffmpeg
install-ffmpeg: ## Install prerequisites
	brew install ffmpeg

.PHONY: install-deps
install-deps: ## Install deps
	pnpm install

.PHONY: up
up: ## Install dependencies and build prod
	make -j 2 install-ffmpeg install-deps
	make build

.PHONY: start
start: ## Preview frontend prod build
	pnpm start