// {  [ { cid:UNIQUE INT, uid: UNIQUE INT, wl: INT(1-8), ar:INT (16-60), category: VARCHAR(300), duration: VARCHAR(20), status:BOOLEAN, comment: VARCHAR(256) } …]}
const {
    getDocs,
    query,
    where,
    collection
  } = require("firebase/firestore");
  const { db } = require("../lib/init-firebase");
  const { useParams } = require("react-router-dom");
  // GET "/commissions/"
  exports.getUser = (req, res) => {
        const {username, password} = req.params;
        const usersRef = collection(db,"auth");
        const q = query(usersRef, where("username", "==", username));
        getDocs(q).then((response) => {
                if(response.docs){
                    const user = response.docs[0];
                    if (user.data().password === password)
                        res.status(200).json(user.data().profile.id);
                    else
                        res.status(403).json("Invalid Password");
                    return;
                }
                else{
                    res.status(404).json("Invalid Username");
                    return;
                }
          })
          .catch((error) => res.status(400).json(error.message));
    //   getDocs(usersRef)
    //   .then((response) => {
    //         res.status(200).json(commissions);
    //   })
    //   .catch((error) => res.status(400).json(error.message));
  };