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
 * add_events
 * ---------------------------------------------------------------------------
 */

router.post('/add_events', function (req, res, next) {

    var user_id = req.body.user_id;
    var event_tittle = req.body.event_tittle;
    var location_type = req.body.location_type;
    var plan_id = req.body.plan_id;
    var total_payable = req.body.total_payable;
    var event_url = req.body.event_url;
    var event_address = req.body.event_address;
    var event_lattitude = req.body.event_lattitude;
    var event_longitude = req.body.event_longitude;
    var start_date = req.body.start_date;
    var start_time = req.body.start_time;
    var end_date = req.body.end_date;
    var end_time = req.body.end_time;
    var timezone = req.body.timezone;
    var event_image = req.body.event_image;
    var event_phone = req.body.event_phone;
    var description = req.body.description;
    var organisor = req.body.organisor;
    var performer = req.body.performer;
    var performance_type = req.body.performance_type;
    var event_ticket_status = req.body.event_ticket_status;
    var buy_url = req.body.buy_url;
    var access_token = req.body.access_token;
    var date_posted = new Date();

    async.waterfall([
        function (callback) {
            checkUser(res, access_token, callback);
        }],
            function () {
                if (plan_id == '0') {
                    var approved_status = 0;
                    var insert_query = "insert into epardesh_events(user_id,event_tittle,location_type,plan_id,total_payable,event_url,event_address,event_lattitude,event_longitude,start_date,start_time,end_date,end_time,timezone,event_image,event_phone,description,organisor,performer,performance_type,event_ticket_status,buy_url,approved_status,date_posted) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"
                    var event_values = [user_id, event_tittle, location_type, plan_id, total_payable, event_url, event_address, event_lattitude, event_longitude, start_date, start_time, end_date, end_time, timezone, event_image, event_phone, description, organisor, performer, performance_type, event_ticket_status, buy_url, approved_status, date_posted]
                    connection.query(insert_query, event_values, function (err, rows) {
                        if (err) {
                            console.log(err)
                            var errorMsg = 'some error occurred';
                            sendResponse.sendErrorMessage(errorMsg, res);
                        } else {

                            var get_email = "SELECT * FROM user where id=?";
                            var values = [user_id]
                            connection.query(get_email, values, function (err, rows) {
                                if (err)
                                {
                                    console.log(err)
                                    var errorMsg = 'some error occurred';
                                    sendResponse.sendErrorMessage(errorMsg, res);
                                } else {
                                    if (rows.length > '0' || rows.length > 0) {
                                        var email = rows[0].email;
                                        var user_first_name = rows[0].first_name;
                                        var get_event_id = "SELECT * FROM epardesh_events order by id desc limit 1";
                                        connection.query(get_event_id, function (err, rows1) {
                                            if (err)
                                            {
                                                console.log(err)
                                                var errorMsg = 'some error occurred';
                                                sendResponse.sendErrorMessage(errorMsg, res);
                                            } else {
                                                if (rows.length > '0' || rows.length > 0) {
                                                    var event_id = rows1[0].id;
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
                                                    str += '<td align="center"><img src="https://ci3.googleusercontent.com/proxy/tVvN5RW66MgOQ1x6Q-O75sxBy8ExbyBBD7VbbSZqkZ4AtjlqtlEO31-s6u0Fa8KXkyNHCgSn1QUiuNbZkUgrgE71IhhAm5qz3lvZJ20ZxTw=s0-d-e1-ft#http://teja1.kuikr.com/images/notification/VerifyEmail.png" width="73" height="73" border="0" alt="Activate your Event" style="margin:0;display:block" class="CToWUd"></td>'
                                                    str += '</tr>'
                                                    str += '<tr>'
                                                    str += '<td align="center" style="font-size:25px;color:#333333;padding:10px 20px 0px;font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif">Activate Your Event</td>'
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
                                                    str += '<td style="font-size:12px;padding:0px 30px;color:#444444;line-height:19px;font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif">Just click the button below (it only takes a couple of seconds). You won’t be asked to log in as its simply a confirmation of the Event posted by you. </td>'
                                                    str += '</tr>'
                                                    str += '<tr>'
                                                    str += '<td height="20"></td>'
                                                    str += '</tr>'
                                                    str += '<tr>'
                                                    str += '<td align="center">'
                                                    str += '<table width="185" cellpadding="0" cellspacing="0" border="0">'
                                                    str += '<tbody><tr>'
                                                    str += '<td align="center" bgcolor="#008BCF" height="45" style="border-radius:3px">'
                                                    str += '<a href=' + classified_url + "ad_approve/" + event_id + '/2 style="display:block;color:#ffffff;text-decoration:none;font-size:14px;text-align:center;font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif;font-weight:bold;line-height:45px" target="_blank" data-saferedirecturl="' + classified_url + '">Activate Event</a>'
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
                                                    str += '<td width="85%" style="color:#1688c8;font-size:12px;font-family:"Open Sans",Gill Sans,Arial,Helvetica,sans-serif;vertical-align:top"><p style="padding:0px 0 0 0;margin:0;color:#444444;font-weight:600;font-size:16px;font-family:"Open Sans",Gill Sans,Arial,Helvetica,sans-serif">WHY Activate?</p>'
                                                    str += '<p style="padding:0;margin:0;color:#444444;font-size:12px;font-family:"Open Sans",Gill Sans,Arial,Helvetica,sans-serif">Activating your Event lets others see all your Events.</p></td>'
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
                                                    str += '<p style="padding:0;margin:0;color:#444444;font-size:12px;font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif">If above button is not working then Activate your Event by pasting the below link into your browser:</p>'
                                                    str += '<p style="padding:0;margin:0;color:#444444;font-size:12px;font-family:"Open Sans",Gill Sans,Arial,Helvetica,sans-serif"><a href=' + classified_url + "ad_approve/" + event_id + '/2 style="text-decoration:none;color:#008bcf;display:block;word-break:break-all" target="_blank" data-saferedirecturl=' + classified_url + "ad_approve/" + event_id + '/2>' + classified_url + "ad_approve/" + event_id + '/2</a></p>'
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
//                                  
                                                    var str1 = "<h2>Hi admin,</h2>";
                                                    str1 += "<p>A new AD has been posted with following details: </p>";
                                                    str1 += "<p> User id : " + user_id + "</p>"
                                                    str1 += "<p> Event Title : " + event_tittle + "</p>"
                                                    str1 += "<p> plan : " + plan_id + "</p>"
                                                    str1 += "<p>Regards,</p>";
                                                    str1 += "<p>Team EPardesh</p>";

                                                    send_email(str, email, 'ePardesh:  Activate Event');
                                                    send_email(str1, admin_email, 'ePardesh : New Event posted');


                                                    var msg = {};
                                                    sendResponse.sendSuccessData(msg, res);
//                                                   
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
                } else {
                    var approved_status = 1;
                    var date_approved = new Date();
                    var expiry_date = date.addDays(date_approved, 30);
                    var insert_query = "insert into epardesh_events(user_id,event_tittle,location_type,plan_id,total_payable,event_url,event_address,event_lattitude,event_longitude,start_date,start_time,end_date,end_time,timezone,event_image,event_phone,description,organisor,performer,performance_type,event_ticket_status,buy_url,approved_status,date_posted,date_approved,expiry_date) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"
                    var event_values = [user_id, event_tittle, location_type, plan_id, total_payable, event_url, event_address, event_lattitude, event_longitude, start_date, start_time, end_date, end_time, timezone, event_image, event_phone, description, organisor, performer, performance_type, event_ticket_status, buy_url, approved_status, date_posted, date_approved, expiry_date]
                    connection.query(insert_query, event_values, function (err, rows) {
                        if (err) {
                            console.log(err)
                            var errorMsg = 'some error occurred';
                            sendResponse.sendErrorMessage(errorMsg, res);
                        } else {
                            var get_email = "SELECT * FROM user where id=?";
                            var values = [user_id]
                            connection.query(get_email, values, function (err, rows) {
                                if (err)
                                {
                                    console.log(err)
                                    var errorMsg = 'some error occurred';
                                    sendResponse.sendErrorMessage(errorMsg, res);
                                } else {
                                    if (rows.length > '0' || rows.length > 0) {
                                        var email = rows[0].email;
                                        var user_first_name = rows[0].first_name;
                                        var get_training_id = "SELECT * FROM epardesh_events order by id desc limit 1";
                                        connection.query(get_training_id, function (err, rows1) {
                                            if (err)
                                            {
                                                console.log(err)
                                                var errorMsg = 'some error occurred';
                                                sendResponse.sendErrorMessage(errorMsg, res);
                                            } else {
                                                if (rows.length > '0' || rows.length > 0) {
                                                    var training_id = rows1[0].id;
//                                                var str = "<h2>Welcome To EPardesh,</h2>";
//                                                str += "<p> Please click on the below link to verify and approve your ad.</p>"
//                                                str += "<a href="+classified_url+"ad_approve/" + ad_id + ">Click Here</a>";
//                                                str += "<p>Regards,</p>";
//                                                str += "<p>Team EPardesh</p>";

//                                                    str = '<div style="margin:0;padding:0;font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif">'
//                                                    str += '<table width="100%" cellpadding="0" cellspacing="0" border="0" align="center" style="font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif;max-width:600px;background-color:#ffffff;color:#666666;text-align:left;padding:0px 2% 10px 2%;background:url(http://teja1.kuikr.com/images/notification/mailer-bg.jpg) repeat #f9f9f9">'
//                                                    str += '<tbody><tr>'
//                                                    str += '<td height="20"></td>'
//                                                    str += '</tr>'
//                                                    str += '<tr>'
//                                                    str += '<td height="43" valign="top"><table width="100%" cellspacing="0" cellpadding="0" border="0" align="center" style="max-width:530px">'
//                                                    str += '<tbody><tr>'
//                                                    str += '<td align="left" height="43"><a href="#m_8496668978295844378_m_8306747430853343728_m_8934663683847810844_"><img src="' + url + 'logo.jpg" alt="Epardesh" width="94" height="43" border="0" style="margin:0;display:block;font-family:Arial,Helvetica,sans-serif;color:#007ebe;font-size:20px;text-align:center;font-weight:bold" class="CToWUd"></a></td>'
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
//                                                    str += '<td align="center"><img src="https://ci3.googleusercontent.com/proxy/tVvN5RW66MgOQ1x6Q-O75sxBy8ExbyBBD7VbbSZqkZ4AtjlqtlEO31-s6u0Fa8KXkyNHCgSn1QUiuNbZkUgrgE71IhhAm5qz3lvZJ20ZxTw=s0-d-e1-ft#http://teja1.kuikr.com/images/notification/VerifyEmail.png" width="73" height="73" border="0" alt="Event Posted Successfully" style="margin:0;display:block" class="CToWUd"></td>'
//                                                    str += '</tr>'
//                                                    str += '<tr>'
//                                                    str += '<td align="center" style="font-size:25px;color:#333333;padding:10px 20px 0px;font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif">Event Posted Successfully</td>'
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
//                                                    str += '<td style="font-size:12px;padding:0px 30px;color:#444444;line-height:19px;font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif">Your Event has been successfully posted on our website. Share with everyone and accelerate your sale! </td>'
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
//                                                    str += '<p style="margin:0;padding:3px 0;font-size:11px;font-family:"Open Sans",Gill Sans,Arial,Helvetica,sans-serif;line-height:13px">For any assistance, visit the below website <a href=' + classified_url + ' style="font-size:11px;font-family:"Open Sans",Gill Sans,Arial,Helvetica,sans-serif;color:#007ebc;text-decoration:none" target="_blank" data-saferedirecturl=' + classified_url + '></a><a href=' + classified_url + ' style="font-size:11px;font-family:"Open Sans",Gill Sans,Arial,Helvetica,sans-serif;color:#008bcf;text-decoration:none" target="_blank"></a></p></td>'
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
                                    str += 'Your Event has been activated successfully.'
                                    str += '</td>'
                                    str += '</tr>'
                                    str += '<tr><td height="10"></td></tr>'
                                    str += '<tr>'
                                    str += '<td style="font-size: 12px;padding: 0px 30px;color: #444444;line-height: 15px;">'
                                    str += 'Your event EPCE' + training_id + ' is now searchable to all users and visitors in EPARDESH website.'
                                    str += '</td>'
                                    str += '</tr>'
                                    str += '<tr><td height="10"></td></tr>'
                                    str += '<tr>'
                                    str += '<td style="font-size: 12px;padding: 0px 30px;color: #444444;line-height: 15px;">'
                                    str += 'You can view your event by clicking the link below or from your my account page.'
                                    str += '</td>'
                                    str += '</tr>'
                                    str += '<tr><td height="35"></td></tr>'
                                    str += '<tr>'
                                    str += '<td style="font-size: 12px;padding: 0px 30px;color: #444444;line-height: 15px;text-align: center;">'
                                    str += '<a style="font-size: 24px;text-decoration: underline; color: blue;" href="http://www.epardesh.com/event-details/'+training_id+'">EPCE' + training_id + '</a>'
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
                                                    
                                                    
                                                    
//                                                    
                                                    var str1 = "<h2>Hi admin,</h2>";
                                                    str1 += "<p>A new AD has been posted with following details: </p>";
                                                    str1 += "<p> User id : " + user_id + "</p>"
                                                    str1 += "<p> Event Title : " + event_tittle + "</p>"
                                                    str1 += "<p> Plan : " + plan_id + "</p>"
                                                    str1 += "<p>Regards,</p>";
                                                    str1 += "<p>Team EPardesh</p>";

                                                    send_email(str, email, 'ePardesh: Your Event EPCE' + training_id + ' has been activated successfully');
                                                    send_email(str1, admin_email, 'ePardesh : New Event posted');


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

///*
// * --------------------------------------------------------------------------
// * approve_events
// * ---------------------------------------------------------------------------
// */
//
//router.post('/approve_events', function (req, res, next) {
//    var event_id = req.body.event_id;
//    var date_approved = new Date();
//    var sql = "select user.email from epardesh_events join user on epardesh_events.user_id=user.id where epardesh_events.id=?";
//    var values = [event_id];
//    connection.query(sql, values, function (err, rows) {
//        if (err) {
//            console.log(err)
//            var errorMsg = 'some error occurred';
//            sendResponse.sendErrorMessage(errorMsg, res);
//        } else {
//            if (rows.length > 0) {
//                var email = rows[0].email;
//                var appprove_event = "update epardesh_events set approved_status=1, date_approved=? where id=?"
//                var event_values = [date_approved, event_id]
//                connection.query(appprove_event, event_values, function (err, rows) {
//                    if (err) {
//                        console.log(err)
//                        var errorMsg = 'some error occurred';
//                        sendResponse.sendErrorMessage(errorMsg, res);
//                    } else {
//                        var str = "<p>Hi,</p>";
//                        str += "<p>Congratulations,your Event has been approved successfully</p>";
//                        str += "<p>Regards,</p>";
//                        str += "<p>Team Epardesh</p>";
//                        var mailOptions = {to: email, subject: 'Event Approved', html: str};
//                        transporter.sendMail(mailOptions, function (error, info) {
//                            if (error) {
//                                var errorMsg = 'some error occurred';
//                                sendResponse.sendErrorMessage(errorMsg, res);
//                            } else {
//                                console.log('Message sent: ');
//                            }
//                        });
//                        var msg = {}
//                        sendResponse.sendSuccessData(msg, res);
//                    }
//                })
//            } else {
//                var errorMsg = 'invalid event id';
//                sendResponse.sendErrorMessage(errorMsg, res);
//            }
//        }
//    })
//})

/*
 * --------------------------------------------------------------------------
 * view_my_events
 * ---------------------------------------------------------------------------
 */

router.post('/view_my_events', function (req, res, next) {
    var access_token = req.body.access_token;
    var user_id = req.body.user_id;
    async.waterfall([
        function (callback) {
            checkUser(res, access_token, callback);
        }],
            function () {
                var get_event_query = "select * from epardesh_events where user_id=?"
                var user_values = [user_id]
                connection.query(get_event_query, user_values, function (err, events) {
                    if (err) {
                        console.log(err)
                        var errorMsg = 'some error occurred';
                        sendResponse.sendErrorMessage(errorMsg, res);
                    } else {
                        sendResponse.sendSuccessData(events, res);
                    }
                })
            })
})

/*
 * --------------------------------------------------------------------------
 * edit_event
 * ---------------------------------------------------------------------------
 */

router.post('/edit_event', function (req, res, next) {
    var access_token = req.body.access_token;
    var event_id = req.body.event_id;
    var event_tittle = req.body.event_tittle;
    var location_type = req.body.location_type;
    var plan_id = req.body.plan_id;
    var event_url = req.body.event_url;
    var event_address = req.body.event_address;
    var event_lattitude = req.body.event_lattitude;
    var event_longitude = req.body.event_longitude;
    var start_date = req.body.start_date;
    var start_time = req.body.start_time;
    var end_date = req.body.end_date;
    var end_time = req.body.end_time;
    var timezone = req.body.timezone;
    var event_image = req.body.event_image;
    var event_phone = req.body.event_phone;
    var description = req.body.description;
    var organisor = req.body.organisor;
    var performer = req.body.performer;
    var performance_type = req.body.performance_type;
    var event_ticket_status = req.body.event_ticket_status;
    var buy_url = req.body.buy_url;
    var user_email = req.body.user_email;
    var user_first_name = req.body.user_first_name;
    var today_date = new Date();

    async.waterfall([
        function (callback) {
            checkUser(res, access_token, callback);
        }],
            function () {
                var update_event_query = "UPDATE epardesh_events SET event_tittle=?,location_type=?,plan_id=?,event_url=?,event_address=?,event_lattitude=?,event_longitude=?,start_date=?,start_time=?,end_date=?,end_time=?,timezone=?,event_image=?,event_phone=?,description=?,organisor=?,performer=?,performance_type=?,event_ticket_status=?,buy_url=?,updated_on=? where id=?"
                var event_values = [event_tittle, location_type, plan_id, event_url, event_address, event_lattitude, event_longitude, start_date, start_time, end_date, end_time, timezone, event_image, event_phone, description, organisor, performer, performance_type, event_ticket_status, buy_url, today_date, event_id]
                connection.query(update_event_query, event_values, function (err, rows) {
                    if (err) {
                        console.log(err)
                        var errorMsg = 'some error occurred';
                        sendResponse.sendErrorMessage(errorMsg, res);
                    } else {
                        var str1 = "<h2>Hi admin,</h2>";
                        str1 += "<p>An new Event with ID " + event_id + " has been edited. </p>";
                        str1 += "<p>Regards,</p>";
                        str1 += "<p>Team EPardesh</p>";

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
                        str += '<td style="font-size:12px;padding:0px 30px;color:#444444;line-height:19px;font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif">Your Event has been successfully updated. View your updated Event using following link.</td>'
                        str += '</tr>'

                        str += '<tr>'
                       // str += '<td style="font-size:12px;padding:0px 30px;color:#444444;line-height:19px;font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif">' + event_id + ' : <a href=' + classified_url + 'setting target="_blank" data-saferedirecturl=' + classified_url + 'setting>' + classified_url + 'setting</a></td>'
                        
                        
                        str += '<td style="text-align:center;font-size:12px;padding:0px 30px;color:#444444;line-height:19px;font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif"><a style="font-size: 22px;margin:20px;font-weight:bold;" href="'+classified_url + 'setting">EPCE'+ event_id + '</a></td>';
                        
                        
                        str += '</tr>'

                        str += '<tr>'
                        str += '<td style="font-size:12px;padding:0px 30px;color:#444444;line-height:19px;font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif">You can also view your Event in your <a href=' + classified_url + 'setting target="_blank" data-saferedirecturl=' + classified_url + 'setting>"My Account"</a></td>'
                        str += '</tr>'

                        str += '<tr>'
                        str += '<td style="font-size:12px;padding:0px 30px;color:#444444;line-height:19px;font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif">Thanks for posting Event with <a href=' + classified_url + ' target="_blank" data-saferedirecturl=' + classified_url + '>ePardesh</a></td>'
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

                        send_email(str, user_email, 'ePardesh :Your Event ' + event_id + ' has been updated successfully');
                        send_email(str1, admin_email, 'ePardesh : Event updated successfully');


                        var msg = {}
                        sendResponse.sendSuccessData(msg, res);

                    }
                })
            })
})

/*
 * --------------------------------------------------------------------------
 * delete/cancel_event
 * ---------------------------------------------------------------------------
 */

router.post('/delete/cancel_event', function (req, res, next) {
    var access_token = req.body.access_token;
    var event_id = req.body.event_id;

    async.waterfall([
        function (callback) {
            checkUser(res, access_token, callback);
        }],
            function () {
                var check_event = "select * from epardesh_events where id=?";
                var event_values = [event_id]
                connection.query(check_event, event_values, function (err, events) {
                    if (err) {
                        console.log(err)
                        var errorMsg = 'some error occurred';
                        sendResponse.sendErrorMessage(errorMsg, res);
                    } else {
                        if (events.length > 0 || events.length > '0') {
                            var cancel_ad_query = "UPDATE epardesh_events SET active_status='2' where id=?"
                            var event_values = [event_id]
                            connection.query(cancel_ad_query, event_values, function (err, rows) {
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
                            var errorMsg = 'invalid id for event';
                            sendResponse.sendErrorMessage(errorMsg, res);
                        }
                    }
                })

            })
})

/*
 * --------------------------------------------------------------------------
 * upgrade_event_plan
 * ---------------------------------------------------------------------------
 */

router.post('/upgrade_event_plan', function (req, res, next) {
    var access_token = req.body.access_token;
    var event_id = req.body.event_id;
    var status = req.body.status;
    async.waterfall([
        function (callback) {
            checkUser(res, access_token, callback);
        }],
            function () {
                var check_event = "select * from epardesh_events where id=?";
                var event_values = [event_id]
                connection.query(check_event, event_values, function (err, events) {
                    if (err) {
                        console.log(err)
                        var errorMsg = 'some error occurred';
                        sendResponse.sendErrorMessage(errorMsg, res);
                    } else {
                        if (events.length > 0 || events.length > '0') {
                            if (status == 1) {
                                var upgrade_ad_query = "UPDATE epardesh_events SET plan_id='1' where id=?"
                                var event_values = [event_id]
                                connection.query(upgrade_ad_query, event_values, function (err, rows) {
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
                                var upgrade_ad_query = "UPDATE epardesh_events SET plan_id='2' where id=?"
                                var event_values = [event_id]
                                connection.query(upgrade_ad_query, event_values, function (err, rows) {
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
 * contact_event_owner
 * INPUT : name, email, phone, id
 * ---------------------------------------------------------------------------
 */
router.post('/contact_event_owner', function (req, res, next) {
    var name = req.body.name;
    var email = req.body.email;
    var phone = req.body.phone;
    var user_id = req.body.user_id;
    var event_id = req.body.event_id;
    var manValues = [name, email, phone, user_id];
    async.waterfall([
        function (callback) {
            func.checkBlank(res, manValues, callback);
        }
    ], function () {
        var get_email = "SELECT * FROM user where id=?";
        var values = [user_id]
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
                    str += '<td style="font-size:20px;padding:0px 30px;color:#444444;font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif">For your Event: <a href="'+classified_url+'setting">' + event_id + '</a></td>';                    
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


                    var mailOptions = {to: business_email, subject: "ePardesh: New contact for your Event " + event_id, html: str};
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

/*
 * --------------------------------------------------------------------------
 * message_event
 * INPUT : name, email, phone, id
 * ---------------------------------------------------------------------------
 */
router.post('/message_event', function (req, res, next) {
    var sender_email = req.body.sender_email;
    var sender_name = req.body.sender_name;
    var message = req.body.message;
    var user_id = req.body.user_id;
    var event_tittle = req.body.event_tittle;
    var event_id = req.body.event_id;
    var get_email = "select * from user where id=?"
    var values = [user_id]
    connection.query(get_email, values, function (err, rows) {
        if (err)
        {
            var errorMsg = 'some error occurred';
            sendResponse.sendErrorMessage(errorMsg, res);
        } else {
            if (rows.length > 0) {
                var email = rows[0].email;
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
//                str += '<td style="font-size:12px;padding:0px 30px;color:#444444;line-height:19px;font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif">You have received a new message from "' + sender_name + '" with email "' + sender_email + '" for event "' + event_tittle + '"</td>'
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
                str += '<td style="font-size:20px;padding:0px 30px;color:#444444;font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif">Dear ' + user_first_name + ',</td>'
                str += '</tr>'
                str += '<tr>'
                str += '<td height="10"></td>'
                str += '</tr>'
                str += '<tr>'
                //str += '<td style="font-size:12px;padding:0px 30px;color:#444444;line-height:19px;font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif">You received a new message from a visitor for your Event ' + event_id + '</td>'
                
                str += '<td style="font-size:12px;padding:0px 30px;color:#444444;line-height:19px;font-family:Open Sans,Gill Sans,Arial,Helvetica,sans-serif">You received a new message from a visitor for your Ad <a href="'+classified_url+'setting">'+ event_id +'</a></td>'

                
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


                var mailOptions = {to: email, subject: "New Message", html: str};
                transporter.sendMail(mailOptions, function (error, info) {
                    if (error) {
                        var msg = "some error occurred";
                        sendResponse.sendErrorMessage(msg, res);
                    } else {
                        console.log('Message sent: ');
                        var data = {}
                        sendResponse.sendSuccessData(data, res);
                    }
                });
            } else {
                var errorMsg = 'invalid user id';
                sendResponse.sendErrorMessage(errorMsg, res);
            }
        }
    })
});



/*
 * --------------------------------------------------------------------------
 * check_event_tittle
 * ---------------------------------------------------------------------------
 */

router.post('/check_event_tittle', function (req, res, next) {
    var event_tittle = req.body.event_tittle;

    var check_tittle = "select * from epardesh_events where event_tittle=?";
    var event_values = [event_tittle]
    connection.query(check_tittle, event_values, function (err, result) {
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