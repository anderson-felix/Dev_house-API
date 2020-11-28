import { Router } from "express";
import multer from "multer";

import DashboardController from "./controllers/DashboardController";
import SessionController from "./controllers/SessionController";
import HouseController from "./controllers/HouseController";
import uploadConfig from "./config/upload";
import ReserveController from "./controllers/ReserveController";

const routes = new Router();
const upload = multer(uploadConfig);

routes.post("/sessions", SessionController.store);
routes.post("/houses", upload.single("thumbnail"), HouseController.store);
routes.post("/houses/:house_id/reserve", ReserveController.store);

routes.get("/houses", HouseController.index);
routes.get("/dashboard", DashboardController.show);
routes.get("/reserves", ReserveController.index);

routes.put(
  "/houses/:house_id",
  upload.single("thumbnail"),
  HouseController.update
);

routes.delete("/houses", HouseController.destroy);
routes.delete("/reserves/cancel", ReserveController.destroy);

export default routes;
