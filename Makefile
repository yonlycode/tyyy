# yo-port monorepo Makefile
# Targets: site (web) + admin (Go + React frontend)

.PHONY: help admin-dev admin-build admin-run admin-backend admin-frontend admin-frontend-dev web-dev web-build web-start web-lint install clean

help: ## Show available targets
	@grep -E '^[a-zA-Z_-]+:.*?## ' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-22s\033[0m %s\n", $$1, $$2}'

# ---------- Admin (Wails desktop app: Go + React embedded) ----------

admin-install: ## Install Wails CLI + admin dependencies (Go + frontend)
	go install github.com/wailsapp/wails/v2/cmd/wails@latest
	cd admin && go mod download
	cd admin/frontend && yarn install

admin-dev: ## Run admin in dev mode (HMR, opens the app window)
	cd admin && wails dev

admin-build: ## Build the desktop app -> admin/build/bin/yo-port-admin.app
	cd admin && wails build

admin-run: ## Open the built desktop app
	open admin/build/bin/yo-port-admin.app

# ---------- Web site (Next.js) ----------

web-install: ## Install web dependencies
	cd web && yarn install

web-dev: ## Run Next.js dev server (:3000)
	cd web && yarn dev

web-build: ## Build static export -> web/out
	cd web && yarn build

web-start: ## Serve the static build locally
	cd web && yarn start

web-lint: ## Run ESLint on the web app
	cd web && yarn lint

# ---------- Global ----------

install: admin-install web-install ## Install dependencies for both projects

clean: ## Remove build artifacts and node_modules
	rm -rf admin/frontend/dist admin/frontend/node_modules admin/frontend/wailsjs admin/build admin/yo-port-admin
	rm -rf web/out web/.next web/node_modules