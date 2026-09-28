# TaskFlow

TaskFlow es una plataforma SaaS para equipos que quieren organizar proyectos, tareas y entregas de forma simple y visual.

## Idea de negocio
TaskFlow ayuda a equipos pequeños y medianos a:
- crear proyectos y tareas,
- asignar prioridades,
- visualizar el estado del trabajo,
- mejorar la productividad sin herramientas complejas.

## Stack propuesta
- Frontend: React + Vite
- Backend: Node.js + Express
- Base de datos: PostgreSQL (preparada para migrar luego)
- Despliegue: Vercel + Render/Railway

## Estructura
- `client/` frontend
- `server/` API backend

## Arranque rápido

### 1) Instalar dependencias
```bash
npm install --prefix server
npm install --prefix client
```

### 2) Ejecutar backend
```bash
npm run dev --prefix server
```

### 3) Ejecutar frontend
```bash
npm run dev --prefix client
```

El frontend corre por defecto en `http://localhost:5173` y el backend en `http://localhost:3000`.

## Endpoints de ejemplo
- `GET /api/health`
- `GET /api/dashboard`
- `GET /api/projects`
- `POST /api/tasks`

## Estado actual
Esta versión es un MVP inicial con datos de ejemplo para que puedas arrancar y visualizar la idea.
