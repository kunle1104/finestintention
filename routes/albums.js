var express = require('express');
var router = express.Router();
var Album = require('../models/album');

router.get('/', function (req, res, next) {
   Album.find()
          .exec(function(err, albums){
              if(err){
                console.log("error in server fetching albums");
                return res.status(500).json({
                   title: 'An error occured',
                   err : err
                });
              }
              res.status(200).json({
                 message : 'Success',
                 obj: albums
              });

          });
});

router.post('/', function (req, res, next) {
   //console.log('In the album server');
   //console.log(req.body);
   var album = new Album ({
     albumId:req.body.id,
     name: req.body.name,
     length: req.body.length,
     fiFunction: req.body.function,
     month: req.body.month,
     place: req.body.place,
     description: req.body.description,
     likes:req.body.likes,
     source: req.body.source,
     //uploadedDate:req.body.uploadedDate
   });
   console.log(album);
   album.save(function(err, result){
      if(err){
             console.log("8*************8");
           return res.status(500).json({
              title: 'An error occured',
              err : err
           });
        }
        console.log("6^^^^^^^^^^^6");
        res.status(201).json({
           message : 'Message saved',
           obj: result
        });
   });
});
router.patch('/:id', function (req, res, next) {
    Album.findOne({albumId:req.params.id}, function (err, album) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        if (!album) {
            return res.status(500).json({
                title: 'No Matching Album Found!',
                error: {album: 'Album not found'}
            });
        }
        album.likes = req.body.likes;
        album.save(function(err, result) {
            if(err){
                   //console.log("8*************8");
                 return res.status(500).json({
                    title: 'An error occured',
                    err : err
                 });
              }
              //console.log("6^^^^^^^^^^^6");
              res.status(201).json({
                 message : 'Message saved',
                 obj: result
              });
        });
    });
});
module.exports = router;
