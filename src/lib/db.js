import { Pool } from 'pg';

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "CPEN SES",
    password: "edize15636"
});

//export default pool;

export default pool;
