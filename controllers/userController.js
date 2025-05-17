const getUsers = async (req, reply) => {
    try {
        const [rows] = await req.server.mysql.query('SELECT * FROM users');
        reply.send(rows);
    } catch (error) {
        console.error('Error fetching users:', error);
        reply.status(500).send({ error: 'Internal Server Error' });
    }
};

const getUserById = async (req, reply) => {
    try {
        const { id } = req.params;
        const [rows] = await req.server.mysql.query('SELECT * FROM users WHERE id = ?', [id]);

        if (rows.length === 0) {
            return reply.status(404).send({ error: 'User not found' });
        }

        reply.send(rows[0]);
    } catch (error) {
        console.error('Error fetching user by ID:', error);
        reply.status(500).send({ error: 'Internal Server Error' });
    }
};

const createUser = async (req, reply) => {
    try {
        const { name, email } = req.body;

        if (!name || !email) {
            return reply.status(400).send({ error: 'Name and Email are required' });
        }

        const [result] = await req.server.mysql.query(
            'INSERT INTO users (name, email) VALUES (?, ?)',
            [name, email]
        );

        reply.code(201).send({ id: result.insertId, name, email });
    } catch (error) {
        console.error('Error creating user:', error);
        reply.status(500).send({ error: 'Internal Server Error' });
    }
};

const updateUser = async (req, reply) => {
    try {
        const { id } = req.params;
        const { name, email } = req.body;

        if (!name || !email) {
            return reply.status(400).send({ error: 'Name and Email are required' });
        }

        const [result] = await req.server.mysql.query(
            'UPDATE users SET name = ?, email = ? WHERE id = ?',
            [name, email, id]
        );

        if (result.affectedRows === 0) {
            return reply.status(404).send({ error: 'User not found' });
        }

        reply.send({ id, name, email });
    } catch (error) {
        console.error('Error updating user:', error);
        reply.status(500).send({ error: 'Internal Server Error' });
    }
};

const deleteUser = async (req, reply) => {
    try {
        const { id } = req.params;

        const [result] = await req.server.mysql.query(
            'DELETE FROM users WHERE id = ?',
            [id]
        );

        if (result.affectedRows === 0) {
            return reply.status(404).send({ error: 'User not found' });
        }

        reply.send({ message: 'User deleted successfully' });
    } catch (error) {
        console.error('Error deleting user:', error);
        reply.status(500).send({ error: 'Internal Server Error' });
    }
};

exports = { getUsers, getUserById, createUser, updateUser, deleteUser };