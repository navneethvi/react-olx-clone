import React, { useContext, useEffect, useState } from "react";
import { PostContext } from "../store/PostContext";
import { FirebaseContext } from "../store/firebaseContext";
import {
  collection,
  getFirestore,
  getDocs,
  query,
  where,
} from "firebase/firestore";

function View() {
  const [userDetails, setUserDetails] = useState("");
  const { postDetails } = useContext(PostContext);
  const { firebase } = useContext(FirebaseContext);

  useEffect(() => {
    const getUserDetails = async () => {
      const { userId } = postDetails;
      const db = getFirestore(firebase);
      const usersCollectionRef = collection(db, "users");
      const q = query(usersCollectionRef, where("id", "==", userId));

      try {
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          setUserDetails(doc.data());
          console.log(doc.data());
        });
      } catch (error) {
        console.error("Error getting documents: ", error);
      }
    };

    getUserDetails();
  }, []);

  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img src={postDetails.url} alt="" />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9; {postDetails.price} </p>
          <span>{postDetails.name}</span>
          <p>{postDetails.category}</p>
          <span>{postDetails.createdAt}</span>
        </div>
        {userDetails && (
          <div className="contactDetails">
            <p>Seller details</p>
            <p>{userDetails.username}</p>
            <p>{userDetails.phone}</p>
          </div>
        )}
      </div>
    </div>
  );
}
export default View;
