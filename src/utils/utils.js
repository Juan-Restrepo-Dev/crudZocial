// export async function changeModule(moduleName) {
//     // obtiene  el elemento por id del documento html
//     const container = document.getElementById("root-content");
//     //pelu un loader pewrroooooo
//     container.innerHTML = "loading...";
//     //funcion fetch para obtener el elemnto html
//     try {
//         const response = await fetch(`src/${moduleName}/${moduleName}.html`);
//         if (!response.ok) throw new Error("Error al cargar el modulo");

//         const html = await response.text();
//         container.innerHTML = html;

//         //agregamos el css si no ha sido agregado
//         const existingStyle = document.querySelector(`link[data-module="${moduleName}"]`);
//         if (!existingStyle) {
//             const link = document.createElement("link");
//             link.rel = "stylesheet";
//             link.href = `src/${moduleName}/${moduleName}.css`;
//             link.setAttribute("data-module", moduleName);
//             document.head.appendChild(link);
//         }

//        //agregamos el script
//         const existingScript = document.querySelector(`script[data-module="${moduleName}"]`);
//         if (!existingScript) {
//             const script = document.createElement("script");
//             script.type ="module"
//             script.src = `src/${moduleName}/${moduleName}.js`;
//             script.setAttribute("data-module", moduleName);
//             script.onload = () => { console.log(`se a cargado el scipt del modulo ${moduleName}`)}
//             document.body.appendChild(script);
//         }
//     }
//     catch (error) {
//      console.error(error);
//      container.textContent = " ocurrio un error al cargar el modulo"
//     }
// }
export function loadModule(route) {
  const modules = {
    "/dashboard": async () => {
      const data = await fetch("/api/dashboard").then((res) => res.json());
      return `<h1>Dashboard</h1><p>${data.message}</p>`;
    },
    "/logout": () => {
      sessionStorage.removeItem("usuario");
      location.hash = "#/";
      return "<h1>Has cerrado sesión</h1>";
    },
  };

  return modules[route] || (() => "<h1>404</h1>");
}