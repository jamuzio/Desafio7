const crearKnex = require('knex') 



const SQLiteCl = crearKnex({
    client: 'sqlite3',
    connection: { filename: './DataBase/ecommerce.sqlite' },
    useNullAsDefault: true
})
module.exports = { SQLiteCl }
