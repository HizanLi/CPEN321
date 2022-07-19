const express = require('express');

const util = require('util');
const app = express();
const request = require('request');

app.post('/user/Report',
    async function (req, res) {
        var myDb = db.db("myDB");
      
        var myCollection;

        var report_Type = req.body.report_Type;
        if(report_Type == "user"){
            myCollection = "reportedUser";
            var reportedUserID = req.body.user_gmail;
            var reportReasonUser = req.body.reason;
            var accountStatus = req.body.accountStatus;
            var userObj = {
                report_Type: report_Type,
                reportedUserid: reportedUserID,
                accountStatus: accountStatus,
                reason: reportReasonUser
            };
            await client.db(myDb).collection(myCollection).insertOne(userObj, function(err, res) {
                if (err) throw err;
                console.log("1 document inserted"+res);
                // db.close();
                res.send(userObj);
              });         
        }else if (report_Type == "facility"){
            myCollection = "reportedFacility";
            var reportedFacilityID = req.body.facility_id;
            var reportedFacilityType = req.body.facility_type;
            var reporterID = req.body.user_id;
            var reportReason = req.body.reason;
            var facilityObj = { 
                          report_Type: report_Type,
                          facility_id: reportedFacilityID,
                          facility_type: reportedFacilityType,
                          reporter_id: reporterID,
                          reason: reportReason
                          }; //replace with real facility name or id or equivalent
            await client.db(myDb).collection(myCollection).insertOne(facilityObj, function(err, res) {
                if (err) throw err;
                console.log("1 document inserted"+res);
                // db.close();
                res.send(facilityObj);
                var url = 'http://localhost:8081/adminApprovalFacility'; //uti needs to be replaced with cloud uri later
                request(url, function(err, response, body) {
                    if (err != null) {
                        var s = util.format("Error: %s", err);
                        console.log(s);
                        res.send(s);
                        return;
                    }else{
                      if (body != "report is unsuccessful"){
                          var newvalues = { $set: {temp_id: body} };
                          await client.db(myDb).collection(myCollection).updateOne(facilityObj,newvalues,function(err, res) {
                              if (err) throw err;
                              console.log("1 document updated" + res);
                              // db.close();
                              var delteFacilityID;
                              var deleteFacilityType;
                              await client.db(myDb).collection(myCollection).findOne({temp_id:body}, function(err, result) {
                                  if (err) throw err;
                                  console.log(result.facility_id+result.facility_type);
                                  // db.close();
                                  delteFacilityID = result.facility_id;
                                  deleteFacilityType = result.facility_type; 
                                  
                                  var facilityFinalQuey = { facility_id: delteFacilityID,
                                                            facility_type: deleteFacilityType};
                                  var finalFacilityStatus = {$set: {facility_status: "Status Reported"} }; //need to confirm how exactly should status look like
                                  await client.db("facility").collection("facilities").updateOne(facilityFinalQuey, finalFacilityStatus, function(err, res) {
                                    if (err) throw err;
                                    console.log(res);
                                    db.close();
                                  });
                                }); 
                              
                            });
                                         
                      }else{
                          res.send("Report rejected, please try again.");
                      }
                    }
                  });
              });
        
        }else{
            myCollection = "reportedComment";
            //TBD
        }
       
    }
)

app.post('/admin/ApprovalofFacility',
	async function (req, res) {
        if(req.body.approve == 0){
            res.send ("report is unsuccessful");
        }
        else{
            res.send(req.body.temp_id); //would it be better to just get name of faility?
        }      
        
	}
)


var server = app.listen(
    8081,
    function () {
	var host = server.address().address;
	var port = server.address().port;
	console.log("Example app listening at http://%s:%s" , host, port);
    });
