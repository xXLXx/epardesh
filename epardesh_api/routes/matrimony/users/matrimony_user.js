var express = require('express');
var router = express.Router();
var async = require('async');
var md5 = require('md5');
var request = require('request');
var func = require('../../commonfunction');
var sendResponse = require('../../sendresponse');
var date = require('date-and-time');
//var admin_email = 'newprofile@epardesh.com';
var admin_email = 'newprofiles@epardesh.com';

/*
 * --------------------------------------------------------------------------
 * register_matrimony_user
 * INPUT : first_name,last_name,email, password
 * ---------------------------------------------------------------------------
 */
router.post('/register_matrimony_user', function (req, res, next) {
    var first_name = req.body.first_name;
    var last_name = req.body.last_name;
    var email = req.body.email;
    var password = req.body.password;
    var mobile = req.body.mobile;
    var alternate_mobile = req.body.alternate_mobile;
    var state = req.body.state;
    var city = req.body.city;
    var address = req.body.address;
    var country_name = req.body.country;
    if (country_name == 'INDIA' || country_name == 'India' || country_name == 'india') {
        var country = 'India';
    } else {
        var country = 'USA';
    }
    var gender = req.body.gender;
    var plan = req.body.plan;
    var txn_id = req.body.txn_id;
    var current_date = new Date;
    if (plan == '4' || plan == 4 || plan == '7' || plan == 7 || plan == '1' || plan == 1) {
        var expiry_date = date.addDays(current_date, 30);
    } else if (plan == '5' || plan == 5 || plan == '8' || plan == 8 || plan == '2' || plan == 2) {
        var expiry_date = date.addDays(current_date, 90);
    } else if (plan == '6' || plan == 6 || plan == '9' || plan == 9 || plan == '3' || plan == 3) {
        var expiry_date = date.addDays(current_date, 180);
    }

    console.log('expiry_date')
    console.log(expiry_date)

    var random = getRandom(1000, 9999)
    var random_string = random.toString();
    var otp = random_string.substring(0, 4);
    var manValues = [first_name, last_name, email, password, city, state, mobile, country, gender, plan]
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
                var sql = "INSERT INTO `matrimony_user`(`first_name`,`last_name`,`email`,`password`,`mobile`,`alternate_mobile`,`city`,`state`,`country`,`access_token`,`gender`,`membership_plan`,`transaction_id`,`email_verification_code`,`plan_expiration_date`,`address`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
                var values = [first_name, last_name, email, encrypt_password, mobile, alternate_mobile, city, state, country, access_token, gender, plan, txn_id, otp, expiry_date,address];
                connection.query(sql, values, function (err, userInsertResult) {
                    if (err)
                    {
                        console.log('err1')
                        console.log(err)
                        var errorMsg = 'some error occurred';
                        sendResponse.sendErrorMessage(errorMsg, res);
                    } else {
                        console.log('no err')
                        var sql = "SELECT * FROM matrimony_user ORDER BY id DESC LIMIT 1";
                        connection.query(sql, function (err, rows) {
                            if (err)
                            {
                                var errorMsg = 'some error occurred';
                                sendResponse.sendErrorMessage(errorMsg, res);
                            } else {
                                var id = rows[0].id;
                                var id_string = String(id);
                                var no_of_char = id_string.length;
                                var profile_id_str = 'EP'
                                for (var i = 0; i < 7 - no_of_char; i++) {
                                    profile_id_str = profile_id_str + '0';
                                }
                                var profile_id = profile_id_str + id;
                                var set_profile_id = "update matrimony_user set profile_id=? where id=?";
                                var profile_values = [profile_id, id]
                                connection.query(set_profile_id, profile_values, function (err, result) {
                                    if (err)
                                    {
                                        var errorMsg = 'some error occurred';
                                        sendResponse.sendErrorMessage(errorMsg, res);
                                    } else {
                                        var set_matrimony_partner_preferences = "INSERT INTO `matrimony_partner_preferences`(`user_id`) VALUES (?)";
                                        var partner_values = [id]
                                        connection.query(set_matrimony_partner_preferences, partner_values, function (err, result1) {
                                            if (err)
                                            {
                                                var errorMsg = 'some error occurred';
                                                sendResponse.sendErrorMessage(errorMsg, res);
                                            } else {
//                                                var str = "<h2>Welcome To EPardesh,</h2>";
//                                                str += "<p>Congratulations, <br><br>" + first_name + " " + last_name + " You have been successfully registered with EPardesh. </p>";
//                                                str += "<p> profile_id : " + profile_id + ".</p>"
//                                                str += "<p> Please click on the below link to enjoy our services.</p>"
//                                                str += "<a href=" + matrimony_url + "verify/" + id + "/" + otp + "  >Click Here</a>";
//                                                str += "<p>Regards,</p>";
//                                                str += "<p>Team EPardesh</p>"







                                                var str = '<div style="margin:0;padding:0;font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif">'
                                                str += '<table width="100%" cellpadding="0" cellspacing="0" border="0" align="center" style="font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif;max-width:600px;background-color:#ffffff;color:#666666;text-align:left;padding:0px 2% 10px 2%;background:url(http://teja1.kuikr.com/images/notification/mailer-bg.jpg) repeat #f9f9f9">'
                                                str += '<tbody><tr>'
                                                str += '<td height="20"></td>'
                                                str += '</tr>'
                                                str += '<tr>'
                                                str += '<td height="43" valign="top"><table width="100%" cellspacing="0" cellpadding="0" border="0" align="center" style="max-width:530px">'
                                                str += '<tbody><tr>'
                                                str += '<td align="left" height="43"><a href="#m_8496668978295844378_m_8306747430853343728_m_8934663683847810844_"><img src="' + url + 'e-pardesh.png" alt="Epardesh" width="94" height="43" border="0" style="margin:0;display:block;font-family:Arial,Helvetica,sans-serif;color:#007ebe;font-size:20px;text-align:center;font-weight:bold" class="CToWUd"></a></td>'
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
                                                str += '<td align="center"><img src="https://ci3.googleusercontent.com/proxy/tVvN5RW66MgOQ1x6Q-O75sxBy8ExbyBBD7VbbSZqkZ4AtjlqtlEO31-s6u0Fa8KXkyNHCgSn1QUiuNbZkUgrgE71IhhAm5qz3lvZJ20ZxTw=s0-d-e1-ft#http://teja1.kuikr.com/images/notification/VerifyEmail.png" width="73" height="73" border="0" alt="Verify your email address" style="margin:0;display:block" class="CToWUd"></td>'
                                                str += '</tr>'
                                                str += '<tr>'
                                                str += '<td align="center" style="font-size:25px;color:#333333;padding:10px 20px 0px;font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif">Verify your email address</td>'
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
                                                str += '<td style="font-size:20px;padding:0px 30px;color:#444444;font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif">Dear User,</td>'
                                                str += '</tr>'
                                                str += '<tr>'
                                                str += '<td height="10"></td>'
                                                str += '</tr>'
                                                str += '<tr>'
                                                str += '<td style="font-size:12px;padding:0px 30px;color:#444444;line-height:19px;font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif">Just click the button below (it only takes a couple of seconds). You won’t be asked to log in as its simply a verification of the ownership of this email address. </td>'
                                                str += '</tr>'
                                                str += '<tr>'
                                                str += '<td height="20"></td>'
                                                str += '</tr>'
                                                str += '<tr>'
                                                str += '<td align="center">'
                                                str += '<table width="185" cellpadding="0" cellspacing="0" border="0">'
                                                str += '<tbody><tr>'
                                                str += '<td align="center" bgcolor="#008BCF" height="45" style="border-radius:3px">'
                                                str += '<a href=' + matrimony_url + 'verify/' + id + '/' + otp + ' style="display:block;color:#ffffff;text-decoration:none;font-size:14px;text-align:center;font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif;font-weight:bold;line-height:45px" target="_blank" data-saferedirecturl="">Verify Email</a>'
                                                str += '</td>'
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
                                                str += '<td style="padding:0px 20px">'
                                                str += '<table border="0" cellspacing="0" cellpadding="0" width="100%" style="padding:0 20px" bgcolor="#f9f9f9">'
                                                str += '<tbody>'
                                                str += '<tr>'
                                                str += '<td height="15"></td>'
                                                str += '</tr>'
                                                str += '<tr>'
                                                str += '<td style="font-weight:bold;color:#999999;font-size:24px;font-family:"Open Sans",Gill Sans,Arial,Helvetica,sans-serif;text-align:left">BENEFITS</td>'
                                                str += '</tr>'
                                                str += '<tr>'
                                                str += '<td height="15"></td>'
                                                str += '</tr>'
                                                str += '</tbody>'
                                                str += '</table>'
                                                str += '<table border="0" cellspacing="0" cellpadding="0" width="100%" bgcolor="#f2f2f2" style="padding:0px 20px">'
                                                str += '<tbody>'
                                                str += '<tr>'
                                                str += '<td height="25"></td>'
                                                str += '<td></td>'
                                                str += '<td></td>'
                                                str += '</tr>'
                                                str += '<tr>'
                                                str += '<td width="10%"><table width="100%" cellpadding="0" cellspacing="0" border="0">'
                                                str += '<tbody>'
                                                str += '<tr>'
                                                str += '<td width="41" align="center" style="padding-top:5px"><img src="https://ci6.googleusercontent.com/proxy/AuD0W4QYf9T9n4GmcjdohHleaEeeYXLxuhMx3plVTm7cf0BLa4r-NNDC1o8RQFCG2TbL5mcYK5HzwustZTLm-eiuyVRJao-e1bDXHQAI=s0-d-e1-ft#http://teja1.kuikr.com/images/notification/disc_bull.png" alt="" width="16" height="16" style="display:block" class="CToWUd"></td>'
                                                str += '</tr>'
                                                str += '<tr>'
                                                str += '<td width="41" height="59"><table width="2" cellpadding="0" cellspacing="0" border="0" align="center">'
                                                str += '<tbody>'
                                                str += '<tr>'
                                                str += '<td width="2" height="59" style="background-color:#999999"></td>'
                                                str += '</tr>'
                                                str += '</tbody>'
                                                str += '</table></td>'
                                                str += '</tr>'
                                                str += '</tbody>'
                                                str += '</table></td>'
                                                str += '<td width="3%"></td>'
                                                str += '<td width="85%" style="color:#1688c8;font-size:12px;font-family:"Open Sans",Gill Sans,Arial,Helvetica,sans-serif;vertical-align:top"><p style="padding:0px 0 0 0;margin:0;color:#444444;font-weight:600;font-size:16px;font-family:"Open Sans",Gill Sans,Arial,Helvetica,sans-serif">WHY VERIFY?</p>'
                                                str += '<p style="padding:0;margin:0;color:#444444;font-size:12px;font-family:"Open Sans",Gill Sans,Arial,Helvetica,sans-serif">Verifying your email lets you see all your Ads, chat messages and own your account.</p></td>'
                                                str += '</tr>'
                                                str += '<tr>'
                                                str += '<td width="10%" valign="top">'
                                                str += '<table width="100%" cellpadding="0" cellspacing="0" border="0">'
                                                str += '<tbody>'
                                                str += '<tr>'
                                                str += '<td width="41" align="center" valign="top"><img src="https://ci6.googleusercontent.com/proxy/AuD0W4QYf9T9n4GmcjdohHleaEeeYXLxuhMx3plVTm7cf0BLa4r-NNDC1o8RQFCG2TbL5mcYK5HzwustZTLm-eiuyVRJao-e1bDXHQAI=s0-d-e1-ft#http://teja1.kuikr.com/images/notification/disc_bull.png" alt="" width="16" height="16" style="display:block" class="CToWUd"></td>'
                                                str += '</tr>'
                                                str += '</tbody>'
                                                str += '</table></td>'
                                                str += '<td width="3%"></td>'
                                                str += '<td width="85%" style="color:#1688c8;font-size:12px;font-family:"Open Sans",Gill Sans,Arial,Helvetica,sans-serif;vertical-align:top"><p style="padding:0px 0 0 0;margin:0;color:#444444;font-weight:600;font-size:16px;font-family:"Open Sans",Gill Sans,Arial,Helvetica,sans-serif">BUTTON NOT WORKING?</p>'
                                                str += '<p style="padding:0;margin:0;color:#444444;font-size:12px;font-family:"Open Sans",Gill Sans,Arial,Helvetica,sans-serif">If above button is not working then verify your email address by pasting the below link into your browser:</p>'
                                                str += '<p style="padding:0;margin:0;color:#444444;font-size:12px;font-family:"Open Sans",Gill Sans,Arial,Helvetica,sans-serif"><a href=' + matrimony_url + 'verify/' + id + '/' + otp + ' style="text-decoration:none;color:#008bcf;display:block;word-break:break-all" target="_blank" data-saferedirecturl=' + matrimony_url + 'verify/' + id + '/' + otp + '>' + matrimony_url + 'verify/' + id + '/' + otp + '</a></p>'
                                                str += '</td>'
                                                str += '</tr>'
                                                str += '<tr>'
                                                str += '<td height="25"></td>'
                                                str += '<td></td>'
                                                str += '<td></td>'
                                                str += '</tr>'
                                                str += '</tbody>'
                                                str += '</table></td>'
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
//str += '<td width="91"><a href="https://play.google.com/store/apps/details?id=com.quikr&amp;referrer=af_tranid%3D3S99EN98WQXX6ZR3%26pid%3Dmailer" target="_blank" data-saferedirecturl="https://www.google.com/url?hl=en&amp;q=https://play.google.com/store/apps/details?id%3Dcom.quikr%26referrer%3Daf_tranid%253D3S99EN98WQXX6ZR3%2526pid%253Dmailer&amp;source=gmail&amp;ust=1475126531256000&amp;usg=AFQjCNH-eaiOtRaM4HZSx7JGGsQorMAMxg"><img src="https://ci6.googleusercontent.com/proxy/-Hu0b51rgxf_9dKZHystMtJW_jcDM3Qh7Aa8NLfWDC6YdOECUtM0a7x5_guWoleeOa0aj7DGDkli6mEtM631nXNDN6y1MjvOi4T37d2fHwTw=s0-d-e1-ft#http://teja1.kuikr.com/images/notification/android-icon.gif" width="91" height="31" alt="Android Play Store" border="0" class="CToWUd"></a></td>'
                                                str += '<td width="8"></td>'
//str += '<td width="91"><a href="https://itunes.apple.com/in/app/quikr-free-local-classifieds/id632051273?mt=8" target="_blank" data-saferedirecturl="https://www.google.com/url?hl=en&amp;q=https://itunes.apple.com/in/app/quikr-free-local-classifieds/id632051273?mt%3D8&amp;source=gmail&amp;ust=1475126531256000&amp;usg=AFQjCNGr4EtNQ0-mH3l80fh4yJYDbY453A"><img src="https://ci3.googleusercontent.com/proxy/Ffx1VpKrrEVkCZY4Ayd1paTDC-B_dEleDVPlMkfA6F3P3P2o6Jty0rxdTVF5NJXDG0BMeU7s9qd-UkHuIRch_aN45ISy16rA4jSWqkTJ3A=s0-d-e1-ft#http://teja1.kuikr.com/images/notification/apple-icon.gif" width="91" height="31" alt="Apple Play Store" border="0" class="CToWUd"></a></td>'
                                                str += '<td width="8"></td>'
//str += '<td width="91"><a href="http://www.windowsphone.com/en-us/store/app/quikr-buy-sell/6d36aa77-19a0-4adc-af15-0496dcc05557" target="_blank" data-saferedirecturl="https://www.google.com/url?hl=en&amp;q=http://www.windowsphone.com/en-us/store/app/quikr-buy-sell/6d36aa77-19a0-4adc-af15-0496dcc05557&amp;source=gmail&amp;ust=1475126531256000&amp;usg=AFQjCNFvUFIldfK_iFVdmShr1jLveqtZaA"><img src="https://ci5.googleusercontent.com/proxy/C0G_ipqnQAntQtrgN4v5sIfanWkZqo-sCF9VFb_bzDM2MK_f72G-K0NNFpeEBH60Aut7dlF9SuV0B8xBL3AyVl_j6uTBCojeMMfeBjQ93SPr=s0-d-e1-ft#http://teja1.kuikr.com/images/notification/windows-icon.gif" width="91" height="31" alt="Window Store" border="0" class="CToWUd"></a></td>'
                                                str += '</tr>'
                                                str += '</tbody></table></td>'
                                                str += '</tr>'
                                                str += '<tr>'
                                                str += '<td height="20"></td>'
                                                str += '</tr>'
                                                str += '<tr>'
                                                str += '<td align="center"><table cellpadding="0" cellspacing="0" align="center" border="0">'
                                                str += '<tbody><tr>'
//str += '<td width="27"><a href="https://www.facebook.com/QuikrFans" target="_blank" data-saferedirecturl="https://www.google.com/url?hl=en&amp;q=https://www.facebook.com/QuikrFans&amp;source=gmail&amp;ust=1475126531256000&amp;usg=AFQjCNEwd980Vr7okmi8Q_Sds7fP2asBaA"> <img src="https://ci5.googleusercontent.com/proxy/PAzwQYhejOBwZjcGBo03brUql2pC4PSPra0Geix2btrhLPtMDYIiDOhpxQyPTnE_4_iskm_SUFBEUOjHkBH1IXzjKDnHfua5Ze_Bcdk=s0-d-e1-ft#http://teja1.kuikr.com/images/notification/facebook.gif" width="27" height="27" alt="Facebook" border="0" class="CToWUd"></a></td>'
                                                str += '<td width="6"></td>'
//str += '<td width="27"><a href="https://twitter.com/Quikr" target="_blank" data-saferedirecturl="https://www.google.com/url?hl=en&amp;q=https://twitter.com/Quikr&amp;source=gmail&amp;ust=1475126531256000&amp;usg=AFQjCNHEalQFS9v-pedRt-jl2p61Swhkiw"> <img src="https://ci3.googleusercontent.com/proxy/le19J6WFI9pGDITa3WLXd7MNVpi0PL9HmyOohq6vDFDAjsoagkF_HHF6SwNgXxlk-Ombp9KtZm_5_5Gp42j2Ni0QLJBX08WjNQXcKw=s0-d-e1-ft#http://teja1.kuikr.com/images/notification/twitter.gif" width="27" height="27" alt="Twitter" border="0" class="CToWUd"></a></td>'
                                                str += '<td width="6"></td>'
//str += '<td width="27"><a href="https://plus.google.com/+quikr/posts" target="_blank" data-saferedirecturl="https://www.google.com/url?hl=en&amp;q=https://plus.google.com/%2Bquikr/posts&amp;source=gmail&amp;ust=1475126531256000&amp;usg=AFQjCNH34dG7EE2PQvyXk6GHHDu8C7xZsw"> <img src="https://ci5.googleusercontent.com/proxy/JWOM6gpkJkpx5WtEU6luaSLj9wTHjhX2ZsLlMb7VmNZGdC4MM4bzHS3fWh9vW2mUdSGwLLBfzsZkEAR1r1zGI_mdTFcYdigXjos=s0-d-e1-ft#http://teja1.kuikr.com/images/notification/gplus.gif" width="27" height="27" alt="Google Plus" border="0" class="CToWUd"></a></td>'
                                                str += '<td width="6"></td>'
//str += '<td width="27"><a href="https://in.linkedin.com/company/quikr" target="_blank" data-saferedirecturl="https://www.google.com/url?hl=en&amp;q=https://in.linkedin.com/company/quikr&amp;source=gmail&amp;ust=1475126531256000&amp;usg=AFQjCNFELOpY7CxqlBpzcxV4zE3Q-zuLEg"> <img src="https://ci5.googleusercontent.com/proxy/J7nVG4QamWGB0KgULYFsxyHgU-mCj6iRRb5ZM3GpY7ur_NYcGewlc6FdWBOIhinuQmhh0NIph9_VRXfaUB_8TJueKZ5KJIx8-V21PC0=s0-d-e1-ft#http://teja1.kuikr.com/images/notification/linkedin.gif" width="27" height="27" alt="Linkedin" border="0" class="CToWUd"></a></td>'
                                                str += '<td width="6"></td>'
//str += '<td width="27"><a href="https://www.youtube.com/user/quikrclassifieds" target="_blank" data-saferedirecturl="https://www.google.com/url?hl=en&amp;q=https://www.youtube.com/user/quikrclassifieds&amp;source=gmail&amp;ust=1475126531256000&amp;usg=AFQjCNFy7PJK2FlVFKZ8OnDVCAgof1lwcQ"> <img src="https://ci5.googleusercontent.com/proxy/2m9M-EzibEYfrP6aGS7E7ZLI_hTkO-sL6dIT3M3ioVohlP1kYhfIRXrPgA-Zm1owNOFiaeIjGIGhU9xXe4ioOant3vIOXzjUwIKVwQ=s0-d-e1-ft#http://teja1.kuikr.com/images/notification/youtube.gif" width="27" height="27" alt="Youtube" border="0" class="CToWUd"></a></td>'
                                                str += '</tr>'
                                                str += '</tbody></table></td>'
                                                str += '</tr>'
                                                str += '<tr>'
                                                str += '<td height="9"></td>'
                                                str += '</tr>'
                                                str += '<tr>'
                                                str += '<td align="center" style="font-size:11px;font-family:"Open Sans",Gill Sans,Arial,Helvetica,sans-serif;color:#444444"><p style="margin:0;padding:3px 0 0px;font-size:11px;font-family:"Open Sans",Gill Sans,Arial,Helvetica,sans-serif;line-height:13px">You are receiving this mail from EPardesh Team.</p>'
                                                str += '<p style="margin:0;padding:3px 0;font-size:11px;font-family:"Open Sans",Gill Sans,Arial,Helvetica,sans-serif;line-height:13px">For any assistance, visit our <a href=' + matrimony_url + ' style="font-size:11px;font-family:"Open Sans",Gill Sans,Arial,Helvetica,sans-serif;color:#007ebc;text-decoration:none" target="_blank" data-saferedirecturl=' + matrimony_url + '>Help center</a> or write to us at <a href=' + matrimony_url + ' style="font-size:11px;font-family:"Open Sans",Gill Sans,Arial,Helvetica,sans-serif;color:#008bcf;text-decoration:none" target="_blank">support@epardesh.com.</a></p></td>'
                                                str += '</tr>'
                                                str += '<tr>'
                                                str += '<td align="center" style="font-size:11px;font-family:"Open Sans",Gill Sans,Arial,Helvetica,sans-serif;color:#008bcf;line-height:13px">© <a href=' + matrimony_url + ' target="_blank" data-saferedirecturl=' + matrimony_url + '>www.EPardesh.com</a></td>'
                                                str += '</tr>'
                                                str += '</tbody></table>'
                                                str += '</div>'

                                                var str1 = "<h2>Hi admin,</h2>";
                                                str1 += "<p>A new user with following details has registered in EPardesh Matrimony: </p>";
                                                str1 += "<p> Name : " + first_name + " " + last_name + "</p>"
                                                str1 += "<p> Email : " + email + "</p>"
                                                str1 += "<p> Profile Id : " + profile_id + "</p>"
                                                str1 += "<p>Regards,</p>";
                                                str1 += "<p>Team EPardesh</p>";

                                                send_email(str, email, 'Registration Successfull');
                                                send_email(str1, admin_email, 'New registration');

                                                var data = {first_name: first_name, last_name: last_name, email: email, access_token: access_token, id: id, profile_id: profile_id};
                                                sendResponse.sendSuccessData(data, res);
                                            }
                                        });
                                    }
                                })
                            }
                        });
                    }
                });
            });
});
/*
 * --------------------------------------------------------------------------
 * login_matrimony_user
 * INPUT : email, password
 * ---------------------------------------------------------------------------
 */
router.post('/login_matrimony_user', function (req, res, next) {
    var email = req.body.email;
    var password = req.body.password;
    var encrypt_password = md5(password);
    var manValues = [email, password, encrypt_password];
    async.waterfall([
        function (callback) {
            func.checkBlank(res, manValues, callback);
        }],
            function () {
                //var sql = "SELECT * FROM matrimony_user WHERE email= ? ";
                var sql = "SELECT matrimony_user.first_name,matrimony_user.last_name,matrimony_user.profile_id,matrimony_user.email,matrimony_user.mobile,matrimony_user.email_verified_status,matrimony_user.password,matrimony_user.access_token,matrimony_user.id,matrimony_user.profile_completed_percentage,matrimony_user.membership_plan, matrimony_plans.plan_type FROM matrimony_user join matrimony_plans on matrimony_user.membership_plan=matrimony_plans.id WHERE (matrimony_user.email=? OR matrimony_user.profile_id=?)";
                var values = [email, email];
                connection.query(sql, values, function (err, rows) {
                    if (err) {
                        console.log(err)
                        var errorMsg = 'some error occurred';
                        sendResponse.sendErrorMessage(errorMsg, res);
                    } else {
                        if (rows.length > '0' || rows.length > '0') {
                            var email_verified_status = rows[0].email_verified_status;
                            if (email_verified_status == 1 || email_verified_status == '1') {
                                if (rows[0].password == encrypt_password) {
                                    var data = {first_name: rows[0].first_name, last_name: rows[0].last_name, email: rows[0].email, access_token: rows[0].access_token, mobile: rows[0].mobile, id: rows[0].id, profile_completed_percentage: rows[0].profile_completed_percentage, plan_type: rows[0].plan_type, plan_id: rows[0].membership_plan, profile_id: rows[0].profile_id};
                                    sendResponse.sendSuccessData(data, res);
                                } else {
                                    var errorMsg = 'Email or password is incorrect.';
                                    sendResponse.sendErrorMessage(errorMsg, res);
                                }
                            } else {
                                var errorMsg = 'Email not verified';
                                sendResponse.sendErrorMessage(errorMsg, res);
                            }

                        } else {
                            var errorMsg = 'not found';
                            sendResponse.sendErrorMessage(errorMsg, res);
                        }
                    }
                });
            })
});
/*
 * --------------------------------------------------------------------------
 * login_using_facebook
 * ---------------------------------------------------------------------------
 */
router.post('/matrimony/facebook', function (req, res) {
    //var user_type = req.body.user_type;
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
    // Step 1. Exchange authorization code for access token.
    // userAccessToken = facebookApp.getUserAccessToken();
    request.get({url: accessTokenUrl, qs: params, json: true}, function (err, response, accessToken) {
        if (response.statusCode !== 200) {
            return res.status(500).send({message: accessToken.error.message});
        }
        // Step 2. Retrieve profile information about the current user.
        request.get({url: graphApiUrl, qs: accessToken, json: true}, function (err, response, profile) {
            if (response.statusCode !== 200) {
                return res.status(500).send({message: profile.error.message});
            }
            var sql = "SELECT email FROM matrimony_user WHERE email=?";
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
                    var user_data = rows1.length;
                    if (user_data > 0) {
                        var sql = "SELECT id,profile_id,email,access_token,first_name,last_name,mobile FROM matrimony_user WHERE `email`=? limit 1";
                        var values = [rows1[0].email];
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
                                    profile_id: rows3[0].profile_id,
                                    email: rows3[0].email,
                                    access_token: rows3[0].access_token,
                                    first_name: rows3[0].first_name,
                                    last_name: rows3[0].last_name,
                                    mobile: rows3[0].mobile,
                                }
                                sendResponse.sendSuccessData(data, res);
                            }
                        });
                    } else {
                        var loginTime = new Date();
                        var accessToken = func.encrypt(profile.email + loginTime);
                        var email = profile.email;
                        var password = "";
                        //var login_provider = "facebook";
                        var token = accessToken;
                        //var salt = "";
                        //var refer_id = "";
                        //var referred_by_id = "";
                        //var verified = 0;
                        //var account_type = "public";
                        //var created_on = loginTime;
                        //var updated_on = loginTime;
                        var first_name = profile.first_name;
                        var last_name = profile.last_name;

                        var random = getRandom(1000, 9999)
                        var random_string = random.toString();
                        var otp = random_string.substring(0, 4);

//                        var facebook_id = profile.id;
                        var sql = "INSERT INTO `matrimony_user`(`email`,`password`,`first_name`,`last_name`, `access_token`,`email_verification_code`) VALUES (?,?,?,?,?,?)";
                        var values = [email, password, first_name, last_name, token, otp];
                        connection.query(sql, values, function (err, userInsertResult) {
                            if (err) {
                                console.log("Insert Result Fail Error:");
                                console.log(err);
                                var errorMsg = 'Something went wrong, Please try again!';
                                sendResponse.sendErrorMessage(errorMsg, res);
                                //throw err;
                            } else {
                                var sql = "select id,email,access_token,first_name,last_name,mobile from matrimony_user WHERE email=?";
                                var VALUES = [profile.email];
                                connection.query(sql, VALUES, function (err, result_user) {
                                    if (err) {
                                        console.log("Error Found:");
                                        console.log(err);
                                        var errorMsg = 'Something went wrong, Please try again!';
                                        sendResponse.sendErrorMessage(errorMsg, res);
                                        //throw err;
                                    } else {

                                        var id = result_user[0].id;
                                        var id_string = String(id);
                                        var no_of_char = id_string.length;
                                        var profile_id_str = 'EP'
                                        for (var i = 0; i < 7 - no_of_char; i++) {
                                            profile_id_str = profile_id_str + '0';
                                        }
                                        var profile_id = profile_id_str + id;


                                        var set_profile_id = "update matrimony_user set profile_id=? where id=?";
                                        var profile_values = [profile_id, id]
                                        connection.query(set_profile_id, profile_values, function (err, result) {
                                            if (err)
                                            {
                                                var errorMsg = 'some error occurred';
                                                sendResponse.sendErrorMessage(errorMsg, res);
                                            } else {
                                                var set_matrimony_partner_preferences = "INSERT INTO `matrimony_partner_preferences`(`user_id`) VALUES (?)";
                                                var partner_values = [id]
                                                connection.query(set_matrimony_partner_preferences, partner_values, function (err, result1) {
                                                    if (err)
                                                    {
                                                        var errorMsg = 'some error occurred';
                                                        sendResponse.sendErrorMessage(errorMsg, res);
                                                    } else {

                                                        str = '<div style="margin:0;padding:0;font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif">'
                                                        str += '<table width="100%" cellpadding="0" cellspacing="0" border="0" align="center" style="font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif;max-width:600px;background-color:#ffffff;color:#666666;text-align:left;padding:0px 2% 10px 2%;background:url(http://teja1.kuikr.com/images/notification/mailer-bg.jpg) repeat #f9f9f9">'
                                                        str += '<tbody><tr>'
                                                        str += '<td height="20"></td>'
                                                        str += '</tr>'
                                                        str += '<tr>'
                                                        str += '<td height="43" valign="top"><table width="100%" cellspacing="0" cellpadding="0" border="0" align="center" style="max-width:530px">'
                                                        str += '<tbody><tr>'
                                                        str += '<td align="left" height="43"><a href="#m_8496668978295844378_m_8306747430853343728_m_8934663683847810844_"><img src="' + url + 'e-pardesh.png" alt="Epardesh" width="94" height="43" border="0" style="margin:0;display:block;font-family:Arial,Helvetica,sans-serif;color:#007ebe;font-size:20px;text-align:center;font-weight:bold" class="CToWUd"></a></td>'
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
                                                        str += '<td align="center"><img src="https://ci3.googleusercontent.com/proxy/tVvN5RW66MgOQ1x6Q-O75sxBy8ExbyBBD7VbbSZqkZ4AtjlqtlEO31-s6u0Fa8KXkyNHCgSn1QUiuNbZkUgrgE71IhhAm5qz3lvZJ20ZxTw=s0-d-e1-ft#http://teja1.kuikr.com/images/notification/VerifyEmail.png" width="73" height="73" border="0" alt="Verify your email address" style="margin:0;display:block" class="CToWUd"></td>'
                                                        str += '</tr>'
                                                        str += '<tr>'
                                                        str += '<td align="center" style="font-size:25px;color:#333333;padding:10px 20px 0px;font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif">Verify your email address</td>'
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
                                                        str += '<td style="font-size:20px;padding:0px 30px;color:#444444;font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif">Dear User,</td>'
                                                        str += '</tr>'
                                                        str += '<tr>'
                                                        str += '<td height="10"></td>'
                                                        str += '</tr>'
                                                        str += '<tr>'
                                                        str += '<td style="font-size:12px;padding:0px 30px;color:#444444;line-height:19px;font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif">Just click the button below (it only takes a couple of seconds). You won’t be asked to log in as its simply a verification of the ownership of this email address. </td>'
                                                        str += '</tr>'
                                                        str += '<tr>'
                                                        str += '<td height="20"></td>'
                                                        str += '</tr>'
                                                        str += '<tr>'
                                                        str += '<td align="center">'
                                                        str += '<table width="185" cellpadding="0" cellspacing="0" border="0">'
                                                        str += '<tbody><tr>'
                                                        str += '<td align="center" bgcolor="#008BCF" height="45" style="border-radius:3px">'
                                                        str += '<a href=' + matrimony_url + 'verify/' + id + '/' + otp + ' style="display:block;color:#ffffff;text-decoration:none;font-size:14px;text-align:center;font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif;font-weight:bold;line-height:45px" target="_blank" data-saferedirecturl="">Verify Email</a>'
                                                        str += '</td>'
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
                                                        str += '<td style="padding:0px 20px">'
                                                        str += '<table border="0" cellspacing="0" cellpadding="0" width="100%" style="padding:0 20px" bgcolor="#f9f9f9">'
                                                        str += '<tbody>'
                                                        str += '<tr>'
                                                        str += '<td height="15"></td>'
                                                        str += '</tr>'
                                                        str += '<tr>'
                                                        str += '<td style="font-weight:bold;color:#999999;font-size:24px;font-family:"Open Sans",Gill Sans,Arial,Helvetica,sans-serif;text-align:left">BENEFITS</td>'
                                                        str += '</tr>'
                                                        str += '<tr>'
                                                        str += '<td height="15"></td>'
                                                        str += '</tr>'
                                                        str += '</tbody>'
                                                        str += '</table>'
                                                        str += '<table border="0" cellspacing="0" cellpadding="0" width="100%" bgcolor="#f2f2f2" style="padding:0px 20px">'
                                                        str += '<tbody>'
                                                        str += '<tr>'
                                                        str += '<td height="25"></td>'
                                                        str += '<td></td>'
                                                        str += '<td></td>'
                                                        str += '</tr>'
                                                        str += '<tr>'
                                                        str += '<td width="10%"><table width="100%" cellpadding="0" cellspacing="0" border="0">'
                                                        str += '<tbody>'
                                                        str += '<tr>'
                                                        str += '<td width="41" align="center" style="padding-top:5px"><img src="https://ci6.googleusercontent.com/proxy/AuD0W4QYf9T9n4GmcjdohHleaEeeYXLxuhMx3plVTm7cf0BLa4r-NNDC1o8RQFCG2TbL5mcYK5HzwustZTLm-eiuyVRJao-e1bDXHQAI=s0-d-e1-ft#http://teja1.kuikr.com/images/notification/disc_bull.png" alt="" width="16" height="16" style="display:block" class="CToWUd"></td>'
                                                        str += '</tr>'
                                                        str += '<tr>'
                                                        str += '<td width="41" height="59"><table width="2" cellpadding="0" cellspacing="0" border="0" align="center">'
                                                        str += '<tbody>'
                                                        str += '<tr>'
                                                        str += '<td width="2" height="59" style="background-color:#999999"></td>'
                                                        str += '</tr>'
                                                        str += '</tbody>'
                                                        str += '</table></td>'
                                                        str += '</tr>'
                                                        str += '</tbody>'
                                                        str += '</table></td>'
                                                        str += '<td width="3%"></td>'
                                                        str += '<td width="85%" style="color:#1688c8;font-size:12px;font-family:"Open Sans",Gill Sans,Arial,Helvetica,sans-serif;vertical-align:top"><p style="padding:0px 0 0 0;margin:0;color:#444444;font-weight:600;font-size:16px;font-family:"Open Sans",Gill Sans,Arial,Helvetica,sans-serif">WHY VERIFY?</p>'
                                                        str += '<p style="padding:0;margin:0;color:#444444;font-size:12px;font-family:"Open Sans",Gill Sans,Arial,Helvetica,sans-serif">Verifying your email lets you see all your Ads, chat messages and own your account.</p></td>'
                                                        str += '</tr>'
                                                        str += '<tr>'
                                                        str += '<td width="10%" valign="top">'
                                                        str += '<table width="100%" cellpadding="0" cellspacing="0" border="0">'
                                                        str += '<tbody>'
                                                        str += '<tr>'
                                                        str += '<td width="41" align="center" valign="top"><img src="https://ci6.googleusercontent.com/proxy/AuD0W4QYf9T9n4GmcjdohHleaEeeYXLxuhMx3plVTm7cf0BLa4r-NNDC1o8RQFCG2TbL5mcYK5HzwustZTLm-eiuyVRJao-e1bDXHQAI=s0-d-e1-ft#http://teja1.kuikr.com/images/notification/disc_bull.png" alt="" width="16" height="16" style="display:block" class="CToWUd"></td>'
                                                        str += '</tr>'
                                                        str += '</tbody>'
                                                        str += '</table></td>'
                                                        str += '<td width="3%"></td>'
                                                        str += '<td width="85%" style="color:#1688c8;font-size:12px;font-family:"Open Sans",Gill Sans,Arial,Helvetica,sans-serif;vertical-align:top"><p style="padding:0px 0 0 0;margin:0;color:#444444;font-weight:600;font-size:16px;font-family:"Open Sans",Gill Sans,Arial,Helvetica,sans-serif">BUTTON NOT WORKING?</p>'
                                                        str += '<p style="padding:0;margin:0;color:#444444;font-size:12px;font-family:"Open Sans",Gill Sans,Arial,Helvetica,sans-serif">If above button is not working then verify your email address by pasting the below link into your browser:</p>'
                                                        str += '<p style="padding:0;margin:0;color:#444444;font-size:12px;font-family:"Open Sans",Gill Sans,Arial,Helvetica,sans-serif"><a href=' + matrimony_url + 'verify/' + id + '/' + otp + ' style="text-decoration:none;color:#008bcf;display:block;word-break:break-all" target="_blank" data-saferedirecturl=' + matrimony_url + 'verify/' + id + '/' + otp + '>' + matrimony_url + 'verify/' + id + '/' + otp + '</a></p>'
                                                        str += '</td>'
                                                        str += '</tr>'
                                                        str += '<tr>'
                                                        str += '<td height="25"></td>'
                                                        str += '<td></td>'
                                                        str += '<td></td>'
                                                        str += '</tr>'
                                                        str += '</tbody>'
                                                        str += '</table></td>'
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
//str += '<td width="91"><a href="https://play.google.com/store/apps/details?id=com.quikr&amp;referrer=af_tranid%3D3S99EN98WQXX6ZR3%26pid%3Dmailer" target="_blank" data-saferedirecturl="https://www.google.com/url?hl=en&amp;q=https://play.google.com/store/apps/details?id%3Dcom.quikr%26referrer%3Daf_tranid%253D3S99EN98WQXX6ZR3%2526pid%253Dmailer&amp;source=gmail&amp;ust=1475126531256000&amp;usg=AFQjCNH-eaiOtRaM4HZSx7JGGsQorMAMxg"><img src="https://ci6.googleusercontent.com/proxy/-Hu0b51rgxf_9dKZHystMtJW_jcDM3Qh7Aa8NLfWDC6YdOECUtM0a7x5_guWoleeOa0aj7DGDkli6mEtM631nXNDN6y1MjvOi4T37d2fHwTw=s0-d-e1-ft#http://teja1.kuikr.com/images/notification/android-icon.gif" width="91" height="31" alt="Android Play Store" border="0" class="CToWUd"></a></td>'
                                                        str += '<td width="8"></td>'
//str += '<td width="91"><a href="https://itunes.apple.com/in/app/quikr-free-local-classifieds/id632051273?mt=8" target="_blank" data-saferedirecturl="https://www.google.com/url?hl=en&amp;q=https://itunes.apple.com/in/app/quikr-free-local-classifieds/id632051273?mt%3D8&amp;source=gmail&amp;ust=1475126531256000&amp;usg=AFQjCNGr4EtNQ0-mH3l80fh4yJYDbY453A"><img src="https://ci3.googleusercontent.com/proxy/Ffx1VpKrrEVkCZY4Ayd1paTDC-B_dEleDVPlMkfA6F3P3P2o6Jty0rxdTVF5NJXDG0BMeU7s9qd-UkHuIRch_aN45ISy16rA4jSWqkTJ3A=s0-d-e1-ft#http://teja1.kuikr.com/images/notification/apple-icon.gif" width="91" height="31" alt="Apple Play Store" border="0" class="CToWUd"></a></td>'
                                                        str += '<td width="8"></td>'
//str += '<td width="91"><a href="http://www.windowsphone.com/en-us/store/app/quikr-buy-sell/6d36aa77-19a0-4adc-af15-0496dcc05557" target="_blank" data-saferedirecturl="https://www.google.com/url?hl=en&amp;q=http://www.windowsphone.com/en-us/store/app/quikr-buy-sell/6d36aa77-19a0-4adc-af15-0496dcc05557&amp;source=gmail&amp;ust=1475126531256000&amp;usg=AFQjCNFvUFIldfK_iFVdmShr1jLveqtZaA"><img src="https://ci5.googleusercontent.com/proxy/C0G_ipqnQAntQtrgN4v5sIfanWkZqo-sCF9VFb_bzDM2MK_f72G-K0NNFpeEBH60Aut7dlF9SuV0B8xBL3AyVl_j6uTBCojeMMfeBjQ93SPr=s0-d-e1-ft#http://teja1.kuikr.com/images/notification/windows-icon.gif" width="91" height="31" alt="Window Store" border="0" class="CToWUd"></a></td>'
                                                        str += '</tr>'
                                                        str += '</tbody></table></td>'
                                                        str += '</tr>'
                                                        str += '<tr>'
                                                        str += '<td height="20"></td>'
                                                        str += '</tr>'
                                                        str += '<tr>'
                                                        str += '<td align="center"><table cellpadding="0" cellspacing="0" align="center" border="0">'
                                                        str += '<tbody><tr>'
//str += '<td width="27"><a href="https://www.facebook.com/QuikrFans" target="_blank" data-saferedirecturl="https://www.google.com/url?hl=en&amp;q=https://www.facebook.com/QuikrFans&amp;source=gmail&amp;ust=1475126531256000&amp;usg=AFQjCNEwd980Vr7okmi8Q_Sds7fP2asBaA"> <img src="https://ci5.googleusercontent.com/proxy/PAzwQYhejOBwZjcGBo03brUql2pC4PSPra0Geix2btrhLPtMDYIiDOhpxQyPTnE_4_iskm_SUFBEUOjHkBH1IXzjKDnHfua5Ze_Bcdk=s0-d-e1-ft#http://teja1.kuikr.com/images/notification/facebook.gif" width="27" height="27" alt="Facebook" border="0" class="CToWUd"></a></td>'
                                                        str += '<td width="6"></td>'
//str += '<td width="27"><a href="https://twitter.com/Quikr" target="_blank" data-saferedirecturl="https://www.google.com/url?hl=en&amp;q=https://twitter.com/Quikr&amp;source=gmail&amp;ust=1475126531256000&amp;usg=AFQjCNHEalQFS9v-pedRt-jl2p61Swhkiw"> <img src="https://ci3.googleusercontent.com/proxy/le19J6WFI9pGDITa3WLXd7MNVpi0PL9HmyOohq6vDFDAjsoagkF_HHF6SwNgXxlk-Ombp9KtZm_5_5Gp42j2Ni0QLJBX08WjNQXcKw=s0-d-e1-ft#http://teja1.kuikr.com/images/notification/twitter.gif" width="27" height="27" alt="Twitter" border="0" class="CToWUd"></a></td>'
                                                        str += '<td width="6"></td>'
//str += '<td width="27"><a href="https://plus.google.com/+quikr/posts" target="_blank" data-saferedirecturl="https://www.google.com/url?hl=en&amp;q=https://plus.google.com/%2Bquikr/posts&amp;source=gmail&amp;ust=1475126531256000&amp;usg=AFQjCNH34dG7EE2PQvyXk6GHHDu8C7xZsw"> <img src="https://ci5.googleusercontent.com/proxy/JWOM6gpkJkpx5WtEU6luaSLj9wTHjhX2ZsLlMb7VmNZGdC4MM4bzHS3fWh9vW2mUdSGwLLBfzsZkEAR1r1zGI_mdTFcYdigXjos=s0-d-e1-ft#http://teja1.kuikr.com/images/notification/gplus.gif" width="27" height="27" alt="Google Plus" border="0" class="CToWUd"></a></td>'
                                                        str += '<td width="6"></td>'
//str += '<td width="27"><a href="https://in.linkedin.com/company/quikr" target="_blank" data-saferedirecturl="https://www.google.com/url?hl=en&amp;q=https://in.linkedin.com/company/quikr&amp;source=gmail&amp;ust=1475126531256000&amp;usg=AFQjCNFELOpY7CxqlBpzcxV4zE3Q-zuLEg"> <img src="https://ci5.googleusercontent.com/proxy/J7nVG4QamWGB0KgULYFsxyHgU-mCj6iRRb5ZM3GpY7ur_NYcGewlc6FdWBOIhinuQmhh0NIph9_VRXfaUB_8TJueKZ5KJIx8-V21PC0=s0-d-e1-ft#http://teja1.kuikr.com/images/notification/linkedin.gif" width="27" height="27" alt="Linkedin" border="0" class="CToWUd"></a></td>'
                                                        str += '<td width="6"></td>'
//str += '<td width="27"><a href="https://www.youtube.com/user/quikrclassifieds" target="_blank" data-saferedirecturl="https://www.google.com/url?hl=en&amp;q=https://www.youtube.com/user/quikrclassifieds&amp;source=gmail&amp;ust=1475126531256000&amp;usg=AFQjCNFy7PJK2FlVFKZ8OnDVCAgof1lwcQ"> <img src="https://ci5.googleusercontent.com/proxy/2m9M-EzibEYfrP6aGS7E7ZLI_hTkO-sL6dIT3M3ioVohlP1kYhfIRXrPgA-Zm1owNOFiaeIjGIGhU9xXe4ioOant3vIOXzjUwIKVwQ=s0-d-e1-ft#http://teja1.kuikr.com/images/notification/youtube.gif" width="27" height="27" alt="Youtube" border="0" class="CToWUd"></a></td>'
                                                        str += '</tr>'
                                                        str += '</tbody></table></td>'
                                                        str += '</tr>'
                                                        str += '<tr>'
                                                        str += '<td height="9"></td>'
                                                        str += '</tr>'
                                                        str += '<tr>'
                                                        str += '<td align="center" style="font-size:11px;font-family:"Open Sans",Gill Sans,Arial,Helvetica,sans-serif;color:#444444"><p style="margin:0;padding:3px 0 0px;font-size:11px;font-family:"Open Sans",Gill Sans,Arial,Helvetica,sans-serif;line-height:13px">You are receiving this mail from EPardesh Team.</p>'
                                                        str += '<p style="margin:0;padding:3px 0;font-size:11px;font-family:"Open Sans",Gill Sans,Arial,Helvetica,sans-serif;line-height:13px">For any assistance, visit our <a href=' + matrimony_url + ' style="font-size:11px;font-family:"Open Sans",Gill Sans,Arial,Helvetica,sans-serif;color:#007ebc;text-decoration:none" target="_blank" data-saferedirecturl=' + matrimony_url + '>Help center</a> or write to us at <a href=' + matrimony_url + ' style="font-size:11px;font-family:"Open Sans",Gill Sans,Arial,Helvetica,sans-serif;color:#008bcf;text-decoration:none" target="_blank">support@epardesh.com.</a></p></td>'
                                                        str += '</tr>'
                                                        str += '<tr>'
                                                        str += '<td align="center" style="font-size:11px;font-family:"Open Sans",Gill Sans,Arial,Helvetica,sans-serif;color:#008bcf;line-height:13px">© <a href=' + matrimony_url + ' target="_blank" data-saferedirecturl=' + matrimony_url + '>www.EPardesh.com</a></td>'
                                                        str += '</tr>'
                                                        str += '</tbody></table>'
                                                        str += '</div>'


                                                        var str1 = "<h2>Hi admin,</h2>";
                                                        str1 += "<p>A new user with following details has registered in EPardesh Matrimony: </p>";
                                                        str1 += "<p> Name : " + first_name + " " + last_name + "</p>"
                                                        str1 += "<p> Email : " + email + "</p>"
                                                        str1 += "<p> Profile Id : " + profile_id + "</p>"
                                                        str1 += "<p>Regards,</p>";
                                                        str1 += "<p>Team EPardesh</p>";


                                                        send_email(str, email, 'Registration Successfull');
                                                        send_email(str1, admin_email, 'New registration');



//                                                        var mailOptions = {to: email, subject: 'EPardesh: Registration Successful', html: str};
//                                                        transporter.sendMail(mailOptions, function (error, info) {
//                                                            if (error) {
//                                                                console.log("Error Found:");
//                                                                console.log(error);
//                                                                //throw err;
//                                                                //return console.log(error);
//                                                            } else {
//                                                                console.log('Message sent: ');
//                                                            }
//                                                        });
                                                        var data = {
                                                            id: result_user[0].id,
                                                            profile_id: profile_id,
                                                            email: result_user[0].email,
                                                            access_token: result_user[0].access_token,
                                                            first_name: result_user[0].first_name,
                                                            last_name: result_user[0].last_name,
                                                            mobile: result_user[0].mobile,
                                                        }
                                                        sendResponse.sendSuccessData(data, res);
                                                    }
                                                })
                                            }
                                        })
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
router.post('/matrimony/google', function (req, res) {
    var accessTokenUrl = 'https://accounts.google.com/o/oauth2/token';
    var peopleApiUrl = 'https://www.googleapis.com/plus/v1/people/me/openIdConnect';
    var params = {
        code: req.body.code,
        client_id: req.body.clientId,
        client_secret: "NFEx38cj-xbsQilJG8CQ-V5C",
        redirect_uri: req.body.redirectUri,
        grant_type: 'authorization_code'
    };
    //res.send("in ");
    // Step 1. Exchange authorization code for access token.
    request.post(accessTokenUrl, {json: true, form: params}, function (err, response, token) {
        //res.send("in request ");
        var accessToken = token.access_token;
        var headers = {Authorization: 'Bearer ' + accessToken};
        //Step 2. Retrieve profile information about the current user.
        request.get({url: peopleApiUrl, headers: headers, json: true}, function (err, response, profile) {
            if (profile.error) {
                console.log("in profile error");
                return res.status(500).send({message: profile.error.message});
            }
            var sql = "SELECT email FROM matrimony_user WHERE email=?";
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
                        var sql = "SELECT id,profile_id,email,access_token,first_name,last_name,mobile FROM matrimony_user WHERE `email`=? limit 1";
                        var values = [rows1[0].email];
                        connection.query(sql, values, function (err, rows3) {
                            if (err) {
                                console.log("Error Found:");
                                console.log(err);
                                var errorMsg = 'Something went wrong, Please try again!';
                                sendResponse.sendErrorMessage(errorMsg, res);
                                //throw err;
                            } else {
                                var data = {
                                    id: rows3[0].id,
                                    profile_id: rows3[0].profile_id,
                                    email: rows3[0].email,
                                    access_token: rows3[0].access_token,
                                    first_name: rows3[0].first_name,
                                    last_name: rows3[0].last_name,
                                    mobile: rows3[0].mobile,
                                }
                                sendResponse.sendSuccessData(data, res);
                            }
                        });
                    } else {
                        var loginTime = new Date();
                        var accessToken = func.encrypt(profile.email + loginTime);
                        var email = profile.email;
                        var password = "";
                        var token = accessToken;
                        var google_id = profile.sub;
                        var first_name = profile.given_name;
                        var last_name = profile.family_name;
                        var random = getRandom(1000, 9999)
                        var random_string = random.toString();
                        var otp = random_string.substring(0, 4);

                        var sql = "INSERT INTO `matrimony_user`(`email`,`password`,`first_name`,`last_name`, `access_token`, `email_verification_code`) VALUES (?,?,?,?,?,?)";
                        var values = [email, password, first_name, last_name, token, otp];
                        connection.query(sql, values, function (err, userInsertResult) {
                            if (err) {
                                console.log("Insert Result Fail Error:");
                                console.log(err);
                                var errorMsg = 'Something went wrong, Please try again!';
                                sendResponse.sendErrorMessage(errorMsg, res);
                                //throw err;
                            } else {
                                var sql = "select id,profile_id,email,access_token,first_name,last_name,mobile from matrimony_user WHERE email=?";
                                var VALUES = [profile.email];
                                connection.query(sql, VALUES, function (err, result_user) {
                                    if (err) {
                                        console.log("Error Found:");
                                        console.log(err);
                                        var errorMsg = 'Something went wrong, Please try again!';
                                        sendResponse.sendErrorMessage(errorMsg, res);
                                    } else {
                                        var id = result_user[0].id;
                                        var id_string = String(id);
                                        var no_of_char = id_string.length;
                                        var profile_id_str = 'EP'
                                        for (var i = 0; i < 7 - no_of_char; i++) {
                                            profile_id_str = profile_id_str + '0';
                                        }
                                        var profile_id = profile_id_str + id;
                                        var set_profile_id = "update matrimony_user set profile_id=? where id=?";
                                        var profile_values = [profile_id, id]
                                        connection.query(set_profile_id, profile_values, function (err, result) {
                                            if (err)
                                            {
                                                var errorMsg = 'some error occurred';
                                                sendResponse.sendErrorMessage(errorMsg, res);
                                            } else {
                                                var set_matrimony_partner_preferences = "INSERT INTO `matrimony_partner_preferences`(`user_id`) VALUES (?)";
                                                var partner_values = [id]
                                                connection.query(set_matrimony_partner_preferences, partner_values, function (err, result1) {
                                                    if (err)
                                                    {
                                                        var errorMsg = 'some error occurred';
                                                        sendResponse.sendErrorMessage(errorMsg, res);
                                                    } else {
                                                        str = '<div style="margin:0;padding:0;font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif">'
                                                        str += '<table width="100%" cellpadding="0" cellspacing="0" border="0" align="center" style="font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif;max-width:600px;background-color:#ffffff;color:#666666;text-align:left;padding:0px 2% 10px 2%;background:url(http://teja1.kuikr.com/images/notification/mailer-bg.jpg) repeat #f9f9f9">'
                                                        str += '<tbody><tr>'
                                                        str += '<td height="20"></td>'
                                                        str += '</tr>'
                                                        str += '<tr>'
                                                        str += '<td height="43" valign="top"><table width="100%" cellspacing="0" cellpadding="0" border="0" align="center" style="max-width:530px">'
                                                        str += '<tbody><tr>'
                                                        str += '<td align="left" height="43"><a href="#m_8496668978295844378_m_8306747430853343728_m_8934663683847810844_"><img src="' + url + 'e-pardesh.png" alt="Epardesh" width="94" height="43" border="0" style="margin:0;display:block;font-family:Arial,Helvetica,sans-serif;color:#007ebe;font-size:20px;text-align:center;font-weight:bold" class="CToWUd"></a></td>'
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
                                                        str += '<td align="center"><img src="https://ci3.googleusercontent.com/proxy/tVvN5RW66MgOQ1x6Q-O75sxBy8ExbyBBD7VbbSZqkZ4AtjlqtlEO31-s6u0Fa8KXkyNHCgSn1QUiuNbZkUgrgE71IhhAm5qz3lvZJ20ZxTw=s0-d-e1-ft#http://teja1.kuikr.com/images/notification/VerifyEmail.png" width="73" height="73" border="0" alt="Verify your email address" style="margin:0;display:block" class="CToWUd"></td>'
                                                        str += '</tr>'
                                                        str += '<tr>'
                                                        str += '<td align="center" style="font-size:25px;color:#333333;padding:10px 20px 0px;font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif">Verify your email address</td>'
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
                                                        str += '<td style="font-size:20px;padding:0px 30px;color:#444444;font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif">Dear User,</td>'
                                                        str += '</tr>'
                                                        str += '<tr>'
                                                        str += '<td height="10"></td>'
                                                        str += '</tr>'
                                                        str += '<tr>'
                                                        str += '<td style="font-size:12px;padding:0px 30px;color:#444444;line-height:19px;font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif">Just click the button below (it only takes a couple of seconds). You won’t be asked to log in as its simply a verification of the ownership of this email address. </td>'
                                                        str += '</tr>'
                                                        str += '<tr>'
                                                        str += '<td height="20"></td>'
                                                        str += '</tr>'
                                                        str += '<tr>'
                                                        str += '<td align="center">'
                                                        str += '<table width="185" cellpadding="0" cellspacing="0" border="0">'
                                                        str += '<tbody><tr>'
                                                        str += '<td align="center" bgcolor="#008BCF" height="45" style="border-radius:3px">'
                                                        str += '<a href=' + matrimony_url + 'verify/' + id + '/' + otp + ' style="display:block;color:#ffffff;text-decoration:none;font-size:14px;text-align:center;font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif;font-weight:bold;line-height:45px" target="_blank" data-saferedirecturl="">Verify Email</a>'
                                                        str += '</td>'
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
                                                        str += '<td style="padding:0px 20px">'
                                                        str += '<table border="0" cellspacing="0" cellpadding="0" width="100%" style="padding:0 20px" bgcolor="#f9f9f9">'
                                                        str += '<tbody>'
                                                        str += '<tr>'
                                                        str += '<td height="15"></td>'
                                                        str += '</tr>'
                                                        str += '<tr>'
                                                        str += '<td style="font-weight:bold;color:#999999;font-size:24px;font-family:"Open Sans",Gill Sans,Arial,Helvetica,sans-serif;text-align:left">BENEFITS</td>'
                                                        str += '</tr>'
                                                        str += '<tr>'
                                                        str += '<td height="15"></td>'
                                                        str += '</tr>'
                                                        str += '</tbody>'
                                                        str += '</table>'
                                                        str += '<table border="0" cellspacing="0" cellpadding="0" width="100%" bgcolor="#f2f2f2" style="padding:0px 20px">'
                                                        str += '<tbody>'
                                                        str += '<tr>'
                                                        str += '<td height="25"></td>'
                                                        str += '<td></td>'
                                                        str += '<td></td>'
                                                        str += '</tr>'
                                                        str += '<tr>'
                                                        str += '<td width="10%"><table width="100%" cellpadding="0" cellspacing="0" border="0">'
                                                        str += '<tbody>'
                                                        str += '<tr>'
                                                        str += '<td width="41" align="center" style="padding-top:5px"><img src="https://ci6.googleusercontent.com/proxy/AuD0W4QYf9T9n4GmcjdohHleaEeeYXLxuhMx3plVTm7cf0BLa4r-NNDC1o8RQFCG2TbL5mcYK5HzwustZTLm-eiuyVRJao-e1bDXHQAI=s0-d-e1-ft#http://teja1.kuikr.com/images/notification/disc_bull.png" alt="" width="16" height="16" style="display:block" class="CToWUd"></td>'
                                                        str += '</tr>'
                                                        str += '<tr>'
                                                        str += '<td width="41" height="59"><table width="2" cellpadding="0" cellspacing="0" border="0" align="center">'
                                                        str += '<tbody>'
                                                        str += '<tr>'
                                                        str += '<td width="2" height="59" style="background-color:#999999"></td>'
                                                        str += '</tr>'
                                                        str += '</tbody>'
                                                        str += '</table></td>'
                                                        str += '</tr>'
                                                        str += '</tbody>'
                                                        str += '</table></td>'
                                                        str += '<td width="3%"></td>'
                                                        str += '<td width="85%" style="color:#1688c8;font-size:12px;font-family:"Open Sans",Gill Sans,Arial,Helvetica,sans-serif;vertical-align:top"><p style="padding:0px 0 0 0;margin:0;color:#444444;font-weight:600;font-size:16px;font-family:"Open Sans",Gill Sans,Arial,Helvetica,sans-serif">WHY VERIFY?</p>'
                                                        str += '<p style="padding:0;margin:0;color:#444444;font-size:12px;font-family:"Open Sans",Gill Sans,Arial,Helvetica,sans-serif">Verifying your email lets you see all your Ads, chat messages and own your account.</p></td>'
                                                        str += '</tr>'
                                                        str += '<tr>'
                                                        str += '<td width="10%" valign="top">'
                                                        str += '<table width="100%" cellpadding="0" cellspacing="0" border="0">'
                                                        str += '<tbody>'
                                                        str += '<tr>'
                                                        str += '<td width="41" align="center" valign="top"><img src="https://ci6.googleusercontent.com/proxy/AuD0W4QYf9T9n4GmcjdohHleaEeeYXLxuhMx3plVTm7cf0BLa4r-NNDC1o8RQFCG2TbL5mcYK5HzwustZTLm-eiuyVRJao-e1bDXHQAI=s0-d-e1-ft#http://teja1.kuikr.com/images/notification/disc_bull.png" alt="" width="16" height="16" style="display:block" class="CToWUd"></td>'
                                                        str += '</tr>'
                                                        str += '</tbody>'
                                                        str += '</table></td>'
                                                        str += '<td width="3%"></td>'
                                                        str += '<td width="85%" style="color:#1688c8;font-size:12px;font-family:"Open Sans",Gill Sans,Arial,Helvetica,sans-serif;vertical-align:top"><p style="padding:0px 0 0 0;margin:0;color:#444444;font-weight:600;font-size:16px;font-family:"Open Sans",Gill Sans,Arial,Helvetica,sans-serif">BUTTON NOT WORKING?</p>'
                                                        str += '<p style="padding:0;margin:0;color:#444444;font-size:12px;font-family:"Open Sans",Gill Sans,Arial,Helvetica,sans-serif">If above button is not working then verify your email address by pasting the below link into your browser:</p>'
                                                        str += '<p style="padding:0;margin:0;color:#444444;font-size:12px;font-family:"Open Sans",Gill Sans,Arial,Helvetica,sans-serif"><a href=' + matrimony_url + 'verify/' + id + '/' + otp + ' style="text-decoration:none;color:#008bcf;display:block;word-break:break-all" target="_blank" data-saferedirecturl=' + matrimony_url + 'verify/' + id + '/' + otp + '>' + matrimony_url + 'verify/' + id + '/' + otp + '</a></p>'
                                                        str += '</td>'
                                                        str += '</tr>'
                                                        str += '<tr>'
                                                        str += '<td height="25"></td>'
                                                        str += '<td></td>'
                                                        str += '<td></td>'
                                                        str += '</tr>'
                                                        str += '</tbody>'
                                                        str += '</table></td>'
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
//str += '<td width="91"><a href="https://play.google.com/store/apps/details?id=com.quikr&amp;referrer=af_tranid%3D3S99EN98WQXX6ZR3%26pid%3Dmailer" target="_blank" data-saferedirecturl="https://www.google.com/url?hl=en&amp;q=https://play.google.com/store/apps/details?id%3Dcom.quikr%26referrer%3Daf_tranid%253D3S99EN98WQXX6ZR3%2526pid%253Dmailer&amp;source=gmail&amp;ust=1475126531256000&amp;usg=AFQjCNH-eaiOtRaM4HZSx7JGGsQorMAMxg"><img src="https://ci6.googleusercontent.com/proxy/-Hu0b51rgxf_9dKZHystMtJW_jcDM3Qh7Aa8NLfWDC6YdOECUtM0a7x5_guWoleeOa0aj7DGDkli6mEtM631nXNDN6y1MjvOi4T37d2fHwTw=s0-d-e1-ft#http://teja1.kuikr.com/images/notification/android-icon.gif" width="91" height="31" alt="Android Play Store" border="0" class="CToWUd"></a></td>'
                                                        str += '<td width="8"></td>'
//str += '<td width="91"><a href="https://itunes.apple.com/in/app/quikr-free-local-classifieds/id632051273?mt=8" target="_blank" data-saferedirecturl="https://www.google.com/url?hl=en&amp;q=https://itunes.apple.com/in/app/quikr-free-local-classifieds/id632051273?mt%3D8&amp;source=gmail&amp;ust=1475126531256000&amp;usg=AFQjCNGr4EtNQ0-mH3l80fh4yJYDbY453A"><img src="https://ci3.googleusercontent.com/proxy/Ffx1VpKrrEVkCZY4Ayd1paTDC-B_dEleDVPlMkfA6F3P3P2o6Jty0rxdTVF5NJXDG0BMeU7s9qd-UkHuIRch_aN45ISy16rA4jSWqkTJ3A=s0-d-e1-ft#http://teja1.kuikr.com/images/notification/apple-icon.gif" width="91" height="31" alt="Apple Play Store" border="0" class="CToWUd"></a></td>'
                                                        str += '<td width="8"></td>'
//str += '<td width="91"><a href="http://www.windowsphone.com/en-us/store/app/quikr-buy-sell/6d36aa77-19a0-4adc-af15-0496dcc05557" target="_blank" data-saferedirecturl="https://www.google.com/url?hl=en&amp;q=http://www.windowsphone.com/en-us/store/app/quikr-buy-sell/6d36aa77-19a0-4adc-af15-0496dcc05557&amp;source=gmail&amp;ust=1475126531256000&amp;usg=AFQjCNFvUFIldfK_iFVdmShr1jLveqtZaA"><img src="https://ci5.googleusercontent.com/proxy/C0G_ipqnQAntQtrgN4v5sIfanWkZqo-sCF9VFb_bzDM2MK_f72G-K0NNFpeEBH60Aut7dlF9SuV0B8xBL3AyVl_j6uTBCojeMMfeBjQ93SPr=s0-d-e1-ft#http://teja1.kuikr.com/images/notification/windows-icon.gif" width="91" height="31" alt="Window Store" border="0" class="CToWUd"></a></td>'
                                                        str += '</tr>'
                                                        str += '</tbody></table></td>'
                                                        str += '</tr>'
                                                        str += '<tr>'
                                                        str += '<td height="20"></td>'
                                                        str += '</tr>'
                                                        str += '<tr>'
                                                        str += '<td align="center"><table cellpadding="0" cellspacing="0" align="center" border="0">'
                                                        str += '<tbody><tr>'
//str += '<td width="27"><a href="https://www.facebook.com/QuikrFans" target="_blank" data-saferedirecturl="https://www.google.com/url?hl=en&amp;q=https://www.facebook.com/QuikrFans&amp;source=gmail&amp;ust=1475126531256000&amp;usg=AFQjCNEwd980Vr7okmi8Q_Sds7fP2asBaA"> <img src="https://ci5.googleusercontent.com/proxy/PAzwQYhejOBwZjcGBo03brUql2pC4PSPra0Geix2btrhLPtMDYIiDOhpxQyPTnE_4_iskm_SUFBEUOjHkBH1IXzjKDnHfua5Ze_Bcdk=s0-d-e1-ft#http://teja1.kuikr.com/images/notification/facebook.gif" width="27" height="27" alt="Facebook" border="0" class="CToWUd"></a></td>'
                                                        str += '<td width="6"></td>'
//str += '<td width="27"><a href="https://twitter.com/Quikr" target="_blank" data-saferedirecturl="https://www.google.com/url?hl=en&amp;q=https://twitter.com/Quikr&amp;source=gmail&amp;ust=1475126531256000&amp;usg=AFQjCNHEalQFS9v-pedRt-jl2p61Swhkiw"> <img src="https://ci3.googleusercontent.com/proxy/le19J6WFI9pGDITa3WLXd7MNVpi0PL9HmyOohq6vDFDAjsoagkF_HHF6SwNgXxlk-Ombp9KtZm_5_5Gp42j2Ni0QLJBX08WjNQXcKw=s0-d-e1-ft#http://teja1.kuikr.com/images/notification/twitter.gif" width="27" height="27" alt="Twitter" border="0" class="CToWUd"></a></td>'
                                                        str += '<td width="6"></td>'
//str += '<td width="27"><a href="https://plus.google.com/+quikr/posts" target="_blank" data-saferedirecturl="https://www.google.com/url?hl=en&amp;q=https://plus.google.com/%2Bquikr/posts&amp;source=gmail&amp;ust=1475126531256000&amp;usg=AFQjCNH34dG7EE2PQvyXk6GHHDu8C7xZsw"> <img src="https://ci5.googleusercontent.com/proxy/JWOM6gpkJkpx5WtEU6luaSLj9wTHjhX2ZsLlMb7VmNZGdC4MM4bzHS3fWh9vW2mUdSGwLLBfzsZkEAR1r1zGI_mdTFcYdigXjos=s0-d-e1-ft#http://teja1.kuikr.com/images/notification/gplus.gif" width="27" height="27" alt="Google Plus" border="0" class="CToWUd"></a></td>'
                                                        str += '<td width="6"></td>'
//str += '<td width="27"><a href="https://in.linkedin.com/company/quikr" target="_blank" data-saferedirecturl="https://www.google.com/url?hl=en&amp;q=https://in.linkedin.com/company/quikr&amp;source=gmail&amp;ust=1475126531256000&amp;usg=AFQjCNFELOpY7CxqlBpzcxV4zE3Q-zuLEg"> <img src="https://ci5.googleusercontent.com/proxy/J7nVG4QamWGB0KgULYFsxyHgU-mCj6iRRb5ZM3GpY7ur_NYcGewlc6FdWBOIhinuQmhh0NIph9_VRXfaUB_8TJueKZ5KJIx8-V21PC0=s0-d-e1-ft#http://teja1.kuikr.com/images/notification/linkedin.gif" width="27" height="27" alt="Linkedin" border="0" class="CToWUd"></a></td>'
                                                        str += '<td width="6"></td>'
//str += '<td width="27"><a href="https://www.youtube.com/user/quikrclassifieds" target="_blank" data-saferedirecturl="https://www.google.com/url?hl=en&amp;q=https://www.youtube.com/user/quikrclassifieds&amp;source=gmail&amp;ust=1475126531256000&amp;usg=AFQjCNFy7PJK2FlVFKZ8OnDVCAgof1lwcQ"> <img src="https://ci5.googleusercontent.com/proxy/2m9M-EzibEYfrP6aGS7E7ZLI_hTkO-sL6dIT3M3ioVohlP1kYhfIRXrPgA-Zm1owNOFiaeIjGIGhU9xXe4ioOant3vIOXzjUwIKVwQ=s0-d-e1-ft#http://teja1.kuikr.com/images/notification/youtube.gif" width="27" height="27" alt="Youtube" border="0" class="CToWUd"></a></td>'
                                                        str += '</tr>'
                                                        str += '</tbody></table></td>'
                                                        str += '</tr>'
                                                        str += '<tr>'
                                                        str += '<td height="9"></td>'
                                                        str += '</tr>'
                                                        str += '<tr>'
                                                        str += '<td align="center" style="font-size:11px;font-family:"Open Sans",Gill Sans,Arial,Helvetica,sans-serif;color:#444444"><p style="margin:0;padding:3px 0 0px;font-size:11px;font-family:"Open Sans",Gill Sans,Arial,Helvetica,sans-serif;line-height:13px">You are receiving this mail from EPardesh Team.</p>'
                                                        str += '<p style="margin:0;padding:3px 0;font-size:11px;font-family:"Open Sans",Gill Sans,Arial,Helvetica,sans-serif;line-height:13px">For any assistance, visit our <a href=' + matrimony_url + ' style="font-size:11px;font-family:"Open Sans",Gill Sans,Arial,Helvetica,sans-serif;color:#007ebc;text-decoration:none" target="_blank" data-saferedirecturl=' + matrimony_url + '>Help center</a> or write to us at <a href=' + matrimony_url + ' style="font-size:11px;font-family:"Open Sans",Gill Sans,Arial,Helvetica,sans-serif;color:#008bcf;text-decoration:none" target="_blank">support@epardesh.com.</a></p></td>'
                                                        str += '</tr>'
                                                        str += '<tr>'
                                                        str += '<td align="center" style="font-size:11px;font-family:"Open Sans",Gill Sans,Arial,Helvetica,sans-serif;color:#008bcf;line-height:13px">© <a href=' + matrimony_url + ' target="_blank" data-saferedirecturl=' + matrimony_url + '>www.EPardesh.com</a></td>'
                                                        str += '</tr>'
                                                        str += '</tbody></table>'
                                                        str += '</div>'

                                                        var str1 = "<h2>Hi admin,</h2>";
                                                        str1 += "<p>A new user with following details has registered in EPardesh Matrimony: </p>";
                                                        str1 += "<p> Name : " + first_name + " " + last_name + "</p>"
                                                        str1 += "<p> Email : " + email + "</p>"
                                                        str1 += "<p> Profile Id : " + profile_id + "</p>"
                                                        str1 += "<p>Regards,</p>";
                                                        str1 += "<p>Team EPardesh</p>";


                                                        send_email(str, email, 'Registration Successfull');
                                                        send_email(str1, admin_email, 'New registration');


//                                                        var mailOptions = {to: email, subject: 'EPardesh: Registration Successful', html: str};
//                                                        transporter.sendMail(mailOptions, function (error, info) {
//                                                            if (error) {
//                                                                console.log("Error Found:");
//                                                                console.log(error);
//                                                                //throw err;
//                                                                //return console.log(error);
//                                                            } else {
//                                                                console.log('Message sent: ');
//                                                            }
//                                                        });
                                                        var data = {
                                                            id: result_user[0].id,
                                                            profile_id: profile_id,
                                                            email: result_user[0].email,
                                                            access_token: result_user[0].access_token,
                                                            first_name: result_user[0].first_name,
                                                            last_name: result_user[0].last_name,
                                                            mobile: result_user[0].mobile,
                                                        }
                                                        sendResponse.sendSuccessData(data, res);

                                                    }
                                                })
                                            }
                                        })
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
 * change_password
 * INPUT : old_password,new_password, access_token
 * ---------------------------------------------------------------------------
 */
router.post('/change_matrimony_password', function (req, res, next) {
    var old_password = req.body.old_password;
    var new_password = req.body.new_password;
    var token = req.body.access_token;
    var manValues = [old_password, new_password, token];
    async.waterfall([
        function (callback) {
            func.checkBlank(res, manValues, callback);
        }
    ], function () {
        var encrypt_old_password = md5(old_password);
        var encrypt_new_password = md5(new_password);
        var sql = "SELECT access_token, password FROM matrimony_user where access_token=?";
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
                        var sql = "update matrimony_user set password = ? where access_token = ?";
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
            ;
        });
    })
});
/*
 * --------------------------------------------------------------------------
 * forgot_password
 * INPUT : email
 * ---------------------------------------------------------------------------
 */
router.post('/forgot_matrimony_password', function (req, res, next) {
    var email = req.body.email;
    var manValues = [email];
    async.waterfall([
        function (callback) {
            func.checkBlank(res, manValues, callback);
        }
    ], function (err, updatePopup, critical) {
        var sql1 = "select * from matrimony_user where email=?";
        var values1 = [email]
        connection.query(sql1, values1, function (err, rows) {
            if (err) {
                console.log(err)
                var Msg = 'something went wrong';
                sendResponse.sendErrorMessage(Msg, res);
            } else {
                console.log(rows.length)
                if (rows.length != 0) {
                    var loginTime = new Date();
                    var activation_code = func.encrypt(email + loginTime);
//                    var str = "<p>Hi,</p>";
//                    str += "<p>We have received a password change request for your account.</p>";
//                    str += "<p>If you made this request, then please click the below link to reset your password.</p>";
//                    str += "<a href=" + matrimony_url + "mupdate-password/" + activation_code + ">Click Here</a>";
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
                    str += '<td style="font-size:20px;padding:0px 30px;color:#444444;font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif">Dear User,</td>'
                    str += '</tr>'
                    str += '<tr>'
                    str += '<td height="10"></td>'
                    str += '</tr>'
                    str += '<tr>'
                    str += '<td style="padding-bottom:10px;padding:0px 30px;font-size:12px;color:#444444;line-height:19px;font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif">We have received a password change request for your account.If you made this request, then please click the below link to reset your password. </td>'
                    str += '</tr>'
                    str += '<tr>'
                    str += "<a href=" + matrimony_url + "mupdate-password/" + activation_code + ">Click Here</a>";
                    str += '</tr>'
                    str += '<tr>'
                    str += '<td style="padding-top:10px;padding:0px 30px;font-size:12px;color:#444444;line-height:19px;font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif">If you did not ask to change your password, then please ignore this email. Another user may have entered your email by mistake. No changes will be made to your account.</td>'
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
                            var errorMsg = 'some error occurred';
                            console.log(error)
                        } else {
                            console.log('Message sent: ');
                        }
                    });
                    var sql = "update matrimony_user set activation_code = ? where email = ?";
                    var values = [activation_code, email];
                    connection.query(sql, values, function (userInsertResult) {
                        var Msg = {};
                        sendResponse.sendSuccessData(Msg, res);
                    })
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
router.post('/update_matrimony_password', function (req, res, next) {
    var activation_code = req.body.activation_code;
    var new_password = req.body.new_password;
    console.log(activation_code)
    console.log(new_password)
    var encrypt_password = md5(new_password);
    var manValues = [activation_code, encrypt_password];
    async.waterfall([
        function (callback) {
            func.checkBlank(res, manValues, callback);
        }],
            function () {
                var sql = "SELECT activation_code, password FROM matrimony_user where activation_code=?";
                var values = [activation_code];
                connection.query(sql, values, function (err, rows) {
                    if (err) {
                        var Msg = 'some error occurred';
                        sendResponse.sendErrorMessage(Msg, res);
                    } else {
                        console.log("in update password");
                        console.log(rows.length);
                        if (rows == "") {
                            var Msg = 'Unauthorised access!';
                            sendResponse.sendErrorMessage(Msg, res);
                        } else {
                            if (activation_code == rows[0].activation_code) {
                                var loginTime = new Date();
                                var code = func.encrypt(activation_code + loginTime);
                                var sql = "update matrimony_user set password = ? , activation_code = ? where activation_code = ?";
                                var values = [encrypt_password, code, activation_code];
                                connection.query(sql, values, function (err, userInsertResult) {
                                    if (err) {
                                        console.log("err in update")
                                        console.log(err)
                                        var Msg = 'Unauthorised access!';
                                        sendResponse.sendErrorMessage(Msg, res);
                                    } else {
                                        var Msg = {}
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
 * update_user_profile
 * ---------------------------------------------------------------------------
 */

router.post('/update_matrimony_user_profile', function (req, res, next) {
    var status = req.body.status;
    var access_token = req.body.access_token;
    var id = req.body.id;
    var manValues = [status, access_token, id];
    async.waterfall([
        function (callback) {
            func.checkBlank(res, manValues, callback);
        },
        function (callback) {
            checkUser(res, access_token, callback);
        }],
            function () {
                if (status == 1 || status == '1') {
                    var about_me = req.body.about_me;
                    var profile_picture = req.body.profile_picture;
                    var relevant_picture = req.body.relevant_picture;
                    var profile_created_by = req.body.profile_created_by;
                    //var gender = req.body.gender;
                    var date_of_birth = req.body.date_of_birth;
                    if (date_of_birth == null || date_of_birth == '') {
                        var age = null;
                        var isoDate = null;
                    } else {
                        var age = getAge(date_of_birth);
                        var isoDate = new Date(date_of_birth).toISOString();
                    }
                    var martial_status = req.body.martial_status;
                    var height = req.body.height;
                    var height_in_cm = req.body.height_in_cm;
                    var nationality = req.body.nationality;
                    var current_residence = req.body.current_residence;
                    var body_type = req.body.body_type;
                    var health_information = req.body.health_information;
                    var diet = req.body.diet;
                    var skin_tone = req.body.skin_tone;
                    var any_disability = req.body.any_disability;
                    var blood_group = req.body.blood_group;
                    var drink = req.body.drink;
                    var smoke = req.body.smoke;
                    var nakshatra = req.body.nakshatra;
                    var gana = req.body.gana;
                    var manglik = req.body.manglik;
                    var social_links = req.body.social_links;
                    var professional_links = req.body.professional_links;
                    var horoscope = req.body.horoscope;
                    var mobile_privacy = req.body.mobile_privacy;
                    var email_privacy = req.body.email_privacy;
                    var connection_links_privacy = req.body.connection_links_privacy;
                    var horoscope_privacy = req.body.horoscope_privacy;
                    var sql = "UPDATE matrimony_user SET about_me=?,profile_picture=?,relevant_picture=?,profile_created_by=?,date_of_birth=?,age=?,martial_status=?,height=?,height_in_cm=?,nationality=?,current_residence=?,body_type=?,health_information=?,diet=?,skin_tone=?,any_disability=?,blood_group=?,drink=?,smoke=?,nakshatra=?,gana=?,manglik=?,social_links=?,professional_links=?,horoscope=?,mobile_privacy=?,email_privacy=?,connection_links_privacy=?,horoscope_privacy=? WHERE id=?;";
                    var values = [about_me, profile_picture, relevant_picture, profile_created_by, date_of_birth, age, martial_status, height, height_in_cm, nationality, current_residence, body_type, health_information, diet, skin_tone, any_disability, blood_group, drink, smoke, nakshatra, gana, manglik, social_links, professional_links, horoscope, mobile_privacy, email_privacy, connection_links_privacy, horoscope_privacy, id];
                    connection.query(sql, values, function (err, rows) {
                        if (err) {
                            console.log(err)
                            var Msg = 'some error occurred';
                            sendResponse.sendErrorMessage(Msg, res);
                        } else {
                            if (profile_created_by != null && date_of_birth != null && martial_status != null && height != null && nationality != null && current_residence != null && body_type != null && health_information != null && diet != null && skin_tone != null && any_disability != null && blood_group != null && drink != null && smoke != null && social_links != null && professional_links != null && horoscope != null) {
                                var update_profile_completion_percentage = "UPDATE matrimony_user SET profile_completed_percentage = profile_completed_percentage+20 , basic_info_completion_status =1 WHERE id=? and basic_info_completion_status != 1;";
                                var profile_completion_percentage_values = [id];
                                connection.query(update_profile_completion_percentage, profile_completion_percentage_values, function (err, rows1) {
                                    if (err) {
                                        console.log(err)
                                        var Msg = 'some error occurred';
                                        sendResponse.sendErrorMessage(Msg, res);
                                    } else {
                                    }
                                })
                            }
                            if (profile_picture != null && relevant_picture != null) {
                                var update_profile_completion_percentage = "UPDATE matrimony_user SET profile_completed_percentage = profile_completed_percentage+10 , image_upload_status =1 WHERE id=? and image_upload_status != 1;";
                                var profile_completion_percentage_values = [id];
                                connection.query(update_profile_completion_percentage, profile_completion_percentage_values, function (err, rows2) {
                                    if (err) {
                                        console.log(err)
                                        var Msg = 'some error occurred';
                                        sendResponse.sendErrorMessage(Msg, res);
                                    } else {
                                    }
                                })
                            }
                            var data = {}
                            sendResponse.sendSuccessData(data, res);
                        }
                    })
                } else if (status == 2 || status == '2') {
                    var religion = req.body.religion;
                    var mother_tounge = req.body.mother_tounge;
                    var community = req.body.community;
                    var sql = "UPDATE matrimony_user SET religion=?,mother_tounge=?,community=? WHERE id=?;";
                    var values = [religion, mother_tounge, community, id];
                    connection.query(sql, values, function (err, rows) {
                        if (err) {
                            console.log(err)
                            var Msg = 'some error occurred';
                            sendResponse.sendErrorMessage(Msg, res);
                        } else {
                            if (religion != null && mother_tounge != null && community != null) {
                                var update_profile_completion_percentage = "UPDATE matrimony_user SET profile_completed_percentage = profile_completed_percentage+10 , religious_background_completion_status =1 WHERE id=? and religious_background_completion_status != 1;";
                                var profile_completion_percentage_values = [id];
                                connection.query(update_profile_completion_percentage, profile_completion_percentage_values, function (err, rows1) {
                                    if (err) {
                                        console.log(err)
                                        var Msg = 'some error occurred';
                                        sendResponse.sendErrorMessage(Msg, res);
                                    } else {
                                    }
                                })
                            }
                            var data = {}
                            sendResponse.sendSuccessData(data, res);
                        }
                    })
                } else if (status == 3 || status == '3') {
                    var father_status = req.body.father_status;
                    var mother_status = req.body.mother_status;
                    var family_location = req.body.family_location;
                    var family_type = req.body.family_type;
                    var family_values = req.body.family_values;
                    var affluence_level = req.body.affluence_level;
                    var sql = "UPDATE matrimony_user SET father_status=?,mother_status=?,family_location=?,family_type=?,family_values=?,affluence_level=? WHERE id=?;";
                    var values = [father_status, mother_status, family_location, family_type, family_values, affluence_level, id];
                    connection.query(sql, values, function (err, rows) {
                        if (err) {
                            console.log(err)
                            var Msg = 'some error occurred';
                            sendResponse.sendErrorMessage(Msg, res);
                        } else {
                            if (father_status != null && mother_status != null && family_location != null && family_type != null && family_values != null && affluence_level != null) {
                                var update_profile_completion_percentage = "UPDATE matrimony_user SET profile_completed_percentage = profile_completed_percentage+10 , family_completion_status =1 WHERE id=? and family_completion_status != 1";
                                var profile_completion_percentage_values = [id];
                                connection.query(update_profile_completion_percentage, profile_completion_percentage_values, function (err, rows1) {
                                    if (err) {
                                        console.log(err)
                                        var Msg = 'some error occurred';
                                        sendResponse.sendErrorMessage(Msg, res);
                                    } else {
                                    }
                                })
                            }
                            var data = {}
                            sendResponse.sendSuccessData(data, res);
                        }
                    })
                } else if (status == 4 || status == '4') {
                    var education = req.body.education;
                    var annual_income = req.body.annual_income;
                    var employer_name = req.body.employer_name;
                    var working_with = req.body.working_with;
                    var working_as = req.body.working_as;
                    var major_subject = req.body.major_subject;
                    var year_of_passing = req.body.year_of_passing;
                    var sql = "UPDATE matrimony_user SET education=?,annual_income=?,employer_name=?,working_with=?,working_as=?,major_subject=?,year_of_passing=? WHERE id=?;";
                    var values = [education, annual_income, employer_name, working_with, working_as, major_subject, year_of_passing, id];
                    connection.query(sql, values, function (err, rows) {
                        if (err) {
                            console.log(err)
                            var Msg = 'some error occurred';
                            sendResponse.sendErrorMessage(Msg, res);
                        } else {
                            if (education != null && annual_income != null && working_with != null && working_as != null) {
                                var update_profile_completion_percentage = "UPDATE matrimony_user SET profile_completed_percentage = profile_completed_percentage+10 , education_career_completiopn_status =1 WHERE id=? and education_career_completiopn_status != 1";
                                var profile_completion_percentage_values = [id];
                                connection.query(update_profile_completion_percentage, profile_completion_percentage_values, function (err, rows1) {
                                    if (err) {
                                        console.log(err)
                                        var Msg = 'some error occurred';
                                        sendResponse.sendErrorMessage(Msg, res);
                                    } else {
                                    }
                                })
                            }
                            var data = {}
                            sendResponse.sendSuccessData(data, res);
                        }
                    })
                }
                var str = "<h2>Hi admin,</h2>";
                str += "<p>A user with User Id " + id + " has updated his profile </p>";
                str += "<p>Regards,</p>";
                str += "<p>Team EPardesh</p>";
                var mailOptions = {to: "newprofiles@epardesh.com", subject: 'ePardesh: Profile Updated', html: str};
                transporter.sendMail(mailOptions, function (error, info) {
                    if (error) {
                        console.log("Error Found:");
                        console.log(error);
                    } else {
                        console.log('Message sent: ');
                    }
                });
            });
});

/*
 * --------------------------------------------------------------------------
 * update_matrimony_partner_preferences
 * ---------------------------------------------------------------------------
 */
router.post('/update_matrimony_partner_preferences', function (req, res, next) {
    var status = req.body.status;
    var access_token = req.body.access_token;
    var id = req.body.id;
    var manValues = [status, access_token, id];
    async.waterfall([
        function (callback) {
            func.checkBlank(res, manValues, callback);
        },
        function (callback) {
            checkUser(res, access_token, callback);
        }],
            function () {
                if (status == 1 || status == '1') {
                    var min_age = req.body.min_age;
                    var max_age = req.body.max_age;
                    var martial_status = req.body.martial_status;
                    var min_height = req.body.min_height;
                    var min_height_in_cm = req.body.min_height_in_cm;
                    var max_height = req.body.max_height;
                    var max_height_in_cm = req.body.max_height_in_cm;
                    var body_type = req.body.body_type;
                    var skin_tone = req.body.skin_tone;
                    var sql = "UPDATE matrimony_partner_preferences SET min_age=?,max_age=?,martial_status=?,min_height=?,min_height_in_cm=?,max_height=?,max_height_in_cm=?,body_type=?,skin_tone=? WHERE user_id=?;";
                    var values = [min_age, max_age, martial_status, min_height, min_height_in_cm, max_height, max_height_in_cm, body_type, skin_tone, id];
                    connection.query(sql, values, function (err, rows) {
                        if (err) {
                            console.log(err)
                            var Msg = 'some error occurred';
                            sendResponse.sendErrorMessage(Msg, res);
                        } else {
                            var data = {}
                            sendResponse.sendSuccessData(data, res);
                        }
                    })
                } else if (status == 2 || status == '2') {
                    var religion = req.body.religion;
                    var community = req.body.community;
                    var sql = "UPDATE matrimony_partner_preferences SET religion=?,community=? WHERE user_id=?;";
                    var values = [religion, community, id];
                    connection.query(sql, values, function (err, rows) {
                        if (err) {
                            console.log(err)
                            var Msg = 'some error occurred';
                            sendResponse.sendErrorMessage(Msg, res);
                        } else {
                            var data = {}
                            sendResponse.sendSuccessData(data, res);
                        }
                    })
                } else if (status == 3 || status == '3') {
                    var father_status = req.body.father_status;
                    var family_values = req.body.family_values;
                    var affluence_level = req.body.affluence_level;
                    var sql = "UPDATE matrimony_partner_preferences SET father_status=?,family_values=?,affluence_level=? WHERE user_id=?;";
                    var values = [father_status, family_values, affluence_level, id];
                    connection.query(sql, values, function (err, rows) {
                        if (err) {
                            console.log(err)
                            var Msg = 'some error occurred';
                            sendResponse.sendErrorMessage(Msg, res);
                        } else {
                            var data = {}
                            sendResponse.sendSuccessData(data, res);
                        }
                    })
                } else if (status == 4 || status == '4') {
                    var education = req.body.education;
                    var annual_income = req.body.annual_income;
                    var sql = "UPDATE matrimony_partner_preferences SET education=?,annual_income=? WHERE user_id=?;";
                    var values = [education, annual_income, id];
                    connection.query(sql, values, function (err, rows) {
                        if (err) {
                            console.log(err)
                            var Msg = 'some error occurred';
                            sendResponse.sendErrorMessage(Msg, res);
                        } else {
                            var data = {}
                            sendResponse.sendSuccessData(data, res);
                        }
                    })
                }
            });
});

/*
 * --------------------------------------------------------------------------
 * view_my_profile
 * --------------------------------------------------------------------------
 */
router.post('/view_my_profile', function (req, res, next) {
    var user_id = req.body.user_id;
    var access_token = req.body.access_token;
    var manValues = [user_id, access_token]
    async.waterfall([
        function (callback) {
            func.checkBlank(res, manValues, callback);
        },
        function (callback) {
            checkUser(res, access_token, callback);
        }],
            function () {
                var get_data = "select * from matrimony_user where id=?";
                var values = [user_id];
                connection.query(get_data, values, function (err, rows) {
                    if (err) {
                        console.log(err)
                        var errorMsg = 'some error occurred';
                        sendResponse.sendErrorMessage(errorMsg, res);
                    } else {
                        if (rows.length > 0) {
                            sendResponse.sendSuccessData(rows, res);
                        } else {
                            var errorMsg = 'invalid user id';
                            sendResponse.sendErrorMessage(errorMsg, res);
                        }
                    }
                });
            })
});
/*
 * --------------------------------------------------------------------------
 * view_partner_preferences
 * --------------------------------------------------------------------------
 */
router.post('/view_partner_preferences', function (req, res, next) {
    var user_id = req.body.user_id;
    var access_token = req.body.access_token;
    var manValues = [user_id, access_token]
    async.waterfall([
        function (callback) {
            func.checkBlank(res, manValues, callback);
        },
        function (callback) {
            checkUser(res, access_token, callback);
        }],
            function () {
                var get_data = "select * from matrimony_partner_preferences where user_id=?";
                var values = [user_id];
                connection.query(get_data, values, function (err, rows) {
                    if (err) {
                        console.log(err)
                        var errorMsg = 'some error occurred';
                        sendResponse.sendErrorMessage(errorMsg, res);
                    } else {
                        if (rows.length > 0) {
                            sendResponse.sendSuccessData(rows, res);
                        } else {
                            var errorMsg = 'invalid user id';
                            sendResponse.sendErrorMessage(errorMsg, res);
                        }
                    }
                });
            })
});
/*
 * --------------------------------------------------------------------------
 * upgrade_plan
 * --------------------------------------------------------------------------
 */
router.post('/upgrade_plan', function (req, res, next) {
    var id = req.body.id;
    var user_email = req.body.user_email;
    var user_first_name = req.body.user_first_name;
    var plan = req.body.plan;
    var access_token = req.body.access_token;
    var txn_id = req.body.txn_id;
    var current_date = new Date();
    if (plan == '4' || plan == 4 || plan == '7' || plan == 7 || plan == '1' || plan == 1) {
        var expiry_date = date.addDays(current_date, 30);
    } else if (plan == '5' || plan == 5 || plan == '8' || plan == 8 || plan == '2' || plan == 2) {
        var expiry_date = date.addDays(current_date, 90);
    } else if (plan == '6' || plan == 6 || plan == '9' || plan == 9 || plan == '3' || plan == 3) {
        var expiry_date = date.addDays(current_date, 180);
    }
    var manValues = [id, access_token]
    async.waterfall([
        function (callback) {
            func.checkBlank(res, manValues, callback);
        },
        function (callback) {
            checkUser(res, access_token, callback);
        }],
            function () {
                var update = "update matrimony_user set membership_plan=?, transaction_id=?,plan_activation_date=?,plan_expiration_date=? where id=?";
                var values = [plan, txn_id, current_date, expiry_date, id];
                connection.query(update, values, function (err, rows) {
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
                        str += '<td style="font-size:20px;padding:0px 30px;color:#444444;font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif">Dear ' + user_first_name + ',</td>'
                        str += '</tr>'
                        str += '<tr>'
                        str += '<td height="10"></td>'
                        str += '</tr>'
                        str += '<tr>'
                        str += '<td style="padding-bottom:10px;padding:0px 30px;font-size:12px;color:#444444;line-height:19px;font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif">Your plan has been updated successfully. </td>'
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

                        var mailOptions = {to: user_email, subject: 'Plan upgraded', html: str};
                        transporter.sendMail(mailOptions, function (error, info) {
                            if (error) {
                                var errorMsg = 'some error occurred';
                                console.log('in error')
                                console.log(error)
                            } else {
                                console.log('Message sent: ');
                            }
                        });
                        var msg = {}
                        sendResponse.sendSuccessData(msg, res);
                    }
                });
            })
});
/*
 * --------------------------------------------------------------------------
 * matrimony_check_email
 * INPUT : email
 * ---------------------------------------------------------------------------
 */
router.post('/matrimony_check_email', function (req, res, next) {
    var email = req.body.email;
    var manValues = [email];
    async.waterfall([
        function (callback) {
            func.checkBlank(res, manValues, callback);
        }],
            function () {
                var sql = "SELECT * FROM matrimony_user WHERE `email`= ? ";
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
 * matrimony_report_spam
 * INPUT : email
 * ---------------------------------------------------------------------------
 */
router.post('/matrimony_report_spam', function (req, res, next) {
    var report_from = req.body.report_from;
    var report_to = req.body.report_to;
    var message = req.body.message;
    var str = "<p>Hi, admin</p>";
    str += "<p>A user with email:" + report_from + " has reported one profile with email " + report_to + " as spam.</p>";
    str += "<p>Reason: " + message + " </p>";
    str += "<p>Regards,</p>";
    str += "<p>Team EPardesh</p>";
    var mailOptions = {to: 'deepakssit022@gmail.com', subject: 'Reported as spam', html: str};
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            var errorMsg = 'some error occurred';
            console.log('in error')
            console.log(error)
        } else {
            console.log('Message sent: ');
            var msg = {}
            sendResponse.sendSuccessData(msg, res);
        }
    });
});
function getRandom(min, max) {
    return Math.random() * (max - min) + min;
}

function getAge(dateString)
{
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate()))
    {
        age--;
    }
    return age;
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


/*
 * --------------------------------------------------------------------------
 * to check email already exists or not
 * ---------------------------------------------------------------------------
 */
function check_email_availability(res, email, callback) {
    var sql = "SELECT `email` FROM `matrimony_user` WHERE `email`=? limit 1";
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
    var sql = "SELECT * FROM `matrimony_user` WHERE `email`=? limit 1";
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
 * --------------------------------------------------------------------------
 * to send email
 * ---------------------------------------------------------------------------
 */
function send_email(email_data, email, subject, callback) {

    var mailOptions = {to: email, subject: subject, html: email_data};
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('in send_email function')
            return true;
        }
    })
}

module.exports = router;
