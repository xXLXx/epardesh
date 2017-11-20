var express = require('express');
var router = express.Router();
var async = require('async');
var md5 = require('md5');
var request = require('request');
var func = require('../../commonfunction');
var sendResponse = require('../../sendresponse');

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});


/*
 * --------------------------------------------------------------------------
 * view_top_categories
 * ---------------------------------------------------------------------------
 */
router.post('/view_top_categories', function (req, res, next) {
    var count = 0;
    var data = [];
    all_sub_categories = [];
    var top_categories = [];
    var sql = "select * from epardesh_categories where parent='0' ORDER BY position, name";
    connection.query(sql, function (err, rows) {
        if (err) {
            var errorMsg = 'some error occurred';
            sendResponse.sendErrorMessage(errorMsg, res);
        } else {
            var no_of_categories = rows.length;
            if (no_of_categories > 0) {
                for (var i = 0; i < no_of_categories; i++) {
                    var parent_id = rows[i].id;
                    var sql1 = "select id,name,parent,status from epardesh_categories where parent=? ORDER BY name";
                    var values1 = [parent_id];
                    connection.query(sql1, values1, function (err, rows1) {
                        if (err) {
                            var errorMsg = 'some error occurred';
                            sendResponse.sendErrorMessage(errorMsg, res);
                        } else {
                            data = {
                                category_id: rows[count].id,
                                category_name: rows[count].name,
                                position: rows[count].position,
                                subcategories: rows1
                            }                          
                            all_sub_categories.push(data)
                            if (parseInt(count) == (parseInt(no_of_categories) - 1)) {                               
                                sendResponse.sendSuccessData(all_sub_categories, res);
                            } else {                               
                                count = parseInt(count) + 1;
                            }
                        }
                    });
                }
            } else {
                var data = []
                sendResponse.sendSuccessData(data, res);
            }
        }
    });
});







module.exports = router;
