const Ticket = require('../models/ticket.model');
const Cart = require('../models/carts.model');
const cartsController = require('./carts.controller');

function generateUniqueCode() {
    const timestamp = new Date().getTime().toString(36).slice(-5);
    const randomString = Math.random().toString(36).substring(2, 7);
    return timestamp + randomString;
}

const ticketController = {
    purchaseCart: async (req, res) => {
        try {
            const cartInfo = await cartsController.getCartInfo(req);

            // Calcular el monto total
            const totalAmount = cartInfo.products.reduce((total, product) => {
                return total + product.price * product.quantity;
            }, 0);


            // Crear un nuevo ticket con la información del carrito
            const newTicket = await Ticket.create({
                code: generateUniqueCode(),
                purchase_datetime: new Date(),
                amount: totalAmount,
                purchaser: req.user.email,
                products: cartInfo.products.map(product => ({
                    name: product.name,
                    quantity: product.quantity,
                    price: product.price,
                })),
            });

            // Enviar una respuesta al cliente
            res.json({ message: 'Compra exitosa', ticket: newTicket });

            await ticketController.clearCart(req);

        } catch (error) {
            console.error('Error al realizar la compra:', error);
            res.status(500).json({ error: 'Error al realizar la compra' });
        }
    },

    clearCart: async (req) => {
        try {
            const userId = req.user.email;
    
            // Eliminar el carrito del usuario
            const result = await Cart.deleteOne({ user: userId });
    
            if (result.deletedCount === 1) {
                return { message: 'Carrito eliminado después de la compra' };
            } else {
                return { message: 'No se encontró el carrito para eliminar' };
            }
        } catch (error) {
            console.error('Error al limpiar el carrito:', error);
            throw error;
        }
    },

};

module.exports = ticketController;