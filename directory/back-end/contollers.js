//GET       /customer       List all customer
//POST      /customer       Add new customer
//DELETE    /customer       Delete a customer

//PUT       /Customer       Modify a customer

const Customer = require('../models');

exports.getAllCustomers = async(req, res) => {
    try{
        const customers = await Customer.findAll();
        res.status(200).json(customers);
    }catch{
        console.error(error);
        res.status(500).json({message: 'Error fetching customers'});
    }
}

exports.createCustomer = async(req, res) => {
    try{
        const {customer_name, email, company_name, phone, profile_picture_url, contract_start_date, contract_expire_date} = req.bodys
    }catch{

    }
}

exports.deleteCustomer = async(req, res) => {
    try{

    }catch{

    }
}


exports.modifyCustomer = async(req, res) => {
    try{
        
    }catch{

    }
}