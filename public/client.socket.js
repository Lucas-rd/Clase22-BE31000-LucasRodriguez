const socket = io()
//Obtenemos fecha del servidor
let date = new Date()

//Capturamos elementos del catalogo del DOM:
const newProductForm = document.getElementById('newProductForm')
const titleInput = document.getElementById('titleInput')
const priceInput = document.getElementById('priceInput')
const thumbnailInput = document.getElementById('thumbnailInput')

//capturamos elementos del chat del DOM:
const messageForm = document.getElementById('messageForm')
const emailInput = document.getElementById('emailInput')
const messageInput = document.getElementById('messageInput')
const messagesPool = document.getElementById('messagesPool')

//Logica del lado del cliente para leer stock y mostrarlo
const renderProducts = async (products) => {
    const response = await fetch('plantilla.ejs')
    const plantilla = await response.text()

    const html = ejs.render(plantilla, {products})
    document.getElementById('productos').innerHTML = html
}

socket.on('server:products', products => {
    renderProducts(products)
})

const submitNewProductHandler = (event) => {
    event.preventDefault()
    const newProductInfo = {title: titleInput.value, price: priceInput.value, thumbnail: thumbnailInput.value}
    sendNewProduct(newProductInfo)   
}

const sendNewProduct = (newProductInfo) =>{
    socket.emit('client:newProduct', newProductInfo)
}

//Logica del lado del cliente para leer chat:
const sendMessage = (messageInfo) => {
    socket.emit('client:message', messageInfo)
}

const renderMessage = (messageInfo) => {
    const html = messageInfo.map( msgInfo => {
        return(`<div>
                    <strong style="color: blue">${msgInfo.userEmail}</strong>
                    <em style="color:green">${msgInfo.message}</em>    
            </div>`)
    }).join(" ")
    messagesPool.innerHTML = html
}

const submitChatHandler = (event) => {
    event.preventDefault()

    let fyh = date.getDate() + '/'+ (date.getMonth()+1) + '/'+ date.getFullYear() + ' ' +date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()
    const messageInfo = { userEmail: emailInput.value+" "+`[${fyh}]`, message: messageInput.value }

    sendMessage(messageInfo)
}

socket.on('server:mensajes', renderMessage)

messageForm.addEventListener('submit', submitChatHandler)
newProductForm.addEventListener('submit', submitNewProductHandler)