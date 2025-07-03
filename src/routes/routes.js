import {render} from "../utils/utils.js"
import {guards} from "../guard/guard.js"

const middlewares = [guards.logMiddleware, guards.sessionMiddleware, guards.authGuard];

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
    render(req);
  };
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
  console.log("Ruta actual:", route);
  composeAsync(middlewares)(req, res);
}


