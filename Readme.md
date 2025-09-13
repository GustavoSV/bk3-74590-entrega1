# AdoptMe API

API para la gestión de adopciones de mascotas. Proyecto Backend III - CoderHouse.

## Requisitos

- Node.js >= 18
- MongoDB (Atlas o local)
- npm
- Docker (opcional)

## Instalación

1. Clona el repositorio:
   ```
   git clone https://github.com/tuusuario/adoptme.git
   cd adoptme
   ```

2. Instala las dependencias:
   ```
   npm install
   ```

3. Configura las variables de entorno:
   - Crea el archivo `src/.env` con el siguiente contenido:
     ```
     PORT=8080
     MONGO_URL=mongodb+srv://usuario:contraseña@cluster.mongodb.net/adoptme
     ```

## Uso

1. Inicia el servidor:
   ```
   npm start
   ```

2. Accede a la documentación Swagger en:
   ```
   http://localhost:8080/api/documentation
   ```
   Aquí encontrarás la descripción y pruebas interactivas de todos los endpoints de la API.

## Endpoints principales

- `GET /api/users` - Listar usuarios
- `GET /api/pets` - Listar mascotas
- `POST /api/pets` - Crear mascota
- `GET /api/adoptions` - Listar adopciones
- `POST /api/sessions/login` - Login de usuario

## Testing

Las pruebas unitarias están desarrolladas con **Mocha**, **Chai** y **Supertest**.

Ejecuta los tests con:
```
npm test
```
Esto correrá los tests ubicados en la carpeta `test/`, verificando el funcionamiento de los endpoints principales.

## Estructura

- `src/` - Código fuente
- `src/routes/` - Rutas de la API
- `src/controllers/` - Lógica de negocio
- `src/dao/` - Acceso a datos
- `src/config/` - Configuración y variables de entorno

## Documentación Swagger

La API cuenta con documentación interactiva generada con **Swagger**.  
Puedes acceder a ella desde tu navegador en:

```
http://localhost:8080/api/documentation
```

En esta interfaz podrás consultar la descripción de los endpoints, sus parámetros, respuestas y realizar pruebas directamente desde el navegador.

## Docker

### Crear la imagen en Docker Desktop

1. Construye la imagen:
   ```
   docker build -t adoptme202509 .
   ```

2. Verifica la imagen en Docker Desktop.

### Subir la imagen a Docker Hub

1. Inicia sesión en Docker Hub:
   ```
   docker login
   ```

2. Etiqueta la imagen:
   ```
   docker tag adoptme202509 gustavosv8/adoptme202509
   ```

3. Sube la imagen:
   ```
   docker push gustavosv8/adoptme202509
   ```

### Ejecutar el contenedor

1. Descarga la imagen desde Docker Hub:
   ```
   docker pull gustavosv8/adoptme202509
   ```

2. Ejecuta el contenedor:
   ```
   docker run -d -p 8080:8080 --env-file src/.env gustavosv8/adoptme202509
   ```

### Enlace a Docker Hub

[https://hub.docker.com/r/gustavosv8/adoptme202509](https://hub.docker.com/r/gustavosv8/adoptme202509)

## Autor

Gustavo Sepúlveda Villamizar