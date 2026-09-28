# TaskFlow

TaskFlow es una plataforma SaaS para equipos que gestionan proyectos, tareas y entregas de manera simple, clara y visual.

## Objetivo
Ayudar a startups y equipos pequeños a:
- organizar proyectos,
- priorizar tareas,
- seguir el progreso en tiempo real,
- reducir la fricción de trabajo en equipo.

## MVP actual
En esta versión inicial ya tenemos:
- dashboard con métricas clave,
- listado de proyectos,
- listado de tareas con priorización,
- formulario para crear tareas,
- login demo con autenticación básica,
- interfaz más moderna y responsiva.

## Stack tecnológica
- Frontend: React + Vite
- Backend: Node.js + Express
- Base de datos: preparada para PostgreSQL
- Despliegue recomendado: Vercel + Render/Railway

## Estructura del proyecto
- `client/` - aplicación frontend
- `server/` - API backend
- `README.md` - documentación del proyecto

## Ejecutar localmente

### 1) Instalar dependencias
```bash
npm install --prefix server
npm install --prefix client
```

### 2) Iniciar backend
```bash
npm run dev --prefix server
```

### 3) Iniciar frontend
```bash
npm run dev --prefix client
```

### 4) Abrir la app
- Frontend: http://localhost:5173
- Backend: http://localhost:3000

## Endpoints principales
- `GET /api/health`
- `POST /api/login`
- `GET /api/dashboard`
- `GET /api/projects`
- `GET /api/team`
- `POST /api/tasks`

## Demo de acceso
Para probar la autenticación demo, usa:
- Email: `admin@taskflow.io`
- Password: `123456`

## Estado actual
Versión MVP mejorada con foco en producto, UX y contexto de startup.
