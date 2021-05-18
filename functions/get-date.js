const { Timezones } = require('../data/Timezones.json');

function getDate(abbr)
{
    var tzone;
    for (const timezone of Timezones)
    {
        if (timezone.abbr === abbr.toUpperCase())
        {
            tzone = timezone;
            break;
        }
    }

if (tzone == null)
    tzone = {offset: "0"};

var currentTime = new Date();
var timeZoneOffsetFromDB = parseInt(tzone.offset)
var tzDifference = timeZoneOffsetFromDB * 60 + currentTime.getTimezoneOffset();
var offsetTime = new Date(currentTime.getTime() + tzDifference * 60 * 1000);

var date = offsetTime.getFullYear()+'-'+(offsetTime.getMonth()+1)+'-'+offsetTime.getDate();
var time = offsetTime.getHours() + ":" + offsetTime.getMinutes() + ":" + offsetTime.getSeconds();
var  dateTime = date + ' ' + time;
return dateTime;
}

module.exports.getDate = getDate;
