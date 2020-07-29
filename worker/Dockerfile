# Multistep Temp Container
# AWS Fix Stages are not named
# FROM node:alpine as builder
FROM node:alpine

WORKDIR '/app'

# AWS Fix Long Form
# COPY package.json .
COPY package*.json ./

RUN npm install

COPY . .

#RUN npm run build
CMD ["npm", "run", "start"]


# Just getting source from app/build directory in new image, the rest will be skipped from alpine
# https://hub.docker.com/_/nginx
#FROM nginx
# AWS elasticbeanstalk need only EXPOSE 80 for Port Mapping, else its just for admin documentation!
EXPOSE 80
# AWS Fix Stages are not named
# COPY --from=builder /app/build /usr/share/nginx/html
#COPY --from=0 /app/build /usr/share/nginx/html
