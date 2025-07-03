const views = {
  "/": () => import('./views/home.js'),
  "/gallery": () => import('./views/about.js'),
  "/profile": () => import('./views/contact.js'),
  "/notes": () => import('./views/notes.js'),
  "/login": () => import('./views/login.js'),
  "/register": () => import('./views/register.js'),
}

function renderStatic(req) {
  const app = document.getElementById("app");
  app.innerHTML = views[req.route]?.() || "<h1>404</h1>";

  if (req.route === "/login") {
    document.getElementById("login-btn")?.addEventListener("click", () => {
      sessionStorage.setItem("usuario", JSON.stringify({ role: "admin" }));
      location.hash = "#/admin";
    });
  }
}
function renderSmart(req) {
  if (views[req.route]) {
    renderStatic(req);
  } else {
    renderDynamic(req);
  }
}