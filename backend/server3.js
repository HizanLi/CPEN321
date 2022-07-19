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

//for accessing other apis
const request = require('request');
app.use(express.json());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const OneSignal = require('@onesignal/node-onesignal') ;

const app_key_provider = {
    getToken() {
        return 'MjJiMGQ3ODAtNjIzNC00ZjBkLTgxNGYtMDY0M2YxYWJlNjE0';
    }
};

const configuration = OneSignal.createConfiguration({
    authMethods: {
        app_key: {
        	tokenProvider: app_key_provider
        }
    }
});
const client3 = new OneSignal.DefaultApi(configuration);

app.post('/sendToDevice3', async function(req, res){
    var gmails = req.body.gmails; // gmail is a array
    var notificationType = req.body.notificationType;
    var numberOfType = parseInt(xx);
    console.log(numberOfType);
    switch (numberOfType) {
        case 0:
            notificationType = "you have an review";
            break;
        case 1:
            notificationType = "your reported comment is approved";
            break;
        case 2:
            notificationType = "your reported facility is addressed";
            break;
        case 3:
            notificationType = "a new facility has been added to the app";
            break;
        case 4:
            notificationType = "you received an upvote";
            break;
        case 5:
            notificationType = "you received an downvote";
            break;
        case 6:
            notificationType = "??";
    }


    const notification = new OneSignal.Notification();
    notification.app_id = 'f38cdc86-9fb7-40a5-8176-68b4115411da';
    //notification.included_segments = ["test1"];
   
    //notification.email = "test223344@gmail.com";
    //console.log(notification.included_segments)
    notification.contents = {
        en: notificationType
    };
    notification.channel_for_external_user_ids = "push",
    
    //notification.channel_for_external_user_ids= "push"
    notification.include_external_user_ids = []
    for(var i = 0 ; i < gmails.length; i++){
        notification.include_external_user_ids.push(gmails[i]);
    }
    
    const {id} = await client3.createNotification(notification);
    console.log(id)
    res.send("successfully notified");
      
    // const response2 =  await client2.getNotification(ONESIGNAL_APP_ID, id);
})


// app.put('/comment/add', async (req, res) => {
//     // var type = req.body.facilityType; //string
//     // const facilityId = req.body.facility_id //string
//     // const userId = req.body.user_id //string
//     // const replyContent = req.body.replyContent //string
//     // const userName = req.body.username;
//     // const rateScore = req.body.rateScore;
//     var type = "3"; //string
//     const facilityId = "4" //string
//     const userId = "1" //string
//     const replyContent = "im testing" //string
//     const userName = "Simon Xia"
//     const rateScore = "4"

//     console.log(req.body);

//     var numberOfType = parseInt(type);
//     console.log(numberOfType);
//     switch (numberOfType) {
//         case 0:
//             type = "posts";
//             break;
//         case 1:
//             type = "studys";
//             break;
//         case 2:
//             type = "entertainments";
//             break;
//         case 3:
//             type = "restaurants";
//             break;
//         case 4:
//             type = "report_user";
//             break;
//         case 5:
//             type = "report_comment";
//             break;
//         case 6:
//             type = "report_facility";
//     }
//     var date_ob = new Date();
//     var year = date_ob.getFullYear();
//     var month = date_ob.getMonth();
//     var date = date_ob.getDate();
//     var hours = date_ob.getHours();
//     var minutes = date_ob.getMinutes();
//     var seconds = date_ob.getSeconds();
//     //const timeAdded = year + "/" + month + "/" +  date 
//     const timeAdded = year + "/" + month + "/" + date + "/" + hours + "/" + minutes + "/" + seconds;
//     const finding = await client.db("Help!Db").collection(type).findOne({"reviews.replierID" : userId});
//     console.log("finding is" + JSON.stringify(finding));
//     if(finding == null){
//         try {
//             const result = await client.db("Help!Db").collection(type).updateOne(
//                 { _id: facilityId },
//                 {
//                     $push: {
//                         "reviews": {
//                             replierID: userId,
//                             userName: userName,
//                             rateScore:rateScore,
//                             upVotes: 0,
//                             downVotes: 0,
//                             replyContent: replyContent,
//                             timeOfReply: timeAdded
//                         }
//                     }
//                 }
//             );
//             await client.db("Help!Db").collection(type).updateOne(
//                 { _id: facilityId },
//                 {
//                     $inc: {
//                         "facility.numberOfRates":1
//                     }
//                 }
//             );
//             await client.db("Help!Db").collection("users").updateOne(
//                 { _id: userId },
//                 {
//                     $inc: {
//                         "number_of_reply": 1
//                     }
//                 }
//             );
//             console.log(result);
//             res.send(result);
//         }
//         catch (err) {
//             console.log(err);
//             res.status(400).send(err);
//         }
//     }
//     else{
//         console.log("already exist");
//         res.send("already exist the comment")
//     }
    
// });

async function run() {
    try {
        await client.connect();
        console.log(" successfully connect to db");
        var server = app.listen(3000, (req, res) => {
            var host = server.address().address;
            var port = server.address().port;
            console.log("Example app is running" + "with address" + host + "port: " + port);            
        })
    } catch (err) {
        console.log("error")
        await client.close()
    }
}
run();
