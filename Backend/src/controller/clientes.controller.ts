import { Request, Response } from "express";

let clientes: any[] = [];
let idCounter = 1;

// Obtener todos los clientes
export const getClientes = (req: Request, res: Response) => {
    res.json(clientes);
};

// Obtener cliente por ID
export const getClienteById = (req: Request, res: Response) => {
    const cliente = clientes.find(c => c.id === Number(req.params.id));
    if (!cliente) return res.status(404).json({ message: "Cliente no encontrado" });
    res.json(cliente);
};

// Crear cliente
export const createCliente = (req: Request, res: Response) => {
    const nuevo = { id: idCounter++, ...req.body };
    clientes.push(nuevo);
    res.status(201).json(nuevo);
};

// Actualizar cliente
export const updateCliente = (req: Request, res: Response) => {
    const index = clientes.findIndex(c => c.id === Number(req.params.id));
    if (index === -1) return res.status(404).json({ message: "Cliente no encontrado" });

    clientes[index] = { ...clientes[index], ...req.body };
    res.json(clientes[index]);
};

// Eliminar cliente
export const deleteCliente = (req: Request, res: Response) => {
    const existe = clientes.some(c => c.id === Number(req.params.id));
    if (!existe) return res.status(404).json({ message: "Cliente no encontrado" });

    clientes = clientes.filter(c => c.id !== Number(req.params.id));
    res.json({ message: "Cliente eliminado" });
};

// 👇 ESTE ES EL QUE NECESITAS PARA PODER IMPORTAR EN RESERVAS
export { clientes };
