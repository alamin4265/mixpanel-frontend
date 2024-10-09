FROM node:20.16.0 as build

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN npm install -g @angular/cli

COPY . .

RUN npm run build

FROM nginx:latest

COPY --from=build app/dist/mixpanel-integration-frontend/browser /usr/share/nginx/html

EXPOSE 80