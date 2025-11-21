import { Router } from "express";
import * as clientesController from "../controller/clientes.controller";

const router = Router();

router.get("/", clientesController.getClientes);
router.get("/:id", clientesController.getClienteById);
router.post("/", clientesController.createCliente);
router.put("/:id", clientesController.updateCliente);
router.delete("/:id", clientesController.deleteCliente);

export default router;
