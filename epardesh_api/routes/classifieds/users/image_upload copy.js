var express = require('express');
var router = express.Router();
var async = require('async');
var func = require('../../commonfunction');
var sendResponse = require('../../sendresponse');
var fs = require('fs-extra');

var Uploader = require('s3-image-uploader');
var multiparty = require('multiparty');
var uploader = new Uploader({
    aws: {
        key: bucket_key,
        secret: bucket_secret
    },
    websockets: false
            //websocketServerPort : 3004,
});




/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});


/*
 * --------------------------------------------------------------------------
 * upload_image
 * ---------------------------------------------------------------------------
 */

router.post('/upload_image', function (req, res, next) {

    new multiparty.Form().parse(req, function (err, fields, files) {
        console.log(fields);
        console.log(files);
        var file_path = files.profile[0].path;
        console.log(file_path)
        var file_name = files.profile[0].originalFilename;
        var file_size = files.profile[0].size;
        //var file_id = 103;
        var loginTime = new Date();
        var file_id = func.encrypt(loginTime + loginTime);
        uploader.upload({
            fileId: file_id,
            bucket: 'ftpstation',
            source: file_path,
            name: file_name
        },
                function (data) { // success
                    console.log('upload success:', data);
                    profile_image_path = s3_path + data.path;
                    var profile_image_id = s3_path + data.id;
                    var image_type = fields.image_type;
                    console.log(image_type)
                    var sql = "insert into images(image_path,image_type) values(?,?)";
                    var values = [profile_image_path, image_type]
                    connection.query(sql, values, function (err, rows) {
                        if (err) {
                            console.log(err)
                            var errorMsg = 'some error occurred';
                            sendResponse.sendErrorMessage(errorMsg, res);
                        } else {
                            var sql1 = "select * from images order by id desc limit 1"
                            connection.query(sql1, function (err, rows1) {
                                if (err) {
                                    console.log(err)
                                    var errorMsg = 'some error occurred';
                                    sendResponse.sendErrorMessage(errorMsg, res);
                                } else {
                                    console.log(rows1)
                                    sendResponse.sendSuccessData(rows1[0], res);
                                }
                            })
                        }
                    })
                },
                function (errMsg) { //error
                    console.error('unable to upload: ' + errMsg);
                    sendResponse.sendSuccessData(errMsg, res);
                });
    });
});




module.exports = router;
