# Usar la imagen base de OpenJDK
# FROM openjdk:17-jdk-slim
# FROM eclipse-temurin:17-jdk

# Definir el archivo JAR a copiar
# ARG JAR_FILE=target/ISP63-0.0.1.jar

# Copiar el archivo JAR de la aplicación al contenedor
# COPY ${JAR_FILE} appIES63.jar

# Etapa 1: Compilar la app con Maven
FROM maven:3.9-eclipse-temurin-17 AS build
WORKDIR /app
COPY . .
RUN mvn clean package -DskipTests

# Etapa 2: Imagen final
FROM eclipse-temurin:17-jdk
ARG JAR_FILE=target/ISP63-0.0.1.jar
COPY --from=build /app/${JAR_FILE} appIES63.jar

# Crear el directorio de uploads dentro del contenedor
RUN mkdir /uploads

# Copiar el contenido de la carpeta upload local al directorio /upload del contenedor
COPY uploads /uploads

# Establecer permisos de lectura y escritura para el directorio
RUN chmod -R 755 /uploads

# Exponer el puerto en el que corre la aplicación
EXPOSE 8080

# Ejecutar la aplicación
ENTRYPOINT ["java", "-jar", "/appIES63.jar"]