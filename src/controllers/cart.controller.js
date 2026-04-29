const productos = require("../data/products.json")


//AGREGAR UN PRODUCTO
const agregarProducto = (req, res) => {


    const { productId, quantity } = req.body;


    if (!req.session.cart) req.session.cart = [];

    // 3. Buscamos si el producto ya estaba agregado antes
    const indice = req.session.cart.findIndex(p => p.productId === productId);

    if (indice !== -1) {
        // Si ya estaba, le sumamos 1 más a la cantidad
        req.session.cart[indice].quantity += parseInt(quantity);
    } else {
        // Si es la primera vez, lo pusheamos guardando SOLO lo que pide el TP
        req.session.cart.push({
            productId: productId,
            quantity: parseInt(quantity)
        });
    }


    res.redirect('/cart');
}


//MODIFICAR CANTIDAD
const sumarCantidad = (req, res) => {
    const productId = req.params.id;
    if (!req.session.cart) return res.redirect('/cart');

    const indice = req.session.cart.findIndex(p => p.productId === productId);
    if (indice !== -1) {
        req.session.cart[indice].quantity += 1;
    }
    res.redirect('/cart');
}

const restarCantidad = (req, res) => {
    const productId = req.params.id;
    if (!req.session.cart) return res.redirect('/cart');

    const indice = req.session.cart.findIndex(p => p.productId === productId);
    if (indice !== -1) {
        req.session.cart[indice].quantity -= 1;
        // Si llega a 0, lo borramos
        if (req.session.cart[indice].quantity <= 0) {
            req.session.cart.splice(indice, 1);
        }
    }
    res.redirect('/cart');
}


const eliminarProducto = (req, res) => {
    const productId = req.params.id;
    if (!req.session.cart) return res.redirect('/cart');


    req.session.cart = req.session.cart.filter(p => p.productId !== productId);
    res.redirect('/cart');
}

//PARA VACIAR EL CARRITO
const vaciarCarrito = (req, res) => {
    req.session.cart = [];
    res.redirect('/cart');
}


//PARA VER EL CARRITO
const verCarrito = (req, res) => {
    const cartSession = req.session.cart || [];
    let total = 0;

    const cartDetallado = cartSession.map(item => {

        const productoReal = productos.find(p => String(p.id) === String(item.productId));

        if (productoReal) {
            const subtotal = productoReal.price * item.quantity;
            total += subtotal;


            return {
                id: productoReal.id,
                nombre: productoReal.name,
                precio: productoReal.price,
                imagen: productoReal.image || 'https://st2.depositphotos.com/2586633/46477/v/950/depositphotos_464771766-stock-illustration-no-photo-or-blank-image.jpg',
                cantidad: item.quantity,
                subtotal: subtotal
            };
        }
        return null;
    }).filter(item => item !== null);


    res.render('pages/cart', { cart: cartDetallado, totalGeneral: total });
}



module.exports = {
    verCarrito,
    vaciarCarrito,
    sumarCantidad,
    restarCantidad,
    eliminarProducto,
    agregarProducto,


}