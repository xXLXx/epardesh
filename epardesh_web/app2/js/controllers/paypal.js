
//----------------------------------------------------------------
// Paypal

function editionPayment() {
    console.log("in function");
    this.checkoutParameters = {};
}

/*-------------------------------------------------------------------
 * paypal intigration for checkout
 ---------------------------------------------------------------------*/

// define checkout parameters
editionPayment.prototype.addCheckoutParameters = function (serviceName, merchantID, options) {

    // check parameters
    if (serviceName != "PayPal") {
        throw "serviceName must be 'PayPal'.";
    }
    if (merchantID == null) {
        throw "A merchantID is required in order to checkout.";
    }

    // save parameters
    this.checkoutParameters[serviceName] = new checkoutParameters(serviceName, merchantID, options);
}
// check out
editionPayment.prototype.checkout = function (serviceName, paymentdata, returnUrl) {
    console.log("in checkout");
    console.log(serviceName);

    if (serviceName == null) {
        var p = this.checkoutParameters[Object.keys(this.checkoutParameters)[0]];
        serviceName = p.serviceName;
    }
    //    if (serviceName == null) {
    //        throw "Use the 'addCheckoutParameters' method to define at least one checkout service.";
    //    }

    // go to work
    var parms = this.checkoutParameters[serviceName];
    if (parms == null) {
        throw "Cannot get checkout parameters for '" + serviceName + "'.";
    }
    switch (parms.serviceName) {
        case "PayPal":
            this.checkoutPayPal(parms, paymentdata, returnUrl);
            break;
        default:
            throw "Unknown checkout service: " + parms.serviceName;
    }
}

editionPayment.prototype.checkoutPayPal = function (parms, paymentdata, returnUrl) {
    var form = "";

    form += "<form name='theForm' style='display:none;' method='POST' action= 'https://www.sandbox.paypal.com/cgi-bin/webscr'>";
    form += "<input type='hidden' name='amount_1' value='" + paymentdata + "'></input>";
    form += "<input type='hidden' name='cmd' value='_cart'></input>";
    form += "<input type='hidden' name='business' value='contactsumit22-facilitator@gmail.com'></input>";
    form += "<input type='hidden' name='charset' value='utf-8'></input>";
    form += "<input type='hidden' name='upload' value='1'></input>";
    form += "<input type='hidden' name='rm' value='2'></input>";
    form += "<input type='hidden' name='item_number_1' value='1'></input>";
    form += "<input type='hidden' name='item_name_1' value='Premium'></input>";
    form += "<input type='hidden' name='quantity_1' value='1'></input>";
    form += "<input type='hidden' name='tx' value=''></input>";
    form += "<input type='hidden' name='return' value='" + returnUrl + "'></input>";
    form += "</form>";

    document.body.innerHTML += form;
    //    ("body").append(form);
    document.theForm.submit();
}


//----------------------------------------------------------------
// checkout parameters (one per supported payment service)
//
function checkoutParameters(serviceName, merchantID, options) {
    this.serviceName = serviceName;
    this.merchantID = merchantID;
    this.options = options;
}
