import db from '../models/index';
import bcrypt from 'bcryptjs';
import { promise, reject } from 'bcrypt/promises';

const salt = bcrypt.genSaltSync(10);

let hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {

            let hashPassword = await bcrypt.hashSync(password, salt);

            resolve(hashPassword);

        } catch (e) {
            reject(e);
        }


    })
}



let handleUserLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {};
            let isExist = await checkUserEmail(email);
            if (isExist) {
                //user already exist
                let user = await db.User.findOne({
                    attributes: ['email', 'roleId', 'password', 'firstName', 'lastName'],
                    where: { email: email },
                    raw: true,

                });
                if (user) {
                    //compare password: dùng cách 1 hay cách 2 đều chạy đúng cả =))
                    // Cách 1: dùng asynchronous (bất đồng bộ)
                    let check = await bcrypt.compare(password, user.password);

                    // Cách 2: dùng synchronous  (đồng bộ)
                    // let check = bcrypt.compareSync(password, user.password);

                    if (check) {
                        userData.errCode = 0;
                        userData.errMessage = 'OK!';

                        delete user.password;
                        userData.user = user;
                    }
                    else {
                        userData.errCode = 3;
                        userData.errMessage = 'Wrong password!';
                    }
                } else {
                    userData.errCode = 2;
                    userData.errMessage = `User not found!`;

                }

            } else {
                //return error
                userData.errCode = 1;
                userData.errMessage = `Your's Email isn't exist in our system, please try other email!`
            }
            resolve(userData)
        } catch (e) {
            reject(e);
        }
    })
}

let checkUserEmail = (userEmail) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { email: userEmail }
            })
            if (user) {
                resolve(true)
            } else {
                resolve(false)
            }

        } catch (e) {
            reject(e)
        }
    })
}


let getAllUsers = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = ''
            if (userId === 'ALL') {
                users = db.User.findAll({
                    attributes: {
                        exclude: ['passWord']
                    }
                })
            }
            if (userId && userId !== 'ALL') {
                users = await db.User.findOne({
                    where: { id: userId },
                    attributes: {
                        exclude: ['passWord']
                    }
                })
            }

            resolve(users)
        } catch (error) {
            reject(error)
        }
    })
}

let createNewUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {

            // check email ===
            let check = await checkUserEmail(data.email);
            if (check === true) {
                resolve({
                    errCode: 1,
                    errMessage: 'Email already exists - please use another email!'
                })

            } else {

                let hashPasswordFromBcrypt = await hashUserPassword(data.passWord);

                await db.User.create({
                    email: data.email,
                    passWord: hashPasswordFromBcrypt,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    birthDay: data.birthDay,
                    address: data.address,
                    phoneNumber: data.phoneNumber,
                    gender: data.gender,
                    roleId: data.roleId,
                    positionId: data.positionId,
                    image: data.avatar
                });
                resolve({
                    errCode: 0,
                    errMessage: 'ok'
                })
            }

        } catch (error) {
            reject(error)
        }
    })
}


let deleteUser = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: userId }
            })

            if (user) {
                await db.User.destroy({
                    where: { id: userId }
                });
                resolve({
                    errCode: 0,
                    errMessage: 'Delete user successfull!'
                })

            } else {
                resolve({
                    errCode: 2,
                    errMessage: 'User does not exist!'
                })
            }

        } catch (error) {
            reject(error)
        }

    })
}


let updateUserData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id || !data.roleId || !data.positionId || !data.gender) {
                resolve({
                    errCode: 2,
                    errMessage: 'Missing required parameters!'
                })
            }

            let user = await db.User.findOne({
                where: { id: data.id },
                raw: false
            })
            if (user) {
                user.email = data.email
                user.firstName = data.firstName;
                user.lastName = data.lastName;
                user.phoneNumber = data.phoneNumber;
                user.birthDay = data.birthDay;
                user.address = data.address;
                user.gender = data.gender;
                user.positionId = data.positionId;
                user.roleId = data.roleId;
                user.image = data.avatar

                await user.save();

                resolve({
                    errCode: 0,
                    message: 'Update successfull!'
                });
            } else {
                resolve({
                    errCode: 1,
                    message: 'User not found!'
                });
            }

        } catch (e) {
            reject(e)
        }
    })
}

let getAllCodeService = (typeInput) => {
    return new Promise(async (resolve, reject) => {
        try {

            if (!typeInput) {
                resolve({
                    errCode: 1,
                    errMessage: 'missing required parameters!'
                })
            } else {
                let res = {}
                let allcode = await db.Allcode.findAll({
                    attributes: { exclude: ["createdAt", "updatedAt"] },
                    where: { type: typeInput }
                })
                res.errCode = 0;
                res.data = allcode;
                resolve(res)
            }

        } catch (error) {

            reject(error)
        }
    })
}

module.exports = {
    handleUserLogin: handleUserLogin,
    getAllUsers: getAllUsers,
    createNewUser: createNewUser,
    deleteUser: deleteUser,
    updateUserData: updateUserData,
    getAllCodeService: getAllCodeService,
}