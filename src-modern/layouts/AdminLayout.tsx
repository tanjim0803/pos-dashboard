import { Outlet, NavLink } from 'react-router-dom';

const nav = [
  { to: '/', label: 'Dashboard' },
  { to: '/analytics', label: 'Analytics' },
  { to: '/users', label: 'Users' },
  { to: '/products', label: 'Products' },
  { to: '/orders', label: 'Orders' },
  { to: '/reports', label: 'Reports' },
  { to: '/messages', label: 'Messages' },
  { to: '/calendar', label: 'Calendar' },
  { to: '/files', label: 'Files' },
  { to: '/forms', label: 'Forms' },
  { to: '/settings', label: 'Settings' },
  { to: '/security', label: 'Security' },
  { to: '/help', label: 'Help' },
];

export default function AdminLayout() {
  return (
    <div className="admin-layout">
      <aside className="admin-sidebar" style={{ width: 280, minHeight: '100vh' }}>
        <nav className="px-3 py-4">
          <h5 className="mb-3">Metis</h5>
          <ul className="nav flex-column">
            {nav.map((n) => (
              <li key={n.to} className="nav-item">
                <NavLink
                  to={n.to}
                  className={({ isActive }) =>
                    'nav-link' + (isActive ? ' active' : '')
                  }
                  end={n.to === '/'}
                >
                  {n.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
      <div className="admin-main" style={{ marginLeft: 280 }}>
        <header className="admin-header p-3 border-bottom">
          <span className="fw-semibold">Metis Dashboard</span>
        </header>
        <main className="p-3">
          <Outlet />
        </main>
      </div>
    </div>
  );
}