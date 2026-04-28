
const express = require('express');
const router = express.Router();

module.exports = router;

const {getProductById, getRandomProducts} = require("../../public/js/getProducts");
const products = require("../data/products.json");
const categorias = require("../../public/js/categories");

// Página de un producto en particular
router.get('/:id', (req, res) => {
    const idDeLaUrl = req.params.id;
    const productoEncontrado = getProductById(idDeLaUrl);
    const randomProducts = getRandomProducts(products, 4);

    if (productoEncontrado) {
        res.render('pages/product', {
            product: productoEncontrado,
            products: products,
            randomProducts,
            categorias
        });
    } else {

        res.status(404).render('pages/productoNoEncontrado', {
            products: products,
            randomProducts,
            categorias
        });
    }
});



router.use((req, res) => {
  res.status(404).send("Página no encontrada");
});