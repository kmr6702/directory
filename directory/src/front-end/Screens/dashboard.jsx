import { Button, Table } from 'react-bootstrap';
import CreateUserForm from './addCustomer';
import { useState } from 'react';
import CustomerList from './CustomerList';
import axios from 'axios';

export default function Dashboard(){
    const[showAddModal, setShowAddModal] = useState(false);
    const [editCustomer, setEditCustomer] = useState(null);

    //Refresh the list of customers after adding a new customer 
    const handleModalClose = () => {
        setShowAddModal(false);
        //fetchCustomers();
    }

    const handleEdit = (customer) => {
        setEditCustomer(customer);
        setShowAddModal(true);
    }
    
    const handleDelete = async (id) => {
        try{
            await axios.delete(`/api/customer/${id}`);
            window.location.reload();
        }catch (error) {
            console.error('Delete filaed: ', error);
        }
    }
    return(
        <>
            <div className="d-flex justify-content-between align-itmes-center mb-3">
                <h1>Customer Directory</h1>
                <Button variant="primary" onClick={() => setShowAddModal(true)}>
                    Add Customer
                </Button>
            </div>
            
            <CustomerList onEdit={handleEdit} onDelete={handleDelete} />

            <CreateUserForm
                show={showAddModal}
                onClose={() => setShowAddModal(false)}
                existingData={editCustomer} //Autofill the form when modifying an existing customer
            />
        </>
    );
}