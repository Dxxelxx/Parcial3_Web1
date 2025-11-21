import { Router } from "express";
import * as serviciosController from "../controller/servicios.controller";

const router = Router();

router.get("/", serviciosController.getServicios);
router.get("/:id", serviciosController.getServicioById);
router.post("/", serviciosController.createServicio);
router.put("/:id", serviciosController.updateServicio);
router.delete("/:id", serviciosController.deleteServicio);

export default router;
