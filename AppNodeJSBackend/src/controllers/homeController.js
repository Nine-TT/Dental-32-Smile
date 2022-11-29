import express from "express";
import db from "../models/index";
import CRUDservice from "../services/CRUDservice";

let getHomePage = async (req, res) => {
    try {
        let data = await db.User.findAll();
        console.log('---------------');
        console.log(data);
        return res.render('homepage.ejs', {
            data: JSON.stringify(data)
        });
    } catch (e) {
        console.log(e);
    }
    
}


let getCRUD = (req, res) => {
    res.render('getCrud.ejs');
}

let postCRUD = async (req, res) => {
    let message = await CRUDservice.createNewUser(req.body);
    console.log(message);
    return res.send('post crud fr sv');
}

let displayCRUD = async (req, res) => {
    let data = await CRUDservice.getAllUser();

    return res.render('displayCrud.ejs', {
        dataTable: data
    });
}

let getEditCRUD = async (req, res) => {
    let userId =  req.query.id;
    if (userId) {
        let userData = await CRUDservice.getUserInfoById(userId)
        // check user data not found


        return res.render('editCrud.ejs', {
            user: userData
        });
        
    } else {
        return res.send('User not found!');
    }
    
}

let putCRUD = async (req, res) => {
    let data = req.body;
    let allUser =  await CRUDservice.updateUserData(data);
    return res.render('displayCrud.ejs', {
        dataTable: allUser
    });

}

let deleteCRUD = async (req, res) => {
    let id = req.query.id;
    if (id){
        await CRUDservice.deletUserById(id);
        return res.send('Delete user success!');
    } else {
        return res.send('User not found!');
    }
}


module.exports = {
    getHomePage: getHomePage,
    getCRUD: getCRUD,
    postCRUD: postCRUD,
    displayCRUD: displayCRUD,
    getEditCRUD: getEditCRUD,
    putCRUD: putCRUD,
    deleteCRUD: deleteCRUD,
}