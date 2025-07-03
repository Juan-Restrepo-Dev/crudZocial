import {loadModule} from "../utils/utils.js"
import  * as middleWarares from "../guard/guard.js"

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
    render(req);
  };
}

function render(req) {
  loadModule(req.route);
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


