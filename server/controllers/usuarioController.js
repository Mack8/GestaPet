
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const { Rol } = require("@prisma/client");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

module.exports.get = async (request, response, next) => {
  const usuarios = await prisma.usuario.findMany();
  response.json(usuarios);
};

module.exports.getUsuarioById = async (request, response, next) => {
  let idUsuario = parseInt(request.params.id);
  const usuario = await prisma.usuario.findUnique({
    where: { id: idUsuario },
    include: {
      mascotas: true,
      citas: true,
      facturas: true,
      sucursal: true,
    },
  });
  response.json(usuario);
};



module.exports.getUsuarios = async (request, response, next) => {
    try {
      const usuarios = await prisma.usuario.findMany({
        where: {
            rol: 'CLIENTE' 
          },
        select: {
          id: true,
          nombre: true,
          correoElectronico: true 
        }
      });
      response.json(usuarios);
    } catch (error) {
      next(error);
    }
  };






module.exports.getEncargadosDisponibles = async (request, response, next) => {
  const sucursalId = parseInt(request.params.sucursalId);
  try {
    const encargados = await prisma.usuario.findMany({
      where: {
        rol: "ENCARGADO",
        OR: [{ sucursalId: null }, { sucursalId: sucursalId }],
      },
    });
    response.json(encargados);
  } catch (error) {
    next(error);
  }
};

module.exports.getUsuariosEncargadosDisponibles = async (
  request,
  response,
  next
) => {
  const encargadosSinSucursal = await prisma.usuario.findMany({
    where: {
      rol: "ENCARGADO",
      sucursalId: null,
    },
  });
  console.log(encargadosSinSucursal);
  response.json(encargadosSinSucursal);
};

module.exports.create = async (request, response, next) => {
  const userData = request.body;

  // Generar un salt con factor de costo de 10
  let salt = bcrypt.genSaltSync(10);
  
  // Hashear la contraseña
  let hash = bcrypt.hashSync(userData.contrasena, salt);
  
  try {
    const user = await prisma.usuario.create({
      data: {
        nombre: userData.nombre,
        telefono: userData.telefono,
        correoElectronico: userData.correoElectronico,
        direccion: userData.direccion,
        fechaNacimiento: new Date(userData.fechaNacimiento),
        contrasena: hash,
      },
    });

    response.status(200).json({
      status: true,
      message: "Usuario creado",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};


module.exports.updateUsuario = async (request, response, next) => {
  const userData = request.body;
  let idUsuario = parseInt(request.params.id);

  // Si se proporciona una nueva contraseña, generarla y hashearla
  let hash = null;
  if (userData.contrasena) {
    let salt = bcrypt.genSaltSync(10);
    hash = bcrypt.hashSync(userData.contrasena, salt);
  }

  try {
    const updateUsuario = await prisma.usuario.update({
      where: {
        id: idUsuario,
      },
      data: {
        nombre: userData.nombre,
        telefono: userData.telefono,
        correoElectronico: userData.correoElectronico,
        direccion: userData.direccion,
        fechaNacimiento: new Date(userData.fechaNacimiento),
        contrasena: hash || undefined, // Si no se proporciona una nueva contraseña, mantener la anterior
        rol: Rol[userData.rol], // Convertir el rol a su valor en el enum
      },
    });

    response.json(updateUsuario);
  } catch (error) {
    next(error);
  }
};


module.exports.getClientes = async (request, response, next) => {
  try {
    const encargados = await prisma.usuario.findMany({
      where: {
        rol: "CLIENTE",
      },
      include: {
        mascotas: true,
      },
    });
    response.json(encargados);
  } catch (error) {
    next(error);
  }
};

module.exports.login = async (request, response, next) => {
  const userReq = request.body;

  try {
    // Buscar el usuario según el correo electrónico dado
    const user = await prisma.usuario.findUnique({
      where: {
        correoElectronico: userReq.correoElectronico,
      },
    });

    // Si no encuentra al usuario según el correo electrónico
    if (!user) {
      return response.status(401).send({
        success: false,
        message: "Usuario no registrado",
      });
    }

    // Verifica la contraseña comparando el hash almacenado con la contraseña proporcionada
    const checkPassword = await bcrypt.compare(userReq.contrasena, user.contrasena);

    if (!checkPassword) {
      return response.status(401).send({
        success: false,
        message: "Credenciales no válidas",
      });
    }

    // Si la autenticación es correcta, crear el payload
    const payload = {
      id: user.id,
      correoElectronico: user.correoElectronico,
      rol: user.rol,
      idSucursal: user.sucursalId || null 
    };

    // Crear el token usando JWT
    const token = jwt.sign(payload, process.env.SECRET_KEY, {
      expiresIn: process.env.JWT_EXPIRE,
    });

    // Responder con el token y mensaje de éxito
    response.json({
      success: true,
      message: "Inicio de sesión exitoso",
      token,
    });
  } catch (error) {
    next(error);
  }
};
