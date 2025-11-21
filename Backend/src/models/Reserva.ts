export interface Reserva {
    id: number;
    clienteId: number;
    servicioId: number;
    fecha: string;
    hora: string;
    estado: string;
}

export interface Cliente {
    id: number;
    nombre: string;
    telefono: string;
}

export interface Servicio {
    id: number;
    nombre: string;
    precio: number;
}

