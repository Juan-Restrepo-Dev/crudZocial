
const inputUrl = document.getElementById('imageUrl');
const btnAgregar = document.getElementById('btnAgregar');
const galeria = document.getElementById('galeria');

// Cargar imágenes desde localStorage al iniciar
document.addEventListener('DOMContentLoaded', () => {
  const fotosGuardadas = JSON.parse(localStorage.getItem('fotos')) || [];
  fotosGuardadas.forEach(url => crearTarjeta(url));
});

// Agregar evento al botón
btnAgregar.addEventListener('click', () => {
  const url = inputUrl.value.trim();
  if (!url) return;

  crearTarjeta(url);
  guardarFoto(url);
  inputUrl.value = '';
});

// Delegar el evento de eliminar a la galería
galeria.addEventListener('click', (e) => {
  if (e.target.classList.contains('btn-eliminar')) {
    const col = e.target.closest('.col-md-4');
    const url = col.getAttribute('data-url');
    eliminarFoto(url);
    col.remove();
  }
});

function crearTarjeta(url) {
  const col = document.createElement('div');
  col.className = 'col-md-4 mb-4';
  col.setAttribute('data-url', url);

  col.innerHTML = `
    <div class="card shadow-sm h-50">
      <img src="${url}" class="card-img-top h-100" alt="Foto">
      <button class="btn btn-danger btn-sm btn-eliminar">Eliminar</button>
      
    </div>
  `;

  galeria.appendChild(col);
} 

function guardarFoto(url) {
  const fotos = JSON.parse(localStorage.getItem('fotos')) || [];
  fotos.push(url);
  localStorage.setItem('fotos', JSON.stringify(fotos));
}

function eliminarFoto(url) {
  const fotos = JSON.parse(localStorage.getItem('fotos')) || [];
  const nuevasFotos = fotos.filter(foto => foto !== url);
  localStorage.setItem('fotos', JSON.stringify(nuevasFotos));
}