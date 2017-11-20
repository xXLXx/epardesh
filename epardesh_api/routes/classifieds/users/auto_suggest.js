var express = require('express');
var router = express.Router();
var async = require('async');
var md5 = require('md5');
var request = require('request');
var func = require('../../commonfunction');
var sendResponse = require('../../sendresponse');
var date = require('date-and-time');

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

/*
 * --------------------------------------------------------------------------
 * auto_suggest
 * INPUT : keyword
 * ---------------------------------------------------------------------------
 */
router.post('/auto_suggest', function (req, res, next) {
    var keyword = req.body.keyword;
    var get_by_category = "SELECT name from epardesh_categories where name LIKE '%" + keyword + "%' and parent='0' limit 5";
    connection.query(get_by_category, function (err, by_category) {
        if (err) {
            var errorMsg = 'Something went wrong, Please try again!';
            sendResponse.sendErrorMessage(errorMsg, res);
        } else {
            console.log('by_category')
            console.log(by_category)
            var get_by_sub_category = "SELECT name from epardesh_categories where name LIKE '%" + keyword + "%' and parent!='0' limit 5";
            connection.query(get_by_sub_category, function (err, by_subcategory) {
                if (err) {
                    var errorMsg = 'Something went wrong, Please try again!';
                    sendResponse.sendErrorMessage(errorMsg, res);
                } else {
                    console.log('by_subcategory')
                    console.log(by_subcategory)
                    var get_by_business_name = "SELECT business_name as name from epardesh_ads where business_name LIKE '%" + keyword + "%' limit 5";
                    connection.query(get_by_business_name, function (err, by_business_name) {
                        if (err) {
                            var errorMsg = 'Something went wrong, Please try again!';
                            sendResponse.sendErrorMessage(errorMsg, res);
                        } else {
                            console.log('by_business_name')
                            console.log(by_business_name)
                            var data = {
                                by_category_name: by_category,
                                by_subcategory_name: by_subcategory,
                                by_business_name: by_business_name
                            }
                            sendResponse.sendSuccessData(data, res);
                        }
                    });
                }
            });
        }
    });
});

/*
 * --------------------------------------------------------------------------
 * auto_suggest_tittle
 * INPUT : keyword
 * ---------------------------------------------------------------------------
 */
router.post('/auto_suggest_tittle', function (req, res, next) {
    var status = req.body.status;
    var key = req.body.keyword;
    var keyword = escape(key)
    
    var today_date = new Date();
    var formatted_today_date = date.format(today_date, 'YYYY-MM-DD')
    
    if (status == 1) {
        var get_suggestion = "SELECT ad_tittle,id as ad_id from epardesh_ads where ad_tittle LIKE '%" + keyword + "%' and approved_status = 1 and expiry_date >= '" + formatted_today_date + "'";
        connection.query(get_suggestion, function (err, suggestion) {
            if (err) {
                var errorMsg = 'Something went wrong, Please try again!';
                sendResponse.sendErrorMessage(errorMsg, res);
            } else {
                var data = {
                    suggestion_for_ads: suggestion,
                    suggestion_for_trainings: '',
                    suggestion_for_events: ''
                }
                sendResponse.sendSuccessData(data, res);
            }
        });
    } else if (status == 2) {
        var get_suggestion = "SELECT training_tittle,id as training_id from epardesh_training where training_tittle LIKE '%" + keyword + "%' and active_status=1 and approved_status=1 and training_end_date >= '" + formatted_today_date + "'";
        console.log(get_suggestion)
        connection.query(get_suggestion, function (err, suggestion) {
            if (err) {
                var errorMsg = 'Something went wrong, Please try again!';
                sendResponse.sendErrorMessage(errorMsg, res);
            } else {
                var data = {
                    suggestion_for_ads: '',
                    suggestion_for_trainings: suggestion,
                    suggestion_for_events: ''
                }
                sendResponse.sendSuccessData(data, res);
            }
        });
    } else if (status == 3) {
        var get_suggestion = "SELECT event_tittle,id as event_id from epardesh_events where event_tittle LIKE '%" + keyword + "%' and approved_status=1 and active_status=1 and end_date >= '" + formatted_today_date + "'";
        connection.query(get_suggestion, function (err, suggestion) {
            if (err) {
                var errorMsg = 'Something went wrong, Please try again!';
                sendResponse.sendErrorMessage(errorMsg, res);
            } else {
                var data = {
                    suggestion_for_ads: '',
                    suggestion_for_trainings: '',
                    suggestion_for_events: suggestion
                }
                sendResponse.sendSuccessData(data, res);
            }
        });
    } else {
        var get_ad_suggestion = "SELECT ad_tittle,id as ad_id from epardesh_ads where ad_tittle LIKE '%" + keyword + "%' and approved_status = 1 and expiry_date >= '" + formatted_today_date + "'";
        connection.query(get_ad_suggestion, function (err, ad_suggestion) {
            if (err) {
                var errorMsg = 'Something went wrong, Please try again!';
                sendResponse.sendErrorMessage(errorMsg, res);
            } else {
                var get_training_suggestion = "SELECT training_tittle,id as training_id from epardesh_training where training_tittle LIKE '%" + keyword + "%' and active_status=1 and approved_status=1 and training_end_date >= '" + formatted_today_date + "'";
                connection.query(get_training_suggestion, function (err, training_suggestion) {
                    if (err) {
                        var errorMsg = 'Something went wrong, Please try again!';
                        sendResponse.sendErrorMessage(errorMsg, res);
                    } else {

                        var get_event_suggestion = "SELECT event_tittle,id as event_id from epardesh_events where event_tittle LIKE '%" + keyword + "%' and active_status=1 and approved_status=1 and end_date >= '" + formatted_today_date + "'";
                        connection.query(get_event_suggestion, function (err, event_suggestion) {
                            if (err) {
                                var errorMsg = 'Something went wrong, Please try again!';
                                sendResponse.sendErrorMessage(errorMsg, res);
                            } else {
                                var data = {
                                    suggestion_for_ads: ad_suggestion,
                                    suggestion_for_trainings: training_suggestion,
                                    suggestion_for_events: event_suggestion
                                }
                                sendResponse.sendSuccessData(data, res);
                            }
                        });
                    }
                });
            }
        });
    }
});

module.exports = router;
