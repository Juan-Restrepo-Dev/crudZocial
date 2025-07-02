function logMiddleware(req, res, next) {
  console.log(`[Ruta]: ${req.url}`);
  next();
}
function sessionMiddleware(req, res, next) {
  const session = sessionStorage.getItem("userLog");
  req.user = session ? JSON.parse(session) : null;
  next();
}
function logoutMiddleware(req, res, next) {
  if (req.route === "/logout") {
    sessionStorage.removeItem("usuario");
    alert("Has cerrado sesión.");
    location.hash = "#/";
  }
  next();
}

// middlewares.push(logoutMiddleware);
function authGuard(req, res, next) {
  const rolesPermitidos = {
    "/admin": ["admin"],
    "/dashboard": ["admin", "editor"],
  };
  const rolesRuta = rolesPermitidos[req.route] || [];

  if (!rolesRuta.includes(req.user?.role)) {
    alert("Acceso denegado No tienes permisos para acceder a esta rut. Redirigiendo al inicio.");
    location.hash = "#/";
    return;
  }
  next();
}
