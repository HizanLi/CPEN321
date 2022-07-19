
function interfacespecific(numberOfType){
    switch (numberOfType) {
        case 0:
            return "posts";
            
        case 1:
            return  "studys";
            
        case 2:
            return  "entertainments";
            
        case 3:
            return  "restaurants";
            
        case 4:
            return  "report_user";
            
        case 5:
            return  "report_comment";
            
        case 6:
            return  "report_facility";
    }
}



module.exports = interfacespecific;
