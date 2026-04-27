const express = require('express');
const router = express.Router();

module.exports = router;

const cart = require('../../public/js/cart'); 
const { totalGeneral } = require('../../public/js/totalCart'); 


// Página del carrito de compras
router.get('/', (req, res) => {
    const totalActualizado = totalGeneral; 
    res.render('pages/cart', { cart, totalGeneral: totalActualizado });
});


// Ruta para SUMAR
router.post('/increase/:id', (req, res) => {
    const idProducto = parseInt(req.params.id);
    const producto = cart.find(item => item.id === idProducto);

    if (producto) {
        producto.cantidad += 1;
    }
    res.redirect('/cart'); 
});



// Ruta para RESTAR
router.post('/decrease/:id', (req, res) => {
    const idProducto = parseInt(req.params.id);
    const producto = cart.find(item => item.id === idProducto);

    if (producto && producto.cantidad > 1) {
        producto.cantidad -= 1;
    }
    res.redirect('/cart');
});


router.use((req, res) => {
  res.status(404).send("Página no encontrada");
});