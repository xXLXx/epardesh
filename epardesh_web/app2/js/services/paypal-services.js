(function() {
    'use strict';
    var serviceId = "editionPayment";
    angular.module("app")
            .service(serviceId, function() {
        var pay = new editionPayment();
        //enable paypal checkout
        pay.addCheckoutParameters("PayPal", "contactsumit22-facilitator@gmail.com");
        // return data object with store and cart
        return {
            payment: pay
        };
    });
})();
