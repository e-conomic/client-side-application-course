
var url = 'https://www.googleapis.com/language/translate/v2'

var key;
// key = insert key here

module.exports = url + '?key=' + process.env.GOOGLE_TRANSLATE_APIKEY || key;
