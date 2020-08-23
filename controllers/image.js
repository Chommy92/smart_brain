const Clarifai = require('clarifai');

//for face detector
const app = new Clarifai.App({
  apiKey: '43e1d7d117da47b695b79c97b8fe63f8'
});
 
 const handleApiCall = (req, res) =>{
    app.models
       .predict('c0c0ac362b03416da06ab3fa36fb58e3', req.body.input)
       .then(data =>{
       	res.json(data);
       })
       .catch(err => res.status(400).json('unable to work with API'))
 } 


const handleImage = (req, res, db) =>{
 const { id } = req.body;
  db('users').where('id', '=', id)
  .increment('entries', 1)
  .returning('entries')
  .then(entries =>{
  	res.json(entries);
  })
  .catch(err => res.status(400).json('not found'))
}

module.exports = {
	handleImage,
	handleApiCall
};