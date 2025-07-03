function logMiddleware(req, res, next) {
  console.log(`[Ruta] ${req.route}`);
  console.log(`[Usuario]`, req.user);
  next();

}
function sessionMiddleware(req, res, next) {
  const session = sessionStorage.getItem("userLog");
  console.log(`[Usuario]`, req.user);
  req.user = session ? JSON.parse(session) : null;
  if (req.user) {
    console.log("Usuario autenticado:", req.user);
  } else {
    console.log("No hay usuario autenticado.");
  }
  next();
}
function logoutMiddleware(req, res, next) {
  if (req.route === "/logout") {
    sessionStorage.removeItem("userLog");
    alert("Has cerrado sesión.");
    location.hash = "#/";
  }
  next();
}

// middlewares.push(logoutMiddleware);
function authGuard(req, res, next) {
  const rolesPermitidos = {
    "": ["admin", "user"],
    "/": ["admin","user"],
    "/index.html": ["admin", "user"],
    "/profile": ["admin", "user"],
    "/notes": ["admin", "user"],
    "/gallery": ["admin", "user"],
    "/logs": ["admin", "user"],
  };
  const rolesRuta = rolesPermitidos[req.route] || [];
  console.log(`Roles permitidos para la ruta ${req.route}:`, rolesRuta);

  if (!rolesRuta.includes(req.user?.role)) {
    alert("Acceso denegado No tienes permisos para acceder a esta ruta. Redirigiendo al inicio de seccion...");
    location= "src/auth/login/login.html";
    return;
  }
  next();
}

export const guards = {logMiddleware, sessionMiddleware, logoutMiddleware, authGuard};