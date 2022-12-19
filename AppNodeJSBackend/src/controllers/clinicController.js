import clinicService from '../services/clinicService'

let createNewClinic = async (req, res) => {
    try {
        let clinic = await clinicService.createNewClinic(req.body);
        return res.status(200).json(clinic);
    } catch (error) {
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server ...'
        })
    }
}

let handleGetClinic = async (req, res) => {
    let id = req.body.id;

    if (!id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing required!',
            clinic: []
        })
    }

    let clinic = await clinicService.getClinic(id);
    return res.status(200).json({
        errCode: 0,
        errMessage: 'OK',
        clinic
    })
}


let deleteClinic = async (req, res) => {
    if (!req.body.id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing ID!'
        })
    }

    let message = await clinicService.deleteClinic(req.body.id);
    return res.status(200).json(message);
}


let handleEditClinic = async (req, res) => {
    let data = req.body;
    let message = await clinicService.updateClinicData(data);
    return res.status(200).json(message)
}



module.exports = {
    createNewClinic,
    deleteClinic,
    handleEditClinic,
    handleGetClinic,
}