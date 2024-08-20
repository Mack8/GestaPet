const { PrismaClient, Rol } = require("@prisma/client");
 
const prisma = new PrismaClient();

module.exports.get = async (request, response, next) => {
    let listRoles = [];
    for (let element in Rol) {
      switch (Rol[element]) {
        case Rol.ADMINISTRADOR:
          listRoles.unshift({
            ["id"]: Rol[element],
            ["nombre"]: "Administrador",
          });
          break;
        case Rol.ENCARGADO:
          listRoles.unshift({
            ["id"]: Rol[element],
            ["nombre"]: "Encargado",
          });
          break;
        case Rol.CLIENTE:
          listRoles.unshift({
            ["id"]: Rol[element],
            ["nombre"]: "Cliente",
          });
          break;
        default:
          listRoles.unshift({ ["id"]: Rol.CLIENTE, ["nombre"]: "Cliente" });
          break;
      }
    }
  
    response.json(listRoles);
  };
  

  module.exports.getById = async (request, response, next) => {
    let id = request.params.id;
    let nombre = "";
    switch (Rol[id]) {
      case Rol.ADMINISTRADOR:
        nombre = "Administrador";
        break;
      case Rol.ENCARGADO:
        nombre = "Encargado";
        break;
      case Rol.CLIENTE:
        nombre = "Cliente";
        break;
      default:
        nombre = "Cliente";
        break;
    }
    let rol = { ["id"]: Rol[id], ["nombre"]: nombre };
    response.json(rol);
  };
  


