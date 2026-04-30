const productService = require('../services/productsService');

// 1. VER LISTADO COMPLETO O FILTRADO
const verListado = (req, res) => {
    const categoriaQuery = req.query.categoria; 
    
    let productosMostrar = [];
    let tituloCategoria = 'Todos los productos';

    // Si el usuario buscó una categoría, usamos el servicio para filtrar
    if (categoriaQuery && categoriaQuery !== 'all') {
        productosMostrar = productService.getProductsByCategory(categoriaQuery);
        tituloCategoria = categoriaQuery;
    } else {
        productosMostrar = productService.getAllProducts();
        tituloCategoria = 'all';
    }

    // Traemos las categorías para el sidebar o header
    const categorias = productService.getCategories();

    // Renderizamos la vista de la tienda
    res.render('pages/productList', { 
        products: productosMostrar, 
        category: tituloCategoria,
        categorias: categorias 
    });
}

// 2. VER DETALLE DE UN PRODUCTO (Con normalización de ID - US#17)
const verDetalle = (req, res) => {
    const rawId = req.params.id; // Agarramos el ID tal cual viene en la URL
    
    // --- PASO 1: Normalizamos el ID ---
    const validId = productService.normalizeId(rawId);

    // ESCENARIO 1: ID no numérico -> 400
    if (validId === null) {
        return res.status(400).render("pages/400");
    }

    // --- PASO 2: Buscamos el producto con el ID validado ---
    const product = productService.getProductById(validId);
    const categorias = productService.getCategories();

    // ESCENARIO 2: ID numérico pero inexistente -> 404
    if (!product) {
        const todosLosProductos = productService.getAllProducts();
        const recomendados = productService.getRandomProducts(todosLosProductos, 4);
        
        return res.status(404).render('pages/productoNoEncontrado', { 
            randomProducts: recomendados,
            categorias: categorias 
        });
    }

    // --- PASO 3: Producto encontrado ---
    // Si el producto existe, buscamos relacionados 
    const productosMismaCategoria = productService.getProductsByCategory(product.categoria)
                                        .filter(p => p.id !== product.id);
    
    // Sacamos 4 al azar para la sección de "Te puede interesar"
    const productosRelacionados = productService.getRandomProducts(productosMismaCategoria, 4);
    
    res.render('pages/product', {
        product: product,
        products: productosRelacionados, 
        categorias
    });
}

module.exports = {
    verListado,
    verDetalle
}