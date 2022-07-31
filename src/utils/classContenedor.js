import knex from 'knex'
// const knex = require('knex')
// const fs = require('fs')


//test push
class Contenedor{
    constructor(config, tableName){
        this.config = config,
        this.tableName = tableName
    }

    //metodo post:
    async postProduct(req){
        try {
            await knex(this.config)(this.tableName).insert(req)
            console.log("Producto agregado a la db!")
            knex(this.config).destroy()
        } catch (error) {
            console.log(`Ocurrio un error al guardar. El error fue: ${error}`)
            knex(this.config).destroy()
        }

        // try{
        //     let products = await fs.promises.readFile(this.nombreArchivo, 'utf-8')
        //     let parseProducts = await JSON.parse(products)

        //     let id = parseProducts.length + 1
        //     let { title, price, thumbnail } = req
            
        //     const newProduct = {
        //         "title":title,
        //         "price":price,
        //         "thumbnail":thumbnail,
        //         "id":id
        //     }

        //     parseProducts.push(newProduct)
        //     await fs.promises.writeFile(`./${this.nombreArchivo}`, JSON.stringify(parseProducts, null, "\t"))
            
            
        // } catch(error) {
        //     console.log(`Ocurrio un error al guardar. El error fue: ${error}`)
        // }
    }

    async getById(req){
        // try{
        //     let { id } = req.params
        //     let productos = await fs.promises.readFile(this.nombreArchivo, 'utf-8')
        //     let parseProducts = await JSON.parse(productos)
        //     let searchId = parseProducts.find(element => element.id == id)

        //     if(searchId){
        //         return searchId
        //     } else {
        //         return {error: `Producto con id ${id} no encontrado`}
        //     }
        // }catch (error){
        //     console.log(`Ocurrio un error al leer archivo. El error fue: ${error}`)
        // }
    }

    async getAll(){
        try {
            const prodcutsFromDatabase = await knex(this.config).from(this.tableName).select('*')
            knex(this.config).destroy()
            return prodcutsFromDatabase

        } catch (error) {
            console.log(`Ocurrio un error al leer archivo. El error fue: ${error}`)
            knex(this.config).destroy()
        }
    }

    async deleteById(req){
        // try {
        //     let { id } = req.params

        //     let productos = await fs.promises.readFile(`./${this.nombreArchivo}`, "utf-8")
        //     let parseProducts = JSON.parse(productos)
        //     const filterProducts = parseProducts.filter(element => element.id != id)
            
        //     await fs.promises.unlink(`./${this.nombreArchivo}`)
        //     await fs.promises.writeFile(`./${this.nombreArchivo}`, JSON.stringify(filterProducts, null, "\t"))
            
        //     return `El nuevo stock es:`, filterProducts
        // } catch (error) {
        //     console.log(`Ocurrio un error al leer archivo. El error fue: ${error}`)
        // }
    }

    async modifyById(req){
        // try {
        //     let products = await fs.promises.readFile(this.nombreArchivo, 'utf-8')
        //     let parseProducts = await JSON.parse(products)
        //     let { id } = req.params
        //     let { title, price, thumbnail } = req.body

        //     const filterProducts = parseProducts.map((element) =>{
        //         if(element.id == id){
        //            return {
        //             title: title,
        //             price:price,
        //             thumbnail:thumbnail,
        //             id: element.id
        //            }
        //         } else {
        //             return element
        //         }
        //     })

        //     await fs.promises.writeFile(`./${this.nombreArchivo}`, JSON.stringify(filterProducts, null, "\t"))

        //     return filterProducts

        // } catch (error) {
        //     console.log(`Ocurrio un error al leer archivo. El error fue: ${error}`)
        // }
    }

    async deleteAll(){
        // try {
        //     await fs.promises.unlink(`./${this.nombreArchivo}`)

        //     products = []
        //     await fs.promises.writeFile(`./${this.nombreArchivo}`, JSON.stringify(products, null, "\t"))
        //     console.log("Productos eliminados: ", products)
        // } catch (error) {
        //     console.log(`Ocurrio un error al eliminar archivo. El error fue: ${error}`)
        // }
    }
}

export default Contenedor