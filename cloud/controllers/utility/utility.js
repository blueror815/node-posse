module.exports = 
{
  storeName: function ()
  {
	var date = new Date;
	var dayOfWeek = date.getDay(); // Sunday = 0, Monday = 1, etc.

	if (dayOfWeek == 0) {
		return "Sunday";
	} else if(dayOfWeek == 1) {
		return "Monday";
	} else if(dayOfWeek == 2) {
		return "Tuesday";
	} else if(dayOfWeek == 3) {
		return "Wednesday";
	} else if(dayOfWeek == 4) {
		return "Thursday";
	} else if(dayOfWeek == 5) {
		return "Friday";
	} else {
		return "Saturday";
	};
  },
};

// Private variables and functions which will not be accessible outside this file
var privateFunction = function ()
{

};