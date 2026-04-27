
const express = require("express");
const port = 3000;

const app = express();
const path = require('path');
app.set('views', path.join(__dirname, 'src', 'views'));
app.set("view engine", "ejs");
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));


const categorias = require("./public/js/categories");
const products = require("./public/js/products");
const authRouter = require('./src/routes/auth.router');
const productRouter = require('./src/routes/product.router');
const cartRouter = require('./src/routes/cart.router');




//Página de pago
app.get('/checkout',
    (req, res) => res.render('pages/checkout')
);

app.get('/',  (req, res) => res.render('pages/index', { categorias, products }));
app.use("/auth", authRouter);
app.use("/products", productRouter);
app.use("/cart", cartRouter);

app.use((req, res) => {
    res.status(404).send("Página no encontrada");
});

app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`);
});