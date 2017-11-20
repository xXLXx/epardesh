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
 * register_user
 * INPUT : first_name,last_name,email, password
 * ---------------------------------------------------------------------------
 */
router.post('/register_user', function (req, res, next) {
    var first_name = req.body.first_name;
    var last_name = req.body.last_name;
    var email = req.body.email;
    var phone = req.body.phone;
    var city = req.body.city;
    var state = req.body.state;
    var country = req.body.country;
    var address = req.body.address;
    var password = req.body.password;
    var user_type = req.body.user_type;
    var business_name = req.body.business_name;
    var website = req.body.website;
    var manValues = [first_name, last_name, email, password, city, state, country, phone, user_type]
    async.waterfall([
        function (callback) {
            func.checkBlank(res, manValues, callback);
        },
        function (callback) {
            check_email_availability(res, email, callback);
        }],
            function (err, updatePopup, critical) {
                var login_time = new Date();
                var access_token = func.encrypt(email + login_time);
                var encrypt_password = md5(password);
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


                str += '<div style="text-align:Right;margin-bottom:10px">'
                str += '<div style="padding:5px">'
                str += '<a style="font-family:Arial,Helvetica,sans-serif;display:inline-block;min-height:22px;line-height:42px;padding:0px 20px;color:rgb(255,255,255);font-size:14px;font-weight:bold;border-radius:3px;white-space:nowrap;text-decoration:none;text-align:center;background-color:rgb(66,127,237)" href="' + classified_url_email + '" target="_blank">Post free ad</a><br>'
                str += '</div>'
                str += '</div>'

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
                str += '<td align="center" style="font-size:25px;color:#333333;padding:10px 20px 0px;font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif">Successfully Registered</td>'
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
                str += '<td style="font-size:12px;padding:0px 30px;color:#444444;line-height:19px;font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif">You are now registered as ' + email + ' at EPARDESH and have complete access to our online resources and special offers, including :</td>'
                str += '</tr>'

                str += '<tr>'
                str += '<td style="font-size:12px;padding:0px 30px;color:#444444;line-height:19px;font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif">&#10147; Free online AD posting.</td>'
                str += '</tr>'

                str += '<tr>'
                str += '<td style="font-size:12px;padding:0px 30px;color:#444444;line-height:19px;font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif">&#10147; Free online Event posting.</td>'
                str += '</tr>'

                str += '<tr>'
                str += '<td style="font-size:12px;padding:0px 30px;color:#444444;line-height:19px;font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif">&#10147; Free online IT Training posting.</td>'
                str += '</tr>'

                str += '<tr>'
                str += '<td style="font-size:12px;padding:0px 30px;color:#444444;line-height:19px;font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif">&#10147; Banner AD facility to show Ad to your local users or nationwide users.</td>'
                str += '</tr>'

                str += '<tr>'
                str += '<td style="font-size:12px;padding:0px 30px;color:#444444;line-height:19px;font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif">&#10147; Premium AD and Featured AD for greater visibility.</td>'
                str += '</tr>'

                str += '<tr>'
                str += '<td style="font-size:12px;padding:0px 30px;color:#444444;line-height:19px;font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif">&#10147; Special discounts through our promocodes...regularly check when promocodes are available.</td>'
                str += '</tr>'

                str += '<tr>'
                str += "<td style='font-size:12px;padding:0px 30px;color:#444444;line-height:19px;font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif'>Excited!!! Now it's time to post some ads..... Click link below to post your free ad today.</td>"
                str += '</tr>'

                str += '<tr>'
                str += '<td height="20"></td>'
                str += '</tr>'

                str += '<div style="text-align:center;margin-bottom:10px">'
                str += '<div style="padding:5px">'
                str += '<a style="font-family:Arial,Helvetica,sans-serif;display:inline-block;min-height:22px;line-height:42px;padding:0px 20px;color:rgb(255,255,255);font-size:14px;font-weight:bold;border-radius:3px;white-space:nowrap;text-decoration:none;text-align:center;background-color:rgb(66,127,237)" href="' + classified_url_email + '" target="_blank">Post free ad</a><br>'
                str += '</div>'
                str += '</div>'

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
                var sql = "INSERT INTO `user`(`first_name`,`last_name`, `email`,`phone`,`city`,`state`,`country`,`address`, `password`,`access_token`,`user_type`,`business_name`,`website`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)";
                var values = [first_name, last_name, email, phone, city, state, country, address, encrypt_password, access_token, user_type, business_name, website];
                console.log(values)
                connection.query(sql, values, function (err, userInsertResult) {
                    console.log(userInsertResult)
                    if (err) {
                        console.log(err);
                        var msg = "some error occurred";
                        sendResponse.sendErrorMessage(msg, res);
                    } else {
                        var mailOptions = {to: email, subject: 'ePardesh :: Welcome to ePardesh!', html: str};
                        transporter.sendMail(mailOptions, function (error, info) {
                            if (error) {
                                console.log("Error Found:");
                                console.log(error);
                                //throw err;
                                //return console.log(error);
                            } else {
                                console.log('Message sent: ');
                                console.log(info);

                                var sql = "SELECT * FROM user ORDER BY id DESC LIMIT 1";
                                connection.query(sql, function (err, rows) {
                                    if (err)
                                    {
                                        var errorMsg = 'some error occurred';
                                        sendResponse.sendErrorMessage(errorMsg, res);
                                    } else {
                                        var id = rows[0].id;
                                        var data = {first_name: first_name, last_name: last_name, email: email, access_token: access_token, id: id, user_type: user_type, business_name: business_name, website: website, phone: phone};
                                        sendResponse.sendSuccessData(data, res);
                                    }

                                });
                            }
                        });
                    }
                });

            });
});

/*
 * --------------------------------------------------------------------------
 * apply_classified_promocode
 * INPUT : user_id, promocode
 * ---------------------------------------------------------------------------
 */
router.post('/apply_classified_promocode', function (req, res, next) {
    var user_id = req.body.user_id;
    var promocode = req.body.promocode;
    var manValues = [user_id, promocode];
    async.waterfall([
        function (callback) {
            func.checkBlank(res, manValues, callback);
        }],
            function () {
                var sql = "SELECT * FROM user WHERE `id`= ? ";
                var values = [user_id];
                connection.query(sql, values, function (err, rows) {
                    if (err) {
                        var errorMsg = 'some error occurred';
                        sendResponse.sendErrorMessage(errorMsg, res);
                    } else {
                        if (rows.length > 0 || rows.length > '0') {
                            var insert_query = 'insert into classified_applied_promocodes (user_id, promocode) values (?,?)';
                            var promocode_value = [user_id, promocode]
                            connection.query(insert_query, promocode_value, function (err, data) {
                                if (err) {
                                    var errorMsg = 'some error occurred';
                                    sendResponse.sendErrorMessage(errorMsg, res);
                                } else {
                                    var msg = {}
                                    sendResponse.sendSuccessData(msg, res);
                                }
                            })
                        } else {
                            var errorMsg = 'user not found';
                            sendResponse.sendErrorMessage(errorMsg, res);
                        }
                    }
                });
            })
});

/*
 * --------------------------------------------------------------------------
 * check_applied_promocode
 * INPUT : user_id, promocode
 * ---------------------------------------------------------------------------
 */
router.post('/check_applied_promocode', function (req, res, next) {
    var user_id = req.body.user_id;
    var promocode = req.body.promocode;
    var manValues = [user_id, promocode];
    async.waterfall([
        function (callback) {
            func.checkBlank(res, manValues, callback);
        }],
            function () {
                var sql = "SELECT * FROM classified_applied_promocodes WHERE `user_id`=? and `promocode`=? ";
                var values = [user_id, promocode];
                connection.query(sql, values, function (err, rows) {
                    if (err) {
                        var errorMsg = 'some error occurred';
                        sendResponse.sendErrorMessage(errorMsg, res);
                    } else {
                        if (rows.length > 0 || rows.length > '0') {
                            var data = {
                                status: 0
                            }
                        } else {
                            var data = {
                                status: 1
                            }
                        }
                        sendResponse.sendSuccessData(data, res);
                    }
                });
            })
});


/*
 * --------------------------------------------------------------------------
 * login_user
 * INPUT : email, password
 * ---------------------------------------------------------------------------
 */
router.post('/login_user', function (req, res, next) {
    var email = req.body.email;
    var password = req.body.password;
    var encrypt_password = md5(password);
    var manValues = [email, password, encrypt_password];
    async.waterfall([
        function (callback) {
            func.checkBlank(res, manValues, callback);
        },
        function (callback) {
            user_registered_check(res, email, callback);
        }],
            function () {
                var sql = "SELECT * FROM user  WHERE `email`= ? ";
                var values = [email];
                connection.query(sql, values, function (err, rows) {
                    if (err) {
                        var errorMsg = 'some error occurred';
                        sendResponse.sendErrorMessage(errorMsg, res);
                    } else {
                        if (rows[0].password == encrypt_password) {
                            var data = {first_name: rows[0].first_name, last_name: rows[0].last_name, email: rows[0].email, access_token: rows[0].access_token, id: rows[0].id, user_type: rows[0].user_type, business_name: rows[0].business_name, phone: rows[0].phone};
                            sendResponse.sendSuccessData(data, res);
                        } else {
                            var errorMsg = 'Email or password is incorrect.';
                            sendResponse.sendErrorMessage(errorMsg, res);
                        }
                    }
                });
            })
});

/*
 * --------------------------------------------------------------------------
 * forgot_password
 * INPUT : email
 * ---------------------------------------------------------------------------
 */
router.post('/forgot_password', function (req, res, next) {
    var email = req.body.email;
    var manValues = [email];
    async.waterfall([
        function (callback) {
            func.checkBlank(res, manValues, callback);
        }
    ], function (err, updatePopup, critical) {
        var sql1 = "select * from user where email=?";
        var values1 = [email]
        connection.query(sql1, values1, function (err, rows) {
            if (err) {
                console.log(err)
                var Msg = 'something went wrong';
                sendResponse.sendErrorMessage(Msg, res);
            } else {

                if (rows.length != 0) {
                    var loginTime = new Date();
                    var activation_code = func.encrypt(email + loginTime);
//                    var str = "<p>Hi,</p>";
//                    str += "<p>We have received a password change request for your account.</p>";
//                    str += "<p>If you made this request, then please click the below link to reset your password.</p>";
//                    str += "<a href=" + classified_url + "update-password/" + activation_code + ">Click Here</a>";
//                    str += "<p>If you did not ask to change your password, then please ignore this email. Another user may have entered your email by mistake. No changes will be made to your account.</p>"
//                    str += "<p>Regards,</p>";
//                    str += "<p>Team EPardesh</p>";



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
                    str += '<td align="center" style="font-size:25px;color:#333333;padding:10px 20px 0px;font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif">Forgot Password</td>'
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
                    str += '<td style="font-size:20px;color:#444444;padding:0px 30px;font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif">Dear User,</td>'
                    str += '</tr>'
                    str += '<tr>'
                    str += '<td height="10"></td>'
                    str += '</tr>'
                    str += '<tr>'
                    str += '<td style="padding-bottom:10px;font-size:12px;padding:0px 30px;color:#444444;line-height:19px;font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif">We have received a password change request for your account.If you made this request, then please click the below link to reset your password. </td>'
                    str += '</tr>'
                    str += '<tr>'
                    str += "<a href=" + classified_url + "update-password/" + activation_code + ">Click Here</a>";
                    str += '</tr>'
                    str += '<tr>'
                    str += '<td style="padding-top:10px;font-size:12px;padding:0px 30px;color:#444444;line-height:19px;font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif">If you did not ask to change your password, then please ignore this email. Another user may have entered your email by mistake. No changes will be made to your account.</td>'
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

                    var mailOptions = {to: email, subject: 'Password Recovery', html: str};
                    transporter.sendMail(mailOptions, function (error, info) {
                        if (error) {
                            console.log(error)
                            var errorMsg = 'some error occurred';
                            sendResponse.sendErrorMessage(errorMsg, res);
                        } else {
                            var sql = "update user set activation_code = ? where email = ?";
                            var values = [activation_code, email];
                            connection.query(sql, values, function (err, userInsertResult) {
                                if (err) {
                                    var errorMsg = 'some error occurred';
                                    sendResponse.sendErrorMessage(errorMsg, res);
                                } else {
                                    console.log('mail sent')
                                    var Msg = [];
                                    sendResponse.sendSuccessData(Msg, res);
                                }
                            })
                        }
                    });

                } else {
                    var msg = "user not registered";
                    sendResponse.sendErrorMessage(msg, res);
                }
            }
        })

    })
});



/*
 * --------------------------------------------------------------------------
 * update_password
 * INPUT : token,newpassword
 * ---------------------------------------------------------------------------
 */
router.post('/update_password', function (req, res, next) {
    var activation_code = req.body.activation_code;
    var new_password = req.body.new_password;
    var encrypt_password = md5(new_password);
    var manValues = [activation_code, encrypt_password];
    async.waterfall([
        function (callback) {
            func.checkBlank(res, manValues, callback);
        }],
            function () {
                var sql = "SELECT activation_code, password FROM user where activation_code=?";
                var values = [activation_code];
                connection.query(sql, values, function (err, rows) {
                    if (err) {
                        console.log("error1")
                        var Msg = 'some error occurred';
                        sendResponse.sendErrorMessage(Msg, res);
                    } else {
                        if (rows == "") {
                            var Msg = 'Unauthorised access!';
                            sendResponse.sendErrorMessage(Msg, res);
                        } else {
                            if (activation_code == rows[0].activation_code) {
                                var loginTime = new Date();
                                var code = func.encrypt(activation_code + loginTime);
                                var sql = "update user set password = ? , activation_code = ? where activation_code = ?";
                                var values = [encrypt_password, code, activation_code];
                                connection.query(sql, values, function (err, userInsertResult) {
                                    if (err) {
                                        console.log("error2")
                                        var Msg = 'Unauthorised access!';
                                        sendResponse.sendErrorMessage(Msg, res);
                                    } else {
                                        var Msg = {};
                                        sendResponse.sendSuccessData(Msg, res);
                                    }
                                })
                            }
                        }
                    }
                    ;
                });
            });
});

/*
 * --------------------------------------------------------------------------
 * change_password
 * INPUT : old_password,new_password, access_token
 * ---------------------------------------------------------------------------
 */
router.post('/change_password', function (req, res, next) {
    var old_password = req.body.old_password;
    var new_password = req.body.new_password;
    var token = req.body.token;
    var manValues = [old_password, new_password, token];
    async.waterfall([
        function (callback) {
            func.checkBlank(res, manValues, callback);
        }
    ], function () {
        var encrypt_old_password = md5(old_password);
        var encrypt_new_password = md5(new_password);
        var sql = "SELECT access_token, password FROM user where access_token=?";
        var values = [token];
        connection.query(sql, values, function (err, rows) {
            if (err) {
                var errorMsg = 'some error occurred';
                sendResponse.sendErrorMessage(errorMsg, res);
            } else {
                if (rows == "") {
                    var Msg = 'Unauthorised access';
                    sendResponse.sendErrorMessage(Msg, res);
                } else {
                    if (encrypt_old_password == rows[0].password) {
                        var sql = "update user set password = ? where access_token = ?";
                        var values = [encrypt_new_password, token];
                        connection.query(sql, values, function (err, userInsertResult) {
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
 * update_user_profile
 * ---------------------------------------------------------------------------
 */
router.post('/update_user_profile', function (req, res, next) {
    var first_name = req.body.first_name;
    var last_name = req.body.last_name;
    var phone = req.body.phone;
    var phone1 = req.body.phone1;
    var phone2 = req.body.phone2;
    var city = req.body.city;
    var state = req.body.state;
    var country = req.body.country;
    var address = req.body.address;
    var business_name = req.body.business_name;
    var website = req.body.website;
    var email = req.body.email;

    async.waterfall([
        function (callback) {
            user_registered_check(res, email, callback);
        }
    ], function () {
        var sql = "UPDATE user SET first_name=?,last_name=?,phone=?,phone1=?,phone2=?,city=?,state=?,country=?,address=?,business_name=?,website=? WHERE email=?";
        var values = [first_name, last_name, phone, phone1, phone2, city, state, country, address, business_name, website, email];
        connection.query(sql, values, function (err, rows, fields) {
            if (err) {
                console.log(err)
                var msg = "some error occurred";
                sendResponse.sendErrorMessage(msg, res);
            } else {
                var sql = "select * from user WHERE email=?";
                var values = [email];
                connection.query(sql, values, function (err, rows, fields) {
                    if (err) {
                        console.log(err)
                        var msg = "some error occurred";
                        sendResponse.sendErrorMessage(msg, res);
                    } else {
                        
                        var str = '<div style="margin:0;padding:0;font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif">'
                                    str += '<table width="100%" cellpadding="0" cellspacing="0" border="0" align="center" style="font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif;max-width:600px;background-color:#ffffff;color:#666666;text-align:left;padding:0px 2% 10px 2%;background:url(http://teja1.kuikr.com/images/notification/mailer-bg.jpg) repeat #f9f9f9">'
                                    str += '<tbody><tr>'
                                    str += '<td height="20"></td>'
                                    str += '</tr>'
                                    str += '<tr>'
                                    str += '<td height="43" valign="top"><table width="100%" cellspacing="0" cellpadding="0" border="0" align="center" style="max-width:530px">'
                                    str += '<tbody><tr>'
                                    str += '<td align="left" height="43"><a href="#m_8496668978295844378_m_8306747430853343728_m_8934663683847810844_"><img src="' + url + 'logo.jpg" alt="Epardesh" width="180" border="0" style="width:220px;height:auto;margin:0;margin-left:-15px;margin-top:-20px;display:block;font-family:Arial,Helvetica,sans-serif;color:#007ebe;font-size:20px;text-align:center;font-weight:bold" class="CToWUd"></a></td>'
                                    str += '<div style="text-align:Right;margin-bottom:10px">'
                                    str += '<div style="padding:5px">'
                                    str += '<a style="font-family:Arial,Helvetica,sans-serif;display:inline-block;min-height:22px;line-height:42px;padding:0px 20px;color:rgb(255,255,255);font-size:14px;font-weight:bold;border-radius:3px;white-space:nowrap;text-decoration:none;text-align:center;background-color:rgb(66,127,237)" href="' + classified_url_email + '" target="_blank">Post free ad</a><br>'
                                    str += '</div>'
                                    str += '</div>'
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
                                    str += '<td align="center" style="color: blue;text-decoration:underline;font-size:20px;padding:10px 20px 0px;font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif">Your profile updated successfully</td>'
                                    str += '</tr>'
                                    str += '<tr>'
                                    str += '<td height="40"></td>'
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
                                    str += '<td style="font-size:12px;padding:0px 30px;color:#444444;line-height:19px;font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif">'
                                    str += 'Your profile has been updated successfully.'
                                    str += '</td>'
                                    str += '</tr>'
                                    str += '<tr><td height="10"></td></tr>'
                                    str += '<tr>'
                                    str += '<td style="font-size: 12px;padding: 0px 30px;color: #444444;line-height: 15px;">'
                                    str += 'To view/edit your account information anytime, login to "My Account" @'
                                    str += '</td>'
                                    str += '</tr>'
                                    str += '<tr><td height="25"></td></tr>'
                                    str += '<tr>'
                                    str += '<td style="font-size: 12px;padding: 0px 30px;color: #444444;line-height: 15px;">'
                                    str += '<a style="font-size: 12px;text-decoration: underline; color: blue;" href="http://www.epardesh.com/login">http://www.epardesh.com/login</a>'
                                    str += '</td>'
                                    str += '</tr>'
                                    str += '</tbody></table></td>'
                                    str += '</tr>'
                                    str += '<tr>'
                                    str += '<td height="40"></td>'
                                    str += '</tr>'
                                    str += '<tr>'
                                    str += '<td style="font-size:12px;font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif;color:#444444;line-height:normal;padding:0px 40px;text-align:left">Thanks,<br>'
                                    str += '<style="font-size:12px;font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif;color:#444444;line-height:normal;padding:0px 20px;text-align:left">ePardesh Team,<br>'
                                    str += '<strong style="font-size:12px;font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif;color:#444444;line-height:normal"><a href=' + classified_url + ' target="_blank" data-saferedirecturl=' + classified_url + '>www.ePardesh.com</a></strong></td>'
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
                                    str += '<td height="20"></td>'
                                    str += '</tr>'
                                    str += '</tbody></table>'
                                    str += '</div>'
                                               
                        var mailOptions = {to: email, subject: 'ePardesh: Your Profile has been updated successfully', html: str};
                        transporter.sendMail(mailOptions, function (error, info) {
                            if (error) {
                                console.log(error)
                            } else {
                                console.log('Message sent: ');

                            }
                            sendResponse.sendSuccessData(rows[0], res);
                        });
                    }
                });
            }
        });
    });
});



//testing salesforceapi
//router.post('/salesforce', function(req, res) {
//    var instanceURL = "";
//    var params = {};
//    //var accessTokenUrl = 'https://accounts.google.com/o/oauth2/token';
//    request.post(instanceURL, {json: true, form: params}, function(err, response, token) {
//        console.log("response")
//        console.log(response.body);
//        var errorMsg = 'done!';
//        sendResponse.sendSuccessData(response.body, res);
//    });
//})

/*
 * --------------------------------------------------------------------------
 * login_using_facebook
 * ---------------------------------------------------------------------------
 */
router.post('/auth/facebook', function (req, res) {
    var user_type = req.body.user_type;
    console.log("in facebook")
    var fields = ['id', 'email', 'first_name', 'last_name', 'link', 'name'];
    console.log("before accessTokenUrl");
    var accessTokenUrl = 'https://graph.facebook.com/v2.5/oauth/access_token';
    console.log("after accessTokenUrl");
    var graphApiUrl = 'https://graph.facebook.com/v2.5/me?fields=' + fields.join(',');
    console.log("before params");
    var params = {
        code: req.body.code,
        client_id: req.body.clientId,
        client_secret: "1ca36a5cff05e345edfcc5c43c856237",
        redirect_uri: req.body.redirectUri
    };
    console.log("params");
    console.log(params);

    // Step 1. Exchange authorization code for access token.
    // userAccessToken = facebookApp.getUserAccessToken();
    request.get({url: accessTokenUrl, qs: params, json: true}, function (err, response, accessToken) {
        if (response.statusCode !== 200) {
            console.log("err");
            console.log(err);
            console.log("response");
            console.log(response);
            console.log(accessToken.error.message);
            return res.status(500).send({message: accessToken.error.message});
        }
        console.log("above step2")
        // Step 2. Retrieve profile information about the current user.
        request.get({url: graphApiUrl, qs: accessToken, json: true}, function (err, response, profile) {
            if (response.statusCode !== 200) {
                return res.status(500).send({message: profile.error.message});
            }
            console.log("profile");
            console.log(profile);
            console.log("profile.email");
            console.log(profile.email);
            var sql = "SELECT email FROM user WHERE email=?";
            var email = profile.email;
            var values = [email];
            connection.query(sql, values, function (err, rows1) {
                if (err) {
                    console.log("Error Found1:");
                    console.log(err);
                    var errorMsg = 'Something went wrong, Please try again!';
                    sendResponse.sendErrorMessage(errorMsg, res);
                    //throw err;
                } else {
                    console.log("no error");
                    console.log(rows1);
                    var user_data = rows1.length;
                    console.log(user_data);
                    if (user_data > 0) {
                        var sql = "SELECT id,email,access_token,first_name,last_name,user_type,business_name,phone FROM user WHERE `email`=? limit 1";
                        var values = [rows1[0].email];
                        console.log(values);
                        connection.query(sql, values, function (err, rows3) {
                            if (err) {
                                console.log("Error Found2:");
                                console.log(err);
                                var errorMsg = 'Something went wrong, Please try again!';
                                sendResponse.sendErrorMessage(errorMsg, res);
                                //throw err;
                            } else {
                                console.log("in login")
                                console.log(rows3);
                                var data = {
                                    id: rows3[0].id,
                                    email: rows3[0].email,
                                    access_token: rows3[0].access_token,
                                    first_name: rows3[0].first_name,
                                    last_name: rows3[0].last_name,
                                    user_type: rows3[0].user_type,
                                    business_name: rows3[0].business_name,
                                    phone: rows3[0].phone,
                                    status: "login"
                                }
                                sendResponse.sendSuccessData(data, res);
                            }
                        });
//                          
                    } else {
                        var loginTime = new Date();
                        var accessToken = func.encrypt(profile.email + loginTime);
                        var email = profile.email;
                        var password = "";
                        var login_provider = "facebook";
                        var token = accessToken;
                        var salt = "";
                        var refer_id = "";
                        var referred_by_id = "";
                        var verified = 0;
                        var account_type = "public";
                        var created_on = loginTime;
                        var updated_on = loginTime;
                        var first_name = profile.first_name;
                        var last_name = profile.last_name;
                        var facebook_id = profile.id;
                        var sql = "INSERT INTO `user`(`email`,`password`,`first_name`,`last_name`, `access_token`,`facebook_id`) VALUES (?,?,?,?,?,?)";
                        var values = [email, password, first_name, last_name, token, facebook_id];
                        connection.query(sql, values, function (err, userInsertResult) {
                            if (err) {
                                console.log("Insert Result Fail Error:");
                                console.log(err);
                                var errorMsg = 'Something went wrong, Please try again!';
                                sendResponse.sendErrorMessage(errorMsg, res);
                                //throw err;
                            } else {
                                var sql = "select id,email,access_token,first_name,last_name,business_name,phone,user_type from user WHERE email=?";
                                var VALUES = [profile.email];
                                connection.query(sql, VALUES, function (err, result_user) {
                                    if (err) {
                                        console.log("Error Found:");
                                        console.log(err);
                                        var errorMsg = 'Something went wrong, Please try again!';
                                        send_response.sendErrorMessage(errorMsg, res);
                                        //throw err;
                                    } else {
                                        console.log("in register")
                                        // console.log(result_user)
                                        var str = '<div style="margin:0;padding:0;font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif">'
                                        str += '<table width="100%" cellpadding="0" cellspacing="0" border="0" align="center" style="font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif;max-width:600px;background-color:#ffffff;color:#666666;text-align:left;padding:0px 2% 10px 2%;background:url(http://teja1.kuikr.com/images/notification/mailer-bg.jpg) repeat #f9f9f9">'
                                        str += '<tbody><tr>'
                                        str += '<td height="20"></td>'
                                        str += '</tr>'
                                        str += '<tr>'
                                        str += '<td height="43" valign="top"><table width="100%" cellspacing="0" cellpadding="0" border="0" align="center" style="max-width:530px">'
                                        str += '<tbody><tr>'
                                        
                                        str += '<td align="left" height="43"><a href="#m_8496668978295844378_m_8306747430853343728_m_8934663683847810844_"><img src="' + url + 'logo.jpg" alt="Epardesh" width="180" border="0" style="width:220px;height:auto;margin:0;margin-left:-15px;margin-top:-20px;display:block;font-family:Arial,Helvetica,sans-serif;color:#007ebe;font-size:20px;text-align:center;font-weight:bold" class="CToWUd"></a></td>'

                                        str += '<div style="text-align:Right;margin-bottom:10px">'
                                        str += '<div style="padding:5px">'
                                        str += '<a style="font-family:Arial,Helvetica,sans-serif;display:inline-block;min-height:22px;line-height:42px;padding:0px 20px;color:rgb(255,255,255);font-size:14px;font-weight:bold;border-radius:3px;white-space:nowrap;text-decoration:none;text-align:center;background-color:rgb(66,127,237);" href="' + classified_url_email + '" target="_blank">Post free ad</a><br>'
                                        str += '</div>'
                                        str += '</div>'
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
                                        str += '<td align="center" style="font-size:25px;color:#333333;padding:10px 20px 0px;font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif">Successfully Registered</td>'
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
                                        str += '<td style="font-size:12px;padding:0px 30px;color:#444444;line-height:19px;font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif">You are now registered as ' + email + ' at EPARDESH and have complete access to our online resources and special offers, including :</td>'
                                        str += '</tr>'

                                        str += '<tr>'
                                        str += '<td style="font-size:12px;padding:0px 30px;color:#444444;line-height:19px;font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif">&#10147; Free online AD posting.</td>'
                                        str += '</tr>'

                                        str += '<tr>'
                                        str += '<td style="font-size:12px;padding:0px 30px;color:#444444;line-height:19px;font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif">&#10147; Free online Event posting.</td>'
                                        str += '</tr>'

                                        str += '<tr>'
                                        str += '<td style="font-size:12px;padding:0px 30px;color:#444444;line-height:19px;font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif">&#10147; Free online IT Training posting.</td>'
                                        str += '</tr>'

                                        str += '<tr>'
                                        str += '<td style="font-size:12px;padding:0px 30px;color:#444444;line-height:19px;font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif">&#10147; Banner AD facility to show Ad to your local users or nationwide users.</td>'
                                        str += '</tr>'

                                        str += '<tr>'
                                        str += '<td style="font-size:12px;padding:0px 30px;color:#444444;line-height:19px;font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif">&#10147; Premium AD and Featured AD for greater visibility.</td>'
                                        str += '</tr>'

                                        str += '<tr>'
                                        str += '<td style="font-size:12px;padding:0px 30px;color:#444444;line-height:19px;font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif">&#10147; Special discounts through our promocodes...regularly check when promocodes are available.</td>'
                                        str += '</tr>'

                                        str += '<tr>'
                                        str += "<td style='font-size:12px;padding:0px 30px;color:#444444;line-height:19px;font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif'>Excited!!! Now it's time to post some ads..... Click link below to post your free ad today.</td>"
                                        str += '</tr>'

                                        str += '<tr>'
                                        str += '<td height="20"></td>'
                                        str += '</tr>'

                                        str += '<div style="text-align:center;margin-bottom:10px">'
                                        str += '<div style="padding:5px">'
                                        str += '<a style="font-family:Arial,Helvetica,sans-serif;display:inline-block;min-height:22px;line-height:42px;padding:0px 20px;color:rgb(255,255,255);font-size:14px;font-weight:bold;border-radius:3px;white-space:nowrap;text-decoration:none;text-align:center;background-color:rgb(66,127,237)" href="' + classified_url_email + '" target="_blank">Post free ad</a><br>'
                                        str += '</div>'
                                        str += '</div>'

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

                                        var mailOptions = {to: email, subject: 'ePardesh: Registration Successful', html: str};
                                        transporter.sendMail(mailOptions, function (error, info) {
                                            if (error) {
                                                console.log("Error Found:");
                                                console.log(error);
                                                //throw err;
                                                //return console.log(error);
                                            } else {
                                                console.log('Message sent: ');
                                            }
                                        });
                                        var data = {
                                            id: result_user[0].id,
                                            email: result_user[0].email,
                                            access_token: result_user[0].access_token,
                                            first_name: result_user[0].first_name,
                                            last_name: result_user[0].last_name,
                                            business_name: result_user[0].business_name,
                                            phone: result_user[0].phone,
                                            user_type: result_user[0].user_type,
                                            status: "signup"
                                        }
                                        sendResponse.sendSuccessData(data, res);
                                    }
                                });
                            }
                        });
                    }
                }
            })
        });
    });
});


/*
 * --------------------------------------------------------------------------
 * login_using_google
 * ---------------------------------------------------------------------------
 */
router.post('/auth/google', function (req, res) {
    console.log("in funct")
    var accessTokenUrl = 'https://accounts.google.com/o/oauth2/token';
    var peopleApiUrl = 'https://www.googleapis.com/plus/v1/people/me/openIdConnect';
    var params = {
        code: req.body.code,
        client_id: req.body.clientId,
        client_secret: "NFEx38cj-xbsQilJG8CQ-V5C",
        redirect_uri: req.body.redirectUri,
        grant_type: 'authorization_code'
    };
    console.log("after param funct")
    console.log(params)
    //res.send("in ");
    // Step 1. Exchange authorization code for access token.
    request.post(accessTokenUrl, {json: true, form: params}, function (err, response, token) {
        console.log("err")
        console.log(err)
        console.log("token")
        console.log(token)
        console.log("token");
        console.log(token.access_token);
        //res.send("in request ");
        var accessToken = token.access_token;
        var headers = {Authorization: 'Bearer ' + accessToken};

        //Step 2. Retrieve profile information about the current user.
        request.get({url: peopleApiUrl, headers: headers, json: true}, function (err, response, profile) {
            if (profile.error) {
                console.log("in profile error");
                return res.status(500).send({message: profile.error.message});
            }
            console.log("profile")
            console.log(profile)
            var sql = "SELECT email FROM user WHERE email=?";
            var email = profile.email;
            var values = [email];
            connection.query(sql, values, function (err, rows1) {
                if (err) {
                    console.log("Error Found:");
                    console.log(err);
                    var errorMsg = 'Something went wrong, Please try again!';
                    sendResponse.sendErrorMessage(errorMsg, res);
                    //throw err;
                } else {
                    var user_data = rows1.length
                    if (user_data > 0) {
                        var sql = "SELECT id,email,access_token,first_name,last_name,user_type,business_name,phone FROM user WHERE `email`=? limit 1";
                        var values = [rows1[0].email];
                        connection.query(sql, values, function (err, rows3) {
                            if (err) {
                                console.log("Error Found:");
                                console.log(err);
                                var errorMsg = 'Something went wrong, Please try again!';
                                sendResponse.sendErrorMessage(errorMsg, res);
                                //throw err;
                            } else {
                                console.log("in login")
                                console.log(rows3)
                                var data = {
                                    id: rows3[0].id,
                                    email: rows3[0].email,
                                    access_token: rows3[0].access_token,
                                    first_name: rows3[0].first_name,
                                    last_name: rows3[0].last_name,
                                    user_type: rows3[0].user_type,
                                    business_name: rows3[0].business_name,
                                    phone: rows3[0].phone,
                                    status: "login"
                                }
                                sendResponse.sendSuccessData(data, res);
                            }
                        });
                    } else {
                        var loginTime = new Date();
                        var accessToken = func.encrypt(profile.email + loginTime);
                        var email = profile.email;
                        var password = "";
                        var login_provider = "google";
                        var token = accessToken;
                        var salt = "";
                        var refer_id = "";
                        var referred_by_id = "";
                        var verified = 0;
                        var account_type = "public";
                        var created_on = loginTime;
                        var updated_on = loginTime;
                        var google_id = profile.sub;
                        var first_name = profile.given_name;
                        var last_name = profile.family_name;
                        console.log("checking");
                        console.log(first_name);
                        console.log(last_name);
                        var sql = "INSERT INTO `user`(`email`,`password`,`first_name`,`last_name`, `access_token`,`google_id`) VALUES (?,?,?,?,?,?)";
                        var values = [email, password, first_name, last_name, token, google_id];
                        connection.query(sql, values, function (err, userInsertResult) {
                            if (err) {
                                console.log("Insert Result Fail Error:");
                                console.log(err);
                                var errorMsg = 'Something went wrong, Please try again!';
                                sendResponse.sendErrorMessage(errorMsg, res);
                                //throw err;
                            } else {
                                var sql = "select id,email,access_token,first_name,last_name,business_name,phone,user_type from user WHERE email=?";
                                var VALUES = [profile.email];
                                connection.query(sql, VALUES, function (err, result_user) {
                                    if (err) {
                                        console.log("Error Found:");
                                        console.log(err);
                                        var errorMsg = 'Something went wrong, Please try again!';
                                        sendResponse.sendErrorMessage(errorMsg, res);
                                        //throw err;
                                    } else {
                                        console.log("in register")
                                        console.log(result_user)
                                        var str = '<div style="margin:0;padding:0;font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif">'
                                        str += '<table width="100%" cellpadding="0" cellspacing="0" border="0" align="center" style="font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif;max-width:600px;background-color:#ffffff;color:#666666;text-align:left;padding:0px 2% 10px 2%;background:url(http://teja1.kuikr.com/images/notification/mailer-bg.jpg) repeat #f9f9f9">'
                                        str += '<tbody><tr>'
                                        str += '<td height="20"></td>'
                                        str += '</tr>'
                                        str += '<tr>'
                                        str += '<td height="43" valign="top"><table width="100%" cellspacing="0" cellpadding="0" border="0" align="center" style="max-width:530px">'
                                        str += '<tbody><tr>'
//                                        str += '<td align="left" height="43"><a href="#m_8496668978295844378_m_8306747430853343728_m_8934663683847810844_"><img src="' + url + 'logo.jpg" alt="Epardesh" width="94" height="43" border="0" style="margin:0;display:block;font-family:Arial,Helvetica,sans-serif;color:#007ebe;font-size:20px;text-align:center;font-weight:bold" class="CToWUd"></a></td>'
                                        str += '<td align="left" height="43"><a href="#m_8496668978295844378_m_8306747430853343728_m_8934663683847810844_"><img src="' + url + 'logo.jpg" alt="Epardesh" width="180" border="0" style="width:220px;height:auto;margin:0;margin-left:-15px;margin-top:-20px;display:block;font-family:Arial,Helvetica,sans-serif;color:#007ebe;font-size:20px;text-align:center;font-weight:bold" class="CToWUd"></a></td>'


                                        str += '<div style="text-align:Right;margin-bottom:10px">'
                                        str += '<div style="padding:5px">'
                                        str += '<a style="font-family:Arial,Helvetica,sans-serif;display:inline-block;min-height:22px;line-height:42px;padding:0px 20px;color:rgb(255,255,255);font-size:14px;font-weight:bold;border-radius:3px;white-space:nowrap;text-decoration:none;text-align:center;background-color:rgb(66,127,237)" href="' + classified_url_email + '" target="_blank">Post free ad</a><br>'
                                        str += '</div>'
                                        str += '</div>'

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
                                        str += '<td align="center" style="font-size:25px;color:#333333;padding:10px 20px 0px;font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif">Successfully Registered</td>'
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
                                        str += '<td style="font-size:12px;padding:0px 30px;color:#444444;line-height:19px;font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif">You are now registered as ' + email + ' at EPARDESH and have complete access to our online resources and special offers, including :</td>'
                                        str += '</tr>'

                                        str += '<tr>'
                                        str += '<td style="font-size:12px;padding:0px 30px;color:#444444;line-height:19px;font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif">&#10147; Free online AD posting.</td>'
                                        str += '</tr>'

                                        str += '<tr>'
                                        str += '<td style="font-size:12px;padding:0px 30px;color:#444444;line-height:19px;font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif">&#10147; Free online Event posting.</td>'
                                        str += '</tr>'

                                        str += '<tr>'
                                        str += '<td style="font-size:12px;padding:0px 30px;color:#444444;line-height:19px;font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif">&#10147; Free online IT Training posting.</td>'
                                        str += '</tr>'

                                        str += '<tr>'
                                        str += '<td style="font-size:12px;padding:0px 30px;color:#444444;line-height:19px;font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif">&#10147; Banner AD facility to show Ad to your local users or nationwide users.</td>'
                                        str += '</tr>'

                                        str += '<tr>'
                                        str += '<td style="font-size:12px;padding:0px 30px;color:#444444;line-height:19px;font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif">&#10147; Premium AD and Featured AD for greater visibility.</td>'
                                        str += '</tr>'

                                        str += '<tr>'
                                        str += '<td style="font-size:12px;padding:0px 30px;color:#444444;line-height:19px;font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif">&#10147; Special discounts through our promocodes...regularly check when promocodes are available.</td>'
                                        str += '</tr>'

                                        str += '<tr>'
                                        str += "<td style='font-size:12px;padding:0px 30px;color:#444444;line-height:19px;font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif'>Excited!!! Now it's time to post some ads..... Click link below to post your free ad today.</td>"
                                        str += '</tr>'

                                        str += '<tr>'
                                        str += '<td height="20"></td>'
                                        str += '</tr>'

                                        str += '<div style="text-align:center;margin-bottom:10px">'
                                        str += '<div style="padding:5px">'
                                        str += '<a style="font-family:Arial,Helvetica,sans-serif;display:inline-block;min-height:22px;line-height:42px;padding:0px 20px;color:rgb(255,255,255);font-size:14px;font-weight:bold;border-radius:3px;white-space:nowrap;text-decoration:none;text-align:center;background-color:rgb(66,127,237)" href="' + classified_url_email + '" target="_blank">Post free ad</a><br>'
                                        str += '</div>'
                                        str += '</div>'

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

                                        var mailOptions = {to: email, subject: 'ePardesh: Registration Successful', html: str};
                                        transporter.sendMail(mailOptions, function (error, info) {
                                            if (error) {
                                                console.log("Error Found:");
                                                console.log(error);
                                                //throw err;
                                                //return console.log(error);
                                            } else {
                                                console.log('Message sent: ');
                                            }
                                        });
                                        var data = {
                                            id: result_user[0].id,
                                            email: result_user[0].email,
                                            access_token: result_user[0].access_token,
                                            first_name: result_user[0].first_name,
                                            last_name: result_user[0].last_name,
                                            business_name: result_user[0].business_name,
                                            phone: result_user[0].phone,
                                            user_type: result_user[0].user_type,
                                            status: "signup"
                                        }
                                        sendResponse.sendSuccessData(data, res);
                                    }
                                });
                            }
                        });
                    }
                }
            })
        });
    });
});

/*
 * --------------------------------------------------------------------------
 * update_user_type
 * ---------------------------------------------------------------------------
 */
router.post('/update_user_type', function (req, res, next) {
    var email = req.body.email;
    var user_type = req.body.user_type;
    //var access_token = req.body.access_token;
    async.waterfall([
//        function (callback) {
//                checkUser(res, access_token, callback);
//            }
    ], function () {
        var sql = "UPDATE user SET user_type=? WHERE email=?";
        var values = [user_type, email];
        connection.query(sql, values, function (err, rows, fields) {
            if (err) {
                console.log(err)
                var msg = "some error occurred";
                sendResponse.sendErrorMessage(msg, res);
            } else {
                var sql = "SELECT email,access_token,first_name,last_name,user_type FROM user WHERE `email`=? limit 1";
                var values = [email];
                console.log(values);
                connection.query(sql, values, function (err, rows3) {
                    if (err) {
                        console.log("Error Found2:");
                        console.log(err);
                        var errorMsg = 'Something went wrong, Please try again!';
                        sendResponse.sendErrorMessage(errorMsg, res);
                    } else {
                        console.log("in login")
                        console.log(rows3);
                        var data = {
                            email: rows3[0].email,
                            access_token: rows3[0].access_token,
                            first_name: rows3[0].first_name,
                            last_name: rows3[0].last_name,
                            user_type: rows3[0].user_type,
                            status: "login"
                        }
                        sendResponse.sendSuccessData(data, res);
                    }
                });
            }
        });
    });
});



/*
 * --------------------------------------------------------------------------
 * check_email
 * INPUT : email
 * ---------------------------------------------------------------------------
 */
router.post('/check_email', function (req, res, next) {
    var email = req.body.email;
    var manValues = [email];
    async.waterfall([
        function (callback) {
            func.checkBlank(res, manValues, callback);
        }],
            function () {
                var sql = "SELECT * FROM user  WHERE `email`= ? ";
                var values = [email];
                connection.query(sql, values, function (err, rows) {
                    if (err) {
                        var errorMsg = 'some error occurred';
                        sendResponse.sendErrorMessage(errorMsg, res);
                    } else {
                        if (rows.length > 0) {
                            var data = {
                                status: '0'
                            }
                            sendResponse.sendSuccessData(data, res);
                        } else {
                            var data = {
                                status: '1'
                            }
                            sendResponse.sendSuccessData(data, res);
                        }
                    }
                });
            })
});

/*
 * --------------------------------------------------------------------------
 * view_all_promocode
 * --------------------------------------------------------------------------
 */
router.post('/view_all_promocode', function (req, res, next) {
    var view_promocode = "select * from classified_promocodes order by id desc"
    connection.query(view_promocode, function (err, promocodes) {
        if (err) {
            console.log(err)
            var errorMsg = 'some error occurred';
            sendResponse.sendErrorMessage(errorMsg, res);
        } else {
            sendResponse.sendSuccessData(promocodes, res);
        }
    });
})

/*
 * --------------------------------------------------------------------------
 * view_homepage_promocode
 * --------------------------------------------------------------------------
 */
router.post('/view_homepage_promocode', function (req, res, next) {
    var view_promocode = "select * from classified_promocodes where display_status = 1"
    connection.query(view_promocode, function (err, promocodes) {
        if (err) {
            console.log(err)
            var errorMsg = 'some error occurred';
            sendResponse.sendErrorMessage(errorMsg, res);
        } else {
            sendResponse.sendSuccessData(promocodes, res);
        }
    });
})


/*
 * --------------------------------------------------------------------------
 * send_email_in_ad
 * --------------------------------------------------------------------------
 */
router.post('/send_email_in_ad', function (req, res, next) {
    var sender_email = req.body.sender_email;
    var receiver_email = req.body.receiver_email;
    var message = req.body.message;
    var sender_name = req.body.sender_name;
    var sender_phone = req.body.sender_phone;
    var ad_id = req.body.ad_id
    var get_user_name = 'select * from user where email=?'
    var values = [receiver_email]
    connection.query(get_user_name, values, function (err, rows) {
        if (err) {
            console.log(err)
            var errorMsg = 'some error occurred';
            sendResponse.sendErrorMessage(errorMsg, res);
        } else {
            if (rows.length > 0) {
                var user_first_name = rows[0].first_name;


//                var str = '<div style="margin:0;padding:0;font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif">'
//                str += '<table width="100%" cellpadding="0" cellspacing="0" border="0" align="center" style="font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif;max-width:600px;background-color:#ffffff;color:#666666;text-align:left;padding:0px 2% 10px 2%;background:url(http://teja1.kuikr.com/images/notification/mailer-bg.jpg) repeat #f9f9f9">'
//                str += '<tbody><tr>'
//                str += '<td height="20"></td>'
//                str += '</tr>'
//                str += '<tr>'
//                str += '<td height="43" valign="top"><table width="100%" cellspacing="0" cellpadding="0" border="0" align="center" style="max-width:530px">'
//                str += '<tbody><tr>'
//                str += '<td align="left" height="43"><a href="#m_8496668978295844378_m_8306747430853343728_m_8934663683847810844_"><img src="' + url + 'logo.jpg" alt="Epardesh" width="94" height="43" border="0" style="margin:0;display:block;font-family:Arial,Helvetica,sans-serif;color:#007ebe;font-size:20px;text-align:center;font-weight:bold" class="CToWUd"></a></td>'
//                str += '</tr>'
//                str += '</tbody></table></td>'
//                str += '</tr>'
//                str += '<tr>'
//                str += '<td height="10"></td>'
//                str += '</tr>'
//                str += '<tr>'
//                str += '<td><table width="100%" align="center" cellspacing="0" cellpadding="0" border="0" style="max-width:530px;width:100%!important;background:#ffffff;border:1px solid #e3e3e3;border-radius:3px">'
//                str += '<tbody><tr>'
//                str += '<td height="20"></td>'
//                str += '</tr>'
//                str += '<tr>'
//                str += '</tr>'
//                str += '<tr>'
//                str += '<td align="center" style="font-size:25px;color:#333333;padding:10px 20px 0px;font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif">New Message</td>'
//                str += '</tr>'
//                str += '<tr>'
//                str += '<td height="10"></td>'
//                str += '</tr>'
//                str += '<tr>'
//                str += '<td align="center"><table width="140" align="center" border="0" cellpadding="0" cellspacing="0" bgcolor="#008BCF">'
//                str += '<tbody>'
//                str += '<tr>'
//                str += '<td height="2" style="font-size:1px;line-height:1px"></td>'
//                str += '</tr>'
//                str += '</tbody>'
//                str += '</table></td>'
//                str += '</tr>'
//                str += '<tr>'
//                str += '<td height="35"></td>'
//                str += '</tr>'
//                str += '<tr>'
//                str += '<td><table width="100%" align="center" cellspacing="0" cellpadding="0" border="0" style="padding:0px 20px;text-align:left">'
//                str += '<tbody><tr>'
//                str += '<td style="font-size:20px;padding:0px 30px;color:#444444;font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif">Dear ' + user_first_name + ',</td>'
//                str += '</tr>'
//                str += '<tr>'
//                str += '<td height="10"></td>'
//                str += '</tr>'
//                str += '<tr>'
//                str += '<td style="font-size:12px;padding:0px 30px;color:#444444;line-height:19px;font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif">You have received a new message from "' + sender_name + '"</td>'
//                str += '</tr>'
//                str += '<tr>'
//                str += '<td style="font-size:12px;padding:0px 30px;color:#444444;line-height:19px;font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif"><strong>Email: </strong>' + sender_email + '</td>'
//                str += '</tr>'
//                str += '<tr>'
//                str += '<td style="font-size:12px;padding:0px 30px;color:#444444;line-height:19px;font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif"><strong>Mobile: </strong>' + sender_phone + '</td>'
//                str += '</tr>'
//                str += '<tr>'
//                str += '<td style="font-size:12px;padding:0px 30px;color:#444444;line-height:19px;font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif"><strong>Message: </strong>' + message + '</td>'
//                str += '</tr>'
//                str += '<tr>'
//                str += '<td height="20"></td>'
//                str += '</tr>'
//                str += '<tr>'
//                str += '<td align="center">'
//                str += '<table width="185" cellpadding="0" cellspacing="0" border="0">'
//                str += '<tbody><tr>'
//                str += '</tr>'
//                str += '</tbody></table>'
//                str += '</td>'
//                str += '</tr>'
//                str += '<tr>'
//                str += '<td height="30"></td>'
//                str += '</tr>'
//                str += '</tbody></table></td>'
//                str += '</tr>'
//                str += '<tr>'
//                str += '<td height="40"></td>'
//                str += '</tr>'
//                str += '<tr>'
//                str += '<td style="font-size:12px;padding:0px 30px;font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif;color:#444444;line-height:normal;padding:0px 20px;text-align:left"> Thank you,<br>'
//                str += '<strong style="font-size:12px;font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif;color:#444444;line-height:normal">Team EPardesh </strong></td>'
//                str += '</tr>'
//                str += '<tr>'
//                str += '<td height="20"></td>'
//                str += '</tr>'
//                str += '</tbody></table></td>'
//                str += '</tr>'
//                str += '<tr>'
//                str += '<td height="10"></td>'
//                str += '</tr>'
//                str += '<tr>'
//                str += '<td align="center" style="color:#444444;font-size:12px;font-family:"Open Sans",Gill Sans,Arial,Helvetica,sans-serif"><span style="color:#444444;font-size:12px;font-family:"Open Sans",Gill Sans,Arial,Helvetica,sans-serif">|</span><span style="color:#444444;font-size:12px;font-family:"Open Sans",Gill Sans,Arial,Helvetica,sans-serif">|</span></td>'
//                str += '</tr>'
//                str += '<tr>'
//                str += '<td height="20"></td>'
//                str += '</tr>'
//                str += '<tr>'
//                str += '<td align="center"><table cellpadding="0" cellspacing="0" align="center" border="0">'
//                str += '<tbody><tr>'
//                str += '<td width="8"></td>'
//                str += '<td width="8"></td>'
//                str += '</tr>'
//                str += '</tbody></table></td>'
//                str += '</tr>'
//                str += '<tr>'
//                str += '<td height="20"></td>'
//                str += '</tr>'
//                str += '<tr>'
//                str += '<td align="center"><table cellpadding="0" cellspacing="0" align="center" border="0">'
//                str += '<tbody><tr>'
//                str += '<td width="6"></td>'
//                str += '<td width="6"></td>'
//                str += '<td width="6"></td>'
//                str += '<td width="6"></td>'
//                str += '</tr>'
//                str += '</tbody></table></td>'
//                str += '</tr>'
//                str += '<tr>'
//                str += '<td height="9"></td>'
//                str += '</tr>'
//                str += '<tr>'
//                str += '<td align="center" style="font-size:11px;font-family:"Open Sans",Gill Sans,Arial,Helvetica,sans-serif;color:#444444"><p style="margin:0;padding:3px 0 0px;font-size:11px;font-family:"Open Sans",Gill Sans,Arial,Helvetica,sans-serif;line-height:13px">You are receiving this mail from EPardesh Team.</p>'
//                str += '<p style="margin:0;padding:3px 0;font-size:11px;font-family:"Open Sans",Gill Sans,Arial,Helvetica,sans-serif;line-height:13px">For any assistance, visit the below website <a href=' + matrimony_url + ' style="font-size:11px;font-family:"Open Sans",Gill Sans,Arial,Helvetica,sans-serif;color:#007ebc;text-decoration:none" target="_blank" data-saferedirecturl=' + matrimony_url + '></a><a href=' + matrimony_url + ' style="font-size:11px;font-family:"Open Sans",Gill Sans,Arial,Helvetica,sans-serif;color:#008bcf;text-decoration:none" target="_blank"></a></p></td>'
//                str += '</tr>'
//                str += '<tr>'
//                str += '<td align="center" style="font-size:11px;font-family:"Open Sans",Gill Sans,Arial,Helvetica,sans-serif;color:#008bcf;line-height:13px">© <a href=' + matrimony_url + ' target="_blank" data-saferedirecturl=' + matrimony_url + '>www.EPardesh.com</a></td>'
//                str += '</tr>'
//                str += '</tbody></table>'
//                str += '</div>'


                var str = '<div style="margin:0;padding:0;font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif">'
                str += '<table width="100%" cellpadding="0" cellspacing="0" border="0" align="center" style="font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif;max-width:600px;background-color:#ffffff;color:#666666;text-align:left;padding:0px 2% 10px 2%;background:url(http://teja1.kuikr.com/images/notification/mailer-bg.jpg) repeat #f9f9f9">'
                str += '<tbody><tr>'
                str += '<td height="20"></td>'
                str += '</tr>'
                str += '<tr>'
                str += '<td height="43" valign="top"><table width="100%" cellspacing="0" cellpadding="0" border="0" align="center" style="max-width:530px">'
                str += '<tbody><tr>'
//                str += '<td align="left" height="43"><a href="#m_8496668978295844378_m_8306747430853343728_m_8934663683847810844_"><img src="' + url + 'logo.jpg" alt="Epardesh" width="94" height="43" border="0" style="margin:0;display:block;font-family:Arial,Helvetica,sans-serif;color:#007ebe;font-size:20px;text-align:center;font-weight:bold" class="CToWUd"></a></td>'
               str += '<td align="left" height="43"><a href="#m_8496668978295844378_m_8306747430853343728_m_8934663683847810844_"><img src="' + url + 'logo.jpg" alt="Epardesh" width="180" border="0" style="width:220px;height:auto;margin:0;margin-left:-15px;margin-top:-20px;display:block;font-family:Arial,Helvetica,sans-serif;color:#007ebe;font-size:20px;text-align:center;font-weight:bold" class="CToWUd"></a></td>'

                str += '<div style="text-align:Right;margin-bottom:10px">'
                str += '<div style="padding:5px">'
                str += '<a style="font-family:Arial,Helvetica,sans-serif;display:inline-block;min-height:22px;line-height:42px;padding:0px 20px;color:rgb(255,255,255);font-size:14px;font-weight:bold;border-radius:3px;white-space:nowrap;text-decoration:none;text-align:center;background-color:rgb(66,127,237)" href="' + classified_url_email + '" target="_blank">Post free ad</a><br>'
                str += '</div>'
                str += '</div>'
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
                str += '<td align="center" style="font-size:25px;color:#333333;padding:10px 20px 0px;font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif">New Message</td>'
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
                str += '<tbody>'
                str += '<tr>'
                str += '<td style="font-size:20px;padding:0px 30px;color:#444444;font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif">Dear ' + user_first_name + ',</td>'
                str += '</tr>'
                str += '<tr>'
                str += '<td height="10"></td>'
                str += '</tr>'
                str += '<tr>'
                str += '<td style="font-size:12px;padding:0px 30px;color:#444444;line-height:19px;font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif">You received a new message from a visitor for your Ad <a href="'+classified_url+'setting">'+ ad_id +'</a></td>'
                str += '</tr>'
                str += '<tr>'
                str += '<td style="font-size:12px;padding:0px 30px;color:#444444;line-height:19px;font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif"><strong>Email: </strong>' + sender_email + '</td>'
                str += '</tr>'
                str += '<tr>'
                str += '<td style="font-size:12px;padding:0px 30px;color:#444444;line-height:19px;font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif"><strong>Mobile: </strong>' + sender_phone + '</td>'
                str += '</tr>'
                str += '<tr>'
                str += '<td style="font-size:12px;padding:0px 30px;color:#444444;line-height:19px;font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif"><strong>Message: </strong>' + message + '</td>'
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
                str += '<tr>'
//                        str += '<td align="center" style="color:#444444;font-size:12px;font-family:"Open Sans",Gill Sans,Arial,Helvetica,sans-serif"><span style="color:#444444;font-size:12px;font-family:"Open Sans",Gill Sans,Arial,Helvetica,sans-serif">|</span><span style="color:#444444;font-size:12px;font-family:"Open Sans",Gill Sans,Arial,Helvetica,sans-serif">|</span></td>'
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
                str += '<td align="center" style="font-size:11px;font-family:"Open Sans",Gill Sans,Arial,Helvetica,sans-serif;color:#444444"><p style="margin:0;padding:3px 0 0px;font-size:11px;font-family:"Open Sans",Gill Sans,Arial,Helvetica,sans-serif;line-height:13px">To view/edit your account information anytime, login to <a href=' + matrimony_url + ' target="_blank" data-saferedirecturl=' + matrimony_url + '>"My Account"</a>@<a href=' + matrimony_url + ' target="_blank" data-saferedirecturl=' + matrimony_url + '>www.EPardesh.com</a>.</p>'
//                        str += '<td align="center" style="font-size:11px;font-family:"Open Sans",Gill Sans,Arial,Helvetica,sans-serif;color:#444444"><p style="margin:0;padding:3px 0 0px;font-size:11px;font-family:"Open Sans",Gill Sans,Arial,Helvetica,sans-serif;line-height:13px">You are receiving this mail from EPardesh Team.</p>'
//                        str += '<p style="margin:0;padding:3px 0;font-size:11px;font-family:"Open Sans",Gill Sans,Arial,Helvetica,sans-serif;line-height:13px">For any assistance, visit the below website <a href=' + matrimony_url + ' style="font-size:11px;font-family:"Open Sans",Gill Sans,Arial,Helvetica,sans-serif;color:#007ebc;text-decoration:none" target="_blank" data-saferedirecturl=' + matrimony_url + '></a><a href=' + matrimony_url + ' style="font-size:11px;font-family:"Open Sans",Gill Sans,Arial,Helvetica,sans-serif;color:#008bcf;text-decoration:none" target="_blank"></a></p></td>'
                str += '</tr>'
                str += '<tr>'
//                        str += '<td align="center" style="font-size:11px;font-family:"Open Sans",Gill Sans,Arial,Helvetica,sans-serif;color:#008bcf;line-height:13px">© <a href=' + matrimony_url + ' target="_blank" data-saferedirecturl=' + matrimony_url + '>www.EPardesh.com</a></td>'
                str += '</tr>'
                str += '</tbody></table>'
                str += '</div>'

                var mailOptions = {to: receiver_email, subject: "ePardesh :You Received a new message", html: str};
                transporter.sendMail(mailOptions, function (error, info) {
                    if (error) {
                        var msg = "some error occurred";
                        sendResponse.sendErrorMessage(msg, res);
                    } else {
                        console.log('Message sent: ');
                        var data = {}
                        sendResponse.sendSuccessData(info, res);
                    }
                });
            }
        }
    })





})

/*
 * --------------------------------------------------------------------------
 * to check email already exists or not
 * ---------------------------------------------------------------------------
 */
function check_email_availability(res, email, callback) {
    var sql = "SELECT `email` FROM `user` WHERE `email`=? limit 1";
    var values = [email];
    connection.query(sql, values, function (err, userResponse) {
        if (userResponse.length) {
            var errorMsg = 'You are already registered with us, Please login to enjoy the services';
            sendResponse.sendErrorMessage(errorMsg, res);
        } else
        {
            callback();
        }
    });
}

/*
 * --------------------------------------------------------------------------
 * to check user already exists or not
 * ---------------------------------------------------------------------------
 */
function user_registered_check(res, email, callback) {
    var sql = "SELECT * FROM `user` WHERE `email`=? limit 1";
    var values = [email];
    connection.query(sql, values, function (err, userResponse) {
        if (userResponse.length) {
            callback();
        } else
        {
            var errorMsg = 'User is not registered with us.Please register first to enjoy the services';
            sendResponse.sendErrorMessage(errorMsg, res);
        }
    });
}

/*
 * ----------------------------------------------------------------------------------------------------------------------------------------
 * check User Is Valid or Not
 * INPUT : access_token
 * ----------------------------------------------------------------------------------------------------------------------------------------
 */
function checkUser(res, access_token, callback) {
    var sql = "SELECT * FROM `user` WHERE `access_token`=? limit 1";
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
