import Dispatcher from '../dispatcher.js';
import { TRANSLATE_MESSAGES, GET_TARGETS }  from '../constants/translationconstants';
import key from '../../translate-url.json';
const separator = '?';


export function asyncTranslate(namedLists, target) {
    var translatedNamedLists = {};
    return Bluebird.each(Object.keys(namedLists), (key) => {
        var messages = namedLists[key];
        translatedNamedLists[key] = Bluebird.map(messages, (message) => {
            var queryString = "https://www.googleapis.com/language/translate/v2?";
            queryString =+ "q="+message.text;
            queryString =+ separator;
            queryString =+ "target=";
            queryString =+ target;
            queryString =+ separator;
            queryString =+ "key=";
            queryString =+ key.privateKey;
            var xmlHttpRequest = new XMLHttpRequest();
            xmlHttpRequest.addEventListener("load", translate);
            xmlHttpRequest.open("GET", queryString );
            xmlHttpRequest.send();
        });
        return translatedNamedLists;
    });
}

function translate(translatedNamedLists) {
    console.log('translated data structure:', JSON.parse(translatedNamedLists));
    Dispatcher.dispatch({
        type: TRANSLATE_MESSAGES,
        data: {
            translatedNamedLists
        }
    });
}

export function asyncTranslate(text, target) {
    var queryString = "https://www.googleapis.com/language/translate/v2?";
    queryString =+ "q="+text;
    queryString =+ separator;
    queryString =+ "target=";
    queryString =+ target;
    queryString =+ separator;
    queryString =+ "key=";
    queryString =+ key.privateKey;
    var xmlHttpRequest = new XMLHttpRequest();
    xmlHttpRequest.addEventListener("load", translate);
    xmlHttpRequest.open("GET", queryString );
    xmlHttpRequest.send();
}

export function asyncGetTargets() {
    var queryString = "https://www.googleapis.com/language/translate/v2/languages?";
    queryString += "key=";
    queryString += key.privateKey;
    var xmlHttpRequest = new XMLHttpRequest();
    xmlHttpRequest.addEventListener("load", getTargets);
    xmlHttpRequest.open("GET", queryString );
    xmlHttpRequest.send();
}


function getTargets(targets) {
    var targets = JSON.parse(targets.target.response).data.languages;
    Dispatcher.dispatch({
        type: GET_TARGETS,
        data: {
            targets
        }
    });
}