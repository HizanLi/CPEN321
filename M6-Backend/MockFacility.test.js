//Test Set 1 --> Testing the interface specific for module facility
const interfacespecific = require('./interfacespecific');

test("interfacespecific invalid input", ()=>{
  expect(interfacespecific("ll@@@@}}")).not.toEqual('posts');
})

test("interfacespecific number out of bound", ()=>{
  expect(interfacespecific(100000)).not.toEqual('studys');
})

test("interfacespecific inbound wrong type", ()=>{
  expect(interfacespecific(1)).not.toEqual('posts');
})

test("interfacespecific posts success", ()=>{
  expect(interfacespecific(0)).toEqual('posts');
})

test("interfacespecific studys success", ()=>{
  expect(interfacespecific(1)).toEqual('studys');
})

test("interfacespecific entertainments success", ()=>{
  expect(interfacespecific(2)).toEqual('entertainments');
})

test("interfacespecific restaurants success", ()=>{
  expect(interfacespecific(3)).toEqual('restaurants');
})



//Test 2--> Test set for rate interface
const interfaceRate = require('./interfaceRate');

test("interfacesRate invalid input", ()=>{
  expect(interfaceRate("ll@@@@}}")).not.toEqual(0);
})

test("empty rate", ()=>{
  expect(interfaceRate([])).toEqual(0);
})

test("interfacesRate valid array invalid result", ()=>{
  expect(interfaceRate([1,2,3])).not.toEqual(3);
})

test("interfacesRate valid array and valid result", ()=>{
  expect(interfaceRate([1,2,3,4,5,6,7,8])).toEqual(4.5);
})


//Test set 3 -->   Test set for newest
const interfaceNewest = require('./interfaceNewestFacility');

test("interfaceNewest invalid input", ()=>{
  expect(interfaceNewest("ll@@@@}}")).not.toEqual({result:"",length:0});
})

test("interfaceNewest empty input", ()=>{
  expect(interfaceNewest([])).toEqual({result:"",length:0});
})

test("interfaceNewest valid input invalid result", ()=>{
  expect(interfaceNewest(["3","3","3"])).not.toEqual({result:"",length:5});
})

test("interfaceNewest valid input and valid result", ()=>{
  expect(interfaceNewest(["item one","item 2",{item3:"item three"}])).
  toEqual({result:["item one","item 2",{item3:"item three"}],length:3});
})

//Test set 4 -->   Test set for addFacility
const interfaceAddFacility = require('./interfaceAddFacility');

test("interfaceNewest invalid input", ()=>{
  expect(interfaceAddFacility("ll@@@@}}")).not.toEqual({result:"",length:0});
})

test("interfaceNewest invalid due to missing field", ()=>{
  expect(interfaceAddFacility({id:1})).toEqual("Error:Invalid add, missing field");
})

test("interfaceNewest valid input", ()=>{
  expect(interfaceAddFacility({id:2,title:"facility title",description:"facility description",
                               long:"23.346778",lat:"-123.34456", type:"studys",
                               facilityImageLink:"https://example.png"})).
                              toEqual({
                                id: 2,
                                facility:
                                {
                                    "facilityType": "studys",
                                    "facility_status": "normal",
                                    "facilityTitle": "facility title",
                                    "facilityDescription": "facility description",
                                    "facilityImageLink": "https://example.png",
                                    "facilityOverallRate": 0,
                                    "numberOfRates": 0,
                                    "timeAdded": "timeAdded",
                                    "longitude": 23.346778,
                                    "latitude": -123.34456
                                },
                                "rated_user": [{}],
                                "reviews": [{}]
                            });
                            })

//Test set 5 -->   Test set for reportFacility


const interfaceReportFacility = require('./interfaceReportFacility');

test("interfaceReportFacility invalid input", ()=>{
  expect( interfaceReportFacility("ll@@@@}}")).not.toEqual({result:"",length:0});
})

test("interfaceReportFacility invalid due to missing field", ()=>{
  expect( interfaceReportFacility({approve:3})).toEqual("Error: Invalid report, missing field.");
})

test("interfaceReportFacility invalid due to report type", ()=>{
  expect( interfaceReportFacility({reportType:7,approve:0})).toEqual("Error: Invalid report, wrong report type.");
})

test("interfaceReportFacility valid report", ()=>{
  expect( interfaceReportFacility({reportType:5,approve:1})).toEqual("Report succeeded");
})




// Test set 6 --> test for search logic return


const example2 = jest.fn( x =>'posts');

//const xxx = require("./xxx.js")
function xx(type, example1) {
  var numberOfType = parseInt(type);
  console.log(numberOfType);
  type = example1(numberOfType);
  return type;
}

//const foo = require("./foo")
test("interface for specific testing mocking posts", ()=>{
  expect(xx("0", example2)).toEqual("posts")
  expect(example2.mock.calls.length).toBe(1);
  expect(example2.mock.calls[0][0]).toBe(0);
  expect(example2.mock.results[0].value).toBe("posts");
})


function yy(result, returnLogic){
  var final = returnLogic(result);
  return final;
}
const example3 = jest.fn( x =>final={"result":[[8,0,"Ice cream","Ice cream is a sweetened frozen food typically eaten as a snack or dessert. It may be made from milk or cream and is flavoured with a sweetener, either sugar or an alternative, and a spice, such as cocoa or vanilla, or with fruit such as strawberries or peaches. Wikipedia","2022/6/11"]],"length":1});

test("lalalala", ()=>{
  expect(yy({"_id":8,"facility":{"facilityType":"posts","facility_status":"normal","facilityTitle":"Ice cream","facilityDescription":"Ice cream is a sweetened frozen food typically eaten as a snack or dessert. It may be made from milk or cream and is flavoured with a sweetener, either sugar or an alternative, and a spice, such as cocoa or vanilla, or with fruit such as strawberries or peaches. Wikipedia","facilityImageLink":"https://imgtu.com/i/jyXa9K","facilityOverallRate":0,"numberOfRates":0,"timeAdded":"2022/6/11","longitude":null,"latitude":null},"rated_user":[{}],"reviews":[{}]}, example3)).toEqual({"result":[[8,0,"Ice cream","Ice cream is a sweetened frozen food typically eaten as a snack or dessert. It may be made from milk or cream and is flavoured with a sweetener, either sugar or an alternative, and a spice, such as cocoa or vanilla, or with fruit such as strawberries or peaches. Wikipedia","2022/6/11"]],"length":1})
 
})





// return logic test 8 
const work = jest.fn( x =>  [ [11 , 4.1, "engineering", "Engineering is the use of scientific principles to design and build machines, structures, and other items, including bridges, tunnels, roads, vehicles, ...", "2022/6/11"] ] );
var ttt = {
  "_id" : 11,
  "facility" : {
          "facility_status" : "normal",
          "facilityType" : "posts",
          "facilityTitle" : "engineering",
          "facilityDescription" : "Engineering is the use of scientific principles to design and build machines, structures, and other items, including bridges, tunnels, roads, vehicles, ...",
          "timeAdded" : "2022/6/11",
          "facilityImageLink" : "https://imgtu.com/i/jyXa9K",
          "facilityOverallRate" : 4.113636363636363,
          "numberOfRates" : 89,
          
  },
  "ratedUser" : [],
  "reviews" : []
}
function returnLogic(ttt , callback) {
  var final = {}
  var bigArr = [];
  bigArr.push(ttt); //result is a big JSON of two elements 
  var arr = [];
  for (var i = 0; i < bigArr.length; i++) {
      arr.push(bigArr[i])
  }
  

  var theOne = callback(arr); //return [ ["1" , 4.5, "aa", "aacontent", "xxx"], ["2" , 3.5, "b", "bbcontent", "yyy"] ]
  var length2 = theOne.length;
  final["result"] = theOne;
  final["length"] = length2;
  console.log("return is ")
  console.log(final)
  return final; // {"result" :  , "length" : 2}
}

test("test 8", ()=>{
  expect(returnLogic(ttt, work)).toEqual({ "result" :[[11 , 4.1, "engineering", "Engineering is the use of scientific principles to design and build machines, structures, and other items, including bridges, tunnels, roads, vehicles, ...", "2022/6/11"]]  , "length" : 1})

})
