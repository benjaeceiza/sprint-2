
const express = require("express");
const session = require('express-session');
const port = 3000;

const app = express();
const path = require('path');
app.set("view engine", "ejs");
app.set('views', path.join(__dirname, 'src', 'views'));
app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));


const categorias = require("./public/js/categories");
const products = require("./src/data/products.json");
const authRouter = require('./src/routes/auth.router');
const productRouter = require('./src/routes/product.router');
const cartRouter = require('./src/routes/cart.router');


app.use(session({
    secret: 'clave_123',
    resave: false,
    saveUninitialized: false,
}));

app.use((req, res, next) => {
    res.locals.session = req.session;
    next();
});


//Página de pago
app.get('/checkout',
    (req, res) => res.render('pages/checkout')
);

app.get('/', (req, res) => res.render('pages/index', { categorias, products }));

app.get("/categories/:category", (req,res) => {

    const {category} = req.params;

    res.render("pages/categoriesFiltred",{products,category,categorias})
})

app.use("/auth", authRouter);
app.use("/products", productRouter);
app.use("/cart", cartRouter);


app.use((req, res) => {
    res.status(404).send("Página no encontrada");
});

app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`);
});