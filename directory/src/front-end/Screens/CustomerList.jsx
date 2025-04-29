import { useEffect, useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import axios from 'axios';

export default function CustomerList({ onEdit, onDelete }){
    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        fetchCustomers();
    }, []);

    //Get all customers from the database
    const fetchCustomers = async () => {
        try{
            const response = await axios.get('/api/customers');
            setCustomers(response.data);
        } catch (error){
            console.error('Failed to fetch customers: ', error);
        }
    };

    return(
        <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Company</th>
                            <th>Phone</th>
                            <th>Contract Start</th>
                            <th>Contract End</th>
                        </tr>
                    </thead>

                    <tbody>
                        {customers.map(customer => (
                            <tr key={customer.id}>
                                <td>{customer.customer_name}</td>
                                <td>{customer.email}</td>
                                <td>{customer.company_name}</td>
                                <td>{customer.phone}</td>
                                <td>{new Date(customer.contract_start_date).toLocaleDateString()}</td>
                                <td>{new Date(customer.contract_end_date).toLocaleDateString()}</td>
                                <td>
                                    <Button
                                        varient="warning"
                                        size="sm"
                                        className="me-2"
                                        onClick={() => onEdit(customer)}
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        varient="danger"
                                        size="sm"
                                        onClick={() => onDelete(customer.id)}
                                    >
                                        Delete
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
    );

}