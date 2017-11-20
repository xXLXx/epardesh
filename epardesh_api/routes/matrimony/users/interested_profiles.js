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
 * interested_profiles
 * --------------------------------------------------------------------------
 */

router.post('/interested_profiles', function (req, res, next) {
    var user_id = req.body.user_id;
    var access_token = req.body.access_token;
    var status = req.body.status;
    var profile_array = [];
    var connect_req_id_array = []
    var id_array = [];
    var count = 0;
    var manValues = [user_id, access_token]
    async.waterfall([
        function (callback) {
            func.checkBlank(res, manValues, callback);
        },
        function (callback) {
            checkUser(res, access_token, callback);
        }],
            function () {
                if (status == 1 || status == '1') {
                    var get_profiles = "select * from matrimony_connect_requests where receiver_id=? and status=? order by id desc limit 25";
                    var profile_id = [user_id, status]
                    connection.query(get_profiles, profile_id, function (err, result) {
                        if (err)
                        {
                            console.log(err)
                            var errorMsg = 'some error occurred';
                            sendResponse.sendErrorMessage(errorMsg, res);
                        } else {
                            if (result.length > 0 || result.length > '0') {
                                var no_of_profiles = result.length;
                                for (var i = 0; i < no_of_profiles; i++) {
                                    var connect_req_id = result[i].id;
                                    var id = result[i].sender_id;
                                    connect_req_id_array.push(connect_req_id);
                                    id_array.push(id);
                                }
                                var key = 0
                                async.each(id_array, function (id, callback) {
                                    var get_profiles_data = "select * from matrimony_user where id=?";
                                    var values = [id]
                                    connection.query(get_profiles_data, values, function (err, profile_data) {
                                        if (err)
                                        {
                                            var errorMsg = 'some error occurred';
                                            sendResponse.sendErrorMessage(errorMsg, res);
                                        } else {
//                                            var data = {
//                                                request_id : connect_req_id,
//                                                user_info: profile_data
//                                            }
                                            if (profile_data.length > 0) {
                                                console.log(connect_req_id_array[key])
                                                profile_data[0].connect_req_id = connect_req_id_array[key];
                                                profile_array.push(profile_data)
                                            }
                                        }
                                        key++
                                        callback()
//                                    if (parseInt(count) == (parseInt(no_of_profiles) - 1)) {
//                                        console.log("in end");
//                                        sendResponse.sendSuccessData(profile_array, res);
//                                    } else {
//                                        console.log("incerase counter");
//                                        count = parseInt(count) + 1;
//                                    }
                                    })
                                }, function (err) {
                                    if (err) {
                                        console.log('A file failed to process');
                                    } else {
                                        sendResponse.sendSuccessData(profile_array, res);
                                    }
                                });
                            } else {
                                var data = {};
                                sendResponse.sendSuccessData(data, res);
                            }
                        }
                    })
                } else if (status == 2 || status == '2') {
                    var get_profiles = "select * from matrimony_connect_requests where receiver_id=? and status=? and approve_status='0' order by id desc limit 25";
                    var profile_id = [user_id, status]
                    connection.query(get_profiles, profile_id, function (err, result) {
                        if (err)
                        {
                            console.log(err)
                            var errorMsg = 'some error occurred';
                            sendResponse.sendErrorMessage(errorMsg, res);
                        } else {
                            if (result.length > 0 || result.length > '0') {
                                var no_of_profiles = result.length;
                                for (var i = 0; i < no_of_profiles; i++) {
                                    var connect_req_id = result[i].id;
                                    var id = result[i].sender_id;
                                    connect_req_id_array.push(connect_req_id);
                                    id_array.push(id);
                                }
                                var key = 0
                                async.each(id_array, function (id, callback) {
                                    var get_profiles_data = "select * from matrimony_user where id=?";
                                    var values = [id]
                                    connection.query(get_profiles_data, values, function (err, profile_data) {
                                        if (err)
                                        {
                                            var errorMsg = 'some error occurred';
                                            sendResponse.sendErrorMessage(errorMsg, res);
                                        } else {
//                                            var data = {
//                                                request_id : connect_req_id,
//                                                user_info: profile_data
//                                            }
                                            console.log(connect_req_id_array[key])
                                            profile_data[0].connect_req_id = connect_req_id_array[key];
                                            profile_array.push(profile_data)
                                        }
                                        key++
                                        callback()
//                                    if (parseInt(count) == (parseInt(no_of_profiles) - 1)) {
//                                        console.log("in end");
//                                        sendResponse.sendSuccessData(profile_array, res);
//                                    } else {
//                                        console.log("incerase counter");
//                                        count = parseInt(count) + 1;
//                                    }
                                    })
                                }, function (err) {
                                    if (err) {
                                        console.log('A file failed to process');
                                    } else {

                                        sendResponse.sendSuccessData(profile_array, res);
                                    }
                                });
                            } else {
                                var data = {}
                                sendResponse.sendSuccessData(data, res);
                            }
                        }
                    })
                } else if (status == 3 || status == '3') {
                    var get_profiles = "select * from matrimony_connect_requests where sender_id=? and status=? order by id desc limit 25";
                    var profile_id = [user_id, status]
                    connection.query(get_profiles, profile_id, function (err, result) {
                        if (err)
                        {
                            console.log(err)
                            var errorMsg = 'some error occurred';
                            sendResponse.sendErrorMessage(errorMsg, res);
                        } else {
                            if (result.length > 0 || result.length > '0') {
                                var no_of_profiles = result.length;
                                for (var i = 0; i < no_of_profiles; i++) {
                                    var connect_req_id = result[i].id;
                                    var id = result[i].receiver_id;
                                    connect_req_id_array.push(connect_req_id);
                                    id_array.push(id);
                                }
                                var key = 0
                                async.each(id_array, function (id, callback) {
                                    var get_profiles_data = "select * from matrimony_user where id=?";
                                    var values = [id]
                                    connection.query(get_profiles_data, values, function (err, profile_data) {
                                        if (err)
                                        {
                                            var errorMsg = 'some error occurred';
                                            sendResponse.sendErrorMessage(errorMsg, res);
                                        } else {
//                                            var data = {
//                                                request_id : connect_req_id,
//                                                user_info: profile_data
//                                            }
                                            console.log(connect_req_id_array[key])
                                            if (profile_data.length > 0) {
                                                profile_data[0].connect_req_id = connect_req_id_array[key];
                                                profile_array.push(profile_data)
                                            }
                                        }
                                        key++
                                        callback()
//                                    if (parseInt(count) == (parseInt(no_of_profiles) - 1)) {
//                                        console.log("in end");
//                                        sendResponse.sendSuccessData(profile_array, res);
//                                    } else {
//                                        console.log("incerase counter");
//                                        count = parseInt(count) + 1;
//                                    }
                                    })
                                }, function (err) {
                                    if (err) {
                                        console.log('A file failed to process');
                                    } else {
                                        sendResponse.sendSuccessData(profile_array, res);
                                    }
                                });
                            } else {
                                var data = {}
                                sendResponse.sendSuccessData(data, res);
                            }
                        }
                    })
                } else if (status == 4 || status == '4') {
                    var get_profiles = "select * from matrimony_connect_requests where (sender_id=? or receiver_id=?) and status='2' and approve_status='1' order by id desc limit 25";
                    var profile_id = [user_id, user_id]
                    connection.query(get_profiles, profile_id, function (err, result) {
                        if (err)
                        {
                            console.log(err)
                            var errorMsg = 'some error occurred';
                            sendResponse.sendErrorMessage(errorMsg, res);
                        } else {
                            if (result.length > 0 || result.length > '0') {
                                var no_of_profiles = result.length;
                                for (var i = 0; i < no_of_profiles; i++) {
                                    var connect_req_id = result[i].id;
                                    var sender_id = result[i].sender_id;
                                    var receiver_id = result[i].receiver_id;
                                    if (user_id == sender_id) {
                                        var id = result[i].receiver_id;
                                    } else {
                                        var id = result[i].sender_id;
                                    }
                                    connect_req_id_array.push(connect_req_id);
                                    id_array.push(id);
                                }
                                var key = 0
                                async.each(id_array, function (id, callback) {
                                    var get_profiles_data = "select * from matrimony_user where id=?";
                                    var values = [id]
                                    connection.query(get_profiles_data, values, function (err, profile_data) {
                                        if (err)
                                        {
                                            var errorMsg = 'some error occurred';
                                            sendResponse.sendErrorMessage(errorMsg, res);
                                        } else {
//                                            var data = {
//                                                request_id : connect_req_id,
//                                                user_info: profile_data
//                                            }
                                            console.log(connect_req_id_array[key])
                                            profile_data[0].connect_req_id = connect_req_id_array[key];
                                            profile_array.push(profile_data)
                                        }
                                        key++
                                        callback()
//                                    if (parseInt(count) == (parseInt(no_of_profiles) - 1)) {
//                                        console.log("in end");
//                                        sendResponse.sendSuccessData(profile_array, res);
//                                    } else {
//                                        console.log("incerase counter");
//                                        count = parseInt(count) + 1;
//                                    }
                                    })
                                }, function (err) {
                                    if (err) {
                                        console.log('A file failed to process');
                                    } else {
                                        sendResponse.sendSuccessData(profile_array, res);
                                    }
                                });
                            } else {
                                var data = {}
                                sendResponse.sendSuccessData(data, res);
                            }
                        }
                    })
                }
            })
});


/*
 * --------------------------------------------------------------------------
 * accept_or_reject_request
 * --------------------------------------------------------------------------
 */

router.post('/accept_or_reject_request', function (req, res, next) {
    var access_token = req.body.access_token;
    var status = req.body.status;
    var sender_first_name = req.body.sender_first_name;
    var sender_last_name = req.body.sender_last_name;
    var sender_email = req.body.sender_email;
    var sender_mobile = req.body.sender_mobile;
    var request_id = req.body.request_id;
    var receiver_profile_id = req.body.receiver_profile_id;
    var receiver_first_name = req.body.receiver_first_name;
    var receiver_last_name = req.body.receiver_last_name;
    var is_platinum_status = req.body.is_platinum_status;
    var manValues = [request_id, access_token]
    async.waterfall([
        function (callback) {
            func.checkBlank(res, manValues, callback);
        },
        function (callback) {
            checkUser(res, access_token, callback);
        }],
            function () {
                var check_ad = "select * from matrimony_connect_requests where id=?";
                var values = [request_id]
                connection.query(check_ad, values, function (err, rows) {
                    if (err)
                    {
                        console.log(err)
                        var errorMsg = 'some error occurred';
                        sendResponse.sendErrorMessage(errorMsg, res);
                    } else {
                        if (rows.length > '0' || rows.length > 0) {
                            if (status == 1 || status == '1') {
                                var accept_request = "update matrimony_connect_requests set approve_status='1' where id=?";
                                var profile_id = [request_id]
                                connection.query(accept_request, profile_id, function (err, result) {
                                    if (err)
                                    {
                                        console.log(err)
                                        var errorMsg = 'some error occurred';
                                        sendResponse.sendErrorMessage(errorMsg, res);
                                    } else {
//                                        var str = "<p>Hi," + sender_first_name + " " + sender_last_name + "</p>";
//                                        str += "<p>" + receiver_first_name + " " + receiver_last_name + " with profile id " + receiver_profile_id + " has accepted your connect request.</p>";
//                                        str += "<p>Kindly login to connect.</p>";
//                                        str += "<p>Regards,</p>";
//                                        str += "<p>Team EPardesh</p>";


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
                                        str += '<td align="center" style="font-size:25px;color:#333333;padding:10px 20px 0px;font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif">Request Accepted</td>'
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
                                        str += '<td style="font-size:20px;color:#444444;padding:0px 30px;font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif">Dear ' + sender_first_name + ' ' + sender_last_name + ',</td>'
                                        str += '</tr>'
                                        str += '<tr>'
                                        str += '<td height="10"></td>'
                                        str += '</tr>'
                                        str += '<tr>'
                                        str += '<td style="font-size:12px;color:#444444;padding:0px 30px;line-height:19px;font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif">' + receiver_first_name + ' ' + receiver_last_name + ' with profile id ' + receiver_profile_id + ' has accepted your connect request.</td>'
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

                                        var mailOptions = {to: sender_email, subject: 'Request accepted.', html: str};
                                        transporter.sendMail(mailOptions, function (error, info) {
                                            if (error) {
                                                console.log('in error')
                                                console.log(error)
                                            } else {
                                                if (is_platinum_status == 1) {
                                                    var params = {
                                                        'src': '+917355602700', // Sender's phone number with country code
                                                        'dst': '+919199780665', // Receiver's phone Number with country code
                                                        'text': 'Hi, ' + receiver_first_name + receiver_last_name + ' has accepted your connect request.' // Your SMS Text Message - English
                                                    };

                                                    
                                                    api.send_message(params, function (status, response) {
                                                        
                                                        
                                                        
                                                        if (err) {
                                                            console.log('in pvlio err')
                                                            console.log(err)
                                                        } else {
                                                            console.log('Message sent: ');
                                                        }
                                                    });
                                                }

                                            }
                                            var msg = {};
                                            sendResponse.sendSuccessData(msg, res);
                                        });
                                    }
                                })
                            } else if (status == 2 || status == '2') {
                                var reject_request = "update matrimony_connect_requests set approve_status='2' where id=?";
                                var profile_id = [request_id]
                                connection.query(reject_request, profile_id, function (err, result) {
                                    if (err)
                                    {
                                        console.log(err)
                                        var errorMsg = 'some error occurred';
                                        sendResponse.sendErrorMessage(errorMsg, res);
                                    } else {
//                                        var str = "<p>Hi," + sender_first_name + sender_last_name + "</p>";
//                                        str += "<p>" + receiver_first_name + " " + receiver_last_name + " has rejected your connect request.</p>";
//                                        str += "<p>Kindly login to get perfect matches.</p>";
//                                        str += "<p>Regards,</p>";
//                                        str += "<p>Team EPardesh</p>";

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
                                        str += '<td align="center" style="font-size:25px;color:#333333;padding:10px 20px 0px;font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif">Request Rejected</td>'
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
                                        str += '<td style="font-size:20px;padding:0px 30px;color:#444444;font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif">Dear ' + sender_first_name + ' ' + sender_last_name + ',</td>'
                                        str += '</tr>'
                                        str += '<tr>'
                                        str += '<td height="10"></td>'
                                        str += '</tr>'
                                        str += '<tr>'
                                        str += '<td style="font-size:12px;padding:0px 30px;color:#444444;line-height:19px;font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif">' + receiver_first_name + ' ' + receiver_last_name + ' with profile id ' + receiver_profile_id + ' has rejected your connect request.</td>'
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


                                        var mailOptions = {to: sender_email, subject: 'Request rejected.', html: str};
                                        transporter.sendMail(mailOptions, function (error, info) {
                                            if (error) {
                                                console.log('in error')
                                                console.log(error)
                                            } else {
                                                if (is_platinum_status == 1) {

                                                    var params = {
                                                        'src': '+917355602700', // Sender's phone number with country code
                                                        'dst': '+919199780665', // Receiver's phone Number with country code
                                                        'text': 'Hi, ' + receiver_first_name + ' ' + receiver_last_name + ' has rejected your connect request.' // Your SMS Text Message - English
                                                    };

// Prints the complete response
                                                    api.send_message(params, function (status, response) {
                                                        



                                                        if (err) {
                                                            console.log(err)
                                                            console.log('in pvlio err')
                                                        } else {
                                                            console.log('Message sent: ');
                                                        }
                                                    });





//                                                    client.messages.create({
//                                                        to: '+91' + sender_mobile + '',
//                                                        from: admin_number,
//                                                        body: 'Hi, ' + receiver_first_name + ' ' + receiver_last_name + ' has rejected your connect request. Kindly login to get perfect matches.',
//                                                    }, function (err, message) {
//                                                        console.log(err)
//                                                        //console.log(message.sid);
//                                                    });
                                                }
                                                console.log('Message sent: ');
                                            }
                                            var msg = {};
                                            sendResponse.sendSuccessData(msg, res);
                                        });
                                    }
                                })
                            }
                        } else {
                            var errorMsg = 'ad does not exist';
                            sendResponse.sendErrorMessage(errorMsg, res);
                        }
                    }
                })
            })
});


/*
 * --------------------------------------------------------------------------
 * remove_from_favourites
 * --------------------------------------------------------------------------
 */

router.post('/remove_from_favourites', function (req, res, next) {
    var access_token = req.body.access_token;
    var request_id = req.body.request_id;
    var manValues = [request_id, access_token]
    async.waterfall([
        function (callback) {
            func.checkBlank(res, manValues, callback);
        },
        function (callback) {
            checkUser(res, access_token, callback);
        }],
            function () {
                var check_ad = "select * from matrimony_connect_requests where id=?";
                var values = [request_id]
                connection.query(check_ad, values, function (err, rows) {
                    if (err)
                    {
                        console.log(err)
                        var errorMsg = 'some error occurred';
                        sendResponse.sendErrorMessage(errorMsg, res);
                    } else {
                        if (rows.length > '0' || rows.length > 0) {
                            var remove_favourites = "delete from matrimony_connect_requests where id=?";
                            var profile_id = [request_id]
                            connection.query(remove_favourites, profile_id, function (err, result) {
                                if (err)
                                {
                                    console.log(err)
                                    var errorMsg = 'some error occurred';
                                    sendResponse.sendErrorMessage(errorMsg, res);
                                } else {
                                    var msg = {};
                                    sendResponse.sendSuccessData(msg, res);
                                }
                            })
                        } else {
                            var errorMsg = 'ad does not exist';
                            sendResponse.sendErrorMessage(errorMsg, res);
                        }
                    }
                })
            })
});

/*
 * --------------------------------------------------------------------------
 * interested_profile_counts
 * --------------------------------------------------------------------------
 */
router.post('/interested_profile_counts', function (req, res, next) {
    var user_id = req.body.user_id;
    var get_viewed_count = "SELECT COUNT(*) as viewed_count FROM matrimony_connect_requests where receiver_id=? and status=1";
    var profile_id1 = [user_id]
    connection.query(get_viewed_count, profile_id1, function (err, viewed_count) {
        if (err)
        {
            console.log(err)
            var errorMsg = 'some error occurred';
            sendResponse.sendErrorMessage(errorMsg, res);
        } else {
            var get_pending_request_count = "SELECT COUNT(*) as pending_request_count FROM matrimony_connect_requests where receiver_id=? and status=2 and approve_status='0'";
            var profile_id2 = [user_id]
            connection.query(get_pending_request_count, profile_id2, function (err, pending_request_count) {
                if (err)
                {
                    console.log(err)
                    var errorMsg = 'some error occurred';
                    sendResponse.sendErrorMessage(errorMsg, res);
                } else {
                    var get_favourites_count = "SELECT COUNT(*) as favourites_count FROM matrimony_connect_requests where sender_id=? and status=3";
                    var profile_id3 = [user_id]
                    connection.query(get_favourites_count, profile_id3, function (err, favourites_count) {
                        if (err)
                        {
                            console.log(err)
                            var errorMsg = 'some error occurred';
                            sendResponse.sendErrorMessage(errorMsg, res);
                        } else {
                            var get_accepted_count = "SELECT COUNT(*) as accepted_count FROM matrimony_connect_requests where (sender_id=? or receiver_id=?) and status='2' and approve_status='1'";
                            var profile_id4 = [user_id, user_id]
                            connection.query(get_accepted_count, profile_id4, function (err, accepted_count) {
                                if (err)
                                {
                                    console.log(err)
                                    var errorMsg = 'some error occurred';
                                    sendResponse.sendErrorMessage(errorMsg, res);
                                } else {
                                    var data = {
                                        viewed_count: viewed_count[0].viewed_count,
                                        pending_request_count: pending_request_count[0].pending_request_count,
                                        favourites_count: favourites_count[0].favourites_count,
                                        accepted_count: accepted_count[0].accepted_count
                                    }
                                    sendResponse.sendSuccessData(data, res);
                                }
                            })
                        }
                    })
                }
            })
        }
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