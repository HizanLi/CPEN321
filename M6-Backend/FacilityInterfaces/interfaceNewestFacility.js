
function interfaceNewestFacility(info){
    const  testQuery = [];
    var finalResult={};

    if(info.length == 0){
        finalResult = {result:"", length:info.length};
    }
    else{
        for(i=0;i<info.length;i++){
            testQuery[i] = info[i];
        }

        finalResult = {result:testQuery, length:info.length};
    }

    return finalResult;
   
 }
 
 module.exports = interfaceNewestFacility;
 
