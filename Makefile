# Variables
LATEST_COMMIT ?= $$(git rev-parse HEAD)
VERSION ?= latest
HOST_FOR_DOCKER_IMAGE ?= contestvibe
PROJECT_NAME ?= frontend

help: ## Show this help
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "  \033[36m%-15s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST)
%:
	@:

docker_login: ## login to docker registry.
	docker login

build_app: ## Build Application docker image.
	docker build -f Dockerfile -t $(HOST_FOR_DOCKER_IMAGE)/$(PROJECT_NAME):$(VERSION) .

push_app: ## Push Application docker image.
	docker push $(HOST_FOR_DOCKER_IMAGE)/$(PROJECT_NAME):$(VERSION)

docker: ## Build and push all necessary docker images.
	make build_app push_app