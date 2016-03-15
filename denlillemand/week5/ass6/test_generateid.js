import _ from 'lodash';

function generateId(dictionary) {
    let ids = Object.keys(dictionary).map((value, index, array) => {
        return dictionary[value].map((message, index, array) => {
            return message.id;
        });
    });
    let flattenedIds = _.flatten(ids);
    if(flattenedIds.length === 0) {
        return 1;
    } else {
        return Math.max(...flattenedIds) + 1;
    }
}

var dictionary = {
};

console.log(generateId(dictionary));