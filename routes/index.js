/*
 * Connect all of your endpoints together here.
 */
module.exports = function (app, router) {
    app.use('/api', require('./home.js')(router));
    app.use('/api/users', require('./users.js')(router));
    app.use('/api/pokemons', require('./pokemons.js')(router));
    app.use('/api/getOwnedPokemons/:id', require('./getOwnedPokemons.js')(router))
    app.use('/api/addOwnedPokemons/:id', require('./addOwnedPokemons.js')(router))
    app.use('/api/deleteOwnedPokemons/:id', require('./deleteOwnedPokemons.js')(router))
    app.use('/api/getAllPokemonsId/', require('./getAllPokemonsId.js')(router))
    app.use('/api/getAllUsersId/', require('./getAllUsersId.js')(router))
    app.use('/api/pokemonGenerator/:id', require('./pokemonGenerator.js')(router))
    app.use('/api/pokemons/:id', require('./pokemonId.js')(router));
    app.use('/api/users/:id', require('./userId.js')(router));
};
