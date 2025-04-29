import axios from 'axios';

export async function createUser(customerData){
    try{
        const response = await axios.post('api/cusomers', customerData);
        return response.data;
    }catch (error){
        console.error('Failed to create customer:', error);
        throw error;
    }
}