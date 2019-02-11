var socket = io();

var params = new URLSearchParams(window.location.search);

if (!params.has('nombre') || !params.has('sala')) {
    window.location.href = 'index.html';
    throw new Error('El nombre y sala son necesario');
} 
var usuario = {
    nombre: params.get('nombre'),
    sala: params.get('sala')
};

socket.on('connect', function() {
    console.log('Conectado al servidor');
    socket.emit('entrarChat',usuario, function(resp) {
        // console.log('Usuarios conectados', resp);
        renderizarUsuarios(resp);
    });
});

// escuchar
socket.on('disconnect', function() {

    console.log('Perdimos conexión con el servidor');

});


// Enviar información
//socket.emit('crearMensaje', {
 //   usuario: 'Fernando',
 //   mensaje: 'Hola Mundo'
//}, function(resp) {
 //   console.log('respuesta server: ', resp);
//});

// Escuchar información
socket.on('crearMensaje', function(mensaje) {

//    console.log('Servidor:', mensaje);
    renderizarMensajes(mensaje, false);
    scrollBottom();
});
// Escuchar cambios de usuarios
// cuando se conecta o desconecta del chat
socket.on('listaPersonas', function(personas) {

    renderizarUsuarios(personas);

});

//Mensajes privados
socket.on('mensajePrivado', function(mensaje) {
    console.log('Mensaje privado: ', mensaje);
});
