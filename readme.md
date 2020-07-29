# Docker Enviroment

## Setup Commands

```
cd client
docker build -f Dockerfile.dev .
docker run -it -p 3000:3000 CONTAINER_ID
cd ..
cd server
docker build -f Dockerfile.dev .
docker run -it -p 5000:5000 CONTAINER_ID
cd ..
cd worker
docker build -f Dockerfile.dev .
docker run -it CONTAINER_ID
cd ..
cd nginx
docker build -f Dockerfile.dev .
cd ..
docker-compose down && docker-compose up --build
```