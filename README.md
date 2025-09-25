## Jusfitifación

**users, articles, comments y tags**

- **articles**: referencian al autor (`User`) y a los tags mediante ObjectId. Permite reutilizar usuarios y tags en múltiples artículos, facilita la consulta y mantiene la integridad.

  **Ventajas**:

  - Evita duplicidad de datos.
  - Permite actualizar usuarios/tags en un solo lugar.
  - Escalabilidad para grandes volúmenes.

  **Desventajas**:

  - Requiere consultas adicionales (populate) para obtener datos completos.

- **Comments**: referencian al autor y al artículo. Un comentario pertenece a un usuario y a un artículo, pero los usuarios y artículos pueden tener muchos comentarios.

  **Ventajas**:

  - Relación flexible y escalable.
  - Permite eliminar comentarios sin afectar usuarios/artículos.

  **Desventaja**:

  - Consultas más complejas si se requiere información completa.

- **tags**: referenciados en artículos. Los tags pueden ser usados en muchos artículos.  
  **Ventaja**:
  - Reutilización y gestión centralizada.
    **Desventaja**:
  - Requiere consulta adicional para obtener el nombre/descripción del tag.

**No se usó embebido** porque las relaciones son de tipo muchos-a-muchos o uno-a-muchos, y se busca flexibilidad y escalabilidad.

---

## Documentación de Endpoints

### Registro de usuario

**POST /api/auth/register**

```json
{
  "username": "usuario1",
  "email": "usuario1@example.com",
  "password": "User123",
  "profile": {
    "first_name": "John",
    "last_name": "Perez"
  }
}
```

**Response:**

```json
{
	"ok": true,
	"msg": "Usuario creado",
	"data": { ... }
}
```

### Login

**POST /api/auth/login**

```json
{
  "email": "usuario1@example.com",
  "password": "User123"
}
```

**Response:**

```json
{
  "ok": true,
  "token": "..."
}
```

### Crear artículo

**POST /api/articles** (requiere el token)

```json
{
  "title": "React Native",
  "content": "En este apartado...",
  "tags": ["dev", "swe"]
}
```

**Response:**

```json
{
	"ok": true,
	"data": { ... }
}
```

### Editar artículo

**PATCH /api/articles/:id** (requiere token)

```json
{
  "title": "TSDSM",
  "content": "Nuevo contenido..."
}
```

**Response:**

```json
{
	"ok": true,
	"data": { ... }
}
```

### Crear comentario

**POST /api/comments** (requiere token)

```json
{
  "articleId": "id_articulo",
  "content": "Gran artículo sobre innovación."
}
```

**Response:**

```json
{
	"ok": true,
	"data": { ... }
}
```

### Crear tag

**POST /api/tags** (requiere el token)

```json
{
  "name": "apple"
}
```

**Response:**

```json
{
	"ok": true,
	"data": { ... }
}
```

---

## Instrucciones de instalación y configuración

1. Cloná el repositorio:
   ```
   git clone <https://github.com/gonzalolrodriguez/trabajo-practico-integrador-2.git>
   cd trabajo-practico-integrador-2
   ```
2. Instalá las dependencias:
   ```
   npm install
   ```
3. Configurá el archivo `.env` con tus variables de entorno (ejemplo: conexión a MongoDB).
4. Iniciá el servidor:
   ```
   npm run dev
   ```
5. Accedé a la API en `http://localhost:3000`.

---

## Validaciones personalizadas

- **Usuario**:

  - `username`: solo letras y números, longitud 3-20.
  - `email`: formato válido y único.
  - `profile.firstName` y `profile.lastName`: solo letras, longitud 2-50.

- **Artículo**:

  - `title`: mínimo 3 caracteres.
  - `content`: mínimo 50 caracteres.

- **Comentario**:

  - `content`: mínimo 5 caracteres.

- **Tag**:
  - `name`: sin espacios, mínimo 2 caracteres.

Las validaciones se implementan en los modelos de Mongoose y en los middlewares de validación.
