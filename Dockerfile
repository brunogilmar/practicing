FROM node:12 as builder

EXPOSE 8081

WORKDIR /app

COPY . .

RUN npm i
RUN npm install -g @angular/cli@9.1.1

FROM nginx:alpine

COPY --from=builder /app/dist/* /usr/share/nginx/html/
