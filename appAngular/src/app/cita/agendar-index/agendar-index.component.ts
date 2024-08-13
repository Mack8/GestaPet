import {
  Component,
  enableProdMode,
  OnDestroy,
  OnInit,
  Pipe,
  PipeTransform,
} from '@angular/core';
import { GenericService } from '../../share/generic.service';
import { ActivatedRoute, Router } from '@angular/router';
import {
  NotificacionService,
  TipoMessage,
} from '../../share/notification.service';
import { Subject, takeUntil } from 'rxjs';
import { FormErrorMessage } from '../../form-error-message';
import { formatMessage, loadMessages, locale } from 'devextreme/localization';
import esMessages from 'devextreme/localization/messages/es.json';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import {
  DxSchedulerComponent,
  DxSchedulerTypes,
} from 'devextreme-angular/ui/scheduler';

@Pipe({ name: 'apply' })
export class ApplyPipe<TArgs, TReturn> implements PipeTransform {
  transform(func: (...args: TArgs[]) => TReturn, ...args: TArgs[]): TReturn {
    return func(...args);
  }
}

if (!/localhost/.test(document.location.host)) {
  enableProdMode();
}

@Component({
  selector: 'app-agendar-index',
  templateUrl: './agendar-index.component.html',
  styleUrl: './agendar-index.component.css',
})
export class AgendarIndexComponent implements OnInit, OnDestroy {
  servicios: any;
  selected = 0;
  clientes: any;
  destroy$: Subject<boolean> = new Subject<boolean>();
  sucursales: any;
  mascotas: any;
  currentDate: Date = new Date();
  appointments = [];
  formData: any;
  bloqueos = [];
  citas = [];
  estados: any;
  horarios = [];

  constructor(
    private gService: GenericService,
    private router: Router,
    private activeRouter: ActivatedRoute,
    private noti: NotificacionService
  ) {
    this.listServicios();
    this.listClientes();
    this.getSucursal();
    this.initMessages();
    this.getEstados();
    this.getAllMascotas();
    locale('es');
    console.log('🚀 ~ AgendarIndexComponent ~ currentDate:', this.currentDate);
  }

  ngOnInit(): void {}

  initMessages() {
    loadMessages(esMessages);
  }

  getBloqueos() {
    console.log(
      '🚀 ~ AgendarIndexComponent ~ getBloqueos ~ this.sucursales.id:',
      this.sucursales.id
    );
    this.gService
      .get('horario/sucursalTipo', this.sucursales.id + '/BLOQUEO')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        this.bloqueos = data;
      });
  }

  getHorarios() {
    console.log(
      '🚀 ~ AgendarIndexComponent ~ getBloqueos ~ this.sucursales.id:',
      this.sucursales.id
    );
    this.gService
      .get('horario/sucursalTipo', this.sucursales.id + '/SERVICIO')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        this.horarios = data;
        console.log(
          '🚀 ~ AgendarIndexComponent ~ .subscribe ~ this.horarios:',
          this.horarios
        );
      });
  }

  getSucursal() {
    this.gService
      .get('usuario', 2)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        this.sucursales = data.sucursal;
        console.log(
          '🚀 ~ AgendarIndexComponent ~ .subscribe ~ this.sucursales:',
          this.sucursales
        );
        this.getBloqueos();
        this.getCitas();
        this.getHorarios();
      });
  }

  listServicios() {
    this.gService
      .list('servicio/')
      .pipe(takeUntil(this.destroy$))
      .subscribe((respuesta: any) => {
        this.servicios = respuesta;
      });
  }

  listClientes() {
    this.gService
      .list('usuario/clientes')
      .pipe(takeUntil(this.destroy$))
      .subscribe((respuesta: any) => {
        this.clientes = respuesta;
      });
  }

  getMascota(
    clienteId: number
  ): Promise<Array<{ id: number; nombre: string }>> {
    return new Promise((resolve) => {
      setTimeout(() => {
        var cliente = this.clientes.filter((x) => x.id == clienteId);
        var mascotas = cliente[0].mascotas;
        resolve(mascotas);
      }, 1000);
    });
  }

  getAllMascotas() {
    this.gService
      .list('mascota')
      .pipe(takeUntil(this.destroy$))
      .subscribe((respuesta: any) => {
        this.mascotas = respuesta;
        console.log(
          '🚀 ~ AgendarIndexComponent ~ .subscribe ~ mascotas:',
          this.mascotas
        );
      });
  }

  getCitas() {
    this.gService
      .get('cita', this.sucursales.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe((respuesta: any) => {
        console.log(
          '🚀 ~ ReservaIndexComponent ~ .subscribe ~ respuesta:',
          respuesta
        );

        this.citas = this.renamePropertiesInArray(
          respuesta,
          {
            horaInicio: 'startDate',
            horaFin: 'endDate',
          },
          {
            start: 'shortDate',
            end: 'shortDate',
          }
        );
      });
  }

  getEstados() {
    this.gService
      .list('estadoCita/')
      .pipe(takeUntil(this.destroy$))
      .subscribe((respuesta: any) => {
        this.estados = respuesta;
      });
  }

  renamePropertiesInArray<T>(
    array: T[],
    propertyMap: { [oldProp: string]: string },
    dateProperties: { [newProp: string]: string } = {}
  ): T[] {
    return array.map((item) => {
      const newObject: any = { ...item };

      for (const [oldProp, newProp] of Object.entries(propertyMap)) {
        if (oldProp in newObject) {
          if (dateProperties[newProp]) {
            // Asegúrate de que la propiedad es una fecha
            const dateValue = newObject[oldProp];
            newObject[newProp] = new Date(dateValue); // Convertir a Date si es necesario

            // Formatea la fecha si es necesario
            if (dateProperties[newProp]) {
              newObject[newProp] = this.formatDate(
                newObject[newProp],
                dateProperties[newProp]
              );
            }
          } else {
            newObject[newProp] = newObject[oldProp];
          }
          delete newObject[oldProp];
        }
      }

      return newObject as T;
    });
  }

  isDisabledDateCell = (date: Date) => this.isDisableDate(date);

  isDisableDate = (date: Date) =>
    this.isBloqueo(date) || this.isHorario(date) || this.isCita(date);

  isBloqueo = (date: Date) => {
    var b = [];

    this.bloqueos.forEach((element) => {
      const normalizedDate1 = new Date(element.fechaInicio);
      const normalizedDate2 = new Date(element.fechaFin);
      const date1 = new Date(element.horaInicio);
      const date2 = new Date(element.horaFin);
      var isInRange = this.isDateTimeInRange(
        date,
        normalizedDate1,
        date1,
        normalizedDate2,
        date2
      );

      if (isInRange) {
        b.push(element);
      }
    });

    return b.length != 0;
  };

  isHorario = (date: Date) => {
    var b = [];

    this.horarios.forEach((element) => {
      const normalizedDate1 = new Date(element.fechaInicio);
      const normalizedDate2 = new Date(element.fechaFin);
      const date1 = new Date(element.horaInicio);
      const date2 = new Date(element.horaFin);
      var isInRange = this.isDateTimeInRange(
        date,
        normalizedDate1,
        date1,
        normalizedDate2,
        date2
      );

      if (!isInRange) {
        b.push(element);
      }
    });

    return b.length != 0;
  };

  isCita = (date: Date) => {
    var b = [];

    this.citas.forEach((element) => {
      const date1 = new Date(element.horaInicio);
      const date2 = new Date(element.horaFin);
      var isInRange = this.isDateTimeInRange2(date, date1, date2);

      if (isInRange) {
        b.push(element);
      }
    });

    return b.length != 0;
  };

  combineDateAndTime(date: Date, time: Date): Date {
    const hours = time.getHours();
    const minutes = time.getMinutes();
    const combinedDate = new Date(date);
    combinedDate.setHours(hours, minutes, 0, 0);

    return combinedDate;
  }

  isDateTimeInRange2(
    dateToCheck: Date,
    rangeStartDate: Date,
    rangeEndDate: Date
  ): boolean {
    const combinedDateToCheck = dateToCheck;
    const combinedRangeStart = rangeStartDate;
    const combinedRangeEnd = rangeEndDate;
    return (
      combinedDateToCheck >= combinedRangeStart &&
      combinedDateToCheck <= combinedRangeEnd
    );
  }

  isDateTimeInRange(
    dateToCheck: Date,
    rangeStartDate: Date,
    rangeStartTime: Date,
    rangeEndDate: Date,
    rangeEndTime: Date
  ): boolean {
    const combinedDateToCheck = dateToCheck;
    const combinedRangeStart = this.combineDateAndTime(
      rangeStartDate,
      rangeStartTime
    );
    const combinedRangeEnd = this.combineDateAndTime(
      rangeEndDate,
      rangeEndTime
    );
    return (
      combinedDateToCheck >= combinedRangeStart &&
      combinedDateToCheck <= combinedRangeEnd
    );
  }

  onAppointmentFormOpening = (
    data: DxSchedulerTypes.AppointmentFormOpeningEvent
  ) => {
    console.log('🚀 ~ AgendarIndexComponent ~ data:', data);

    const isValidAppointment = this.isValidAppointment(
      data.component,
      data.appointmentData
    );
    if (!isValidAppointment) {
      this.noti.mensajeTime(
        'Atención',
        'Horario no valido',
        3000,
        TipoMessage.warning
      );
      data.cancel = true;
      return;
    }

    var filteredNumbers = this.citas.filter(
      (x) => x.startDate == data.appointmentData.startDate && x.estadoId != 3
    );
    console.log(
      '🚀 ~ AgendarIndexComponent ~ filteredNumbers:',
      filteredNumbers
    );

    var idCita =
      data.appointmentData['id'] == undefined ? 0 : data.appointmentData['id'];

    if (
      this.currentDate > new Date(data.appointmentData.startDate) &&
      idCita != 0
    ) {
      this.noti.mensajeTime(
        'Atención',
        'No se puede editar la cita.',
        3000,
        TipoMessage.warning
      );
      data.cancel = true;
      return;
    }

    if (this.currentDate > new Date(data.appointmentData.startDate)) {
      this.noti.mensajeTime(
        'Atención',
        'Horario no valido',
        3000,
        TipoMessage.warning
      );
      data.cancel = true;
      return;
    }

    if (filteredNumbers.length != 0 && idCita == 0) {
      this.noti.mensajeTime(
        'Atención',
        'Horario no disponible.',
        3000,
        TipoMessage.warning
      );
      data.cancel = true;
      return;
    }

    const that = this;
    const form = data.form;
    const alergias =
      data.appointmentData['alergias'] == undefined
        ? 'No'
        : data.appointmentData['alergias'];

    const padecimientos =
      data.appointmentData['padecimientos'] == undefined
        ? 'No'
        : data.appointmentData['padecimientos'];

    const observaciones =
      data.appointmentData['observaciones'] == undefined
        ? ''
        : data.appointmentData['observaciones'];

    const estado =
      data.appointmentData['estadoId'] == undefined
        ? 1
        : data.appointmentData['estadoId'];

    this.formData = form;

    form.option('colCount', 2);

    form.option('items', [
      {
        label: {
          text: '  ',
        },
        dataField: 'id',
        editorType: 'dxTextBox',
        editorOptions: {
          value: idCita,
          readOnly: true,
          visible: false,
        },
        colSpan: 2,
      },
      {
        label: {
          text: '  ',
        },
        dataField: 'sucursalId',
        editorType: 'dxTextBox',
        editorOptions: {
          value: this.sucursales.id,
          readOnly: true,
          visible: false,
        },
        colSpan: 2,
      },
      {
        label: {
          text: 'Sucursal',
        },
        editorType: 'dxTextBox',
        editorOptions: {
          value: this.sucursales.nombre,
          readOnly: true,
        },
        colSpan: 2,
      },
      {
        label: {
          text: 'Cliente',
        },
        dataField: 'clienteId',
        editorType: 'dxSelectBox',
        colSpan: 2,
        editorOptions: {
          items: this.clientes,
          displayExpr: 'nombre',
          valueExpr: 'id',
          onValueChanged({ value }) {
            that.getMascota(value).then((mascotas) => {
              form.itemOption('mascotaId', 'editorOptions', {
                items: mascotas,
                displayExpr: 'nombre',
                valueExpr: 'id',
              });
            });
          },
        },
        validationRules: [{ type: 'required', message: 'Cliente, requerido.' }],
      },
      {
        label: {
          text: 'Mascota',
        },
        name: 'mascota',
        dataField: 'mascotaId',
        editorType: 'dxSelectBox',
        colSpan: 2,
        editorOptions: {
          items: this.mascotas,
          displayExpr: 'nombre',
          valueExpr: 'id',
        },
        validationRules: [{ type: 'required', message: 'Mascota, requerida.' }],
      },
      {
        label: {
          text: 'Servicio',
        },
        dataField: 'servicioId',
        editorType: 'dxSelectBox',
        colSpan: 2,
        editorOptions: {
          items: this.servicios,
          displayExpr: 'nombre',
          valueExpr: 'id',
        },
        validationRules: [
          { type: 'required', message: 'Servicio, requerido.' },
        ],
      },
      {
        label: {
          text: '¿Tiene algun padecimiento? ',
        },
        dataField: 'padecimientos',
        editorType: 'dxRadioGroup',
        colSpan: 1,
        editorOptions: {
          dataSource: ['No', 'Sí'],
          value: padecimientos,
        },
      },
      {
        label: {
          text: '¿Posee alguna alergía? ',
        },
        dataField: 'alergias',
        editorType: 'dxRadioGroup',
        colSpan: 1,
        editorOptions: {
          dataSource: ['No', 'Sí'],
          value: alergias,
        },
      },
      {
        label: {
          text: 'Observaciones',
        },
        dataField: 'observaciones',
        editorType: 'dxTextArea',
        colSpan: 2,
        editorOptions: {
          value: observaciones,
          require: true,
        },
        validationRules: [
          { type: 'required', message: 'Observaciones, requeridas.' },
        ],
      },
      {
        label: {
          text: 'Estado',
        },
        dataField: 'estadoId',
        editorType: 'dxSelectBox',
        colSpan: 2,
        editorOptions: {
          items: this.estados,
          displayExpr: 'nombreEstado',
          value: estado,
          valueExpr: 'id',
          readOnly: idCita == 0 ? true : false,
        },
        validationRules: [{ type: 'required', message: 'Estado, requerido.' }],
      },
    ]);
  };

  onAppointmentAdding = (e: DxSchedulerTypes.AppointmentAddingEvent) => {
    console.log('🚀 ~ AgendarIndexComponent ~ e:', e);

    const form = this.formData;
    if (form) {
      const formData = form.option('formData');
      console.log('Datos del formulario:', formData);
      var isValidAppointment = this.isValidAppointment(e.component, formData);
      if (!isValidAppointment) {
        e.cancel = true;
        this.noti.mensajeTime(
          'Atención',
          'Horario no disponible',
          3000,
          TipoMessage.warning
        );
        return;
      }

      this.guardarCita(formData);
      this.crearProforma(formData)
    }
  };

  onAppointmentUpdating = (e: DxSchedulerTypes.AppointmentUpdatingEvent) => {
    const isValidAppointment = this.isValidAppointment(e.component, e.newData);
    const form = this.formData;
    if (form) {
      const formData = form.option('formData');
      console.log('Datos del formulario:', formData);
      if (!isValidAppointment) {
        e.cancel = true;
        this.noti.mensajeTime(
          'Atención',
          'Horario no disponible',
          3000,
          TipoMessage.warning
        );
        return;
      }

      this.editarCita(formData);
    }
  };

  guardarCita(data) {
    this.gService
      .create('cita', data)
      .pipe(takeUntil(this.destroy$))
      .subscribe((respuesta: any) => {

      });

     
      this.getCitas();

    this.noti.mensajeTime(
      'Éxito',
      'Cita agendada con éxito.',
      3000,
      TipoMessage.success
    );
  }

  editarCita(data) {
    this.gService
      .update('cita', data)
      .pipe(takeUntil(this.destroy$))
      .subscribe((respuesta: any) => {
        this.getCitas();
      });

    this.noti.mensajeTime(
      'Éxito',
      'Cita modificada con éxito.',
      3000,
      TipoMessage.success
    );
  }

  crearProforma(cita) {
    console.log("🚀 ~ AgendarIndexComponent ~ crearProforma ~ cita:", cita)
    var servicio = this.servicios.filter(
      (x) => x.id ==  cita.servicioId );
    console.log("🚀 ~ AgendarIndexComponent ~ crearProforma ~ servicio:", servicio)
    var data = {
      clienteId: cita.clienteId,
      sucursalId: cita.sucursalId,
      subtotal: servicio[0].precio,
      impuestos: servicio[0].precio * 0.13, // Corrige 'impuesto' a 'impuestos' para que coincida
      total: servicio[0].precio * 1.13,
      estado: 'PROFORMA',
      detalles: [
          {
              servicioId: cita.servicioId,
              cantidad: 1,
              precio: servicio[0].precio,
              impuestoPorcentaje: 13,
              montoImpuesto: servicio[0].precio * 0.13,
              totalNeto: servicio[0].precio,
              totalBruto: servicio[0].precio * 1.13,
          }
      ]
  };
  
    console.log("🚀 ~ AgendarIndexComponent ~ crearProforma ~ data:", data)
    
    this.gService
      .create('factura', data)
      .pipe(takeUntil(this.destroy$))
      .subscribe((respuesta: any) => {
        console.log(
          '🚀 ~ HorarioDiagComponent ~ .subscribe ~ data:',
          respuesta
        );
  
      });
  }

  getServicioById = (id: number) =>
    this.servicios.find((servicio) => servicio.id === id);
  getEstadoById = (id: number) =>
    this.estados.find((estado) => estado.id === id);
  getClienteById = (id: number) =>
    this.clientes.find((cliente) => cliente.id === id);
  getMascotaById = (id: number) =>
    this.mascotas.find((mascota) => mascota.id === id);
  getCitaById = (id: number) => this.citas.find((cita) => cita.id === id);

  isValidAppointment = (
    component: DxSchedulerComponent['instance'],
    appointmentData: DxSchedulerTypes.Appointment
  ) => {
    const startDate = new Date(appointmentData.startDate);
    const endDate = new Date(appointmentData.endDate);
    const cellDuration = component.option('cellDuration');
    return this.isValidAppointmentInterval(startDate, endDate, cellDuration);
  };

  isValidAppointmentInterval = (
    startDate: Date,
    endDate: Date,
    cellDuration: number
  ) => {
    const edgeEndDate = new Date(endDate.getTime() - 1);

    if (!this.isValidAppointmentDate(edgeEndDate)) {
      return false;
    }

    const durationInMs = cellDuration * 60 * 1000;
    const date = startDate;
    while (date <= endDate) {
      if (!this.isValidAppointmentDate(date)) {
        return false;
      }
      const newDateTime = date.getTime() + durationInMs - 1;
      date.setTime(newDateTime);
    }

    return true;
  };

  isValidAppointmentDate = (date: Date) =>
    !this.isBloqueo(date) && !this.isHorario(date) && !this.isCita(date);

  formatDate(date: Date | string, format: string = 'shortDate'): string {
    // Aquí puedes utilizar un formateador de fecha como date-fns o moment.js
    // Por simplicidad, usaremos toLocaleDateString para este ejemplo
    const options: Intl.DateTimeFormatOptions = {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    };

    if (format === 'shortDate') {
      return new Date(date).toLocaleDateString(undefined, options);
    }

    return new Date(date).toLocaleDateString();
  }

  formateDateVisible(date) {
    date.setHours(date.getHours() - 6);
    var dia = date.getDate();
    var mes = date.getMonth() + 1;
    var anio = date.getFullYear();
    return (
      (dia < 10 ? '0' + dia : dia) +
      '/' +
      (mes < 10 ? '0' + mes : mes) +
      '/' +
      anio
    );
  }

  ngOnDestroy() {}
}
