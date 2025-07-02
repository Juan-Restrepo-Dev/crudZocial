

const views = {
  "/": () => import('./views/home.js'),
  "/gallery": () => import('./views/about.js'),
  "/profile": () => import('./views/contact.js'),
  "notes": () => import('./views/notes.js'),
  "/login": () => import('./views/login.js'),
  "/register": () => import('./views/register.js'),
}