import { Button } from 'react-bootstrap';
import createUserForm from './addCustomer';
import { useState } from 'react';

export default function Dashboard(){
    const[showAddModal, setShowAddModel] = useState(false);

    const onAddCustomer = () => {
        navigate('/create')
    };

    return(
        <>
            <div className="d-flex justify-content-between align-itmes-center mb-3">
                <h1>Customer Directory</h1>
                <Button variant="primary" onClick={() => setShowAddModel(true)}>
                    Add Customer
                </Button>

                <CreateUserForm
                    show={showAddModal}
                    onClose={() => setShowModal(false)}
                />
            </div>
        </>
    )
}