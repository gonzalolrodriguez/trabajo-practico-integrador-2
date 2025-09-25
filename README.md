# Sistema de Gestión de Blog Personal

## Estructura del Proyecto

- `src/config`: Configuración y conexión a MongoDB
- `src/models`: Modelos Mongoose (User, Article, Tag, Comment)
- `src/routes`: Rutas de la API
- `src/controllers`: Lógica de negocio y controladores
- `src/middlewares`: Middlewares de autenticación, autorización y validaciones
- `src/helpers`: Utilidades para JWT y bcrypt

## Relaciones

- **Embebida**: El perfil de usuario está embebido en el modelo User (1:1). Ventaja: acceso rápido, desventaja: no reutilizable.
- **Referenciada**: Artículos y comentarios referencian a User y Article respectivamente (1:N). Ventaja: escalabilidad, desventaja: requiere populate.
- **N:M**: Artículos y etiquetas (Tag) usan referencias (array de ObjectId). Ventaja: flexibilidad, desventaja: gestión de arrays.

## Endpoints principales

- `/api/auth/register` (POST): Registro de usuario
- `/api/auth/login` (POST): Login
- `/api/auth/profile` (GET/PUT): Obtener/actualizar perfil
- `/api/auth/logout` (POST): Logout
- `/api/users` (GET): Listar usuarios (admin)
- `/api/users/:id` (GET/PUT/DELETE): Operaciones sobre usuario (admin)
- `/api/articles` (CRUD): Artículos
- `/api/comments` (CRUD): Comentarios
- `/api/tags` (CRUD): Etiquetas

## Instalación y configuración

1. Clonar el repositorio
2. Instalar dependencias: `npm install`
3. Configurar `.env` con variables:
   - `MONGODB_URI`
   - `JWT_SECRET`
   - `PORT`
4. Iniciar el servidor: `npm run dev`

## Validaciones personalizadas

- Unicidad de username/email solo si el usuario no está eliminado
- Validación de ObjectId en params y body
- Validación de campos obligatorios y formatos
- Solo el autor o admin puede editar/eliminar recursos
- Eliminación lógica en User, en cascada en Article y Tag

## Ejemplo de request/response

```json
POST /api/auth/register
{
	"username": "usuario1",
	"email": "usuario1@mail.com",
	"password": "Password123",
	"profile": {
		"firstName": "Juan",
		"lastName": "Pérez"
	}
}
```
