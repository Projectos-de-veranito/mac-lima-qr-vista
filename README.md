# MAC Lima - Tienda Virtual con QR

Sistema de tienda virtual para el Museo de Arte Contemporáneo de Lima (MAC Lima) con generación de códigos QR para productos físicos.

## 🚀 Demo en vivo

**URL**: https://mac-tienda-virtual.netlify.app/

## 📖 Descripción del proyecto

Aplicación web diseñada para MAC Lima que permite:

- **Catálogo digital** de productos del museo
- **Generación de códigos QR** para productos físicos
- **Panel de administración** para gestionar el inventario
- **Experiencia responsive** optimizada para móviles y tablets
- **Integración con tienda física** mediante códigos QR

## 🛠️ Tecnologías utilizadas

- **Frontend**: React + TypeScript + Vite
- **Styling**: Tailwind CSS + shadcn/ui
- **Routing**: React Router DOM
- **Estado**: React Hooks + Context
- **Deploy**: Netlify
- **QR Generation**: API externa para generación de códigos QR

## 🏗️ Estructura del proyecto

```
src/
├── components/          # Componentes reutilizables
│   ├── ProductForm.tsx  # Formulario de productos
│   ├── QRGenerator.tsx  # Generador de códigos QR
│   ├── ProtectedRoute.tsx # Protección de rutas admin
│   └── ui/             # Componentes de UI (shadcn)
├── pages/              # Páginas principales
│   ├── Index.tsx       # Página de inicio
│   ├── Product.tsx     # Página de producto individual
│   ├── Admin.tsx       # Panel de administración
│   └── NotFound.tsx    # Página 404
├── hooks/              # Hooks personalizados
│   ├── useAuth.tsx     # Manejo de autenticación
│   └── use-toast.ts    # Sistema de notificaciones
└── lib/                # Utilidades
    └── utils.ts
```

## 🚀 Instalación y desarrollo

### Prerrequisitos
- Node.js (v18 o superior)
- npm o yarn

### Pasos para desarrollo local

```bash
# 1. Clonar el repositorio
git clone https://github.com/Projectos-de-veranito/mac-lima-qr-vista

# 2. Navegar al directorio
cd mac-lima-qr-vista

# 3. Instalar dependencias
npm install

# 4. Iniciar servidor de desarrollo
npm run dev

# 5. Abrir en el navegador
# http://localhost:8080
```

### Comandos disponibles

```bash
npm run dev          # Servidor de desarrollo
npm run build        # Build para producción
npm run preview      # Preview del build
npm run lint         # Linter de código
```

## 🎯 Características principales

### Para visitantes
- ✅ Visualizar catálogo de productos
- ✅ Escanear códigos QR desde la tienda física
- ✅ Ver detalles completos de productos
- ✅ Compartir productos en redes sociales

### Para administradores
- ✅ Gestión completa de productos (CRUD)
- ✅ Generación de códigos QR personalizados
- ✅ Panel de estadísticas y analytics
- ✅ Categorización de productos
- ✅ Control de disponibilidad

## 📱 Responsive Design

La aplicación está optimizada para:
- 📱 **Móviles** (320px - 768px)
- 📱 **Tablets** (768px - 1024px)
- 💻 **Desktop** (1024px+)

## 🌐 Deploy en Netlify

La aplicación se despliega automáticamente en Netlify:

- **URL de producción**: https://mac-tienda-virtual.netlify.app/
- **Deploy automático** desde el branch principal
- **Configuración SPA** para React Router

### Archivos de configuración

```toml
# netlify.toml
[build]
  publish = "dist"
  command = "npm run build"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

## 🎨 Diseño y UX

- **Paleta de colores** oficial de MAC Lima
- **Tipografía** moderna y legible
- **Iconografía** consistente con Lucide React
- **Transiciones** suaves y naturales
- **Accesibilidad** siguiendo estándares WCAG

## 🔧 Configuración adicional

### Variables de entorno
```env
# No se requieren variables de entorno adicionales
# La aplicación usa APIs públicas para generación de QR
```

### Personalización
Para adaptar a otro museo o institución:
1. Cambiar logo en todas las páginas
2. Actualizar colores en `tailwind.config.js`
3. Modificar información de contacto en footer
4. Ajustar credenciales de admin en `useAuth.tsx`

## 📄 Licencia

Proyecto desarrollado para MAC Lima - Museo de Arte Contemporáneo de Lima.

## 👥 Contribución

Para contribuir al proyecto:
1. Fork del repositorio
2. Crear rama para nueva feature
3. Commit de cambios
4. Push a la rama
5. Crear Pull Request

---

**Desarrollado con ❤️ para MAC Lima**