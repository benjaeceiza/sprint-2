const products = require('../data/products.json');
const categories = require("../data/categories.json")


const normalizeId = (id) => {
  
    const parsedId = Number(id);

    if (Number.isInteger(parsedId) && parsedId > 0) {
        return parsedId; 
    }

    return null;

}

// Trae todos los productos
const getAllProducts = () => {
    return products;
}

// Busca un producto por ID 
const getProductById = (id) => {
    return products.find(product => product.id === id);
}

// Filtra por categoría
const getProductsByCategory = (categoria) => {
    // Si la categoría es "all" o no viene nada, devolvemos todo
    if (!categoria || categoria === 'all') return products;

    return products.filter(product => product.categoria.toLowerCase() === categoria.toLowerCase());
}

// Extrae todas las categorías 
const getCategories = () => {
    return categories;
}

// Trae productos aleatorios
const getRandomProducts = (productsArray, count = 4) => {
    const shuffled = [...productsArray];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled.slice(0, count);
};

module.exports = {
    getAllProducts,
    getProductById,
    getProductsByCategory,
    getRandomProducts,
    getCategories,
    normalizeId
};