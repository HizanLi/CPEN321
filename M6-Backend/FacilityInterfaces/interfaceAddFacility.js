
function interfaceAddFacility(Info){
    var newId = Info.id;
    var title = Info.title;
    var description = Info.description;
    var long = parseFloat(Info.long);
    var lat = parseFloat(Info.lat);
    var type = Info.type;  
    var facilityImageLink = Info.facilityImageLink;

    var finalResult;

    if(newId == null || title == null || description == null || long == null || lat==null
        || type == null || facilityImageLink == null){
            return "Error:Invalid add, missing field";
        }else{
            finalResult ={
                id: newId,
                facility:
                {
                    "facilityType": type,
                    "facility_status": "normal",
                    "facilityTitle": title,
                    "facilityDescription": description,
                    "facilityImageLink": facilityImageLink,
                    "facilityOverallRate": 0,
                    "numberOfRates": 0,
                    "timeAdded": "timeAdded",
                    "longitude": long,
                    "latitude": lat
                },
                "rated_user": [{}],
                "reviews": [{}]
            }
            return finalResult;

        }
   
 }
 
 module.exports = interfaceAddFacility;
 
