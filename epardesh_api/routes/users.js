//var express = require('express');
//var router = express.Router();
//var async = require('async');
//var md5 = require('md5');
//var request = require('request');
//var func = require('./commonfunction');
//var sendResponse = require('./sendresponse');
//
///* GET users listing. */
//router.get('/', function (req, res, next) {
//    res.send('respond with a resource');
//});
//
//
///*
// * --------------------------------------------------------------------------
// * register_user
// * INPUT : first_name,last_name,email, password
// * ---------------------------------------------------------------------------
// */
//router.post('/register_user', function (req, res, next) {
//    var first_name = req.body.first_name;
//    var last_name = req.body.last_name;
//    var email = req.body.email;
//    var phone = req.body.phone;
//    var city = req.body.city;
//    var state = req.body.state;
//    var country = req.body.country;
//    var address = req.body.address;
//    var password = req.body.password;
//    var user_type = req.body.user_type;
//    var business_name = req.body.business_name;
//    var website = req.body.website;
//    var manValues = [first_name, last_name, email, password, city, state, country, phone, user_type]
//    async.waterfall([
//        function (callback) {
//            func.checkBlank(res, manValues, callback);
//        },
//        function (callback) {
//            check_email_availability(res, email, callback);
//        }],
//            function (err, updatePopup, critical) {
//                var login_time = new Date();
//                var access_token = func.encrypt(email + login_time);
//                var encrypt_password = md5(password);
//                var str = "<h2>Welcome To EPardesh,</h2>";
//                str += "<p>Congratulations! You have been successfully registered with EPardesh. </p>";
//                str += "<p>Get the best deal & earn cashback everytime you shop.</p>";
//                str += "<p> Please click on the below link to enjoy shopping.</p>"
//                str += "<a href='http://www.technolofts.com/#/home/'>Click Here</a>";
//                str += "<p>Regards,</p>";
//                str += "<p>Team EPardesh</p>";
//                var sql = "INSERT INTO `user`(`first_name`,`last_name`, `email`,`phone`,`city`,`state`,`country`,`address`, `password`,`access_token`,`user_type`,`business_name`,`website`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)";
//                var values = [first_name, last_name, email, phone, city, state, country, address, encrypt_password, access_token, user_type, business_name, website];
//                console.log(values)
//                connection.query(sql, values, function (userInsertResult) {
//                    console.log(userInsertResult)
//                    var mailOptions = {to: email, subject: 'EPardesh: Registration Successful', html: str};
//                    transporter.sendMail(mailOptions, function (error, info) {
//                        if (error) {
//                            console.log("Error Found:");
//                            console.log(error);
//                            //throw err;
//                            //return console.log(error);
//                        } else {
//                            console.log('Message sent: ');
//                        }
//                    });
//                });
//                var sql = "SELECT * FROM user ORDER BY id DESC LIMIT 1";
//                connection.query(sql, function (err, rows) {
//                    if (err)
//                    {
//                        var errorMsg = 'some error occurred';
//                        sendResponse.sendErrorMessage(errorMsg, res);
//                    } else {
//                        var id = rows[0].id;
//                        var data = {first_name: first_name, last_name: last_name, email: email, access_token: access_token, id: id, user_type: user_type};
//                        sendResponse.sendSuccessData(data, res);
//                    }
//
//                });
//            });
//});
//
///*
// * --------------------------------------------------------------------------
// * login_user
// * INPUT : email, password
// * ---------------------------------------------------------------------------
// */
//router.post('/login_user', function (req, res, next) {
//    var email = req.body.email;
//    var password = req.body.password;
//    var encrypt_password = md5(password);
//    var manValues = [email, password, encrypt_password];
//    async.waterfall([
//        function (callback) {
//            func.checkBlank(res, manValues, callback);
//        },
//        function (callback) {
//            user_registered_check(res, email, callback);
//        }],
//            function () {
//                var sql = "SELECT * FROM user  WHERE `email`= ? ";
//                var values = [email];
//                connection.query(sql, values, function (err, rows) {
//                    if (err) {
//                        var errorMsg = 'some error occurred';
//                        sendResponse.sendErrorMessage(errorMsg, res);
//                    } else {
//                        if (rows[0].password == encrypt_password) {
//                            console.log(encrypt_password);
//                            console.log(rows[0].password);
//                            console.log("success");
//                            var data = {first_name: rows[0].first_name, last_name: rows[0].last_name, email: rows[0].email, access_token: rows[0].access_token, id: rows[0].id, user_type: rows[0].user_type};
//                            sendResponse.sendSuccessData(data, res);
//                        } else {
//                            var errorMsg = 'Email or password is incorrect.';
//                            sendResponse.sendErrorMessage(errorMsg, res);
//                        }
//                    }
//                });
//            })
//});
//
//
///*
// * --------------------------------------------------------------------------
// * forgot_password
// * INPUT : email
// * ---------------------------------------------------------------------------
// */
//router.post('/forgot_password', function (req, res, next) {
//    var email = req.body.email;
//    var manValues = [email];
//    async.waterfall([
//        function (callback) {
//            func.checkBlank(res, manValues, callback);
//        }
//    ], function (err, updatePopup, critical) {
//        var loginTime = new Date();
//        var activation_code = func.encrypt(email + loginTime);
//        var str = "<p>Hi,</p>";
//        str += "<p>We have received a password change request for your account.</p>";
//        str += "<p>If you made this request, then please click the below link to reset your password.</p>";
//        str += "<a href=' http://54.172.109.78/epardesh-web" + activation_code + "'>Click Here</a>";
//        str += "<p>If you did not ask to change your password, then please ignore this email. Another user may have entered your email by mistake. No changes will be made to your account.</p>"
//        str += "<p>Regards,</p>";
//        str += "<p>Team EPardesh</p>";
//        var mailOptions = {to: email, subject: 'Password Recovery', html: str};
//        transporter.sendMail(mailOptions, function (error, info) {
//            if (error) {
//                var errorMsg = 'some error occurred';
//                sendResponse.sendErrorMessage(errorMsg, res);
//            } else {
//                console.log('Message sent: ');
//            }
//        });
//        var sql = "update user set activation_code = ? where email = ?";
//        var values = [activation_code, email];
//        connection.query(sql, values, function (userInsertResult) {
//            var Msg = 'kindly check your email';
//            sendResponse.sendSuccessData(Msg, res);
//            console.log("done");
//        })
//
//    })
//});
//
///*
// * --------------------------------------------------------------------------
// * update_password
// * INPUT : token,newpassword
// * ---------------------------------------------------------------------------
// */
//router.post('/update_password', function (req, res, next) {
//    var activation_code = req.body.activation_code;
//    var new_password = req.body.new_password;
//    var encrypt_password = md5(new_password);
//    var manValues = [activation_code, encrypt_password];
//    async.waterfall([
//        function (callback) {
//            func.checkBlank(res, manValues, callback);
//        }],
//            function () {
//                var sql = "SELECT activation_code, password FROM user where activation_code=?";
//                var values = [activation_code];
//                connection.query(sql, values, function (err, rows) {
//                    if (err) {
//                        console.log("error1")
//                        var Msg = 'some error occurred';
//                        sendResponse.sendErrorMessage(Msg, res);
//                    } else {
//                        if (rows == "") {
//                            console.log('row1')
//                            console.log(rows)
//                            var Msg = 'Unauthorised access!';
//                            sendResponse.sendErrorMessage(Msg, res);
//                        } else {
//                            if (activation_code == rows[0].activation_code) {
//                                var loginTime = new Date();
//                                var code = func.encrypt(activation_code + loginTime);
//                                var sql = "update user set password = ? , activation_code = ? where activation_code = ?";
//                                var values = [encrypt_password,code, activation_code];
//                                connection.query(sql, values, function (err, userInsertResult) {
//                                    if (err) {
//                                        console.log("error2")
//                                        var Msg = 'Unauthorised access!';
//                                        sendResponse.sendErrorMessage(Msg, res);
//                                    } else {
//                                        console.log('row2')
//                                        console.log(userInsertResult)
//                                        var Msg = 'password updated successfully';
//                                        sendResponse.sendSuccessData(Msg, res);
//                                    }
//                                })
//                            }
//                        }
//                    };
//                });
//            });
//});
//
///*
// * --------------------------------------------------------------------------
// * change_password
// * INPUT : old_password,new_password, access_token
// * ---------------------------------------------------------------------------
// */
//router.post('/change_password', function (req, res, next) {
//    var old_password = req.body.old_password;
//    var new_password = req.body.new_password;
//    var token = req.body.token;
//    var manValues = [old_password, new_password, token];
//    async.waterfall([
//        function (callback) {
//            func.checkBlank(res, manValues, callback);
//        }
//    ], function () {
//        var encrypt_old_password = md5(old_password);
//        var encrypt_new_password = md5(new_password);
//        var sql = "SELECT access_token, password FROM user where access_token=?";
//        var values = [token];
//        connection.query(sql, values, function (err, rows) {
//            if (err) {
//                var errorMsg = 'some error occurred';
//                sendResponse.sendErrorMessage(errorMsg, res);
//            } else {
//                if (rows == "") {
//                    console.log("in if");
//                    var Msg = 'Unauthorised access';
//                    sendResponse.sendErrorMessage(Msg, res);
//                } else {
//                    console.log("in else");
//                    console.log(rows);
//                    console.log("rows");
//                    if (encrypt_old_password == rows[0].password) {
//                        var sql = "update user set password = ? where access_token = ?";
//                        var values = [encrypt_new_password, token];
//                        connection.query(sql, values, function (err, userInsertResult) {
//                            var Msg = 'password updated successfully';
//                            sendResponse.sendSuccessData(Msg, res);
//                        })
//                    } else
//                    {
//                        var Msg = 'Old password do not match';
//                        sendResponse.sendErrorMessage(Msg, res);
//                    }
//                }
//            }
//            ;
//        });
//    })
//});
//
///*
// * --------------------------------------------------------------------------
// * update_user_profile
// * ---------------------------------------------------------------------------
// */
//router.post('/update_user_profile', function (req, res, next) {
//    var first_name = req.body.first_name;
//    var last_name = req.body.last_name;
//    var phone = req.body.phone;
//    var city = req.body.city;
//    var state = req.body.state;
//    var country = req.body.country;
//    var address = req.body.address;
//    var business_name = req.body.business_name;
//    var website = req.body.website;
//    var email = req.body.email;
//    async.waterfall([
//    ], function () {
//        var sql = "UPDATE user SET first_name=?,last_name=?,phone=?,city=?,state=?,country=?,address=?,business_name=?,website=? WHERE email=?";
//        var values = [first_name,last_name,phone,city,state,country,address,business_name,website,email];
//        connection.query(sql, values, function (err, rows, fields) {
//            if (err) {
//                console.log(err)
//                var msg = "some error occurred";
//                sendResponse.sendErrorMessage(msg, res);
//            } else {
//                console.log("in success" + rows);
//                var msg = "inserted successfully"
//                sendResponse.sendSuccessData(msg, res);
//            }
//        });
//    });
//});
//
//
///*
// * --------------------------------------------------------------------------
// * login_using_facebook
// * ---------------------------------------------------------------------------
// */
//router.post('/auth/facebook', function (req, res) {
//    console.log("in facebook")
//    var fields = ['id', 'email', 'first_name', 'last_name', 'link', 'name'];
//    console.log("before accessTokenUrl");
//    var accessTokenUrl = 'https://graph.facebook.com/v2.5/oauth/access_token';
//    console.log("after accessTokenUrl");
//    var graphApiUrl = 'https://graph.facebook.com/v2.5/me?fields=' + fields.join(',');
//    console.log("before params");
//    var params = {
//        code: req.body.code,
//        client_id: req.body.clientId,
//        client_secret: "f9a4ff705dfe70c74d4a1878f9f0b83d",
//        redirect_uri: req.body.redirectUri
//    };
//    console.log("params");
//    console.log(params);
//
//    // Step 1. Exchange authorization code for access token.
//    // userAccessToken = facebookApp.getUserAccessToken();
//    request.get({url: accessTokenUrl, qs: params, json: true}, function (err, response, accessToken) {
//        if (response.statusCode !== 200) {
//            console.log("err");
//            console.log(err);
//            console.log("response");
//            console.log(response);
//            console.log(accessToken.error.message);
//            return res.status(500).send({message: accessToken.error.message});
//        }
//        console.log("above step2")
//        // Step 2. Retrieve profile information about the current user.
//        request.get({url: graphApiUrl, qs: accessToken, json: true}, function (err, response, profile) {
//            if (response.statusCode !== 200) {
//                return res.status(500).send({message: profile.error.message});
//            }
//            console.log("profile");
//            console.log(profile);
//            console.log("profile.email");
//            console.log(profile.email);
//            var sql = "SELECT email FROM user WHERE email=?";
//            var email = profile.email;
//            var values = [email];
//            connection.query(sql, values, function (err, rows1) {
//                if (err) {
//                    console.log("Error Found1:");
//                    console.log(err);
//                    var errorMsg = 'Something went wrong, Please try again!';
//                    sendResponse.sendErrorMessage(errorMsg, res);
//                    //throw err;
//                } else {
//                    console.log("no error");
//                    console.log(rows1);
//                    var user_data = rows1.length;
//                    console.log(user_data);
//                    if (user_data > 0) {
//                        //var loginTime = new Date();
////                        var sql = "UPDATE user SET login_provider= 'facebook' WHERE email=?";
////                        var VALUES = [rows1[0].email];
//
////                        connection.query(sql, VALUES, function (err, rows2) {
////                            if (err) {
////                                console.log("Insert Result Fail Error:");
////                                console.log(err);
////                                var errorMsg = 'Something went wrong, Please try again!';
////                                send_response.sendErrorMessage(errorMsg, res);
////                                //throw err;
////                            } else {
//                        var sql = "SELECT email,access_token,first_name,last_name FROM user WHERE `email`=? limit 1";
//                        var values = [rows1[0].email];
//                        console.log(values);
//                        connection.query(sql, values, function (err, rows3) {
//                            if (err) {
//                                console.log("Error Found2:");
//                                console.log(err);
//                                var errorMsg = 'Something went wrong, Please try again!';
//                                sendResponse.sendErrorMessage(errorMsg, res);
//                                //throw err;
//                            } else {
//
//                                console.log("in login")
//                                console.log(rows3);
//                                sendResponse.sendSuccessData(rows3, res);
//                            }
//                        });
////                            }
////                        })
//                    } else {
//                        var loginTime = new Date();
//                        var accessToken = func.encrypt(profile.email + loginTime);
//                        var email = profile.email;
//                        var password = "";
//                        var login_provider = "facebook";
//                        var token = accessToken;
//                        var salt = "";
//                        var refer_id = "";
//                        var referred_by_id = "";
//                        var verified = 0;
//                        var account_type = "public";
//                        var created_on = loginTime;
//                        var updated_on = loginTime;
//                        var first_name = profile.first_name;
//                        var last_name = profile.last_name;
//                        var facebook_id = profile.id;
//                        var sql = "INSERT INTO `user`(`email`,`password`,`first_name`,`last_name`, `access_token`,`facebook_id`) VALUES (?,?,?,?,?,?)";
//                        var values = [email, password, first_name, last_name, token, facebook_id];
//                        connection.query(sql, values, function (err, userInsertResult) {
//                            if (err) {
//                                console.log("Insert Result Fail Error:");
//                                console.log(err);
//                                var errorMsg = 'Something went wrong, Please try again!';
//                                sendResponse.sendErrorMessage(errorMsg, res);
//                                //throw err;
//                            } else {
//                                var sql = "select email,access_token,first_name,last_name from user WHERE email=?";
//                                var VALUES = [profile.email];
//                                connection.query(sql, VALUES, function (err, result_user) {
//                                    if (err) {
//                                        console.log("Error Found:");
//                                        console.log(err);
//                                        var errorMsg = 'Something went wrong, Please try again!';
//                                        send_response.sendErrorMessage(errorMsg, res);
//                                        //throw err;
//                                    } else {
//                                        console.log("in register")
//                                        // console.log(result_user)
//                                        sendResponse.sendSuccessData(result_user, res);
//                                    }
//                                });
//                            }
//                        });
//                    }
//                }
//            })
//        });
//    });
//});
//
//
///*
// * --------------------------------------------------------------------------
// * login_using_google
// * ---------------------------------------------------------------------------
// */
//router.post('/auth/google', function (req, res) {
//    console.log("in funct")
//    var accessTokenUrl = 'https://accounts.google.com/o/oauth2/token';
//    var peopleApiUrl = 'https://www.googleapis.com/plus/v1/people/me/openIdConnect';
//    var params = {
//        code: req.body.code,
//        client_id: req.body.clientId,
//        client_secret: "M5afO2Fn-EsyPCdpwh1Iw2z9",
//        redirect_uri: req.body.redirectUri,
//        grant_type: 'authorization_code'
//    };
//    console.log("after param funct")
//    console.log(params)
//    //res.send("in ");
//    // Step 1. Exchange authorization code for access token.
//    request.post(accessTokenUrl, {json: true, form: params}, function (err, response, token) {
//        console.log("err")
//        console.log(err)
//        console.log("token")
//        console.log(token)
//        console.log("token");
//        console.log(token.access_token);
//        //res.send("in request ");
//        var accessToken = token.access_token;
//        var headers = {Authorization: 'Bearer ' + accessToken};
//
//        //Step 2. Retrieve profile information about the current user.
//        request.get({url: peopleApiUrl, headers: headers, json: true}, function (err, response, profile) {
//            if (profile.error) {
//                console.log(err)
//                console.log("in profile error");
//                return res.status(500).send({message: profile.error.message});
//            }
//            console.log("profile")
//            console.log(profile)
//            var sql = "SELECT email FROM user WHERE email=?";
//            var email = profile.email;
//            var values = [email];
//            connection.query(sql, values, function (err, rows1) {
//                if (err) {
//                    console.log("Error Found:");
//                    console.log(err);
//                    var errorMsg = 'Something went wrong, Please try again!';
//                    send_response.sendErrorMessage(errorMsg, res);
//                    //throw err;
//                } else {
//                    var user_data = rows1.length
//                    if (user_data > 0) {
//                        //var loginTime = new Date();
////                        var sql = "UPDATE user SET login_provider= 'facebook' WHERE email=?";
////                        var VALUES = [rows1[0].email];
////                        connection.query(sql, VALUES, function (err, rows2) {
////                            if (err) {
////                                console.log("Insert Result Fail Error:");
////                                console.log(err);
////                                var errorMsg = 'Something went wrong, Please try again!';
////                                send_response.sendErrorMessage(errorMsg, res);
////                                //throw err;
////                            } else {
//                        var sql = "SELECT email,access_token,first_name,last_name FROM user WHERE `email`=? limit 1";
//                        var values = [rows1[0].email];
//                        connection.query(sql, values, function (err, rows3) {
//                            if (err) {
//                                console.log("Error Found:");
//                                console.log(err);
//                                var errorMsg = 'Something went wrong, Please try again!';
//                                send_response.sendErrorMessage(errorMsg, res);
//                                //throw err;
//                            } else {
//                                console.log("in login")
//                                console.log(rows3)
//                                send_response.sendSuccessData(rows3, res);
//                            }
//                        });
////                            }
////                        })
//                    } else {
//                        var loginTime = new Date();
//                        var accessToken = func.encrypt(profile.email + loginTime);
//                        var email = profile.email;
//                        var password = "";
//                        var login_provider = "google";
//                        var token = accessToken;
//                        var salt = "";
//                        var refer_id = "";
//                        var referred_by_id = "";
//                        var verified = 0;
//                        var account_type = "public";
//                        var created_on = loginTime;
//                        var updated_on = loginTime;
//                        var google_id = profile.sub;
//                        var first_name = profile.given_name;
//                        var last_name = profile.family_name;
//                        console.log("checking");
//                        console.log(first_name);
//                        console.log(last_name);
//                        var sql = "INSERT INTO `user`(`email`,`password`,`first_name`,`last_name`, `access_token`,`google_id`) VALUES (?,?,?,?,?,?)";
//                        var values = [email, password, first_name, last_name, token, google_id];
//                        connection.query(sql, values, function (err, userInsertResult) {
//                            if (err) {
//                                console.log("Insert Result Fail Error:");
//                                console.log(err);
//                                var errorMsg = 'Something went wrong, Please try again!';
//                                send_response.sendErrorMessage(errorMsg, res);
//                                //throw err;
//                            } else {
//                                var sql = "select email,access_token,first_name,last_name from user WHERE email=?";
//                                var VALUES = [profile.email];
//                                connection.query(sql, VALUES, function (err, result_user) {
//                                    if (err) {
//                                        console.log("Error Found:");
//                                        console.log(err);
//                                        var errorMsg = 'Something went wrong, Please try again!';
//                                        send_response.sendErrorMessage(errorMsg, res);
//                                        //throw err;
//                                    } else {
//                                        console.log("in register")
//                                        console.log(result_user)
//                                        send_response.sendSuccessData(result_user, res);
//                                    }
//                                });
//                            }
//                        });
//                    }
//                }
//            })
//        });
//    });
//});
//
///*
// * --------------------------------------------------------------------------
// * admin_login
// * INPUT : user_name, password
// * ---------------------------------------------------------------------------
// */
//router.post('/admin_login', function (req, res, next) {
//    var email = req.body.user_name;
//    var password = req.body.password;
//    var manValues = [email, password];
//    async.waterfall([
//    ],
//            function () {
//                var sql = "SELECT * FROM admin_info  WHERE `user_name`= ? ";
//                var values = [email];
//                connection.query(sql, values, function (err, rows) {
//                    if (err) {
//                        var errorMsg = 'some error occurred';
//                        sendResponse.sendErrorMessage(errorMsg, res);
//                    } else {
//                        if (rows.length > 0) {
//                            if (rows[0].password == password) {
//                                var data = {user_name: rows[0].user_name};
//                                sendResponse.sendSuccessData(data, res);
//                            } else {
//                                var errorMsg = 'Email or password is incorrect.';
//                                sendResponse.sendErrorMessage(errorMsg, res);
//                            }
//                        } else {
//                            var msg = "User is not registered with us.Please register first";
//                            sendResponse.sendErrorMessage(msg, res);
//                        }
//                    }
//                });
//            })
//});
//
///*
// * --------------------------------------------------------------------------
// * epardesh_categories
// * INPUT : category, parent
// * ---------------------------------------------------------------------------
// */
//router.post('/epardesh_categories', function (req, res, next) {
//    var name = req.body.name;
//    var parent = req.body.parent;
//    var featured_status = req.body.featured_status
//    var sql = "insert into epardesh_categories(name,parent,featured_status) values(?,?,?)";
//    var values = [name, parent,featured_status];
//    connection.query(sql, values, function (err, rows) {
//        if (err) {
//            var errorMsg = 'some error occurred';
//            sendResponse.sendErrorMessage(errorMsg, res);
//        } else {
//            var sql1 = "select * from epardesh_categories where name=?";
//            var values1 = [name]
//            connection.query(sql1, values1, function (err, rows1) {
//                if (err) {
//                    var errorMsg = 'some error occurred';
//                    sendResponse.sendErrorMessage(errorMsg, res);
//                } else {
//                    sendResponse.sendSuccessData(rows1, res);
//                }
//            });
//        }
//    });
//});
//
///*
// * --------------------------------------------------------------------------
// * view_epardesh_categories
// * INPUT : category, parent
// * ---------------------------------------------------------------------------
// */
//router.post('/view_epardesh_categories', function (req, res, next) {
//    var data = [];
//    var all_categories = []
//    var sql = "select * from epardesh_categories where parent='0'";
//    connection.query(sql, function (err, rows) {
//        if (err) {
//            var errorMsg = 'some error occurred';
//            sendResponse.sendErrorMessage(errorMsg, res);
//        } else {
//            var no_of_categories = rows.length;
//            for (var i = 0; i < no_of_categories; i++) {
//                data = {
//                    category_id: rows[i].id,
//                    category_name: rows[i].name
//                }
//                all_categories.push(data)
//            }
//
//            sendResponse.sendSuccessData(all_categories, res);
//        }
//    });
//
//});
//
///*
// * --------------------------------------------------------------------------
// * view_epardesh_sub_categories
// * INPUT : category, parent
// * ---------------------------------------------------------------------------
// */
//router.post('/view_epardesh_sub_categories', function (req, res, next) {
//    var category_id = req.body.category_id;
//    var data = [];
//    var all_sub_categories = []
//    var sql = "select * from epardesh_categories where parent=?";
//    var values = [category_id];
//    console.log(values)
//    connection.query(sql, values, function (err, rows) {
//        if (err) {
//            var errorMsg = 'some error occurred';
//            sendResponse.sendErrorMessage(errorMsg, res);
//        } else {
//            console.log(rows)
//            var no_of_sub_categories = rows.length;
//            for (var i = 0; i < no_of_sub_categories; i++) {
//                data = {
//                    category_id: rows[i].id,
//                    category_name: rows[i].name
//                }
//                all_sub_categories.push(data)
//            }
//            sendResponse.sendSuccessData(all_sub_categories, res);
//        }
//    });
//
//});
//
///*
// * --------------------------------------------------------------------------
// * edit_epardesh_categories
// * INPUT : category_id, category_name,parent
// * ---------------------------------------------------------------------------
// */
//router.post('/edit_epardesh_categories', function (req, res, next) {
//    var category_id = req.body.category_id;
//    var category_name = req.body.category_name;
//    var parent = req.body.parent;
//    var featured_status = req.body.featured_status
//    var sql = "update epardesh_categories set name = ? where id = ?";
//    var values = [category_name, category_id]
//    connection.query(sql, values, function (err, rows) {
//        if (err) {
//            var errorMsg = 'some error occurred';
//            sendResponse.sendErrorMessage(errorMsg, res);
//        } else {
//            var msg = "updated successfully"
//            sendResponse.sendSuccessData(msg, res);
//        }
//    });
//});
//
///*
// * --------------------------------------------------------------------------
// * delete_epardesh_categories
// * INPUT : category_id, category_name,parent
// * ---------------------------------------------------------------------------
// */
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
//
///*
// * --------------------------------------------------------------------------
// * view_epardesh_states
// * INPUT : country_id
// * ---------------------------------------------------------------------------
// */
//router.post('/view_epardesh_states', function (req, res, next) {
//    var country_id = req.body.country_id;
//    var sql = "select * From epardesh_states where country_id=?";
//    var values = [country_id]
//    connection.query(sql, values, function (err, rows) {
//        if (err) {
//            var errorMsg = 'some error occurred';
//            sendResponse.sendErrorMessage(errorMsg, res);
//        } else {
//            sendResponse.sendSuccessData(rows, res);
//        }
//    });
//});
//
///*
// * --------------------------------------------------------------------------
// * view_epardesh_cities
// * INPUT : state_id
// * ---------------------------------------------------------------------------
// */
//router.post('/view_epardesh_cities', function (req, res, next) {
//    var state_id = req.body.state_id;
//    var country_id = req.body.country_id;
//    console.log(country_id)
//if(country_id == 1 || country_id == '1')
//{
//    var sql = "select * From india_cities where city_state=?";
//    var values = [state_id]
//    console.log("in india")
//    console.log(values)
//    connection.query(sql, values, function (err, rows) {
//        if (err) {
//            var errorMsg = 'some error occurred';
//            sendResponse.sendErrorMessage(errorMsg, res);
//        } else {
//            sendResponse.sendSuccessData(rows, res);
//        }
//    });
//    }else if(country_id == 2 || country_id == '2')
//    {
//    var sql = "select * From USA_cities where city_state=?";
//    var values = [state_id]
//    console.log("usa")
//    console.log(values)
//    connection.query(sql, values, function (err, rows) {
//        if (err) {
//            var errorMsg = 'some error occurred';
//            sendResponse.sendErrorMessage(errorMsg, res);
//        } else {
//            sendResponse.sendSuccessData(rows, res);
//        }
//    });
//    }
//});
//
//
///*
// * --------------------------------------------------------------------------
// * to check email already exists or not
// * ---------------------------------------------------------------------------
// */
//function check_email_availability(res, email, callback) {
//    var sql = "SELECT `email` FROM `user` WHERE `email`=? limit 1";
//    var values = [email];
//    connection.query(sql, values, function (err, userResponse) {
//        if (userResponse.length) {
//            var errorMsg = 'You are already registered with us, Please login to enjoy the services';
//            sendResponse.sendErrorMessage(errorMsg, res);
//        } else
//        {
//            callback();
//        }
//    });
//}
//
///*
// * --------------------------------------------------------------------------
// * to check user already exists or not
// * ---------------------------------------------------------------------------
// */
//function user_registered_check(res, email, callback) {
//    var sql = "SELECT * FROM `user` WHERE `email`=? limit 1";
//    var values = [email];
//    connection.query(sql, values, function (err, userResponse) {
//        if (userResponse.length) {
//            callback();
//        } else
//        {
//            var errorMsg = 'User is not registered with us.Please register first to enjoy the services';
//            sendResponse.sendErrorMessage(errorMsg, res);
//        }
//    });
//}
//
//
//module.exports = router;
