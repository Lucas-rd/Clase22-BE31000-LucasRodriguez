import { faker } from "@faker-js/faker"


// {
//     id: 9,
//     title: 'Mazo comnader 7',
//     price: '700',
//     thumbnail: 'https://http2.mlstatic.com/D_NQ_NP_884953-MLA46320439927_062021-W.jpg'
//   }

const randomProductsFaker = []

for (let i = 1; i <= 5; i++){
    randomProductsFaker.push({
        id: faker.random.numeric(),
        title: faker.commerce.product(),
        price: faker.commerce.price(),
        thumbnail: faker.image.imageUrl()
    })
}

const productsTest = async (req, res) => {

    res.render('plantilla.ejs', { randomProductsFaker })
}

export { productsTest }