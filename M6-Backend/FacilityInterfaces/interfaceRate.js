
function interfaceRate(rateScore){
   if(rateScore.length == 0){
    return 0;
   }
    const testQuery = []
    for(i=0;i<rateScore.length;i++){
        testQuery[i] = rateScore[i];
    }
    result = testQuery.reduce((a, b) => a + b, 0) / rateScore.length
    return result;
}

module.exports = interfaceRate;
