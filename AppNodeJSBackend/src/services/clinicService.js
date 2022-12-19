import db from '../models/index';
require('dotenv').config();

let createNewClinic = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            await db.Clinic.create({
                name: data.name,
                address: data.address,
                phoneNumber: data.phoneNumber,
                description: data.description,
                image: data.image
            });
            resolve({
                data: data,
                errCode: 0,
                message: 'ok'
            });


        } catch (e) {
            reject(e)
        }
    })
}


let deleteClinic = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let clinic = await db.Clinic.findOne({
                where: { id: id }
            })

            if (clinic) {
                await db.Clinic.destroy({
                    where: { id: id }
                });
                resolve({
                    errCode: 0,
                    errMessage: 'Delete Clinic successfull!'
                })

            } else {
                resolve({
                    errCode: 2,
                    errMessage: 'Clinic does not exist!'
                })
            }

        } catch (error) {
            reject(error)
        }

    })
}

let updateClinicData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id) {
                resolve({
                    errCode: 2,
                    errMessage: 'Missing parameters!'
                })
            }

            let clinic = await db.Clinic.findOne({
                where: { id: data.id },
                raw: false
            })
            if (clinic) {
                clinic.name = data.name;
                clinic.address = data.address;
                clinic.phoneNumber = data.phoneNumber;
                clinic.description = data.description;

                await clinic.save();

                resolve({
                    errCode: 0,
                    message: 'Update successfull!'
                });
            } else {
                resolve({
                    errCode: 1,
                    message: 'Clinic not found!'
                });
            }

        } catch (e) {
            reject(e)
        }
    })
}

let getClinic = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let clinic = ''
            id = id.toUpperCase();
            if (id === 'ALL') {
                clinic = db.Clinic.findAll();
            }
            if (id && id !== 'ALL') {
                clinic = await db.Clinic.findOne({
                    where: { id: id }
                })
            }
            resolve(clinic)
        } catch (error) {
            reject(error)
        }
    })
}

module.exports = {
    createNewClinic,
    deleteClinic,
    updateClinicData,
    getClinic,
}