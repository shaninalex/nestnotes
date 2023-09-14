start:
	docker compose -f docker-compose.yml up -d --build

down:
	docker compose down

down_volumes:
	docker compose down -v

app_start:
	npm run start:dev