import express from 'express';
import cors from 'cors';
import pg from 'pg';

const { Pool } = pg;
const app = express();
const port = 3001; 

//Database connection 
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'customerDirectory',
    password: 'FindingBigfoot2003',
    port: 5432,
});

app.use(cors());
app.use(express.json());

//Add Customer endpoint
app.post('/api/customers', async(req, res) => {
    const{
        customer_name,
        email,
        company_name,
        phone,
        profile_picture_url,
        contract_start_date,
        contract_end_date
    } = req.body;

    try{
        const result = await pool.query(
            `INSERT INTO customers (customer_name, email, company_name, phone, profile_picture_url, contract_start_date, contract_end_date) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
            [customer_name, email, company_name, phone, profile_picture_url, contract_start_date, contract_end_date]
        );
        res.status(201).json(result.rows[0]);
    }catch (error){
        console.error('Error inserting customer: ', error);
        res.status(500).json({ error: 'Internal Server Errror'});
    }
});

//Get all customers endpoint
app.get('/api/customers', async(req, res) => {
    try{
        const result = await pool.query('SELECT * FROM customers ORDER BY id');
        res.json(result.rows);
    }catch(err){
        console.error('Database query error:', err); // <-- Add this line
        res.status(500).json({error: 'Internal Server Error'});
    }
});

//Delete a customer endpoint 
app.delete('/api/customers/:id', async(req, res) => {
    const { id } = req.params;

    try{
        const result = await pool.query('DELETE FROM customers WHERE id = $1', [id]);
        res.status(204).send();
    }catch (err) {
        res.status(500).json({error: 'Inteneral Server Error'})
    }
});

app.put('/api/customers/:id', async(req, res) => {
    const { id } = req.params;
    console.log('ID', typeof id);
    const{
        customer_name,
        email,
        company_name,
        phone,
        profile_picture_url,
        contract_start_date,
        contract_end_date
    } = req.body;

    try{
        const result = await pool.query(
            `UPDATE customers SET customer_name = $1, email = $2, company_name = $3, phone = $4, profile_picture_url = $5, contract_start_date = $6, contract_end_date = $7 WHERE id = $8 RETURNING *`,
            [customer_name, email, company_name, phone, profile_picture_url, contract_start_date, contract_end_date, id]
        );
        res.json(result.rows[0]);
    }catch (err){
        res.status(500).json({ error: 'Internal Server Errror'});
    }
});


app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`)
})