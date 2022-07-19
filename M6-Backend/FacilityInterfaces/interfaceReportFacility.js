
function interfaceReportFacility(reportInfo){
   var approve = reportInfo.approve;
   var reportType = reportInfo.reportType;

   if(approve == null || reportType == null){
    return "Error: Invalid report, missing field."
   }else{
    if(reportType != 5){
        return "Error: Invalid report, wrong report type."
    }else{
            if(approve == 0){
                return "Error: Invalid report, non-approved report."
            }else{
                return "Report succeeded"
            }
        }
   }
 }
 
 module.exports = interfaceReportFacility;
