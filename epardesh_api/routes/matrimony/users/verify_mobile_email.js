/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var express = require('express');
var router = express.Router();
var async = require('async');
//var md5 = require('md5');
//var request = require('request');
var func = require('../../commonfunction');
var sendResponse = require('../../sendresponse');




/*
 * --------------------------------------------------------------------------
 * generate_otp
 * ---------------------------------------------------------------------------
 */
router.post('/generate_otp', function (req, res, next) {
    var id = req.body.id;
    var mobile = req.body.mobile;
    var access_token = req.body.access_token;
    var manValues = [id, mobile, access_token]
    async.waterfall([
        function (callback) {
            func.checkBlank(res, manValues, callback);
        },
        function (callback) {
            checkUser(res, access_token, callback);
        }],
            function () {
                var check_user = "select * from matrimony_user where id=?";
                var values = [id];
                connection.query(check_user, values, function (err, rows) {
                    if (err) {
                        console.log(err)
                        var errorMsg = 'some error occurred';
                        sendResponse.sendErrorMessage(errorMsg, res);
                    } else {
                        if (rows.length > 0) {
                            var random = getRandom(1000, 9999)
                            var random_string = random.toString();
                            var otp = random_string.substring(0, 4);
                            var store_otp = "update matrimony_user set otp=? where id=?";
                            var value = [otp, id];
                            connection.query(store_otp, value, function (err, rows) {
                                if (err) {
                                    console.log(err)
                                    var errorMsg = 'some error occurred';
                                    sendResponse.sendErrorMessage(errorMsg, res);
                                } else {
                                    client.messages.create({
                                        to: '+91' + mobile + '',
                                        from: admin_number,
                                        body: 'Hi, your one time password for epardesh is:' + otp + '',
                                    }, function (err, message) {
                                        console.log(err)
                                        //console.log(message.sid);
                                    });
                                    var msg = []
                                    sendResponse.sendSuccessData(msg, res);
                                }
                            })
                        } else {
                            var errorMsg = 'invalid id';
                            sendResponse.sendErrorMessage(errorMsg, res);
                        }
                    }
                })
            });
})

/*
 * --------------------------------------------------------------------------
 * verify_otp
 * ---------------------------------------------------------------------------
 */
router.post('/verify_otp', function (req, res, next) {
    var id = req.body.id;
    var otp = req.body.otp;
    var access_token = req.body.access_token;
    var manValues = [id, otp, access_token]
    async.waterfall([
        function (callback) {
            func.checkBlank(res, manValues, callback);
        },
        function (callback) {
            checkUser(res, access_token, callback);
        }],
            function () {
                var check_user = "select * from matrimony_user where id=?";
                var values = [id];
                connection.query(check_user, values, function (err, rows) {
                    if (err) {
                        console.log(err)
                        var errorMsg = 'some error occurred';
                        sendResponse.sendErrorMessage(errorMsg, res);
                    } else {
                        if (rows.length > 0) {
                            var stored_otp = rows[0].otp;
                            if (otp == stored_otp) {
                             var update_profile_percentage = "update matrimony_user set profile_completed_percentage=profile_completed_percentage+10 where id=?";
                                var update_values = [id];
                                connection.query(update_profile_percentage, update_values, function (err, rows) {
                                    if (err) {
                                        console.log(err)
                                        var errorMsg = 'some error occurred';
                                        sendResponse.sendErrorMessage(errorMsg, res);
                                    } else {
                                        var msg = {}
                                        sendResponse.sendSuccessData(msg, res);
                                    }
                                })   
                            } else {
                                var errorMsg = 'otp did not match';
                                sendResponse.sendErrorMessage(errorMsg, res);
                            }
                        } else {
                            var errorMsg = 'invalid id';
                            sendResponse.sendErrorMessage(errorMsg, res);
                        }
                    }
                })
            });
})

/*
 * --------------------------------------------------------------------------
 * generate_email_otp
 * ---------------------------------------------------------------------------
 */
router.post('/generate_email_otp', function (req, res, next) {
    var id = req.body.id;
    var email = req.body.email;
    var access_token = req.body.access_token;
    var manValues = [id, email, access_token]
    async.waterfall([
        function (callback) {
            func.checkBlank(res, manValues, callback);
        },
        function (callback) {
            checkUser(res, access_token, callback);
        }],
            function () {
                var check_user = "select * from matrimony_user where id=?";
                var values = [id];
                connection.query(check_user, values, function (err, rows) {
                    if (err) {
                        console.log(err)
                        var errorMsg = 'some error occurred';
                        sendResponse.sendErrorMessage(errorMsg, res);
                    } else {
                        if (rows.length > 0) {
                            var random = getRandom(1000, 9999)
                            var random_string = random.toString();
                            var otp = random_string.substring(0, 4);
                            var store_otp = "update matrimony_user set email_verification_code=? where id=?";
                            var value = [otp, id];
                            connection.query(store_otp, value, function (err, rows) {
                                if (err) {
                                    console.log(err)
                                    var errorMsg = 'some error occurred';
                                    sendResponse.sendErrorMessage(errorMsg, res);
                                } else {
                                    var str = "<p>Hi,</p>";
                                    str += "<p>Your email verification code for EPardesh is " + otp + ".</p>";
                                    str += "<p>Regards,</p>";
                                    str += "<p>Team EPardesh</p>";
                                    var mailOptions = {to: email, subject: 'Email verification code', html: str};
                                    transporter.sendMail(mailOptions, function (error, info) {
                                        if (error) {
                                            var errorMsg = 'some error occurred';
                                            console.log('in error')
                                            console.log(error)
                                        } else {
                                            console.log('Message sent: ');
                                        }
                                    });
                                    var msg = []
                                    sendResponse.sendSuccessData(msg, res);
                                }
                            })
                        } else {
                            var errorMsg = 'invalid id';
                            sendResponse.sendErrorMessage(errorMsg, res);
                        }
                    }
                })
            });
})

/*
 * --------------------------------------------------------------------------
 * verify_email_otp
 * ---------------------------------------------------------------------------
 */
router.post('/verify_email_otp', function (req, res, next) {
    var id = req.body.id;
    var otp = req.body.otp;
    var manValues = [id, otp]
    async.waterfall([
        function (callback) {
            func.checkBlank(res, manValues, callback);
        }],
            function () {               
                var check_user = "select * from matrimony_user where id=?";
                var values = [id];
                connection.query(check_user, values, function (err, rows) {
                    if (err) {
                        console.log(err)
                        var errorMsg = 'some error occurred';
                        sendResponse.sendErrorMessage(errorMsg, res);
                    } else {
                        if (rows.length > 0) {
                            var email_verified_status=rows[0].email_verified_status;
                            var stored_otp = rows[0].email_verification_code;
                            if(email_verified_status==0 || email_verified_status=='0'){
                                if (otp == stored_otp) {
                                console.log("i am here")
                                var update_profile_percentage = "update matrimony_user set profile_completed_percentage=40,email_verified_status=1 where id=?";
                                var update_values = [id];
                                connection.query(update_profile_percentage, update_values, function (err, rows) {
                                    if (err) {
                                        console.log(err)
                                        var errorMsg = 'some error occurred';
                                        sendResponse.sendErrorMessage(errorMsg, res);
                                    } else {
                                        var msg = {}
                                        sendResponse.sendSuccessData(msg, res);
                                    }
                                })
                            } else {
                                var errorMsg = 'otp did not match';
                                sendResponse.sendErrorMessage(errorMsg, res);
                            }
                            }else{
                                var errorMsg = 'email already verified';
                            sendResponse.sendErrorMessage(errorMsg, res);
                            }                            
                        } else {
                            var errorMsg = 'invalid id';
                            sendResponse.sendErrorMessage(errorMsg, res);
                        }
                    }
                })
            });
})


/*
 * ----------------------------------------------------------------------------------------------------------------------------------------
 * generate random string
 * ----------------------------------------------------------------------------------------------------------------------------------------
 */
function getRandom(min, max) {
    return Math.random() * (max - min) + min;
}

/*
 * ----------------------------------------------------------------------------------------------------------------------------------------
 * check User Is Valid or Not
 * INPUT : email
 * OUTPUT : email available or not
 * ----------------------------------------------------------------------------------------------------------------------------------------
 */
function checkUser(res, access_token, callback) {
    var sql = "SELECT * FROM `matrimony_user` WHERE `access_token`=? limit 1";
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
