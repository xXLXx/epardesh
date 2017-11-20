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
 * send_request
 * --------------------------------------------------------------------------
 */

router.post('/send_request', function(req, res, next) {
    var sender_user_id = req.body.sender_user_id;
    var status = req.body.status;
    var sender_first_name = req.body.sender_first_name;
    var sender_last_name = req.body.sender_last_name;
    var profile_id = req.body.profile_id;
    var sender_email = req.body.sender_email;
    var access_token = req.body.access_token;
    var receiver_user_id = req.body.receiver_user_id;
    var receiver_first_name = req.body.receiver_first_name;
    var receiver_last_name = req.body.receiver_last_name;
    var receiver_email = req.body.receiver_email;
    var receiver_mobile = req.body.receiver_mobile;

    var manValues = [sender_user_id, access_token, receiver_user_id]
    async.waterfall([
        function(callback) {
            func.checkBlank(res, manValues, callback);
        },
        function(callback) {
            checkUser(res, access_token, callback);
        }],
            function() {
                if (status == 1 || status == '1') {

                    var check_occurence = "select * from matrimony_connect_requests where sender_id=? and receiver_id=? and status=?";
                    var values = [sender_user_id, receiver_user_id, status]
                    connection.query(check_occurence, values, function(err, result) {
                        if (err)
                        {
                            var errorMsg = 'some error occurred';
                            sendResponse.sendErrorMessage(errorMsg, res);
                        } else {
                            if (result.length > 0 || result.length > '0') {
                                var msg = {};
                                sendResponse.sendSuccessData(msg, res);
                            } else {
                                var insert_requests = "INSERT INTO `matrimony_connect_requests`(`sender_id`,`receiver_id`,`status`) VALUES (?,?,?)";
                                var request_details = [sender_user_id, receiver_user_id, status]
                                connection.query(insert_requests, request_details, function(err, result) {
                                    if (err)
                                    {
                                        var errorMsg = 'some error occurred';
                                        sendResponse.sendErrorMessage(errorMsg, res);
                                    } else {
                                        var msg = {};
                                        sendResponse.sendSuccessData(msg, res);
                                    }
                                })
                            }
                        }
                    })


                } else if (status == 2 || status == '2') {

                    if (sender_user_id == receiver_user_id) {
                        var errorMsg = 'You cannot send request to yourself';
                        sendResponse.sendErrorMessage(errorMsg, res);
                    } else {
                        var is_platinum_status = req.body.is_platinum_status;
                        var check_occurence = "select * from matrimony_connect_requests where sender_id=? and receiver_id=? and status=?";
                        var values = [sender_user_id, receiver_user_id, status]
                        connection.query(check_occurence, values, function(err, result) {
                            if (err)
                            {
                                var errorMsg = 'some error occurred';
                                sendResponse.sendErrorMessage(errorMsg, res);
                            } else {
                                if (result.length > 0 || result.length > '0') {
                                    var approve_status = result[0].approve_status;
                                    if (approve_status == '0' || approve_status == 0 || approve_status == '1' || approve_status == 1) {
                                        var msg = {};
                                        sendResponse.sendSuccessData(msg, res);
                                    } else {
                                        var insert_requests = "update `matrimony_connect_requests` set approve_status='0' where sender_id=? and receiver_id=? and status=?";
                                        var request_details = [sender_user_id, receiver_user_id, status]
                                        connection.query(insert_requests, request_details, function(err, result) {
                                            if (err)
                                            {
                                                console.log(err)
                                                var errorMsg = 'some error occurred';
                                                sendResponse.sendErrorMessage(errorMsg, res);
                                            } else {
                                                var check_favourites = "select * from `matrimony_connect_requests` where sender_id=? and receiver_id=? and status=3";
                                                var profile_details = [sender_user_id, receiver_user_id]
                                                connection.query(check_favourites, profile_details, function(err, rows1) {
                                                    if (err)
                                                    {
                                                        console.log(err)
                                                        var errorMsg = 'some error occurred';
                                                        sendResponse.sendErrorMessage(errorMsg, res);
                                                    } else {
                                                        if (rows1.length == '0' || rows1.length == '0')
                                                        {
                                                            var insert_favourites = "insert into `matrimony_connect_requests` (`sender_id`,`receiver_id`,status) VALUES (?,?,3)";
                                                            var favourite_profile_details = [sender_user_id, receiver_user_id]
                                                            connection.query(insert_favourites, favourite_profile_details, function(err, rows2) {
                                                                if (err)
                                                                {
                                                                    console.log(err)
                                                                    var errorMsg = 'some error occurred';
                                                                    sendResponse.sendErrorMessage(errorMsg, res);
                                                                } else {

                                                                    var email_message = "Hi, I will like to connect with you"
                                                                    var store_msg = "insert into `matrimony_inbox` (`sender_id`,`receiver_id`,message) VALUES (?,?,?)";
                                                                    var message_values = [sender_user_id, receiver_user_id, email_message]
                                                                    connection.query(store_msg, message_values, function(err, rows3) {
                                                                        if (err)
                                                                        {
                                                                            console.log(err)
                                                                            var errorMsg = 'some error occurred';
                                                                            sendResponse.sendErrorMessage(errorMsg, res);
                                                                        } else {
//                                                                            var str = "<p>Hi," + receiver_first_name + receiver_last_name + "</p>";
//                                                                            str += "<p>A user wants to connect to you</p>";
//                                                                            str += "<p>Name : " + sender_first_name + sender_last_name + ".</p>";
//                                                                            str += "<p>Email : " + sender_email + ".</p>";
//                                                                            str += "<p>Profile id : " + profile_id + ".</p>";
//                                                                            str += "<p>Kindly login to connect.</p>";
//                                                                            str += "<p>Regards,</p>";
//                                                                            str += "<p>Team EPardesh</p>";

                                                                            var str = '<div style="margin:0;padding:0;font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif">'
                                                                            str += '<table width="100%" cellpadding="0" cellspacing="0" border="0" align="center" style="font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif;max-width:600px;background-color:#ffffff;color:#666666;text-align:left;padding:0px 2% 10px 2%;background:url(http://teja1.kuikr.com/images/notification/mailer-bg.jpg) repeat #f9f9f9">'
                                                                            str += '<tbody><tr>'
                                                                            str += '<td height="20"></td>'
                                                                            str += '</tr>'
                                                                            str += '<tr>'
                                                                            str += '<td height="43" valign="top"><table width="100%" cellspacing="0" cellpadding="0" border="0" align="center" style="max-width:530px">'
                                                                            str += '<tbody><tr>'
                                                                            str += '<td align="left" height="43"><a href="#m_8496668978295844378_m_8306747430853343728_m_8934663683847810844_"><img src="' + url + 'logo.jpg" alt="Epardesh" width="94" height="43" border="0" style="margin:0;display:block;font-family:Arial,Helvetica,sans-serif;color:#007ebe;font-size:20px;text-align:center;font-weight:bold" class="CToWUd"></a></td>'
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
                                                                            str += '<td align="center" style="font-size:25px;color:#333333;padding:10px 20px 0px;font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif">New connect request</td>'
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
                                                                            str += '<td style="font-size:20px;padding:0px 30px;color:#444444;font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif">Dear ' + receiver_first_name + " " + receiver_last_name + '</td>'
                                                                            str += '</tr>'
                                                                            str += '<tr>'
                                                                            str += '<td height="10"></td>'
                                                                            str += '</tr>'
                                                                            str += '<tr>'
                                                                            str += '<td style="font-size:12px;padding:0px 30px;color:#444444;line-height:19px;font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif">A user wants to connect to you.</td>'
                                                                            str += '</tr>'
                                                                            str += '<tr>'
                                                                            str += '<td style="font-size:12px;padding:0px 30px;color:#444444;line-height:19px;font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif">Name : ' + sender_first_name + " " + sender_last_name + '</td>'
                                                                            str += '</tr>'
                                                                            str += '<tr>'
                                                                            str += '<td style="font-size:12px;padding:0px 30px;color:#444444;line-height:19px;font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif">Email : ' + sender_email + '</td>'
                                                                            str += '</tr>'
                                                                            str += '<tr>'
                                                                            str += '<td style="font-size:12px;padding:0px 30px;color:#444444;line-height:19px;font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif">Profile id : ' + profile_id + '</td>'
                                                                            str += '</tr>'
                                                                            str += '<tr>'
                                                                            str += '<td height="20"></td>'
                                                                            str += '</tr>'
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
                                                                            str += '<td style="font-size:12px;padding:0px 30px;font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif;color:#444444;line-height:normal;padding:0px 20px;text-align:left"> Thank you,<br>'
                                                                            str += '<strong style="font-size:12px;font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif;color:#444444;line-height:normal">Team EPardesh </strong></td>'
                                                                            str += '</tr>'
                                                                            str += '<tr>'
                                                                            str += '<td height="20"></td>'
                                                                            str += '</tr>'
                                                                            str += '</tbody></table></td>'
                                                                            str += '</tr>'
                                                                            str += '<tr>'
                                                                            str += '<td height="10"></td>'
                                                                            str += '</tr>'
                                                                            str += '<tr>'
                                                                            str += '<td align="center" style="color:#444444;font-size:12px;font-family:"Open Sans",Gill Sans,Arial,Helvetica,sans-serif"><span style="color:#444444;font-size:12px;font-family:"Open Sans",Gill Sans,Arial,Helvetica,sans-serif">|</span><span style="color:#444444;font-size:12px;font-family:"Open Sans",Gill Sans,Arial,Helvetica,sans-serif">|</span></td>'
                                                                            str += '</tr>'
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
                                                                            str += '<td align="center" style="font-size:11px;font-family:"Open Sans",Gill Sans,Arial,Helvetica,sans-serif;color:#444444"><p style="margin:0;padding:3px 0 0px;font-size:11px;font-family:"Open Sans",Gill Sans,Arial,Helvetica,sans-serif;line-height:13px">You are receiving this mail from EPardesh Team.</p>'
                                                                            str += '<p style="margin:0;padding:3px 0;font-size:11px;font-family:"Open Sans",Gill Sans,Arial,Helvetica,sans-serif;line-height:13px">For any assistance, visit the below website <a href=' + matrimony_url + ' style="font-size:11px;font-family:"Open Sans",Gill Sans,Arial,Helvetica,sans-serif;color:#007ebc;text-decoration:none" target="_blank" data-saferedirecturl=' + matrimony_url + '></a><a href=' + matrimony_url + ' style="font-size:11px;font-family:"Open Sans",Gill Sans,Arial,Helvetica,sans-serif;color:#008bcf;text-decoration:none" target="_blank"></a></p></td>'
                                                                            str += '</tr>'
                                                                            str += '<tr>'
                                                                            str += '<td align="center" style="font-size:11px;font-family:"Open Sans",Gill Sans,Arial,Helvetica,sans-serif;color:#008bcf;line-height:13px">© <a href=' + matrimony_url + ' target="_blank" data-saferedirecturl=' + matrimony_url + '>www.EPardesh.com</a></td>'
                                                                            str += '</tr>'
                                                                            str += '</tbody></table>'
                                                                            str += '</div>'



                                                                            var mailOptions = {to: receiver_email, subject: 'You have got a new connect request.', html: str};
                                                                            transporter.sendMail(mailOptions, function(error, info) {
                                                                                if (error) {
                                                                                    console.log('in error')
                                                                                    console.log(error)
                                                                                } else {
                                                                                    console.log('Message sent: ');
                                                                                }
                                                                                if (is_platinum_status == 1) {
                                                                                    console.log('i am in connect request1')
                                                                                    var params = {
                                                                                        //'src': '+917355602700', // Sender's phone number with country code
                                                                                        'src': '+19162495901',
                                                                                        'dst':  receiver_mobile , // Receiver's phone Number with country code
                                                                                        'text': 'Hi, you have received a new connect request from ' + sender_first_name + '.' // Your SMS Text Message - English
                                                                                    };
// Prints the complete response
                                                                                    api.send_message(params, function(status, response) {
                                                                                        if (err) {
                                                                                            console.log(err)
                                                                                            console.log('in pvlio err')
                                                                                        } else {
                                                                                            console.log('Message sent: ');
                                                                                        }
                                                                                    });
//                                                                                    client.messages.create({
//                                                                                        to: '+91' + receiver_mobile + '',
//                                                                                        from: admin_number,
//                                                                                        body: 'Hi, you have received a new connect request from ' + sender_first_name + '. Login to your profile to connect',
//                                                                                    }, function (err, message) {
//                                                                                        console.log(err)
//                                                                                        //console.log(message.sid);
//                                                                                    });
                                                                                }
                                                                                var msg = {};
                                                                                sendResponse.sendSuccessData(msg, res);
                                                                            });
                                                                        }
                                                                    })
                                                                }
                                                            })
                                                        }
                                                    }
                                                })
                                            }
                                        })
                                    }
                                } else {
                                    var insert_requests = "INSERT INTO `matrimony_connect_requests`(`sender_id`,`receiver_id`,status) VALUES (?,?,?)";
                                    var request_details = [sender_user_id, receiver_user_id, status]
                                    connection.query(insert_requests, request_details, function(err, result) {
                                        if (err)
                                        {
                                            console.log(err)
                                            var errorMsg = 'some error occurred';
                                            sendResponse.sendErrorMessage(errorMsg, res);
                                        } else {
                                            var check_favourites = "select * from `matrimony_connect_requests` where sender_id=? and receiver_id=? and status=3";
                                            var profile_details = [sender_user_id, receiver_user_id]
                                            connection.query(check_favourites, profile_details, function(err, rows1) {
                                                if (err)
                                                {
                                                    console.log(err)
                                                    var errorMsg = 'some error occurred';
                                                    sendResponse.sendErrorMessage(errorMsg, res);
                                                } else {
                                                    if (rows1.length == '0' || rows1.length == '0')
                                                    {
                                                        var insert_favourites = "insert into `matrimony_connect_requests` (`sender_id`,`receiver_id`,status) VALUES (?,?,3)";
                                                        var favourite_profile_details = [sender_user_id, receiver_user_id]
                                                        connection.query(insert_favourites, favourite_profile_details, function(err, rows2) {
                                                            if (err)
                                                            {
                                                                console.log(err)
                                                                var errorMsg = 'some error occurred';
                                                                sendResponse.sendErrorMessage(errorMsg, res);
                                                            } else {
                                                                var email_message = "Hi, I will like to connect with you"
                                                                var store_msg = "insert into `matrimony_inbox` (`sender_id`,`receiver_id`,message) VALUES (?,?,?)";
                                                                var message_values = [sender_user_id, receiver_user_id, email_message]
                                                                connection.query(store_msg, message_values, function(err, rows3) {
                                                                    if (err)
                                                                    {
                                                                        console.log(err)
                                                                        var errorMsg = 'some error occurred';
                                                                        sendResponse.sendErrorMessage(errorMsg, res);
                                                                    } else {
                                                                        var str = "<p>Hi," + receiver_first_name + " " + receiver_last_name + "</p>";
                                                                        str += "<p>A user wants to connect to you</p>";
                                                                        str += "<p>Name : " + sender_first_name + " " + sender_last_name + ".</p>";
                                                                        str += "<p>Email : " + sender_email + ".</p>";
                                                                        str += "<p>Profile id : " + profile_id + ".</p>";
                                                                        str += "<p>Kindly login to connect.</p>";
                                                                        str += "<p>Regards,</p>";
                                                                        str += "<p>Team EPardesh</p>";
                                                                        var mailOptions = {to: receiver_email, subject: 'You have got a new request.', html: str};
                                                                        transporter.sendMail(mailOptions, function(error, info) {
                                                                            if (error) {
                                                                                console.log('in error')
                                                                                console.log(error)
                                                                            } else {
                                                                                console.log('Message sent: ');
                                                                            }
                                                                            if (is_platinum_status == 1) {
                                                                                console.log('i am in connect request2')
                                                                                var params = {
                                                                                    //'src': '+917355602700', // Sender's phone number with country code
                                                                                    'src': '+19162495901',
                                                                                    'dst': receiver_mobile, // Receiver's phone Number with country code
                                                                                    'text': 'Hi, you have received a new connect request from ' + sender_first_name + '.' // Your SMS Text Message - English
                                                                                };
// Prints the complete response
                                                                                api.send_message(params, function(status, response) {
                                                                                    if (err) {
                                                                                        console.log(err)
                                                                                        console.log('in pvlio err')
                                                                                    } else {
                                                                                        console.log(status);
                                                                                        console.log(response);
                                                                                        console.log('Message sent: ');
                                                                                    }
                                                                                });

//                                                                                client.messages.create({
//                                                                                    to: '+91' + receiver_mobile + '',
//                                                                                    from: admin_number,
//                                                                                    body: 'Hi, you have received a new connect request from ' + sender_first_name + '. Login to your profile to connect',
//                                                                                }, function (err, message) {
//                                                                                    console.log(err)
//                                                                                    //console.log(message.sid);
//                                                                                });
                                                                            }
                                                                            var msg = {};
                                                                            sendResponse.sendSuccessData(msg, res);
                                                                        });
                                                                    }
                                                                })
                                                            }
                                                        })
                                                    }
                                                }
                                            })
                                        }
                                    })
                                }
                            }
                        })
                    }


                } else if (status == 3 || status == '3') {
                    if (sender_user_id == receiver_user_id) {
                        var errorMsg = 'You cannot add yourself to favourites';
                        sendResponse.sendErrorMessage(errorMsg, res);
                    } else {
                        var insert_requests = "INSERT INTO `matrimony_connect_requests`(`sender_id`,`receiver_id`,`status`) VALUES (?,?,?)";
                        var request_details = [sender_user_id, receiver_user_id, status]
                        connection.query(insert_requests, request_details, function(err, result) {
                            if (err)
                            {
                                var errorMsg = 'some error occurred';
                                sendResponse.sendErrorMessage(errorMsg, res);
                            } else {
                                var msg = {};
                                sendResponse.sendSuccessData(msg, res);
                            }
                        })
                    }

                } else if (status == 4 || status == '4') {
                    if (sender_user_id == receiver_user_id) {
                        var errorMsg = 'You cannot block yourself';
                        sendResponse.sendErrorMessage(errorMsg, res);
                    } else {
                        var insert_requests = "INSERT INTO `matrimony_connect_requests`(`sender_id`,`receiver_id`,`status`) VALUES (?,?,?)";
                        var request_details = [sender_user_id, receiver_user_id, status]
                        connection.query(insert_requests, request_details, function(err, result) {
                            if (err)
                            {
                                var errorMsg = 'some error occurred';
                                sendResponse.sendErrorMessage(errorMsg, res);
                            } else {
                                var msg = {};
                                sendResponse.sendSuccessData(msg, res);
                            }
                        })
                    }


                }
            })
});


/*
 * --------------------------------------------------------------------------
 * send_message
 * --------------------------------------------------------------------------
 */

//router.post('/send_message', function (req, res, next) {
//    var sender_name = req.body.sender_name;
//    var sender_email = req.body.sender_email;
//    var access_token = req.body.access_token;
//    var receiver_email = req.body.receiver_email;
//    var message = req.body.message;
//    var manValues = [access_token]
//    async.waterfall([
//        function (callback) {
//            func.checkBlank(res, manValues, callback);
//        },
//        function (callback) {
//            checkUser(res, access_token, callback);
//        }],
//            function () {
//                var str = "<p>Hi,</p>";
//                str += "<p>New epardesh message</p>";
//                str += "<p>Name : " + sender_name + ".</p>";
//                str += "<p>Email : " + sender_email + ".</p>";
//                str += "<p>Message : " + message + ".</p>";
//                str += "<p>Kindly login to reply.</p>";
//                str += "<p>Regards,</p>";
//                str += "<p>Team EPardesh</p>";
//                var mailOptions = {to: receiver_email, subject: 'You have got a new message.', html: str};
//                transporter.sendMail(mailOptions, function (error, info) {
//                    if (error) {
//                        console.log('in error')
//                        console.log(error)
//                    } else {
//                        console.log('Message sent: ');
//                    }
//                    var msg = {};
//                    sendResponse.sendSuccessData(msg, res);
//                });
//            })
//});

router.post('/send_message', function(req, res, next) {
    var sender_id = req.body.sender_id;
    var receiver_id = req.body.receiver_id;
    var sender_name = req.body.sender_name;
    var sender_email = req.body.sender_email;
    var access_token = req.body.access_token;
    var receiver_email = req.body.receiver_email;
    var message = req.body.message;
    
    console.log(sender_id)
    console.log(receiver_id)
    console.log(sender_name)
    console.log(sender_email)
    console.log(access_token)
    console.log(receiver_email)
    var manValues = [access_token]
    async.waterfall([
        function(callback) {
            func.checkBlank(res, manValues, callback);
        },
        function(callback) {
            checkUser(res, access_token, callback);
        }],
            function() {

//                var sql = "SELECT * FROM `matrimony_user` WHERE `access_token`=? limit 1";
//                var values = [access_token];
//                connection.query(sql, values, function(err, userResponse) {
//                    console.log("userResponse");
//                    console.log(userResponse);
//                    if (userResponse[0]["profile_picture"] == null) {
//                        console.log("in if of image")
//                        sender_image = "www.epardesh.com/app/content/img/dummy_email.png";
//
//                        var save_messages = "insert into matrimony_inbox (sender_id,receiver_id,message) values(?,?,?)";
//                        var values = [sender_id, receiver_id, message]
//                        connection.query(save_messages, values, function(err, result) {
//                            if (err)
//                            {
//                                console.log(err)
//                                var errorMsg = 'some error occurred';
//                                sendResponse.sendErrorMessage(errorMsg, res);
//                            } else {
//                                var str = "<p>Hi,</p>";
//                                str += "<p>New epardesh message</p>";
//                                str += "<img  style='max-width: 200px;' src='" + sender_image + "'></br></br>";
//                                str += "<p>Name : " + sender_name + ".</p></br></br>";
//                                str += "<p>Email : " + sender_email + ".</p></br></br>";
//                                str += "<p>Message : " + message + ".</p></br></br>";
//                                str += "<p>Kindly login to reply.</p></br></br>";
//                                str += "<p>Regards,</p>";
//                                str += "<p>Team EPardesh</p>";
//                                var mailOptions = {to: receiver_email, subject: 'You have got a new message.', html: str};
//                                transporter.sendMail(mailOptions, function(error, info) {
//                                    if (error) {
//                                        console.log('in error')
//                                        console.log(error)
//                                    } else {
//                                        console.log('Message sent: ');
//                                    }
//                                    var msg = {};
//                                    sendResponse.sendSuccessData(msg, res);
//                                });
//                            }
//                        })
//
//                    }
//                    else {
//                        console.log("in else of image")
//                        sender_image = userResponse[0]["profile_picture"];
//                        var save_messages = "insert into matrimony_inbox (sender_id,receiver_id,message) values(?,?,?)";
//                        var values = [sender_id, receiver_id, message]
//                        connection.query(save_messages, values, function(err, result) {
//                            if (err)
//                            {
//                                console.log(err)
//                                var errorMsg = 'some error occurred';
//                                sendResponse.sendErrorMessage(errorMsg, res);
//                            } else {
//                                var str = "<p>Hi,</p>";
//                                str += "<p>New epardesh message</p>";
//                                str += "<img  style='max-width: 200px;' src='" + sender_image + "'>";
//                                str += "<p>Name : " + sender_name + ".</p>";
//                                str += "<p>Email : " + sender_email + ".</p>";
//                                str += "<p>Message : " + message + ".</p>";
//                                str += "<p>Kindly login to reply.</p>";
//                                str += "<p>Regards,</p>";
//                                str += "<p>Team EPardesh</p>";
//                                var mailOptions = {to: receiver_email, subject: 'You have got a new message.', html: str};
//                                transporter.sendMail(mailOptions, function(error, info) {
//                                    if (error) {
//                                        console.log('in error')
//                                        console.log(error)
//                                    } else {
//                                        console.log('Message sent: ');
//                                    }
//                                    var msg = {};
//                                    sendResponse.sendSuccessData(msg, res);
//                                });
//                            }
//                        })
//                    }
//                });

                var save_messages = "insert into matrimony_inbox (sender_id,receiver_id,message) values(?,?,?)";
                var values = [sender_id, receiver_id, message]
                connection.query(save_messages, values, function(err, result) {
                    if (err)
                    {
                        console.log(err)
                        var errorMsg = 'some error occurred';
                        sendResponse.sendErrorMessage(errorMsg, res);
                    } else {
                        var str = "<p>Hi,</p>";
                        str += "<p>New epardesh message</p>";
                        str += "<p>Name : " + sender_name + ".</p>";
                        str += "<p>Email : " + sender_email + ".</p>";
                        str += "<p>Message : " + message + ".</p>";
                        str += "<p>Kindly login to reply.</p>";
                        str += "<p>Regards,</p>";
                        str += "<p>Team EPardesh</p>";
                        var mailOptions = {to: receiver_email, subject: 'You have got a new message.', html: str};
                        transporter.sendMail(mailOptions, function(error, info) {
                            if (error) {
                                console.log('in error')
                                console.log(error)
                            } else {
                                console.log('Message sent: ');
                            }
                            var msg = {};
                            sendResponse.sendSuccessData(msg, res);
                        });
                    }
                })


            })
});









/*
 * --------------------------------------------------------------------------
 * send_direct_sms
 * --------------------------------------------------------------------------
 */

router.post('/send_direct_sms', function(req, res, next) {
    var sender_name = req.body.sender_name;
    var access_token = req.body.access_token;
    var receiver_mobile = req.body.receiver_mobile;
    var message = req.body.message;
    var manValues = [access_token]
    async.waterfall([
        function(callback) {
            func.checkBlank(res, manValues, callback);
        },
        function(callback) {
            checkUser(res, access_token, callback);
        }],
            function() {

                var params = {
                    //'src': '+917355602700', // Sender's phone number with country code
                    'src': '+19162495901', // Sender's phone number with country code
                    'dst': receiver_mobile, // Receiver's phone Number with country code
                    'text': 'Hi, your one new direct message from ' + sender_name + ': ' + message + '' // Your SMS Text Message - English
                };
// Prints the complete response
                api.send_message(params, function(status, response) {
//                    if(err) {
//                        console.log(err)
//                        console.log('in pvlio err')
//                    } else {
                        console.log('Message sent: ');
                    //}
                });

//                client.messages.create({
//                    to: '+91' + receiver_mobile + '',
//                    from: admin_number,
//                    body: 'Hi, your one new direct message from ' + sender_name + ': ' + message + '',
//                }, function (err, message) {
//                    console.log(err)
////                    console.log(message.sid);
//                });
                var msg = {};
                sendResponse.sendSuccessData(msg, res);
            })
});

/*
 * --------------------------------------------------------------------------
 * view_full_profile
 * --------------------------------------------------------------------------
 */

router.post('/view_full_profile', function(req, res, next) {
    var user_id = req.body.user_id;
    var access_token = req.body.access_token;
    var manValues = [user_id, access_token]
    async.waterfall([
        function(callback) {
            func.checkBlank(res, manValues, callback);
        },
        function(callback) {
            checkUser(res, access_token, callback);
        }],
            function() {
                var get_profile_info = "select * from matrimony_user where id=?";
                var profile_id = [user_id]
                connection.query(get_profile_info, profile_id, function(err, result) {
                    if (err)
                    {
                        var errorMsg = 'some error occurred';
                        sendResponse.sendErrorMessage(errorMsg, res);
                    } else {
                        if (result.length > 0 || result.length > '0') {
                            sendResponse.sendSuccessData(result, res);
                        } else {
                            var errorMsg = 'invalid user';
                            sendResponse.sendErrorMessage(errorMsg, res);
                        }
                    }
                })
            })
});


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
    connection.query(sql, values, function(err, userResponse) {
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