var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mongooseUniqueValidator = require('mongoose-unique-validator');

var schema = new Schema({
    albumId:{type:Number, required:true, unique: true},
    name: {type: String, required: true},
    length: {type: Number, required: true},
    fiFunction: {type: Number, required: true},
    month: {type: String, required: true},
    place: {type: String, required: true},
    description: {type: String},
    likes:{type: Number, required: true},
    source: {type: Number, required: true},
    uploadedDate:{type: Date, default: Date.now }
});

schema.plugin(mongooseUniqueValidator);
module.exports = mongoose.model('Album', schema);
