# Stage 1: Build with Maven
FROM maven:3.9.6-eclipse-temurin-21 AS build
WORKDIR /app

# COPY files relative to the build context (parent folder)
COPY pom.xml .
COPY src ./src

# Build the jar without running tests
RUN mvn clean package -DskipTests

# Stage 2: Minimal JDK runtime
FROM eclipse-temurin:21-jdk-alpine
WORKDIR /app

# Copy the built jar from the build stage
COPY --from=build /app/target/*.jar app.jar

# Default command to run the app
CMD ["java", "-jar", "app.jar"]
