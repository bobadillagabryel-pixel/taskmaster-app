import { useEffect, useState } from 'react';

const API_URL = 'http://localhost:3000/api';

function App() {
  const [dashboard, setDashboard] = useState(null);
  const [form, setForm] = useState({ title: '', assignee: '', priority: 'Media' });

  useEffect(() => {
    fetch(`${API_URL}/dashboard`)
      .then((response) => response.json())
      .then((data) => setDashboard(data))
      .catch((error) => console.error('Error cargando dashboard:', error));
  }, []);

  const addTask = async (event) => {
    event.preventDefault();

    const response = await fetch(`${API_URL}/tasks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: form.title,
        assignee: form.assignee,
        priority: form.priority,
        status: 'Pendiente'
      })
    });

    const task = await response.json();

    setDashboard((prev) => ({
      ...prev,
      tasks: [task, ...prev.tasks]
    }));

    setForm({ title: '', assignee: '', priority: 'Media' });
  };

  if (!dashboard) {
    return <div className="loading">Cargando dashboard...</div>;
  }

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">TaskFlow</div>
        <nav>
          <span className="nav-item active">Dashboard</span>
          <span className="nav-item">Proyectos</span>
          <span className="nav-item">Equipo</span>
          <span className="nav-item">Reportes</span>
        </nav>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <div>
            <p className="eyebrow">Equipo</p>
            <h1>Panel operativo</h1>
          </div>
          <button className="primary-btn">+ Nuevo proyecto</button>
        </header>

        <section className="stats-grid">
          <div className="stat-box">
            <span>Total de proyectos</span>
            <strong>{dashboard.stats.totalProjects}</strong>
          </div>
          <div className="stat-box">
            <span>Tareas activas</span>
            <strong>{dashboard.stats.totalTasks}</strong>
          </div>
          <div className="stat-box">
            <span>Completitud</span>
            <strong>{dashboard.stats.completionRate}%</strong>
          </div>
          <div className="stat-box">
            <span>Miembros activos</span>
            <strong>{dashboard.stats.activeMembers}</strong>
          </div>
        </section>

        <section className="content-grid">
          <div className="card">
            <h2>Proyectos</h2>
            <ul className="project-list">
              {dashboard.projects.map((project) => (
                <li key={project.id}>
                  <div>
                    <strong>{project.name}</strong>
                    <small>{project.owner}</small>
                  </div>
                  <div className="progress-wrap">
                    <div className="progress-bar" style={{ width: `${project.progress}%` }}></div>
                  </div>
                  <span>{project.progress}%</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="card">
            <h2>Crear tarea</h2>
            <form onSubmit={addTask} className="task-form">
              <input
                type="text"
                placeholder="Título de la tarea"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />
              <input
                type="text"
                placeholder="Asignado a"
                value={form.assignee}
                onChange={(e) => setForm({ ...form, assignee: e.target.value })}
              />
              <select
                value={form.priority}
                onChange={(e) => setForm({ ...form, priority: e.target.value })}
              >
                <option value="Baja">Baja</option>
                <option value="Media">Media</option>
                <option value="Alta">Alta</option>
              </select>
              <button type="submit" className="primary-btn">Guardar</button>
            </form>
          </div>
        </section>

        <section className="card tasks-card">
          <h2>Últimas tareas</h2>
          <table>
            <thead>
              <tr>
                <th>Tarea</th>
                <th>Responsable</th>
                <th>Prioridad</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {dashboard.tasks.map((task) => (
                <tr key={task.id}>
                  <td>{task.title}</td>
                  <td>{task.assignee}</td>
                  <td>{task.priority}</td>
                  <td>{task.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
}

export default App;
