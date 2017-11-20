var express = require('express');
var router = express.Router();
var async = require('async');
//var md5 = require('md5');
//var request = require('request');
var func = require('../../commonfunction');
var sendResponse = require('../../sendresponse');


/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

/*
 * --------------------------------------------------------------------------
 * contact_us
 * INPUT : full_name, email, subject, email
 * ---------------------------------------------------------------------------
 */
router.post('/contact_us', function (req, res, next) {
    var name = req.body.name;
    var email = req.body.email;
    var phone = req.body.phone;
    var message = req.body.message;
    var query_for = req.body.query_for;
    var query_type = req.body.query_type
    var manValues = [name, email, phone, message];
    console.log(manValues)
    async.waterfall([
        function (callback) {
            func.checkBlank(res, manValues, callback);
        }
    ], function () {
//        var str = "<p>Hi Admin,</p>";
//        str += "<p>You have received a new message from your website(EPardesh), please see the details of customer below:</p>";
//        str += "<p><strong>Email: </strong>" + email + "</p>";
//        str += "<p><strong>Name: </strong>" + name + "</p>";
//        str += "<p><strong>Phone: </strong>" + phone + "</p>";
//        str += "<p><strong>Message: </strong>" + message + "</p><br>";
//        str += "<p>Regards,</p>";
//        str += "<p>" + name + "</p>";

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
        str += '<td align="center" style="font-size:25px;color:#333333;padding:10px 20px 0px;font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif">Contact Us</td>'
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
        str += '<td style="font-size:20px;padding:0px 30px;color:#444444;font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif">Dear Admin,</td>'
        str += '</tr>'
        str += '<tr>'
        str += '<td height="10"></td>'
        str += '</tr>'
        str += '<tr>'
        str += '<td style="font-size:12px;padding:0px 30px;color:#444444;line-height:19px;font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif">You have received a new message from your website(EPardesh), please see the details of customer below: </td>'
        str += '</tr>'
        str += '<tr>'
        str += '<td style="font-size:12px;padding:0px 30px;color:#444444;line-height:19px;font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif"><strong>Query for : </strong>' + query_for + '</td>'
        str += '</tr>'
        str += '<tr>'
        str += '<td style="font-size:12px;padding:0px 30px;color:#444444;line-height:19px;font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif"><strong>Query type : </strong>' + query_type + '</td>'
        str += '</tr>'
        str += '<tr>'
        str += '<td style="font-size:12px;padding:0px 30px;color:#444444;line-height:19px;font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif"><strong>Email : </strong>' + email + '</td>'
        str += '</tr>'
        str += '<tr>'
        str += '<td style="font-size:12px;padding:0px 30px;color:#444444;line-height:19px;font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif"><strong>Name : </strong>' + name + '</td>'
        str += '</tr>'
        str += '<tr>'
        str += '<td style="font-size:12px;padding:0px 30px;color:#444444;line-height:19px;font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif"><strong>Phone : </strong>' + phone + '</td>'
        str += '</tr>'
        str += '<tr>'
        str += '<td style="font-size:12px;padding:0px 30px;color:#444444;line-height:19px;font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif"><strong>Message : </strong>' + message + '</td>'
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
        var mailOptions = {to: 'contact@epardesh.com', subject: "Contact Us", html: str};
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                var msg = "some error occurred";
                sendResponse.sendErrorMessage(msg, res);
            } else {
                console.log('Message sent: ');
            }
        });
        var data = {}
        sendResponse.sendSuccessData(data, res);
    })
});

/*
 * --------------------------------------------------------------------------
 * contact_business_owner
 * INPUT : name, email, phone, id
 * ---------------------------------------------------------------------------
 */
router.post('/contact_business_owner', function (req, res, next) {
    var name = req.body.name;
    var email = req.body.email;
    var phone = req.body.phone;
    var business_id = req.body.business_id;
    var ad_id = req.body.ad_id;
    var manValues = [name, email, phone, business_id, ad_id];
    console.log(manValues)
    async.waterfall([
        function (callback) {
            func.checkBlank(res, manValues, callback);
        }
    ], function () {
        var get_email = "SELECT * FROM user where id=?";
        var values = [business_id]
        connection.query(get_email, values, function (err, rows) {
            if (err)
            {
                var errorMsg = 'some error occurred';
                sendResponse.sendErrorMessage(errorMsg, res);
            } else {
                if (rows.length > '0' || rows.length > 0) {
                    var business_email = rows[0].email;
                    
                    var business_owner_first_name = rows[0].first_name;

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
                    str += '</tr>'
                    str += '<tr>'
                    str += '<td align="center" style="font-size:25px;color:#333333;padding:10px 20px 0px;font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif">New Contact Message</td>'
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
                    str += '<tr style="text-align:center;">'
                    str += '<td style="font-size:20px;padding:0px 30px;color:#444444;font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif">For your Ad: <a href="'+classified_url+'setting">' + ad_id + '</a></td>';
                    str += '</tr>'
                    str += '<tr>'
                    str += '<td height="20"></td>'
                    str += '</tr>'
                    str += '<tr>'
                    str += '<td style="font-size:20px;padding:0px 30px;color:#444444;font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif">Dear ' + business_owner_first_name + ',</td>'
                    str += '</tr>'
                    str += '<tr>'
                    str += '<td height="10"></td>'
                    str += '</tr>'
                    str += '<tr>'
                    str += '<td style="font-size:12px;padding:0px 30px;color:#444444;line-height:19px;font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif">A customer wants to connect with you, please see the details of customer below:</td>'
                    str += '</tr>'
                    str += '<tr>'
                    str += '<td style="font-size:12px;padding:0px 30px;color:#444444;line-height:19px;font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif"><strong>Email: </strong>' + email + '</td>'
                    str += '</tr>'
                    str += '<tr>'
                    str += '<td style="font-size:12px;padding:0px 30px;color:#444444;line-height:19px;font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif"><strong>Name: </strong>' + name + '</td>'
                    str += '</tr>'
                    str += '<tr>'
                    str += '<td style="font-size:12px;padding:0px 30px;color:#444444;line-height:19px;font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif"><strong>Phone: </strong>' + phone + '</td>'
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

                    var mailOptions = {to: business_email, subject: "ePardesh: New contact for your AD " + ad_id, html: str};
                    transporter.sendMail(mailOptions, function (error, info) {
                        if (error) {
                            var msg = "some error occurred";
                            sendResponse.sendErrorMessage(msg, res);
                        } else {
                            console.log('Message sent: ');
                        }
                    });
                    var data = {}
                    sendResponse.sendSuccessData(data, res);
                } else {
                    var msg = "invalid business id";
                    sendResponse.sendErrorMessage(msg, res);
                }
            }
        });
    })
});



module.exports = router;
