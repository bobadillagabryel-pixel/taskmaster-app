import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const dashboard = {
  stats: {
    totalProjects: 8,
    totalTasks: 42,
    completionRate: 79,
    activeMembers: 12,
    overdueTasks: 5
  },
  projects: [
    { id: 1, name: 'Sitio Web', progress: 82, owner: 'Ana', status: 'En curso', deadline: '12 oct' },
    { id: 2, name: 'CRM Inicial', progress: 61, owner: 'Luis', status: 'En curso', deadline: '19 oct' },
    { id: 3, name: 'App Móvil', progress: 91, owner: 'Marta', status: 'Próximo lanzamiento', deadline: '25 oct' },
    { id: 4, name: 'Onboarding', progress: 45, owner: 'Sofía', status: 'Pendiente', deadline: '02 nov' }
  ],
  tasks: [
    { id: 1, title: 'Diseñar landing page', assignee: 'Ana', priority: 'Alta', status: 'En progreso', project: 'Sitio Web' },
    { id: 2, title: 'Configurar flujo de pagos', assignee: 'Luis', priority: 'Media', status: 'Pendiente', project: 'CRM Inicial' },
    { id: 3, title: 'Preparar release móvil', assignee: 'Marta', priority: 'Alta', status: 'En revisión', project: 'App Móvil' },
    { id: 4, title: 'Mejorar onboarding', assignee: 'Sofía', priority: 'Media', status: 'Pendiente', project: 'Onboarding' },
    { id: 5, title: 'Analizar feedback usuarios', assignee: 'Pedro', priority: 'Baja', status: 'Completado', project: 'Producto' }
  ],
  team: [
    { id: 1, name: 'Ana López', role: 'Product', initials: 'AL', availability: 'Disponible' },
    { id: 2, name: 'Luis Ramírez', role: 'Backend', initials: 'LR', availability: 'En revisión' },
    { id: 3, name: 'Marta Flores', role: 'Mobile', initials: 'MF', availability: 'Disponible' },
    { id: 4, name: 'Sofía García', role: 'UX', initials: 'SG', availability: 'Ocupada' }
  ]
};

const users = [
  { id: 1, name: 'Administrador', email: 'admin@taskflow.io', password: '123456' },
  { id: 2, name: 'Equipo', email: 'team@taskflow.io', password: 'taskflow' }
];

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', app: 'TaskFlow API', timestamp: new Date().toISOString() });
});

app.post('/api/login', (req, res) => {
  const { email, password } = req.body || {};

  if (!email || !password) {
    return res.status(400).json({ error: 'Email y contraseña son obligatorios.' });
  }

  const user = users.find(
    (entry) => entry.email.toLowerCase() === String(email).toLowerCase() && entry.password === String(password)
  );

  if (!user) {
    return res.status(401).json({ error: 'Credenciales inválidas.' });
  }

  return res.json({
    user: {
      id: user.id,
      name: user.name,
      email: user.email
    }
  });
});

app.get('/api/dashboard', (req, res) => {
  res.json(dashboard);
});

app.get('/api/projects', (req, res) => {
  res.json(dashboard.projects);
});

app.get('/api/team', (req, res) => {
  res.json(dashboard.team);
});

app.post('/api/tasks', (req, res) => {
  const { title, assignee, priority, status, project } = req.body || {};

  if (!title) {
    return res.status(400).json({ error: 'El título es obligatorio.' });
  }

  const newTask = {
    id: Date.now(),
    title,
    assignee: assignee || 'Sin asignar',
    priority: priority || 'Media',
    status: status || 'Pendiente',
    project: project || 'General'
  };

  dashboard.tasks.unshift(newTask);
  dashboard.stats.totalTasks += 1;

  return res.status(201).json(newTask);
});

app.listen(PORT, () => {
  console.log(`TaskFlow API running at http://localhost:${PORT}`);
});
