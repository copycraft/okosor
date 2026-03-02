import express from 'express';
import { Pool } from 'pg';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
    host: 'okosordb.okosor.hu',
    port: 5432,
    user: 'okosor-db',
    password: 'ludwig-is-gay',
    database: 'okosor-db',
});

app.post('/contact', async (req, res) => {
    const { name, email, phone, message } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO contact_submissions (name,email,phone,message) VALUES ($1,$2,$3,$4) RETURNING id',
            [name, email, phone, message]
        );
        res.json({ success: true, id: result.rows[0].id });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Database insert failed' });
    }
});

app.listen(3000, () => console.log('Server running on port 3000'));