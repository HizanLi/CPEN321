var express = require('express');
var app = express();

const bodyParser = require('body-parser');
const { application } = require('express');

var util = require('util');
var encoder = new util.TextEncoder('utf-8');
const { MongoClient } = require("mongodb");
const { response } = require("express");
const uri = "mongodb://127.0.0.1:27017"
const client = new MongoClient(uri)


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/**
 * purpose: get a specific detailed look of a post
 */


 app.post('/specific', async(req, res)=>{
    var type = req.body.facility_type;
    console.log(type);
    var numberOfType = parseInt(type);
    console.log(numberOfType);
    switch (numberOfType) {
        case 0:
            type = "posts";
            break;
        case 1:
            type = "studys";
            break;
        case 2:
            type = "entertainments";
            break;
        case 3:
            type = "restaurants";
            break;
        case 4:
            type = "report_user";
            break;
        case 5:
            type = "report_comment";
            break;
        case 6:
            type = "report_facility";
    }
    
    try{
        const result = await client.db("facility").collection(type).findOne({_id: req.body.facility_id});
        console.log(type);
        res.status(200).send(result);
        
    }
    catch(err){
        console.log(err);
        res.status(400).send(err);
    }  
});


//Part1: Create and Manage Account Use Case
app.post('/google_sign_up', (req, res) => { 
    //get request from frontend with these information
    var user_gmail = req.body.email;
    var userName= req.body.userName;
     client.db("Help!Db").collection("User").insertOne({
             "email" : user_gmail, 
             "account_type" : 0,  
             "account_status" : 0, 
             "username": userName, 
             "user_logo": "https://xxx.xxx.xxx", 
             "number_of_credit": 0, 
             "number_of_rate": 0, 
             "number_of_reply": 0, 
             "number_of_facility": 0 
             
     })
     res.send("added user with key " + user_gmail);
 }); 

app.post('/entertainment/newest', async(req, res) => { 
    try{
        //const pageNumber = req.body.pageNumber;
        //const type = req.body.facility_title;
        var length2;
        
        const bigArr = []
        await client.db("facility").collection("entertainments").find({}).sort({_id: -1}).toArray(function(err, result) {
            if (err) throw err;

            try{
                console.log(result[0]._id)
                var len = result.length;
                var o = {} // empty Object
              
                for(var i = 0; i < len; i+=1){
                    // finalResult = {
                    //     [
                    //     facility_id:result[i]._id,
                    //     facility:{facility_title:result[i].facility.facilityTitle,
                    //               facility_Description:result[i].facility.facilityDescription,
                    //               facility_timeAdded:result[i].facility.timeAdded}
                    //     ]
                        
                    // };
                    
                    var arr = [];
                    arr.push(result[i]._id)
                    arr.push(result[i].facility.facilityOverallRate)
                    arr.push(result[i].facility.facilityTitle)
                    arr.push(result[i].facility.facilityDescription)
                    arr.push(result[i].facility.timeAdded)
                    bigArr.push(arr);
                    //o[i].push(finalResult);
                }
                length2 = bigArr.length;
                // bigArr.push(bigArr.length);
                var final = {};
                final["result"]=bigArr;
                final["length"]=length2;
                res.send(final);
            }catch(err){
                console.log(err)
                res.status(400).send(err);
            }
          });
    }
    catch(err){
        console.log(err);
        res.status(400).send(err);
    }    
}); 

/**
 * Purpose: Caculates overallrate of a facility and records each users' rate of a particular facility
 * Pre: Each user rates a faiclity with a score
 * Post: Sets overall score based on all users' ratings for a particular facility
 */
app.get('/user/RateFacility',
    async function (req, res) {
        //when connecting with frontend use below two lines
        //var facility_id = req.body.facility_id
        //
        // var rateScores = req.body.userRates;
        //userRates.push(rateScores)
        var myDb = "facility";

        //confirm this with frontend
        var requestJson = {_id:"awe32wewwwyyhh32456789@gmail.com", rateScore:1.3,facility_type:"entertainment", facility_id:23};

         await client.db(myDb).collection("userRateInfo").insertOne(requestJson, function (err, res) {
            var finalResult = JSON.stringify(res);
            if (err) throw err;
            console.log(finalResult);
        });
      
        const userRates = [];
        const ratedUsers = []; //replace by frontend stuff later
        await client.db(myDb).collection("userRateInfo").find().forEach(function (myDoc) {
            userRates.push(myDoc.rateScore);
            console.log(userRates);
            ratedUsers.push(myDoc._id);
            console.log(ratedUsers);   
        });
        // userRates.push(requestJson.rateScore);
        const overAllRateScore = userRates.reduce((a, b) => a + b, 0) / userRates.length;
        console.log(overAllRateScore);

       
        const ratedUserField =  ratedUsers ;
        console.log(ratedUserField);
        // console.log("here is result:" +JSON.stringify(ratedUsers[0]));
        // console.log("this is parseINn:" + parseIn);
        for (i = 0; i < ratedUsers.length; i++) {
        const resultUserRates = await client.db(myDb).collection("users").findOne({_id:ratedUsers[i]});
        console.log("resultRtae is" + JSON.stringify(resultUserRates.number_of_rate));
            var myquery= {_id:ratedUsers[i]}
            var newvalues ={$set: { "number_of_rate": resultUserRates.number_of_rate+=1 }}
             await client.db(myDb).collection("users").updateOne(myquery, newvalues, function (err, res) {
                if (err) throw err;
                console.log("The status for updating field is:" + JSON.stringify(res));
            });

        }


        try {

            const result = await client.db(myDb).collection("entertainments").findOne({ _id: "3" });
            console.log("facility type is: " + result.facility.facilityType);


            var myquery = { _id: "2" }; //replace 1 with facility_id from frontend
            var newvalues = {
                $set: {
                    "facility": {
                        "facility_status": result.facility.facility_status,
                        "facilityType": result.facility.facilityType,
                        "facilityTitle": result.facility.facilityTitle,
                        "facilityDescription": result.facility.facilityDescription,
                        "timeAdded": result.facility.timeAdded,
                        "facilityImageLink": result.facility.facilityImageLink,
                        "facilityOverallRate": overAllRateScore,
                        "numberOfRates": userRates.length,
                        "longtitude": result.facility.longtitude,
                        "latitude": result.facility.latitude
                    },
                    "ratedUser": ratedUserField
                }
            };

            await client.db(myDb).collection("entertainments").updateOne(myquery, newvalues, function (err, res) {
                if (err) throw err;
                console.log("The status for updating field is:" + JSON.stringify(res));

            });
            res.status(200).send(userRates);

        }
        catch (err) {
            console.log(err);
            res.status(400).send(err);
        }

    }
)


/**
 * Purpose: user reports inapporatiate facilities and puts this request in query
 * Pre: User must make a report dedicated to a facility
 * Post: Request puts in qujery
 */
app.post('/user/Report/facility',
    async function (req, res) {
        var myDb = "facility";  //change this to Help!Db at the end
        var myCollection;
        myCollection = "reportedFacility";

        //following fouyr should all come from frontend
        var reportedFacilityID = "1";
        var reportedFacilityType = "entertainments"; //need to chaange this to something frontend sends later 
        var reporterID = "jiajungao0124@gmail.com";
        var reportReason = "idk caonima";

        const reportredResultQuery = await client.db("facility").collection(reportedFacilityType).findOne({ _id: reportedFacilityID });

        var finalReportDecision = {
            old_id: reportedFacilityID,
            facility_type: reportedFacilityType,
            reason: reportReason,
            reporter: reporterID,
            facility_title: reportredResultQuery.facility.facilityTitle,
            facility_description: reportredResultQuery.facility.facilityDescription,
            facility_timeAdded: reportredResultQuery.facility.timeAdded,
            facility_imagelink: reportredResultQuery.facility.facilityImageLink,
            facility_overallRate: reportredResultQuery.facility.facilityOverallRate,
            facility_numberOfRates: reportredResultQuery.facility.numberOfRates,
            facility_reviews: reportredResultQuery.facility.reviews
        }
        //sending request to admin and wait for approbal or denial
        await client.db(myDb).collection(myCollection).insertOne(finalReportDecision, function (err, res) {
            var finalResult = JSON.stringify(res);
            if (err) throw err;
            console.log(finalResult);
        });
        console.log("final decision is: " + JSON.stringify(finalReportDecision));
    }
)


/**
 * Purpose: user reports inapporatiate facilities and puts this request in query
 * Pre: User must make a report dedicated to a facility
 */
app.get('/user/Report/comment',
    async function (req, res) {
        var myDb = "facility";
        var myCollection;
        myCollection = "reportedComment";

        //follwing four needs to match with frontend
        var reportedFacilityID = "7";
        var reportedFacilityType = "entertainments"; //need to chaange this to something frontend sends later 
        var reporterID = "jiajungao0124@gmail.com";
        var reportReason = "idk caonima";

        var commentQuery = [];


        const reportredResultQuery = await client.db("facility").collection(reportedFacilityType).findOne({ _id: reportedFacilityID });

        for(i=0;i<reportredResultQuery.reviews.length;i++){
            commentQuery.push(reportredResultQuery.reviews[i].replyContent);
            console.log(commentQuery);
        }

        var finalReportDecision = {
            old_id: reportedFacilityID,
            facility_type: reportedFacilityType,
            reason: reportReason,
            reporter: reporterID,
            comments: commentQuery
        }
        //sending request to admin and wait for approbal or denial
        await client.db(myDb).collection(myCollection).insertOne(finalReportDecision, function (err, res) {
            var finalResult = JSON.stringify(res);
            if (err) throw err;
            console.log(finalResult);
        });
        console.log("final decision is: " + JSON.stringify(finalReportDecision));
    }
)


/**
 * Purpose:  Admin handles all kinds of report request and make decision
 * Pre: Admin reveiws all information from user query
 * Post:  Admin approves report if report is valid or else admin denies report
 */
app.get('/admin/reportApproval',
    async function (req, res) {
        //need things from frontend and change it later
        var responseJson = {
            report_type: "comment",
            temp_id: 1,
            approve: 1
        }
        var myDb = "facility"; //change myDb to Help!Db at the end
        var myCollection ;
        var oldFacilityID;
        var facility_type;
        var finalResult = JSON.stringify(responseJson);
        if (responseJson.report_type == "facility") {
            myCollection = "reportedFacility";
            var finalDecisionArray = [];
            await client.db(myDb).collection(myCollection).find().forEach(function (myDoc) {
                var innerArray = [];
                oldFacilityID = myDoc.old_id;
                facility_type = myDoc.facility_type;
                var reportReason = myDoc.reason;
                var reporterID = myDoc.reporter;
                var facilityTitle = myDoc.facility_title;
                var descriptionFacility = myDoc.facility_description;
                var timeAddedFacility = myDoc.facility_timeAdded;
                var imageLink = myDoc.facility_imageLink;
                var overallrateFacility = myDoc.facility_overallRate;
                var numOfRates = myDoc.facility_numberOfRates;
                var reviewsFacility = myDoc.facility_reviews;
                innerArray = [oldFacilityID, facility_type, reportReason, reporterID, facilityTitle, descriptionFacility, timeAddedFacility,
                    imageLink, overallrateFacility, numOfRates, reviewsFacility];
                // console.log("inner array is: " + innerArray);

                finalDecisionArray.push(innerArray);
                // console.log("outer array is: " + finalDecisionArray);
            });

            res.send(finalDecisionArray);

            //change facility status if approved
            if (responseJson.approve == 1) {
                const reportredResultQuery = await client.db(myDb).collection(facility_type).findOne({ _id: oldFacilityID });
                var finalReportDecisionJSON = {
                    "facility_status": finalResult,
                    "facilityType": reportredResultQuery.facility.facilityType,
                    "facilityTitle": reportredResultQuery.facility.facilityTitle,
                    "facilityDescription": reportredResultQuery.facility.facilityDescription,
                    "timeAdded": reportredResultQuery.facility.timeAdded,
                    "facilityImageLink": reportredResultQuery.facility.facilityImageLink,
                    "facilityOverallRate": reportredResultQuery.facility.facilityOverallRate,
                    "numberOfRates": reportredResultQuery.facility.numberOfRates,
                    "longtitude": reportredResultQuery.facility.longtitude,
                    "latitude": reportredResultQuery.facility.latitude
                }
                var myquery = { _id: oldFacilityID };
                var newvalues = { $set: { "facility": finalReportDecisionJSON } };
                console.log(oldFacilityID);

                await client.db(myDb).collection(facility_type).updateOne(myquery, newvalues, function (err, res) {
                    if (err) throw err;
                    console.log("The status for updating field is:" + JSON.stringify(res));
                });
            }
        }
        else {
            myCollection = "reportedComment";
            var finalDecisionArrayB = [];
            await client.db(myDb).collection(myCollection).find().forEach(function (myDoc) {
                var innerArrayB = [];
                var oldFacilityIDB = myDoc.old_id;
                var facility_typeB = myDoc.facility_type;
                var reportReasonB = myDoc.reason;
                var reporterIDB = myDoc.reporter;
                var comments =myDoc.comments;
              
                innerArrayB = [oldFacilityIDB, facility_typeB, reportReasonB, reporterIDB, comments];
               

                finalDecisionArrayB.push(innerArrayB);
               

            });
            res.send({result:finalDecisionArrayB});
            if (responseJson.approve == 1) {
                var reportedComment = "fuck this big big big huge shit";
                facility_type="entertainments";
                const reportredResultQueryB = await client.db(myDb).collection("entertainments").findOne({ _id: "7"});
               
                var updateObj ={};
            
                for(i=0;i<reportredResultQueryB.reviews.length;i++){
                    console.log("comment is: " + reportredResultQueryB.reviews[i].replyContent);
                    if(reportredResultQueryB.reviews[i].replyContent ==reportedComment){
                       

                          updateObj = {
                                            replierID: reportredResultQueryB.reviews[i].replierID,
                                            numberOfUpvote: reportredResultQueryB.reviews[i].numberOfUpvote,
                                            numberOfDownvote: reportredResultQueryB.reviews[i].numberOfDownvote,
                                            replyContent: reportredResultQueryB.reviews[i].replyContent,
                                            timeOfReply: reportredResultQueryB.reviews[i].timeOfReply
                                        };
                  
                    }
                    }

                    // console.log("This is update obj: "+ JSON.stringify(updateObj));
                    
                      await client.db(myDb).collection("entertainments").updateOne(
                      
                        { _id: "7" },
                        {
                            $pull: {"reviews": updateObj}
                        }
                    );

             
            }
        }
    }
)
