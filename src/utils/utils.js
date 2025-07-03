async function loadModule(route) {
  console.log("Cargando modulo para la ruta:", route);

  // obtiene  el elemento root por id del documento html
  const container = document.getElementById("app-container");
  //pelu un loader 
  container.innerHTML = "loading...";
  //funcion fetch para obtener el elemnto html
  try {
    const response = await fetch(`src${route}${route}.html`);
    if (!response.ok) throw new Error("Error al cargar el modulo");

    const html = await response.text();
    container.innerHTML = html;

    //agregamos el css si no ha sido agregado
    const existingStyle = document.querySelector(`link[data-module="${route}"]`);
    if (!existingStyle) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = `src${route}${route}.css`;
      link.setAttribute("data-module", route);
      document.head.appendChild(link);
    }

    //agregamos el script
    const existingScript = document.querySelector(`script[data-module="${route}"]`);
    if (!existingScript) {
      const script = document.createElement("script");
      script.type = "module"
      script.src = `src${route}${route}.js`;
      script.setAttribute("data-module", route);
      script.onload = () => { console.log(`se a cargado el scipt del modulo ${route}`) }
      document.body.appendChild(script);
    }
  }
  catch (error) {
    console.error(error, "ocurrio un error al cargar el modulo");
    container.innerHTML = " <h1>404 Lapagina no existe </h1> "
  }

}

export function render(req) {
  if (!req.route) {
    console.error("No se ha proporcionado una ruta válida");
    return;
  }
  if (req.route === "/") {
    return
  } else {
    loadModule(req.route);
  }
}
export function RegisterAction(action) {
  const date = new Date().toLocaleString();

  const history = JSON.parse(localStorage.getItem("Action")) || [];
  history.push({ action, date });

  localStorage.setItem("Action", JSON.stringify(history));
};
