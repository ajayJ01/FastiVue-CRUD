exports.getUsers = async (req, reply) => {
const [rows] = await req.server.mysql.query('SELECT * FROM users')
reply.send(rows)
}

exports.getUserById = async (req, reply) => {
    const { id } = req.params;
    const [rows] = await req.server.mysql.query('SELECT * FROM users where id = ?', [id])
    reply.send(rows)
}

exports.createUser = async (req, reply) => {
const { name, email } = req.body
const [result] = await req.server.mysql.query(
    'INSERT INTO users (name, email) VALUES (?, ?)',
    [name, email]
)
reply.code(201).send({ id: result.insertId, name, email })
}

exports.updateUser = async (req, reply) => {
const { id } = req.params
const { name, email } = req.body
await req.server.mysql.query(
    'UPDATE users SET name = ?, email = ? WHERE id = ?',
    [name, email, id]
)
reply.send({ id, name, email })
}

exports.deleteUser = async (req, reply) => {
const { id } = req.params
await req.server.mysql.query('DELETE FROM users WHERE id = ?', [id])
reply.send({ message: 'User deleted' })
}
