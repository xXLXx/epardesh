var express = require('express');
var router = express.Router();
var async = require('async');
var md5 = require('md5');
var request = require('request');
var func = require('../../commonfunction');
var sendResponse = require('../../sendresponse');



/*
 * --------------------------------------------------------------------------
 * add_favourite_event
 * ---------------------------------------------------------------------------
 */

router.post('/add_favourite_event', function (req, res, next) {
    var access_token = req.body.access_token;
    var user_id = req.body.user_id;
    var event_id = req.body.event_id;
    async.waterfall([
        function (callback) {
            checkUser(res, access_token, callback);
        }],
            function () {

                var add_to_favourite_query = "insert into favourite_events (user_id, event_id) VALUES (?,?)"
                var event_values = [user_id, event_id]
                connection.query(add_to_favourite_query, event_values, function (err, events) {
                    if (err) {
                        console.log(err)
                        var errorMsg = 'some error occurred';
                        sendResponse.sendErrorMessage(errorMsg, res);
                    } else {
                        var msg = {}
                        sendResponse.sendSuccessData(msg, res);
                    }
                })
            })
})

/*
 * --------------------------------------------------------------------------
 * view_favourite_event
 * ---------------------------------------------------------------------------
 */

router.post('/view_favourite_event', function (req, res, next) {
    var user_id = req.body.user_id;
    var access_token = req.body.access_token;
    var event_id_array = [];
    var event_array = [];
    async.waterfall([
        function (callback) {
            checkUser(res, access_token, callback);
        }],
            function () {
                var view_events_query = "select * from favourite_events where user_id=?"
                var user_values = [user_id]
                connection.query(view_events_query, user_values, function (err, events) {
                    if (err) {
                        console.log(err)
                        var errorMsg = 'some error occurred';
                        sendResponse.sendErrorMessage(errorMsg, res);
                    } else {
                        var no_of_events = events.length;
                        for (var i = 0; i < no_of_events; i++) {
                            var event_id = events[i].event_id;
                            event_id_array.push(event_id)
                        }
                        console.log(event_id_array)
                        async.each(event_id_array, function (event_id, callback) {
                            var sql1 = 'select * from epardesh_events where id=?';
                            var values1 = [event_id]
                            connection.query(sql1, values1, function (err, rows1) {
                                if (err) {
                                    console.log(err)
                                    var errorMsg = 'some error occurred';
                                    sendResponse.sendErrorMessage(errorMsg, res);
                                } else {
                                    if (rows1.length > 0) {
                                        event_array.push(rows1[0])
                                    }
                                }
                                callback();
                            })
                        }, function (err) {
                            // if any of the file processing produced an error, err would equal that error
                            if (err) {
                                // One of the iterations produced an error.
                                // All processing will now stop.
                                console.log('A file failed to process');
                            } else {
                                sendResponse.sendSuccessData(event_array, res);
                            }
                        });
                    }
                })
            })
})

/*
 * --------------------------------------------------------------------------
 * remove_favourite_training
 * ---------------------------------------------------------------------------
 */

router.post('/remove_favourite_event', function (req, res, next) {
    var access_token = req.body.access_token;
    var favourite_id = req.body.favourite_id;

    async.waterfall([
        function (callback) {
            checkUser(res, access_token, callback);
        }],
            function () {
                var remove_from_favourite_query = "delete from favourite_events where id=?"
                var favourite_values = [favourite_id]
                connection.query(remove_from_favourite_query, favourite_values, function (err, rows) {
                    if (err) {
                        console.log(err)
                        var errorMsg = 'some error occurred';
                        sendResponse.sendErrorMessage(errorMsg, res);
                    } else {
                        var msg = {}
                        sendResponse.sendSuccessData(msg, res);
                    }
                })
            })
})

/*
 * ----------------------------------------------------------------------------------------------------------------------------------------
 * check User Is Valid or Not
 * INPUT : access_token
 * ----------------------------------------------------------------------------------------------------------------------------------------
 */
function checkUser(res, access_token, callback) {
    var sql = "SELECT * FROM `user` WHERE `access_token`=? limit 1";
    var values = [access_token];
    connection.query(sql, values, function (err, userResponse) {
        if (userResponse.length == '0' || userResponse.length == 0) {
            var errorMsg = 'Invalid Attempt';
            sendResponse.sendErrorMessage(errorMsg, res);
        } else
        {
            callback();
        }
    });
}

module.exports = router;