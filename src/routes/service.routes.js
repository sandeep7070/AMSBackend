import { Router } from "express";
import {
     createService,
      deleteService,
       getAllServices,
        getServiceById,
         updateService
         } from "../controller/service.controller.js";




const router = Router()

router.route("/create").post(createService);
router.route("/getAllServices").get(getAllServices)
router.route("/get/:id").get(getServiceById)
router.route("/update/:id").put(updateService)
router.route("/delete/:id").delete(deleteService)


export default router;