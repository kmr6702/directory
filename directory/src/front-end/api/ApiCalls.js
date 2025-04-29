import axios from 'axios';


//Add a new customer
export async function createCustomer(customerData){
    try{
        const response = await axios.post('/api/customers', customerData);
        return response.data;
    }catch (error){
        console.error('Failed to create customer:', error);
        throw error;
    }
}


//Get all customers
export async function getCustomer(){
    try{
        const response = await axios.get('/api/customers');
        return response.data;
    }catch (error){
        console.error('Failed to get customers: ', error);
        throw error;
    }
}

//Delete a customer
export async function deleteCustomer(id){
    try{
        const response = await axios.delete('/api/customer/${id}');
        return response.data;
    }catch (error){
        console.error('Failed to get customer: ', error);
        throw error;
    }
}

//modify a customer
export async function modifyCustomer(id, updatedData){
    try{
        const response = await axios.put('/api/customer/${id}', updatedData);
        return response.data;
    }catch (error){
        console.error('Failed to get customer: ', error);
        throw error; 
    }
}