const Clarifai = require('clarifai');
const image2base64 = require('image-to-base64');

const app = new Clarifai.App({
    apiKey: '013dea983487489f8dbf42b7f4f2f430'
});

const handleApiCall = async (req, res) => {

    let imageUrl = req.body.input;

    app.models.predict('a403429f2ddf4b49b307e318f00e528b', imageUrl).then(
        function(response) {
            res.status(200).json(response);
        },
        function(err) {
            res.status(400).json('Error in detecting')
        }
      );
}



const handleImage = (req, res, db) => {
    const { id } = req.body;
    db('users').where('id', '=', id)
        .increment('entries', 1)
        .returning('entries')
        .then(entries => {
            res.json(entries[0]);
        })
        .catch(err => res.status(400).json('unable to get entries'))
}

module.exports = {
    handleImage: handleImage,
    handleApiCall: handleApiCall
}