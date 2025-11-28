# Documentación de la API

Esta documentación detalla los endpoints disponibles en la API, sus métodos, parámetros requeridos y posibles respuestas.

## Autenticación (`/auth`)

### Registro de Usuario

**POST** `/auth/register`

Crea una nueva cuenta de usuario.

**Body (JSON):**

```json
{
  "name": "Nombre Usuario",
  "email": "usuario@ejemplo.com",
  "password": "password123"
}
```

**Respuestas:**

- **201 Created:** Usuario creado exitosamente.
  ```json
  {
    "message": "Usuario creado exitosamente",
    "id": 1
  }
  ```
- **400 Bad Request:** Faltan campos obligatorios o el email ya existe.
- **500 Internal Server Error:** Error en el servidor.

---

### Iniciar Sesión

**POST** `/auth/login`

Autentica al usuario y establece las cookies `token` y `refreshToken`.

**Body (JSON):**

```json
{
  "email": "usuario@ejemplo.com",
  "password": "password123"
}
```

**Respuestas:**

- **200 OK:** Inicio de sesión exitoso.
  ```json
  {
    "message": "Inicio de sesión exitoso"
  }
  ```
- **400 Bad Request:** Faltan campos obligatorios.
- **401 Unauthorized:** Credenciales inválidas.
- **403 Forbidden:** Usuario desactivado.
- **500 Internal Server Error:** Error en el servidor.

---

### Cerrar Sesión

**POST** `/auth/logout`

Cierra la sesión del usuario y elimina las cookies.

**Respuestas:**

- **200 OK:** Cierre de sesión exitoso.
  ```json
  {
    "message": "Cierre de sesión exitoso"
  }
  ```

---

### Refrescar Token

**POST** `/auth/refresh`

Renueva el token de acceso utilizando la cookie `refreshToken`.

**Headers:**

- Requiere cookie `refreshToken`.

**Respuestas:**

- **200 OK:** Token renovado exitosamente.
  ```json
  {
    "message": "Token renovado exitosamente"
  }
  ```
- **500 Internal Server Error:** Error al renovar el token.

## Usuarios

Todos los endpoints de usuarios requieren autenticación (cookie `token`).

### Obtener Información del Usuario Actual

**GET** `/me`

Obtiene la información del usuario autenticado.

**Respuestas:**

- **200 OK:** Objeto de usuario.
  ```json
  {
    "id_user": 1,
    "name": "Nombre Usuario",
    "email": "usuario@ejemplo.com",
    ...
  }
  ```
- **404 Not Found:** Usuario no encontrado.
- **500 Internal Server Error:** Error al obtener el usuario.

---

### Desactivar Usuario (Soft Delete)

**PUT** `/users/softdelete`

Desactiva la cuenta del usuario actual.

**Respuestas:**

- **200 OK:** Usuario desactivado correctamente.
  ```json
  {
    "message": "Usuario desactivado correctamente"
  }
  ```
- **404 Not Found:** No se pudo eliminar el usuario.
- **500 Internal Server Error:** Error al eliminar el usuario.

---

### Activar Usuario

**PUT** `/users/active`

Reactiva la cuenta del usuario actual.

**Respuestas:**

- **200 OK:** Usuario activado correctamente.
  ```json
  {
    "message": "Usuario activado correctamente"
  }
  ```
- **404 Not Found:** No se pudo activar el usuario.
- **500 Internal Server Error:** Error al activar el usuario.

## Pokemons

Todos los endpoints de pokemons requieren autenticación (cookie `token`).

### Obtener Todos los Pokemons

**GET** `/pokemons`

Obtiene la lista de pokemons del usuario.

**Respuestas:**

- **200 OK:** Lista de pokemons.
  ```json
  [
    {
      "id_pokemon": 1,
      "name": "Pikachu",
      ...
    }
  ]
  ```
- **500 Internal Server Error:** Error al obtener los pokemons.

---

### Obtener Pokemon por Slug

**GET** `/pokemons/:slug`

Obtiene un pokemon específico por su slug.

**Parámetros de URL:**

- `slug`: El slug del pokemon.

**Respuestas:**

- **200 OK:** Objeto de pokemon.
- **404 Not Found:** Pokemon no encontrado.
- **500 Internal Server Error:** Error al obtener el pokemon.

---

### Crear Pokemon

**POST** `/pokemons`

Crea un nuevo pokemon.

**Body (JSON):**

```json
{
  "name": "Pikachu",
  "type": "Electric",
  "image": "url_imagen",
  "icon": "url_icono",
  "slug": "pikachu" // Opcional
}
```

**Respuestas:**

- **201 Created:** Pokemon creado exitosamente.
  ```json
  {
    "message": "Pokemon creado exitosamente",
    "id_pokemon": 1,
    "slug": "pikachu"
  }
  ```
- **400 Bad Request:** Faltan campos obligatorios.
- **500 Internal Server Error:** Error al crear el pokemon.

---

### Actualizar Pokemon

**PUT** `/pokemons/:id_pokemon`

Actualiza un pokemon existente.

**Parámetros de URL:**

- `id_pokemon`: El ID del pokemon a actualizar.

**Body (JSON):**

```json
{
  "name": "Raichu",
  "type": "Electric",
  "image": "url_imagen_nueva",
  "icon": "url_icono_nuevo",
  "slug": "raichu" // Opcional
}
```

**Respuestas:**

- **200 OK:** Pokemon actualizado exitosamente.
  ```json
  {
    "message": "Pokemon actualizado exitosamente",
    "slug": "raichu"
  }
  ```
- **400 Bad Request:** Faltan campos obligatorios.
- **404 Not Found:** Pokemon no encontrado o sin permisos.
- **500 Internal Server Error:** Error al actualizar el pokemon.

---

### Eliminar Pokemon

**DELETE** `/pokemons/:id_pokemon`

Elimina un pokemon.

**Parámetros de URL:**

- `id_pokemon`: El ID del pokemon a eliminar.

**Respuestas:**

- **200 OK:** Pokemon eliminado exitosamente.
  ```json
  {
    "message": "Pokemon eliminado exitosamente"
  }
  ```
- **404 Not Found:** Pokemon no encontrado o sin permisos.
- **500 Internal Server Error:** Error al eliminar el pokemon.
