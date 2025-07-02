import {loadModule} from "../utils/utils.js"

const views = {
  "/": () => import('./views/home.js'),
  "/gallery": () => import('./views/about.js'),
  "/profile": () => import('./views/contact.js'),
  "/notes": () => import('./views/notes.js'),
  "/login": () => import('./views/login.js'),
  "/register": () => import('./views/register.js'),
}
const middlewares = [logMiddleware, sessionMiddleware, authGuard];

function composeAsync(middlewares) {
  return async function handler(req, res) {
    showSpinner();
    for (let i = 0; i < middlewares.length; i++) {
      await new Promise((resolve, reject) => {
        try {
          middlewares[i](req, res, resolve);
        } catch (err) {
          reject(err);
        }
      });
    }
    hideSpinner();
    renderSmart(req);
  };
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

function renderDynamic(req) {
  const app = document.getElementById("app");
  const module = loadModule(req.route);

  if (typeof module === "function") {
    module().then((content) => {
      app.innerHTML = content;
    });
  } else {
    app.innerHTML = module();
  }
}

function renderSmart(req) {
  if (views[req.route]) {
    renderStatic(req);
  } else {
    renderDynamic(req);
  }
}
function showSpinner() {
  document.getElementById("spinner").style.display = "block";
}

function hideSpinner() {
  document.getElementById("spinner").style.display = "none";
}

export function handleRouteChange() {
  const route = location.hash.slice(1) || "/";
  const req = { route };
  const res = {};
  composeAsync(middlewares)(req, res);
}


