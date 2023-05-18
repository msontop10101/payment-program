// Store Data to localstorage

const JSONtoString = (obj) => JSON.stringify(obj);  // returns a string
const StringtoJSON = (str) => JSON.parse(str);  // returns an object

const strorageKey = 'xcxviDv::'

function slugify(text) {
    // Slugify a text by
    // -> converting to lowercase
    // -> replacing all spaces with underscore
    return text.toLowerCase().replaceAll(' ', '_')
}

function save({name, amount}) {

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

    const payId = slugify(name);
    let newAmount = Number(amount);

    // If user has paid before
    if (existingData[payId]?.amount) {
        // Add the new amount to the existing amount
        newAmount += Number(existingData[payId].amount)
    }

    // Save to localstorage
    const newDbData = JSONtoString({
        ...existingData,
        [payId]: { ...existingData[payId], name, amount: newAmount}
    });

    localStorage.setItem(strorageKey, newDbData);

    return Object.values(newDbData); // an array

}

function load(){
    let existingData = localStorage.getItem(strorageKey);

    if (existingData !== null) { // if there is an existing data
        // convert existing data from string to an object
        existingData = StringtoJSON(existingData);
        existingData = Object.values(existingData); // array
    } else {
        existingData = []
    }

    return existingData;

}


export { save, load };
