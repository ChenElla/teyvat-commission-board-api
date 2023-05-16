const { db } = require("../lib/init-firebase");
const { collection } =require('firebase/firestore');

exports.commissionCollectionRef = collection(db, 'commissions');