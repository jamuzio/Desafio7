const {AdminMariaCl, UserMariaCl} = require('../Controllers/DB/MariaClient')

class Contenedor {
    constructor (){
    }
    async init(){
        try{
            const exists = await AdminMariaCl.schema.hasTable('Productos')
                if (!exists) {
                     await AdminMariaCl.schema.createTable('Productos', tabla => {
                        tabla.increments('ID'),
                            tabla.string('TITLE'),
                            tabla.integer('PRICE'),
                            tabla.string('THUMBNAIL')
                    })
                    console.log('tabla "Productos" creada!')
                } else {
                    this.Objects = await UserMariaCl.select('*').from('Productos')
                }
        }
        catch(error){
            console.log(`fallo la operacion: ${error.message}`)
        }
    }
    async save(title, price, thumbnail){
        try{
            const ProductoBuscado = await UserMariaCl.select('*').from('Productos').where({ TITLE: title })
            if (ProductoBuscado.length === 0){
                const newProd={
                    TITLE: title,
                    PRICE: price,
                    THUMBNAIL: thumbnail
                   }
                try{
                    await UserMariaCl.insert(newProd).into('Productos')
                    console.log('Se agrego el producto exitosamente!')
                }
                catch(error){
                    console.log('No se pudo agregar el producto a la base')
                    throw error
                }
            } else {
                console.log("Producto Duplicado")
                const error = new Error('Producto Duplicado.')
                error.tipo = 'duplicated product'
                throw error
            }
        }
        catch(error){
            console.log('No se pudo leer la base.')
            throw error
        }
    }

    async getById(id){
        try{
            const ProductoBuscado = await UserMariaCl.select('*').from('Productos').where({ ID: id })
            if (ProductoBuscado.length === 0) {
                const error = new Error('No existe el producto buscado.')
                error.tipo = 'db not found'
                throw error
            } else {
                return ProductoBuscado[0]
            }
        }
        catch(error){
            if(error.tipo === 'db not found'){
                throw error
            } else{
                console.log('No se pudo leer la base.')
                throw error
            }
          
        }
        
    }
    async getAll(){
        try{
            const Productos = await UserMariaCl.select('*').from('Productos')
            return Productos
        }
        catch(error){
            console.log('No se pudo leer la Base.')
            throw error
        }
    }
    async deleteById(id){
        try{
            const resultado = await UserMariaCl.delete().from('Productos').where({ ID: id })
            if(!resultado){
                const error = new Error('El producto no fue encotrado')
                error.tipo = 'db not found'
                throw error
            } else {
                console.log('El producto se a eliminado exitosamente!')
                }
        }
        catch(error){
            console.log('El producto no pudo ser eliminado. :(')
            throw error
        }
    }
    async UpdateProd(id, NewData){
        try{
            const resultado = await clienteSqlUser.update(NewData).from('Productos').where({ ID: id })
            if(!resultado){
                const error = new Error('El producto no fue encotrado')
                error.tipo = 'db not found'
                throw error
            }
        }
        catch(error){
            console.log('El producto no pudo ser Actualizado.')
            throw error
        }
    }

}

module.exports = Contenedor
