var express = require('express');
var router = express.Router();
var Video = require('../models/video');

router.get('/', function (req, res, next) {

   Video.find()
          .exec(function(err, videos){
              if(err){
                console.log("error in server fetching videos");
                return res.status(500).json({
                   title: 'An error occured',
                   err : err
                });
              }
              res.status(200).json({
                 message : 'Success',
                 obj: videos
              });

          });
});

router.post('/', function (req, res, next) {
   console.log('In the video server');
   console.log(req.body);
   var video = new Video ({
     videoId:req.body.id,
     name: req.body.name,
     duration: req.body.duration,
     fiFunction: req.body.function,
     month: req.body.month,
     place: req.body.place,
     description: req.body.description,
     likes:req.body.likes,
     source: req.body.source
     //uploadedDate:req.body.uploadedDate
   });
   console.log(video);
   video.save(function(err, result){
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
    Video.findOne({videoId:req.params.id}, function (err, video) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        if (!video) {
            return res.status(500).json({
                title: 'No Matching Video Found!',
                error: {picture: 'Video not found'}
            });
        }
        video.likes = req.body.likes;
        video.save(function(err, result) {
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
