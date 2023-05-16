// {  [ { cid:UNIQUE INT, uid: UNIQUE INT, wl: INT(1-8), ar:INT (16-60), category: VARCHAR(300), duration: VARCHAR(20), status:BOOLEAN, comment: VARCHAR(256) } …]}
const {
  doc,
  getDocs,
  getDoc,
  updateDoc,
  addDoc,
  deleteDoc,
  query,
  where,
  arrayUnion,
  increment
} = require("firebase/firestore");
const { db } = require("../lib/init-firebase");
const { commissionCollectionRef } =require("../lib/firestore.collections");
const { checkServerValid } = require('../lib/validation');
// GET "/commissions/"
exports.getAllCommissions = (req, res) => {
    getDocs(commissionCollectionRef)
    .then((response) => {
      const commissions = response.docs.map((doc) => ({
        data: doc.data(),
        id: doc.id,
      }));
      res.status(200).json(commissions);
    })
    .catch((error) => res.status(400).json(error.message));
};

exports.getAvaCom= (req, res) => {
  const q = query(commissionCollectionRef, where("isAvailable","==",true));
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
};
// POST "/commissions/"
exports.addCommission = (req, res) => {
  const com = req.body;
  if (
    !com ||
    !(com.ar>=0) ||
    !(com.wl>=0) ||
    !com.category ||
    !com.username||
    !(com.isAvailable)||
    com.isClosed||
    !com.duration ||
    !com.location ||
    !com.requiredPlayerNumber ||
    !com.server ||
    !com.userId
  ) {
    return res.status(400).send("Some fields are not filled in.");
  }
  if(!checkServerValid(com.server)) return res.status(400).send("Invalid servers");
  com.userId = doc(db,'users/' + com.userId);
  com.timestamp = Date.now();
  addDoc(commissionCollectionRef, com)
        .then((response) => {
        const userRef = com.userId;
        updateDoc(userRef, { historyRequests: arrayUnion(response) })
            .then((data) => res.status(200).json({data:req.body, id:response.id}))
            .catch((error) => res.status(404).json("No such user exists"));
        })
    .catch((error) => res.status(400).json(error.message));
};

//GET "/commissions/:id"
exports.getCommission = (req,res) => {
    const docRef = doc(db,'commissions',req.params.id)
    if(!docRef)
        res.status(404).send("This commission is not found.");
    getDoc(docRef)
    .then((response) => {
        const commissionData = response.data();
        const user = commissionData.userId.id;
        delete commissionData.userId;
        if(commissionData.helperId){
            const helpers = commissionData.helperId.map(helperRef => helperRef.id);
            delete commissionData.helperId;
            const commission = {commissionData,helperId:helpers,userId:user, id:response.id};
            res.status(200).json(commission);
        }
        else{
            const commission = {data:commissionData,userId:user, id:response.id};
            res.status(200).json(commission);
        }
    })
    .catch((error) => res.status(400).json(error.message));
}
// PUT "/commissions/:id"
exports.updateCommission = (req, res) => {
  const { id } = req.params;
  const com = req.body;
  if (!com || !id) {
    res.status(400).send("Please provide a valid id");
  }
  const docRef = doc(db, "commissions", id);
  updateDoc(docRef, com)
    .then((response) => res.status(200).json("Success"))
    .catch((error) => res.status(400).json(error.message));
};

// PUT "/commissions/:id/:helperId"
exports.addHelperToCommission = (req, res) => {
  const { id, helperId } = req.params;
  const com = req.body;
  const newHelperRef = doc(db,'/users/' + helperId);
  if (!id ||!helperId) {
    res.status(400).send("Please provide a valid id");
  }
  const isAvailable = com.isAvailable || true;
  const docRef = doc(db, "commissions", id);
  updateDoc(docRef, { helperId: arrayUnion(newHelperRef), isAvailable })
    .then((response) => {
      updateDoc(newHelperRef, { historyCommissions: arrayUnion(docRef) })
        .then((data) => res.status(200).json(response))
        .catch((error) => res.status(404).json("No such user exists"));
    })
    .catch((error) => res.status(400).json(error.message));
};

// DELETE "/commissions/:id"
exports.deleteCommission = (req, res) => {
  const { id } = req.params;
  const docRef = doc(db, "commissions", id);
  //******Might have to think about the reference fields in helperId and userId user commission history
  deleteDoc(docRef)
    .then((data) => {
      if (data) res.status(204).send();
      else
        res
          .status(404)
          .send(`Commission with id: ${req.params.id} is not found.`);
    })
    .catch((error) =>
      res.status(500).send(`Error deleting Commission ${req.params.id} ${error.message}`)
    );
};




