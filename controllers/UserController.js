const { db } = require("../lib/init-firebase");
const { doc, collection, getDocs, getDoc, addDoc, updateDoc, deleteDoc,query,where,documentId } = require("firebase/firestore");
const { checkEmailValid, checkServerValid} = require('../lib/validation');

// GET "/users"
exports.getAllUsers = (req, res) => {
  const userCollectionRef = collection(db, "users");
  getDocs(userCollectionRef)
    .then((response) => {
      const users = response.docs.map((doc) => ({
        data: doc.data(),
        id: doc.id,
      }));
      res.status(200).json(users);
    })
    .catch((error) => res.status(400).json(error.message));
};
// POST "/users"
exports.addUser = (req, res) => {
  const userCollectionRef = collection(db, "users");
  if (!req.body.username||!checkServerValid(req.body.server)||!checkEmailValid(req.body.email)) res.status(400).json("Please make sure every field is valid");
  addDoc(userCollectionRef,req.body)
    .then((response) => {
      res.status(200).json({data:req.body, id:response.id, timestamp:Date.now()});
    })
    .catch((error) => res.status(400).json(error.message));
};

// GET "/users/:id"
exports.getProfile = (req, res) => {
    const { id } = req.params;
    if(!id) res.status(404).send("Please include the user id");
    const userRef = doc(db, "users",id);
    getDoc(userRef).then(data => {
        if(!(data.data()))
            res.status(404).send("This user does not exist.");
        else
            res.status(200).json({data: data.data(), id: data.id});
    }).catch(error => res.status(400).json(error.message));
}
// GET "/users/:id/history_coms"
exports.getHisComs = (req, res) => {
  const { id } = req.params;
  if(!id) res.status(404).send("Please include the user id");
  const userRef = doc(db, "users",id);
  getDoc(userRef).then(data => {
      // const requests =[];
      if(!(data.data()))
          res.status(404).send("This user does not exist.");
      else{
        const hisComs=data.data().historyCommissions;
        if(hisComs&&hisComs.length){
          const Ids = hisComs.map(comRef=>comRef.id);
          const q = query(
            collection(db, "commissions"),
            where(documentId(), "in", Ids)
          );
          getDocs(q)
          .then((response) => {
            const commissions = response.docs.map((doc) => {
              const commission = doc.data();
              
              commission.userId = commission.userId.id;
              if(commission.helperId)
                  commission.helperId = commission.helperId.map(helperId => helperId.id);
              return ({ data: commission,
                        id: doc.id 
                      })
          });
            res.status(200).json(commissions);
          })
          .catch((error) => res.status(400).json(error.message));
        }
        else 
          res.status(200).json([]);
      }}).catch(error => res.status(400).json(error.message));
}
// GET "/users/:id/history_reqs"
exports.getHisReqs = (req, res) => {
  const { id } = req.params;
  if(!id) res.status(404).send("Please include the user id");
  const userRef = doc(db, "users",id);
  getDoc(userRef).then(data => {
      // const requests =[];
      if(!(data.data()))
          res.status(404).send("This user does not exist.");
      else{
        const hisComs=data.data().historyRequests;
        if(hisComs&&hisComs.length){
          const Ids = hisComs.map(comRef=>comRef.id);
          const q = query(
            collection(db, "commissions"),
            where(documentId(), "in", Ids)
          );
          getDocs(q)
          .then((response) => {
            const commissions = response.docs.map((doc) => {
              const commission = doc.data();
              
              commission.userId = commission.userId.id;
              if(commission.helperId)
                  commission.helperId = commission.helperId.map(helperId => helperId.id);
              return ({ data: commission,
                        id: doc.id 
                      })
          });
            res.status(200).json(commissions);
          })
          .catch((error) => res.status(400).json(error.message));
        }
        else 
          res.status(200).json([]);
      }}).catch(error => res.status(400).json(error.message));
}

// PUT "/users/:id"
exports.updateProfile = (req, res) => {
    const { id } = req.params;
    const userRef = doc(db, "users", id);
    if (!id) res.status(400).json("Please include a valid userId");
    updateDoc(userRef, req.body)
        .then((response) => res.status(200).json("Success"))
        .catch((error) => res.status(400).json(error.message));
};

// DELETE "/users/:id"
exports.deleteUser = (req, res) =>{
    const { id } = req.params;
    const userRef = doc(db, "users", id);
    if(userRef)
        res
        .status(404)
        .send(`User with id: ${req.params.id} is not found.`);
    deleteDoc(userRef)
    .then((data) => {
        res.status(204).send();
    })
    .catch((error) =>
      res.status(500).send(`Error deleting User ${req.params.id} ${error.message}`)
    );
} 

