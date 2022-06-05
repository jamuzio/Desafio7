const {SQLiteCl} = require('../Controllers/DB/SQLliteClient')

class Mensajes {
    constructor (){
       
    }
    async init(){
        try{
            const exists = await SQLiteCl.schema.hasTable('Mensajes')
                if (!exists) {
                     await SQLiteCl.schema.createTable('Mensajes', tabla => {
                        tabla.increments('ID'),
                            tabla.string('DATE'),
                            tabla.integer('AUTOR'),
                            tabla.string('MENSAJE')
                    })
                    console.log('tabla "Mensajes" creada!')
                }
        }
        catch(error){
            console.log(`fallo la operacion: ${error.message}`)
        }
    }

    async save(autor, mensaje){
        if (emailRegex.test(autor)){  //verificamos que el campo se un amail con la Reg exp
            const newMsj = {
                DATE: `${Getdate()}`,
                AUTOR: autor,
                MENSAJE: mensaje
                }
            try{
                await SQLiteCl.insert(newMsj).into('Mensajes')
            }
            catch(error){
                console.log('Error al agregar un mensaje en la base')
                throw error
            }
        } else {
            const error = new Error('Mensaje sin autor')
            error.tipo = 'no autor data'
            throw error
        }
    }

    async getAll(){
        try{
            const Mensajes = await SQLiteCl.select('*').from('Mensajes')
            return Mensajes
        }
        catch(error){
            console.log('No se pudo leer la base de Mensajes')
            console.log(error)
        }
    }
}

function Getdate () {
    const hoy = new Date();
    const fecha = hoy.getDate() + '-' + ( hoy.getMonth() + 1 ) + '-' + hoy.getFullYear()
    const hora = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();
    return fecha + ' ' + hora
}

emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

module.exports = Mensajes