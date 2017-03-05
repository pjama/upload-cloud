const format = require('util').format;
const express = require('express');
const Multer = require('multer');
const AWS = require('aws-sdk');

const app = express();
s3 = new AWS.S3({apiVersion: '2006-03-01'});

const multer = Multer({
  storage: Multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024 // no larger than 5mb, you can change as needed.
  }
});

app.post('/upload', multer.single('file'), (req, res, next) => {
  if (!req.file) {
    res.status(400).send('No file uploaded.');
    return;
  }
  const uploadParams = {
    Bucket: process.env.AWS_S3_BUCKET,
    Key: req.file.originalname,
    Body: req.file.buffer
  };

  s3.upload (uploadParams, function (err, data) {
    if (err) {
      next(err);
    } if (data) {
      res.status(200).send(data.Location);
    }
  });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});
