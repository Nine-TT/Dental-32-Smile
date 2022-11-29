
import bcrypt from 'bcryptjs';
// import { Promise } from 'sequelize';
import db from "../models/index";

const salt = bcrypt.genSaltSync(10);

let createNewUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {

            let hashPasswordFromBcrypt = await hashUserPassword(data.password);
            await db.User.create({
                email: data.email,
                passWord: hashPasswordFromBcrypt,
                firstName: data.firstName,
                lastName: data.lastName,
                address: data.address,
                phoneNumber: data.phoneNumber,
                gender: data.gender === '1' ? true : false,
                roleId: data.roleId
            });
            resolve({
                errCode: 0,
                message: 'ok'
            });
        } catch (e) {
            reject(e)
        }
    })
    
    console.log("data from sevice");
    console.log(data);
    console.log(hashPasswordFromBcrypt);
}

let hashUserPassword = (password) => {
    return new Promise ( async (resolve, reject) => {
        try {

            let hashPassword = await bcrypt.hashSync(password, salt);
           
            resolve(hashPassword);
            
        } catch (e) {
            reject(e);
        }


    })
}

let getAllUser = (id) => {
    return new Promise ( async (resolve, reject) => {
        try {
            let users = db.User.findAll({
                raw: true,
            });
            resolve(users);
            
        } catch (e) {
            reject(e);
        }
    } )
}

let getUserInfoById = (userId) => {
    return new Promise(async(resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: {id: userId},
                raw: true
            })

            if (user){
                resolve(user)
            }else {
                resolve({})
            }
            
        } catch (e) {
            reject(e)
        }
    })
}

let updateUserData = (data) => {
    return new Promise(async(resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: {id: data.id}
            })
            if(user) {
                user.firstName = data.firstName;
                user.lastName = data.lastName;
                user.address = data.address;

                await user.save();
                let allUser = db.User.findAll();
                resolve(allUser);
            } else {
                resolve();
            }
           
            
        } catch (e) {
            reject(e)
        }
    })
}

let deletUserById = (userId) => {
    return new Promise(async(resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: {id: userId }
            })

            if (user){
                user.destroy();
            }

            resolve();
            
        } catch (e) {
            reject(e)
        }
    })
}


module.exports = {
    createNewUser: createNewUser,
    getAllUser: getAllUser,
    hashUserPassword: hashUserPassword,
    getUserInfoById: getUserInfoById,
    updateUserData: updateUserData,
    deletUserById: deletUserById,
}