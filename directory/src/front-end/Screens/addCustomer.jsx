import {Modal, Form, Col, Row, Button, FormControl } from 'react-bootstrap';
import { createCustomer } from '../api/ApiCalls.js';
import { useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"


// customer_name VARCHAR(100),
//     email VARCHAR(100),
//     company_name VARCHAR(100),
//     phone VARCHAR(100),
//     profile_picture_url VARCHAR(100),
//     contract_start_date DATE,
//     contract_expire_date DATE

export default function CreateCustomerForm({ show, onClose}){
    const [customerName, setCustomerName] = useState('');   //Stores Customer name
    const [email, setEmail] = useState('');     //Stores customer email
    const [companyName, setCompanyName] = useState('');     //Stores the company Name
    const [phone, setPhone] = useState('');     //Stores customer phone
    const [pfp, setPfp] = useState(null);     //Stores customer profile picture
    const [startDate, setStartDate] = useState(null);     //Stores customer start date
    const [endDate, setEndDate] = useState('');     //Stores customer end date

    //Sets up error handling for field validation
    const [errors, setErrors] = useState({})
    //customerName: '', email: '', companyName: '', phone: '', pfp: '', startDate: '', endDate: ''

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newErrors = {};
        if(!customerName) newErrors.customerName = 'Requried';
        if(!email) newErrors.email = 'Requried';
        if(!companyName) newErrors.companyName = 'Requried';
        if(!phone) newErrors.phone = 'Required';

        const customerData = {
            customer_name: customerName,
            email,
            phone,
            profile_picture_url: pfp,
            contract_start_date: startDate,
            contract_end_date: endDate
        };

        try{
            await createCustomer(customerData);
            onClose();
        }catch (error){
            console.error("Error adding user:", error);
        }

        onClose();
    };
    return(
        <Modal show={show} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Add New Customer</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    {/*This is the input for the customer name */}
                    <Form.Group as={Row}>
                        <Form.Label column md="2">
                            Name
                        </Form.Label>
                        <Col md="10">
                            <Form.Control type='text'>
                                value={customerName}
                                onChange={(e) => setCustomerName(e.target.value)}
                                isInvalid={!!errors.customerName}
                            </Form.Control>
                        </Col>
                    </Form.Group>

                    {/*Input for the email */}
                    <Form.Group as={Row}>
                        <Form.Label column md="2">
                            Email
                        </Form.Label>
                        <Col md="10">
                            <Form.Control type='text'>
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                isInvalid={!!errors.email}
                            </Form.Control>
                        </Col>
                    </Form.Group>

                    {/*Input for the company name */}
                    <Form.Group as={Row}>
                        <Form.Label column md="2">
                            Company
                        </Form.Label>
                        <Col md="10">
                            <Form.Control type='text'>
                                value={companyName}
                                onChange={(e) => setCompanyName(e.target.value)}
                                isInvalid={!!errors.companyName}
                            </Form.Control>
                        </Col>
                    </Form.Group>

                    {/*Input for the phone */}
                    <Form.Group as={Row}>
                        <Form.Label column md="2">
                            Phone
                        </Form.Label>
                        <Col md="10">
                            <Form.Control type='text'>
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                isInvalid={!!errors.phone}
                            </Form.Control>
                        </Col>
                    </Form.Group>

                    {/*Input for the pfp */}
                    <Form.Group as={Row}>
                        <Form.Label column md="2">
                            Profile Picture
                        </Form.Label>
                        <Col md="10">
                            <Form.Control type='text'>
                                value={pfp}
                                onChange={(e) => setPfp(e.target.value)}
                                isInvalid={!!errors.pfp}
                            </Form.Control>
                        </Col>
                    </Form.Group>

                    {/*Input for the start */}
                    <Form.Group as={Row}>
                        <Form.Label column md="2">
                            Contract State Date
                        </Form.Label>
                        <Col md="10">
                            <DatePicker
                                selected={startDate}
                                onChange={(date) => setStartDate(date)}
                            />
                        </Col>
                    </Form.Group>

                    {/*Input for the end date */}
                    <Form.Group as={Row}>
                        <Form.Label column md="2">
                            Contract End Date
                        </Form.Label>
                        <Col md="10">
                            <DatePicker
                                selected={endDate}
                                onChange={(date) => setEndDate(date)}
                            />
                        </Col>
                    </Form.Group>


                </Form>
            </Modal.Body>

        </Modal>
    )
        
}