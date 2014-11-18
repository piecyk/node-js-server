var logger = require('./../logger');
var Flight = require('./flight');

function FlightHandler(from, to, dateFlights) {
    this.from = from;
    this.to = to;
    this.dateFlights = dateFlights;
}

FlightHandler.prototype.add = function(price) {
    Flight.add(this.from, this.to, this.dateFlights, new Date(), price);
};

var request = require('request');
var cheerio = require('cheerio');

FlightHandler.prototype.check = function(done) {

    /**
       POST /SkySales/ItiPriceRequest-resource.aspx?keys=0~K~~K6LOW~BND6~~1~X|FR~2136~%20~~STN~11/28/2014%2017:45~RZE~11/28/2014%2021:15~_0~L~~L6LOW~BND6~~1~X|FR~2137~%20~~RZE~11/30/2014%2016:55~STN~11/30/2014%2018:35~ HTTP/1.1
       Host: www.bookryanair.com
       Connection: keep-alive
       Content-Length: 0
       Accept: application/json, text/plain,
       Origin: https://www.bookryanair.com
       User-Agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/38.0.2125.111 Safari/537.36
       Referer: https://www.bookryanair.com/SkySales/Booking.aspx
       Accept-Encoding: gzip,deflate
       Accept-Language: pl-PL,pl;q=0.8,en-US;q=0.6,en;q=0.4
       Cookie: ASP.NET_SessionId=regdjxezp5552beibo45qcm5qt45; rateCodes=%7B%22en-IE%22%3A%22FOP%22%7D; s_cm=Typed%2FBookmarkedTyped%2FBookmarkedundefined; s_ev44=%5B%5B'Direct'%2C'1416252959657'%5D%5D; drcsess=28752720169; s_cc=true; prevPage=website%3A%20ie%3A%20booking%3A%20select%3A%20none; s_cm_dl=1; s_sq=ryanairprod%3D%2526pid%253Dwebsite%25253A%252520ie%25253A%252520booking%25253A%252520select%25253A%252520none%2526pidt%253D1%2526oid%253DSEARCH%2526oidt%253D3%2526ot%253DSUBMIT; New_Location=regd
    */

    //keys=0~K~~K6LOW~BND6~~1~X|FR~2136~%20~~STN~11/28/2014%2017:45~RZE~11/28/2014%2021:15~_0~L~~L6LOW~BND6~~1~X|FR~2137~%20~~RZE~11/30/2014%2016:55~STN~11/30/2014%2018:35~
    //keys:0~K~~K6LOW~BND6~~1~X|FR~2136~ ~~STN~11/28/2014 17:45~RZE~11/28/2014 21:15~_0~L~~L6LOW~BND6~~1~X|FR~2137~ ~~RZE~11/30/2014 16:55~STN~11/30/2014 18:35~

    // request(
    //     { method: 'POST'
    //       , uri: 'https://www.bookryanair.com/SkySales/ItiPriceRequest-resource.aspx?keys=0~B~~B4LOW~BND4~~4~X|FR~1183~%20~~LGW~11/28/2014%2013:10~SNN~11/28/2014%2014:40~'
    //     }
    //     , function (error, response, body) {
    //         // body is the decompressed response body
    //         console.log('server encoded the data as: ' + (response.headers['content-encoding'] || 'identity'));
    //         console.log('the decoded data is: ' + body);
    //         // TODO: the decoded data is: {"Error": "SessionExpired", "Msg": "Your session has expired!"}
    //         done();
    //     }
    // );

    var j = request.jar();
    var url = 'https://www.bookryanair.com/SkySales/Booking.aspx';
    var uri = 'www.bookryanair.com';
    var headers = {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.8; rv:24.0) Gecko/20100101 Firefox/24.0',
        'Content-Type' : 'application/x-www-form-urlencoded'
    };
    var form = {
        'ADULT':'1',
        'sector1_d':'LEI',
        'sector1_o':'aSTN',
        'sector_1_d':'28',
        'sector_1_m':'112014',
        'sector_2_d':'00',
        'sector_2_m':'--',
        'tc':'1',
        'travel_type':'on',
        'acceptTerms':'yes',
        'zoneDiscount':'',
        'fromAirportName':'London Stansted',
        'toAirportIATA':'Almeria',
        'dateFlightFromInput':'11/28/2014',
        'dateFlightToInput':'',
        'adultQuantityInput':'More',
        'CHILD':'0',
        'INFANT':'0'
    };

     request({
         method: 'GET',
         url: url,
         headers: headers,
         form: form,
         jar: j 
     }, function (error, response, body) {
         var cookie_string = j.getCookieString(uri); // "key1=value1; key2=value2; ..."
         console.log("cs ", cookie_string);
         var cookies = j.getCookies(uri);
         console.log("Cs: ", cookies);

         console.log(response.headers);
         done();
     });

};

exports = module.exports = FlightHandler;

//crone with nodejs
//nodejs tor new ip
