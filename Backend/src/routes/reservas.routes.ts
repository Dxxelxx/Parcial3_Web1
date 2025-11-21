import { Router } from "express";
import * as reservasController from "../controller/reservas.controller";

const router = Router();

router.get("/", reservasController.getReservas);
router.get("/:id", reservasController.getReservaById);
router.post("/", reservasController.createReserva);
router.put("/:id", reservasController.updateReserva);
router.delete("/:id", reservasController.deleteReserva);

export default router;
