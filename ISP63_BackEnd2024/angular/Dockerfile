
# Etapa de build
FROM node:18-alpine AS build
WORKDIR /app

# Copiar dependencias
COPY package*.json ./
ENV NODE_OPTIONS="--max_old_space_size=4096"
# RUN npm install -g @angular/cli@18.0.0 && npm ci
 RUN npm install -g @angular/cli@18.0.0 && npm ci --omit=dev


# Copiar el código Angular
COPY . .

# Build Angular
#RUN npm run build
 RUN npm run build --configuration=production

# Etapa de copia al volumen compartido
FROM alpine:3.18
RUN apk add --no-cache bash

# Crear directorio de destino si no existe
RUN mkdir -p /dist

# Copiar build Angular al volumen montado en /dist
COPY --from=build /app/dist/isp63-front-end2024 /dist

# Mantener contenedor vivo para debug
CMD ["tail", "-f", "/dev/null"]
