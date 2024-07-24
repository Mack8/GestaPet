export class ErrorMessage {
    constructor(
      public forControl: string,
      public forValidator: string,
      public text: string
    ) { }
  }
//Mensajes de errores de validación
export const FormErrorMessage = [
  new ErrorMessage('finicio', 'required', 'Fecha Inicio, requerida'),
  new ErrorMessage('finicio', 'pattern', 'El formato debe ser: dd/mm/aaaa, ej: 25/08/2022'),
  new ErrorMessage('ffin', 'required', 'Fecha Fin, requerida'),
  new ErrorMessage('ffin', 'pattern', 'El formato debe ser: dd/mm/aaaa, ej: 25/08/2022'),
  new ErrorMessage('hinicio', 'required', 'Hora Inicio, requerida'),
  new ErrorMessage('hinicio', 'pattern', 'El formato debe ser: hh:mm, ej: 15:05 '),
  new ErrorMessage('hfin', 'required', 'Hora Fin, requerida'),
  new ErrorMessage('hfin', 'pattern', 'El formato debe ser: hh:mm, ej: 15:05'),
  new ErrorMessage('motivo', 'required', 'Motivo, requerido'),

];