const Chat = require('../models/Chat');

// FUNCIÓN 1: Crear o actualizar chat (Ya la tienes, pero la incluyo para que esté el archivo completo)
exports.crearObtenerChat = async (req, res) => {
    const { vehiculoId, vendedorId, mensajeInicial, esOrden, chatId } = req.body;
    const emisorId = req.usuario.id;

    try {
        let chat;
        if (chatId) {
            chat = await Chat.findById(chatId);
        } else if (vehiculoId && vendedorId) {
            chat = await Chat.findOne({
                vehiculo: vehiculoId,
                comprador: emisorId,
                vendedor: vendedorId
            });
        }

        if (!chat) {
            chat = new Chat({ vehiculo: vehiculoId, comprador: emisorId, vendedor: vendedorId, mensajes: [] });
        }

        // REGLA DE TURNOS
        if (chat.mensajes.length > 0) {
            const ultimoMensaje = chat.mensajes[chat.mensajes.length - 1];
            if (String(ultimoMensaje.emisor) === String(emisorId)) {
                return res.status(400).json({ 
                    mensaje: 'Debes esperar a que la otra persona responda para enviar otro mensaje.' 
                });
            }
        }

        chat.mensajes.push({
            emisor: emisorId,
            texto: mensajeInicial,
            esOrdenCompra: esOrden || false
        });

        chat.ultimaActualizacion = Date.now();
        await chat.save();

        const chatLimpio = await Chat.findById(chat._id)
            .populate('vehiculo', 'marca modelo imagenes')
            .populate('comprador vendedor', 'name');

        res.status(201).json(chatLimpio);
    } catch (error) {
        console.error("Error en crearObtenerChat:", error);
        res.status(500).json({ mensaje: 'Error al procesar el mensaje' });
    }
};

// ✨ FUNCIÓN 2: Obtener mis chats (ESTA ES LA QUE FALTABA)
exports.obtenerMisChats = async (req, res) => {
    try {
        // Buscamos chats donde el usuario sea el comprador O el vendedor
        const chats = await Chat.find({
            $or: [
                { comprador: req.usuario.id }, 
                { vendedor: req.usuario.id }
            ]
        })
        .populate('vehiculo', 'marca modelo imagenes')
        .populate('comprador vendedor', 'name')
        .sort({ ultimaActualizacion: -1 }); // Ordenar del más reciente al más antiguo

        res.json(chats);
    } catch (error) {
        console.error("Error en obtenerMisChats:", error);
        res.status(500).json({ mensaje: 'Error al obtener los chats' });
    }
};