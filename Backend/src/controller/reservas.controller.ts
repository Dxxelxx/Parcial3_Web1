import { Request, Response } from "express";
import { clientes } from "./clientes.controller";
import { servicios } from "./servicios.controller";

let reservas: any[] = [];
let idCounter = 1;

// Obtener todas las reservas
export const getReservas = (req: Request, res: Response) => {
    res.json(reservas);
};

// Obtener reserva por ID
export const getReservaById = (req: Request, res: Response) => {
    const reserva = reservas.find(r => r.id === Number(req.params.id));
    if (!reserva) return res.status(404).json({ message: "Reserva no encontrada" });
    res.json(reserva);
};

// Crear reserva
export const createReserva = (req: Request, res: Response) => {
    const { clienteId, servicioId, fecha } = req.body;

    const cliente = clientes.find(c => c.id === clienteId);
    const servicio = servicios.find(s => s.id === servicioId);

    if (!cliente || !servicio) {
        return res.status(400).json({ message: "Cliente o servicio no existe" });
    }

    const nueva = {
        id: idCounter++,
        clienteId,
        servicioId,
        fecha,
        clienteNombre: cliente.nombre,
        servicioNombre: servicio.nombre,
        servicioPrecio: servicio.precio
    };

    reservas.push(nueva);
    res.status(201).json(nueva);
};

// Actualizar reserva
export const updateReserva = (req: Request, res: Response) => {
    const index = reservas.findIndex(r => r.id === Number(req.params.id));
    if (index === -1) return res.status(404).json({ message: "Reserva no encontrada" });

    reservas[index] = { ...reservas[index], ...req.body };
    res.json(reservas[index]);
};

// Eliminar reserva
export const deleteReserva = (req: Request, res: Response) => {
    const existe = reservas.some(r => r.id === Number(req.params.id));
    if (!existe) return res.status(404).json({ message: "Reserva no encontrada" });

    reservas = reservas.filter(r => r.id !== Number(req.params.id));
    res.json({ message: "Reserva eliminada" });
};
