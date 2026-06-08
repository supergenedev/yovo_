.PHONY: install dev web server build

install:
	cd backend && bundle install
	cd frontend && npm install

dev:
	@trap 'kill 0' SIGINT; \
	$(MAKE) server & \
	$(MAKE) web & \
	wait

web:
	cd frontend && npm run dev

server:
	cd backend && bin/rails server

build:
	cd frontend && npm run build
