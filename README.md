src/
│
├── assets/                 # Imágenes, íconos, fuentes, etc.
├── components/             # Componentes UI reutilizables (botones, inputs, tablas)
│   └── ui/                 # Átomos: Button, Input, Modal, etc.
│   └── layout/             # Layouts generales: DashboardLayout, AuthLayout
│
├── features/               # Cada módulo funcional (por dominio)
│   └── auth/               # Módulo de autenticación
│   │   ├── api/            # Peticiones HTTP relacionadas
│   │   ├── components/     # Componentes específicos: LoginForm, AuthGuard
│   │   ├── hooks/          # Hooks personalizados: useAuth, useLogin
│   │   ├── types/          # Tipado de datos y contratos
│   │   └── services/       # Lógica de negocio / adaptación de datos
│   └── users/              # Módulo de usuarios
│       ├── api/
│       ├── components/
│       ├── hooks/
│       ├── types/
│       └── services/
│
├── lib/                    # Utilidades generales (formateadores, validaciones, helpers)
│
├── routes/                 # Definición centralizada de rutas (React Router)
│
├── store/                  # Gestión de estado global (Redux, Zustand, Context, etc.)
│
├── permissions/            # Gestión de permisos, roles y políticas de acceso
│
├── i18n/                   # Internacionalización (textos, traducciones)
│
├── theme/                  # Estilos, Tailwind config, MUI theme, variables, etc.
│
├── App.tsx                 # Root component
└── main.tsx                # Entry point (con ReactDOM)

