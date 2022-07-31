import knex from "knex"
// const knex = require('knex')
// const fs = require('fs')

class Chat{
    constructor(config, tableName){
        this.config = config,
        this.tableName = tableName
    }

    async postMessage(req){
        try {
            await knex(this.config)(this.tableName).insert(req)
            console.log("chat registrado!")
            knex(this.config).destroy()
        } catch (error) {
            console.log(`Ocurrio un error al guardar. El error fue: ${error}`)
            knex(this.config).destroy()
        }
    }

    async getAll(){
        try {
            const chatsFromDatabase = await knex(this.config).from(this.tableName).select('userEmail', 'message')
            knex(this.config).destroy()
            return chatsFromDatabase
        } catch (error) {
            console.log(`Ocurrio un error al guardar. El error fue: ${error}`)
            knex(this.config).destroy()
        }
    }
}

export default Chat