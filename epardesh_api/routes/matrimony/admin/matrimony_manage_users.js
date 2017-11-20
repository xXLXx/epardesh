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
 * matrimony_manage_users
 * --------------------------------------------------------------------------
 */
router.post('/matrimony_manage_users', function (req, res, next) {

    var get_free_users_count = "SELECT COUNT(*) as free_count FROM matrimony_user where membership_plan=1 or membership_plan=2 or membership_plan=3;";
    connection.query(get_free_users_count, function (err, free_count) {
        if (err) {
            console.log(err)
            var errorMsg = 'some error occurred';
            sendResponse.sendErrorMessage(errorMsg, res);
        } else {

            var get_gold_users_count = "SELECT COUNT(*) as gold_count FROM matrimony_user where membership_plan=4 or membership_plan=5 or membership_plan=6;";
            connection.query(get_gold_users_count, function (err, gold_count) {
                if (err) {
                    console.log(err)
                    var errorMsg = 'some error occurred';
                    sendResponse.sendErrorMessage(errorMsg, res);
                } else {

                    var get_platinum_users_count = "SELECT COUNT(*) as platinum_count FROM matrimony_user where membership_plan=7 or membership_plan=8 or membership_plan=9;";
                    connection.query(get_platinum_users_count, function (err, platinum_count) {
                        if (err) {
                            console.log(err)
                            var errorMsg = 'some error occurred';
                            sendResponse.sendErrorMessage(errorMsg, res);
                        } else {

                            var get_users = "SELECT * FROM matrimony_user;";
                            connection.query(get_users, function (err, rows) {
                                if (err) {
                                    console.log(err)
                                    var errorMsg = 'some error occurred';
                                    sendResponse.sendErrorMessage(errorMsg, res);
                                } else {
                                    var data = {
                                        free_users_count: free_count[0].free_count,
                                        gold_users_count: gold_count[0].gold_count,
                                        platinum_users_count: platinum_count[0].platinum_count,
                                        matrimony_users: rows
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
})


/*
 * --------------------------------------------------------------------------
 * view_details
 * --------------------------------------------------------------------------
 */
router.post('/view_details', function (req, res, next) {
    var user_id = req.body.user_id;

    var get_user_details = "select * from matrimony_user where id=?";
    var values = [user_id];
    connection.query(get_user_details, values, function (err, rows) {
        if (err) {
            console.log(err)
            var errorMsg = 'some error occurred';
            sendResponse.sendErrorMessage(errorMsg, res);
        } else {
            if (rows.length > 0 || rows.length > '0') {
                sendResponse.sendSuccessData(rows, res);
            } else {
                var errorMsg = 'invalid id';
                sendResponse.sendErrorMessage(errorMsg, res);
            }

        }
    });
})

/*
 * --------------------------------------------------------------------------
 * matrimony_admin_blck_user
 * --------------------------------------------------------------------------
 */
router.post('/matrimony_admin_blck_user', function (req, res, next) {
    var user_id = req.body.user_id;
    var status = req.body.status;
    var check_user = "select * from matrimony_user WHERE id=?;";
    var user_values = [user_id]
    connection.query(check_user, user_values, function (err, user) {
        if (err) {
            console.log(err)
            var errorMsg = 'some error occurred';
            sendResponse.sendErrorMessage(errorMsg, res);
        } else {
            if (user.length > 0) {
                if (status == 1) {
                    var sql = "update matrimony_user set block_status=1 where id=?";
                    var values = [user_id]
                    connection.query(sql, values, function (err, rows) {
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
                    var sql = "update matrimony_user set block_status=0 where id=?";
                    var values = [user_id]
                    connection.query(sql, values, function (err, rows) {
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
            } else {
                var errorMsg = 'user does not exist';
                sendResponse.sendErrorMessage(errorMsg, res);
            }
        }
    })

})

/*
 * --------------------------------------------------------------------------
 * update_matrimony_badwords
 * ---------------------------------------------------------------------------
 */
router.post('/update_matrimony_badwords', function (req, res, next) {
    var badwords = req.body.badwords_string;
    var manValues = [badwords]
    async.waterfall([
        function (callback) {
            func.checkBlank(res, manValues, callback);
        }],
            function (err, updatePopup, critical) {
                var sql = "update matrimony_badwords set badwords = ? where id = '1'";
                var values = [badwords]
                console.log(values)
                connection.query(sql, values, function (err, rows) {
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
 * view_matrimony_badwords
 * ---------------------------------------------------------------------------
 */
router.post('/view_matrimony_badwords', function (req, res, next) {
    var sql = "select * from matrimony_badwords where id = '1'";
    connection.query(sql, function (err, rows) {
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
 * filter_matrimony_user
 * ---------------------------------------------------------------------------
 */
router.post('/filter_matrimony_user', function (req, res, next) {
    var activate_status = req.body.activate_status;
    var plan_type = req.body.plan_type;
    var days_to_expire = req.body.days_to_expire;
    var today_date = new Date;
    var formatted_today_date = date.format(today_date, 'YYYY-MM-DD')

    if (activate_status == '') {
        var activate_string = "email_verified_status like'%'";
    } else if (activate_status == 0) {
        var activate_string = "email_verified_status=0";
    } else if (activate_status == 1) {
        var activate_string = "email_verified_status=1";
    }

    if (plan_type == '') {
        var plan_string = "membership_plan like '%'";
    } else if (plan_type == 'free') {
        var plan_string = "membership_plan in ('1','2','3')"
    } else if (plan_type == 'gold') {
        var plan_string = "membership_plan in ('4','5','6')"
    } else if (plan_type == 'premium') {
        var plan_string = "membership_plan in ('7','8','9')"
    }

    if (days_to_expire == '') {
        var day_string = "(plan_expiration_date like '%' or plan_expiration_date is null)"
    } else if (days_to_expire == 7) {
        var expiry_date = date.addDays(today_date, 7);
        var formatted_expiry_date = date.format(expiry_date, 'YYYY-MM-DD')
        var day_string = "(plan_expiration_date between '" + formatted_today_date + "' and '" + formatted_expiry_date + "')"
    } else if (days_to_expire == 15) {
        var expiry_date = date.addDays(today_date, 15);
        formatted_expiry_date = date.format(expiry_date, 'YYYY-MM-DD')
        var day_string = "(plan_expiration_date between '" + formatted_today_date + "' and '" + formatted_expiry_date + "')"
    }
    var sql = "select * from matrimony_user where " + activate_string + " and " + plan_string + " and " + day_string + " ";
    console.log(sql)
    connection.query(sql, function (err, rows) {
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
 * delete_matrimony_user
 * ---------------------------------------------------------------------------
 */
router.post('/delete_matrimony_user', function (req, res, next) {
    var user_email = req.body.user_email;
    var user_first_name = req.body.user_first_name;
    var user_last_name = req.body.user_last_name;
    var check_user = "select * from matrimony_user where email = '" + user_email + "'";
    console.log(check_user)
    connection.query(check_user, function (err, rows) {
        if (err) {
            console.log(err)
            var errorMsg = 'some error occurred';
            sendResponse.sendErrorMessage(errorMsg, res);
        } else {
            if (rows.length > 0) {
                var delete_query = "delete from matrimony_user where email= '" + user_email + "'";
                console.log(delete_query)
                connection.query(delete_query, function (err, rows) {
                    if (err) {
                        console.log(err)
                        var errorMsg = 'some error occurred';
                        sendResponse.sendErrorMessage(errorMsg, res);
                    } else {

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
                        str += '<td align="center" style="font-size:25px;color:#333333;padding:10px 20px 0px;font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif">Profile Deleted</td>'
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
                        str += '<td style="font-size:20px;color:#444444;padding:0px 30px;font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif">Dear ' + user_first_name + ' ' + user_last_name + ',</td>'
                        str += '</tr>'
                        str += '<tr>'
                        str += '<td height="10"></td>'
                        str += '</tr>'
                        str += '<tr>'
                        str += '<td style="font-size:12px;color:#444444;padding:0px 30px;line-height:19px;font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif">Your profile has been deleted from epardesh. For any further queries contact EPardesh admin.</td>'
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
//                        str += '<tr>'
//                        str += '<td align="center" style="color:#444444;font-size:12px;font-family:"Open Sans",Gill Sans,Arial,Helvetica,sans-serif"><span style="color:#444444;font-size:12px;font-family:"Open Sans",Gill Sans,Arial,Helvetica,sans-serif">|</span><span style="color:#444444;font-size:12px;font-family:"Open Sans",Gill Sans,Arial,Helvetica,sans-serif">|</span></td>'
//                        str += '</tr>'
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

                        var mailOptions = {to: user_email, subject: 'ePardesh: Profile deleted', html: str};
                        transporter.sendMail(mailOptions, function (error, info) {
                            if (error) {
                                console.log("Error Found:");
                                console.log(error);
                                var errorMsg = 'some error occurred';
                                //sendResponse.sendErrorMessage(errorMsg, res);
                            } else {
                                console.log('Message sent: ');
                                var msg = {};
                                sendResponse.sendSuccessData(msg, res);
                            }
                        })
                    }
                })
            } else {
                var errorMsg = 'user does not exist';
                sendResponse.sendErrorMessage(errorMsg, res);
            }
        }
    })
});




module.exports = router;