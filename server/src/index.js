import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const dashboard = {
  stats: {
    totalProjects: 6,
    totalTasks: 34,
    completionRate: 78,
    activeMembers: 12
  },
  tasks: [
    { id: 1, title: 'Diseñar landing page', priority: 'Alta', assignee: 'Ana', status: 'En progreso' },
    { id: 2, title: 'Configurar flujo de pagos', priority: 'Media', assignee: 'Luis', status: 'Pendiente' },
    { id: 3, title: 'Preparar dashboard de métricas', priority: 'Alta', assignee: 'Marta', status: 'Completado' },
    { id: 4, title: 'Revisar feedback de usuarios', priority: 'Baja', assignee: 'Sofía', status: 'Pendiente' }
  ],
  projects: [
    { id: 1, name: 'Sitio web', progress: 72, owner: 'Ana' },
    { id: 2, name: 'CRM inicial', progress: 53, owner: 'Luis' },
    { id: 3, name: 'App móvil', progress: 89, owner: 'Marta' }
  ]
};

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', app: 'TaskFlow API', timestamp: new Date().toISOString() });
});

app.get('/api/dashboard', (req, res) => {
  res.json(dashboard);
});

app.get('/api/projects', (req, res) => {
  res.json(dashboard.projects);
});

app.post('/api/tasks', (req, res) => {
  const { title, priority, assignee, status } = req.body;

  if (!title) {
    return res.status(400).json({ error: 'El título es obligatorio' });
  }

  const newTask = {
    id: Date.now(),
    title,
    priority: priority || 'Media',
    assignee: assignee || 'Sin asignar',
    status: status || 'Pendiente'
  };

  dashboard.tasks.unshift(newTask);
  res.status(201).json(newTask);
});

app.listen(PORT, () => {
  console.log(`TaskFlow API running at http://localhost:${PORT}`);
});
