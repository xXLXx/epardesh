/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var express = require('express');
var router = express.Router();
var async = require('async');
var func = require('../../commonfunction');
var sendResponse = require('../../sendresponse');
var date = require('date-and-time');

/*
 * --------------------------------------------------------------------------
 * profile_completion_alert
 * --------------------------------------------------------------------------
 */
//router.post('/profile_completion_alert', function (req, res, next) {
//    var get_users = "select * from matrimony_user where profile_completed_percentage <= 50";
//    connection.query(get_users, function (err, rows) {
//        if (err) {
//            console.log(err)
//            var errorMsg = 'some error occurred';
//            sendResponse.sendErrorMessage(errorMsg, res);
//        } else {
//            var no_of_profiles = rows.length;
//            console.log(no_of_profiles)
//            for (var i = 0; i < no_of_profiles; i++) {
//                var email = rows[i].email;
//                var first_name = rows[i].first_name;
//                var last_name = rows[i].last_name;
//                var profile_id = rows[i].profile_id;
//                var profile_completed_percentage = rows[i].profile_completed_percentage;
//                var str = "<h2>Welcome To EPardesh,</h2>";
//                str += "<p> Hi, "+first_name+" "+last_name+".</p>"
//                str += "<p> profile id : "+profile_id+".</p>"
//                str += "<p> Your profile is just "+profile_completed_percentage+"% complete.</p>"
//                str += "<p> Kindly complete your profile to get more relevant suggestions.</p>"
//                str += "<p>Regards,</p>";
//                str += "<p>Team EPardesh</p>";
//                
//                var mailOptions = {to: email, subject: 'EPardesh: Renew Your plan', html: str};
//                transporter.sendMail(mailOptions, function (error, info) {
//                    if (error) {
//                        console.log("Error Found:");
//                        console.log(email)
//                        console.log(error);
//                        var errorMsg = 'some error occurred';
//                        //sendResponse.sendErrorMessage(errorMsg, res);
//                    } else {
//                        console.log(email)
//                        console.log('Message sent: ');
//                    }
//                });
//            }
//            var msg = {}
//            
//            sendResponse.sendSuccessData(msg, res);
//        }
//    })
//
//})

router.post('/profile_completion_alert', function (req, res, next) {
    var email_array=[];
    var first_name_array =[];
    var last_name_array=[];
    var profile_id_array=[];
    var profile_completed_percentage_array=[];
    var get_users = "select * from matrimony_user where profile_completed_percentage <= 50";
    connection.query(get_users, function (err, rows) {
        if (err) {
            console.log(err)
            var errorMsg = 'some error occurred';
            sendResponse.sendErrorMessage(errorMsg, res);
        } else {
            var no_of_profiles = rows.length;
            console.log(no_of_profiles)
            for (var i = 0; i < no_of_profiles; i++) {
                var email = rows[i].email;
                var first_name = rows[i].first_name;
                var last_name = rows[i].last_name;
                var profile_id = rows[i].profile_id;
                var profile_completed_percentage = rows[i].profile_completed_percentage;
                email_array.push(email);
                first_name_array.push(first_name);
                last_name_array.push(last_name);
                profile_id_array.push(profile_id);
                profile_completed_percentage_array.push(profile_completed_percentage);
            }
            var key=0;
            async.each(email_array, function (email, callback) {
                    
                var str = "<h2>Welcome To ePardesh,</h2>";
                str += "<p> Hi, "+first_name_array[key]+" "+last_name_array[key]+".</p>"
                str += "<p> profile id : "+profile_id_array[key]+".</p>"
                str += "<p> Your profile is just "+profile_completed_percentage_array[key]+"% complete.</p>"
                str += "<p> Kindly complete your profile to get more relevant suggestions.</p>"
                str += "<p>Regards,</p>";
                str += "<p>Team ePardesh</p>";
                
                
                key++;
                var mailOptions = {to: email, subject: 'ePardesh: Update your profile', html: str};
                transporter.sendMail(mailOptions, function (error, info) {
                    if (error) {
                        console.log("Error Found:");
                        console.log(email)
                        console.log(error);
                        var errorMsg = 'some error occurred';
                        //sendResponse.sendErrorMessage(errorMsg, res);
                    } else {
                        console.log(email)
                        console.log('Message sent: ');
                        
                    }
                    callback();
                });
                        
                   
                }, function (err) {
                    // if any of the file processing produced an error, err would equal that error
                    if (err) {
                        // One of the iterations produced an error.
                        // All processing will now stop.
                        console.log('A file failed to process');
                    } else {
                        var msg = {}
            sendResponse.sendSuccessData(msg, res);
                    }
                }) 
        }
    })

})


/*
 * --------------------------------------------------------------------------
 * plan_expiration_alert
 * --------------------------------------------------------------------------
 */
router.post('/plan_expiration_alert', function (req, res, next) {
    var current_date = new Date;
    var expected_expiration_date = date.addDays(current_date, 5);
    var get_users = "SELECT * FROM `matrimony_user` WHERE plan_activation_date != '0000-00-00 00:00:00'";
    connection.query(get_users, function (err, rows) {
        if (err) {
            console.log(err)
            var errorMsg = 'some error occurred';
            sendResponse.sendErrorMessage(errorMsg, res);
        } else {
            var no_of_users = rows.length;
            for (var i = 0; i < no_of_users; i++) {
                
                var email = rows[i].email;
                var membership_plan = rows[i].membership_plan;
                var plan_activation_date = rows[i].plan_activation_date;
                if (membership_plan >= 4) {
                    if (membership_plan == '4' || membership_plan == 4 || membership_plan == '7' || membership_plan == 7) {
                        
                        var expiry_date = date.addDays(plan_activation_date, 30);
                    } else if (membership_plan == '5' || membership_plan == 5 || membership_plan == '8' || membership_plan == 8) {
                        var expiry_date = date.addDays(plan_activation_date, 60);
                    } else if (membership_plan == '6' || membership_plan == 6 || membership_plan == '9' || membership_plan == 9) {
                        var expiry_date = date.addDays(plan_activation_date, 90);
                    }
                    console.log('expiry_date=' + expiry_date)
                    if (expiry_date >= current_date) {
                        var timeDiff = Math.abs(expiry_date.getTime() - current_date.getTime());
                        var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
                        console.log(diffDays)
                        if (diffDays < 5) {
                            var str = "<h2>Welcome To ePardesh,</h2>";
                            str += "<p>Your Epardesh membership plan is going to expire soon. </p>";
                            str += "<p> Kindly renew at the earliest to keep enjoying our services.</p>"
                            str += "<p>Regards,</p>";
                            str += "<p>Team ePardesh</p>";
                            var mailOptions = {to: email, subject: 'ePardesh: Renew Your plan', html: str};
                            transporter.sendMail(mailOptions, function (error, info) {
                                if (error) {
                                    console.log("Error Found:");
                                    console.log(error);
                                    var errorMsg = 'some error occurred';
                                    sendResponse.sendErrorMessage(errorMsg, res);
                                } else {
                                    console.log('Message sent: ');
                                }
                            });
                        }
                    }
                }
            }
            var data = {}
            sendResponse.sendSuccessData(data, res);
        }
    });
})


module.exports = router;
