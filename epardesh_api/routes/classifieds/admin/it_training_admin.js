var express = require('express');
var router = express.Router();
var async = require('async');
var md5 = require('md5');
var request = require('request');
var date = require('date-and-time');
var func = require('../../commonfunction');
var sendResponse = require('../../sendresponse');

/*
 * --------------------------------------------------------------------------
 * add_training_courses
 * ---------------------------------------------------------------------------
 */

router.post('/add_training_courses', function (req, res, next) {
    var course_name = req.body.course_name;

    var check_course = "select * from training_courses where course_name = ?"
    var values = [course_name]
    connection.query(check_course, values, function (err, rows) {
        if (err) {
            console.log(err)
            var errorMsg = 'some error occurred';
            sendResponse.sendErrorMessage(errorMsg, res);
        } else {
            if (rows.length > 0) {
                var errorMsg = 'Duplicate entry';
                sendResponse.sendErrorMessage(errorMsg, res);
            } else {
                var add_course_query = "insert into training_courses (course_name) values (?)"
                var values = [course_name];
                connection.query(add_course_query, values, function (err, rows) {
                    if (err) {
                        console.log(err)
                        var errorMsg = 'some error occurred';
                        sendResponse.sendErrorMessage(errorMsg, res);
                    } else {
                        var msg = {}
                        sendResponse.sendSuccessData(msg, res);
                    }
                })
            }
        }
    })
})

/*
 * --------------------------------------------------------------------------
 * view_all_courses
 * ---------------------------------------------------------------------------
 */

router.post('/view_all_courses', function (req, res, next) {
    var view_course_query = "select * from training_courses"
    connection.query(view_course_query, function (err, courses) {
        if (err) {
            console.log(err)
            var errorMsg = 'some error occurred';
            sendResponse.sendErrorMessage(errorMsg, res);
        } else {
            sendResponse.sendSuccessData(courses, res);
        }
    })
})

/*
 * --------------------------------------------------------------------------
 * edit_training_course
 * ---------------------------------------------------------------------------
 */

router.post('/edit_training_course', function (req, res, next) {
    var course_id = req.body.course_id;
    var course_name = req.body.course_name;
    var edit_course_query = "update training_courses set course_name=? where id=?"
    var course_values = [course_name, course_id];
    connection.query(edit_course_query, course_values, function (err, rows) {
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

/*
 * --------------------------------------------------------------------------
 * admin_delete_course
 * ---------------------------------------------------------------------------
 */

router.post('/admin_delete_course', function (req, res, next) {
    var course_name = req.body.course_name
    var delete_course_query = "delete training_courses,epardesh_training from training_courses join epardesh_training on training_courses.course_name=epardesh_training.training_course where training_courses.course_name=?"
    var course_values = [course_name]
    connection.query(delete_course_query, course_values, function (err, rows) {
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

/*
 * --------------------------------------------------------------------------
 * view_all_training_ads
 * ---------------------------------------------------------------------------
 */

router.post('/view_all_training_ads', function (req, res, next) {
    var get_all_training_query = "select * from epardesh_training"
    connection.query(get_all_training_query, function (err, training_ads) {
        if (err) {
            console.log(err)
            var errorMsg = 'some error occurred';
            sendResponse.sendErrorMessage(errorMsg, res);
        } else {
            sendResponse.sendSuccessData(training_ads, res);
        }
    })
})

/*
 * --------------------------------------------------------------------------
 * training_count
 * ---------------------------------------------------------------------------
 */

router.post('/training_count', function (req, res, next) {
    var training_course = req.body.training_course;
    var get_count = "select count(*) as count from epardesh_training where training_course=?";
    var training_values = [training_course]
    connection.query(get_count, training_values, function (err, count) {
        if (err) {
            console.log(err)
            var errorMsg = 'some error occurred';
            sendResponse.sendErrorMessage(errorMsg, res);
        } else {
            sendResponse.sendSuccessData(count, res);
        }
    })
})

/*
 * --------------------------------------------------------------------------
 * admin_delete_training_ad
 * ---------------------------------------------------------------------------
 */

router.post('/admin_delete_training_ad', function (req, res, next) {
    var training_id = req.body.training_id;
    var check_training = "select * from epardesh_training where id=?";
    var training_values = [training_id]
    connection.query(check_training, training_values, function (err, training_ads) {
        if (err) {
            console.log(err)
            var errorMsg = 'some error occurred';
            sendResponse.sendErrorMessage(errorMsg, res);
        } else {
            if (training_ads.length > 0 || training_ads.length > '0') {
                var delete_training_query = "delete from epardesh_training where id=?"
                var training_values = [training_id]
                connection.query(delete_training_query, training_values, function (err, rows) {
                    if (err) {
                        console.log(err)
                        var errorMsg = 'some error occurred';
                        sendResponse.sendErrorMessage(errorMsg, res);
                    } else {
                        
                        
                                             console.log("user_id  " + training_ads[0]["user_id"])
                        var check_user = "select * from user where id=?"
                        var user_value = [training_ads[0]["user_id"]];
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
                                str += '<td align="center" style="font-size:25px;color:#333333;padding:10px 20px 0px;font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif">Training Ad Removed</td>'
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
                                str += '<td style="font-size:12px;padding:0px 30px;color:#444444;line-height:19px;font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif">Your training ad having id EPCT' + training_id + ' has been deleted by admin. For more information Please contact admin.</td>'
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

                                var mailOptions = {to: email, subject: 'ePardesh :: Admin Delete Training Ad', html: str};
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
                        
                        
                        
//                        var msg = {}
//                        sendResponse.sendSuccessData(msg, res);
                    }
                })
            } else {
                var errorMsg = 'invalid id for training ad';
                sendResponse.sendErrorMessage(errorMsg, res);
            }
        }
    })
})

module.exports = router;
