var express = require('express');
var router = express.Router();
var async = require('async');
var md5 = require('md5');
var request = require('request');
var date = require('date-and-time');
var randomstring = require("randomstring");
var func = require('../../commonfunction');
var sendResponse = require('../../sendresponse');

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
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

/*
 * --------------------------------------------------------------------------
 * admin_login
 * INPUT : user_name, password
 * ---------------------------------------------------------------------------
 */
router.post('/admin_login', function(req, res, next) {
    var email = req.body.user_name;
    var password = req.body.password;
    var manValues = [email, password];
    async.waterfall([
        function(callback) {
            func.checkBlank(res, manValues, callback);
        }],
            function() {
                var sql = "SELECT * FROM admin_info  WHERE `user_name`= ? ";
                var values = [email];
                connection.query(sql, values, function(err, rows) {
                    if (err) {
                        var errorMsg = 'some error occurred';
                        sendResponse.sendErrorMessage(errorMsg, res);
                    } else {
                        if (rows.length > 0) {
                            if (rows[0].password == password) {
                                var data = {user_name: rows[0].user_name, access_token: rows[0].access_token};
                                sendResponse.sendSuccessData(data, res);
                            } else {
                                var errorMsg = 'Email or password is incorrect.';
                                sendResponse.sendErrorMessage(errorMsg, res);
                            }
                        } else {
                            var msg = "User is not registered with us.Please register first";
                            sendResponse.sendErrorMessage(msg, res);
                        }
                    }
                });
            });
});

/*
 * --------------------------------------------------------------------------
 * epardesh_categories
 * INPUT : category, parent
 * ---------------------------------------------------------------------------
 */
router.post('/epardesh_categories', function(req, res, next) {
    var name = req.body.category_name;
    var parent = req.body.parent_id;
    var status = req.body.status;
    var position = req.body.position;
    async.waterfall([
    ],
            function() {
                var check_availability = "select * from epardesh_categories where name=?";
                var category_name = [name]
                connection.query(check_availability, category_name, function(err, count) {
                    if (err) {
                        var errorMsg = 'some error occurred';
                        sendResponse.sendErrorMessage(errorMsg, res);
                    } else {
                        if (count.length == 0 || count.length == '0') {
                            var insert_category = "insert into epardesh_categories(name,parent,status,position) values(?,?,?,?)";
                            var values = [name, parent, status, position];
                            connection.query(insert_category, values, function(err, rows) {
                                if (err) {
                                    var errorMsg = 'some error occurred';
                                    sendResponse.sendErrorMessage(errorMsg, res);
                                } else {
                                    var sql1 = "select * from epardesh_categories where name=?";
                                    var values1 = [name]
                                    connection.query(sql1, values1, function(err, rows1) {
                                        if (err) {
                                            var errorMsg = 'some error occurred';
                                            sendResponse.sendErrorMessage(errorMsg, res);
                                        } else {
                                            sendResponse.sendSuccessData(rows1, res);
                                        }
                                    });
                                }
                            });
                        } else {
                            var errorMsg = 'category name already exists. kindly choose a different name';
                            sendResponse.sendErrorMessage(errorMsg, res);
                        }
                    }
                });
            });
});

/*
 * --------------------------------------------------------------------------
 * edit_epardesh_categories
 * INPUT : category_id, category_name,parent
 * ---------------------------------------------------------------------------
 */
router.post('/edit_epardesh_categories', function(req, res, next) {
    var category_id = req.body.category_id;
    var category_name = req.body.category_name;
    var parent = req.body.parent_id;
    var status = req.body.status;
    var position = req.body.position;
    var manValues = [category_id, category_name, parent, status, position]
    async.waterfall([
        function(callback) {
            func.checkBlank(res, manValues, callback);
        }],
            function(err, updatePopup, critical) {
                var sql = "select * from epardesh_categories where id = ?";
                var values = [category_id]
                connection.query(sql, values, function(err, rows) {
                    if (err) {
                        console.log(error)
                        var errorMsg = 'some error occurred';
                        sendResponse.sendErrorMessage(errorMsg, res);
                    } else {
                        if (rows.length > 0) {
                            var update_query = "update epardesh_categories set name = ?,parent=?,status=?,position=? where id = ?";
                            var values_to_update = [category_name, parent, status, position, category_id]
                            connection.query(update_query, values_to_update, function(err, rows) {
                                if (err) {
                                    console.log(error)
                                    var errorMsg = 'some error occurred';
                                    sendResponse.sendErrorMessage(errorMsg, res);
                                } else {
                                    var data = {}
                                    sendResponse.sendSuccessData(data, res);
                                }
                            });
                        } else {
                            var msg = "category does not exist";
                            sendResponse.sendErrorMessage(msg, res);
                        }
                    }
                });
            })
});

/*
 * --------------------------------------------------------------------------
 * delete_epardesh_categories
 * INPUT : category_id, category_name,parent
 * ---------------------------------------------------------------------------
 */
//router.post('/delete_epardesh_categories', function (req, res, next) {
//    var category_id = req.body.category_id;
//    var sql = "select * from epardesh_categories where parent = ?";
//    var values = [category_id]
//    connection.query(sql, values, function (err, rows) {
//        if (err) {
//            var errorMsg = 'some error occurred';
//            sendResponse.sendErrorMessage(errorMsg, res);
//        } else {
//            if (rows.length > 0) {
//                var msg = "This is a category. Kindly delete all its subcategories to delete this category."
//                sendResponse.sendSuccessData(msg, res);
//            } else {
//                var sql1 = "DELETE FROM epardesh_categories WHERE id=?;";
//                var values = [category_id]
//                connection.query(sql1, values, function (err, rows) {
//                    if (err) {
//                        var errorMsg = 'some error occurred';
//                        sendResponse.sendErrorMessage(errorMsg, res);
//                    } else {
//                        var msg = "deleted successfully";
//                        sendResponse.sendSuccessData(msg, res);
//                    }
//                });
//
//            }
//        }
//    });
//});


router.post('/delete_epardesh_categories', function(req, res, next) {
    var category_id = req.body.category_id;
    var manValues = [category_id]
    async.waterfall([
        function(callback) {
            func.checkBlank(res, manValues, callback);
        }],
            function(err, updatePopup, critical) {
                var sql = "select * from epardesh_categories where id = ?";
                var values = [category_id]
                connection.query(sql, values, function(err, rows) {
                    if (err) {
                        var errorMsg = 'some error occurred';
                        sendResponse.sendErrorMessage(errorMsg, res);
                    } else {
                        if (rows.length > 0) {
                            var sql1 = "DELETE FROM epardesh_categories WHERE ((id=?) OR (parent=?)) ;";
                            var values1 = [category_id, category_id]
                            connection.query(sql1, values1, function(err, rows1) {
                                if (err) {
                                    console.log(err)
                                    var errorMsg = 'some error occurred';
                                    sendResponse.sendErrorMessage(errorMsg, res);
                                } else {
                                    var data = {}
                                    sendResponse.sendSuccessData(data, res);
                                }
                            });
                        } else {
                            var errorMsg = 'category does not exist';
                            sendResponse.sendErrorMessage(errorMsg, res);
                        }
                    }
                });
            });
});




/*
 * --------------------------------------------------------------------------
 * edit_epardesh_categories
 * INPUT : category_id, category_name,parent
 * ---------------------------------------------------------------------------
 */
//router.post('/edit_epardesh_categories', function (req, res, next) {
//    var category_id = req.body.category_id;
//    var category_name = req.body.category_name;
//    var parent = req.body.parent_id;
//    var status = req.body.status;
//    var position = req.body.position;
//    var manValues = [category_id, category_name, parent, status, position]
//    async.waterfall([
//        function (callback) {
//            func.checkBlank(res, manValues, callback);
//        }],
//            function (err, updatePopup, critical) {
//
//                var sql = "update epardesh_categories set name = ?,parent=?,status=?,position=? where id = ?";
//                var values = [category_name, parent, status, position, category_id]
//                connection.query(sql, values, function (err, rows) {
//                    if (err) {
//                        console.log(error)
//                        var errorMsg = 'some error occurred';
//                        sendResponse.sendErrorMessage(errorMsg, res);
//                    } else {
//                        var msg = "updated successfully"
//                        sendResponse.sendSuccessData(msg, res);
//                    }
//                });
//            })
//});







/*
 * --------------------------------------------------------------------------
 * update_badwords
 * ---------------------------------------------------------------------------
 */
router.post('/update_badwords', function(req, res, next) {
    var badwords = req.body.badwords_string;
    var manValues = [badwords]
    async.waterfall([
        function(callback) {
            func.checkBlank(res, manValues, callback);
        }],
            function(err, updatePopup, critical) {
                var sql = "update badwords set badwords = ? where id = '1'";
                var values = [badwords]
                console.log(values)
                connection.query(sql, values, function(err, rows) {
                    if (err) {
                        console.log(err)
                        var errorMsg = 'some error occurred';
                        sendResponse.sendErrorMessage(errorMsg, res);
                    } else {
                        var data = {}
                        sendResponse.sendSuccessData(data, res);
                    }
                });
            })
});


/*
 * --------------------------------------------------------------------------
 * view_badwords
 * ---------------------------------------------------------------------------
 */
router.post('/view_badwords', function(req, res, next) {
    var sql = "select * from badwords where id = '1'";
    connection.query(sql, function(err, rows) {
        if (err) {
            console.log(err)
            var errorMsg = 'some error occurred';
            sendResponse.sendErrorMessage(errorMsg, res);
        } else {
            sendResponse.sendSuccessData(rows, res);
        }
    })
});


/*
 * --------------------------------------------------------------------------
 * manage_users
 * ---------------------------------------------------------------------------
 */
router.post('/manage_users', function(req, res, next) {
    var user_id_array = [];
    var key = 0;
    var sql = "select id, first_name, last_name,email,phone,city,state,country,address,business_name,website,user_type from user";
    connection.query(sql, function(err, rows) {
        if (err) {
            console.log(err)
            var errorMsg = 'some error occurred';
            sendResponse.sendErrorMessage(errorMsg, res);
        } else {
            var no_of_users = rows.length
            for (var i = 0; i < no_of_users; i++) {
                var id = rows[i].id;
                user_id_array.push(id)
            }
            async.each(user_id_array, function(user_id, callback) {
                var ad_count = 'select count(*) as ad_count from epardesh_ads where user_id=?';
                var values1 = [user_id]
                connection.query(ad_count, values1, function(err, rows1) {
                    if (err) {
                        console.log(err)
                        var errorMsg = 'some error occurred';
                        sendResponse.sendErrorMessage(errorMsg, res);
                    } else {
                        var event_count = 'select count(*) as event_count from epardesh_events where user_id=?';
                        var values2 = [user_id]
                        connection.query(event_count, values2, function(err, rows2) {
                            if (err) {
                                console.log(err)
                                var errorMsg = 'some error occurred';
                                sendResponse.sendErrorMessage(errorMsg, res);
                            } else {
                                var training_count = 'select count(*) as training_count from epardesh_training where user_id=?';
                                var values3 = [user_id]
                                connection.query(training_count, values3, function(err, rows3) {
                                    if (err) {
                                        console.log(err)
                                        var errorMsg = 'some error occurred';
                                        sendResponse.sendErrorMessage(errorMsg, res);
                                    } else {
                                        var no_of_ads = rows1[0].ad_count;
                                        var no_of_events = rows2[0].event_count;
                                        var no_of_trainings = rows3[0].training_count;
                                        var total_count = no_of_ads + no_of_events + no_of_trainings
//                                        console.log('total_count')
//                                        console.log(no_of_ads)

//                                        var data_obj = rows[key]
                                        rows[key].total_count = total_count

//                                        console.log('data_obj')
//                                        console.log(data_obj)
                                        key++
                                    }
                                    callback();
                                })

                            }
                        })
                    }

                })
            }, function(err) {
                // if any of the file processing produced an error, err would equal that error
                if (err) {
                    // One of the iterations produced an error.
                    // All processing will now stop.
                    console.log('A file failed to process');
                } else {
                    sendResponse.sendSuccessData(rows, res);
                }
            })

        }
    })
});

/*
 * --------------------------------------------------------------------------
 * add_plans
 * ---------------------------------------------------------------------------
 */
router.post('/add_plans', function(req, res, next) {
    var plan_type = req.body.plan_type;
    var plan_name = req.body.plan_name;
    var plan_price = req.body.plan_price;
    var sql = "insert into epardesh_categories(plan_type,plan_name,plan_price) values(?,?,?)";
    var values = [plan_type, plan_name, plan_price]
    connection.query(sql, values, function(err, rows) {
        if (err) {
            console.log(err)
            var errorMsg = 'some error occurred';
            sendResponse.sendErrorMessage(errorMsg, res);
        } else {
            var msg = "inserted successfully"
            sendResponse.sendSuccessData(msg, res);
        }
    })
});

/*
 * --------------------------------------------------------------------------
 * view_plans
 * ---------------------------------------------------------------------------
 */
router.post('/view_plans', function(req, res, next) {
    var sql = "select * from plans";
    connection.query(sql, function(err, rows) {
        if (err) {
            console.log(err)
            var errorMsg = 'some error occurred';
            sendResponse.sendErrorMessage(errorMsg, res);
        } else {
            sendResponse.sendSuccessData(rows, res);
        }
    })
});

/*
 * --------------------------------------------------------------------------
 * edit_plans
 * ---------------------------------------------------------------------------
 */
router.post('/edit_plans', function(req, res, next) {
    var plan_id = req.body.plan_id;
    var plan_type = req.body.plan_type;
    var plan_name = req.body.plan_name;
    var plan_price = req.body.plan_price;
    var manValues = [plan_id, plan_type, plan_name, plan_price]
    async.waterfall([
        function(callback) {
            func.checkBlank(res, manValues, callback);
        }],
            function(err, updatePopup, critical) {
                var sql = "select * from plans where id=?;"
                var values = [plan_id]
                connection.query(sql, values, function(err, rows) {
                    if (err) {
                        console.log(err)
                        var errorMsg = 'some error occurred';
                        sendResponse.sendErrorMessage(errorMsg, res);
                    } else {
                        if (rows.length > 0) {
                            var update_query = "update plans set plan_type = ?, plan_name = ?, plan_price = ? where id = ?";
                            var values_to_update = [plan_type, plan_name, plan_price, plan_id]
                            connection.query(update_query, values_to_update, function(err, rows1) {
                                if (err) {
                                    console.log(err)
                                    var errorMsg = 'some error occurred';
                                    sendResponse.sendErrorMessage(errorMsg, res);
                                } else {
                                    var data = {}
                                    sendResponse.sendSuccessData(data, res);
                                }
                            })
                        } else {
                            var msg = "plan does not exist"
                            sendResponse.sendErrorMessage(msg, res);
                        }
                    }
                })
            });
});



/*
 * --------------------------------------------------------------------------
 * delete_plans
 * ---------------------------------------------------------------------------
 */
router.post('/delete_plans', function(req, res, next) {
    var plan_id = req.body.plan_id;
    var sql = "DELETE FROM plans WHERE plan_id=?;";
    var values = [plan_id]
    connection.query(sql, values, function(err, rows) {
        if (err) {
            console.log(err)
            var errorMsg = 'some error occurred';
            sendResponse.sendErrorMessage(errorMsg, res);
        } else {
            var msg = "deleted successfully"
            sendResponse.sendSuccessData(msg, res);
        }
    })
});

/*
 * --------------------------------------------------------------------------
 * approve_ad
 * ---------------------------------------------------------------------------
 */
//router.post('/approve_ad', function (req, res, next) {
//    var ad_id = req.body.ad_id;
//    var status = req.body.status;
//    var date_approved = new Date();
//    var expiry_date = date.addDays(date_approved, 15);
//    console.log(date_approved)
//    console.log(expiry_date)
//    if (status == 1) {
//        var sql = "select ad_type from epardesh_ads where id=?";
//        var values = [ad_id];
//        connection.query(sql, values, function (err, rows) {
//            if (err) {
//                console.log(err)
//                var errorMsg = 'some error occurred';
//                sendResponse.sendErrorMessage(errorMsg, res);
//            } else {
//                console.log(rows[0])
//                if (rows[0].ad_type == '0') {
//                    console.log("case1")
//                    var sql1 = "UPDATE epardesh_ads SET approved_status='1', date_approved=?,expiry_date=? WHERE id=?;"
//                    var values1 = [date_approved, expiry_date, ad_id];
//                    connection.query(sql1, values1, function (err, rows1) {
//                        if (err) {
//                            console.log(err)
//                            var errorMsg = 'some error occurred';
//                            sendResponse.sendErrorMessage(errorMsg, res);
//                        } else {
//                            var msg = "updated successfully"
//                            sendResponse.sendSuccessData(msg, res);
//                        }
//                    })
//                } else {
//                    console.log("case2")
//                    var sql2 = "UPDATE epardesh_ads SET approved_status='1', date_approved=? WHERE id=?;"
//                    var values2 = [date_approved, ad_id];
//                    connection.query(sql2, values2, function (err, rows2) {
//                        if (err) {
//                            console.log(err)
//                            var errorMsg = 'some error occurred';
//                            sendResponse.sendErrorMessage(errorMsg, res);
//                        } else {
//                            var msg = "updated successfully"
//                            sendResponse.sendSuccessData(msg, res);
//                        }
//                    })
//                }
//            }
//        })
//    } else if (status == '2') {
//        var set_empty = '';
//        var sql = "select ad_type from epardesh_ads where id=?";
//        var values = [ad_id];
//        connection.query(sql, values, function (err, rows) {
//            if (err) {
//                console.log(err)
//                var errorMsg = 'some error occurred';
//                sendResponse.sendErrorMessage(errorMsg, res);
//            } else {
//                console.log(rows[0])
//                if (rows[0].status == '0') {
//
//                    console.log("case1")
//                    var sql1 = "UPDATE epardesh_ads SET approved_status='2', date_approved=?,expiry_date=? WHERE id=?;"
//                    var values1 = [set_empty, set_empty, ad_id];
//                    connection.query(sql1, values1, function (err, rows1) {
//                        if (err) {
//                            console.log(err)
//                            var errorMsg = 'some error occurred';
//                            sendResponse.sendErrorMessage(errorMsg, res);
//                        } else {
//                            var msg = "updated successfully"
//                            sendResponse.sendSuccessData(msg, res);
//                        }
//                    })
//                } else {
//                    console.log("case2")
//                    var sql2 = "UPDATE epardesh_ads SET approved_status='2', date_approved=? WHERE id=?;"
//                    var values2 = [set_empty, ad_id];
//                    connection.query(sql2, values2, function (err, rows2) {
//                        if (err) {
//                            console.log(err)
//                            var errorMsg = 'some error occurred';
//                            sendResponse.sendErrorMessage(errorMsg, res);
//                        } else {
//                            var msg = "updated successfully"
//                            sendResponse.sendSuccessData(msg, res);
//                        }
//                    })
//                }
//            }
//        })
//    } else {
//        var errorMsg = 'invalid status';
//        sendResponse.sendErrorMessage(errorMsg, res);
//    }
//});

//router.post('/approve_ad', function (req, res, next) {
//    var ad_id = req.body.ad_id;
//    var status = req.body.status;
//    var date_approved = new Date();
//    var expiry_date = date.addDays(date_approved, 30);
//    var manValues = [ad_id, status, expiry_date]
//    async.waterfall([
//        function (callback) {
//            func.checkBlank(res, manValues, callback);
//        }],
//            function (err, updatePopup, critical) {
//                if (status == 1) {
//                    var sql = "select epardesh_ads.ad_type,user.email from epardesh_ads join user on epardesh_ads.user_id=user.id where epardesh_ads.id=?";
//                    var values = [ad_id];
//                    connection.query(sql, values, function (err, rows) {
//                        if (err) {
//                            console.log(err)
//                            var errorMsg = 'some error occurred';
//                            sendResponse.sendErrorMessage(errorMsg, res);
//                        } else {
//                            if (rows.length > 0) {
//                                if (rows[0].ad_type == '0') {
//                                    var email = rows[0].email;
//                                    console.log("email")
//                                    console.log(email)
//                                    console.log("case1")
//                                    var sql1 = "UPDATE epardesh_ads SET approved_status='1', date_approved=?,expiry_date=? WHERE id=?;"
//                                    var values1 = [date_approved, expiry_date, ad_id];
//                                    connection.query(sql1, values1, function (err, rows1) {
//                                        if (err) {
//                                            console.log(err)
//                                            var errorMsg = 'some error occurred';
//                                            sendResponse.sendErrorMessage(errorMsg, res);
//                                        } else {
//                                            var str = "<p>Hi,</p>";
//                                            str += "<p>Congratulations,your ad has been approved</p>";
//                                            str += "<p>Regards,</p>";
//                                            str += "<p>Team Epardesh</p>";
//                                            var mailOptions = {to: email, subject: 'AD Approved', html: str};
//                                            transporter.sendMail(mailOptions, function (error, info) {
//                                                if (error) {
//                                                    var errorMsg = 'some error occurred';
//                                                    sendResponse.sendErrorMessage(errorMsg, res);
//                                                } else {
//                                                    console.log('Message sent: ');
//                                                }
//                                            });
//                                            var data = {}
//                                            sendResponse.sendSuccessData(data, res);
//                                        }
//                                    })
//                                } else {
//                                    console.log("case2")
//                                    var email = rows[0].email;
//                                    var sql2 = "UPDATE epardesh_ads SET approved_status='1', date_approved=? WHERE id=?;"
//                                    var values2 = [date_approved, ad_id];
//                                    connection.query(sql2, values2, function (err, rows2) {
//                                        if (err) {
//                                            console.log(err)
//                                            var errorMsg = 'some error occurred';
//                                            sendResponse.sendErrorMessage(errorMsg, res);
//                                        } else {
//
//                                            var data = {}
//                                            sendResponse.sendSuccessData(data, res);
//                                            var str = "<p>Hi,</p>";
//                                            str += "<p>Congratulations,your ad has been approved</p>";
//                                            str += "<p>Regards,</p>";
//                                            str += "<p>Team Epardesh</p>";
//                                            var mailOptions = {to: email, subject: 'AD Approved', html: str};
//                                            transporter.sendMail(mailOptions, function (error, info) {
//                                                if (error) {
//                                                    var errorMsg = 'some error occurred';
//                                                    sendResponse.sendErrorMessage(errorMsg, res);
//                                                } else {
//                                                    console.log('Message sent: ');
//                                                }
//                                            });
//
//                                        }
//                                    })
//                                }
//                            } else {
//                                var errorMsg = 'Ad does not exist';
//                                sendResponse.sendErrorMessage(errorMsg, res);
//                            }
//                        }
//                    })
//                } else if (status == '2') {
//                    var set_empty = '';
//                    var sql = "select epardesh_ads.ad_type,user.email from epardesh_ads join user on epardesh_ads.user_id=user.id where epardesh_ads.id=?";
//                    var values = [ad_id];
//                    connection.query(sql, values, function (err, rows) {
//                        if (err) {
//                            console.log(err)
//                            var errorMsg = 'some error occurred';
//                            sendResponse.sendErrorMessage(errorMsg, res);
//                        } else {
//                            if (rows.length > 0) {
//                                if (rows[0].status == '0') {
//                                    var email1 = rows[0].email;
//                                    console.log("case1")
//                                    var sql1 = "UPDATE epardesh_ads SET approved_status='2', date_approved=?,expiry_date=? WHERE id=?;"
//                                    var values1 = [set_empty, set_empty, ad_id];
//                                    connection.query(sql1, values1, function (err, rows1) {
//                                        if (err) {
//                                            console.log(err)
//                                            var errorMsg = 'some error occurred';
//                                            sendResponse.sendErrorMessage(errorMsg, res);
//                                        } else {
//                                            var str = "<p>Hi,</p>";
//                                            str += "<p>Congratulations,your ad has been approved</p>";
//                                            str += "<p>Regards,</p>";
//                                            str += "<p>Team Epardesh</p>";
//                                            var mailOptions = {to: email1, subject: 'AD Approved', html: str};
//                                            transporter.sendMail(mailOptions, function (error, info) {
//                                                if (error) {
//                                                    var errorMsg = 'some error occurred';
//                                                    sendResponse.sendErrorMessage(errorMsg, res);
//                                                } else {
//                                                    console.log('Message sent: ');
//                                                }
//                                            });
//                                            var data = {}
//                                            sendResponse.sendSuccessData(data, res);
//                                        }
//                                    })
//                                } else {
//                                    console.log("case2")
//                                    var email = rows[0].email;
//                                    var sql2 = "UPDATE epardesh_ads SET approved_status='2', date_approved=? WHERE id=?;"
//                                    var values2 = [set_empty, ad_id];
//                                    connection.query(sql2, values2, function (err, rows2) {
//                                        if (err) {
//                                            console.log(err)
//                                            var errorMsg = 'some error occurred';
//                                            sendResponse.sendErrorMessage(errorMsg, res);
//                                        } else {
//                                            var str = "<p>Hi,</p>";
//                                            str += "<p>Congratulations,your ad has been approved</p>";
//                                            str += "<p>Regards,</p>";
//                                            str += "<p>Team Epardesh</p>";
//                                            var mailOptions = {to: email, subject: 'AD Approved', html: str};
//                                            transporter.sendMail(mailOptions, function (error, info) {
//                                                if (error) {
//                                                    var errorMsg = 'some error occurred';
//                                                    sendResponse.sendErrorMessage(errorMsg, res);
//                                                } else {
//                                                    console.log('Message sent: ');
//                                                }
//                                            });
//                                            var data = {}
//                                            sendResponse.sendSuccessData(data, res);
//                                        }
//                                    })
//                                }
//                            } else {
//                                var errorMsg = 'Ad does not exist';
//                                sendResponse.sendErrorMessage(errorMsg, res);
//                            }
//                        }
//                    })
//                } else {
//                    var errorMsg = 'invalid status';
//                    sendResponse.sendErrorMessage(errorMsg, res);
//                }
//            });
//});


router.post('/approve_ad', function(req, res, next) {
    var ad_id = req.body.ad_id;
    var status = 1;
    var date_approved = new Date();
    var expiry_date = date.addDays(date_approved, 30);
    var manValues = [ad_id, status, expiry_date]
    console.log(manValues)
    async.waterfall([
        function(callback) {
            func.checkBlank(res, manValues, callback);
        }],
            function(err, updatePopup, critical) {
                if (status == 1) {
                    var sql = "select epardesh_ads.ad_type,epardesh_ads.ad_tittle,user.email,user.first_name,user.last_name from epardesh_ads join user on epardesh_ads.user_id=user.id where epardesh_ads.id=?";
                    var values = [ad_id];
                    connection.query(sql, values, function(err, rows) {
                        if (err) {
                            console.log(err)
                            var errorMsg = 'some error occurred';
                            sendResponse.sendErrorMessage(errorMsg, res);
                        } else {
                            if (rows.length > 0) {
                                var first_name = rows[0].first_name;
                                var last_name = rows[0].last_name;
                                var ad_tittle = rows[0].ad_tittle;
                                if (rows[0].ad_type == '0') {
                                    var email = rows[0].email;
                                    console.log("email")
                                    console.log(email)
                                    console.log("case1")
                                    var sql1 = "UPDATE epardesh_ads SET approved_status='1', date_approved=?,expiry_date=? WHERE id=?;"
                                    var values1 = [date_approved, expiry_date, ad_id];
                                    connection.query(sql1, values1, function(err, rows1) {
                                        if (err) {
                                            console.log(err)
                                            var errorMsg = 'some error occurred';
                                            sendResponse.sendErrorMessage(errorMsg, res);
                                        } else {
//                                            var str = "<p>Hi,</p>";
//                                            str += "<p>Congratulations,your ad has been approved</p>";
//                                            str += "<p>Regards,</p>";
//                                            str += "<p>Team Epardesh</p>";


                                            str = '<div style="margin:0;padding:0">'
                                            str += '<table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin:auto;font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif;max-width:600px;font-size:12px;line-height:19px;padding:20px 0 5px 0;background:url(https://ci5.googleusercontent.com/proxy/pWu4n-E06G76wQX5WZPtH0pMj5tXgEau8JnyhTv1quxgTTX3Z1me2OWZ5E23_LNgcrwwQ6fA7bYJ23xnVwXKh0E=s0-d-e1-ft#http://teja2.kuikr.com/images/mailer-bg.jpg) repeat #f9f9f9;color:#444444;text-align:center">'
                                            str += '<tbody>'
                                            str += '<tr>'
                                            str += '<td>'
                                            str += '<table width="90%" border="0" align="center" cellspacing="0" cellpadding="0">'
                                            str += '<tbody>'
                                            str += '<tr>'
                                            str += '<td>'
                                            str += '<div style="float:left">'
                                            str += '<a href=' + classified_url + ' target="_blank" data-saferedirecturl="https://www.google.com/url?hl=en&amp;q=http://www.quikr.com&amp;source=gmail&amp;ust=1475136031439000&amp;usg=AFQjCNGhNxC9AQAEgHlXpFU2BgKR8Yd_JQ"><img src="' + url + 'logo.jpg" width="90" alt="" class="CToWUd"></a>'
                                            str += '</div>'
                                            str += '<div style="float:right;text-align:center;margin-top:3px">'
                                            str += '<a style="width:125px;min-height:30px;color:#008bcf;background:#f9f9f9;border:1px solid #008bcf;display:block;text-decoration:none;font-size:13px;border-radius:3px;line-height:30px" href=' + classified_url + ' target="_blank" data-saferedirecturl=' + classified_url + '>Post Free Ad</a>'
                                            str += '</div>'
                                            str += '</td>'
                                            str += '</tr>'
                                            str += '<tr>'
                                            str += '<td style="width:100%;padding:5px;background:#ffffff;border:1px solid #e3e3e3" align="left">'
                                            str += '<div style="min-height:38px"></div>'
                                            str += '<div style="width:93%;float:left;padding:0 3.5% 7px 3.5%">'
                                            str += '<p style="text-align:center;margin:0 0 2px 0;padding:0">'
                                            str += '<img src="https://ci4.googleusercontent.com/proxy/6SXoUD60YVpkgRaAA7d2HmXhpcW__ROAcN1mq2ukP-Kqm43-YNUCOkJdw9Y4LrTppi2YcFkLzg93Zw=s0-d-e1-ft#http://teja2.kuikr.com/images/ad.png" width="35" height="35" alt="" class="CToWUd">'
                                            str += '</p>'
                                            str += '<div style="font-size:25px;padding:5px 0;text-align:center;color:#000000;margin-bottom:30px">'
                                            str += '<p style="margin:0;padding:0;line-height:25px">Ad Posted Successfully!</p>'
                                            str += '<p style="margin:0;padding:5px 0 0 0;font-size:16px">'
                                            str += 'For posting your ad <a href=' + classified_url + 'ad-details/' + ad_id + ' style="color:#008bcf;text-decoration:none" target="_blank" data-saferedirecturl="https://www.google.com/url?hl=en&amp;q=http://Bhubaneswar.quikr.com/3%2BBed%2B3%2BBath%2Bhouse%2Bon%2BRent%252C%2BLewis%2BRoad%2B%252C%2BBhubaneswar-W0QQAdIdZ278424946&amp;source=gmail&amp;ust=1475136031439000&amp;usg=AFQjCNE36Yz2sXglJnWerLuAuVHGXOWSbg">' + ad_tittle + '</a>'
                                            str += '</p>'
                                            str += '<div style="width:140px;min-height:2px;background:#008bd0;margin:auto;margin-top:15px"></div>'
                                            str += '</div>'
                                            str += '<h1 style="font-weight:normal;padding:0;margin:0;font-size:20px">Hello ' + first_name + ' ' + last_name + ',</h1>'
                                            str += '<p style="margin-top:0;text-align:justify">'
                                            str += 'Thanks you for posting your Ad on EPardesh.<br>'
                                            str += 'Ad Title: ' + ad_tittle + ''
                                            str += '</p>'
                                            str += '<p style="margin-top:0;text-align:justify">'
                                            str += 'Remember, Your Ad will <strong>expire</strong> automatically after <strong>30 days.</strong>'
                                            str += '</p>'
                                            str += '<div style="width:100%;float:left;padding:15px 0 30px 0;text-align:center">'
                                            str += '<a style="width:136px;min-height:38px;color:#008bcf;border:1px solid #008bcf;display:inline-block;text-decoration:none;font-size:13px;border-radius:3px;line-height:38px;margin:5px 5px" href=' + classified_url + 'ad-details/' + ad_id + ' target="_blank" data-saferedirecturl="https://www.google.com/url?hl=en&amp;q=http://Bhubaneswar.quikr.com/3%2BBed%2B3%2BBath%2Bhouse%2Bon%2BRent%252C%2BLewis%2BRoad%2B%252C%2BBhubaneswar-W0QQAdIdZ278424946&amp;source=gmail&amp;ust=1475136031439000&amp;usg=AFQjCNE36Yz2sXglJnWerLuAuVHGXOWSbg">View Ad</a>'
                                            str += '</div>'
                                            str += '<table width="100%" style="background:#f2f2f2">'
                                            str += '<tbody><tr>'
                                            str += '<td height="20"></td>'
                                            str += '</tr>'
                                            str += '<tr>'
                                            str += '<td align="center">'
                                            str += '<strong>Did you know?</strong> You get 5 times more replies <br>on your ad by adding photos'
                                            str += '</td>'
                                            str += '</tr>'
                                            str += '<tr>'
                                            str += '<td height="5"></td>'
                                            str += '</tr>'
                                            str += '<tr>'
                                            str += '<td align="center">'
                                            str += '<a style="background:#008bd0;border:none;min-width:150px;max-width:195px;padding:10px 2px;font-size:14px;color:#ffffff;border-radius:3px;text-decoration:none;display:block;text-align:center" href=' + classified_url + 'setting target="_blank" data-saferedirecturl="https://www.google.com/url?hl=en&amp;q=http://Bhubaneswar.quikr.com/bianji/a278424946?allowid%3DMTI5MTA4MTU3%26allowmail%3DcmFiaW5kcmEuZGFzQGdtYWlsLmNvbQ%3D%3D%26mox%3D1e2506278424946ace3bc445b43d8da378f3d8b1459e&amp;source=gmail&amp;ust=1475136031439000&amp;usg=AFQjCNGXutD9Gkwk-ViLFpnCPTRrqpiEXg">Add Photos</a>'
                                            str += '</td>'
                                            str += '</tr>'
                                            str += '<tr>'
                                            str += '<td height="20"></td>'
                                            str += '</tr>'
                                            str += '</tbody></table>'
                                            str += '<p style="text-align:justify">'
                                            str += 'Do not Share This email with others as it gives direct access to your EPardesh account.'
                                            str += '</p>'
                                            str += '<div style="width:93%;float:left;padding:20px 3.5% 20px 0">'
                                            str += 'Thank you,<br>'
                                            str += '<strong>Team EPardesh</strong>'
                                            str += '</div>'
                                            str += '<div style="width:100%;float:left;padding-top:15px;border-top:1px solid #e6e6e6">'
                                            str += '<div style="float:left;width:270px;padding-bottom:5px">'
                                            str += '<div style="float:left;width:25px;min-height:25px;margin:3px 10px">'
                                            str += '<img src="https://ci3.googleusercontent.com/proxy/Vfl_caiNW7Jr5UU5KDz4Xy3zibG9pR1be_BNkaBxCLhlsgHMWvgNmQemm66hlDC1dZkxkXEU8FNm6pz2Tu14=s0-d-e1-ft#http://teja2.kuikr.com/images/premium.png" width="25" height="24" alt="" class="CToWUd">'
                                            str += '</div>'
                                            str += '<p style="margin:0;padding:0;line-height:15px">'
                                            str += '<strong>Premium ads</strong> give your ad more visibility in comparison to free ads.'
                                            str += '</p>'
                                            str += '</div>'
                                            str += '<div style="width:auto;float:right;text-align:center;padding:5px 0 0 10px">'
                                            str += '<a style="display:inline-block;color:#008bd0;font-size:13px;text-decoration:none" href=' + classified_url + 'setting target="_blank" data-saferedirecturl="https://www.google.com/url?hl=en&amp;q=http://Bhubaneswar.quikr.com/landing-premium-ads-upgrade/?adId%3D278424946%26upgrade%3D1%26allowid%3DMTI5MTA4MTU3%26allowmail%3DcmFiaW5kcmEuZGFzQGdtYWlsLmNvbQ%3D%3D%26utm_medium%3Dmailer%26utm_source%3Dpremium_ads%26utm_campaign%3DUpgrade_freeadrepost_expiry_before5day&amp;source=gmail&amp;ust=1475136031439000&amp;usg=AFQjCNF0ipQuGyumPpQYamaYxSpCn373wg">Upgrade to Premium</a>'
                                            str += '</div>'
                                            str += '</div>'
                                            str += '</div>'
                                            str += '</td>'
                                            str += '</tr>'
                                            str += '<tr>'
                                            str += '<td>'
                                            str += '<p align="center" style="color:#212121;padding:0;margin:10px 0 0 0">'
                                            str += '1000+ Cities &nbsp; <span style="color:#008bcf">|</span> &nbsp;'
                                            str += '70+ Categories &nbsp; <span style="color:#008bcf">|</span> &nbsp;'
                                            str += '1Cr+ Listings'
                                            str += '</p>'
                                            str += '<div style="width:100%;text-align: center;clear:both;padding:20px 0">'
//                                            str += '<a href="https://play.google.com/store/apps/details?id=com.quikr&amp;referrer=af_tranid%3D3S99EN98WQXX6ZR3%26pid%3Dmailer" style="width:85px;min-height:30px;border:1px solid #008bcf;display:inline-block;border-radius:2px;color:#444444;background:#f9f9f9" target="_blank" data-saferedirecturl="https://www.google.com/url?hl=en&amp;q=https://play.google.com/store/apps/details?id%3Dcom.quikr%26referrer%3Daf_tranid%253D3S99EN98WQXX6ZR3%2526pid%253Dmailer&amp;source=gmail&amp;ust=1475136031439000&amp;usg=AFQjCNFcar2V6tY9R6jM6VG6-ddrp59dXg">'
                                            str += '<span style="width:20px;min-height:20px;float:left;display:block;margin:4px 3px 0px 2px">'
//                                            str += '<img src="https://ci6.googleusercontent.com/proxy/MP4aRNpyQnAC3hkccajfYvc9tsbaS4oMbrpjqdCTJXICIIllSv8iY8pNRLCUXrrm-LQ5Ks9C4sssyw14Zor5=s0-d-e1-ft#http://teja2.kuikr.com/images/android.png" width="20" height="20" alt="" class="CToWUd">'
                                            str += '</span>'
                                            str += '<p style="float:left;margin:1px 0 0 0;padding-left:0;line-height:normal;text-align:left">'
                                            str += '<span style="display:block;font-size:10px">Android</span>'
                                            str += '<span style="display:block;font-size:12px;color:#008bcf;line-height:11px">Play Store</span>'
                                            str += '</p>'
                                            str += '</a>'
//                                            str += '<a href="https://itunes.apple.com/in/app/quikr-free-local-classifieds/id632051273?mt=8" style="width:85px;min-height:30px;border:1px solid #008bcf;display:inline-block;border-radius:2px;color:#444444;margin:0 4px;background:#f9f9f9" target="_blank" data-saferedirecturl="https://www.google.com/url?hl=en&amp;q=https://itunes.apple.com/in/app/quikr-free-local-classifieds/id632051273?mt%3D8&amp;source=gmail&amp;ust=1475136031439000&amp;usg=AFQjCNGuD0uxzd0FVk3TlFHelG13DT6sFg">'
                                            str += '<span style="width:20px;min-height:20px;float:left;display:block;margin:4px 3px 0px 2px">'
//                                            str += '<img src="https://ci6.googleusercontent.com/proxy/Q6V9RuZlZt_1sQd_0PV1980nqVilyi3xnglxnN1rUcVjSfoxw4jwG0kt15nN7--LDMHPLl3oPw48CXKjzA=s0-d-e1-ft#http://teja2.kuikr.com/images/apple.png" width="20" height="20" alt="" class="CToWUd">'
                                            str += '</span>'
                                            str += '<p style="float:left;margin:1px 0 0 0;padding-left:0;line-height:normal;text-align:left">'
                                            str += '<span style="display:block;font-size:10px">Apple</span>'
                                            str += '<span style="display:block;font-size:12px;color:#008bcf;line-height:11px">App Store</span>'
                                            str += '</p>'
                                            str += '</a>'
//                                            str += '<a href="http://www.windowsphone.com/en-us/store/app/quikr-buy-sell/6d36aa77-19a0-4adc-af15-0496dcc05557" style="width:85px;min-height:30px;border:1px solid #008bcf;display:inline-block;border-radius:2px;color:#444444;background:#f9f9f9" target="_blank" data-saferedirecturl="https://www.google.com/url?hl=en&amp;q=http://www.windowsphone.com/en-us/store/app/quikr-buy-sell/6d36aa77-19a0-4adc-af15-0496dcc05557&amp;source=gmail&amp;ust=1475136031439000&amp;usg=AFQjCNGbyaQ6iOHeKyhj33CMrudzouAyfQ">'
                                            str += '<span style="width:20px;min-height:20px;float:left;display:block;margin:4px 3px 0px 2px">'
//                                            str += '<img src="https://ci3.googleusercontent.com/proxy/LbeYrRZTxBZtPYVdXZBxTyTyB-yYho359nKiWgCY9A4q61icMx2aBXTtIpiMKxLZmBh88NkLVL0xzvhPVV7f=s0-d-e1-ft#http://teja2.kuikr.com/images/windows.png" width="20" height="20" alt="" class="CToWUd">'
                                            str += '</span>'
                                            str += '<p style="float:left;margin:1px 0 0 0;padding-left:0;line-height:normal;text-align:left">'
                                            str += '<span style="display:block;font-size:10px">Windows</span>'
                                            str += '<span style="display:block;font-size:12px;color:#008bcf;line-height:11px">Store</span>'
                                            str += '</p>'
                                            str += '</a>'
                                            str += '</div>'
                                            str += '<div style="width:100%;text-align:center;clear:both">'
//                                            str += '<a href="https://www.facebook.com/QuikrFans" style="margin:0 1px" target="_blank" data-saferedirecturl="https://www.google.com/url?hl=en&amp;q=https://www.facebook.com/QuikrFans&amp;source=gmail&amp;ust=1475136031439000&amp;usg=AFQjCNGRU0M7-98rZv-jAOi_25lfd0Bamw">'
//                                            str += '<img src="https://ci3.googleusercontent.com/proxy/HkSHX3MC6oYFTkLmo8aF2_xTRH-gCetGpDQsNlk6VtD5DK5BbjFv9w-IHL5C24mptN7D3QonSRiqUA=s0-d-e1-ft#http://teja2.kuikr.com/images/fb.png" width="28" alt="" class="CToWUd"></a>'
//                                            str += '<a href="https://twitter.com/Quikr" style="margin:0 1px" target="_blank" data-saferedirecturl="https://www.google.com/url?hl=en&amp;q=https://twitter.com/Quikr&amp;source=gmail&amp;ust=1475136031439000&amp;usg=AFQjCNE8YR6GTbCvsv6Xvtj9NslOB6hvGQ">'
//                                            str += '<img src="https://ci6.googleusercontent.com/proxy/xyUaouezm8_Y9Z0xGuS0EbEtpiFdpN8JzPRPVvkDGnrCOrT8H7AB-Z5Ss7YLTym1fFHznKepIv2JWlQ=s0-d-e1-ft#http://teja2.kuikr.com/images/tiw.png" width="28" alt="" class="CToWUd"></a>'
//                                            str += '<a href="https://plus.google.com/+quikr/posts" style="margin:0 1px" target="_blank" data-saferedirecturl="https://www.google.com/url?hl=en&amp;q=https://plus.google.com/%2Bquikr/posts&amp;source=gmail&amp;ust=1475136031439000&amp;usg=AFQjCNGZJuat1Om-N9FfTuYc9UD0-c2pTw">'
//                                            str += '<img src="https://ci5.googleusercontent.com/proxy/cl9AeYDJ61f93cBTY1kqsiGo5zSENu_d-jJ0r8kmdO3CeahgO5ZuTxz4uYX5G44wPTgpHzNOUcJk-nvREw=s0-d-e1-ft#http://teja2.kuikr.com/images/gmail.png" width="28" alt="" class="CToWUd"></a>'
//                                            str += '<a href="https://in.linkedin.com/company/quikr" style="margin:0 1px" target="_blank" data-saferedirecturl="https://www.google.com/url?hl=en&amp;q=https://in.linkedin.com/company/quikr&amp;source=gmail&amp;ust=1475136031439000&amp;usg=AFQjCNE1h6YVu-8jb8Z_zyzypstqPAa5MA">'
//                                            str += '<img src="https://ci3.googleusercontent.com/proxy/PhkIFgAT7a_Rp9pVUrbmqoE-1wuRPTUXUQRU5E2UDDqUBsW_5tF-gcuH9Sz1dDT9h3aPFezbu_x9KO8K7a04Pg=s0-d-e1-ft#http://teja2.kuikr.com/images/linkedin.png" width="28" alt="" class="CToWUd"></a>'
//                                            str += '<a href="https://www.youtube.com/user/quikrclassifieds" style="margin:0 1px" target="_blank" data-saferedirecturl="https://www.google.com/url?hl=en&amp;q=https://www.youtube.com/user/quikrclassifieds&amp;source=gmail&amp;ust=1475136031439000&amp;usg=AFQjCNHO37zKPib-LLUe5GzWAMNIKRFyHw">'
//                                            str += '<img src="https://ci6.googleusercontent.com/proxy/mowjJtVgoX1EGVo2kiSIh-cfZCgRdSafFImBQkXKE1S71jh1DqzZ2ou83-Smpr2FvRKFNuysyEgRNEFG-hx7=s0-d-e1-ft#http://teja2.kuikr.com/images/youtube.png" width="28" alt="" class="CToWUd"></a>'
                                            str += '</div>'
                                            str += '<div style="width:95%;clear:both;text-align:center;font-size:11px;color:#444444;margin:auto">'
                                            str += '<p style="margin:0;padding:3px 0;line-height:13px">'
                                            str += 'You are receiving this mail from EPardesh. You can always Unsubscribe.'
                                            str += '</p>'
                                            str += '<p style="margin:0;padding:3px 0;line-height:13px">'
                                            str += 'For any assistance, visit our'
                                            str += '<a href=' + classified_url + ' style="color:#007ebc;text-decoration:none" target="_blank" data-saferedirecturl="https://www.google.com/url?hl=en&amp;q=http://quikr.com/help/&amp;source=gmail&amp;ust=1475136031439000&amp;usg=AFQjCNEJ5ICEoswmSXfvLz8n_MEPSjNDfg">Help center</a>'
                                            str += 'or write to us at <a href=' + classified_url + ' style="color:#007ebc;text-decoration:none" target="_blank">support@epardesh.com.</a>'
                                            str += '</p>'
                                            str += '<p style="padding:2px 0 0 0;margin:0;font-size:12px">© <a href=' + classified_url + ' target="_blank" data-saferedirecturl="https://www.google.com/url?hl=en&amp;q=http://www.quikr.com&amp;source=gmail&amp;ust=1475136031439000&amp;usg=AFQjCNGhNxC9AQAEgHlXpFU2BgKR8Yd_JQ">' + classified_url + '</a></p>'
                                            str += '</div>'
                                            str += '</td>'
                                            str += '</tr>'
                                            str += '</tbody>'
                                            str += '</table>'
                                            str += '</td>'
                                            str += '</tr>'
                                            str += '</tbody>'
                                            str += '</table>'
                                            str += '</div>'
                                            var mailOptions = {to: email, subject: 'AD Approved', html: str};
                                            transporter.sendMail(mailOptions, function(error, info) {
                                                if (error) {
                                                    var errorMsg = 'some error occurred';
                                                    sendResponse.sendErrorMessage(errorMsg, res);
                                                } else {
                                                    console.log('Message sent: ');
                                                }
                                            });
                                            var data = {}
                                            sendResponse.sendSuccessData(data, res);
                                        }
                                    })
                                } else {
                                    console.log("case2")
                                    var email = rows[0].email;
                                    var sql2 = "UPDATE epardesh_ads SET approved_status='1', date_approved=?,expiry_date=? WHERE id=?;"
                                    var values2 = [date_approved, expiry_date, ad_id];
                                    connection.query(sql2, values2, function(err, rows2) {
                                        if (err) {
                                            console.log('err top')
                                            console.log(err)
                                            var errorMsg = 'some error occurred';
                                            sendResponse.sendErrorMessage(errorMsg, res);
                                        } else {
                                            var data = {}
                                            sendResponse.sendSuccessData(data, res);
//                                            var str = "<p>Hi,</p>";
//                                            str += "<p>Congratulations,your ad has been approved</p>";
//                                            str += "<p>Regards,</p>";
//                                            str += "<p>Team Epardesh</p>";

                                            str = '<div style="margin:0;padding:0">'
                                            str += '<table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin:auto;font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif;max-width:600px;font-size:12px;line-height:19px;padding:20px 0 5px 0;background:url(https://ci5.googleusercontent.com/proxy/pWu4n-E06G76wQX5WZPtH0pMj5tXgEau8JnyhTv1quxgTTX3Z1me2OWZ5E23_LNgcrwwQ6fA7bYJ23xnVwXKh0E=s0-d-e1-ft#http://teja2.kuikr.com/images/mailer-bg.jpg) repeat #f9f9f9;color:#444444;text-align:center">'
                                            str += '<tbody>'
                                            str += '<tr>'
                                            str += '<td>'
                                            str += '<table width="90%" border="0" align="center" cellspacing="0" cellpadding="0">'
                                            str += '<tbody>'
                                            str += '<tr>'
                                            str += '<td>'
                                            str += '<div style="float:left">'
                                            str += '<a href=' + classified_url + ' target="_blank" data-saferedirecturl="https://www.google.com/url?hl=en&amp;q=http://www.quikr.com&amp;source=gmail&amp;ust=1475136031439000&amp;usg=AFQjCNGhNxC9AQAEgHlXpFU2BgKR8Yd_JQ"><img src="' + url + 'logo.jpg" width="90" alt="" class="CToWUd"></a>'
                                            str += '</div>'
                                            str += '<div style="float:right;text-align:center;margin-top:3px">'
                                            str += '<a style="width:125px;min-height:30px;color:#008bcf;background:#f9f9f9;border:1px solid #008bcf;display:block;text-decoration:none;font-size:13px;border-radius:3px;line-height:30px" href=' + classified_url + ' target="_blank" data-saferedirecturl=' + classified_url + '>Post Free Ad</a>'
                                            str += '</div>'
                                            str += '</td>'
                                            str += '</tr>'
                                            str += '<tr>'
                                            str += '<td style="width:100%;padding:5px;background:#ffffff;border:1px solid #e3e3e3" align="left">'
                                            str += '<div style="min-height:38px"></div>'
                                            str += '<div style="width:93%;float:left;padding:0 3.5% 7px 3.5%">'
                                            str += '<p style="text-align:center;margin:0 0 2px 0;padding:0">'
                                            str += '<img src="https://ci4.googleusercontent.com/proxy/6SXoUD60YVpkgRaAA7d2HmXhpcW__ROAcN1mq2ukP-Kqm43-YNUCOkJdw9Y4LrTppi2YcFkLzg93Zw=s0-d-e1-ft#http://teja2.kuikr.com/images/ad.png" width="35" height="35" alt="" class="CToWUd">'
                                            str += '</p>'
                                            str += '<div style="font-size:25px;padding:5px 0;text-align:center;color:#000000;margin-bottom:30px">'
                                            str += '<p style="margin:0;padding:0;line-height:25px">Ad Posted Successfully!</p>'
                                            str += '<p style="margin:0;padding:5px 0 0 0;font-size:16px">'
                                            str += 'For posting your ad <a href=' + classified_url + 'ad-details/' + ad_id + ' style="color:#008bcf;text-decoration:none" target="_blank" data-saferedirecturl="https://www.google.com/url?hl=en&amp;q=http://Bhubaneswar.quikr.com/3%2BBed%2B3%2BBath%2Bhouse%2Bon%2BRent%252C%2BLewis%2BRoad%2B%252C%2BBhubaneswar-W0QQAdIdZ278424946&amp;source=gmail&amp;ust=1475136031439000&amp;usg=AFQjCNE36Yz2sXglJnWerLuAuVHGXOWSbg">' + ad_tittle + '</a>'
                                            str += '</p>'
                                            str += '<div style="width:140px;min-height:2px;background:#008bd0;margin:auto;margin-top:15px"></div>'
                                            str += '</div>'
                                            str += '<h1 style="font-weight:normal;padding:0;margin:0;font-size:20px">Hello ' + first_name + ' ' + last_name + ',</h1>'
                                            str += '<p style="margin-top:0;text-align:justify">'
                                            str += 'Thanks you for posting your Ad on EPardesh.<br>'
                                            str += 'Ad Title: ' + ad_tittle + ''
                                            str += '</p>'
                                            str += '<p style="margin-top:0;text-align:justify">'
                                            str += 'Remember, Your Ad will <strong>expire</strong> automatically after <strong>30 days.</strong>'
                                            str += '</p>'
                                            str += '<div style="width:100%;float:left;padding:15px 0 30px 0;text-align:center">'
                                            str += '<a style="width:136px;min-height:38px;color:#008bcf;border:1px solid #008bcf;display:inline-block;text-decoration:none;font-size:13px;border-radius:3px;line-height:38px;margin:5px 5px" href=' + classified_url + 'ad-details/' + ad_id + ' target="_blank" data-saferedirecturl="https://www.google.com/url?hl=en&amp;q=http://Bhubaneswar.quikr.com/3%2BBed%2B3%2BBath%2Bhouse%2Bon%2BRent%252C%2BLewis%2BRoad%2B%252C%2BBhubaneswar-W0QQAdIdZ278424946&amp;source=gmail&amp;ust=1475136031439000&amp;usg=AFQjCNE36Yz2sXglJnWerLuAuVHGXOWSbg">View Ad</a>'
                                            str += '</div>'
                                            str += '<table width="100%" style="background:#f2f2f2">'
                                            str += '<tbody><tr>'
                                            str += '<td height="20"></td>'
                                            str += '</tr>'
                                            str += '<tr>'
                                            str += '<td align="center">'
                                            str += '<strong>Did you know?</strong> You get 5 times more replies <br>on your ad by adding photos'
                                            str += '</td>'
                                            str += '</tr>'
                                            str += '<tr>'
                                            str += '<td height="5"></td>'
                                            str += '</tr>'
                                            str += '<tr>'
                                            str += '<td align="center">'
                                            str += '<a style="background:#008bd0;border:none;min-width:150px;max-width:195px;padding:10px 2px;font-size:14px;color:#ffffff;border-radius:3px;text-decoration:none;display:block;text-align:center" href=' + classified_url + 'setting target="_blank" data-saferedirecturl="https://www.google.com/url?hl=en&amp;q=http://Bhubaneswar.quikr.com/bianji/a278424946?allowid%3DMTI5MTA4MTU3%26allowmail%3DcmFiaW5kcmEuZGFzQGdtYWlsLmNvbQ%3D%3D%26mox%3D1e2506278424946ace3bc445b43d8da378f3d8b1459e&amp;source=gmail&amp;ust=1475136031439000&amp;usg=AFQjCNGXutD9Gkwk-ViLFpnCPTRrqpiEXg">Add Photos</a>'
                                            str += '</td>'
                                            str += '</tr>'
                                            str += '<tr>'
                                            str += '<td height="20"></td>'
                                            str += '</tr>'
                                            str += '</tbody></table>'
                                            str += '<p style="text-align:justify">'
                                            str += 'Do not Share This email with others as it gives direct access to your EPardesh account.'
                                            str += '</p>'
                                            str += '<div style="width:93%;float:left;padding:20px 3.5% 20px 0">'
                                            str += 'Thank you,<br>'
                                            str += '<strong>Team EPardesh</strong>'
                                            str += '</div>'
                                            str += '<div style="width:100%;float:left;padding-top:15px;border-top:1px solid #e6e6e6">'
                                            str += '<div style="float:left;width:270px;padding-bottom:5px">'
                                            str += '<div style="float:left;width:25px;min-height:25px;margin:3px 10px">'
                                            str += '<img src="https://ci3.googleusercontent.com/proxy/Vfl_caiNW7Jr5UU5KDz4Xy3zibG9pR1be_BNkaBxCLhlsgHMWvgNmQemm66hlDC1dZkxkXEU8FNm6pz2Tu14=s0-d-e1-ft#http://teja2.kuikr.com/images/premium.png" width="25" height="24" alt="" class="CToWUd">'
                                            str += '</div>'
                                            str += '<p style="margin:0;padding:0;line-height:15px">'
                                            str += '<strong>Premium ads</strong> give your ad more visibility in comparison to free ads.'
                                            str += '</p>'
                                            str += '</div>'
                                            str += '<div style="width:auto;float:right;text-align:center;padding:5px 0 0 10px">'
                                            str += '<a style="display:inline-block;color:#008bd0;font-size:13px;text-decoration:none" href=' + classified_url + 'setting target="_blank" data-saferedirecturl="https://www.google.com/url?hl=en&amp;q=http://Bhubaneswar.quikr.com/landing-premium-ads-upgrade/?adId%3D278424946%26upgrade%3D1%26allowid%3DMTI5MTA4MTU3%26allowmail%3DcmFiaW5kcmEuZGFzQGdtYWlsLmNvbQ%3D%3D%26utm_medium%3Dmailer%26utm_source%3Dpremium_ads%26utm_campaign%3DUpgrade_freeadrepost_expiry_before5day&amp;source=gmail&amp;ust=1475136031439000&amp;usg=AFQjCNF0ipQuGyumPpQYamaYxSpCn373wg">Upgrade to Premium</a>'
                                            str += '</div>'
                                            str += '</div>'
                                            str += '</div>'
                                            str += '</td>'
                                            str += '</tr>'
                                            str += '<tr>'
                                            str += '<td>'
                                            str += '<p align="center" style="color:#212121;padding:0;margin:10px 0 0 0">'
                                            str += '1000+ Cities &nbsp; <span style="color:#008bcf">|</span> &nbsp;'
                                            str += '70+ Categories &nbsp; <span style="color:#008bcf">|</span> &nbsp;'
                                            str += '1Cr+ Listings'
                                            str += '</p>'
                                            str += '<div style="width:100%;text-align: center;clear:both;padding:20px 0">'
//                                            str += '<a href="https://play.google.com/store/apps/details?id=com.quikr&amp;referrer=af_tranid%3D3S99EN98WQXX6ZR3%26pid%3Dmailer" style="width:85px;min-height:30px;border:1px solid #008bcf;display:inline-block;border-radius:2px;color:#444444;background:#f9f9f9" target="_blank" data-saferedirecturl="https://www.google.com/url?hl=en&amp;q=https://play.google.com/store/apps/details?id%3Dcom.quikr%26referrer%3Daf_tranid%253D3S99EN98WQXX6ZR3%2526pid%253Dmailer&amp;source=gmail&amp;ust=1475136031439000&amp;usg=AFQjCNFcar2V6tY9R6jM6VG6-ddrp59dXg">'
                                            str += '<span style="width:20px;min-height:20px;float:left;display:block;margin:4px 3px 0px 2px">'
//                                            str += '<img src="https://ci6.googleusercontent.com/proxy/MP4aRNpyQnAC3hkccajfYvc9tsbaS4oMbrpjqdCTJXICIIllSv8iY8pNRLCUXrrm-LQ5Ks9C4sssyw14Zor5=s0-d-e1-ft#http://teja2.kuikr.com/images/android.png" width="20" height="20" alt="" class="CToWUd">'
                                            str += '</span>'
                                            str += '<p style="float:left;margin:1px 0 0 0;padding-left:0;line-height:normal;text-align:left">'
                                            str += '<span style="display:block;font-size:10px">Android</span>'
                                            str += '<span style="display:block;font-size:12px;color:#008bcf;line-height:11px">Play Store</span>'
                                            str += '</p>'
                                            str += '</a>'
//                                            str += '<a href="https://itunes.apple.com/in/app/quikr-free-local-classifieds/id632051273?mt=8" style="width:85px;min-height:30px;border:1px solid #008bcf;display:inline-block;border-radius:2px;color:#444444;margin:0 4px;background:#f9f9f9" target="_blank" data-saferedirecturl="https://www.google.com/url?hl=en&amp;q=https://itunes.apple.com/in/app/quikr-free-local-classifieds/id632051273?mt%3D8&amp;source=gmail&amp;ust=1475136031439000&amp;usg=AFQjCNGuD0uxzd0FVk3TlFHelG13DT6sFg">'
                                            str += '<span style="width:20px;min-height:20px;float:left;display:block;margin:4px 3px 0px 2px">'
//                                            str += '<img src="https://ci6.googleusercontent.com/proxy/Q6V9RuZlZt_1sQd_0PV1980nqVilyi3xnglxnN1rUcVjSfoxw4jwG0kt15nN7--LDMHPLl3oPw48CXKjzA=s0-d-e1-ft#http://teja2.kuikr.com/images/apple.png" width="20" height="20" alt="" class="CToWUd">'
                                            str += '</span>'
                                            str += '<p style="float:left;margin:1px 0 0 0;padding-left:0;line-height:normal;text-align:left">'
                                            str += '<span style="display:block;font-size:10px">Apple</span>'
                                            str += '<span style="display:block;font-size:12px;color:#008bcf;line-height:11px">App Store</span>'
                                            str += '</p>'
                                            str += '</a>'
//                                            str += '<a href="http://www.windowsphone.com/en-us/store/app/quikr-buy-sell/6d36aa77-19a0-4adc-af15-0496dcc05557" style="width:85px;min-height:30px;border:1px solid #008bcf;display:inline-block;border-radius:2px;color:#444444;background:#f9f9f9" target="_blank" data-saferedirecturl="https://www.google.com/url?hl=en&amp;q=http://www.windowsphone.com/en-us/store/app/quikr-buy-sell/6d36aa77-19a0-4adc-af15-0496dcc05557&amp;source=gmail&amp;ust=1475136031439000&amp;usg=AFQjCNGbyaQ6iOHeKyhj33CMrudzouAyfQ">'
                                            str += '<span style="width:20px;min-height:20px;float:left;display:block;margin:4px 3px 0px 2px">'
//                                            str += '<img src="https://ci3.googleusercontent.com/proxy/LbeYrRZTxBZtPYVdXZBxTyTyB-yYho359nKiWgCY9A4q61icMx2aBXTtIpiMKxLZmBh88NkLVL0xzvhPVV7f=s0-d-e1-ft#http://teja2.kuikr.com/images/windows.png" width="20" height="20" alt="" class="CToWUd">'
                                            str += '</span>'
                                            str += '<p style="float:left;margin:1px 0 0 0;padding-left:0;line-height:normal;text-align:left">'
                                            str += '<span style="display:block;font-size:10px">Windows</span>'
                                            str += '<span style="display:block;font-size:12px;color:#008bcf;line-height:11px">Store</span>'
                                            str += '</p>'
                                            str += '</a>'
                                            str += '</div>'
                                            str += '<div style="width:100%;text-align:center;clear:both">'
//                                            str += '<a href="https://www.facebook.com/QuikrFans" style="margin:0 1px" target="_blank" data-saferedirecturl="https://www.google.com/url?hl=en&amp;q=https://www.facebook.com/QuikrFans&amp;source=gmail&amp;ust=1475136031439000&amp;usg=AFQjCNGRU0M7-98rZv-jAOi_25lfd0Bamw">'
//                                            str += '<img src="https://ci3.googleusercontent.com/proxy/HkSHX3MC6oYFTkLmo8aF2_xTRH-gCetGpDQsNlk6VtD5DK5BbjFv9w-IHL5C24mptN7D3QonSRiqUA=s0-d-e1-ft#http://teja2.kuikr.com/images/fb.png" width="28" alt="" class="CToWUd"></a>'
//                                            str += '<a href="https://twitter.com/Quikr" style="margin:0 1px" target="_blank" data-saferedirecturl="https://www.google.com/url?hl=en&amp;q=https://twitter.com/Quikr&amp;source=gmail&amp;ust=1475136031439000&amp;usg=AFQjCNE8YR6GTbCvsv6Xvtj9NslOB6hvGQ">'
//                                            str += '<img src="https://ci6.googleusercontent.com/proxy/xyUaouezm8_Y9Z0xGuS0EbEtpiFdpN8JzPRPVvkDGnrCOrT8H7AB-Z5Ss7YLTym1fFHznKepIv2JWlQ=s0-d-e1-ft#http://teja2.kuikr.com/images/tiw.png" width="28" alt="" class="CToWUd"></a>'
//                                            str += '<a href="https://plus.google.com/+quikr/posts" style="margin:0 1px" target="_blank" data-saferedirecturl="https://www.google.com/url?hl=en&amp;q=https://plus.google.com/%2Bquikr/posts&amp;source=gmail&amp;ust=1475136031439000&amp;usg=AFQjCNGZJuat1Om-N9FfTuYc9UD0-c2pTw">'
//                                            str += '<img src="https://ci5.googleusercontent.com/proxy/cl9AeYDJ61f93cBTY1kqsiGo5zSENu_d-jJ0r8kmdO3CeahgO5ZuTxz4uYX5G44wPTgpHzNOUcJk-nvREw=s0-d-e1-ft#http://teja2.kuikr.com/images/gmail.png" width="28" alt="" class="CToWUd"></a>'
//                                            str += '<a href="https://in.linkedin.com/company/quikr" style="margin:0 1px" target="_blank" data-saferedirecturl="https://www.google.com/url?hl=en&amp;q=https://in.linkedin.com/company/quikr&amp;source=gmail&amp;ust=1475136031439000&amp;usg=AFQjCNE1h6YVu-8jb8Z_zyzypstqPAa5MA">'
//                                            str += '<img src="https://ci3.googleusercontent.com/proxy/PhkIFgAT7a_Rp9pVUrbmqoE-1wuRPTUXUQRU5E2UDDqUBsW_5tF-gcuH9Sz1dDT9h3aPFezbu_x9KO8K7a04Pg=s0-d-e1-ft#http://teja2.kuikr.com/images/linkedin.png" width="28" alt="" class="CToWUd"></a>'
//                                            str += '<a href="https://www.youtube.com/user/quikrclassifieds" style="margin:0 1px" target="_blank" data-saferedirecturl="https://www.google.com/url?hl=en&amp;q=https://www.youtube.com/user/quikrclassifieds&amp;source=gmail&amp;ust=1475136031439000&amp;usg=AFQjCNHO37zKPib-LLUe5GzWAMNIKRFyHw">'
//                                            str += '<img src="https://ci6.googleusercontent.com/proxy/mowjJtVgoX1EGVo2kiSIh-cfZCgRdSafFImBQkXKE1S71jh1DqzZ2ou83-Smpr2FvRKFNuysyEgRNEFG-hx7=s0-d-e1-ft#http://teja2.kuikr.com/images/youtube.png" width="28" alt="" class="CToWUd"></a>'
                                            str += '</div>'
                                            str += '<div style="width:95%;clear:both;text-align:center;font-size:11px;color:#444444;margin:auto">'
                                            str += '<p style="margin:0;padding:3px 0;line-height:13px">'
                                            str += 'You are receiving this mail from EPardesh. You can always Unsubscribe.'
                                            str += '</p>'
                                            str += '<p style="margin:0;padding:3px 0;line-height:13px">'
                                            str += 'For any assistance, visit our'
                                            str += '<a href=' + classified_url + ' style="color:#007ebc;text-decoration:none" target="_blank" data-saferedirecturl="https://www.google.com/url?hl=en&amp;q=http://quikr.com/help/&amp;source=gmail&amp;ust=1475136031439000&amp;usg=AFQjCNEJ5ICEoswmSXfvLz8n_MEPSjNDfg">Help center</a>'
                                            str += 'or write to us at <a href=' + classified_url + ' style="color:#007ebc;text-decoration:none" target="_blank">support@epardesh.com.</a>'
                                            str += '</p>'
                                            str += '<p style="padding:2px 0 0 0;margin:0;font-size:12px">© <a href=' + classified_url + ' target="_blank" data-saferedirecturl="https://www.google.com/url?hl=en&amp;q=http://www.quikr.com&amp;source=gmail&amp;ust=1475136031439000&amp;usg=AFQjCNGhNxC9AQAEgHlXpFU2BgKR8Yd_JQ">' + classified_url + '</a></p>'
                                            str += '</div>'
                                            str += '</td>'
                                            str += '</tr>'
                                            str += '</tbody>'
                                            str += '</table>'
                                            str += '</td>'
                                            str += '</tr>'
                                            str += '</tbody>'
                                            str += '</table>'
                                            str += '</div>'
                                            var mailOptions = {to: email, subject: 'AD Approved', html: str};
                                            transporter.sendMail(mailOptions, function(error, info) {
                                                if (error) {
                                                    console.log('err')
                                                    console.log(error)
                                                    var errorMsg = 'some error occurred';
                                                    sendResponse.sendErrorMessage(errorMsg, res);
                                                } else {
                                                    console.log('Message sent: ');
                                                }
                                            });
                                        }
                                    })
                                }
                            } else {
                                var errorMsg = 'Ad does not exist';
                                sendResponse.sendErrorMessage(errorMsg, res);
                            }
                        }
                    })
                } else if (status == '2') {
                    var message = req.body.message;
                    var set_empty = '';
                    var sql = "select epardesh_ads.ad_type,user.email from epardesh_ads join user on epardesh_ads.user_id=user.id where epardesh_ads.id=?";
                    var values = [ad_id];
                    connection.query(sql, values, function(err, rows) {
                        if (err) {
                            console.log(err)
                            var errorMsg = 'some error occurred';
                            sendResponse.sendErrorMessage(errorMsg, res);
                        } else {
                            if (rows.length > 0) {
                                if (rows[0].status == '0') {
                                    var email1 = rows[0].email;
                                    console.log("case1")
                                    var sql1 = "UPDATE epardesh_ads SET approved_status='2', date_approved=?,expiry_date=? WHERE id=?;"
                                    var values1 = [set_empty, set_empty, ad_id];
                                    connection.query(sql1, values1, function(err, rows1) {
                                        if (err) {
                                            console.log(err)
                                            var errorMsg = 'some error occurred';
                                            sendResponse.sendErrorMessage(errorMsg, res);
                                        } else {
                                            var str = "<p>Hi,</p>";
                                            str += "<p>your ad has been rejected because of following reason</p>";
                                            str += "<p>" + message + "</p>";
                                            str += "<p>Regards,</p>";
                                            str += "<p>Team Epardesh</p>";
                                            var mailOptions = {to: email1, subject: 'AD rejected', html: str};
                                            transporter.sendMail(mailOptions, function(error, info) {
                                                if (error) {
                                                    var errorMsg = 'some error occurred';
                                                    sendResponse.sendErrorMessage(errorMsg, res);
                                                } else {
                                                    console.log('Message sent: ');
                                                }
                                            });
                                            var data = {}
                                            sendResponse.sendSuccessData(data, res);
                                        }
                                    })
                                } else {
                                    console.log("case2")
                                    var email = rows[0].email;
                                    var sql2 = "UPDATE epardesh_ads SET approved_status='2', date_approved=? WHERE id=?;"
                                    var values2 = [set_empty, ad_id];
                                    connection.query(sql2, values2, function(err, rows2) {
                                        if (err) {
                                            console.log(err)
                                            var errorMsg = 'some error occurred';
                                            sendResponse.sendErrorMessage(errorMsg, res);
                                        } else {
                                            var str = "<p>Hi,</p>";
                                            str += "<p>your ad has been rejected because of following reason</p>";
                                            str += "<p>" + message + "</p>";
                                            str += "<p>Regards,</p>";
                                            str += "<p>Team Epardesh</p>";
                                            var mailOptions = {to: email, subject: 'AD rejected', html: str};
                                            transporter.sendMail(mailOptions, function(error, info) {
                                                if (error) {
                                                    var errorMsg = 'some error occurred';
                                                    sendResponse.sendErrorMessage(errorMsg, res);
                                                } else {
                                                    console.log('Message sent: ');
                                                }
                                            });
                                            var data = {}
                                            sendResponse.sendSuccessData(data, res);
                                        }
                                    })
                                }
                            } else {
                                var errorMsg = 'Ad does not exist';
                                sendResponse.sendErrorMessage(errorMsg, res);
                            }
                        }
                    })
                } else {
                    var errorMsg = 'invalid status';
                    sendResponse.sendErrorMessage(errorMsg, res);
                }
            });
});






/*
 * --------------------------------------------------------------------------
 * upload_promotional_image
 * ---------------------------------------------------------------------------
 */

router.post('/upload_promotional_image', function(req, res, next) {
    new multiparty.Form().parse(req, function(err, fields, files) {
        if (fields != 'undefined' || fields != undefined) {
            console.log('fields');
            console.log(fields);
            console.log('files');
            console.log(files);
            var file_path = files.profile[0].path;
            console.log(file_path)
            var original_file_name = files.profile[0].originalFilename;
            var file_size = files.profile[0].size;
            var rand_str = randomstring.generate(7);
            var file_name = rand_str + '_' + original_file_name;
            //var file_id = 103;
            var loginTime = new Date();
            var file_id = func.encrypt(loginTime + loginTime);
            uploader.upload({
                fileId: file_id,
                bucket: bucket_name,
                source: file_path,
                name: file_name
            },
            function(data) { // success
                console.log('upload success:', data);
                profile_image_path = s3_path + data.path;
                var profile_image_id = s3_path + data.id;
                var image_type = fields.image_type;
                console.log(image_type)

                var data = {
                    "profile_image_path": profile_image_path
                }
                sendResponse.sendSuccessData(data, res);
            },
                    function(errMsg) { //error
                        console.error('unable to upload: ' + errMsg);
                        sendResponse.sendSuccessData(errMsg, res);
                    });
        } else {
            var errorMsg = 'image not uploaded';
            sendResponse.sendErrorMessage(errorMsg, res);
        }
    });
});


/*
 * --------------------------------------------------------------------------
 * view_ads
 * ---------------------------------------------------------------------------
 */
router.post('/view_ads', function(req, res, next) {
    var sql = "select epardesh_ads.*, user.email from epardesh_ads join user on epardesh_ads.user_id=user.id order by updated_on desc";
    connection.query(sql, function(err, rows) {
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
 * ad_images_and_categories
 * ---------------------------------------------------------------------------
 */
router.post('/view_full_ad_info', function(req, res, next) {
    var ad_id = req.body.ad_id;
    var all_images = []
    var get_ad_details = 'select * from epardesh_ads where id=?';
    var values1 = [ad_id]
    connection.query(get_ad_details, values1, function(err, rows1) {
        if (err) {
            console.log(err)
            var errorMsg = 'some error occurred';
            sendResponse.sendErrorMessage(errorMsg, res);
        } else {
            if (rows1.length > 0) {
                var ad_category_id = rows1[0].ad_category;
                var ad_sub_category_id = rows1[0].ad_sub_category;
                var images = rows1[0].images;
                var image_array = images.split(",");
                async.each(image_array, function(image_id, callback) {
                    var sql1 = 'select * from images where id=?';
                    var values1 = [image_id]
                    connection.query(sql1, values1, function(err, rows1) {
                        if (err) {
                            console.log(err)
                            var errorMsg = 'some error occurred';
                            sendResponse.sendErrorMessage(errorMsg, res);
                        } else {

                            all_images.push(rows1)
                        }
                        callback();
                    })
                }, function(err) {
                    // if any of the file processing produced an error, err would equal that error
                    if (err) {
                        // One of the iterations produced an error.
                        // All processing will now stop.
                        console.log('A file failed to process');
                    } else {
                        var get_epardesh_category = 'select * from epardesh_categories where id=?';
                        var cat_id = [ad_category_id]
                        connection.query(get_epardesh_category, cat_id, function(err, result1) {
                            if (err) {
                                console.log(err)
                                var errorMsg = 'some error occurred';
                                sendResponse.sendErrorMessage(errorMsg, res);
                            } else {
                                var get_epardesh_category = 'select * from epardesh_categories where id=?';
                                var sub_cat_id = [ad_sub_category_id]
                                connection.query(get_epardesh_category, sub_cat_id, function(err, result2) {
                                    if (err) {
                                        console.log(err)
                                        var errorMsg = 'some error occurred';
                                        sendResponse.sendErrorMessage(errorMsg, res);
                                    } else {
                                        if (result1.length > 0 || result2.length > 0) {
                                            var final_data = {
                                                images: all_images,
                                                info: rows1,
                                                category: result1[0].name,
                                                sub_category: result2[0].name,
                                            }
                                        }
                                        sendResponse.sendSuccessData(final_data, res);
                                    }
                                })
                            }
                        })
                    }
                });
            } else {
                var errorMsg = 'ad does not exist';
                sendResponse.sendErrorMessage(errorMsg, res);
            }
        }
    })
});






/*
 * --------------------------------------------------------------------------
 * Add promotional ad
 * ---------------------------------------------------------------------------
 */

router.post('/add_promotional_ad', function(req, res, next) {
    var key = 0;
    var all_country = req.body.country;
    var all_state = req.body.state;
    var all_city = req.body.city;
    var is_nationwide = req.body.is_nationwide;
    var start_date = req.body.start_date;
    var end_date = req.body.end_date;
    var image_url = req.body.image_url;
    var country_array = [];
    var state_array = [];
    var city_array = [];
    var image_type = req.body.image_type;
    var duplicate_cities = []
    var count_array = [];
    var all_cities = all_city.replace(/,&&,/g, ",");
    var split_cities = all_cities.split(",");
    var sorted_cities = split_cities.sort();
    var cities_length = sorted_cities.length;
//    var manvalues = [is_nationwide]
//    console.log(manvalues)
//    async.waterfall([
//        function (callback) {
//            func.checkBlank(res, manvalues, callback);
//        }],
//            function (err, updatePopup, critical) {


    if (is_nationwide == '' || is_nationwide == null || is_nationwide == undefined || is_nationwide == 'undefined') {
        var errorMsg = 'Some parametres missing';
        sendResponse.sendErrorMessage(errorMsg, res);
    } else {
        for (var i = 0; i < cities_length; i++) {
            if (sorted_cities[i] == sorted_cities[i + 1]) {
                duplicate_cities.push(sorted_cities[i]);
            }
        }

        if (duplicate_cities.length > 0 || duplicate_cities.length > '0') {
            var errorMsg = 'Duplicate_cities';
            sendResponse.sendErrorMessage(errorMsg, res);
        } else {
            async.each(split_cities, function(city_name, callback) {
                var get_count = "select count(promotional_ad_states.city) as count from promotional_ad_states join promotional_ads on promotional_ad_states.promotional_ad_id=promotional_ads.id where promotional_ad_states.city=? and promotional_ads.image_type=?";
                var value = [city_name, image_type]

                connection.query(get_count, value, function(err, count) {
                    if (err) {
                        console.log(err)
                        var errorMsg = 'some error occurred';
                        sendResponse.sendErrorMessage(errorMsg, res);
                    } else {
                        var count_of_city = count[0].count;
                    }
                    //               console.log(count_of_city)
                    count_array.push(count_of_city)
                    callback()
                })
            }, function(err) {
                // if any of the file processing produced an error, err would equal that error
                if (err) {
                    // One of the iterations produced an error.
                    // All processing will now stop.
                    console.log('A file failed to process');
                } else {
                    var max = Math.max.apply(null, count_array)
                    if (image_type == 'Banner') {
                        if (max < 5) {
                            var sql = "insert into promotional_ads (image_url,image_type) values(?,?)";
                            var values = [image_url, image_type]
                            connection.query(sql, values, function(err, rows) {
                                if (err) {
                                    console.log(err)
                                    var errorMsg = 'some error occurred';
                                    sendResponse.sendErrorMessage(errorMsg, res);
                                } else {
                                    var sql1 = "select * from promotional_ads order by id desc limit 1"
                                    connection.query(sql1, function(err, rows1) {
                                        if (err) {
                                            console.log(err)
                                            var errorMsg = 'some error occurred';
                                            sendResponse.sendErrorMessage(errorMsg, res);
                                        } else {
                                            var id = rows1[0].id;
                                            country_array = all_country.split("&&");
                                            state_array = all_state.split("&&");
                                            city_array = all_city.split(",&&,");
                                            async.each(country_array, function(country, callback) {
                                                //var key = country_array.indexOf(country)
                                                var state = state_array[key]
                                                var city = city_array[key].split(",");
                                                key = key + 1
                                                async.each(city, function(city, callback) {
                                                    var sql2 = "insert into promotional_ad_states (country,state,city,promotional_ad_id,is_nationwide,start_date,end_date) values(?,?,?,?,?,?,?)";
                                                    var values2 = [country, state, city, id, is_nationwide, start_date, end_date]
                                                    connection.query(sql2, values2, function(err, rows) {
                                                        if (err) {
                                                            console.log(err)
                                                            var errorMsg = 'some error occurred';
                                                            sendResponse.sendErrorMessage(errorMsg, res);
                                                        } else {
                                                            callback()
                                                        }
                                                    })
                                                }, function(err) {
                                                    // if any of the file processing produced an error, err would equal that error
                                                    if (err) {
                                                        // One of the iterations produced an error.
                                                        // All processing will now stop.
                                                        console.log('A file failed to process');
                                                    } else {
                                                        callback()
                                                    }
                                                });
                                            }, function(err) {
                                                // if any of the file processing produced an error, err would equal that error
                                                if (err) {
                                                    // One of the iterations produced an error.
                                                    // All processing will now stop.
                                                    console.log('A file failed to process');
                                                } else {
                                                    var data = []
                                                    sendResponse.sendSuccessData(data, res);
                                                }
                                            });
                                        }
                                    })
                                }
                            })
                        } else {
                            var errorMsg = 'banner image limit reached';
                            sendResponse.sendErrorMessage(errorMsg, res);
                        }
                    } else if (image_type == 'Rolling') {
                        if (max < 10) {
                            var sql = "insert into promotional_ads (image_url,image_type) values(?,?)";
                            var values = [image_url, image_type]
                            connection.query(sql, values, function(err, rows) {
                                if (err) {
                                    console.log(err)
                                    var errorMsg = 'some error occurred';
                                    sendResponse.sendErrorMessage(errorMsg, res);
                                } else {
                                    var sql1 = "select * from promotional_ads order by id desc limit 1"
                                    connection.query(sql1, function(err, rows1) {
                                        if (err) {
                                            console.log(err)
                                            var errorMsg = 'some error occurred';
                                            sendResponse.sendErrorMessage(errorMsg, res);
                                        } else {
                                            var id = rows1[0].id;
                                            country_array = all_country.split("&&");
                                            state_array = all_state.split("&&");
                                            city_array = all_city.split(",&&,");
                                            async.each(country_array, function(country, callback) {
                                                //var key = country_array.indexOf(country)
                                                var state = state_array[key]
                                                var city = city_array[key].split(",");
                                                key = key + 1
                                                async.each(city, function(city, callback) {
                                                    var sql2 = "insert into promotional_ad_states (country,state,city,promotional_ad_id,is_nationwide,start_date,end_date) values(?,?,?,?,?,?)";
                                                    var values2 = [country, state, city, id, is_nationwide, start_date, end_date]
                                                    connection.query(sql2, values2, function(err, rows) {
                                                        if (err) {
                                                            console.log(err)
                                                            var errorMsg = 'some error occurred';
                                                            sendResponse.sendErrorMessage(errorMsg, res);
                                                        } else {
                                                            callback()
                                                        }
                                                    })
                                                }, function(err) {
                                                    // if any of the file processing produced an error, err would equal that error
                                                    if (err) {
                                                        // One of the iterations produced an error.
                                                        // All processing will now stop.
                                                        console.log('A file failed to process');
                                                    } else {
                                                        callback()
                                                    }
                                                });
                                            }, function(err) {
                                                // if any of the file processing produced an error, err would equal that error
                                                if (err) {
                                                    // One of the iterations produced an error.
                                                    // All processing will now stop.
                                                    console.log('A file failed to process');
                                                } else {
                                                    var data = []
                                                    sendResponse.sendSuccessData(data, res);
                                                }
                                            });
                                        }
                                    })
                                }
                            })
                        } else {
                            var errorMsg = 'rolling image limit reached';
                            sendResponse.sendErrorMessage(errorMsg, res);
                        }
                    }
                }
            });
        }
    }
//            })
});


//router.post('/add_promotional_ad', function (req, res, next) {
//    var key = 0;
//    var all_country = req.body.country;
//    var all_state = req.body.state;
//    var all_city = req.body.city;
//    console.log('all_country')
//    console.log(all_country)
//    console.log('all_state')
//    console.log(all_state)
//    console.log('all_city')
//    console.log(all_city)
//    var image_url = req.body.image_url;
//    var country_array = [];
//    var state_array = [];
//    var city_array = [];
//    var image_type = req.body.image_type;
//    var duplicate_cities = []
//    var count_array = [];
//    var all_cities = all_city.replace(",&&,", ",");
//    console.log("all_cities")
//    console.log(all_cities)
//    var split_cities = all_cities.split(",");
//    var sorted_cities = split_cities.sort();
//    console.log("sorted_cities")
//    console.log(sorted_cities)
//    var cities_length = sorted_cities.length;
//
//    for (var i = 0; i < cities_length; i++) {
//        if (sorted_cities[i] == sorted_cities[i + 1]) {
//            duplicate_cities.push(sorted_cities[i]);
//        }
//
//    }
//
//    if (duplicate_cities.length > 0 || duplicate_cities.length > '0') {
//        var errorMsg = 'Duplicate_cities';
//        sendResponse.sendErrorMessage(errorMsg, res);
//    } else {
//
//
//        async.each(split_cities, function (city_name, callback) {
//
//            var get_count = "select count(promotional_ad_states.city) as count from promotional_ad_states join promotional_ads on promotional_ad_states.promotional_ad_id=promotional_ads.id where promotional_ad_states.city=? and promotional_ads.image_type=?";
//            var value = [city_name, image_type]
//            console.log(value)
//            connection.query(get_count, value, function (err, count) {
//                if (err) {
//                    console.log(err)
//                    var errorMsg = 'some error occurred';
//                    sendResponse.sendErrorMessage(errorMsg, res);
//                } else {
//                    var count_of_city = count[0].count;
//                }
//                //               console.log(count_of_city)
//                count_array.push(count_of_city)
//
//                callback()
//            })
//
//
//        }, function (err) {
//            // if any of the file processing produced an error, err would equal that error
//            if (err) {
//                // One of the iterations produced an error.
//                // All processing will now stop.
//                console.log('A file failed to process');
//            } else {
//                console.log('in_loop1');
//                console.log(count_array);
//                var max = Math.max.apply(null, count_array)
//                console.log(max)
//
//                if (image_type == 'Banner') {
//                    if (max < 5) {
//                        var sql = "insert into promotional_ads (image_url,image_type) values(?,?)";
//                        var values = [image_url, image_type]
//                        connection.query(sql, values, function (err, rows) {
//                            if (err) {
//                                console.log(err)
//                                var errorMsg = 'some error occurred';
//                                sendResponse.sendErrorMessage(errorMsg, res);
//                            } else {
//                                var sql1 = "select * from promotional_ads order by id desc limit 1"
//                                connection.query(sql1, function (err, rows1) {
//                                    if (err) {
//                                        console.log(err)
//                                        var errorMsg = 'some error occurred';
//                                        sendResponse.sendErrorMessage(errorMsg, res);
//                                    } else {
//                                        var id = rows1[0].id;
//                                        country_array = all_country.split("&&");
//                                        state_array = all_state.split("&&");
//                                        city_array = all_city.split(",&&,");
//
//                                        async.each(country_array, function (country, callback) {
//
//                                            //var key = country_array.indexOf(country)
//                                            var state = state_array[key]
//                                            var city = city_array[key].split(",");
//                                            key = key + 1
//                                            console.log("key")
//                                            console.log(key)
//                                            async.each(city, function (city, callback) {
//
//                                                console.log(country)
//                                                console.log(state)
//                                                console.log(city)
//
//                                                var sql2 = "insert into promotional_ad_states (country,state,city,promotional_ad_id) values(?,?,?,?)";
//                                                var values2 = [country, state, city, id]
//                                                console.log('values2')
//                                                console.log(values2)
//                                                connection.query(sql2, values2, function (err, rows) {
//                                                    if (err) {
//                                                        console.log(err)
//                                                        var errorMsg = 'some error occurred';
//                                                        sendResponse.sendErrorMessage(errorMsg, res);
//                                                    }
//                                                    callback()
//                                                })
//
//
//                                            }, function (err) {
//                                                // if any of the file processing produced an error, err would equal that error
//                                                if (err) {
//                                                    // One of the iterations produced an error.
//                                                    // All processing will now stop.
//                                                    console.log('A file failed to process');
//                                                } else {
//                                                    console.log('in_loop1');
//                                                    callback()
//                                                    console.log("success");
//                                                }
//                                            });
//
//                                        }, function (err) {
//                                            // if any of the file processing produced an error, err would equal that error
//                                            if (err) {
//                                                // One of the iterations produced an error.
//                                                // All processing will now stop.
//                                                console.log('A file failed to process');
//                                            } else {
//
//                                                console.log('in_loop2');
//                                                var data = []
//                                                sendResponse.sendSuccessData(data, res);
//                                                console.log("success");
//                                            }
//                                        });
//                                    }
//
//                                })
//                            }
//
//                        })
//                    } else {
//                        var errorMsg = 'banner image limit reached';
//                        sendResponse.sendErrorMessage(errorMsg, res);
//                    }
//                } else if (image_type == 'Rolling') {
//                    if (max < 10) {
//                        var sql = "insert into promotional_ads (image_url,image_type) values(?,?)";
//                        var values = [image_url, image_type]
//                        connection.query(sql, values, function (err, rows) {
//                            if (err) {
//                                console.log(err)
//                                var errorMsg = 'some error occurred';
//                                sendResponse.sendErrorMessage(errorMsg, res);
//                            } else {
//                                var sql1 = "select * from promotional_ads order by id desc limit 1"
//                                connection.query(sql1, function (err, rows1) {
//                                    if (err) {
//                                        console.log(err)
//                                        var errorMsg = 'some error occurred';
//                                        sendResponse.sendErrorMessage(errorMsg, res);
//                                    } else {
//                                        var id = rows1[0].id;
//                                        console.log("id")
//                                        console.log(id)
//                                        country_array = all_country.split("&&");
//                                        state_array = all_state.split("&&");
//                                        city_array = all_city.split(",&&,");
//                                        async.each(country_array, function (country, callback) {
//                                            //var key = country_array.indexOf(country)
//                                            console.log(key)
//                                            var state = state_array[key]
//                                            var city = city_array[key].split(",");
//                                            key = key + 1
//                                            console.log("key")
//                                            async.each(city, function (city, callback) {
//                                                console.log(country)
//                                                console.log(state)
//                                                console.log(city)
//
//                                                var sql2 = "insert into promotional_ad_states (country,state,city,promotional_ad_id) values(?,?,?,?)";
//                                                var values2 = [country, state, city, id]
//                                                connection.query(sql2, values2, function (err, rows) {
//                                                    if (err) {
//                                                        console.log(err)
//                                                        var errorMsg = 'some error occurred';
//                                                        sendResponse.sendErrorMessage(errorMsg, res);
//                                                    }
//                                                    callback()
//                                                })
//
//
//                                            }, function (err) {
//                                                // if any of the file processing produced an error, err would equal that error
//                                                if (err) {
//                                                    // One of the iterations produced an error.
//                                                    // All processing will now stop.
//                                                    console.log('A file failed to process');
//                                                } else {
//                                                    console.log('in_loop1');
//                                                    callback()
//                                                    console.log("success");
//                                                }
//                                            });
//
//                                        }, function (err) {
//                                            // if any of the file processing produced an error, err would equal that error
//                                            if (err) {
//                                                // One of the iterations produced an error.
//                                                // All processing will now stop.
//                                                console.log('A file failed to process');
//                                            } else {
//
//                                                console.log('in_loop2');
//                                                var data = []
//                                                sendResponse.sendSuccessData(data, res);
//                                                console.log("success");
//                                            }
//                                        });
//                                    }
//
//                                })
//                            }
//
//                        })
//                    } else {
//                        var errorMsg = 'rolling image limit reached';
//                        sendResponse.sendErrorMessage(errorMsg, res);
//                    }
//                }
//            }
//        });
//    }
//})


/*
 * --------------------------------------------------------------------------
 * view_promotional_ads
 * ---------------------------------------------------------------------------
 */

//router.post('/view_promotional_ads', function (req, res, next) {
//    var key = 0;
//    var data = []
//    var final_data = []
//    var city_array = []
//    var state_array = []
//    var country_array = []
//    var sql = "select * from promotional_ads";
//    connection.query(sql, function (err, rows) {
//        if (err) {
//            console.log(err)
//            var errorMsg = 'some error occurred';
//            sendResponse.sendErrorMessage(errorMsg, res);
//        } else {
//            var no_of_ads = rows.length;
//            for (var i = 0; i < no_of_ads; i++) {
//                var id = rows[i].id;
//                var get_promotional_states = "select * from promotional_ad_states where promotional_ad_id=?";
//                var promotional_ad_values = [id]
//                console.log(promotional_ad_values)
//                console.log(promotional_ad_values)
//                connection.query(get_promotional_states, promotional_ad_values, function (err, promotional_ads) {
//                    if (err) {
//                        console.log(err)
//                        var errorMsg = 'some error occurred';
//                        sendResponse.sendErrorMessage(errorMsg, res);
//                    } else {
//                        var no_of_regions = promotional_ads.length;
//
//                        for (var j = 0; j < no_of_regions; j++) {
//                            var city = promotional_ads[j].city;
//                            var state = promotional_ads[j].state;
//                            var country = promotional_ads[j].country;
//                            city_array.push(city)
//                            state_array.push(state)
//                            country_array.push(country)
//                            console.log(city)
//                            console.log(state)
//                            console.log(country)
//                        }
////                        var ad_data = {
////                            city: city_array,
////                            state: state_array,
////                            country: country_array
////                        }
//                        if (promotional_ads.length > 0) {
////                            var id = promotional_ads[0].id
//                            var start_date = promotional_ads[0].start_date
//                            var end_date = promotional_ads[0].end_date
//                            var is_nationwide = promotional_ads[0].is_nationwide
//                        }
//                        var ad_info = {
//                            ad_id: id,
//                            promotional_image: rows[key],
//                            city: city_array,
//                            state: state_array,
//                            country: country_array,
//                            start_date: start_date,
//                            end_date: end_date,
//                            is_nationwide: is_nationwide
//                        }
////                        data.push(ad_info)
//                        final_data.push(ad_info)
////                        data = []
//                        city_array = []
//                        state_array = []
//                        country_array = []
//
//
//                        if (parseInt(key) == (parseInt(no_of_ads) - 1)) {
//                            sendResponse.sendSuccessData(final_data, res);
//                        } else {
//                            key = parseInt(key) + 1;
//                        }
//                    }
//                })
//            }
//        }
//    });
//});

router.post('/view_promotional_ads', function(req, res, next) {
    var key = 0;
    var id_array = [];
    var data = []
    var final_data = []
    var city_array = []
    var state_array = []
    var country_array = []
    var sql = "select * from promotional_ads order by id desc";
    connection.query(sql, function(err, rows) {
        if (err) {
            console.log(err)
            var errorMsg = 'some error occurred';
            sendResponse.sendErrorMessage(errorMsg, res);
        } else {
            var no_of_ads = rows.length;
            for (var i = 0; i < no_of_ads; i++) {
                var id = rows[i].id;
                var image_url = rows[i].image_url;
                var image_type = rows[i].image_type;
                id_array.push(id);
            }
            async.each(id_array, function(pa_id, callback) {
                var get_ad_states = 'select * from promotional_ad_states where promotional_ad_id=?'
                var ad_values = [pa_id]
                connection.query(get_ad_states, ad_values, function(err, ads) {
                    if (err) {
                        console.log(err)
                        var errorMsg = 'some error occurred';
                        sendResponse.sendErrorMessage(errorMsg, res);
                    } else {
                        var no_of_ads = ads.length;
                        for (var j = 0; j < no_of_ads; j++) {
                            city_array.push(ads[j].city)
                            state_array.push(ads[j].state)
                            country_array.push(ads[j].country)
                        }
                        var start_date = ads[0].start_date;
                        var end_date = ads[0].end_date;
                        var is_nationwide = ads[0].is_nationwide;

                        var ad_info = {
                            ad_id: pa_id,
                            image_url: rows[key].image_url,
                            image_type: rows[key].image_type,
                            city: city_array,
                            state: state_array,
                            country: country_array,
                            start_date: start_date,
                            end_date: end_date,
                            is_nationwide: is_nationwide
                        }
                        final_data.push(ad_info)
                        city_array = []
                        state_array = []
                        country_array = []
                        key++;
                    }
                    callback()
                })
            }, function(err) {
                // if any of the file processing produced an error, err would equal that error
                if (err) {
                    // One of the iterations produced an error.
                    // All processing will now stop.
                    console.log('A file failed to process');
                } else {
                    sendResponse.sendSuccessData(final_data, res);
                }
            });
        }
    });
});

/*
 * --------------------------------------------------------------------------
 * edit_promotional_ad
 * ---------------------------------------------------------------------------
 */

//router.post('/edit_promotional_ad', function (req, res, next) {
//    var image_url = req.body.image_url;
//    var image_type = req.body.image_type;
//    var ad_id = req.body.ad_id;
//    var get_promotional_ad_id = "select promotional_ad_id from promotional_ad_states where id=?";
//    var values = [ad_id]
//    connection.query(get_promotional_ad_id, values, function (err, rows) {
//        if (err) {
//            console.log(err)
//            var errorMsg = 'some error occurred';
//            sendResponse.sendErrorMessage(errorMsg, res);
//        } else {
//            if (rows.length > 0) {
//                promotional_ad_id = rows[0].promotional_ad_id;
//                var update_promotional_ad = "update promotional_ads SET image_url=?,image_type=? WHERE id=?"
//                var values_to_update = [image_url, image_type, promotional_ad_id]
//                connection.query(update_promotional_ad, values_to_update, function (err, rows1) {
//                    if (err) {
//                        console.log(err)
//                        var errorMsg = 'some error occurred';
//                        sendResponse.sendErrorMessage(errorMsg, res);
//                    } else {
//                        var data = [];
//                        sendResponse.sendSuccessData(data, res);
//                    }
//                })
//            } else {
//                var msg = "invalid id";
//                sendResponse.sendErrorMessage(msg, res);
//            }
//        }
//    })
//});

router.post('/edit_promotional_ad', function(req, res, next) {
    var key = 0;
    var ad_id = req.body.ad_id;
    var all_country = req.body.country;
    var all_state = req.body.state;
    var all_city = req.body.city;
    var is_nationwide = req.body.is_nationwide;
    var start_date = req.body.start_date;
    var end_date = req.body.end_date;
    var image_url = req.body.image_url;
    var image_type = req.body.image_type;
    var country_array = [];
    var state_array = [];
    var city_array = [];
    var duplicate_cities = []
    var count_array = [];
    var all_cities = all_city.replace(/,&&,/g, ",");
    var split_cities = all_cities.split(",");
    var sorted_cities = split_cities.sort();
    var cities_length = sorted_cities.length;
    for (var i = 0; i < cities_length; i++) {
        if (sorted_cities[i] == sorted_cities[i + 1]) {
            duplicate_cities.push(sorted_cities[i]);
        }
    }
    if (duplicate_cities.length > 0 || duplicate_cities.length > '0') {
        var errorMsg = 'Duplicate_cities';
        sendResponse.sendErrorMessage(errorMsg, res);
    } else {
        async.each(split_cities, function(city_name, callback) {
            var get_count = "select count(promotional_ad_states.city) as count from promotional_ad_states join promotional_ads on promotional_ad_states.promotional_ad_id=promotional_ads.id where promotional_ad_states.city=? and promotional_ads.image_type=?";
            var value = [city_name, image_type]
            console.log(value)
            connection.query(get_count, value, function(err, count) {
                if (err) {
                    console.log(err)
                    var errorMsg = 'some error occurred';
                    sendResponse.sendErrorMessage(errorMsg, res);
                } else {
                    var count_of_city = count[0].count;
                }
                count_array.push(count_of_city)
                callback()
            })
        }, function(err) {
            if (err) {
                console.log('A file failed to process');
            } else {
                var max = Math.max.apply(null, count_array)
                if (image_type == 'Banner' || image_type == 'banner') {
                    if (max < 5) {
                        var sql = "update promotional_ads set image_url=?,image_type=? where id=?";
                        var values = [image_url, image_type, ad_id]
                        connection.query(sql, values, function(err, rows) {
                            if (err) {
                                console.log(err)
                                var errorMsg = 'some error occurred';
                                sendResponse.sendErrorMessage(errorMsg, res);
                            } else {
                                var sql1 = "delete from promotional_ad_states where promotional_ad_id=?"
                                var values1 = [ad_id]
                                console.log('values1')
                                console.log(values1)
                                connection.query(sql1, values1, function(err, rows1) {
                                    if (err) {
                                        console.log(err)
                                        var errorMsg = 'some error occurred';
                                        sendResponse.sendErrorMessage(errorMsg, res);
                                    } else {
                                        country_array = all_country.split("&&");
                                        state_array = all_state.split("&&");
                                        city_array = all_city.split(",&&,");
                                        async.each(country_array, function(country, callback) {
                                            var state = state_array[key]
                                            var city = city_array[key].split(",");
                                            key = key + 1
                                            async.each(city, function(city, callback) {
                                                var sql2 = "insert into promotional_ad_states (country,state,city,promotional_ad_id,is_nationwide,start_date,end_date) values(?,?,?,?,?,?,?)";
                                                var values2 = [country, state, city, ad_id, is_nationwide, start_date, end_date]
                                                console.log('values2')
                                                console.log(values2)
                                                connection.query(sql2, values2, function(err, rows) {
                                                    if (err) {
                                                        console.log(err)
                                                        var errorMsg = 'some error occurred';
                                                        sendResponse.sendErrorMessage(errorMsg, res);
                                                    } else {
                                                        console.log(rows)
                                                        callback()
                                                    }
                                                })
                                            }, function(err) {
                                                if (err) {
                                                    console.log('A file failed to process');
                                                } else {
                                                    callback()
                                                }
                                            });
                                        }, function(err) {
                                            if (err) {
                                                console.log('A file failed to process');
                                            } else {
                                                var data = []
                                                sendResponse.sendSuccessData(data, res);
                                            }
                                        });
                                    }
                                })
                            }
                        })
                    } else {
                        var errorMsg = 'banner image limit reached';
                        sendResponse.sendErrorMessage(errorMsg, res);
                    }
                } else if (image_type == 'Rolling' || image_type == 'rolling') {
                    if (max < 10) {
                        var sql = "update promotional_ads set image_url=?,image_type=? where id=?";
                        var values = [image_url, image_type, ad_id]
                        connection.query(sql, values, function(err, rows) {
                            if (err) {
                                console.log(err)
                                var errorMsg = 'some error occurred';
                                sendResponse.sendErrorMessage(errorMsg, res);
                            } else {
                                var sql1 = "delete from promotional_ad_states where promotional_ad_id=?"
                                var values1 = [ad_id]
                                connection.query(sql1, values1, function(err, rows1) {
                                    if (err) {
                                        console.log(err)
                                        var errorMsg = 'some error occurred';
                                        sendResponse.sendErrorMessage(errorMsg, res);
                                    } else {
                                        country_array = all_country.split("&&");
                                        state_array = all_state.split("&&");
                                        city_array = all_city.split(",&&,");
                                        async.each(country_array, function(country, callback) {
                                            console.log(key)
                                            var state = state_array[key]
                                            var city = city_array[key].split(",");
                                            key = key + 1
                                            async.each(city, function(city, callback) {
                                                var sql2 = "insert into promotional_ad_states (country,state,city,promotional_ad_id,is_nationwide,start_date,end_date) values(?,?,?,?,?,?,?)";
                                                var values2 = [country, state, city, ad_id, is_nationwide, start_date, end_date]
                                                connection.query(sql2, values2, function(err, rows) {
                                                    if (err) {
                                                        console.log(err)
                                                        var errorMsg = 'some error occurred';
                                                        sendResponse.sendErrorMessage(errorMsg, res);
                                                    }
                                                    callback()
                                                })
                                            }, function(err) {
                                                if (err) {
                                                    console.log('A file failed to process');
                                                } else {
                                                    console.log('in_loop1');
                                                    callback()
                                                    console.log("success");
                                                }
                                            });

                                        }, function(err) {
                                            if (err) {
                                                console.log('A file failed to process');
                                            } else {
                                                var data = []
                                                sendResponse.sendSuccessData(data, res);
                                            }
                                        });
                                    }
                                })
                            }
                        })
                    } else {
                        var errorMsg = 'rolling image limit reached';
                        sendResponse.sendErrorMessage(errorMsg, res);
                    }
                }
            }
        });
    }
});



/*
 * --------------------------------------------------------------------------
 * delete_promotional_ad
 * ---------------------------------------------------------------------------
 */
router.post('/delete_promotional_ad', function(req, res, next) {
    var ad_id = req.body.ad_id;
    var manValues = [ad_id]
    async.waterfall([
        function(callback) {
            func.checkBlank(res, manValues, callback);
        }],
            function(err, updatePopup, critical) {
                var check_id = "select * from promotional_ads where id=?";
                var values = [ad_id]
                connection.query(check_id, values, function(err, rows) {
                    if (err) {
                        console.log(err)
                        var errorMsg = 'some error occurred';
                        sendResponse.sendErrorMessage(errorMsg, res);
                    } else {
                        if (rows.length > '0' || rows.length > 0) {
//                            var promotional_ad_id = rows[0].promotional_ad_id;
                            var sql = "delete promotional_ads,promotional_ad_states from promotional_ads join promotional_ad_states on promotional_ads.id=promotional_ad_states.promotional_ad_id where promotional_ad_states.promotional_ad_id=? and promotional_ads.id=?";
                            var values = [ad_id, ad_id]
                            connection.query(sql, values, function(err, rows) {
                                if (err) {
                                    console.log(err)
                                    var errorMsg = 'some error occurred';
                                    sendResponse.sendErrorMessage(errorMsg, res);
                                } else {
                                    var data = [];
                                    sendResponse.sendSuccessData(data, res);
                                }
                            });
                        } else {
                            var errorMsg = 'invalid ad_id';
                            sendResponse.sendErrorMessage(errorMsg, res);
                        }
                    }
                });
            })
});


/*
 * --------------------------------------------------------------------------
 * change_admin_password
 * INPUT : old_password,new_password, access_token
 * ---------------------------------------------------------------------------
 */
router.post('/change_admin_password', function(req, res, next) {
    var old_password = req.body.old_password;
    var new_password = req.body.new_password;
    var access_token = req.body.access_token;
    var manValues = [old_password, new_password, access_token];
    async.waterfall([
        function(callback) {
            func.checkBlank(res, manValues, callback);
        }
    ], function() {
        var sql = "SELECT access_token, password FROM admin_info where access_token=?";
        var values = [access_token];
        connection.query(sql, values, function(err, rows) {
            if (err) {
                var errorMsg = 'some error occurred';
                sendResponse.sendErrorMessage(errorMsg, res);
            } else {
                if (rows == "") {
                    var Msg = 'Unauthorised access';
                    sendResponse.sendErrorMessage(Msg, res);
                } else {
                    if (old_password == rows[0].password) {
                        var sql = "update admin_info set password = ? where access_token = ?";
                        var values = [new_password, access_token];
                        connection.query(sql, values, function(err, userInsertResult) {
                            var Msg = {};
                            sendResponse.sendSuccessData(Msg, res);
                        })
                    } else
                    {
                        var Msg = 'Old password do not match';
                        sendResponse.sendErrorMessage(Msg, res);
                    }
                }
            }
        });
    })
});

/*
 * --------------------------------------------------------------------------
 * admin_delete_ad
 * ---------------------------------------------------------------------------
 */
//router.post('/admin_delete_ad', function (req, res, next) {
//    var ad_id = req.body.ad_id;
//    var check_ad = "select * from epardesh_ads WHERE id=?;";
//    var ad_values = [ad_id]
//    connection.query(check_ad, ad_values, function (err, ad) {
//        if (err) {
//            console.log(err)
//            var errorMsg = 'some error occurred';
//            sendResponse.sendErrorMessage(errorMsg, res);
//        } else {
//            console.log(ad.length)
//            if (ad.length > 0) {
//                var sql = "DELETE FROM epardesh_ads WHERE id=?;";
//                var values = [ad_id]
//                connection.query(sql, values, function (err, rows) {
//                    if (err) {
//                        console.log(err)
//                        var errorMsg = 'some error occurred';
//                        sendResponse.sendErrorMessage(errorMsg, res);
//                    } else {
//                        var msg = {}
//                        sendResponse.sendSuccessData(msg, res);
//                    }
//                })
//            } else {
//                var errorMsg = 'ad does not exist';
//                sendResponse.sendErrorMessage(errorMsg, res);
//            }
//
//        }
//    })
//
//});

router.post('/admin_delete_ad', function(req, res, next) {
    var ad_id = req.body.ad_id;
    var check_ad = "select * from epardesh_ads where id=?"
    var value = [ad_id];
    connection.query(check_ad, value, function(err, data) {
        if (err) {
            console.log(err)
            var errorMsg = 'some error occurred';
            sendResponse.sendErrorMessage(errorMsg, res);
        } else {
            if (data.length > 0) {
                var delete_ad = "delete from epardesh_ads where id=?"
                var ad_value = [ad_id]
                connection.query(delete_ad, ad_value, function(err, rows) {
                    if (err) {
                        console.log(err)
                        var errorMsg = 'some error occurred';
                        sendResponse.sendErrorMessage(errorMsg, res);
                    } else {
                        console.log("user_id  " + data[0]["user_id"])
                        var check_user = "select * from user where id=?"
                        var user_value = [data[0]["user_id"]];
                        connection.query(check_user, user_value, function(err, user_data) {
                            if (err) {
                                console.log(err)
                                var errorMsg = 'some error occurred';
                                sendResponse.sendErrorMessage(errorMsg, res);
                            } else {
                                var email = user_data[0]["email"]
                                var first_name = user_data[0]["first_name"]
                                var str = '<div style="margin:0;padding:0;font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif">'
                                str += '<table width="100%" cellpadding="0" cellspacing="0" border="0" align="center" style="font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif;max-width:600px;background-color:#ffffff;color:#666666;text-align:left;padding:0px 2% 10px 2%;background:url(http://teja1.kuikr.com/images/notification/mailer-bg.jpg) repeat #f9f9f9">'
                                str += '<tbody><tr>'
                                str += '<td height="20"></td>'
                                str += '</tr>'
                                str += '<tr>'
                                str += '<td height="43" valign="top"><table width="100%" cellspacing="0" cellpadding="0" border="0" align="center" style="max-width:530px">'
                                str += '<tbody><tr>'
                                //str += '<td align="left" height="43"><a href="#m_8496668978295844378_m_8306747430853343728_m_8934663683847810844_"><img src="' + url + 'logo.jpg" alt="Epardesh" width="94" height="43" border="0" style="margin:0;display:block;font-family:Arial,Helvetica,sans-serif;color:#007ebe;font-size:20px;text-align:center;font-weight:bold" class="CToWUd"></a></td>'
                                str += '<td align="left" height="43"><a href="#m_8496668978295844378_m_8306747430853343728_m_8934663683847810844_"><img src="' + url + 'logo.jpg" alt="Epardesh" width="180" border="0" style="width:220px;height:auto;margin:0;margin-left:-15px;margin-top:-20px;display:block;font-family:Arial,Helvetica,sans-serif;color:#007ebe;font-size:20px;text-align:center;font-weight:bold" class="CToWUd"></a></td>'


//                str += '<div style="text-align:Right;margin-bottom:10px">'
//                str += '<div style="padding:5px">'
//                str += '<a style="font-family:Arial,Helvetica,sans-serif;display:inline-block;min-height:22px;line-height:42px;padding:0px 20px;color:rgb(255,255,255);font-size:14px;font-weight:bold;border-radius:3px;white-space:nowrap;text-decoration:none;text-align:center;background-color:rgb(66,127,237)" href="' + classified_url_email + '" target="_blank">Post free ad</a><br>'
//                str += '</div>'
//                str += '</div>'

                                str += '</tr>'
                                str += '</tbody></table></td>'
                                str += '</tr>'
                                str += '<tr>'
                                str += '<td height="10"></td>'
                                str += '</tr>'
                                str += '<tr>'
                                str += '<td><table width="100%" align="center" cellspacing="0" cellpadding="0" border="0" style="max-width:530px;width:100%!important;background:#ffffff;border:1px solid #e3e3e3;border-radius:3px">'
                                str += '<tbody><tr>'
                                str += '<td height="20"></td>'
                                str += '</tr>'
                                str += '<tr>'
                                str += '</tr>'
                                str += '<tr>'
                                str += '<td align="center" style="font-size:25px;color:#333333;padding:10px 20px 0px;font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif">Ad Removed</td>'
                                str += '</tr>'
                                str += '<tr>'
                                str += '<td height="10"></td>'
                                str += '</tr>'
                                str += '<tr>'
                                str += '<td align="center"><table width="140" align="center" border="0" cellpadding="0" cellspacing="0" bgcolor="#008BCF">'
                                str += '<tbody>'
                                str += '<tr>'
                                str += '<td height="2" style="font-size:1px;line-height:1px"></td>'
                                str += '</tr>'
                                str += '</tbody>'
                                str += '</table></td>'
                                str += '</tr>'
                                str += '<tr>'
                                str += '<td height="35"></td>'
                                str += '</tr>'
                                str += '<tr>'
                                str += '<td><table width="100%" align="center" cellspacing="0" cellpadding="0" border="0" style="padding:0px 20px;text-align:left">'
                                str += '<tbody><tr>'
                                str += '<td style="font-size:20px;padding:0px 30px;color:#444444;font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif">Dear ' + first_name + ',</td>'
                                str += '</tr>'
                                str += '<tr>'
                                str += '<td height="10"></td>'
                                str += '</tr>'
                                str += '<tr>'
                                str += '<td style="font-size:12px;padding:0px 30px;color:#444444;line-height:19px;font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif">Your ad having id EPCA' + ad_id + ' has been deleted by admin. For more information Please contact admin.</td>'
                                str += '</tr>'

//                str += '<tr>'
//                str += '<td style="font-size:12px;padding:0px 30px;color:#444444;line-height:19px;font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif">&#10147; Free online AD posting.</td>'
//                str += '</tr>'
//
//                str += '<tr>'
//                str += '<td style="font-size:12px;padding:0px 30px;color:#444444;line-height:19px;font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif">&#10147; Free online Event posting.</td>'
//                str += '</tr>'
//
//                str += '<tr>'
//                str += '<td style="font-size:12px;padding:0px 30px;color:#444444;line-height:19px;font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif">&#10147; Free online IT Training posting.</td>'
//                str += '</tr>'
//
//                str += '<tr>'
//                str += '<td style="font-size:12px;padding:0px 30px;color:#444444;line-height:19px;font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif">&#10147; Banner AD facility to show Ad to your local users or nationwide users.</td>'
//                str += '</tr>'
//
//                str += '<tr>'
//                str += '<td style="font-size:12px;padding:0px 30px;color:#444444;line-height:19px;font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif">&#10147; Premium AD and Featured AD for greater visibility.</td>'
//                str += '</tr>'
//
//                str += '<tr>'
//                str += '<td style="font-size:12px;padding:0px 30px;color:#444444;line-height:19px;font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif">&#10147; Special discounts through our promocodes...regularly check when promocodes are available.</td>'
//                str += '</tr>'
//
//                str += '<tr>'
//                str += "<td style='font-size:12px;padding:0px 30px;color:#444444;line-height:19px;font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif'>Excited!!! Now it's time to post some ads..... Click link below to post your free ad today.</td>"
//                str += '</tr>'

                                str += '<tr>'
                                str += '<td height="20"></td>'
                                str += '</tr>'

//                str += '<div style="text-align:center;margin-bottom:10px">'
//                str += '<div style="padding:5px">'
//                str += '<a style="font-family:Arial,Helvetica,sans-serif;display:inline-block;min-height:22px;line-height:42px;padding:0px 20px;color:rgb(255,255,255);font-size:14px;font-weight:bold;border-radius:3px;white-space:nowrap;text-decoration:none;text-align:center;background-color:rgb(66,127,237)" href="' + classified_url_email + '" target="_blank">Post free ad</a><br>'
//                str += '</div>'
//                str += '</div>'

                                str += '<tr>'
                                str += '<td align="center">'
                                str += '<table width="185" cellpadding="0" cellspacing="0" border="0">'
                                str += '<tbody><tr>'
                                str += '</tr>'
                                str += '</tbody></table>'
                                str += '</td>'
                                str += '</tr>'
                                str += '<tr>'
                                str += '<td height="30"></td>'
                                str += '</tr>'
                                str += '</tbody></table></td>'
                                str += '</tr>'
                                str += '<tr>'
                                str += '<td height="40"></td>'
                                str += '</tr>'
                                str += '<tr>'
                                str += '<td style="font-size:12px;font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif;color:#444444;line-height:normal;padding:0px 40px;text-align:left">Sincerely,<br>'
                                str += '<style="font-size:12px;font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif;color:#444444;line-height:normal;padding:0px 20px;text-align:left">ePardesh Team,<br>'
                                str += '<strong style="font-size:12px;font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif;color:#444444;line-height:normal"><a href=' + matrimony_url + ' target="_blank" data-saferedirecturl=' + matrimony_url + '>www.ePardesh.com</a></strong></td>'
                                str += '</tr>'
                                str += '<tr>'
                                str += '<td height="20"></td>'
                                str += '</tr>'
                                str += '</tbody></table></td>'
                                str += '</tr>'
                                str += '<tr>'
                                str += '<td height="10"></td>'
                                str += '</tr>'
//                str += '<tr>'
//                str += '<td align="center" style="color:#444444;font-size:12px;font-family:"Open Sans",Gill Sans,Arial,Helvetica,sans-serif"><span style="color:#444444;font-size:12px;font-family:"Open Sans",Gill Sans,Arial,Helvetica,sans-serif">|</span><span style="color:#444444;font-size:12px;font-family:"Open Sans",Gill Sans,Arial,Helvetica,sans-serif">|</span></td>'
//                str += '</tr>'
                                str += '<tr>'
                                str += '<td height="20"></td>'
                                str += '</tr>'
                                str += '<tr>'
                                str += '<td align="center"><table cellpadding="0" cellspacing="0" align="center" border="0">'
                                str += '<tbody><tr>'
                                str += '<td width="8"></td>'
                                str += '<td width="8"></td>'
                                str += '</tr>'
                                str += '</tbody></table></td>'
                                str += '</tr>'
                                str += '<tr>'
                                str += '<td height="20"></td>'
                                str += '</tr>'
                                str += '<tr>'
                                str += '<td align="center"><table cellpadding="0" cellspacing="0" align="center" border="0">'
                                str += '<tbody><tr>'
                                str += '<td width="6"></td>'
                                str += '<td width="6"></td>'
                                str += '<td width="6"></td>'
                                str += '<td width="6"></td>'
                                str += '</tr>'
                                str += '</tbody></table></td>'
                                str += '</tr>'
                                str += '<tr>'
                                str += '<td height="9"></td>'
                                str += '</tr>'
                                str += '<tr>'
                                str += '<td align="center" style="font-size:11px;font-family:"Open Sans",Gill Sans,Arial,Helvetica,sans-serif;color:#444444"><p style="margin:0;padding:3px 0 0px;font-size:11px;font-family:"Open Sans",Gill Sans,Arial,Helvetica,sans-serif;line-height:13px">To view/edit your account information anytime, login to <a href=' + matrimony_url + ' target="_blank" data-saferedirecturl=' + matrimony_url + '>"My Account"</a>@<a href=' + matrimony_url + ' target="_blank" data-saferedirecturl=' + matrimony_url + '>www.EPardesh.com</a>.</p>'
//                str += '<p style="margin:0;padding:3px 0;font-size:11px;font-family:"Open Sans",Gill Sans,Arial,Helvetica,sans-serif;line-height:13px">For any assistance, visit the below website <a href=' + matrimony_url + ' style="font-size:11px;font-family:"Open Sans",Gill Sans,Arial,Helvetica,sans-serif;color:#007ebc;text-decoration:none" target="_blank" data-saferedirecturl=' + matrimony_url + '></a><a href=' + matrimony_url + ' style="font-size:11px;font-family:"Open Sans",Gill Sans,Arial,Helvetica,sans-serif;color:#008bcf;text-decoration:none" target="_blank"></a></p></td>'
                                str += '</tr>'
//                str += '<tr>'
//                str += '<td align="center" style="font-size:11px;font-family:"Open Sans",Gill Sans,Arial,Helvetica,sans-serif;color:#008bcf;line-height:13px">© <a href=' + matrimony_url + ' target="_blank" data-saferedirecturl=' + matrimony_url + '>www.EPardesh.com</a></td>'
//                str += '</tr>'
                                str += '</tbody></table>'
                                str += '</div>'

                                var mailOptions = {to: email, subject: 'ePardesh :: Admin Delete Ad', html: str};
                                transporter.sendMail(mailOptions, function(error, info) {
                                    if (error) {
                                        console.log("Error Found:");
                                        console.log(error);
                                    } else {
                                        var msg = {}
                                        sendResponse.sendSuccessData(msg, res);
                                    }
                                });
                            }
                        });
                    }
                })
            } else {
                var errorMsg = 'Ad not found';
                sendResponse.sendErrorMessage(errorMsg, res);
            }
        }
    })






});


/*
 * --------------------------------------------------------------------------
 * admin_block_unblock_ad
 * ---------------------------------------------------------------------------
 */
router.post('/admin_block_unblock_ad', function(req, res, next) {
    var status = req.body.status;
    var ad_id = req.body.ad_id;
    var check_ad = "select * from epardesh_ads WHERE id=?;";
    var ad_values = [ad_id]
    connection.query(check_ad, ad_values, function(err, ad) {
        if (err) {
            console.log(err)
            var errorMsg = 'some error occurred';
            sendResponse.sendErrorMessage(errorMsg, res);
        } else {
            if (ad.length > 0) {
                if (status == 1) {
                    var sql = "update epardesh_ads set block_status=1 where id=?";
                    var values = [ad_id]
                    connection.query(sql, values, function(err, rows) {
                        if (err) {
                            console.log(err)
                            var errorMsg = 'some error occurred';
                            sendResponse.sendErrorMessage(errorMsg, res);
                        } else {
                            
                            
                         console.log("user_id  " + ad[0]["user_id"])
                        var check_user = "select * from user where id=?"
                        var user_value = [ad[0]["user_id"]];
                        connection.query(check_user, user_value, function(err, user_data) {
                            if (err) {
                                console.log(err)
                                var errorMsg = 'some error occurred';
                                sendResponse.sendErrorMessage(errorMsg, res);
                            } else {
                                var email = user_data[0]["email"]
                                var first_name = user_data[0]["first_name"]
                                var str = '<div style="margin:0;padding:0;font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif">'
                                str += '<table width="100%" cellpadding="0" cellspacing="0" border="0" align="center" style="font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif;max-width:600px;background-color:#ffffff;color:#666666;text-align:left;padding:0px 2% 10px 2%;background:url(http://teja1.kuikr.com/images/notification/mailer-bg.jpg) repeat #f9f9f9">'
                                str += '<tbody><tr>'
                                str += '<td height="20"></td>'
                                str += '</tr>'
                                str += '<tr>'
                                str += '<td height="43" valign="top"><table width="100%" cellspacing="0" cellpadding="0" border="0" align="center" style="max-width:530px">'
                                str += '<tbody><tr>'
                                //str += '<td align="left" height="43"><a href="#m_8496668978295844378_m_8306747430853343728_m_8934663683847810844_"><img src="' + url + 'logo.jpg" alt="Epardesh" width="94" height="43" border="0" style="margin:0;display:block;font-family:Arial,Helvetica,sans-serif;color:#007ebe;font-size:20px;text-align:center;font-weight:bold" class="CToWUd"></a></td>'
                                str += '<td align="left" height="43"><a href="#m_8496668978295844378_m_8306747430853343728_m_8934663683847810844_"><img src="' + url + 'logo.jpg" alt="Epardesh" width="180" border="0" style="width:220px;height:auto;margin:0;margin-left:-15px;margin-top:-20px;display:block;font-family:Arial,Helvetica,sans-serif;color:#007ebe;font-size:20px;text-align:center;font-weight:bold" class="CToWUd"></a></td>'


//                str += '<div style="text-align:Right;margin-bottom:10px">'
//                str += '<div style="padding:5px">'
//                str += '<a style="font-family:Arial,Helvetica,sans-serif;display:inline-block;min-height:22px;line-height:42px;padding:0px 20px;color:rgb(255,255,255);font-size:14px;font-weight:bold;border-radius:3px;white-space:nowrap;text-decoration:none;text-align:center;background-color:rgb(66,127,237)" href="' + classified_url_email + '" target="_blank">Post free ad</a><br>'
//                str += '</div>'
//                str += '</div>'

                                str += '</tr>'
                                str += '</tbody></table></td>'
                                str += '</tr>'
                                str += '<tr>'
                                str += '<td height="10"></td>'
                                str += '</tr>'
                                str += '<tr>'
                                str += '<td><table width="100%" align="center" cellspacing="0" cellpadding="0" border="0" style="max-width:530px;width:100%!important;background:#ffffff;border:1px solid #e3e3e3;border-radius:3px">'
                                str += '<tbody><tr>'
                                str += '<td height="20"></td>'
                                str += '</tr>'
                                str += '<tr>'
                                str += '</tr>'
                                str += '<tr>'
                                str += '<td align="center" style="font-size:25px;color:#333333;padding:10px 20px 0px;font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif">Ad Block</td>'
                                str += '</tr>'
                                str += '<tr>'
                                str += '<td height="10"></td>'
                                str += '</tr>'
                                str += '<tr>'
                                str += '<td align="center"><table width="140" align="center" border="0" cellpadding="0" cellspacing="0" bgcolor="#008BCF">'
                                str += '<tbody>'
                                str += '<tr>'
                                str += '<td height="2" style="font-size:1px;line-height:1px"></td>'
                                str += '</tr>'
                                str += '</tbody>'
                                str += '</table></td>'
                                str += '</tr>'
                                str += '<tr>'
                                str += '<td height="35"></td>'
                                str += '</tr>'
                                str += '<tr>'
                                str += '<td><table width="100%" align="center" cellspacing="0" cellpadding="0" border="0" style="padding:0px 20px;text-align:left">'
                                str += '<tbody><tr>'
                                str += '<td style="font-size:20px;padding:0px 30px;color:#444444;font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif">Dear ' + first_name + ',</td>'
                                str += '</tr>'
                                str += '<tr>'
                                str += '<td height="10"></td>'
                                str += '</tr>'
                                str += '<tr>'
                                str += '<td style="font-size:12px;padding:0px 30px;color:#444444;line-height:19px;font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif">Your ad having id EPCA' + ad_id + ' has been blocked by admin. For more information Please contact admin.</td>'
                                str += '</tr>'

//                str += '<tr>'
//                str += '<td style="font-size:12px;padding:0px 30px;color:#444444;line-height:19px;font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif">&#10147; Free online AD posting.</td>'
//                str += '</tr>'
//
//                str += '<tr>'
//                str += '<td style="font-size:12px;padding:0px 30px;color:#444444;line-height:19px;font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif">&#10147; Free online Event posting.</td>'
//                str += '</tr>'
//
//                str += '<tr>'
//                str += '<td style="font-size:12px;padding:0px 30px;color:#444444;line-height:19px;font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif">&#10147; Free online IT Training posting.</td>'
//                str += '</tr>'
//
//                str += '<tr>'
//                str += '<td style="font-size:12px;padding:0px 30px;color:#444444;line-height:19px;font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif">&#10147; Banner AD facility to show Ad to your local users or nationwide users.</td>'
//                str += '</tr>'
//
//                str += '<tr>'
//                str += '<td style="font-size:12px;padding:0px 30px;color:#444444;line-height:19px;font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif">&#10147; Premium AD and Featured AD for greater visibility.</td>'
//                str += '</tr>'
//
//                str += '<tr>'
//                str += '<td style="font-size:12px;padding:0px 30px;color:#444444;line-height:19px;font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif">&#10147; Special discounts through our promocodes...regularly check when promocodes are available.</td>'
//                str += '</tr>'
//
//                str += '<tr>'
//                str += "<td style='font-size:12px;padding:0px 30px;color:#444444;line-height:19px;font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif'>Excited!!! Now it's time to post some ads..... Click link below to post your free ad today.</td>"
//                str += '</tr>'

                                str += '<tr>'
                                str += '<td height="20"></td>'
                                str += '</tr>'

//                str += '<div style="text-align:center;margin-bottom:10px">'
//                str += '<div style="padding:5px">'
//                str += '<a style="font-family:Arial,Helvetica,sans-serif;display:inline-block;min-height:22px;line-height:42px;padding:0px 20px;color:rgb(255,255,255);font-size:14px;font-weight:bold;border-radius:3px;white-space:nowrap;text-decoration:none;text-align:center;background-color:rgb(66,127,237)" href="' + classified_url_email + '" target="_blank">Post free ad</a><br>'
//                str += '</div>'
//                str += '</div>'

                                str += '<tr>'
                                str += '<td align="center">'
                                str += '<table width="185" cellpadding="0" cellspacing="0" border="0">'
                                str += '<tbody><tr>'
                                str += '</tr>'
                                str += '</tbody></table>'
                                str += '</td>'
                                str += '</tr>'
                                str += '<tr>'
                                str += '<td height="30"></td>'
                                str += '</tr>'
                                str += '</tbody></table></td>'
                                str += '</tr>'
                                str += '<tr>'
                                str += '<td height="40"></td>'
                                str += '</tr>'
                                str += '<tr>'
                                str += '<td style="font-size:12px;font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif;color:#444444;line-height:normal;padding:0px 40px;text-align:left">Sincerely,<br>'
                                str += '<style="font-size:12px;font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif;color:#444444;line-height:normal;padding:0px 20px;text-align:left">ePardesh Team,<br>'
                                str += '<strong style="font-size:12px;font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif;color:#444444;line-height:normal"><a href=' + matrimony_url + ' target="_blank" data-saferedirecturl=' + matrimony_url + '>www.ePardesh.com</a></strong></td>'
                                str += '</tr>'
                                str += '<tr>'
                                str += '<td height="20"></td>'
                                str += '</tr>'
                                str += '</tbody></table></td>'
                                str += '</tr>'
                                str += '<tr>'
                                str += '<td height="10"></td>'
                                str += '</tr>'
//                str += '<tr>'
//                str += '<td align="center" style="color:#444444;font-size:12px;font-family:"Open Sans",Gill Sans,Arial,Helvetica,sans-serif"><span style="color:#444444;font-size:12px;font-family:"Open Sans",Gill Sans,Arial,Helvetica,sans-serif">|</span><span style="color:#444444;font-size:12px;font-family:"Open Sans",Gill Sans,Arial,Helvetica,sans-serif">|</span></td>'
//                str += '</tr>'
                                str += '<tr>'
                                str += '<td height="20"></td>'
                                str += '</tr>'
                                str += '<tr>'
                                str += '<td align="center"><table cellpadding="0" cellspacing="0" align="center" border="0">'
                                str += '<tbody><tr>'
                                str += '<td width="8"></td>'
                                str += '<td width="8"></td>'
                                str += '</tr>'
                                str += '</tbody></table></td>'
                                str += '</tr>'
                                str += '<tr>'
                                str += '<td height="20"></td>'
                                str += '</tr>'
                                str += '<tr>'
                                str += '<td align="center"><table cellpadding="0" cellspacing="0" align="center" border="0">'
                                str += '<tbody><tr>'
                                str += '<td width="6"></td>'
                                str += '<td width="6"></td>'
                                str += '<td width="6"></td>'
                                str += '<td width="6"></td>'
                                str += '</tr>'
                                str += '</tbody></table></td>'
                                str += '</tr>'
                                str += '<tr>'
                                str += '<td height="9"></td>'
                                str += '</tr>'
                                str += '<tr>'
                                str += '<td align="center" style="font-size:11px;font-family:"Open Sans",Gill Sans,Arial,Helvetica,sans-serif;color:#444444"><p style="margin:0;padding:3px 0 0px;font-size:11px;font-family:"Open Sans",Gill Sans,Arial,Helvetica,sans-serif;line-height:13px">To view/edit your account information anytime, login to <a href=' + matrimony_url + ' target="_blank" data-saferedirecturl=' + matrimony_url + '>"My Account"</a>@<a href=' + matrimony_url + ' target="_blank" data-saferedirecturl=' + matrimony_url + '>www.EPardesh.com</a>.</p>'
//                str += '<p style="margin:0;padding:3px 0;font-size:11px;font-family:"Open Sans",Gill Sans,Arial,Helvetica,sans-serif;line-height:13px">For any assistance, visit the below website <a href=' + matrimony_url + ' style="font-size:11px;font-family:"Open Sans",Gill Sans,Arial,Helvetica,sans-serif;color:#007ebc;text-decoration:none" target="_blank" data-saferedirecturl=' + matrimony_url + '></a><a href=' + matrimony_url + ' style="font-size:11px;font-family:"Open Sans",Gill Sans,Arial,Helvetica,sans-serif;color:#008bcf;text-decoration:none" target="_blank"></a></p></td>'
                                str += '</tr>'
//                str += '<tr>'
//                str += '<td align="center" style="font-size:11px;font-family:"Open Sans",Gill Sans,Arial,Helvetica,sans-serif;color:#008bcf;line-height:13px">© <a href=' + matrimony_url + ' target="_blank" data-saferedirecturl=' + matrimony_url + '>www.EPardesh.com</a></td>'
//                str += '</tr>'
                                str += '</tbody></table>'
                                str += '</div>'

                                var mailOptions = {to: email, subject: 'ePardesh :: Admin Block Ad', html: str};
                                transporter.sendMail(mailOptions, function(error, info) {
                                    if (error) {
                                        console.log("Error Found:");
                                        console.log(error);
                                    } else {
                                        var msg = {}
                                        sendResponse.sendSuccessData(msg, res);
                                    }
                                });
                            }
                        });
                        }
                    })
                } else {
                    var sql = "update epardesh_ads set block_status=0 where id=?";
                    var values = [ad_id]
                    connection.query(sql, values, function(err, rows) {
                        if (err) {
                            console.log(err)
                            var errorMsg = 'some error occurred';
                            sendResponse.sendErrorMessage(errorMsg, res);
                        } else {
                       console.log("user_id  " + ad[0]["user_id"])
                        var check_user = "select * from user where id=?"
                        var user_value = [ad[0]["user_id"]];
                        connection.query(check_user, user_value, function(err, user_data) {
                            if (err) {
                                console.log(err)
                                var errorMsg = 'some error occurred';
                                sendResponse.sendErrorMessage(errorMsg, res);
                            } else {
                                var email = user_data[0]["email"]
                                var first_name = user_data[0]["first_name"]
                                var str = '<div style="margin:0;padding:0;font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif">'
                                str += '<table width="100%" cellpadding="0" cellspacing="0" border="0" align="center" style="font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif;max-width:600px;background-color:#ffffff;color:#666666;text-align:left;padding:0px 2% 10px 2%;background:url(http://teja1.kuikr.com/images/notification/mailer-bg.jpg) repeat #f9f9f9">'
                                str += '<tbody><tr>'
                                str += '<td height="20"></td>'
                                str += '</tr>'
                                str += '<tr>'
                                str += '<td height="43" valign="top"><table width="100%" cellspacing="0" cellpadding="0" border="0" align="center" style="max-width:530px">'
                                str += '<tbody><tr>'
                                //str += '<td align="left" height="43"><a href="#m_8496668978295844378_m_8306747430853343728_m_8934663683847810844_"><img src="' + url + 'logo.jpg" alt="Epardesh" width="94" height="43" border="0" style="margin:0;display:block;font-family:Arial,Helvetica,sans-serif;color:#007ebe;font-size:20px;text-align:center;font-weight:bold" class="CToWUd"></a></td>'
                                str += '<td align="left" height="43"><a href="#m_8496668978295844378_m_8306747430853343728_m_8934663683847810844_"><img src="' + url + 'logo.jpg" alt="Epardesh" width="180" border="0" style="width:220px;height:auto;margin:0;margin-left:-15px;margin-top:-20px;display:block;font-family:Arial,Helvetica,sans-serif;color:#007ebe;font-size:20px;text-align:center;font-weight:bold" class="CToWUd"></a></td>'


//                str += '<div style="text-align:Right;margin-bottom:10px">'
//                str += '<div style="padding:5px">'
//                str += '<a style="font-family:Arial,Helvetica,sans-serif;display:inline-block;min-height:22px;line-height:42px;padding:0px 20px;color:rgb(255,255,255);font-size:14px;font-weight:bold;border-radius:3px;white-space:nowrap;text-decoration:none;text-align:center;background-color:rgb(66,127,237)" href="' + classified_url_email + '" target="_blank">Post free ad</a><br>'
//                str += '</div>'
//                str += '</div>'

                                str += '</tr>'
                                str += '</tbody></table></td>'
                                str += '</tr>'
                                str += '<tr>'
                                str += '<td height="10"></td>'
                                str += '</tr>'
                                str += '<tr>'
                                str += '<td><table width="100%" align="center" cellspacing="0" cellpadding="0" border="0" style="max-width:530px;width:100%!important;background:#ffffff;border:1px solid #e3e3e3;border-radius:3px">'
                                str += '<tbody><tr>'
                                str += '<td height="20"></td>'
                                str += '</tr>'
                                str += '<tr>'
                                str += '</tr>'
                                str += '<tr>'
                                str += '<td align="center" style="font-size:25px;color:#333333;padding:10px 20px 0px;font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif">Ad Block</td>'
                                str += '</tr>'
                                str += '<tr>'
                                str += '<td height="10"></td>'
                                str += '</tr>'
                                str += '<tr>'
                                str += '<td align="center"><table width="140" align="center" border="0" cellpadding="0" cellspacing="0" bgcolor="#008BCF">'
                                str += '<tbody>'
                                str += '<tr>'
                                str += '<td height="2" style="font-size:1px;line-height:1px"></td>'
                                str += '</tr>'
                                str += '</tbody>'
                                str += '</table></td>'
                                str += '</tr>'
                                str += '<tr>'
                                str += '<td height="35"></td>'
                                str += '</tr>'
                                str += '<tr>'
                                str += '<td><table width="100%" align="center" cellspacing="0" cellpadding="0" border="0" style="padding:0px 20px;text-align:left">'
                                str += '<tbody><tr>'
                                str += '<td style="font-size:20px;padding:0px 30px;color:#444444;font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif">Dear ' + first_name + ',</td>'
                                str += '</tr>'
                                str += '<tr>'
                                str += '<td height="10"></td>'
                                str += '</tr>'
                                str += '<tr>'
                                str += '<td style="font-size:12px;padding:0px 30px;color:#444444;line-height:19px;font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif">Your ad having id EPCA' + ad_id + ' has been unblocked by admin. For more information Please contact admin.</td>'
                                str += '</tr>'

//                str += '<tr>'
//                str += '<td style="font-size:12px;padding:0px 30px;color:#444444;line-height:19px;font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif">&#10147; Free online AD posting.</td>'
//                str += '</tr>'
//
//                str += '<tr>'
//                str += '<td style="font-size:12px;padding:0px 30px;color:#444444;line-height:19px;font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif">&#10147; Free online Event posting.</td>'
//                str += '</tr>'
//
//                str += '<tr>'
//                str += '<td style="font-size:12px;padding:0px 30px;color:#444444;line-height:19px;font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif">&#10147; Free online IT Training posting.</td>'
//                str += '</tr>'
//
//                str += '<tr>'
//                str += '<td style="font-size:12px;padding:0px 30px;color:#444444;line-height:19px;font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif">&#10147; Banner AD facility to show Ad to your local users or nationwide users.</td>'
//                str += '</tr>'
//
//                str += '<tr>'
//                str += '<td style="font-size:12px;padding:0px 30px;color:#444444;line-height:19px;font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif">&#10147; Premium AD and Featured AD for greater visibility.</td>'
//                str += '</tr>'
//
//                str += '<tr>'
//                str += '<td style="font-size:12px;padding:0px 30px;color:#444444;line-height:19px;font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif">&#10147; Special discounts through our promocodes...regularly check when promocodes are available.</td>'
//                str += '</tr>'
//
//                str += '<tr>'
//                str += "<td style='font-size:12px;padding:0px 30px;color:#444444;line-height:19px;font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif'>Excited!!! Now it's time to post some ads..... Click link below to post your free ad today.</td>"
//                str += '</tr>'

                                str += '<tr>'
                                str += '<td height="20"></td>'
                                str += '</tr>'

//                str += '<div style="text-align:center;margin-bottom:10px">'
//                str += '<div style="padding:5px">'
//                str += '<a style="font-family:Arial,Helvetica,sans-serif;display:inline-block;min-height:22px;line-height:42px;padding:0px 20px;color:rgb(255,255,255);font-size:14px;font-weight:bold;border-radius:3px;white-space:nowrap;text-decoration:none;text-align:center;background-color:rgb(66,127,237)" href="' + classified_url_email + '" target="_blank">Post free ad</a><br>'
//                str += '</div>'
//                str += '</div>'

                                str += '<tr>'
                                str += '<td align="center">'
                                str += '<table width="185" cellpadding="0" cellspacing="0" border="0">'
                                str += '<tbody><tr>'
                                str += '</tr>'
                                str += '</tbody></table>'
                                str += '</td>'
                                str += '</tr>'
                                str += '<tr>'
                                str += '<td height="30"></td>'
                                str += '</tr>'
                                str += '</tbody></table></td>'
                                str += '</tr>'
                                str += '<tr>'
                                str += '<td height="40"></td>'
                                str += '</tr>'
                                str += '<tr>'
                                str += '<td style="font-size:12px;font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif;color:#444444;line-height:normal;padding:0px 40px;text-align:left">Sincerely,<br>'
                                str += '<style="font-size:12px;font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif;color:#444444;line-height:normal;padding:0px 20px;text-align:left">ePardesh Team,<br>'
                                str += '<strong style="font-size:12px;font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif;color:#444444;line-height:normal"><a href=' + matrimony_url + ' target="_blank" data-saferedirecturl=' + matrimony_url + '>www.ePardesh.com</a></strong></td>'
                                str += '</tr>'
                                str += '<tr>'
                                str += '<td height="20"></td>'
                                str += '</tr>'
                                str += '</tbody></table></td>'
                                str += '</tr>'
                                str += '<tr>'
                                str += '<td height="10"></td>'
                                str += '</tr>'
//                str += '<tr>'
//                str += '<td align="center" style="color:#444444;font-size:12px;font-family:"Open Sans",Gill Sans,Arial,Helvetica,sans-serif"><span style="color:#444444;font-size:12px;font-family:"Open Sans",Gill Sans,Arial,Helvetica,sans-serif">|</span><span style="color:#444444;font-size:12px;font-family:"Open Sans",Gill Sans,Arial,Helvetica,sans-serif">|</span></td>'
//                str += '</tr>'
                                str += '<tr>'
                                str += '<td height="20"></td>'
                                str += '</tr>'
                                str += '<tr>'
                                str += '<td align="center"><table cellpadding="0" cellspacing="0" align="center" border="0">'
                                str += '<tbody><tr>'
                                str += '<td width="8"></td>'
                                str += '<td width="8"></td>'
                                str += '</tr>'
                                str += '</tbody></table></td>'
                                str += '</tr>'
                                str += '<tr>'
                                str += '<td height="20"></td>'
                                str += '</tr>'
                                str += '<tr>'
                                str += '<td align="center"><table cellpadding="0" cellspacing="0" align="center" border="0">'
                                str += '<tbody><tr>'
                                str += '<td width="6"></td>'
                                str += '<td width="6"></td>'
                                str += '<td width="6"></td>'
                                str += '<td width="6"></td>'
                                str += '</tr>'
                                str += '</tbody></table></td>'
                                str += '</tr>'
                                str += '<tr>'
                                str += '<td height="9"></td>'
                                str += '</tr>'
                                str += '<tr>'
                                str += '<td align="center" style="font-size:11px;font-family:"Open Sans",Gill Sans,Arial,Helvetica,sans-serif;color:#444444"><p style="margin:0;padding:3px 0 0px;font-size:11px;font-family:"Open Sans",Gill Sans,Arial,Helvetica,sans-serif;line-height:13px">To view/edit your account information anytime, login to <a href=' + matrimony_url + ' target="_blank" data-saferedirecturl=' + matrimony_url + '>"My Account"</a>@<a href=' + matrimony_url + ' target="_blank" data-saferedirecturl=' + matrimony_url + '>www.EPardesh.com</a>.</p>'
//                str += '<p style="margin:0;padding:3px 0;font-size:11px;font-family:"Open Sans",Gill Sans,Arial,Helvetica,sans-serif;line-height:13px">For any assistance, visit the below website <a href=' + matrimony_url + ' style="font-size:11px;font-family:"Open Sans",Gill Sans,Arial,Helvetica,sans-serif;color:#007ebc;text-decoration:none" target="_blank" data-saferedirecturl=' + matrimony_url + '></a><a href=' + matrimony_url + ' style="font-size:11px;font-family:"Open Sans",Gill Sans,Arial,Helvetica,sans-serif;color:#008bcf;text-decoration:none" target="_blank"></a></p></td>'
                                str += '</tr>'
//                str += '<tr>'
//                str += '<td align="center" style="font-size:11px;font-family:"Open Sans",Gill Sans,Arial,Helvetica,sans-serif;color:#008bcf;line-height:13px">© <a href=' + matrimony_url + ' target="_blank" data-saferedirecturl=' + matrimony_url + '>www.EPardesh.com</a></td>'
//                str += '</tr>'
                                str += '</tbody></table>'
                                str += '</div>'

                                var mailOptions = {to: email, subject: 'ePardesh :: Admin Unblock Ad', html: str};
                                transporter.sendMail(mailOptions, function(error, info) {
                                    if (error) {
                                        console.log("Error Found:");
                                        console.log(error);
                                    } else {
                                        var msg = {}
                                        sendResponse.sendSuccessData(msg, res);
                                    }
                                });
                            }
                        });
                            
//                            var msg = {}
//                            sendResponse.sendSuccessData(msg, res);
                        }
                    })
                }
            } else {
                var errorMsg = 'ad does not exist';
                sendResponse.sendErrorMessage(errorMsg, res);
            }
        }
    })
});

/*
 * --------------------------------------------------------------------------
 * delete_users
 * ---------------------------------------------------------------------------
 */
//router.post('/delete_users', function (req, res, next) {
//    var user_id = req.body.user_id;
//    var check_user = 'select * from user where id=?'
//    var user_value = [user_id];
//    connection.query(check_user, user_value, function (err, rows) {
//        if (err) {
//            console.log(err)
//            var errorMsg = 'some error occurred';
//            sendResponse.sendErrorMessage(errorMsg, res);
//        } else {
//            if (rows.length > 0 || rows.length > '0') {
//                var sql = "DELETE FROM user WHERE id=?;";
//                var values = [user_id]
//                connection.query(sql, values, function (err, rows) {
//                    if (err) {
//                        console.log(err)
//                        var errorMsg = 'some error occurred';
//                        sendResponse.sendErrorMessage(errorMsg, res);
//                    } else {
//                        var msg = {};
//                        sendResponse.sendSuccessData(msg, res);
//                    }
//                })
//            } else {
//                var errorMsg = 'invalid user id';
//                sendResponse.sendErrorMessage(errorMsg, res);
//            }
//        }
//    })
//});

router.post('/delete_users', function(req, res, next) {
    var user_array = req.body.user_array;
    async.each(user_array, function(user, callback) {
        var delete_user = "delete from user where id=?"
        var user_value = [user]
        connection.query(delete_user, user_value, function(err, rows1) {
            if (err) {
                console.log(err)

            } else {
                console.log(rows1)
                var delete_ad = "delete from epardesh_ads where user_id=?"
                var user_value = [user]
                connection.query(delete_ad, user_value, function(err, rows2) {
                    if (err) {
                        console.log(err)

                    } else {
                        var delete_event = "delete from epardesh_events where user_id=?"
                        var user_value = [user]
                        connection.query(delete_event, user_value, function(err, rows3) {
                            if (err) {
                                console.log(err)

                            } else {
                                var delete_training = "delete from epardesh_training where user_id=?"
                                var user_value = [user]
                                connection.query(delete_training, user_value, function(err, rows4) {
                                    if (err) {
                                        console.log(err)

                                    } else {
                                    }
                                })
                            }
                        })
                    }
                })
            }
            callback();
        })
    }, function(err) {
        if (err) {
            console.log('A file failed to process');
        } else {
            var msg = {}
            sendResponse.sendSuccessData(msg, res);
        }
    })
});


/*
 * --------------------------------------------------------------------------
 * add_promocode
 * --------------------------------------------------------------------------
 */
router.post('/add_promocode', function(req, res, next) {
    var name = req.body.name;
    var discount = req.body.discount;
    var description = req.body.description;
    var is_active_status = req.body.is_active_status;
    var display_status = req.body.display_status;
    var add_promocode = "insert into classified_promocodes (name,discount,description,is_active_status,display_status) values (?,?,?,?,?)"
    var values = [name, discount, description, is_active_status, display_status]
    connection.query(add_promocode, values, function(err, rows) {
        if (err) {
            console.log(err)
            var errorMsg = 'some error occurred';
            sendResponse.sendErrorMessage(errorMsg, res);
        } else {
            var msg = {}
            sendResponse.sendSuccessData(msg, res);
        }
    });
})

/*
 * --------------------------------------------------------------------------
 * delete_promocode
 * --------------------------------------------------------------------------
 */
router.post('/delete_promocode', function(req, res, next) {
    var promocode_id = req.body.promocode_id;
    var delete_promocode = "delete from classified_promocodes where id=?"
    var values = [promocode_id]
    connection.query(delete_promocode, values, function(err, rows) {
        if (err) {
            console.log(err)
            var errorMsg = 'some error occurred';
            sendResponse.sendErrorMessage(errorMsg, res);
        } else {
            var msg = {}
            sendResponse.sendSuccessData(msg, res);
        }
    });
})

/*
 * --------------------------------------------------------------------------
 * find_india_cities
 * ---------------------------------------------------------------------------
 */
router.post('/find_india_cities', function(req, res, next) {
    var city_array = []
    var state_array = req.body.state_array;
//    var state_array = ['MADHYA PRADESH', 'PUNJAB', 'KARNATAKA', 'WEST BENGAL', 'KERALA', 'ORISSA','TAMIL NADU','TRIPURA','NAGALAND','MEGHALAYA']
    async.each(state_array, function(state, callback) {
        var get_india_cities = "select epardesh_states.location_name,india_cities.city_name from epardesh_states join india_cities on epardesh_states.id=india_cities.city_state where epardesh_states.location_name=?";
        var values = [state];
        console.log(state)
        connection.query(get_india_cities, values, function(err, rows) {
            if (err) {
                var errorMsg = 'some error occurred';
                sendResponse.sendErrorMessage(errorMsg, res);
            } else {
                console.log(rows.length)
                if (rows.length > 0) {
                    city_array.push(rows);
                } else {
                }
                callback();
            }
        })
    }, function(err) {
        if (err) {
            console.log('A file failed to process');
        } else {
            sendResponse.sendSuccessData(city_array, res);
        }
    })
});

/*
 * --------------------------------------------------------------------------
 * find_usa_cities
 * ---------------------------------------------------------------------------
 */
router.post('/find_usa_cities', function(req, res, next) {
    var city_array = []
    var state_array = req.body.state_array;
//    var state_array = ['MADHYA PRADESH', 'PUNJAB', 'KARNATAKA', 'WEST BENGAL', 'KERALA', 'ORISSA','TAMIL NADU','TRIPURA','NAGALAND','MEGHALAYA']
    async.each(state_array, function(state, callback) {
        var get_usa_cities = "select epardesh_states.location_name,USA_cities.city_name from epardesh_states join USA_cities on epardesh_states.id=USA_cities.city_state where epardesh_states.location_name=?";
        var values = [state];
        console.log(state)
        connection.query(get_usa_cities, values, function(err, rows) {
            if (err) {
                console.log(err)
                var errorMsg = 'some error occurred';
                sendResponse.sendErrorMessage(errorMsg, res);
            } else {
                console.log(rows.length)
                if (rows.length > 0) {
                    city_array.push(rows);
                } else {
                }
                callback();
            }
        })
    }, function(err) {
        if (err) {
            console.log('A file failed to process');
        } else {
            sendResponse.sendSuccessData(city_array, res);
        }
    })
});


/*
 * --------------------------------------------------------------------------
 * find_states
 * ---------------------------------------------------------------------------
 */
router.post('/find_states', function(req, res, next) {
    var state_array = []
    var country_array = req.body.country_array;
//    var state_array = ['MADHYA PRADESH', 'PUNJAB', 'KARNATAKA', 'WEST BENGAL', 'KERALA', 'ORISSA','TAMIL NADU','TRIPURA','NAGALAND','MEGHALAYA']
    async.each(country_array, function(country_id, callback) {
        var get_states = "select * from epardesh_states where country_id=?";
        var values = [country_id];
        console.log(country_id)
        connection.query(get_states, values, function(err, rows) {
            if (err) {
                console.log(err)
                var errorMsg = 'some error occurred';
                sendResponse.sendErrorMessage(errorMsg, res);
            } else {
                if (rows.length > 0) {
                    state_array.push(rows);
                } else {
                }
                callback();
            }
        })
    }, function(err) {
        if (err) {
            console.log('A file failed to process');
        } else {
            sendResponse.sendSuccessData(state_array, res);
        }
    })
});







module.exports = router;
