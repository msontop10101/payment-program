// Store Data to localstorage

const JSONtoString = (obj) => JSON.stringify(obj);  // returns a string
const StringtoJSON = (str) => JSON.parse(str);  // returns an object

const strorageKey = 'xcxv::'

function save(data) {

    // Read all the data in localstorage
    let existingData = localStorage.getItem(strorageKey);

    if (existingData !== null){
        // Data is expected to be string,
        //    convert the object string to object
        existingData = StringtoJSON(existingData);
    } else {
        // Otherwise
        existingData = []
    }

    // Save to localstorage
    const newDbData = JSONtoString([...existingData, data]);

    localStorage.setItem(strorageKey, newDbData);

    return newDbData;

}

function load(){
    let existingData = localStorage.getItem(strorageKey);

    if (existingData !== null) { // if there is an existing data
        // convert existing data from string to an object
        existingData = StringtoJSON(existingData);
    } else {
        existingData = []
    }

    return existingData;

}


export { save, load };