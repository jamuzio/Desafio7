const crearKnex = require('knex') 


// usuario root
const adminDbConfig = {
    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    password: 'mysqlpassword',
    database: 'coderhouse'
}

// usuario coder 
const userDbConfig = {
    host: '127.0.0.1',
    port: 3306,
    user: 'lectorch',
    password: 'Lectorch123!',
    database: 'coderhouse'
}

const AdminMariaCl = crearKnex({
    client: 'mysql2',
    connection: adminDbConfig
})

const UserMariaCl = crearKnex( {
    client: 'mysql2',
    connection: userDbConfig
})
module.exports = {
    AdminMariaCl,
    UserMariaCl
}