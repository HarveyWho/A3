const { Client } = require('pg');

const client = new Client({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: "micofat123",
    database: "postgres"
});

client.connect();

const getAllStudents = async () => {
    try {
        const res = await client.query('SELECT * FROM students');
        console.log(res.rows);
    } catch (err) {
        console.log(err.message);
    }
};

const addStudent = async (first_name, last_name, email, enrollment_date) => {
    const query = 'INSERT INTO students (first_name, last_name, email, enrollment_date) VALUES ($1, $2, $3, $4)';
    const values = [first_name, last_name, email, enrollment_date];

    try {
        const res = await client.query(query, values);
        console.log('Student added successfully:', res.rows);
    } catch (err) {
        console.log(err.message);
    }
};

const updateStudentEmail = async (student_id, new_email) => {
    const query = 'UPDATE students SET email = $2 WHERE student_id = $1';
    const values = [student_id, new_email];

    try {
        await client.query(query, values);
        console.log('Student email updated successfully');
    } catch (err) {
        console.log(err.message);
    }
};

const deleteStudent = async (student_id) => {
    const query = 'DELETE FROM students WHERE student_id = $1';
    const values = [student_id];

    try {
        await client.query(query, values);
        console.log('Student deleted successfully');
    } catch (err) {
        console.log(err.message);
    }
};

const runTests = async () => {
    await getAllStudents(); // Get original student table
    await deleteStudent(15);
    await getAllStudents(); // show results after deletion
    await addStudent('John', 'Doe', 'john.doe@example.com', '2023-09-01');
    await addStudent('Jim', 'Beam', 'jim.beam@example.com', '2023-09-02');
    await getAllStudents(); // Test add
    await updateStudentEmail(2, 'new.email@example.com');
    await getAllStudents(); // Test update
    client.end(); // Close the connection after all tests are done
};

runTests(); // Run the tests
