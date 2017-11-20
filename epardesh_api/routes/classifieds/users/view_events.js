var express = require('express');
var router = express.Router();
var async = require('async');
var md5 = require('md5');
var request = require('request');
var func = require('../../commonfunction');
var sendResponse = require('../../sendresponse');
var date = require('date-and-time');

/*
 * --------------------------------------------------------------------------
 * top_featured_events
 * ---------------------------------------------------------------------------
 */

router.post('/top_featured_events', function(req, res, next) {
    var lattitude = req.body.lattitude;
    var longitude = req.body.longitude;
    var today_date = new Date();
    var formatted_today_date = date.format(today_date, 'YYYY-MM-DD')
    var get_event_query = "SELECT *, ACOS( SIN( RADIANS( `event_lattitude` ) ) * SIN( RADIANS( '" + lattitude + "' ) ) + COS( RADIANS( `event_lattitude` ) )* COS( RADIANS( '" + lattitude + "' )) * COS( RADIANS( `event_longitude` ) - RADIANS( '" + longitude + "' )) ) * 6380 AS `distance` FROM `epardesh_events` WHERE ACOS( SIN( RADIANS( `event_lattitude` ) ) * SIN( RADIANS( '" + lattitude + "' ) ) + COS( RADIANS( `event_lattitude` ) ) * COS( RADIANS( '" + lattitude + "' )) * COS( RADIANS( `event_longitude` ) - RADIANS( '" + longitude + "' )) ) * 6380 < 15 and approved_status=1 and plan_id=2 and start_date >= '" + formatted_today_date + "' and active_status=1 ORDER BY `distance` ASC, id DESC limit 3"
    console.log(get_event_query)
    connection.query(get_event_query, function(err, events) {
        if (err) {
            console.log(err)
            var errorMsg = 'some error occurred';
            sendResponse.sendErrorMessage(errorMsg, res);
        } else {
            sendResponse.sendSuccessData(events, res);
        }
    })
})

/*
 * --------------------------------------------------------------------------
 * view_upcoming_events
 * ---------------------------------------------------------------------------
 */

router.post('/view_upcoming_events', function(req, res, next) {
    var no_of_days = req.body.no_of_days;
    var user_id = req.body.user_id;
    var lattitude = req.body.lattitude;
    var longitude = req.body.longitude;
    var event_id_array = [];
    var key = 0;
    var today_date = new Date();
    var upcoming_date = date.addDays(today_date, no_of_days);
    var formatted_today_date = date.format(today_date, 'YYYY-MM-DD')
    var formatted_upcoming_date = date.format(upcoming_date, 'YYYY-MM-DD')
    if (user_id == '') {
        var get_events_query = "select *, ACOS( SIN( RADIANS( `event_lattitude` ) ) * SIN( RADIANS( '" + lattitude + "' ) ) + COS( RADIANS( `event_lattitude` ) )* COS( RADIANS( '" + lattitude + "' )) * COS( RADIANS( `event_longitude` ) - RADIANS( '" + longitude + "' )) ) * 6380 AS `distance` from epardesh_events where ACOS( SIN( RADIANS( `event_lattitude` ) ) * SIN( RADIANS( '" + lattitude + "' ) ) + COS( RADIANS( `event_lattitude` ) )* COS( RADIANS( '" + lattitude + "' )) * COS( RADIANS( `event_longitude` ) - RADIANS( '" + longitude + "' )) ) * 6380 < 50 and (start_date BETWEEN ? AND ?) and approved_status=1 and active_status=1 order by plan_id desc, id Desc"
        var event_values = [formatted_today_date, formatted_upcoming_date]
        connection.query(get_events_query, event_values, function(err, events) {
            if (err) {
                console.log(err)
                var errorMsg = 'some error occurred';
                sendResponse.sendErrorMessage(errorMsg, res);
            } else {
                sendResponse.sendSuccessData(events, res);
            }
        })
    } else {
        var get_events_query = "select *,ACOS( SIN( RADIANS( `event_lattitude` ) ) * SIN( RADIANS( '" + lattitude + "' ) ) + COS( RADIANS( `event_lattitude` ) )* COS( RADIANS( '" + lattitude + "' )) * COS( RADIANS( `event_longitude` ) - RADIANS( '" + longitude + "' )) ) * 6380 AS `distance` from epardesh_events where ACOS( SIN( RADIANS( `event_lattitude` ) ) * SIN( RADIANS( '" + lattitude + "' ) ) + COS( RADIANS( `event_lattitude` ) )* COS( RADIANS( '" + lattitude + "' )) * COS( RADIANS( `event_longitude` ) - RADIANS( '" + longitude + "' )) ) * 6380 < 50 and (start_date BETWEEN ? AND ?) and approved_status=1 and active_status=1 order by plan_id desc, id Desc"
        var event_values = [formatted_today_date, formatted_upcoming_date]
        connection.query(get_events_query, event_values, function(err, events) {
            if (err) {
                console.log(err)
                var errorMsg = 'some error occurred';
                sendResponse.sendErrorMessage(errorMsg, res);
            } else {
                var no_of_events = events.length;
                for (var i = 0; i < no_of_events; i++) {
                    event_id_array.push(events[i].id);
                }
                async.each(event_id_array, function(event_id, callback) {
                    var check_status = 'select * from favourite_events where user_id=? and event_id=?';
                    var check_status_values = [user_id, event_id]
                    connection.query(check_status, check_status_values, function(err, fav_events) {
                        if (err) {
                            console.log(err)
                            var errorMsg = 'some error occurred';
                            sendResponse.sendErrorMessage(errorMsg, res);
                        } else {
                            var data_obj = events[key];
                            if (fav_events.length == '0' || fav_events.length == 0) {
                                data_obj.favourite_status = 0
                            } else {
                                data_obj.favourite_status = 1
                            }
                            key++;
                            callback();
                        }
                    })
                }, function(err) {
                    // if any of the file processing produced an error, err would equal that error
                    if (err) {
                        // One of the iterations produced an error.
                        // All processing will now stop.
                        console.log('A file failed to process');
                    } else {
                        sendResponse.sendSuccessData(events, res);
                    }
                });
            }
        })
    }
})

/*
 * --------------------------------------------------------------------------
 * filter_events
 * ---------------------------------------------------------------------------
 */

router.post('/filter_events', function(req, res, next) {
    var event_name = req.body.event_name;
    var from_date = req.body.from_date;
    var to_date = req.body.to_date;
    var today_date = new Date();
    var formatted_today_date = date.format(today_date, 'YYYY-MM-DD')
    if (event_name == '') {
        var event_string = " like'%'";
    } else {
        var event_string = " LIKE '%" + event_name + "%'";
    }

//    if (from_date == '' && to_date == '') {
//        console.log('in 1')
//        var date_string = "start_date >= '" + formatted_today_date + "'";
//    } else if (from_date != '' && to_date == '') {
//        console.log('in 2')
//        var date_string = "start_date = '" + from_date + "'";
//    } else if (from_date == '' && to_date != '') {
//        console.log('in 3')
//        var date_string = "end_date = '" + to_date + "'";
//    } else {
//        console.log('in 4')
//        var date_string = "(start_date BETWEEN '" + from_date + "' AND '" + to_date + "')";
//    }

    if (from_date == '' && to_date == '') {
        var date_string = "start_date >= '" + formatted_today_date + "'";
    } else if (from_date != '' && to_date == '') {
        var date_string = "start_date = '" + from_date + "'";
    } else if (from_date == '' && to_date != '') {
        var date_string = "end_date = '" + to_date + "'";
    } else {
        var date_string = "(start_date BETWEEN '" + from_date + "' AND '" + to_date + "')";
    }

    var get_event_query = "SELECT * from epardesh_events where event_tittle " + event_string + " and " + date_string + " and approved_status=1 and active_status=1 order by plan_id desc"
    connection.query(get_event_query, function(err, events) {
        if (err) {
            console.log(err)
            var errorMsg = 'some error occurred';
            sendResponse.sendErrorMessage(errorMsg, res);
        } else {
            sendResponse.sendSuccessData(events, res);
        }
    })
})

/*
 * --------------------------------------------------------------------------
 * view_event
 * ---------------------------------------------------------------------------
 */

router.post('/view_event', function(req, res, next) {
    var event_id = req.body.event_id
    var user_id = req.body.user_id;
    var event_id_array = [];
    var key = 0;
    if (user_id == '') {
        var get_events_query = "select * from epardesh_events where id=?"
        var event_values = [event_id]
        connection.query(get_events_query, event_values, function(err, events) {
            if (err) {
                console.log(err)
                var errorMsg = 'some error occurred';
                sendResponse.sendErrorMessage(errorMsg, res);
            } else {

                var views = events[0].views;
                var new_views = parseInt(views) + 1;
                var update_event_query = "UPDATE epardesh_events SET views=? where id=?"
                var event_values = [new_views, event_id]
                connection.query(update_event_query, event_values, function(err, events_views) {
                    if (err) {
                        console.log(err)
                        var errorMsg = 'some error occurred';
                        sendResponse.sendErrorMessage(errorMsg, res);
                    } else {
                        var length = events.length;
                        var data_obj = events[0];
                        data_obj.favourite_status = 0
                        sendResponse.sendSuccessData(events, res);

                    }
                });



            }
        })
    } else {
        var get_events_query = "select * from epardesh_events where id=?"
        var event_values = [event_id]
        connection.query(get_events_query, event_values, function(err, rows) {
            if (err) {
                console.log(err)
                var errorMsg = 'some error occurred';
                sendResponse.sendErrorMessage(errorMsg, res);
            } else {
                var length = rows.length;
                for (var i = 0; i < length; i++) {
                    event_id_array.push(rows[i].id);
                }
                console.log(event_id_array)
                async.each(event_id_array, function(event_id, callback) {
                    var check_status = 'select * from favourite_events where user_id=? and event_id=?';
                    var check_status_values = [user_id, event_id]
                    connection.query(check_status, check_status_values, function(err, fav_events) {
                        if (err) {
                            console.log(err)
                            var errorMsg = 'some error occurred';
                            sendResponse.sendErrorMessage(errorMsg, res);
                        } else {
                            var data_obj = rows[key];
                            if (fav_events.length == '0' || fav_events.length == 0) {
                                data_obj.favourite_status = 0
                            } else {
                                data_obj.favourite_status = 1
                            }
                            key++;
                            callback();
                        }
                    })
                }, function(err) {
                    // if any of the file processing produced an error, err would equal that error
                    if (err) {
                        // One of the iterations produced an error.
                        // All processing will now stop.
                        console.log('A file failed to process');
                    } else {

                        var views = rows[0].views;
                        console.log("checking rows...")
                        console.log(rows)
                        var new_views = parseInt(views) + 1;
                        var update_event_query = "UPDATE epardesh_events SET views=? where id=?"
                        var event_values = [new_views, event_id]
                        connection.query(update_event_query, event_values, function(err, events_views) {
                            if (err) {
                                console.log(err)
                                var errorMsg = 'some error occurred';
                                sendResponse.sendErrorMessage(errorMsg, res);
                            } else {

                                sendResponse.sendSuccessData(rows, res);
                            }
                        });

                        // sendResponse.sendSuccessData(rows, res);

                    }
                });
            }
        })
    }
})

module.exports = router;