var express = require('express');
var router = express.Router();
var async = require('async');
var md5 = require('md5');
var request = require('request');
var func = require('../../commonfunction');
var sendResponse = require('../../sendresponse');
var date = require('date-and-time');
var admin_email = 'newads@epardesh.com';

/*
 * --------------------------------------------------------------------------
 * add_it_training
 * ---------------------------------------------------------------------------
 */

router.post('/add_it_training', function(req, res, next) {

    var access_token = req.body.access_token;
    var training_user_id = req.body.training_user_id;
    var training_course = req.body.training_course;
    var training_tittle = req.body.training_tittle;
    var training_plan_id = req.body.training_plan_id;
    var training_course_type = req.body.training_course_type;
    var training_course_url = req.body.training_course_url;
    var training_course_address = req.body.training_course_address;
    var training_lattitude = req.body.training_lattitude;
    var training_longitude = req.body.training_longitude;
    var training_start_date = req.body.training_start_date;
    var training_start_time = req.body.training_start_time;
    var training_end_date = req.body.training_end_date;
    var training_end_time = req.body.training_end_time;
    var timezone = req.body.timezone;
    var training_image = req.body.training_image;
    var training_provider = req.body.training_provider;
    var training_fee_min = req.body.training_fee_min;
    var training_fee_max = req.body.training_fee_max;
    var training_description = req.body.training_description;
    var training_phone = req.body.training_phone;
    var training_email = req.body.training_email;
    var training_batch = req.body.training_batch;
    var date_posted = new Date();
    async.waterfall([
        function(callback) {
            checkUser(res, access_token, callback);
        }],
            function() {
                if (training_plan_id == 0) {
                    var approved_status = 0;
                    var add_training_query = "insert into epardesh_training (user_id,training_course,training_tittle,training_plan,training_course_type,training_course_url,training_course_address,training_lattitude,training_longitude,training_start_date,training_start_time,training_end_date,training_end_time,timezone,training_image,training_provider,training_fee_min,training_fee_max,training_description,training_phone,training_email,training_batch,date_posted,approved_status) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
                    var values = [training_user_id, training_course, training_tittle, training_plan_id, training_course_type, training_course_url, training_course_address, training_lattitude, training_longitude, training_start_date, training_start_time, training_end_date, training_end_time, timezone, training_image, training_provider, training_fee_min, training_fee_max, training_description, training_phone, training_email, training_batch, date_posted, approved_status]
                    connection.query(add_training_query, values, function(err, rows) {
                        if (err) {
                            console.log(err)
                            var errorMsg = 'some error occurred';
                            sendResponse.sendErrorMessage(errorMsg, res);
                        } else {

                            var get_email = "SELECT * FROM user where id=?";
                            var values = [training_user_id]
                            connection.query(get_email, values, function(err, rows) {
                                if (err)
                                {
                                    console.log(err)
                                    var errorMsg = 'some error occurred';
                                    sendResponse.sendErrorMessage(errorMsg, res);
                                } else {
                                    if (rows.length > '0' || rows.length > 0) {
                                        var email = rows[0].email;
                                        var user_first_name = rows[0].first_name;
                                        var get_training_id = "SELECT * FROM epardesh_training order by id desc limit 1";
                                        connection.query(get_training_id, function(err, rows1) {
                                            if (err)
                                            {
                                                var errorMsg = 'some error occurred';
                                                sendResponse.sendErrorMessage(errorMsg, res);
                                            } else {
                                                if (rows.length > '0' || rows.length > 0) {
                                                    var training_id = rows1[0].id;
                                                    str = '<div style="margin:0;padding:0;font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif">'
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
                                                    str += '<td align="center"><img src="https://ci3.googleusercontent.com/proxy/tVvN5RW66MgOQ1x6Q-O75sxBy8ExbyBBD7VbbSZqkZ4AtjlqtlEO31-s6u0Fa8KXkyNHCgSn1QUiuNbZkUgrgE71IhhAm5qz3lvZJ20ZxTw=s0-d-e1-ft#http://teja1.kuikr.com/images/notification/VerifyEmail.png" width="73" height="73" border="0" alt="Approve your IT Training" style="margin:0;display:block" class="CToWUd"></td>'
                                                    str += '</tr>'
                                                    str += '<tr>'
                                                    str += '<td align="center" style="font-size:25px;color:#333333;padding:10px 20px 0px;font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif">Activate Your IT Training</td>'
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
                                                    str += '<td style="font-size:12px;padding:0px 30px;color:#444444;line-height:19px;font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif">Just click the button below (it only takes a couple of seconds). You won’t be asked to log in as its simply a confirmation of the IT Training posted by you. </td>'
                                                    str += '</tr>'
                                                    str += '<tr>'
                                                    str += '<td height="20"></td>'
                                                    str += '</tr>'
                                                    str += '<tr>'
                                                    str += '<td align="center">'
                                                    str += '<table width="185" cellpadding="0" cellspacing="0" border="0">'
                                                    str += '<tbody><tr>'
                                                    str += '<td align="center" bgcolor="#008BCF" height="45" style="border-radius:3px">'
                                                    str += '<a href=' + classified_url + "ad_approve/" + training_id + '/3 style="display:block;color:#ffffff;text-decoration:none;font-size:14px;text-align:center;font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif;font-weight:bold;line-height:45px" target="_blank" data-saferedirecturl="' + classified_url + '">Activate IT Training</a>'
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
                                                    str += '<td width="85%" style="color:#1688c8;font-size:12px;font-family:"Open Sans",Gill Sans,Arial,Helvetica,sans-serif;vertical-align:top"><p style="padding:0px 0 0 0;margin:0;color:#444444;font-weight:600;font-size:16px;font-family:"Open Sans",Gill Sans,Arial,Helvetica,sans-serif">WHY ACTIVATE?</p>'
                                                    str += '<p style="padding:0;margin:0;color:#444444;font-size:12px;font-family:"Open Sans",Gill Sans,Arial,Helvetica,sans-serif">Activating your IT Training lets others see all your IT Training.</p></td>'
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
                                                    str += '<p style="padding:0;margin:0;color:#444444;font-size:12px;font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif">If above button is not working then Actiavte your IT Training by pasting the below link into your browser:</p>'
                                                    str += '<p style="padding:0;margin:0;color:#444444;font-size:12px;font-family:"Open Sans",Gill Sans,Arial,Helvetica,sans-serif"><a href=' + classified_url + "ad_approve/" + training_id + '/3 style="text-decoration:none;color:#008bcf;display:block;word-break:break-all" target="_blank" data-saferedirecturl=' + classified_url + "ad_approve/" + training_id + '/3>' + classified_url + "ad_approve/" + training_id + '/3 </a></p>'
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
                                                    str += '<p style="margin:0;padding:3px 0;font-size:11px;font-family:"Open Sans",Gill Sans,Arial,Helvetica,sans-serif;line-height:13px">For any assistance, visit the below website <a href=' + classified_url + ' style="font-size:11px;font-family:"Open Sans",Gill Sans,Arial,Helvetica,sans-serif;color:#007ebc;text-decoration:none" target="_blank" data-saferedirecturl=' + classified_url + '></a><a href=' + classified_url + ' style="font-size:11px;font-family:"Open Sans",Gill Sans,Arial,Helvetica,sans-serif;color:#008bcf;text-decoration:none" target="_blank"></a></p></td>'
                                                    str += '</tr>'
                                                    str += '<tr>'
                                                    str += '<td align="center" style="font-size:11px;font-family:"Open Sans",Gill Sans,Arial,Helvetica,sans-serif;color:#008bcf;line-height:13px">© <a href=' + classified_url + ' target="_blank" data-saferedirecturl=' + classified_url + '>www.EPardesh.com</a></td>'
                                                    str += '</tr>'
                                                    str += '</tbody></table>'
                                                    str += '</div>'


                                                    var str1 = "<h2>Hi admin,</h2>";
                                                    str1 += "<p>A new IT-Training AD has been posted with following details: </p>";
                                                    str1 += "<p> User id : " + training_user_id + "</p>"
                                                    str1 += "<p> IT-Training Title : " + training_tittle + "</p>"
                                                    str1 += "<p> plan : " + training_plan_id + "</p>"
                                                    str1 += "<p>Regards,</p>";
                                                    str1 += "<p>Team EPardesh</p>";

                                                    send_email(str, email, 'EPardesh : Activate IT-Training');
                                                    send_email(str1, admin_email, 'EPardesh : New IT-Training posted');


                                                    var msg = {};
                                                    sendResponse.sendSuccessData(msg, res);
                                                }
                                            }
                                        })


                                    }
                                }
                            })

                        }
                    })
                } else {
                    var approved_status = 1;
                    var date_approved = new Date();
                    var expiry_date = date.addDays(date_approved, 30);
                    var add_training_query = "insert into epardesh_training (user_id,training_course,training_tittle,training_plan,training_course_type,training_course_url,training_course_address,training_lattitude,training_longitude,training_start_date,training_start_time,training_end_date,training_end_time,timezone,training_image,training_provider,training_fee_min,training_fee_max,training_description,training_phone,training_email,training_batch,date_posted,approved_status,date_approved,expiry_date) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
                    var values = [training_user_id, training_course, training_tittle, training_plan_id, training_course_type, training_course_url, training_course_address, training_lattitude, training_longitude, training_start_date, training_start_time, training_end_date, training_end_time, timezone, training_image, training_provider, training_fee_min, training_fee_max, training_description, training_phone, training_email, training_batch, date_posted, approved_status, date_approved, expiry_date]
                    connection.query(add_training_query, values, function(err, rows) {
                        if (err) {
                            console.log(err)
                            var errorMsg = 'some error occurred';
                            sendResponse.sendErrorMessage(errorMsg, res);
                        } else {
                            var get_email = "SELECT * FROM user where id=?";
                            var values = [training_user_id]
                            connection.query(get_email, values, function(err, rows) {
                                if (err)
                                {
                                    var errorMsg = 'some error occurred';
                                    sendResponse.sendErrorMessage(errorMsg, res);
                                } else {
                                    if (rows.length > '0' || rows.length > 0) {
                                        var email = rows[0].email;
                                        var user_first_name = rows[0].first_name;
                                        var get_training_id = "SELECT * FROM epardesh_training order by id desc limit 1";
                                        connection.query(get_training_id, function(err, rows1) {
                                            if (err)
                                            {
                                                var errorMsg = 'some error occurred';
                                                sendResponse.sendErrorMessage(errorMsg, res);
                                            } else {
                                                if (rows1.length > '0' || rows1.length > 0) {
                                                    var training_id = rows1[0].id;

//                                                    str = '<div style="margin:0;padding:0;font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif">'
//                                                    str += '<table width="100%" cellpadding="0" cellspacing="0" border="0" align="center" style="font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif;max-width:600px;background-color:#ffffff;color:#666666;text-align:left;padding:0px 2% 10px 2%;background:url(http://teja1.kuikr.com/images/notification/mailer-bg.jpg) repeat #f9f9f9">'
//                                                    str += '<tbody><tr>'
//                                                    str += '<td height="20"></td>'
//                                                    str += '</tr>'
//                                                    str += '<tr>'
//                                                    str += '<td height="43" valign="top"><table width="100%" cellspacing="0" cellpadding="0" border="0" align="center" style="max-width:530px">'
//                                                    str += '<tbody><tr>'
//                                                    //str += '<td align="left" height="43"><a href="#m_8496668978295844378_m_8306747430853343728_m_8934663683847810844_"><img src="' + url + 'logo.jpg" alt="Epardesh" width="94" height="43" border="0" style="margin:0;display:block;font-family:Arial,Helvetica,sans-serif;color:#007ebe;font-size:20px;text-align:center;font-weight:bold" class="CToWUd"></a></td>'
//                                                    str += '<td align="left" height="43"><a href="#m_8496668978295844378_m_8306747430853343728_m_8934663683847810844_"><img src="' + url + 'logo.jpg" alt="Epardesh" width="180" border="0" style="width:220px;height:auto;margin:0;margin-left:-15px;margin-top:-20px;display:block;font-family:Arial,Helvetica,sans-serif;color:#007ebe;font-size:20px;text-align:center;font-weight:bold" class="CToWUd"></a></td>'
//
//                                                    str += '</tr>'
//                                                    str += '</tbody></table></td>'
//                                                    str += '</tr>'
//                                                    str += '<tr>'
//                                                    str += '<td height="10"></td>'
//                                                    str += '</tr>'
//                                                    str += '<tr>'
//                                                    str += '<td><table width="100%" align="center" cellspacing="0" cellpadding="0" border="0" style="max-width:530px;width:100%!important;background:#ffffff;border:1px solid #e3e3e3;border-radius:3px">'
//                                                    str += '<tbody><tr>'
//                                                    str += '<td height="20"></td>'
//                                                    str += '</tr>'
//                                                    str += '<tr>'
//                                                    str += '<td align="center"><img src="https://ci3.googleusercontent.com/proxy/tVvN5RW66MgOQ1x6Q-O75sxBy8ExbyBBD7VbbSZqkZ4AtjlqtlEO31-s6u0Fa8KXkyNHCgSn1QUiuNbZkUgrgE71IhhAm5qz3lvZJ20ZxTw=s0-d-e1-ft#http://teja1.kuikr.com/images/notification/VerifyEmail.png" width="73" height="73" border="0" alt="IT Training Posted Successfully" style="margin:0;display:block" class="CToWUd"></td>'
//                                                    str += '</tr>'
//                                                    str += '<tr>'
//                                                    str += '<td align="center" style="font-size:25px;color:#333333;padding:10px 20px 0px;font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif">IT Training Posted Successfully</td>'
//                                                    str += '</tr>'
//                                                    str += '<tr>'
//                                                    str += '<td height="10"></td>'
//                                                    str += '</tr>'
//                                                    str += '<tr>'
//                                                    str += '<td align="center"><table width="140" align="center" border="0" cellpadding="0" cellspacing="0" bgcolor="#008BCF">'
//                                                    str += '<tbody>'
//                                                    str += '<tr>'
//                                                    str += '<td height="2" style="font-size:1px;line-height:1px"></td>'
//                                                    str += '</tr>'
//                                                    str += '</tbody>'
//                                                    str += '</table></td>'
//                                                    str += '</tr>'
//                                                    str += '<tr>'
//                                                    str += '<td height="35"></td>'
//                                                    str += '</tr>'
//                                                    str += '<tr>'
//                                                    str += '<td><table width="100%" align="center" cellspacing="0" cellpadding="0" border="0" style="padding:0px 20px;text-align:left">'
//                                                    str += '<tbody><tr>'
//                                                    str += '<td style="font-size:20px;padding:0px 30px;color:#444444;font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif">Dear ' + user_first_name + ',</td>'
//                                                    str += '</tr>'
//                                                    str += '<tr>'
//                                                    str += '<td height="10"></td>'
//                                                    str += '</tr>'
//                                                    str += '<tr>'
//                                                    str += '<td style="font-size:12px;padding:0px 30px;color:#444444;line-height:19px;font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif">Your IT Training has been successfully posted on our website. Share with everyone and accelerate your sale! </td>'
//                                                    str += '</tr>'
//                                                    str += '<tr>'
//                                                    str += '<td height="20"></td>'
//                                                    str += '</tr>'
//                                                    str += '<tr>'
//                                                    str += '<td align="center">'
//                                                    str += '<table width="185" cellpadding="0" cellspacing="0" border="0">'
//                                                    str += '<tbody><tr>'
//                                                    str += '<td align="center" bgcolor="#008BCF" height="45" style="border-radius:3px">'
//                                                    str += '<a href=' + classified_url + ' style="display:block;color:#ffffff;text-decoration:none;font-size:14px;text-align:center;font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif;font-weight:bold;line-height:45px" target="_blank" data-saferedirecturl="' + classified_url + '">Visit EPardesh</a>'
//                                                    str += '</td>'
//                                                    str += '</tr>'
//                                                    str += '</tbody></table>'
//                                                    str += '</td>'
//                                                    str += '</tr>'
//                                                    str += '<tr>'
//                                                    str += '<td height="30"></td>'
//                                                    str += '</tr>'
//                                                    str += '</tbody></table></td>'
//                                                    str += '</tr>'
//                                                    str += '<tr>'
//                                                    str += '<td height="40"></td>'
//                                                    str += '</tr>'
//                                                    str += '<tr>'
//                                                    str += '<td style="font-size:12px;padding:0px 30px;font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif;color:#444444;line-height:normal;padding:0px 20px;text-align:left"> Thank you,<br>'
//                                                    str += '<strong style="font-size:12px;font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif;color:#444444;line-height:normal">Team EPardesh </strong></td>'
//                                                    str += '</tr>'
//                                                    str += '<tr>'
//                                                    str += '<td height="20"></td>'
//                                                    str += '</tr>'
//                                                    str += '</tbody></table></td>'
//                                                    str += '</tr>'
//                                                    str += '<tr>'
//                                                    str += '<td height="10"></td>'
//                                                    str += '</tr>'
//                                                    str += '<tr>'
//                                                    str += '<td align="center" style="color:#444444;font-size:12px;font-family:"Open Sans",Gill Sans,Arial,Helvetica,sans-serif"><span style="color:#444444;font-size:12px;font-family:"Open Sans",Gill Sans,Arial,Helvetica,sans-serif">|</span><span style="color:#444444;font-size:12px;font-family:"Open Sans",Gill Sans,Arial,Helvetica,sans-serif">|</span></td>'
//                                                    str += '</tr>'
//                                                    str += '<tr>'
//                                                    str += '<td height="20"></td>'
//                                                    str += '</tr>'
//                                                    str += '<tr>'
//                                                    str += '<td align="center"><table cellpadding="0" cellspacing="0" align="center" border="0">'
//                                                    str += '<tbody><tr>'
////str += '<td width="91"><a href="https://play.google.com/store/apps/details?id=com.quikr&amp;referrer=af_tranid%3D3S99EN98WQXX6ZR3%26pid%3Dmailer" target="_blank" data-saferedirecturl="https://www.google.com/url?hl=en&amp;q=https://play.google.com/store/apps/details?id%3Dcom.quikr%26referrer%3Daf_tranid%253D3S99EN98WQXX6ZR3%2526pid%253Dmailer&amp;source=gmail&amp;ust=1475126531256000&amp;usg=AFQjCNH-eaiOtRaM4HZSx7JGGsQorMAMxg"><img src="https://ci6.googleusercontent.com/proxy/-Hu0b51rgxf_9dKZHystMtJW_jcDM3Qh7Aa8NLfWDC6YdOECUtM0a7x5_guWoleeOa0aj7DGDkli6mEtM631nXNDN6y1MjvOi4T37d2fHwTw=s0-d-e1-ft#http://teja1.kuikr.com/images/notification/android-icon.gif" width="91" height="31" alt="Android Play Store" border="0" class="CToWUd"></a></td>'
//                                                    str += '<td width="8"></td>'
////str += '<td width="91"><a href="https://itunes.apple.com/in/app/quikr-free-local-classifieds/id632051273?mt=8" target="_blank" data-saferedirecturl="https://www.google.com/url?hl=en&amp;q=https://itunes.apple.com/in/app/quikr-free-local-classifieds/id632051273?mt%3D8&amp;source=gmail&amp;ust=1475126531256000&amp;usg=AFQjCNGr4EtNQ0-mH3l80fh4yJYDbY453A"><img src="https://ci3.googleusercontent.com/proxy/Ffx1VpKrrEVkCZY4Ayd1paTDC-B_dEleDVPlMkfA6F3P3P2o6Jty0rxdTVF5NJXDG0BMeU7s9qd-UkHuIRch_aN45ISy16rA4jSWqkTJ3A=s0-d-e1-ft#http://teja1.kuikr.com/images/notification/apple-icon.gif" width="91" height="31" alt="Apple Play Store" border="0" class="CToWUd"></a></td>'
//                                                    str += '<td width="8"></td>'
////str += '<td width="91"><a href="http://www.windowsphone.com/en-us/store/app/quikr-buy-sell/6d36aa77-19a0-4adc-af15-0496dcc05557" target="_blank" data-saferedirecturl="https://www.google.com/url?hl=en&amp;q=http://www.windowsphone.com/en-us/store/app/quikr-buy-sell/6d36aa77-19a0-4adc-af15-0496dcc05557&amp;source=gmail&amp;ust=1475126531256000&amp;usg=AFQjCNFvUFIldfK_iFVdmShr1jLveqtZaA"><img src="https://ci5.googleusercontent.com/proxy/C0G_ipqnQAntQtrgN4v5sIfanWkZqo-sCF9VFb_bzDM2MK_f72G-K0NNFpeEBH60Aut7dlF9SuV0B8xBL3AyVl_j6uTBCojeMMfeBjQ93SPr=s0-d-e1-ft#http://teja1.kuikr.com/images/notification/windows-icon.gif" width="91" height="31" alt="Window Store" border="0" class="CToWUd"></a></td>'
//                                                    str += '</tr>'
//                                                    str += '</tbody></table></td>'
//                                                    str += '</tr>'
//                                                    str += '<tr>'
//                                                    str += '<td height="20"></td>'
//                                                    str += '</tr>'
//                                                    str += '<tr>'
//                                                    str += '<td align="center"><table cellpadding="0" cellspacing="0" align="center" border="0">'
//                                                    str += '<tbody><tr>'
////str += '<td width="27"><a href="https://www.facebook.com/QuikrFans" target="_blank" data-saferedirecturl="https://www.google.com/url?hl=en&amp;q=https://www.facebook.com/QuikrFans&amp;source=gmail&amp;ust=1475126531256000&amp;usg=AFQjCNEwd980Vr7okmi8Q_Sds7fP2asBaA"> <img src="https://ci5.googleusercontent.com/proxy/PAzwQYhejOBwZjcGBo03brUql2pC4PSPra0Geix2btrhLPtMDYIiDOhpxQyPTnE_4_iskm_SUFBEUOjHkBH1IXzjKDnHfua5Ze_Bcdk=s0-d-e1-ft#http://teja1.kuikr.com/images/notification/facebook.gif" width="27" height="27" alt="Facebook" border="0" class="CToWUd"></a></td>'
//                                                    str += '<td width="6"></td>'
////str += '<td width="27"><a href="https://twitter.com/Quikr" target="_blank" data-saferedirecturl="https://www.google.com/url?hl=en&amp;q=https://twitter.com/Quikr&amp;source=gmail&amp;ust=1475126531256000&amp;usg=AFQjCNHEalQFS9v-pedRt-jl2p61Swhkiw"> <img src="https://ci3.googleusercontent.com/proxy/le19J6WFI9pGDITa3WLXd7MNVpi0PL9HmyOohq6vDFDAjsoagkF_HHF6SwNgXxlk-Ombp9KtZm_5_5Gp42j2Ni0QLJBX08WjNQXcKw=s0-d-e1-ft#http://teja1.kuikr.com/images/notification/twitter.gif" width="27" height="27" alt="Twitter" border="0" class="CToWUd"></a></td>'
//                                                    str += '<td width="6"></td>'
////str += '<td width="27"><a href="https://plus.google.com/+quikr/posts" target="_blank" data-saferedirecturl="https://www.google.com/url?hl=en&amp;q=https://plus.google.com/%2Bquikr/posts&amp;source=gmail&amp;ust=1475126531256000&amp;usg=AFQjCNH34dG7EE2PQvyXk6GHHDu8C7xZsw"> <img src="https://ci5.googleusercontent.com/proxy/JWOM6gpkJkpx5WtEU6luaSLj9wTHjhX2ZsLlMb7VmNZGdC4MM4bzHS3fWh9vW2mUdSGwLLBfzsZkEAR1r1zGI_mdTFcYdigXjos=s0-d-e1-ft#http://teja1.kuikr.com/images/notification/gplus.gif" width="27" height="27" alt="Google Plus" border="0" class="CToWUd"></a></td>'
//                                                    str += '<td width="6"></td>'
////str += '<td width="27"><a href="https://in.linkedin.com/company/quikr" target="_blank" data-saferedirecturl="https://www.google.com/url?hl=en&amp;q=https://in.linkedin.com/company/quikr&amp;source=gmail&amp;ust=1475126531256000&amp;usg=AFQjCNFELOpY7CxqlBpzcxV4zE3Q-zuLEg"> <img src="https://ci5.googleusercontent.com/proxy/J7nVG4QamWGB0KgULYFsxyHgU-mCj6iRRb5ZM3GpY7ur_NYcGewlc6FdWBOIhinuQmhh0NIph9_VRXfaUB_8TJueKZ5KJIx8-V21PC0=s0-d-e1-ft#http://teja1.kuikr.com/images/notification/linkedin.gif" width="27" height="27" alt="Linkedin" border="0" class="CToWUd"></a></td>'
//                                                    str += '<td width="6"></td>'
////str += '<td width="27"><a href="https://www.youtube.com/user/quikrclassifieds" target="_blank" data-saferedirecturl="https://www.google.com/url?hl=en&amp;q=https://www.youtube.com/user/quikrclassifieds&amp;source=gmail&amp;ust=1475126531256000&amp;usg=AFQjCNFy7PJK2FlVFKZ8OnDVCAgof1lwcQ"> <img src="https://ci5.googleusercontent.com/proxy/2m9M-EzibEYfrP6aGS7E7ZLI_hTkO-sL6dIT3M3ioVohlP1kYhfIRXrPgA-Zm1owNOFiaeIjGIGhU9xXe4ioOant3vIOXzjUwIKVwQ=s0-d-e1-ft#http://teja1.kuikr.com/images/notification/youtube.gif" width="27" height="27" alt="Youtube" border="0" class="CToWUd"></a></td>'
//                                                    str += '</tr>'
//                                                    str += '</tbody></table></td>'
//                                                    str += '</tr>'
//                                                    str += '<tr>'
//                                                    str += '<td height="9"></td>'
//                                                    str += '</tr>'
//                                                    str += '<tr>'
//                                                    str += '<td align="center" style="font-size:11px;font-family:"Open Sans",Gill Sans,Arial,Helvetica,sans-serif;color:#444444"><p style="margin:0;padding:3px 0 0px;font-size:11px;font-family:"Open Sans",Gill Sans,Arial,Helvetica,sans-serif;line-height:13px">You are receiving this mail from EPardesh Team.</p>'
//                                                    str += '<p style="margin:0;padding:3px 0;font-size:11px;font-family:"Open Sans",Gill Sans,Arial,Helvetica,sans-serif;line-height:13px">For any assistance, visit the below website <a href=' + matrimony_url + ' style="font-size:11px;font-family:"Open Sans",Gill Sans,Arial,Helvetica,sans-serif;color:#007ebc;text-decoration:none" target="_blank" data-saferedirecturl=' + matrimony_url + '></a><a href=' + matrimony_url + ' style="font-size:11px;font-family:"Open Sans",Gill Sans,Arial,Helvetica,sans-serif;color:#008bcf;text-decoration:none" target="_blank"></a></p></td>'
//                                                    str += '</tr>'
//                                                    str += '<tr>'
//                                                    str += '<td align="center" style="font-size:11px;font-family:"Open Sans",Gill Sans,Arial,Helvetica,sans-serif;color:#008bcf;line-height:13px">© <a href=' + matrimony_url + ' target="_blank" data-saferedirecturl=' + matrimony_url + '>www.EPardesh.com</a></td>'
//                                                    str += '</tr>'
//                                                    str += '</tbody></table>'
//                                                    str += '</div>'
                                                    
                                                    
                                                    
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
                                    str += '<td align="center" style="color: #10c710;font-size:25px;padding:10px 20px 0px;font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif">!!! Congratulation !!!</td>'
                                    str += '</tr>'
                                    str += '<tr>'
                                    str += '<td height="40"></td>'
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
                                    str += '<td style="font-size:12px;padding:0px 30px;color:#444444;line-height:19px;font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif">'
                                    str += 'Your IT Training Ad has been activated successfully.'
                                    str += '</td>'
                                    str += '</tr>'
                                    str += '<tr><td height="10"></td></tr>'
                                    str += '<tr>'
                                    str += '<td style="font-size: 12px;padding: 0px 30px;color: #444444;line-height: 15px;">'
                                    str += 'Your IT Training Ad EPCT' + training_id + ' is now searchable to all users and visitors in EPARDESH website.'
                                    str += '</td>'
                                    str += '</tr>'
                                    str += '<tr><td height="10"></td></tr>'
                                    str += '<tr>'
                                    str += '<td style="font-size: 12px;padding: 0px 30px;color: #444444;line-height: 15px;">'
                                    str += 'You can view your IT Training Ad by clicking the link below or from your my account page.'
                                    str += '</td>'
                                    str += '</tr>'
                                    str += '<tr><td height="35"></td></tr>'
                                    str += '<tr>'
                                    str += '<td style="font-size: 12px;padding: 0px 30px;color: #444444;line-height: 15px;text-align: center;">'
                                    str += '<a style="font-size: 24px;text-decoration: underline; color: blue;" href="http://www.epardesh.com/training-details/'+training_id+'">EPCT' + training_id + '</a>'
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

                                                    var str1 = "<h2>Hi admin,</h2>";
                                                    str1 += "<p>A new IT-Training AD has been posted with following details: </p>";
                                                    str1 += "<p> User id : " + training_user_id + "</p>"
                                                    str1 += "<p> IT-Training Title : " + training_tittle + "</p>"
                                                    str1 += "<p> plan : " + training_plan_id + "</p>"
                                                    str1 += "<p>Regards,</p>";
                                                    str1 += "<p>Team EPardesh</p>";

                                                    send_email(str, email, 'ePardesh: Your IT Training Ad EPCT' + training_id + ' has been activated successfully');
                                                    send_email(str1, admin_email, 'EPardesh : New IT-Training posted');

                                                    console.log('Message sent: ');
                                                    var msg = {};
                                                    sendResponse.sendSuccessData(msg, res);

                                                }
                                            }
                                        })
                                    } else {
                                        var errorMsg = 'invalid id';
                                        sendResponse.sendErrorMessage(errorMsg, res);
                                    }
                                }
                            })
                        }
                    })
                }
            })
})

/*
 * --------------------------------------------------------------------------
 * edit_training_ad
 * ---------------------------------------------------------------------------
 */

router.post('/edit_training_ad', function(req, res, next) {
    var access_token = req.body.access_token;
    var training_id = req.body.training_id;
    var training_course = req.body.training_course;
    var training_tittle = req.body.training_tittle;
    var training_plan_id = req.body.training_plan_id;
    var training_course_type = req.body.training_course_type;
    var training_course_url = req.body.training_course_url;
    var training_course_address = req.body.training_course_address;
    var training_lattitude = req.body.training_lattitude;
    var training_longitude = req.body.training_longitude;
    var training_start_date = req.body.training_start_date;
    var training_start_time = req.body.training_start_time;
    var training_end_date = req.body.training_end_date;
    var training_end_time = req.body.training_end_time;
    var timezone = req.body.timezone;
    var training_image = req.body.training_image;
    var training_provider = req.body.training_provider;
    var training_fee_min = req.body.training_fee_min;
    var training_fee_max = req.body.training_fee_max;
    var training_description = req.body.training_description;
    var training_phone = req.body.training_phone;
    var training_email = req.body.training_email;
    var training_batch = req.body.training_batch;
    var user_email = req.body.user_email;
    var user_first_name = req.body.user_first_name;
    var today_date = new Date();

    async.waterfall([
        function(callback) {
            checkUser(res, access_token, callback);
        }],
            function() {
                var update_training_query = "update epardesh_training set training_course=?,training_tittle=?,training_plan=?,training_course_type=?,training_course_url=?,training_course_address=?,training_lattitude=?,training_longitude=?,training_start_date=?,training_start_time=?,training_end_date=?,training_end_time=?,timezone=?,training_image=?,training_provider=?,training_fee_min=?,training_fee_max=?,training_description=?,training_phone=?,training_email=?,training_batch=?,updated_on=? where id=?";
                var values = [training_course, training_tittle, training_plan_id, training_course_type, training_course_url, training_course_address, training_lattitude, training_longitude, training_start_date, training_start_time, training_end_date, training_end_time, timezone, training_image, training_provider, training_fee_min, training_fee_max, training_description, training_phone, training_email, training_batch, today_date, training_id]
                connection.query(update_training_query, values, function(err, rows) {
                    if (err) {
                        console.log(err)
                        var errorMsg = 'some error occurred';
                        sendResponse.sendErrorMessage(errorMsg, res);
                    } else {
                        var str1 = "<h2>Hi admin,</h2>";
                        str1 += "<p>An new IT_Training ad with ID " + training_id + " has been edited. </p>";
                        str1 += "<p>Regards,</p>";
                        str1 += "<p>Team EPardesh</p>";
//                        var mailOptions = {to: "deepakssit022@gmail.com", subject: 'EPardesh: An IT-Training Ad has been edited', html: str};
//                        transporter.sendMail(mailOptions, function (error, info) {
//                            if (error) {
//                                console.log("Error Found:");
//                                console.log(error);
//                            } else {
//
//                                console.log('message_sent1')

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
//                        str += '<tr>'
//                        str += '<td align="center" style="font-size:25px;color:#333333;padding:10px 20px 0px;font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif">Event Updated Successfully</td>'
//                        str += '</tr>'
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
                        str += '<td style="font-size:12px;padding:0px 30px;color:#444444;line-height:19px;font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif">Your IT Training has been successfully updated. View your updated IT Training using following link.</td>'
                        str += '</tr>'

                        str += '<tr>'
                        //str += '<td style="font-size:12px;padding:0px 30px;color:#444444;line-height:19px;font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif">' + training_id + ' : <a href=' + classified_url + 'setting target="_blank" data-saferedirecturl=' + classified_url + 'setting>' + classified_url + 'setting</a></td>'
                        
                        
                         str += '<td style="text-align:center;font-size:12px;padding:0px 30px;color:#444444;line-height:19px;font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif"><a style="font-size: 22px;margin:20px;font-weight:bold;" href="'+classified_url + 'setting">EPCT'+ training_id + '</a></td>';
                        
                        str += '</tr>'

                        str += '<tr>'
                        str += '<td style="font-size:12px;padding:0px 30px;color:#444444;line-height:19px;font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif">You can also view your IT Training in your <a href=' + classified_url + 'setting target="_blank" data-saferedirecturl=' + classified_url + 'setting>"My Account"</a></td>'
                        str += '</tr>'

                        str += '<tr>'
                        str += '<td style="font-size:12px;padding:0px 30px;color:#444444;line-height:19px;font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif">Thanks for posting IT Training with <a href=' + classified_url + ' target="_blank" data-saferedirecturl=' + classified_url + '>ePardesh</a></td>'
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


                        send_email(str, user_email, 'ePardesh :Your IT Training ' + training_id + ' has been updated successfully');
                        send_email(str1, admin_email, 'EPardesh : IT_Training Ad updated');

                        var msg = {}
                        sendResponse.sendSuccessData(msg, res);
                    }
                })
            })
})

/*
 * --------------------------------------------------------------------------
 * view_my_training_ads
 * ---------------------------------------------------------------------------
 */

router.post('/view_my_training_ads', function(req, res, next) {
    var access_token = req.body.access_token;
    var user_id = req.body.user_id;
    async.waterfall([
        function(callback) {
            checkUser(res, access_token, callback);
        }],
            function() {
                var get_training_query = "select * from epardesh_training where user_id=? order by training_plan desc , id desc"
                var user_values = [user_id]
                connection.query(get_training_query, user_values, function(err, training_ads) {
                    if (err) {
                        console.log(err)
                        var errorMsg = 'some error occurred';
                        sendResponse.sendErrorMessage(errorMsg, res);
                    } else {
                        sendResponse.sendSuccessData(training_ads, res);
                    }
                })
            })
})

/*
 * --------------------------------------------------------------------------
 * delete/cancel_training_ad
 * ---------------------------------------------------------------------------
 */

router.post('/delete/cancel_training_ad', function(req, res, next) {
    var access_token = req.body.access_token;
    var training_id = req.body.training_id;
    async.waterfall([
        function(callback) {
            checkUser(res, access_token, callback);
        }],
            function() {
                var check_training = "select * from epardesh_training where id=?";
                var training_values = [training_id]
                connection.query(check_training, training_values, function(err, training_ad) {
                    if (err) {
                        console.log(err)
                        var errorMsg = 'some error occurred';
                        sendResponse.sendErrorMessage(errorMsg, res);
                    } else {
                        if (training_ad.length > 0 || training_ad.length > '0') {
                            var cancel_ad_query = "UPDATE epardesh_training SET active_status='2' where id=?"
                            var event_values = [training_id]
                            connection.query(cancel_ad_query, event_values, function(err, rows) {
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
                            var errorMsg = 'invalid id for training';
                            sendResponse.sendErrorMessage(errorMsg, res);
                        }
                    }
                })

            })
})

/*
 * --------------------------------------------------------------------------
 * upgrade_training_plan
 * ---------------------------------------------------------------------------
 */

router.post('/upgrade_training_plan', function(req, res, next) {
    var access_token = req.body.access_token;
    var training_id = req.body.training_id;
    var status = req.body.status;
    async.waterfall([
        function(callback) {
            checkUser(res, access_token, callback);
        }],
            function() {
                var check_event = "select * from epardesh_training where id=?";
                var event_values = [training_id]
                connection.query(check_event, event_values, function(err, training_ads) {
                    if (err) {
                        console.log(err)
                        var errorMsg = 'some error occurred';
                        sendResponse.sendErrorMessage(errorMsg, res);
                    } else {
                        if (training_ads.length > 0 || training_ads.length > '0') {
                            if (status == 1) {
                                var upgrade_ad_query = "UPDATE epardesh_training SET training_plan='1' where id=?"
                                var event_values = [training_id]
                                connection.query(upgrade_ad_query, event_values, function(err, rows) {
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
                                var upgrade_ad_query = "UPDATE epardesh_training SET training_plan='2' where id=?"
                                var event_values = [training_id]
                                connection.query(upgrade_ad_query, event_values, function(err, rows) {
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
                            var errorMsg = 'invalid id for event';
                            sendResponse.sendErrorMessage(errorMsg, res);
                        }
                    }
                })
            })
})

/*
 * --------------------------------------------------------------------------
 * view_training_ad_details
 * ---------------------------------------------------------------------------
 */

router.post('/view_training_ad_details', function(req, res, next) {
    var training_id = req.body.training_id;
    var user_id = req.body.user_id;
    var today_date = new Date();
    var formatted_today_date = date.format(today_date, 'YYYY-MM-DD')

    if (user_id == '') {
        var get_training_query = "select * from epardesh_training where id=?"
        var training_values = [training_id]
        connection.query(get_training_query, training_values, function(err, ad_details) {
            if (err) {
                console.log(err)
                var errorMsg = 'some error occurred';
                sendResponse.sendErrorMessage(errorMsg, res);
            } else {
                if (ad_details.length > 0) {
                    var data_obj = ad_details[0];
                    data_obj.favourite_status = 0
                    var user_id = ad_details[0].user_id;
                    var get_other_training_query = "select * from epardesh_training where user_id=? and id !=? and approved_status = 1 and training_end_date >= '" + formatted_today_date + "'"
                    var user_values = [user_id, training_id]
                    connection.query(get_other_training_query, user_values, function(err, other_ads) {
                        if (err) {
                            console.log(err)
                            var errorMsg = 'some error occurred';
                            sendResponse.sendErrorMessage(errorMsg, res);
                        } else {
                            var views = ad_details[0].views;
                            var new_views = parseInt(views) + 1;
                            var update_event_query = "UPDATE epardesh_training SET views=? where id=?"
                            var event_values = [new_views,training_id]
                            connection.query(update_event_query, event_values, function(err, training_views) {
                                if (err) {
                                    console.log(err)
                                    var errorMsg = 'some error occurred';
                                    sendResponse.sendErrorMessage(errorMsg, res);
                                } else {
                                    var data = {
                                        ad_details: ad_details,
                                        other_ads: other_ads
                                    }
                                    sendResponse.sendSuccessData(data, res);
                                }
                            });




                        }
                    })
                } else {
                    var errorMsg = 'invalid training id';
                    sendResponse.sendErrorMessage(errorMsg, res);
                }
            }
        })
    } else {
        var get_training_query = "select * from epardesh_training where id=?"
        var training_values = [training_id]
        connection.query(get_training_query, training_values, function(err, ad_details) {
            if (err) {
                console.log(err)
                var errorMsg = 'some error occurred';
                sendResponse.sendErrorMessage(errorMsg, res);
            } else {
                if (ad_details.length > 0) {
                    var get_other_training_query = "select * from favourite_training where user_id=? and training_id=?"
                    var user_values = [user_id, training_id]
                    connection.query(get_other_training_query, user_values, function(err, favourite_ads) {
                        if (err) {
                            console.log(err)
                            var errorMsg = 'some error occurred';
                            sendResponse.sendErrorMessage(errorMsg, res);
                        } else {
                            var data_obj = ad_details[0];
                            if (favourite_ads.length == 0) {
                                data_obj.favourite_status = 0;
                            } else {
                                data_obj.favourite_status = 1;
                            }
                            var user_id1 = ad_details[0].user_id;
                            var get_other_training_query = "select * from epardesh_training where user_id=? and id !=? and approved_status = 1 and training_end_date >= " + formatted_today_date
                            var user_values = [user_id1, training_id]
                            connection.query(get_other_training_query, user_values, function(err, other_ads) {
                                if (err) {
                                    console.log(err)
                                    var errorMsg = 'some error occurred';
                                    sendResponse.sendErrorMessage(errorMsg, res);
                                } else {
                                    
                                    
                                    
                                      var views = ad_details[0].views;
                            var new_views = parseInt(views) + 1;
                            console.log("new_views"+ new_views);
                            console.log("training_id"+ training_id);
                            var update_event_query = "UPDATE epardesh_training SET views=? where id=?"
                            var event_values = [new_views,training_id]
                            connection.query(update_event_query, event_values, function(err, training_views) {
                                if (err) {
                                    console.log(err)
                                    var errorMsg = 'some error occurred';
                                    sendResponse.sendErrorMessage(errorMsg, res);
                                } else {
                                    var data = {
                                        ad_details: ad_details,
                                        other_ads: other_ads
                                    }
                                    sendResponse.sendSuccessData(data, res);
                                }
                            });
                                    
                          
                                }
                            })
                        }
                    })
                } else {
                    var errorMsg = 'invalid training id';
                    sendResponse.sendErrorMessage(errorMsg, res);
                }
            }
        })
    }



})

/*
 * --------------------------------------------------------------------------
 * add_favourite_training
 * ---------------------------------------------------------------------------
 */

router.post('/add_favourite_training', function(req, res, next) {
    var access_token = req.body.access_token;
    var user_id = req.body.user_id;
    var training_id = req.body.training_id;
    async.waterfall([
        function(callback) {
            checkUser(res, access_token, callback);
        }],
            function() {
                var add_to_favourite_query = "insert into favourite_training (user_id, training_id) values(?,?)"
                var favourite_values = [user_id, training_id]
                connection.query(add_to_favourite_query, favourite_values, function(err, rows) {
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
})

/*
 * --------------------------------------------------------------------------
 * remove_favourite_training
 * ---------------------------------------------------------------------------
 */

router.post('/remove_favourite_training', function(req, res, next) {
    var access_token = req.body.access_token;
    var favourite_id = req.body.favourite_id;
    async.waterfall([
        function(callback) {
            checkUser(res, access_token, callback);
        }],
            function() {
                var remove_from_favourite_query = "delete from favourite_training where id=?"
                var favourite_values = [favourite_id]
                connection.query(remove_from_favourite_query, favourite_values, function(err, rows) {
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
})



/*
 * --------------------------------------------------------------------------
 * view_favourite_training_ads
 * ---------------------------------------------------------------------------
 */

router.post('/view_favourite_training_ads', function(req, res, next) {
    var access_token = req.body.access_token;
    var user_id = req.body.user_id;
    var training_id_array = [];
    var training_array = [];
    async.waterfall([
        function(callback) {
            checkUser(res, access_token, callback);
        }],
            function() {
                var get_training_query = "select * from favourite_training where user_id=?"
                var user_values = [user_id]
                connection.query(get_training_query, user_values, function(err, favourite_training) {
                    if (err) {
                        console.log(err)
                        var errorMsg = 'some error occurred';
                        sendResponse.sendErrorMessage(errorMsg, res);
                    } else {
                        var no_of_training = favourite_training.length;
                        for (var i = 0; i < no_of_training; i++) {
                            var training_id = favourite_training[0].training_id;
                            training_id_array.push(training_id)
                        }
                        async.each(training_id_array, function(training_id, callback) {
                            var sql1 = 'select * from epardesh_events where id=?';
                            var values1 = [training_id]
                            connection.query(sql1, values1, function(err, rows1) {
                                if (err) {
                                    console.log(err)
                                    var errorMsg = 'some error occurred';
                                    sendResponse.sendErrorMessage(errorMsg, res);
                                } else {
                                    if (rows1.length > 0) {
                                        training_array.push(rows1[0])
                                    }
                                }
                                callback();
                            })
                        }, function(err) {
                            // if any of the file processing produced an error, err would equal that error
                            if (err) {
                                // One of the iterations produced an error.
                                // All processing will now stop.
                                console.log('A file failed to process');
                            } else {
                                sendResponse.sendSuccessData(training_array, res);
                            }
                        });




//                        sendResponse.sendSuccessData(favourite_ads, res);
                    }
                })
            })
})

/*
 * --------------------------------------------------------------------------
 * send_email/msg
 * ---------------------------------------------------------------------------
 */

router.post('/send_email/msg', function(req, res, next) {
    var sender_email = req.body.sender_email;
    var sender_name = req.body.sender_name;
    var message = req.body.message;
    var receiver_email = req.body.receiver_email;
    var user_id = req.body.user_id;
    var training_id = req.body.training_id;
    var get_email = "SELECT * FROM user where id=?";
    var values = [user_id]
    connection.query(get_email, values, function(err, rows) {
        if (err)
        {
            var errorMsg = 'some error occurred';
            sendResponse.sendErrorMessage(errorMsg, res);
        } else {
            if (rows.length > '0' || rows.length > 0) {
                var business_email = rows[0].email;
                var business_owner_first_name = rows[0].first_name;
//                var str = "<p>Hi,</p>";
//                str += "<p>you have received a new message from " + sender_name + " with email " + sender_email + ":</p>";
//                str += "<p><strong>message: </strong>" + message + "</p>";
//                str += "<p>Regards,</p>";
//                str += "<p>EPardesh team</p>";

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
//                str += '<td style="font-size:20px;padding:0px 30px;color:#444444;font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif">Dear ' + business_owner_first_name + ',</td>'
//                str += '</tr>'
//                str += '<tr>'
//                str += '<td height="10"></td>'
//                str += '</tr>'
//                str += '<tr>'
//                str += '<td style="font-size:12px;padding:0px 30px;color:#444444;line-height:19px;font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif">You have received a new message from "' + sender_name + '" with email "' + sender_email + '"</td>'
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
                str += '<td style="font-size:20px;padding:0px 30px;color:#444444;font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif">Dear ' + business_owner_first_name + ',</td>'
                str += '</tr>'
                str += '<tr>'
                str += '<td height="10"></td>'
                str += '</tr>'
                str += '<tr>'
               // str += '<td style="font-size:12px;padding:0px 30px;color:#444444;line-height:19px;font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif">You received a new message from a visitor for your IT Training ' + training_id + '</td>'
                
                str += '<td style="font-size:12px;padding:0px 30px;color:#444444;line-height:19px;font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif">You received a new message from a visitor for your Ad <a href="'+classified_url+'setting">'+ training_id +'</a></td>'

                
                
                str += '</tr>'
                str += '<tr>'
                str += '<td style="font-size:12px;padding:0px 30px;color:#444444;line-height:19px;font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif"><strong>Email: </strong>' + sender_email + '</td>'
                str += '</tr>'
//                str += '<tr>'
//                str += '<td style="font-size:12px;padding:0px 30px;color:#444444;line-height:19px;font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif"><strong>Mobile: </strong>' + sender_phone + '</td>'
//                str += '</tr>'
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

                var mailOptions = {to: business_email, subject: "ePardesh : New message", html: str};
                transporter.sendMail(mailOptions, function(error, info) {
                    if (error) {
                        var msg = "some error occurred";
                        sendResponse.sendErrorMessage(msg, res);
                    } else {
                        console.log('Message sent: ');

                        var mailOptions = {to: receiver_email, subject: "ePardesh : New message", html: str};
                        transporter.sendMail(mailOptions, function(error, info) {
                            if (error) {
                                var msg = "some error occurred";
                                sendResponse.sendErrorMessage(msg, res);
                            } else {
                                console.log('Message sent: ');
                                var data = {}
                                sendResponse.sendSuccessData(data, res);
                            }
                        });
                    }
                });
            } else {
                var msg = "invalid user id";
                sendResponse.sendErrorMessage(msg, res);
            }
        }
    })
})

/*
 * --------------------------------------------------------------------------
 * contact_training_owner
 * ---------------------------------------------------------------------------
 */

router.post('/contact_training_owner', function(req, res, next) {

    var training_email = req.body.training_email;
    var sender_name = req.body.sender_name;
    var sender_phone = req.body.sender_phone;
    var sender_email = req.body.sender_email;
    var user_id = req.body.user_id;
    var training_id = req.body.training_id;

    var get_email = "SELECT * FROM user where id=?";
    var values = [user_id]
    connection.query(get_email, values, function(err, rows) {
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
                str += '<td style="font-size:20px;padding:0px 30px;color:#444444;font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif">For your IT Training Ad: <a href="'+classified_url+'setting">' + training_id + '</a></td>';
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
                str += '<td style="font-size:12px;padding:0px 30px;color:#444444;line-height:19px;font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif"><strong>Email: </strong>' + sender_email + '</td>'
                str += '</tr>'
                str += '<tr>'
                str += '<td style="font-size:12px;padding:0px 30px;color:#444444;line-height:19px;font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif"><strong>Name: </strong>' + sender_name + '</td>'
                str += '</tr>'
                str += '<tr>'
                str += '<td style="font-size:12px;padding:0px 30px;color:#444444;line-height:19px;font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif"><strong>Phone: </strong>' + sender_phone + '</td>'
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

                var mailOptions = {to: business_email, subject: "Contact", html: str};
                transporter.sendMail(mailOptions, function(error, info) {
                    if (error) {
                        var msg = "some error occurred";
                        sendResponse.sendErrorMessage(msg, res);
                    } else {
                        console.log('Message sent: ');
                        var mailOptions = {to: training_email, subject: "ePardesh: New contact for your IT Training Ad " + training_id, html: str};
                        transporter.sendMail(mailOptions, function(error, info) {
                            if (error) {
                                var msg = "some error occurred";
                                sendResponse.sendErrorMessage(msg, res);
                            } else {
                                console.log('Message sent: ');
                                var data = {}
                                sendResponse.sendSuccessData(data, res);
                            }
                        });
                    }
                });
            }
        }
    })
})

/*
 * --------------------------------------------------------------------------
 * check_training_tittle
 * ---------------------------------------------------------------------------
 */

router.post('/check_training_tittle', function(req, res, next) {
    var training_tittle = req.body.training_tittle;
    var check_tittle = "select * from epardesh_training where training_tittle=?";
    var training_values = [training_tittle]
    connection.query(check_tittle, training_values, function(err, result) {
        if (err) {
            console.log(err)
            var errorMsg = 'some error occurred';
            sendResponse.sendErrorMessage(errorMsg, res);
        } else {
            if (result.length > 0 || result.length > '0') {
                var data = {
                    status: 0
                }
                sendResponse.sendSuccessData(data, res);
            } else {
                var data = {
                    status: 1
                }
                sendResponse.sendSuccessData(data, res);
            }
        }
    })
})


/*
 * --------------------------------------------------------------------------
 * view_top_featured_training_ads
 * ---------------------------------------------------------------------------
 */

router.post('/view_top_featured_training_ads', function(req, res, next) {
//    var latitude = req.body.lattitude;
//    var longitude = req.body.longitude;
    var today_date = new Date();
    var formatted_today_date = date.format(today_date, 'YYYY-MM-DD')
    var get_featured_training_query = "select * from epardesh_training where training_plan=2 and approved_status=1 and training_end_date >= '" + formatted_today_date + "'  and expiry_date >= '" + formatted_today_date + "' order by id desc limit 5"
    connection.query(get_featured_training_query, function(err, featured_ads) {
        if (err) {
            console.log(err)
            var errorMsg = 'some error occurred';
            sendResponse.sendErrorMessage(errorMsg, res);
        } else {
            sendResponse.sendSuccessData(featured_ads, res);
        }
    })
})

/*
 * --------------------------------------------------------------------------
 * view_nearby_training
 * ---------------------------------------------------------------------------
 */

router.post('/view_nearby_training', function(req, res, next) {
    var latitude = req.body.latitude;
    var longitude = req.body.longitude;
    var user_id = req.body.user_id;
    var training_id_array = [];
    var key = 0;
    var today_date = new Date();
    var formatted_today_date = date.format(today_date, 'YYYY-MM-DD');
    console.log("formatted_today_date");
    console.log(formatted_today_date);
    if (user_id == '') {
        var get_training_query = "select * from epardesh_training where ACOS( SIN( RADIANS( `training_lattitude` ) ) * SIN( RADIANS( '" + latitude + "' ) ) + COS( RADIANS( `training_lattitude` ) )* COS( RADIANS( '" + latitude + "' )) * COS( RADIANS( `training_longitude` ) - RADIANS( '" + longitude + "' )) ) * 6380 < 100 and approved_status=1 and training_end_date >= '" + formatted_today_date + "' and expiry_date >= '" + formatted_today_date + "' order by training_plan desc"


        connection.query(get_training_query, function(err, training_ads) {
            if (err) {
                console.log(err)
                var errorMsg = 'some error occurred';
                sendResponse.sendErrorMessage(errorMsg, res);
            } else {
                var length = training_ads.length;
                for (var i = 0; i < length; i++) {
                    training_id_array.push(training_ads[i].id)
                }
                async.each(training_id_array, function(training_id, callback) {
                    var data_obj = training_ads[key];
                    data_obj.favourite_status = 0
                    key++;
                    callback();
                }, function(err) {
                    // if any of the file processing produced an error, err would equal that error
                    if (err) {
                        // One of the iterations produced an error.
                        // All processing will now stop.
                        console.log('A file failed to process');
                    } else {
                        sendResponse.sendSuccessData(training_ads, res);
                    }
                })
            }
        })
    } else {
        var get_training_query = "select * from epardesh_training where ACOS( SIN( RADIANS( `training_lattitude` ) ) * SIN( RADIANS( '" + latitude + "' ) ) + COS( RADIANS( `training_lattitude` ) )* COS( RADIANS( '" + latitude + "' )) * COS( RADIANS( `training_longitude` ) - RADIANS( '" + longitude + "' )) ) * 6380 < 100 and approved_status=1 and training_end_date >= '" + formatted_today_date + "' and expiry_date >= '" + formatted_today_date + "' order by training_plan desc"
               // var get_training_query = "select * from epardesh_training where ACOS( SIN( RADIANS( `training_lattitude` ) ) * SIN( RADIANS( '" + latitude + "' ) ) + COS( RADIANS( `training_lattitude` ) )* COS( RADIANS( '" + latitude + "' )) * COS( RADIANS( `training_longitude` ) - RADIANS( '" + longitude + "' )) ) * 6380 < 100 and approved_status=1 and training_end_date >= '2017-05-18' order by training_plan desc"

               // var get_training_query = "select * from epardesh_training where training_end_date > '2017-05-18'"

        connection.query(get_training_query, function(err, training_ads) {
            if (err) {
                console.log(err)
                var errorMsg = 'some error occurred';
                sendResponse.sendErrorMessage(errorMsg, res);
            } else {
                var length = training_ads.length;
                for (var i = 0; i < length; i++) {
                    training_id_array.push(training_ads[i].id)
                }

                console.log('training_id_array')
                console.log(training_id_array)
                async.each(training_id_array, function(training_id, callback) {
                    var check_status = 'select * from favourite_training where user_id=? and training_id=?';
                    var check_status_values = [user_id, training_id]
                    console.log('check_status_values')
                    console.log(check_status_values)
                    connection.query(check_status, check_status_values, function(err, fav_training) {
                        if (err) {
                            console.log(err)
                            var errorMsg = 'some error occurred';
                            sendResponse.sendErrorMessage(errorMsg, res);
                        } else {
                            console.log('fav_training')
                            console.log(fav_training)
                            var data_obj = training_ads[key];
                            if (fav_training.length == '0' || fav_training.length == 0) {
                                data_obj.favourite_status = 0
                            } else {
                                data_obj.favourite_status = 1
                            }
                            key++;
                            callback();
                        }
                    })
                }, function(err) {
                    // if any of the file processing produced an error, err would equal that error
                    if (err) {
                        // One of the iterations produced an error.
                        // All processing will now stop.
                        console.log('A file failed to process');
                    } else {
                        sendResponse.sendSuccessData(training_ads, res);
                    }
                })
            }
        })
    }

})

/*
 * --------------------------------------------------------------------------
 * filter_training
 * ---------------------------------------------------------------------------
 */

router.post('/filter_training', function(req, res, next) {
    var training_name = req.body.training_name;
    var start_date = req.body.start_date;
    var end_date = req.body.end_date;
    var user_id = req.body.user_id;
    var training_id_array = [];
    var key = 0
    var today_date = new Date();
    var formatted_today_date = date.format(today_date, 'YYYY-MM-DD')
    if (training_name == '') {
        var training_string = " like'%'";
    } else {
        var training_string = " LIKE '%" + training_name + "%'";
    }
    if (start_date == '' && end_date == '') {
        console.log('in 1')
        var date_string = "training_end_date >= '" + formatted_today_date + "'";
    } else if (start_date != '' && end_date == '') {
        console.log('in 2')
        var date_string = "training_start_date = '" + start_date + "'";
    } else if (start_date == '' && end_date != '') {
        console.log('in 3')
        var date_string = "training_end_date = '" + end_date + "'";
    } else {
        console.log('in 4')
        var date_string = "(training_start_date BETWEEN '" + start_date + "' AND '" + end_date + "')";
    }

    if (user_id == '') {
        var get_training_query = "SELECT * from epardesh_training where training_tittle" + training_string + " and " + date_string + " and approved_status=1 and active_status=1 order by training_plan desc"
        console.log(get_training_query)
        connection.query(get_training_query, function(err, training_ads) {
            if (err) {
                console.log(err)
                var errorMsg = 'some error occurred';
                sendResponse.sendErrorMessage(errorMsg, res);
            } else {
                var length = training_ads.length;
                for (var i = 0; i < length; i++) {
                    training_id_array.push(training_ads[i].id)
                }
                async.each(training_id_array, function(training_id, callback) {
                    var data_obj = training_ads[key];
                    data_obj.favourite_status = 0
                    key++;
                    callback();
                }, function(err) {
                    // if any of the file processing produced an error, err would equal that error
                    if (err) {
                        // One of the iterations produced an error.
                        // All processing will now stop.
                        console.log('A file failed to process');
                    } else {
                        sendResponse.sendSuccessData(training_ads, res);
                    }
                })
            }
        })
    } else {
        var get_training_query = "SELECT * from epardesh_training where training_tittle" + training_string + " and " + date_string + " and approved_status=1 and active_status=1 order by training_plan desc"
        console.log(get_training_query)
        connection.query(get_training_query, function(err, training_ads) {
            if (err) {
                console.log(err)
                var errorMsg = 'some error occurred';
                sendResponse.sendErrorMessage(errorMsg, res);
            } else {
                var length = training_ads.length;
                for (var i = 0; i < length; i++) {
                    training_id_array.push(training_ads[i].id)
                }
                async.each(training_id_array, function(training_id, callback) {
                    var check_status = 'select * from favourite_training where user_id=? and training_id=?';
                    var check_status_values = [user_id, training_id]
                    connection.query(check_status, check_status_values, function(err, fav_training) {
                        if (err) {
                            console.log(err)
                            var errorMsg = 'some error occurred';
                            sendResponse.sendErrorMessage(errorMsg, res);
                        } else {
                            var data_obj = training_ads[key];
                            if (fav_training.length == '0' || fav_training.length == 0) {
                                data_obj.favourite_status = 0
                            } else {
                                data_obj.favourite_status = 1
                            }
                            key++;
                            callback();
                        }
                    })
                }, function(err) {
                    // if any of the file processing produced an error, err would equal that error
                    if (err) {
                        // One of the iterations produced an error.
                        // All processing will now stop.
                        console.log('A file failed to process');
                    } else {
                        sendResponse.sendSuccessData(training_ads, res);
                    }
                })
            }
        })
    }

})





/*
 * ----------------------------------------------------------------------------------------------------------------------------------------
 * check User Is Valid or Not
 * INPUT : access_token
 * ----------------------------------------------------------------------------------------------------------------------------------------
 */
function checkUser(res, access_token, callback) {
    var sql = "SELECT * FROM `user` WHERE `access_token`=? limit 1";
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


/*
 * --------------------------------------------------------------------------
 * to send email
 * ---------------------------------------------------------------------------
 */
function send_email(email_data, email, subject, callback) {

    var mailOptions = {to: email, subject: subject, html: email_data};
    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('in send_email function')
            return true;
        }
    })
}

module.exports = router;