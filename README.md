 Sistema de Inventario de Equipamiento Tecnológico

Evaluación N.º 2 · Lenguaje de Programación Web II

 Información del Estudiante
- Nombre: [Tu Nombre Completo Aquí]
- Asignatura: Lenguaje de Programación Web II
- Institución: Instituto Profesional Virgen de la Candelaria (IPVG) - Sede Chillán
- Año: 2026



Descripción del Proyecto
Aplicación Web Full Stack diseñada para gestionar el control e inventario de equipamiento tecnológico (laptops, proyectores, PCs, impresoras, etc.). Permite registrar nuevos dispositivos, listarlos en tiempo real, editarlos, filtrarlos por distintos parámetros y eliminarlos con confirmación previa.

--

 Tecnologías Utilizadas
- Backend: NestJS, TypeORM, Class-Validator, Class-Transformer
- Frontend: Vue 3, Vite, JavaScript (ES6+), HTML5, CSS3
- Base de Datos:MySQL
- Control de Versiones: Git y GitHub
- Entorno de Desarrollo: Visual Studio Code (Windows)

--

 Requisitos de Instalación
- Node.js: Versión 18.x o superior
- npm:Gestor de paquetes incluido con Node.js
- MySQL Server: Instancia local activa (puerto 3306)
- Git: Instalado y configurado en el sistema

--

Instrucciones para Crear/Configurar la Base de Datos MySQL

1. Asegúrate de tener el servidor de MySQL ejecutándose en tu equipo.
2. Abre tu gestor de base de datos (MySQL Workbench, phpMyAdmin o Terminal MySQL) y ejecuta la siguiente consulta SQL:
   ```sql
   CREATE DATABASE inventario_tecnologico;
TypeOrm Se encargara de la creacion de las tablas de base de datos

--

Variables Necesarias en .env.example

--Ubicado en la ruta backend/.env.example

        (Fragmento de código)

DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=tu_contraseña
DB_NAME=inventario_tecnologico
PORT=3000

crea un archivo .env dentro de /backend usando esta misma estructura pero con tus credenciales reales de MySQL

--------------
Pasos para Ejecutar Backend y Frontend
--------------

--cd backend

--npm install

--npm run start:dev

--------------
Ejecución del Frontend
--------------

--cd frontend

--npm install

--npm run dev

--------------
Listado de Endpoints de la API
--------------

--GET	 /equipos	    Obtiene la lista completa de equipos

--GET	 /equipos/:id	Obtiene un equipo específico por su ID

--POST	 /equipos	    Registra un nuevo equipo en la base datos

--PATCH	 /equipos/:id	Actualiza parcialmente un equipo existente

--DELETE /equipos/:id	Elimina un equipo de la base de datos

-----
Descripción Breve de la Estructura del Proyecto
-----
trabajo2/
├── backend/                  
│   ├── src/
│   │   ├── equipo/         
│   │   │   ├── dto/          
│   │   │   ├── entities/    
│   │   │   ├── equipo.controller.ts  
│   │   │   ├── equipo.service.ts    
│   │   │   └── equipo.module.ts     
│   │   ├── app.module.ts   
│   │   └── main.ts          
│   ├── .env.example        
│   └── .gitignore            
│
├── frontend/                 
│   ├── src/
│   │   ├── services/         
│   │   ├── App.vue          
│   │   └── main.js           
│   └── package.json          
│
└── README.md                 


----------------
Declaracion De uso De inteligencia artificial 
----------------

En el desarrollo del trabajo me guie por guias anteriores en lo cual en algunas parte ocupe inteligencia artificial que es en partes especificas exactamente en el frontend para el diseño y en el readme para realizar la descripcion de la estructura del proyecto igualmente recalcar que la ocupe para algunos errores para resolverlo

