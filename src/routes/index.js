const { Router, response } = require('express');
const fetch = require('node-fetch');
const axios = require('axios')
const { Pokemon, Tipo } = require('../db.js')
const router = Router();
   

router.get('/', async (req,res) => {  
        await Pokemon.findAll()
        .then(pokemons =>{
            return res.status(202).json(pokemons);   
        }).catch(err =>{
            return res.status(404).send(err.message)
        }) 
});

router.get('/typesdb', async (req,res)=>{
    await Tipo.findAll()
    .then((tipo) => {
        return res.status(201).json(tipo)
    }).catch((err) =>{
        return res.status(401).send(err)
    })
})

router.post('/pokemons', async (req,res) => {  
    const { name,hp,strength,defense,speed,heigth,weigth,types,img } = req.body;
        await Pokemon.create({
            name,
            hp,
            strength,
            defense,
            speed,
            heigth,
            weigth,
            img,
            types
        }).then((data)=>{
            console.log(data)
            return res.status(202).json(data); 
        }).catch((err) => {
            return res.status(404).send(err.message)
        }) 
})

router.get('/pokemons', async (req,res) => {      
    const {name} = req.query 
    try{
        await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
        .then(response => response.json())
        .then(data => {
        return res.status(201).json(data)
        })
    }catch(err){
        return res.status(401).send(err)
    }
}); 

router.post('/Allpokemons', async (req,res) => {  
    return axios.get("https://pokeapi.co/api/v2/pokemon/?limit=1118")
        .then((pokemons) =>{
            return pokemons.data.results
        })
        .then(pokes =>{
            var arr
            pokes.map(async (pointer)=>{
                if(pointer.url){
                    return await axios.get(pointer.url)
                        .then(async (pokeInfo) => {                               
                           arr = await Pokemon.findOrCreate({
                                where:{
                                    name:pokeInfo.data.name
                                },
                                defaults:{
                                    img: pokeInfo.data.sprites.other.dream_world.front_default ||
                                    pokeInfo.data.sprites.front_default,
                                    types: pokeInfo.data.types.map(pointer=>{
                                        return pointer.type.name
                                    })
                                }
                            })
                        })
                }
            })
            
            }).then((newPokemon) =>{
                res.status(201).json(newPokemon)
            }).catch(err =>{
                res.status(400).send(err)
            })      
}); 

router.get('/AllPokemonsdb', async (req,res) => {      
        await Pokemon.findAll()
                .then(pokemons =>{
                    return res.status(201).json(pokemons)
                }).catch(err =>{
                    return res.status(401).send(err)
                })   
}); 

router.get('/pokemons/:id', async (req,res) => {
    const { id } = req.params

        if(id){
            await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
                .then(response => response.json())
                .then(data => res.json(data))
                
        } else {
            const idpoke = Pokemon.findOne(id)
            return res.json(idpoke)
        }                                                          
    });

router.post('/types', async (req,res) => {  
    try{
        await fetch('https://pokeapi.co/api/v2/type/')
            .then(response => response.json())
            .then(async (data) => {
                var type
                for(var i=0; i < data.results.length; i++){
                    
                      type = await Tipo.findOrCreate({
                                where:{
                                name: data.results[i].name
                            }
                        })
                    }  
                res.status(201).json(type)   
            })
        }catch(err){
            console.log(err)
            res.status(401).send(err)
        } 
})        



module.exports = router;
