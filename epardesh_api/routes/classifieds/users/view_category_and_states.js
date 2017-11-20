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
 * view_epardesh_categories
 * INPUT : category, parent
 * ---------------------------------------------------------------------------
 */
router.post('/view_epardesh_categories', function (req, res, next) {
    var data = [];
    var all_categories = []
    var sql = "select * from epardesh_categories where parent='0' ORDER BY name";
    connection.query(sql, function (err, rows) {
        if (err) {
            console.log(err)
            var errorMsg = 'some error occurred';
            sendResponse.sendErrorMessage(errorMsg, res);
        } else {
            var no_of_categories = rows.length;
            for (var i = 0; i < no_of_categories; i++) {
                data = {
                    category_id: rows[i].id,
                    category_name: rows[i].name,
                    position: rows[i].position
                }
                all_categories.push(data)
            }
            sendResponse.sendSuccessData(all_categories, res);
        }
    });
});

/*
 * --------------------------------------------------------------------------
 * view_epardesh_sub_categories
 * INPUT : category, parent
 * ---------------------------------------------------------------------------
 */
router.post('/view_epardesh_sub_categories', function (req, res, next) {
    var data = [];
    var count = 0;
    var all_sub_categories = []
    var sql = "select * from epardesh_categories where parent <>'0' order by name";
    connection.query(sql, function (err, rows) {
        if (err) {
            var errorMsg = 'some error occurred';
            sendResponse.sendErrorMessage(errorMsg, res);
        } else {
            var no_of_sub_categories = rows.length;
            for (var i = 0; i < no_of_sub_categories; i++) {
                var parent_id = rows[i].parent;
                var sql1 = "select * from epardesh_categories where id=?";
                var values1 = [parent_id]
                connection.query(sql1, values1, function (err, rows1) {
                    if (err) {
                        var errorMsg = 'some error occurred';
                        sendResponse.sendErrorMessage(errorMsg, res);
                    }
                    if (rows1.length > 0) {
                        data = {
                            sub_category_id: rows[count].id,
                            sub_category_name: rows[count].name,
                            parent_id: rows[count].parent,
                            status: rows[count].status,
                            parent: rows1[0].name
                        }
                        all_sub_categories.push(data)
                    }
                    console.log(rows1)
                    if (parseInt(count) == (parseInt(no_of_sub_categories) - 1)) {
                        console.log("in end");
                        sendResponse.sendSuccessData(all_sub_categories, res);
                    } else {
                        count = parseInt(count) + 1;
                    }
                });
            }
        }
    });

});

/*
 * --------------------------------------------------------------------------
 * view_epardesh_states
 * INPUT : country_id
 * ---------------------------------------------------------------------------
 */
router.post('/view_epardesh_states', function (req, res, next) {
    var country_id = req.body.country_id;
    var sql = "select * From epardesh_states where country_id=? order by location_name";
    var values = [country_id]
    connection.query(sql, values, function (err, rows) {
        if (err) {
            var errorMsg = 'some error occurred';
            sendResponse.sendErrorMessage(errorMsg, res);
        } else {
            sendResponse.sendSuccessData(rows, res);
        }
    });
});

/*
 * --------------------------------------------------------------------------
 * view_epardesh_cities
 * INPUT : state_id
 * ---------------------------------------------------------------------------
 */
router.post('/view_epardesh_cities', function (req, res, next) {
    var state_id = req.body.state_id;
    var country_id = req.body.country_id;
    console.log(country_id)
    if (country_id == 1 || country_id == '1')
    {
        var sql = "select * From india_cities where city_state=? order by city_name";
        var values = [state_id]
        console.log("in india")
        console.log(values)
        connection.query(sql, values, function (err, rows) {
            if (err) {
                var errorMsg = 'some error occurred';
                sendResponse.sendErrorMessage(errorMsg, res);
            } else {
                sendResponse.sendSuccessData(rows, res);
            }
        });
    } else if (country_id == 2 || country_id == '2')
    {
        var sql = "select * From USA_cities where city_state=? order by city_name";
        var values = [state_id]
        console.log("usa")
        console.log(values)
        connection.query(sql, values, function (err, rows) {
            if (err) {
                var errorMsg = 'some error occurred';
                sendResponse.sendErrorMessage(errorMsg, res);
            } else {
                sendResponse.sendSuccessData(rows, res);
            }
        });
    }
});

/*
 * --------------------------------------------------------------------------
 * view_users_profile
 * ---------------------------------------------------------------------------
 */
router.post('/view_users_profile', function (req, res, next) {
    var user_id = req.body.user_id;
    var sql = "select id,first_name,last_name,email,phone,phone1,phone2,city,state,country,address,user_type,business_name,website From user where id=?";
    var values = [user_id]
    connection.query(sql, values, function (err, rows) {
        if (err) {
            var errorMsg = 'some error occurred';
            sendResponse.sendErrorMessage(errorMsg, res);
        } else {
            sendResponse.sendSuccessData(rows, res);
        }
    });
});

/*
 * --------------------------------------------------------------------------
 * view_subcategories_by_categories
 * INPUT : category_id
 * ---------------------------------------------------------------------------
 */
router.post('/view_subcategories_by_categories', function (req, res, next) {
    var category_id = req.body.category_id
    var sql = "select * from epardesh_categories where parent=? ORDER BY name";
    var values = [category_id];
    connection.query(sql, values, function (err, rows) {
        if (err) {
            console.log(err)
            var errorMsg = 'some error occurred';
            sendResponse.sendErrorMessage(errorMsg, res);
        } else {
            sendResponse.sendSuccessData(rows, res);
        }
    });

});


/*
 * --------------------------------------------------------------------------
 * view_special_categories
 * ---------------------------------------------------------------------------
 */
router.post('/view_special_categories', function (req, res, next) {
    var special_categories = []
    var sql = "select * from epardesh_categories";
    connection.query(sql, function (err, rows) {
        if (err) {
            console.log(err)
            var errorMsg = 'some error occurred';
            sendResponse.sendErrorMessage(errorMsg, res);
        } else {
            var no_of_categories = rows.length;
            for (var i = 0; i < no_of_categories; i++) {
                var category = rows[i].name;
                if (category == "IT TRAINING" || category == "EVENTS" || category == "JOBS" || category == "Roommates" || category == "Rentals" || category == "Travel" || category == "Day care" || category == "Services" || category == "Auto" || category == "More"){
                    var data = {
                        id:rows[i].id,
                        category:rows[i].name
                    }
                    special_categories.push(data)
                }
            }

            sendResponse.sendSuccessData(special_categories, res);
        }
    });

});

/*
 * --------------------------------------------------------------------------
 *top_categories
 * ---------------------------------------------------------------------------
 */
router.post('/top_categories', function (req, res, next) {
    var get_top_categories = "select * from epardesh_categories where parent=0 order by id desc limit 24";
    connection.query(get_top_categories, function (err, rows) {
        if (err) {
            console.log(err)
            var errorMsg = 'some error occurred';
            sendResponse.sendErrorMessage(errorMsg, res);
        } else {
            if(rows.length > 0){
                sendResponse.sendSuccessData(rows, res);
            }
        }
    });
});


module.exports = router;
