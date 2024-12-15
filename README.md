# Gestión de Agenda de Servicios

### Descripción
Esta aplicación web permite gestionar agendas de servicios para diferentes tipos de negocios, como clínicas, spas, peluquerías, centros veterinarios, entre otros. Proporciona herramientas para gestionar usuarios, sucursales, servicios, reservas y facturación, ofreciendo una experiencia eficiente tanto para administradores, encargados y clientes.

---

## **Características principales**
- **Gestión de usuarios**:
  - Autenticación y autorización con 3 roles: Cliente, Encargado y Administrador.
  - Registro automático para clientes y gestión de roles por el administrador.
- **Gestión de sucursales**:
  - Registro, modificación y visualización de sucursales con información relevante.
- **Gestión de servicios**:
  - Administración de servicios, incluyendo nombre, descripción, tarifa y tiempo.
  - Filtros para buscar y ordenar servicios.
- **Reservas**:
  - Registro de citas por clientes y encargados, con múltiples estados (Pendiente, Confirmada, Cancelada, etc.).
  - Funcionalidad para cancelar, reprogramar y confirmar reservas.
  - Visualización de agenda semanal con detalles de citas y sus estados.
- **Facturación**:
  - Generación de facturas en formato PDF, incluyendo servicios y productos.
  - Envío de facturas por correo electrónico.
  - Visualización de historial de facturas por cliente, encargado y administrador.
- **Gestión de horarios**:
  - Configuración de horarios semanales y bloqueo de días o turnos.

---

## **Requerimientos técnicos**
- **Backend**:
  - Node.js, Prisma para la comunicación con la base de datos.
  - Base de datos relacional **MySQL**.
- **Frontend**:
  - Framework: Angular.
  - Interfaz amigable y diseño lógico para usuarios.
- **Otros**:
  - Diseño modular basado en principios vistos en clase.
  - Generación de gráficos para análisis de datos.

---

## **Tipo de negocio**
La aplicación puede adaptarse a múltiples tipos de negocios, como:
- Clínicas dentales
- Salones de belleza
- Spas
- Centros veterinarios
- Tatuadores
- Gimnasios
- Clínicas de fisioterapia

El diseño debe ajustarse al negocio seleccionado, con una interfaz personalizada.

---

## **Instrucciones para ejecutar el proyecto**

### **Backend**
1. Clona el repositorio:
   ```bash
   git clone https://github.com/tu_usuario/nombre_repositorio.git
   cd nombre_repositorio/backend
