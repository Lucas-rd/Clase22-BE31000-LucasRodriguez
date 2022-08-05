import express from 'express'
import routes from './router/index.js'
import { normalize, schema, denormalize } from "normalizr";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';
import { Server } from 'socket.io'
import Contenedor from './utils/classContenedor.js'
import Chat from './utils/classChat.js'
import { chatDAO } from './DAO/chatDAO.js';
import { normalizedMessages } from './utils/normalize.js';


const app = express()
const expressServer = app.listen(8080, () => console.log('Server escuchando en el puerto 8080'))
const io = new Server(expressServer)


const __dirname = dirname(fileURLToPath(import.meta.url))
app.use(express.static(path.join(__dirname,'../public')));

app.set('views', path.join(__dirname, './views'))
app.set('view engine', 'ejs')

//Objeto de configuracion mysql
const mysqlConfig = {
    client: "mysql",
    connection: {
        host: "127.0.0.1",
        user: "root",
        password: "",
        database: "mibase",
    },
    pool: {min: 0, max: 7}
}

//Objeto de configuracion sqlite3
const sqlite3Config = {
    client: "sqlite3",
    connection: { filename: './src/database/chatdb.sqlite' },
    useNullAsDefault: true
}

const contenedor = new Contenedor(mysqlConfig, 'products')
const chat = new Chat(sqlite3Config, 'chat')

//Aca vienen las interacciones de io: servidor<-->cliente
io.on('connection', async socket =>  {
    console.log(`Se conecto el cliente con id: ${socket.id}`)
    socket.emit('server:products', await contenedor.getAll())

    //recibo los mensajes de la base altasMongo y los guardo en una variable, normalizo y envio al socket
    const messagesFromMongo = await chatDAO.getAll()
    const normalizedChat = normalizedMessages(messagesFromMongo)

    //Envio mensajes normalizados al front
    socket.emit('server:mensajes', normalizedChat)

    //Evento de carga de nuevo producto
    socket.on('client:newProduct', async (newProductInfo) => {
        await contenedor.postProduct(newProductInfo)
        io.emit('server:products', await contenedor.getAll())
    })
    
    //Evento de nuevo mensaje
    socket.on('client:message', async (messageInfo) => {
        await chatDAO.postMessage(messageInfo)

        //recibo los mensajes de la base altasMongo y los guardo en una variable, normalizo y envio al socket
        const messagesFromMongo = await chatDAO.getAll()
        const normalizedChat = normalizedMessages(messagesFromMongo)
        io.emit('server:mensajes', normalizedChat)
    })
})

app.use('/api', routes)
