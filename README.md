# GestaPet - Sistema de Gestión de Agenda para Clínicas Veterinarias 🐾

## Descripción
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
  - Control de versiones: **GitLab** (principal) y **GitHub**.
  - Almacenamiento local: Respaldo físico por cada integrante.
  - Comunicación del equipo: **WhatsApp** y correo electrónico.

---

## 🧑‍💻 **Equipo de Trabajo**
| Nombre                        | Correo                        | Teléfono         |
|-------------------------------|-------------------------------|------------------|
| **Marco Daniel Centeno Céspedes** | mcentenoc@est.utn.ac.cr       | 8996-2185        |
| **Marcia Elena Sánchez Abellán**  | masanchezab@est.utn.ac.cr     | 8989-8962        |

**Líder del Proyecto**: Marco Daniel Centeno Céspedes.

---

## 📂 **Estructura del Proyecto**
```plaintext
GestaPet/
│
├── backend/            # Código del servidor en Node.js y Prisma
│   ├── controllers/    # Controladores
│   ├── models/         # Modelos de base de datos
│   ├── routes/         # Definición de rutas
│   └── .env            # Variables de entorno
│
├── frontend/           # Código del cliente en Angular
│   ├── src/
│   │   ├── components/ # Componentes reutilizables
│   │   ├── pages/      # Vistas de la aplicación
│   │   └── assets/     # Recursos (imágenes, estilos)
│   └── angular.json
│
└── README.md           # Documentación del proyecto
