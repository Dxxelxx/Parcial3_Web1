import { Request, Response } from "express";

let servicios: any[] = [];
let idCounter = 1;

// Obtener servicios
export const getServicios = (req: Request, res: Response) => {
    res.json(servicios);
};

// Obtener servicio por ID
export const getServicioById = (req: Request, res: Response) => {
    const servicio = servicios.find(s => s.id === Number(req.params.id));
    if (!servicio) return res.status(404).json({ message: "Servicio no encontrado" });
    res.json(servicio);
};

// Crear servicio
export const createServicio = (req: Request, res: Response) => {
    const nuevo = { id: idCounter++, ...req.body };
    servicios.push(nuevo);
    res.status(201).json(nuevo);
};

// Actualizar servicio
export const updateServicio = (req: Request, res: Response) => {
    const index = servicios.findIndex(s => s.id === Number(req.params.id));
    if (index === -1) return res.status(404).json({ message: "Servicio no encontrado" });

    servicios[index] = { ...servicios[index], ...req.body };
    res.json(servicios[index]);
};

// Eliminar servicio
export const deleteServicio = (req: Request, res: Response) => {
    const existe = servicios.some(s => s.id === Number(req.params.id));
    if (!existe) return res.status(404).json({ message: "Servicio no encontrado" });

    servicios = servicios.filter(s => s.id !== Number(req.params.id));
    res.json({ message: "Servicio eliminado" });
};

// 👇 NECESARIO PARA IMPORTAR EN RESERVAS
export { servicios };
