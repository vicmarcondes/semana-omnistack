const axios = require('axios');
const Dev = require('../models/Dev');

// index, show, store, update, destroy

module.exports = {
    async store(req, res) {
        const { github_username, techs, latitude, longitude } = req.body;

        let findDev = await Dev.findOne({github_username});

        if(!findDev) {
            const response = await axios.get(`https://api.github.com/users/${github_username}`); // await na parte que é assincrona
            const { name = login, avatar_url, bio } = response.data; // se o nome não existir na api, o padrão é o login

            const techsArray = techs.split(',').map(tech => tech.trim()); // transformando a string em array

            const location = {
                type: 'Point',
                coordinates: [longitude, latitude]
            };

            console.log(location);

            const dev = await Dev.create({
                name,
                github_username,
                bio,
                avatar_url,
                techs: techsArray,
                location
            });
            res.json(dev);   
        }   
    },

    async index(req, res) {
        Dev.find((err, data) => {
            if(!err) {
                res.json(data);
            }
        });
    },

    async destroy(req, res) {
        const { github_username } = req.params;

        Dev.findOneAndDelete({github_username}, (err) => {
            if(err) {
                res.json({error: err});
            }
        });
    }
}