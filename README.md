Proyecto: Crudysocial
Usuarios
Sistema que permite el registro, autenticación y gestión de información para múltiples usuarios. Cada usuario puede crear, editar y eliminar sus notas e imágenes personales. 
La navegación entre páginas protegidas requiere que el usuario haya iniciado sesión.

Imágenes:
Los usuarios tienen acceso a una página donde pueden ver sus imágenes almacenadas. No se permite acceder a esta sección sin haber iniciado sesión previamente.

Notas:
Cada usuario puede crear y administrar sus notas personales. Se permite:
- Crear nuevas notas.
- Editar notas existentes.
- Eliminar notas propias.

Perfil de Usuario:
En la sección de perfil, los usuarios pueden:
- Ver y actualizar su información personal: nombre, hito, email, teléfono, país, ciudad y dirección.
- Cerrar sesión desde esta sección.

Logs:
El sistema genera registros automáticos (logs) para cada acción relevante, tales como:
- ID
- Accion
- Fecha

Azure DevOps:
El proyecto debe registrarse en Azure DevOps con seguimiento de:
- Usuarios (login, registro)
- Notas e imágenes
- Logs (creación, edición, eliminación)
Se recomienda el uso de addEventListener para controlar eventos (evitar el uso de onclick o onsubmit directamente).

Estructura del Proyecto
- login.html: Inicio de sesión
- register.html: formulario de nuevo registro
- images.html: Visualización de imágenes
- notes.html: Administración de notas
- profile.html: Perfil de usuario

Celula DeepBlue
Integrantes:
- Isabella Pulgarín Muñoz
- David Palacios Padilla
- Juan Jose Restrepo Osorio
- Jefferson Giraldo Posada

  
