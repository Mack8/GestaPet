# GestaPet - Sistema de Gestión de Agenda para Clínicas Veterinarias 🐾

## 📖 **Descripción**
**GestaPet** es una aplicación web desarrollada para **clínicas veterinarias**, con el objetivo de gestionar:
- **Citas y servicios** para mascotas.
- **Catálogo de productos** relacionados con la salud y confort de las mascotas.
- **Horarios y disponibilidad** del personal encargado.
- **Facturación** de servicios y productos.

La aplicación facilita la organización eficiente de sucursales, usuarios y reservas, permitiendo una experiencia óptima tanto para clientes, encargados y administradores.

---

## 🎯 **Objetivos**
- Permitir a los **clientes** agendar citas fácilmente y visualizar sus citas e historial.
- Facilitar a los **encargados** el manejo de horarios, reservas y productos.
- Ofrecer a los **administradores** control total sobre usuarios, sucursales, servicios y facturación.

---

## 🚀 **Características Principales**
### 1. **Gestión de Citas y Servicios**
- Registro y administración de citas con distintos estados:
  - Pendiente, Confirmada, Completada, Cancelada, Reprogramada, No asistió.
- Clasificación de servicios por **categorías**: Consulta, vacunación, cirugía, etc.
- Campos adicionales:
  - **Dueño**: Identifica al responsable de la mascota.
  - **Especie**: Clasifica el tipo de mascota (perro, gato, etc.).
  - **Disponibilidad de Emergencia**: Define si un servicio está disponible para emergencias.

### 2. **Catálogo de Productos**
- Gestión de productos con campos adicionales:
  - **Proveedor**: Distribuidor del artículo.
  - **Fecha de Caducidad**: Vigencia del producto.
- Filtrado de productos por **categorías**.

### 3. **Gestión de Usuarios y Roles**
- Autenticación y autorización con 3 roles:
  - **Administrador**: Control total del sistema.
  - **Encargado**: Gestión de citas y sucursales asignadas.
  - **Cliente**: Reserva de citas y visualización de su historial.
- Registro automático para clientes.

### 4. **Agenda de Reservas**
- Representación visual de la agenda semanal con disponibilidad.
- Bloqueo de turnos o días completos.
- Reprogramación y cancelación de citas.

### 5. **Facturación**
- Generación de facturas en **PDF** y envío por correo electrónico.
- Inclusión automática de servicios y productos.

---

## 🛠️ **Requerimientos Técnicos**
- **Backend**:
  - Node.js con **Prisma**.
  - Base de datos relacional **MySQL**.
- **Frontend**:
  - Framework: **Angular**.
  - Diseño responsivo y amigable para el usuario.
- **Herramientas de Desarrollo**:
  - Control de versiones: **GitHub**.

---

## 📋 **Instrucciones para Ejecutar**

### 🚀 **Backend**

#### 1. **Clonar el repositorio**

```bash
- git clone https://github.com/usuario/gestapet.git
- cd gestapet/backend

```

#### 2. **Instalar dependencias**

```bash
- npm install
```

#### 3. **Configurar variables de entornos**

```bash
# Configuración de base de datos
DATABASE_URL="mysql://usuario:contraseña@localhost:3306/nombre_base_datos"

# Puerto del servidor
PORT=3000

# Clave secreta para JWT
JWT_SECRET="mi_clave_secreta"

```

#### 4. ** Iniciar el servidor**

```bash
- npm start
```

### 🌐 **Frontend**

#### 1. **Accede al directorio del frontend**

```bash
- cd ../frontend
```

#### 2. **Instalar dependencias**

```bash
- npm install
```

#### 3. **Iniciar la aplicación**

```bash
- ng serve
```


## 🧑‍💻 **Equipo de Trabajo**
| Nombre                        | Correo                        |
|-------------------------------|-------------------------------|
| **Marco Daniel Centeno Céspedes** | mcentenoc@est.utn.ac.cr       | 
| **Marcia Elena Sánchez Abellán**  | masanchezab@est.utn.ac.cr     | 

**Líder del Proyecto**: Marco Centeno.

---

## 📂 **Estructura del Proyecto**
```plaintext
GestaPet/
│
├── server/            # Código del servidor en Node.js y Prisma
│   ├── controllers/    # Controladores
│   ├── models/         # Modelos de base de datos
│   ├── routes/         # Definición de rutas
│   └── .env            # Variables de entorno
│
├── angular/           # Código del cliente en Angular
│   ├── src/
│   │   ├── components/ # Componentes reutilizables
│   │   ├── pages/      # Vistas de la aplicación
│   │   └── assets/     # Recursos (imágenes, estilos)
│   └── angular.json
│
└── README.md           # Documentación del proyecto






