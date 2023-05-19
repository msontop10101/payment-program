// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, onValue, push } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


// Store Data to localstorage
const JSONtoString = (obj) => JSON.stringify(obj);  // returns a string
const StringtoJSON = (str) => JSON.parse(str);  // returns an object

const strorageKey = 'xcxviDv::'
// Environment variable
const env = process.env;
const apiKey = env.REACT_APP_API_KEY;
const appId = env.REACT_APP_APP_ID;
const collection = env.REACT_APP_COLLECTION_NAME;

console.log({
apiKey,
appId,
collection
})

// Firebase config
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: apiKey,
    authDomain: "lifepayment-40885.firebaseapp.com",
    projectId: "lifepayment-40885",
    storageBucket: "lifepayment-40885.appspot.com",
    messagingSenderId: "318813611939",
    appId: appId,
    measurementId: "G-86673DZLDZ",
    databaseURL: "https://lifepayment-40885-default-rtdb.firebaseio.com"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Realtime Database and get a reference to the service

const database = getDatabase(app);

function slugify(text) {
    // Slugify a text by
    // -> converting to lowercase
    // -> replacing all spaces with underscore
    return text.toLowerCase().replaceAll(' ', '_')
}


/**
 * Structure now in localstorage is
 *      payId: {
 *                  id: string,
 *                  name: string,
 *                  amount: number
 *              }
 * 
 *    Then to save
 *      id: {
 *                  payId: string,
 *                  name: string,
 *                  amount: number
 *              }
 */


function save({name, amount}) {

    const payId = slugify(name);
    let remoteId; // track online id
    let userData = {
        name,
        amount: Number(amount) || 0
    };

    // Load document from db
    let existingData = localStorage.getItem(strorageKey);

    if (existingData !== null){ // if record is in storage
        // Data is expected to be string,
        //    convert the object string to object
        existingData = StringtoJSON(existingData);

        // identify the existing record for the name
        let record = existingData[payId];

        if (record?.id){
            const { id, amount:previousAmount } = record;
            remoteId = id;
            userData.amount += Number(previousAmount) || 0
        }
    }

    // If there is a remoteId, update by record id
    //   otherwise, push and create a new record
    if (remoteId) {
        const dref = ref(database, `${collection}/${remoteId}`);
        set(dref, { ...userData, payId });
    } else {
        const dref = ref(database, collection);
        push(dref, { ...userData, payId });
    }
}

function liveRecord(){
    
    // Whenever there is a change
    //    save change straight to localstorage

    const paymentRef = ref(database, collection);

    onValue(paymentRef, (snapshot) => {
        const data = snapshot.val() || {};        
        const entry = {};

        Object.entries(data).forEach(([remoteId, remoteData])=>{
            const {payId, ...rest} = remoteData;

            entry[payId] = {
                id: remoteId,
                ...rest
            }
        })

        localStorage.setItem(strorageKey, JSONtoString(entry));
    });

    return []

}

function load() {
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

export default liveRecord;

export { save, load };
