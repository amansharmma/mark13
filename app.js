var dob=document.querySelector("#date-of-birth");
var btnclick=document.querySelector("#check-button");
var message=document.querySelector("#display-error");

function reverseStr(str){
    var listofchar=str.split('');
    var reversechar=listofchar.reverse();
    return reversechar.join('');
}
function isPalindrome(str){
    return str==reverseStr(str);
}
function convertDatetoStr(date){
    var dateStr={day:'',month:'',year:''};
    if(date.day<10){
        dateStr.day='0'+date.day;
    }
    else{
        dateStr.day=date.day.toString();
    }
    if(date.month<10){
        dateStr.month='0'+date.month;
    }
    else{
        dateStr.month=date.month.toString();
    }
    dateStr.year=date.year.toString();
    return dateStr;
}
function allDateFormats(date){
    var dateStr=convertDatetoStr(date);
     var ddmmyyyy=dateStr.day+dateStr.month+dateStr.year;
     var mmddyyyy=dateStr.month+dateStr.day+dateStr.year;
     var yyyymmdd=dateStr.year+dateStr.month+dateStr.day;
     var ddmmyy=dateStr.day+dateStr.month+dateStr.year.slice[-2];
     var mmddyy=dateStr.month+dateStr.day+dateStr.year.slice[-2];
     var yymmdd=dateStr.year.slice[-2]+dateStr.month+dateStr.day;
     return [ddmmyyyy,mmddyyyy,yyyymmdd,ddmmyy,mmddyy,yymmdd];
}

function checkifany(date){
    var allforms=allDateFormats(date);
    var found=false;

    for(var i=0;i<allforms.length;++i){
     if(isPalindrome(allforms[i])){
         found=true;
         break;
     }
    }
    return found;
}
function leapYear(year){
    if(year%400===0){
        return true;
    }
    if(year%100===0){
        return false;
    }
    if(year%4===0){
        return true;
    }
    return false;
}
function nextday(date){
    var day=date.day;
    var month=date.month;
    var year=date.year;
    var daysofmonth=[31,28,31,30,31,30,31,31,30,31,30,31];
    if(month===2){
        if(leapYear(year)){
           if(day===29){
               month++;
               day=1;
           }
           else{
               day++;
           }
        }
        else{
            if(day===28){
                month++;
                day=1;
            }
            else{
                day++;
            }
        }
    }
    else{
        if(day===daysofmonth[month-1]){
            day=1;
            month++;
        }
        else{
            day++;
        }
    }
    if(month>12){
        year++;
        month=1;
        day=1;
    }
    return {day:day, month:month, year:year};
}
function nearMiss(date){
    var ctr=1;
    var nxtDate=nextday(date);
    while(!checkifany(nxtDate)){
       nxtDate=nextday(nxtDate);
       ctr++;
    }
    return [nxtDate,ctr];
}
function clickHandler(){
    var bdyStr=dob.value;
    if(bdyStr!==""){
      var listofDate=bdyStr.split('-');
      var date={
        
        day: Number(listofDate[2]),
        month:Number(listofDate[1]),
        year:Number(listofDate[0])
    }
    console.log(date);
    if(checkifany(date)){
        message.innerText="Yes your birthday date is a palindrome";
    }
    else{
        var result=nearMiss(date);
        var text="You miss the palindrome date by "+result[1]+" days";
        message.innerText=text;
    }
  }
  else{
      message.innerText="Please enter the date.";
  }
}
btnclick.addEventListener("click",clickHandler);

