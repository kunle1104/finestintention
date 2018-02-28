var express = require('express');
var router = express.Router();
var Picture = require('../models/picture');

router.get('/', function (req, res, next) {
   Picture.find()
          .exec(function(err, pictures){
              if(err){
                //console.log("error in server fetching pictures");
                return res.status(500).json({
                   title: 'An error occured',
                   err : err
                });
              }
              res.status(200).json({
                 message : 'Success',
                 obj: pictures
              });

          });
});

router.post('/', function (req, res, next) {
     var picture = new Picture ({
     picsId:req.body.id,
     path: req.body.path,
     primaryColor: req.body.primaryColor,
     secondaryColor: req.body.secondaryColor,
     style: req.body.style,
     imageType: req.body.imageType,
     source: req.body.source,
     fiFunction: req.body.function,
     description: req.body.desc,
     likes:req.body.likes,
  });
   picture.save(function(err, result){
      if(err){
          return res.status(500).json({
              title: 'An error occured',
              err : err
           });
        }
        res.status(201).json({
           message : 'Message saved',
           obj: result
        });
   });
});
router.patch('/:id', function (req, res, next) {
    Picture.findOne({picsId:req.params.id}, function (err, picture) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        if (!picture) {
            return res.status(500).json({
                title: 'No Matching Picture Found!',
                error: {picture: 'Picture not found'}
            });
        }
        picture.likes = req.body.likes;
        picture.save(function(err, result) {
            if(err){
                return res.status(500).json({
                    title: 'An error occured',
                    err : err
                 });
              }
              res.status(201).json({
                 message : 'Message saved',
                 obj: result
              });
        });
    });
});
module.exports = router;
