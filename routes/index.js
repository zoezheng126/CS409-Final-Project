/*
 * Connect all of your endpoints together here.
 */
module.exports = function (app, router) {
    app.use('/api', require('./home.js')(router));
    app.use('/api/users', require('./users.js')(router));
    app.use('/api/pokemons', require('./pokemons.js')(router));
    app.use('/api/getOwnedPokemons/:id', require('./getOwnedPokemons.js')(router))
    app.use('/api/getAllPokemonsId/', require('./getAllPokemonsId.js')(router))
    app.use('/api/pokemonGenerator/:id', require('./pokemonGenerator.js')(router))
    // app.use('/api/users/:id', require('./userId.js')(router));
    // app.use('/api/tasks/:id', require('./taskId.js')(router));
};
