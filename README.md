# Cop´r Drop — E-Commerce

![React](https://img.shields.io/badge/React-17-61DAFB?logo=react&logoColor=white)
![Material UI](https://img.shields.io/badge/MUI-5-007FFF?logo=mui&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-Firestore-FFCA28?logo=firebase&logoColor=black)

Tienda online de streetwear y sneakers desarrollada con React. Incluye catálogo por categorías, detalle de producto, carrito de compras y checkout con persistencia de órdenes.

**Demo en vivo:** [react-js-e-commerce-six.vercel.app](https://react-js-e-commerce-six.vercel.app)

---

## Funcionalidades

- Catálogo de productos desde [DummyJSON](https://dummyjson.com/) (Nike, Puma, Off White, etc.)
- Filtrado por categoría: remeras, hoodies y sneakers
- Detalle con galería de imágenes, stock, rating y navegación atrás
- Cards clickeables en toda la superficie
- Carrito con cantidades, subtotales y persistencia en `localStorage`
- Checkout con confirmación de orden en Firebase Firestore
- Diseño responsive con menú mobile
- Página 404
- Estados de carga y error

---

## Stack tecnológico

| Tecnología | Uso |
|---|---|
| React 17 + CRA | Frontend |
| React Router v6 | Routing SPA |
| Material UI | Componentes UI y tema oscuro |
| Context API | Estado del carrito |
| DummyJSON | Catálogo de productos |
| Firebase Firestore | Persistencia de órdenes |

---

## Decisiones técnicas

- **DummyJSON para productos:** no existen APIs públicas oficiales de marcas como Nike. DummyJSON ofrece datos realistas con CORS habilitado, ideal para demos y portfolios.
- **Firebase solo para órdenes:** el catálogo funciona sin configuración adicional. Firebase se usa únicamente en el checkout.
- **Context API:** el carrito es el único estado global compartido; Context es suficiente para el scope del proyecto.
- **localStorage:** el carrito persiste entre refrescos sin necesidad de backend.

---

## Instalación

```bash
git clone https://github.com/nicortese/ReactJS-E-Commerce.git
cd ReactJS-E-Commerce
npm install
cp .env.example .env
npm start
```

La app corre en [http://localhost:3000](http://localhost:3000).

---

## Variables de entorno

Copiá `.env.example` a `.env` y completá las credenciales de Firebase:

```env
REACT_APP_FIREBASE_API_KEY=
REACT_APP_FIREBASE_AUTH_DOMAIN=
REACT_APP_FIREBASE_PROJECT_ID=
REACT_APP_FIREBASE_STORAGE_BUCKET=
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=
REACT_APP_FIREBASE_APP_ID=
```

El catálogo funciona sin Firebase. Las variables son necesarias únicamente para guardar órdenes en el checkout.

### Reglas de Firestore

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /orders/{orderId} {
      allow create: if true;
      allow read, update, delete: if false;
    }
  }
}
```

---

## Scripts

```bash
npm start       # Servidor de desarrollo
npm test        # Ejecutar tests
npm run build   # Build de producción
```

---

## Estructura del proyecto

```
src/
├── App.js
├── theme.js
├── Context/CartContext.jsx
├── services/dummyJsonProducts.js
├── utils/firebase.js
├── components/
│   ├── NavBar/
│   ├── Hero/
│   ├── Card/
│   ├── Cart/
│   ├── Form/
│   ├── Footer/
│   ├── NotFound/
│   └── itemlistContainer.jsx
└── index.js
```

---

## Catálogo — mapeo de categorías

| Tienda | API DummyJSON | Marcas |
|--------|---------------|--------|
| Remeras | `mens-shirts` | Fashion Trends, Urban Chic |
| Hoodies | `tops`, `womens-dresses` | — |
| Sneakers | `mens-shoes`, `womens-shoes` | Nike, Puma, Off White |

---

## Autor

**Nico Cortese**
