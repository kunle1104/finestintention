var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mongooseUniqueValidator = require('mongoose-unique-validator');

var schema = new Schema({
    picsId:{type:Number, required:true, unique: true},
    path: {type: String, required: true},
    primaryColor: {type: String},
    secondaryColor: {type :String},
    style: {type: String, required: true},
    imageType: {type: Number, required: true},
    source: {type: Number, required: true},
    fiFunction: {type: Number, required: true},
    description: {type: String},
    likes:{type: Number, required: true},
    uploadedDate:{type: Date, default: Date.now }
});

schema.plugin(mongooseUniqueValidator);
module.exports = mongoose.model('Picture', schema);
