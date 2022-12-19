import express, { Router } from "express";
import homecontroller from "../controllers/homeController";
import usercontroller from "../controllers/userController";
import doctorController from "../controllers/doctorController";
import clinicController from '../controllers/clinicController';

let router = express.Router();

let initWebRouter = (app) => {

    router.get('/', homecontroller.getHomePage);
    router.get('/create-CRUD', homecontroller.getCRUD);
    router.post('/post-CRUD', homecontroller.postCRUD);
    router.get('/get-CRUD', homecontroller.displayCRUD);
    router.get('/edit-CRUD', homecontroller.getEditCRUD);
    router.post('/put-CRUD', homecontroller.putCRUD);
    router.get('/delete-CRUD', homecontroller.deleteCRUD);

    router.post('/api/login', usercontroller.handleLogin);
    router.get('/api/get-all-users', usercontroller.handleGetAllUsers);
    router.post('/api/create-new-user', usercontroller.handleCreateNewUser);
    router.put('/api/edit-user', usercontroller.handleEditUser);
    router.delete('/api/delete-user', usercontroller.handleDeleteUser);
    router.get('/api/allcode', usercontroller.getAllCode);

    router.get('/api/doctor-home', doctorController.getDoctorHome);
    router.get('/api/get-all-doctors', doctorController.getAllDoctors);
    router.post('/api/save-infor-doctor', doctorController.postInforDoctor);
    router.get('/api/get-detail-doctor-by-id', doctorController.getDetailDoctorById);
    router.post('/api/create-schedule', doctorController.createSchedule)

    // clinic
    router.post('/api/create-new-clinic', clinicController.createNewClinic);
    router.delete('/api/delete-clinic', clinicController.deleteClinic);
    router.put('/api/edit-clinic', clinicController.handleEditClinic);
    router.get('/api/get-clinic-by-id', clinicController.handleGetClinic);

    return app.use("/", router);
}

module.exports = initWebRouter;