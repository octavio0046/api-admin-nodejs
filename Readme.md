# Smart Api Escuelas
## Descripción
Api encargada de administrar los modulos de:
- Super Administracion
- Administracion
- Catalogos
- Work Flow

# Requisitos
- NodeJs.
# Dependencias
- aws-sdk
- bcrypt
- body-parse
- cors
- csv-parser
- dotenv
- express
- generate-password
- jsonwebtoken
- morgan
- multer
- mysql2
- sequelize
- sequelize-cli
- swagger-ui-express
# Estructura del Proyecto
## Administracion
- persona
- tipo_persona
- usuario
## Super Administracion
- accion
- bitacoras
- detalles funcion
- funcion_accion
- funcion
- modulo
- rol funcion
- rol
## Catalogos
- departamento
- empresas has localizadores
- empresa
- funcion
- grupo trabajo
- municipio
- spanish error
- tipo localizador
- tipo persona has funcion
- tipo persona has localizador
- unidad negocio
## Work Flow
- carrera
- curso has profesor
- curso
- grado asignacion curso
- grado asignacion
- grado
- horario
- jornada
- seccion
# Ejecutar Proyecto
### Clonar Repositorio
`$ git clone https://github.com/jose16-21/smart-api-escuelas.git`
### Instalar dependencias
`$ npm install`
### Iniciar proyecto
`$ nodemon start`
# Rutas
## Rutas de Carga
- /usuarios/carga
- /personas/carga
- /tipos-personas/carga
- /departamentos/carga
- /empresas-has-localizador/carga
- /municipios/carga
- /tipos-localizadores/carga
- /tipos-persona-has-funcion/carga
- /carreras/carga
- /cursos/carga
- /grados/carga
- /horarios/carga
- /jornadas/carga
- /secciones/carga
## Administracion
### Usuarios
- /usuarios
- /usuarios/noasignados
- /usuario/buscar/:Txt
- /usuarios/reinicio
- /usuarios/signup
- /usuarios/login
- /usuarios/perfil/id
- /usuarios/id
### Personas
- /personas
- /personas/Id
- /personas/buscar/Txt
- /personas/carga
### Tipos personas
- /tipos-personas
- /tipos-personas/detalles
- /tipos-personas/detalles/Id
- /tipos-personas/tipos/tipo
- /tipos-personas/Id
- /tipos-personas/buscar/Txt
- /tipos-personas/carga
## Super Administracion
### Acciones
- /acciones
- /acciones/detalle
- /acciones/id
- /acciones/buscar/:Txt
### Bitacoras
- /bitacoras
- /bitacoras/detalle
- /bitacoras/Id
- /bitacoras/buscar/:Txt
### Detalle Funciones
- /detalles-funciones
- /detalles-funciones/Id
- /detalles-funciones/detalle
- /detalles-funciones/buscar/:Txt
### Funciones
- /funciones
- /funciones/Id
- /funciones/detalle
- /funciones/noasignadas
- /funciones/buscar/:Txt
### Funciones acciones
- /funciones-acciones
- /funciones-acciones/Id
- /funciones-acciones/buscar/:Txt
### Modulos
- /modulos
- /modulos/Id
- /modulos/buscar/:Txt
### Roles
- /roles
- /roles/Id
- /roles/perfil/Id
- /roles/menu/Id
- /roles/buscar/Txt
### Roles Funciones
- /roles-funciones
- /roles-funciones/Id
- /roles-funciones/buscar/Txt
## Catalogos
### Departamentos
- /departamentos
- /departamentos/Id
- /departamentos/buscar/Txt
- /departamentos/carga
### Empresas
- /empresas
- /empresas/Id
- /empresas/buscar/Txt
### Empresas has Localizadores
- /empresas-has-localizador
- /empresas-has-localizador/detalle
- /empresas-has-localizador/Id
- /empresas-has-localizador/buscar/Txt
- /empresas-has-localizador/carga
### Funciones
- /tc-funciones
- /tc-funciones/Id
- /tc-funciones/buscar/Txt
### Municipios
- /municipios
- /municipios/Id
- /municipios/buscar/Txt
- /municipios/carga
### Grupos Trabajos
- /grupos-trabajo
- /grupos-trabajo/Id
- /grupos-trabajo/buscar/Txt
### Tipos Localizadores
- /tipos-localizadores
- /tipos-localizadores/Id
- /tipos-localizadores/buscar/Txt
- /tipos-localizadores/carga
### Tipos Personas has funciones
- /tipos-persona-has-funcion
- /tipos-persona-has-funcion/Id
- /tipos-persona-has-funcion/buscar/Txt
- /tipos-persona-has-funcion/carga
### Tipos Personas has Localizadores
- /tipos-persona-has-localizador
- /tipos-persona-has-localizador/Id
- /tipos-persona-has-localizador/buscar/Txt
### Unidades Negocios
- /unidades-negocio
- /unidades-negocio/Id
- /unidades-negocio/buscar/Txt
## Work Flow
### Carrreras
- /carreras
- /carreras/Id
- /carreras/buscar/Txt
- /carreras/carga
### Cursos
- /cursos
- /cursos/Id
- /cursos/buscar/Txt
- /cursos/carga
### Cursos has Profesores
- /cursos-has-profesores
- /cursos-has-profesores/Id
- /cursos-has-profesores/buscar/Txt
### Grados
- /grados
- /grados/Id
- /grados/buscar/Txt
- /grados/carga
### Grados Asignaciones
- /grados-asignaciones
- /grados-asignaciones/Id
- /grados-asignaciones/buscar/Txt
### Grados Asignaciones Cursos
- /grados-asignaciones-cursos
- /rados-asignaciones-cursos/Id
- /rados-asignaciones-cursos/buscar/Txt
### Horarios
- /horarios
- /horarios/Id
- /horarios/buscar/Txt
- /horarios/carga
### Jornadas
- /jornadas
- /jornadas/Id
- /jornadas/buscar/Txt
- /jornadas/carga
### Secciones
- /secciones
- /secciones/Id
- /secciones/buscar/Txt
- /secciones/carga
# Seeders
## Crear Seeders
`$ npx sequelize-cli seed:generate --name demo-user`
## Ejecutar Seeders
`$ npx sequelize-cli db:seed:all`
# Migraciones
## Crear Migraciones
`$ npx sequelize-cli model:generate --name User --attributes firstName:string,lastName:string,email:string`
## Ejecutar Migraciones
`$ npx sequelize-cli db:migrate`
## Eliminar Migraciones
`$ npx sequelize-cli db:migrate:undo`

