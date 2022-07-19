var express = require('express'); 
var app = express(); 
  
const bodyParser = require('body-parser'); 
const { application } = require('express');

const {MongoClient} = require("mongodb");
const { response } = require("express");
const e = require('express');
const uri ="mongodb://localhost:27017"
const client = new MongoClient(uri)

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 
  

//create account with google
app.post('/google_sign_up', async(req, res) => { 
   //var user_id = generate_new_user_id(); // write a method to generate a user id for new user
    const user_gmail = req.body.email;
    const userName= req.body.userName;
    const result= await client.db("user").collection("users").find({_id : user_gmail}).toArray();
    console.log(result);
    if(result.length === 0){
        await client.db("user").collection("users").insertOne({
            _id : user_gmail, 
            "account_type" : 0,  
            "account_status" : 0, 
            "username": userName, 
            "user_logo": "https://xxx.xxx.xxx", 
            "number_of_credit": 0, 
            "number_of_rate": 0, 
            "number_of_reply": 0, 
            "number_of_facility":0 
            
        })
    res.send("Added to the db");
    }else{
        res.send(result);
    }
}); 

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


/**
 * purpose: get 5 most recent added posts 
 * explanation for teammate: sort(-1) means descending order and limits means the number of records
 * return: an array consists of id, date, description, title, and the length of the array
 */

app.post('/posts/newest', async(req, res) => { 
    try{
        var length2;
        const bigArr = []
        await client.db("facility").collection("posts").find({}).sort({_id: -1}).toArray(function(err, result) {
            if (err) throw err;
            try{
                console.log(result[0]._id)
                var len = result.length;
                for(var i = 0; i < len; i+=1){
                    var arr = [];
                    arr.push(result[i]._id)
                    arr.push(result[i].facility.facilityOverallRate)
                    arr.push(result[i].facility.facilityTitle)
                    arr.push(result[i].facility.facilityDescription)
                    arr.push(result[i].facility.timeAdded)
                    bigArr.push(arr);
                }
                length2 = bigArr.length;
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


// return all the posts which title matched
app.post('/posts/search', async(req, res) => { 
    var keyWordSearched = req.body.input;
    try{
        await client.db("facility").collection("posts").find({"facility.facilityTitle": keyWordSearched}).toArray(function(err, result) {
            if (err) throw err;
            console.log(result);
            res.send(result);
        });
    }
    catch(err){
        console.log(err);
        res.status(400).send(err);
    }  
}); 

app.post('/entertainment/newest', async(req, res) => { 
    try{
        var length2;
        const bigArr = []
        await client.db("facility").collection("entertainment").find({}).sort({_id: -1}).toArray(function(err, result) {
            if (err) throw err;

            try{
                console.log(result[0]._id)
                var len = result.length;
                for(var i = 0; i < len; i+=1){
                    var arr = [];
                    arr.push(result[i]._id)
                    arr.push(result[i].facility.facilityOverallRate)
                    arr.push(result[i].facility.facilityTitle)
                    arr.push(result[i].facility.facilityDescription)
                    arr.push(result[i].facility.timeAdded)
                    bigArr.push(arr);
                }
                length2 = bigArr.length;
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

app.post('/entertainment/search', async(req, res) => { 
    var keyWordSearched = req.body.input;
    try{
        await client.db("facility").collection("entertainment").find({"facility.facilityTitle": keyWordSearched}).toArray(function(err, result) {
            if (err) throw err;
            console.log(result);
            res.send(result);
        });
    }
    catch(err){
        console.log(err);
        res.status(400).send(err);
    }  

}); 

app.post('/restaurant/newest', async(req, res) => { 
    try{
        var length2;
        const bigArr = []
        await client.db("facility").collection("restaurant").find({}).sort({_id: -1}).toArray(function(err, result) {
            if (err) throw err;
            try{
                console.log(result[0]._id)
                var len = result.length;        
                for(var i = 0; i < len; i+=1){
                    var arr = [];
                    arr.push(result[i]._id)
                    arr.push(result[i].facility.facilityOverallRate)
                    arr.push(result[i].facility.facilityTitle)
                    arr.push(result[i].facility.facilityDescription)
                    arr.push(result[i].facility.timeAdded)
                    bigArr.push(arr);
                }
                length2 = bigArr.length;
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

app.post('/restaurant/search', async(req, res) => { 
    var keyWordSearched = req.body.input;
    try{
        await client.db("facility").collection("restaurant").find({"facility.facilityTitle": keyWordSearched}).toArray(function(err, result) {
            if (err) throw err;
            console.log(result);
            res.send(result);
        });
    }
    catch(err){
        console.log(err);
        res.status(400).send(err);
    }  
}); 



app.post('/study/newest', async(req, res) => { 
    try{
        var length2;
        const bigArr = []
        await client.db("facility").collection("study").find({}).sort({_id: -1}).toArray(function(err, result) {
            if (err) throw err;
            try{
                console.log(result[0]._id)
                var len = result.length;        
                for(var i = 0; i < len; i+=1){
                    var arr = [];
                    arr.push(result[i]._id)
                    arr.push(result[i].facility.facilityOverallRate)
                    arr.push(result[i].facility.facilityTitle)
                    arr.push(result[i].facility.facilityDescription)
                    arr.push(result[i].facility.timeAdded)
                    bigArr.push(arr);
                }
                length2 = bigArr.length;
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

app.post('/study/search', async(req, res) => { 
    var keyWordSearched = req.body.input;
    try{
        await client.db("facility").collection("study").find({"facility.facilityTitle": keyWordSearched}).toArray(function(err, result) {
            if (err) throw err;
            console.log(result);
            res.send(result);
        });
    }
    catch(err){
        console.log(err);
        res.status(400).send(err);
    }  
}); 


// -------------------------------------------------------------
/**
 *  can we store this in a temporary database
 */
app.post('/requestFacility/user', async (req, res) =>{
    const title = req.body.title             
    const description = req.body.description
    const location = req.body.location
    var approved = false;
    const type = req.body.facilityType; 

    var date_ob = new Date();
    var year = date_ob.getFullYear();
    var month = date_ob.getMonth();
    var date = date_ob.getDate();
    var hours = date_ob.getHours();
    var minutes = date_ob.getMinutes();
    var seconds = date_ob.getSeconds();
    const timeAdded = year + "/" + month + "/" +  date 
    //const timeAdded = year + "/" + month + "/" +  date + "/" +  hours + "/" +  minutes + "/" + seconds;
    const lastOne = await client.db("facility").collection(type).find({}).sort({_id: -1}).limit(1).toArray();
    console.log(lastOne);
    var newId = "1";
    if(lastOne.length ==0){
       
    }
    else{
        var d = lastOne[lastOne.length-1]._id;
        var dd = parseInt(d);
        dd+=1;
        newId = dd.toString();
    }
    // await client.db("facility").collection(type).insertOne(req.body); // in this case, frontend send us a JSON file with complete information
    await client.db("facility").collection(type).insertOne({
        _id: newId,  
        "facility": 
                {
                    "facilityType": type,
                    "facilityTitle":title,
                    "facilityDescription": description,
                    "facilityImageLink": "",
                    "facilityOverallRate": 0,
                    "numberOfRates" : 1,
                    
                    "location" : location,
                    
                    "timeAdded": timeAdded
                },
        "rated_user": {},
        "reviews": {}
    });
    res.send("Requested item added successfully");
    //await client.db("facility").collection("facilities").find(facility_title: addedFacilityTitle{$exists: true}))
});

// figure out what is sent from the frontend; i want a boolean and id? if id is not maybe which post u are dealing with
// display to 5 items
app.post('/RequestFacility/Admin', async (req, res) =>{
    const pageNumber = req.body.pageNumber;
    const bigArr = [];
    await client.db("facility").collection("test4").find({}).sort({_id: -1}).toArray(function(err, result) {
        if (err) throw err;
        try{
            var len = result.length;
            for(var i = (pageNumber-1)*5; i < len; i=i+pageNumber){
                var arr = [];
                arr.push(result[i]._id)
                arr.push(result[i].facility.facilityTitle)
                arr.push(result[i].facility.facilityDescription)
                arr.push(result[i].facility.timeAdded)
                //arr.push(result[i].facility.facilityOverallRate)
                bigArr.push(arr);
            }
            res.send(bigArr)
        }catch(err){
            console.log(err)
            res.status(400).send(err);
        }
    });
});


// use id to fetch a specific 
app.post('/RequestFacility/Admin/Approval', async (req, res) =>{
    const approval = req.body.approval;
    const id = req.body._id;
    const temp = await client.db("facility").collection("test4").find({_id : id});
    const type = temp.facility.facilityType;
    const name = temp.facility.facilityTitle;
    // firstly ensure if the facility is already existed in the db 
    client.db("facility").collection(type).find({"facility.facilityTitle":name}).toArray(function(err, result) {
        if(result.length !== 0){
            // oops
            res.send("This facility already exists");
        }
        else{
            if(approval == true){
                client.db("facility").collection(type).insertOne(temp);
                res.send(" Admin approved the request!");
            }
            else{
                res.send(" Admin disapproved the request");
            }
        }
    })
});



//following two report method are similar to this one
app.put('/comment/add', async (req, res) => { 
    const type = req.body.facilityType; //string
    const facilityId    = req.body.facility_id //string
    const userId    = req.body.user_id //string
    const replyContent = req.body.replyContent //string

    var date_ob = new Date();
    var year = date_ob.getFullYear();
    var month = date_ob.getMonth();
    var date = date_ob.getDate();
    var hours = date_ob.getHours();
    var minutes = date_ob.getMinutes();
    var seconds = date_ob.getSeconds();
    //const timeAdded = year + "/" + month + "/" +  date 
    const timeAdded = year + "/" + month + "/" +  date + "/" +  hours + "/" +  minutes + "/" + seconds;
        try{
            const result = await client.db("facility").collection(type).updateOne(
                {_id: facilityId},
                {
                    $push: { 
                        "reviews" : {
                            replierID : userId,
                            upVotes: 0,
                            downVotes:0,
                            replyContent: replyContent,
                            timeOfReply: timeAdded
                        }  
                    }
                }
            );
            res.send(result);
        }
        catch(err){
            console.log(err);
            res.status(400).send(err);
        }              
}); 

app.put('/comment/remove', async (req, res) => { 
    const type = req.body.facilityType; //string
    const facilityId    = req.body.facility_id //string
    const userId    = req.body.user_id //string
    const replyContent = req.body.replyContent //string
    const upVotes = req.body.upVotes;
    const downVotes = req.body.downVotes;
    const timeAdded = req.body.timeAdded;
        try{
            const result = await client.db("facility").collection(type).updateOne(
                {_id: facilityId},
                {
                    $pull: { 
                        "reviews" : {
                            replierID : userId,
                            upVotes: upVotes,
                            downVotes: downVotes,
                            replyContent: replyContent,
                            timeOfReply: timeAdded
                        }  
                    }
                }
            );
            res.send(result);
        }
        catch(err){
            console.log(err);
            res.status(400).send(err);
        }           
}); 

//do the follwing locally? or do it with one more filed in DB
/**
 * Purpose: This is the credit calculator API which grants and removes credits when condions are met
 * Pre:  If user report others or make a review or add a facility
 * Post: User credit increase by xx amount if add place successfully; if report successful add by xx amount; if receive upvote add by xx amount 
 */
app.put('/creditHandling/report', async(req, res) => {
   
    const additionCredit_makeReport = 3;
    
    let AdditionType = req.body.AdditionType;
    let goodUserId = req.body.upUserId;
    let badUserId = req.body.downUserId;

    const result = await client.db("user").collection("users").findOne({_id : goodUserId});
    console.log(result);
    var currentadderCredits = result.number_of_credit; 
    const result2 = await client.db("user").collection("users").findOne({_id : badUserId});
    var currentSubtractorCredits = result2.number_of_credit;

    if (AdditionType == "report"){
        currentadderCredits += additionCredit_makeReport;
        currentSubtractorCredits -= additionCredit_makeReport;
    }else{
        console.log("No credits granted since no contributions made, please make contribution before any credit is granted");
        return;
    }
    await client.db("user").collection("users").updateOne( { _id: goodUserId },
        { $set:
           {
            number_of_credit: currentadderCredits,
           }
        }
    );
    await client.db("user").collection("users").updateOne( { _id: badUserId },
        { $set:
           {
            number_of_credit: currentSubtractorCredits,
           }
        }
    );
    res.send("success");
    
}); 

app.put('/creditHandling/normal', async(req, res) => {
    const additionCredit_addFacility = 5;
    const additionCredit_comment = 1;
    let AdditionType = req.body.AdditionType;
    let goodUserId = req.body.upUserId;

    const result = await client.db("user").collection("users").findOne({_id : goodUserId});
    console.log(result);
    var currentadderCredits = result.number_of_credit; 
    // const result2 = await client.db("user").collection("users").findOne({_id : badUserId});
    // var currentSubtractorCredits = result2.number_of_credit;

    if(AdditionType == "addFacility"){
        currentadderCredits += additionCredit_addFacility;
    }else if (AdditionType == "comment"){
        currentadderCredits += additionCredit_comment;
    }else{
        res.send("No credits granted since no contributions made, please make contribution before any credit is granted; AdditionType is not matched in this case!");
    }
    await client.db("user").collection("users").updateOne( { _id: goodUserId },
        { $set:
           {
            number_of_credit: currentadderCredits,
           }
        }
    );
    res.send("success");
    
}); 


//running the actual server at port xxxx
async function run(){
   try{ 
       await client.connect();
       console.log(" successfully connect to db");
       var server = app.listen(8000, (req, res) =>{
           var host = server.address().address;
           var port = server.address().port;
           console.log("Example app is running" + "with address" + host + "port: " + port);
       })
   }catch(err){
       console.log("error")
       await client.close()
   }
}
run();
