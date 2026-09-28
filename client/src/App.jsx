import { useEffect, useMemo, useState } from 'react';

const API_URL = 'http://localhost:3000/api';

function App() {
  const [dashboard, setDashboard] = useState(null);
  const [authMode, setAuthMode] = useState('login');
  const [user, setUser] = useState(null);
  const [authForm, setAuthForm] = useState({ email: 'admin@taskflow.io', password: '123456' });
  const [taskForm, setTaskForm] = useState({
    title: '',
    assignee: 'Ana',
    priority: 'Media',
    project: 'Sitio Web',
    status: 'Pendiente'
  });

  const fetchDashboard = async () => {
    try {
      const response = await fetch(`${API_URL}/dashboard`);
      const data = await response.json();
      setDashboard(data);
    } catch (error) {
      console.error('Error cargando dashboard:', error);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  const summary = useMemo(() => {
    if (!dashboard) return [];

    return [
      { label: 'Proyectos', value: dashboard.stats.totalProjects, icon: '▣', tone: 'blue' },
      { label: 'Tareas', value: dashboard.stats.totalTasks, icon: '✓', tone: 'green' },
      { label: 'Completitud', value: `${dashboard.stats.completionRate}%`, icon: '◎', tone: 'purple' },
      { label: 'Tareas vencidas', value: dashboard.stats.overdueTasks, icon: '!', tone: 'orange' }
    ];
  }, [dashboard]);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(authForm)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Error al iniciar sesión');
      }

      setUser(data.user);
      fetchDashboard();
    } catch (error) {
      alert(error.message);
    }
  };

  const handleTaskSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`${API_URL}/tasks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(taskForm)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'No se pudo crear la tarea.');
      }

      setDashboard((prev) => ({
        ...prev,
        tasks: [data, ...prev.tasks]
      }));

      setTaskForm({
        title: '',
        assignee: 'Ana',
        priority: 'Media',
        project: 'Sitio Web',
        status: 'Pendiente'
      });
    } catch (error) {
      alert(error.message);
    }
  };

  if (!dashboard) {
    return <div className="loading-screen">Cargando TaskFlow...</div>;
  }

  if (!user) {
    return (
      <div className="auth-shell">
        <div className="auth-card">
          <div className="auth-brand">TaskFlow</div>
          <p className="auth-subtitle">Gestión operativa para equipos modernos</p>

          <div className="auth-toggle">
            <button
              className={authMode === 'login' ? 'active' : ''}
              onClick={() => setAuthMode('login')}
              type="button"
            >
              Iniciar sesión
            </button>
            <button
              className={authMode === 'register' ? 'active' : ''}
              onClick={() => setAuthMode('register')}
              type="button"
            >
              Registrarse
            </button>
          </div>

          <form onSubmit={handleLogin} className="auth-form">
            <label>
              Email
              <input
                type="email"
                value={authForm.email}
                onChange={(event) => setAuthForm({ ...authForm, email: event.target.value })}
              />
            </label>

            <label>
              Contraseña
              <input
                type="password"
                value={authForm.password}
                onChange={(event) => setAuthForm({ ...authForm, password: event.target.value })}
              />
            </label>

            <button className="primary-btn" type="submit">
              {authMode === 'login' ? 'Entrar' : 'Crear cuenta'}
            </button>
          </form>

          <div className="demo-box">
            <strong>Demo</strong>
            <span>Email: admin@taskflow.io</span>
            <span>Password: 123456</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">TaskFlow</div>

        <nav className="nav">
          <span className="nav-item active">Dashboard</span>
          <span className="nav-item">Proyectos</span>
          <span className="nav-item">Tareas</span>
          <span className="nav-item">Equipo</span>
          <span className="nav-item">Reportes</span>
        </nav>

        <div className="user-pill">
          <div className="avatar">{user.name.charAt(0)}</div>
          <div>
            <strong>{user.name}</strong>
            <small>{user.email}</small>
          </div>
        </div>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <div>
            <p className="eyebrow">Equipo · Product Ops</p>
            <h1>Panel operativo</h1>
          </div>
          <div className="header-actions">
            <button className="secondary-btn" type="button">Exportar</button>
            <button className="primary-btn" type="button">+ Nuevo proyecto</button>
          </div>
        </header>

        <section className="stats-grid">
          {summary.map((item) => (
            <div key={item.label} className={`stat-box ${item.tone}`}>
              <div className="stat-icon">{item.icon}</div>
              <div>
                <span>{item.label}</span>
                <strong>{item.value}</strong>
              </div>
            </div>
          ))}
        </section>

        <section className="content-grid">
          <div className="card">
            <div className="card-header">
              <h2>Proyectos</h2>
              <button className="ghost-btn" type="button">Ver todos</button>
            </div>

            <div className="project-grid">
              {dashboard.projects.map((project) => (
                <article key={project.id} className="project-card">
                  <div className="project-head">
                    <strong>{project.name}</strong>
                    <span className="project-status">{project.status}</span>
                  </div>
                  <div className="project-meta">
                    <span>{project.owner}</span>
                    <span>{project.deadline}</span>
                  </div>
                  <div className="progress-wrap">
                    <div className="progress-bar" style={{ width: `${project.progress}%` }}></div>
                  </div>
                  <div className="project-foot">
                    <span>{project.progress}%</span>
                    <small>Actualización semanal</small>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <h2>Nueva tarea</h2>
            </div>

            <form onSubmit={handleTaskSubmit} className="task-form">
              <input
                type="text"
                value={taskForm.title}
                placeholder="Título de la tarea"
                onChange={(event) => setTaskForm({ ...taskForm, title: event.target.value })}
              />

              <input
                type="text"
                value={taskForm.assignee}
                placeholder="Responsable"
                onChange={(event) => setTaskForm({ ...taskForm, assignee: event.target.value })}
              />

              <select
                value={taskForm.priority}
                onChange={(event) => setTaskForm({ ...taskForm, priority: event.target.value })}
              >
                <option value="Baja">Baja</option>
                <option value="Media">Media</option>
                <option value="Alta">Alta</option>
              </select>

              <select
                value={taskForm.project}
                onChange={(event) => setTaskForm({ ...taskForm, project: event.target.value })}
              >
                <option value="Sitio Web">Sitio Web</option>
                <option value="CRM Inicial">CRM Inicial</option>
                <option value="App Móvil">App Móvil</option>
                <option value="Onboarding">Onboarding</option>
                <option value="General">General</option>
              </select>

              <select
                value={taskForm.status}
                onChange={(event) => setTaskForm({ ...taskForm, status: event.target.value })}
              >
                <option value="Pendiente">Pendiente</option>
                <option value="En progreso">En progreso</option>
                <option value="En revisión">En revisión</option>
                <option value="Completado">Completado</option>
              </select>

              <button type="submit" className="primary-btn">Guardar tarea</button>
            </form>
          </div>
        </section>

        <section className="bottom-grid">
          <div className="card">
            <div className="card-header">
              <h2>Últimas tareas</h2>
            </div>

            <table className="task-table">
              <thead>
                <tr>
                  <th>Tarea</th>
                  <th>Proyecto</th>
                  <th>Responsable</th>
                  <th>Prioridad</th>
                  <th>Estado</th>
                </tr>
              </thead>
              <tbody>
                {dashboard.tasks.map((task) => (
                  <tr key={task.id}>
                    <td>{task.title}</td>
                    <td>{task.project}</td>
                    <td>{task.assignee}</td>
                    <td><span className={`priority ${task.priority.toLowerCase()}`}>{task.priority}</span></td>
                    <td>{task.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="card">
            <div className="card-header">
              <h2>Equipo</h2>
            </div>

            <div className="team-list">
              {dashboard.team.map((member) => (
                <div key={member.id} className="team-item">
                  <div className="avatar small">{member.initials}</div>
                  <div className="team-info">
                    <strong>{member.name}</strong>
                    <span>{member.role}</span>
                  </div>
                  <small>{member.availability}</small>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
