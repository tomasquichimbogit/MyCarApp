# MotCarApp (MyCarApp)

Aplicación web y móvil para propietarios de vehículos (autos y motos) que centraliza la gestión del parque automotor, el historial de mantenimientos y la relación con talleres de confianza.

## Enfoque

MotCarApp está pensada para conductores que quieren llevar un control ordenado de sus vehículos y su mantenimiento, sin depender de notas sueltas o registros dispersos. La app combina utilidad práctica con una identidad visual inspirada en el mundo del rally y la aventura sobre ruedas.

### Funcionalidades principales

| Módulo             | Descripción                                                                        |
| ------------------ | ---------------------------------------------------------------------------------- |
| **Vehículos**      | Registro y administración de autos y motos (marca, modelo, imágenes, etc.).        |
| **Mantenimientos** | Historial y registro de servicios realizados a cada vehículo.                      |
| **Talleres**       | Directorio de talleres de confianza del usuario.                                   |
| **Aventura**       | Contenido y publicaciones relacionadas con viajes y aventura (motorsport / rally). |
| **Mi información** | Perfil y datos personales del usuario.                                             |
| **Seguridad**      | Login, registro, recuperación de contraseña y verificación de correo.              |

## Stack tecnológico

### Frontend

| Tecnología                                                       | Uso                                  |
| ---------------------------------------------------------------- | ------------------------------------ |
| [React 19](https://react.dev/)                                   | Biblioteca de UI                     |
| [TypeScript](https://www.typescriptlang.org/)                    | Tipado estático                      |
| [Vite 7](https://vite.dev/)                                      | Bundler y servidor de desarrollo     |
| [React Router 7](https://reactrouter.com/)                       | Navegación y rutas                   |
| [Tailwind CSS 4](https://tailwindcss.com/)                       | Estilos utilitarios                  |
| [Ant Design](https://ant.design/)                                | Componentes de interfaz              |
| [tomascomponents](https://www.npmjs.com/package/tomascomponents) | Librería de componentes propia       |
| [Lucide React](https://lucide.dev/)                              | Iconografía                          |
| [React Hook Form](https://react-hook-form.com/)                  | Manejo de formularios                |
| [TanStack React Query](https://tanstack.com/query)               | Estado del servidor y caché de datos |
| [Zustand](https://zustand-demo.pmnd.rs/)                         | Estado global del cliente            |
| [Axios](https://axios-http.com/)                                 | Cliente HTTP                         |

### Backend y servicios

| Tecnología                                                                   | Uso                                                            |
| ---------------------------------------------------------------------------- | -------------------------------------------------------------- |
| [Supabase](https://supabase.com/)                                            | Autenticación, API REST y almacenamiento de imágenes (buckets) |
| [Firebase Cloud Messaging](https://firebase.google.com/docs/cloud-messaging) | Notificaciones push en primer plano y segundo plano            |

### Móvil

| Tecnología                              | Uso                                                      |
| --------------------------------------- | -------------------------------------------------------- |
| [Capacitor 8](https://capacitorjs.com/) | Empaquetado para Android (`com.tomasquichimbo.mycarapp`) |

## Arquitectura del proyecto

El código sigue una separación por capas dentro de cada vista:

```
src/
├── view/          # Pantallas (controller → hook → view)
├── components/    # Componentes reutilizables
├── services/      # Llamadas a API y claves de React Query
├── store/         # Stores de Zustand
├── router/        # Rutas y guards de autenticación
├── hooks/         # Hooks compartidos
├── provider/      # Providers globales (tema, query, modales)
└── constants/     # Configuración y constantes
```

## Requisitos previos

- [Node.js](https://nodejs.org/) 18 o superior
- [Yarn](https://yarnpkg.com/) (gestor de paquetes del proyecto)

## Instalación

```bash
# Clonar el repositorio
git clone https://github.com/tomasquichimbogit/MyCarApp.git
cd MyCarApp

# Instalar dependencias
yarn install
```

## Scripts disponibles

```bash
# Servidor de desarrollo
yarn dev

# Servidor accesible en red local (útil para probar en móvil)
npx vite --host 0.0.0.0 --port 5173

# Compilar para producción
yarn build

# Vista previa del build
yarn preview

# Linter
yarn lint
```

## Despliegue

En producción la app usa `HashRouter` y se publica bajo la ruta base `/MyCarApp/` (configurado en `vite.config.ts`), compatible con GitHub Pages.

## Android (Capacitor)

```bash
# Generar build web
yarn build

# Sincronizar con el proyecto nativo
npx cap sync android

# Abrir en Android Studio
npx cap open android
```

## Licencia

Proyecto privado — todos los derechos reservados.
