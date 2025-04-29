import {Modal, Form, Col, Row, Button, FormControl } from 'react-bootstrap';
import { createCustomer } from '../api/ApiCalls.js';
import { modifyCustomer } from '../api/ApiCalls.js';
import { useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"
import { useEffect } from 'react';


export default function CreateCustomerForm({ show, onClose, existingData}){
    const [customerName, setCustomerName] = useState('');   //Stores Customer name
    const [email, setEmail] = useState('');     //Stores customer email
    const [companyName, setCompanyName] = useState('');     //Stores the company Name
    const [phone, setPhone] = useState('');     //Stores customer phone
    const [pfp, setPfp] = useState('');     //Stores customer profile picture
    const [startDate, setStartDate] = useState('');     //Stores customer start date
    const [endDate, setEndDate] = useState('');     //Stores customer end date

    //Sets up error handling for field validation
    const [errors, setErrors] = useState({customerName: '', email: '', companyName: '', phone: '', startDate: '', endDate: ''})

    const handleSubmit = async (e) => {
        e.preventDefault();

        const phoneRegex = /^\d{3}-\d{3}-\d{4}$/;   //Validate the format of the phone number
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;    //Validate the format of the email 

        //Validates the format of the phone number
        if(!phoneRegex.test(phone)){
            alert("Phone number must be formatted as xxx-xxx-xxxx")
            return;
        }

        //Validates the format of the email
        if(!emailRegex.test(email)){
            alert("Please enter a valid email address");
            return;
        }

        //Error handleing ro ensure the form has no empty inputs
        let newErrors = {customerName: '', email: '', companyName: '', phone: '', startDate: '', endDate: ''};
        if(!customerName) newErrors.customerName = 'Requried';
        if(!email) newErrors.email = 'Requried';
        if(!companyName) newErrors.companyName = 'Requried';
        if(!phone) newErrors.phone = 'Required';
        if(!startDate) newErrors.startDate = 'Required';
        if(!endDate) newErrors.endDate = 'Required';

        setErrors(newErrors);

        //Does not allow form submission if the form is not fully filled out
        const hasErrors = Object.values(newErrors).some(error => error);
        if(hasErrors) return; 

        //The data that needs to be sent to the backend
        const customerData = {
            customer_name: customerName,
            email,
            phone,
            company_name: companyName,
            profile_picture_url: pfp,
            contract_start_date: startDate,
            contract_end_date: endDate
        };

        //Creates a new customer in the database
        try{
            if(existingData){
                await modifyCustomer(existingData.id, customerData);
            }else{
                await createCustomer(customerData);
            }
        }catch (error){
            console.error("Error adding user:", error);
        }

        console.log('Company Name:', companyName); // Add this to debug

        onClose();
    };

    //Will autofill the form if modifying
    useEffect(() => {
        if(existingData){
            setCustomerName(existingData.customer_name || '');
            setEmail(existingData.email || '');
            setCompanyName(existingData.company_name || '');
            setPhone(existingData.phone || '');
            setPfp(existingData.profile_picture_url || '');
            setStartDate(existingData.contract_start_date ? new Date(existingData.contract_start_date) : '');
            setEndDate(existingData.contract_end_date ? new Date(existingData.contract_end_date) : '')
        }else{
            setCustomerName('');
            setEmail('');
            setCompanyName('');
            setPhone('');
            setPfp('');
            setStartDate('');
            setEndDate('');
        }
    }, [existingData]);

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
                            <Form.Control 
                                type='text'
                                value={customerName}
                                onChange={(e) => setCustomerName(e.target.value)}
                                isInvalid={!!errors.customerName}
                            >
                            </Form.Control>
                        </Col>
                    </Form.Group>

                    {/*Input for the email */}
                    <Form.Group as={Row}>
                        <Form.Label column md="2">
                            Email
                        </Form.Label>
                        <Col md="10">
                            <Form.Control
                                type="text"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                isInvalid={!!errors.email}
                            >
                            </Form.Control>
                        </Col>
                    </Form.Group>

                    {/*Input for the company name */}
                    <Form.Group as={Row}>
                        <Form.Label column md="2">
                            Company
                        </Form.Label>
                        <Col md="10">
                            <Form.Control
                                type="text"
                                value={companyName}
                                onChange={(e) => setCompanyName(e.target.value)}
                                isInvalid={!!errors.companyName}
                            >
                            </Form.Control>
                        </Col>
                    </Form.Group>

                    {/*Input for the phone */}
                    <Form.Group as={Row}>
                        <Form.Label column md="2">
                            Phone
                        </Form.Label>
                        <Col md="10">
                            <Form.Control
                                type="text"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                isInvalid={!!errors.phone}
                            >
                            </Form.Control>
                        </Col>
                    </Form.Group>

                    {/*Input for the pfp */}
                    <Form.Group as={Row}>
                        <Form.Label column md="2">
                            Profile Picture
                        </Form.Label>
                        <Col md="10">
                            <Form.Control
                                type="text"
                                value={pfp}
                                onChange={(e) => setPfp(e.target.value)}
                            >
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

                    <Button variant="primary" type="submit">Add</Button>
                </Form>
            </Modal.Body>

        </Modal>
    )
        
}