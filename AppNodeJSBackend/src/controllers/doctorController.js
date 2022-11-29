import doctorService from '../services/doctorService'

let getDoctorHome = async (req, res) => {
    let limit = req.query.limit;
    if (!limit) limit = 7;

    try {
        let response = await doctorService.getDoctorHome(+limit);
        return res.status(200).json(response)
    } catch (error) {
        console.log(error);
        return res.status(200).json({
            errCode: -1,
            message: 'Error from service ...'
        })
    }
}

let getAllDoctors = async (req, res) => {
    try {

        let doctors = await doctorService.getAllDoctors();
        return res.status(200).json(doctors)

    } catch (error) {
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server ...'
        })
    }
}

let postInforDoctor = async (req, res) => {
    try {
        let response = await doctorService.saveDetailInforDoctor(req.body);
        return res.status(200).json(response);

    } catch (error) {
        console.log(error)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server ...'
        })
    }
}

let getDetailDoctorById = async (req, res) => {
    try {
        let infor = await doctorService.getDetailDoctorById(req.query.id)
        return res.status(200).json(infor);
    } catch (error) {
        console.log(error);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server ...'
        })
    }
}

module.exports = {
    getDoctorHome: getDoctorHome,
    getAllDoctors: getAllDoctors,
    postInforDoctor: postInforDoctor,
    getDetailDoctorById: getDetailDoctorById,

}