import * as functions from "firebase-functions";

var admin = require("firebase-admin");
var serviceAccount = require("./demoproj-xinyuzhang-firebase-adminsdk-ai11k-db995a5e26.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });


// exports.customers = functions.region('us-central1').https.onRequest((request, response) => {
//     var customerList: any[] = []
//     let customersRef = admin.firestore().collection('customer')
//     return customersRef.limit(10).get()
//     .then(async (queryResult: any[]) => {
//         queryResult.forEach((doc) => {
//             var tempDoc = doc.data
//             customerList.push(tempDoc)
//         })
//         response.json({
//             result: customerList
//         })
//     })
// });

exports.customers = functions.https.onRequest((req, res)=> {
    admin
    .firestore()
    .collection('customer').limit(10).orderBy('created_at_num')
    .get()
    .then((data: any[])=>{
        let screams: any[] =[];
        data.forEach(doc =>{
            screams.push(doc.data());
        });
        return res.json(screams);
    })
    .catch((err: any)=> console.error(err));
});

exports.addCustomer = functions.https.onRequest(async (req, res) => {
    const name1 = "aaaaaa";
    const writeResult = await admin.firestore().collection('customer').add({
        name: name1,
        created_at: admin.firestore.Timestamp.fromDate(new Date()),
        created_at_num: admin.firestore.FieldValue.serverTimestamp()
    });
    res.json({result: `Customers with ID: ${writeResult.id} added.`});
});