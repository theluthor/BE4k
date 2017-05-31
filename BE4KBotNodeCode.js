
/* for completing this activity and exporting output to 
next activity use $export(error, data) 
more help can be found here: http://bmp.io/4uih3ej */


/** This is the functions for the bot to return information **/


var theResult = [];
// set up result to return empty in case of inaction
theResult[0]="";

//lookup into countryavail
resultCountryAvail="";

var messageBack="";

var theFullfilment="";
var country="";
var GVEService="";
var countryAvail = {"DateLastUpdate":"5/17/17",
                    "Now":["Argentina","Australia","Belgium","Canada","Colombia","Dominican Republic","France","Germany","Indonesia","Ireland","Italy","Malaysia","Mexico","New Zealand","Puerto Rico","Spain","United Kingdom","UK","United Kingdom of Great Britain and Northern Ireland","England","Ireland","United States","USA","United States of America"],
                    "EndFY17":["Brazil","Chile","Costa Rica","Republic of Korea","Peru","Philippines","Saudi Arabia","Singapore","Thailand","Turkey"]};
var queryEmail="Your query to TSNGVE for QUERYDESCRIPTION is ready to be submitted using this [email](tsn-request@cisco.com?subject=QUERYSUBJECT&body=Brief%20Subject:%20QUERYBODYSUBJECT%0D%0ACustomer%20Name:%20QUERYCUSTOMERNAME%0D%0ARequested%20Due%20Date:%20QUERYDUEDATE%0D%0ADeal%20ID:%20QUERYDEALID%0D%0ATechnologies%20Involved:%20QUERYTECHS%0D%0ADescription:%20QUERYDESCRIPTION). \
Feel free to add any details to the email text that could help get the case assigned and resolved faster before sending it from your email client.";

// function to replace all characters in a string with a different character. From http://dumpsite.com/forum/index.php?topic=4.msg8#msg8
String.prototype.replaceAll = function(str1, str2, ignore) 
{
    return this.replace(new RegExp(str1.replace(/([\/\,\!\\\^\$\{\}\[\]\(\)\.\*\+\?\|\<\>\-\&])/g,"\\$&"),(ignore?"gi":"g")),(typeof(str2)=="string")?str2.replace(/\$/g,"$$$$"):str2);
} 


if ($request.body.hasOwnProperty('result')) 
    if ($request.body.result.hasOwnProperty('metadata')) 
    {
        if ($request.body.result.metadata.hasOwnProperty('intentName')) 
            GVEService=$request.body.result.metadata.intentName;
    }


$console.log("GVEService:"+GVEService);


switch (GVEService)
        {
    case "service.customer-engagement.menu.option2":
    case "service.customer-engagement":
        // first fill out the part before the email URI, regular spaces are allowed
        if ($request.body.originalRequest.data.data.personEmail.indexOf('@cisco.com')>-1)
            queryEmail=queryEmail.replace("TSNGVE", "TSN");
        else
            queryEmail=queryEmail.replace("TSNGVE", "Partner Helpline");
        
        queryEmail=queryEmail.replace("QUERYDESCRIPTION", "a Customer or Opportunity Engagement");   
        
        // from now on, no spaces are allowed in the markdown string that specifies the Markdown URI, must place %20
        queryEmail=queryEmail.replace("QUERYSUBJECT", "Request for a BE4K related Customer Engagement".replaceAll(" ","%20"));  
        queryEmail=queryEmail.replace("QUERYBODYSUBJECT", "Request for a BE4K related Customer Engagement".replaceAll(" ","%20"));  
        queryEmail=queryEmail.replace("QUERYCUSTOMERNAME", ""); 
        queryEmail=queryEmail.replace("QUERYDUEDATE", $request.body.result.parameters.date); 
        queryEmail=queryEmail.replace("QUERYDEALID", $request.body.result.parameters.DealID_num); 
        queryEmail=queryEmail.replace("QUERYTECHS", "Collaboration, Business Edition 4000".replaceAll(" ","%20"));   
        queryEmail=queryEmail.replace("QUERYDESCRIPTION", "I need to schedule a Cisco Virtual Systems Engineer to meet with my customer as part of a Customer Engagement service to talk about the BE4K solution on ".replaceAll(" ","%20")+$request.body.result.parameters.date+" at ".replaceAll(" ","%20")+$request.body.result.parameters.time+". I am aware that the service has a 48 hour lead time for meeting scheduling from the time an engineer is assigned to the case.".replaceAll(" ","%20"));
        theResult[0]=queryEmail;
        break;

    case "service.BoM":
    case "service.BoM.menu.option1":
        // first fill out the part before the email URI, regular spaces are allowed
        if ($request.body.originalRequest.data.data.personEmail.indexOf('@cisco.com')>-1)
            queryEmail=queryEmail.replace("TSNGVE", "TSN");
        else
            queryEmail=queryEmail.replace("TSNGVE", "Partner Helpline");
        
        queryEmail=queryEmail.replace("QUERYDESCRIPTION", "a preliminary BoM request");   
        
        // from now on, no spaces are allowed in the markdown string that specifies the Markdown URI, must place %20
        queryEmail=queryEmail.replace("QUERYSUBJECT", "Request for BE4K Preliminary BoM".replaceAll(" ","%20"));   
        queryEmail=queryEmail.replace("QUERYBODYSUBJECT", "Request for BE4K Preliminary BoM".replaceAll(" ","%20"));  
        queryEmail=queryEmail.replace("QUERYCUSTOMERNAME", ""); 
        queryEmail=queryEmail.replace("QUERYDUEDATE", ""); 
        queryEmail=queryEmail.replace("QUERYDEALID", ""); 
        queryEmail=queryEmail.replace("QUERYTECHS", "Collaboration, Business Edition 4000".replaceAll(" ","%20"));   
        queryEmail=queryEmail.replace("QUERYDESCRIPTION", "Please prepare and share with me in CCW a preliminary BoM for a BE4K solution with ".replaceAll(" ","%20")+$request.body.result.parameters.nPSTN_ports+" PSTN ports, ".replaceAll(" ","%20")+$request.body.result.parameters.nFXS_ports+" FXS Ports, ".replaceAll(" ","%20")+$request.body.result.parameters.nAmount_Phones+" IP Phones model ".replaceAll(" ","%20")+$request.body.result.parameters.Model_Phones1);
        
        
        theResult[0]=queryEmail;
        break;

    case "list.availability":
    case "list.availability.menu.option":
        if ($request.body.hasOwnProperty('result')) 
        {
            country = $request.body['result']['parameters']['geo-country'];


            if (countryAvail["Now"].indexOf(country)>=0 )     
            {
                resultCountryAvail="now";

            }
            else
                if (countryAvail["EndFY17"].indexOf(country)>=0 ) 
                {
                    resultCountryAvail="by end of July 2017";
                }
            else
            {
                resultCountryAvail="NA";
            }


            if (resultCountryAvail=="NA")
            {
                messageBack="The BE4K solution is not available in your country, try using BE6K or CME";
            }
            else
            {
                messageBack="The BE4K is available in "+country+" "+resultCountryAvail;
            }

            // Tell the user the result of the country avail query
            theResult[0]=messageBack;


        }
        break;


}

$export(null, theResult);
//$export(null, { done : true });