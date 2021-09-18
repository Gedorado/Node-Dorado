import mongoose from "mongoose";
import {createRoles, createAdmin}  from './libs/initialSetup'

mongoose.connect("mongodb+srv://UPS:UPS2020@cluster0.cyt4q.mongodb.net/myFirstDatabase?retryWrites=true&w=majority").then(db=>{
    console.log('Db is connected');
    createRoles();
    createAdmin();
}).catch(error=> console.log(error))