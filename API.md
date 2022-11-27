# API
Before using the API, you need to finish the following set-up:
- Run ```npm install```, ```npm start -- --port=4000``` in the main directory
- Connect your database in ```./config/secrets.js```
- To add all pokemons into the db, ```cd database_scripts``` and run ```Python3 addPokemon.py```
- To delete all users in the db, ```cd database_scripts``` and run ```Python3 deleteUsers.py```

### 1. ```http://localhost:4000/api/users [GET]``` 
Get all users in the db. This api support the req query

**Ex.** 
```http://localhost:4000/api/users?where={"_id": "55099652e5993a350458b7b7"}```

### 2. ```http://localhost:4000/api/users [POST]``` 
Add a user to the db. 

**Ex. Body**
```
{
    "name":"user1",
    "password":"123abc",
    "ownedPokemons": [
        "637ded89e247184ef26d4325","637ded89e247184ef26d4329",
    ]
}
```
Notice, you need to change the id in the "ownedPokemons". This is just an example. 
### 3. ```http://localhost:4000/api/pokemons [GET]```
Get all pokemons in the db. This support req query.

### 4. ```http://localhost:4000/api/pokemons [POST]```
Add a pokemon into the db.

**Ex.**
```
{
    "pokemon_id": "1",
    "identifier": "bulbasaur",
    "species_id": 1,
    "height": 7,
    "weight": 69,
    "base_experience": 64,
    "order": 1,
    "is_default": 1,
}
```

### 5. ```http://localhost:4000/api/getOwnedPokemons/:id [GET]```
get the OwnedPokemons of a user.

**Ex.**
```http://localhost:4000/api/getOwnedPokemons/63819dd989152714c372f11a```
This get OwnedPokemons of the user with ```'_id' = '63819dd989152714c372f11a'```

### 6. ```http://localhost:4000/api/PokemonGenerator/:id [GET]```
This randomly generate a user a pokemon that one don't owned.

**Ex.**
```http://localhost:4000/api/PokemonGenerator/6382c5637121e026e2f90817 [GET]```
This generate a new pokemon for the user with ```'id' = '6382c5637121e026e2f90817'```
The res is in the form
```
{
    "meesage": "here is your new Pokemon!",
    "data": "637ded8ce247184ef26d4b77"
}
``` 
```637ded8ce247184ef26d4b77``` is the '_id' of the new pokemon.

### 7. ```http://localhost:4000/api/getAllPokemonsId [GET]```
This will return all pokemons' '_id' in an array. This support req query.

**Ex.**
```
{
    "message": "OK",
    "data": [
        "637ded89e247184ef26d4325",
        "637ded89e247184ef26d4329",
        "637ded89e247184ef26d4327"
    ]
}
```

### 8. ```http://localhost:4000/api/getAllUsersId [GET]```
This will return all users' '_id' in an array. This support req query.

### 9. ```http://localhost:4000/api/users/:id [GET]``` 
This gives a user's information 

### 10. ```http://localhost:4000/api/users/:id [DELETE]``` 
This delete a user

### 11. ```http://localhost:4000/api/addOwnedPokemons/:id [PUT]```
This will add pokemons in req body to the user with ':id'

**Ex.**
```
{
    "pokemonToAdd" : [""637ded89e247184ef26d4325", "637ded89e247184ef26d4329", "637ded89e247184ef26d4327""]
}
```

### 12. ```http://localhost:4000/api/deleteOwnedPokemons/:id [DELETE]```
This will delete pokemons in req body from the user with ':id'

**Ex.**
```
{
    "pokemonToDelete" : [""637ded89e247184ef26d4325", "637ded89e247184ef26d4329", "637ded89e247184ef26d4327""]
}
```