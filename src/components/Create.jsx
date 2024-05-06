import React, { Fragment, useContext, useState } from "react";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Header from "../components/Header";
import { FirebaseContext } from "../store/firebaseContext";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
import { AuthContext } from "../store/AuthContext";
import { useNavigate } from "react-router-dom";

const Create = () => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const {firebase} = useContext(FirebaseContext);
  const {user} = useContext(AuthContext)
  const navigate = useNavigate()

  console.log("Firebase context: ", firebase); 

  const handleSubmit = (e) => {
    e.preventDefault();
    const storage = getStorage(firebase); 
  
    const storageRef = ref(storage, `/image/${image.name}`); 
  
    uploadBytes(storageRef, image) 
      .then((snapshot) => {
        console.log("File uploaded");
        return getDownloadURL(snapshot.ref); 
      })
      .then((url) => {
        console.log("Download URL:", url);

        const db = getFirestore(firebase)
        const useRef = collection(db, 'products')
        
        const productData = {
            userId : user.uid,
            name : name,
            category : category,
            price : price,
            url : url,
            createdAt : new Date().toDateString()
        }

        addDoc(useRef, productData)
        .then((docRef) => {
            toast.success("Product added succesfully");
            console.log("Document written with ID: ", docRef.id);
            navigate("/")
          })

      })
      .catch((error) => {
        console.error("Error uploading file: ", error);
      });
  };
  

  return (
    <Fragment>
      <Header />
      <ToastContainer/>
      <card>
        <div className="centerDiv">
          <label htmlFor="fname">Name</label>
          <br />
          <input
            className="input"
            type="text"
            id="fname"
            name="Name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <br />
          <label htmlFor="fname">Category</label>
          <br />
          <input
            className="input"
            type="text"
            id="fname"
            name="category"
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
            }}
          />
          <br />
          <label htmlFor="fname">Price</label>
          <br />
          <input
            className="input"
            type="number"
            id="fname"
            name="Price"
            onChange={(e) => setPrice(e.target.value)}
            value={price}
          />
          <br />

          <br />
          <img
            alt="Posts"
            width="200px"
            height="200px"
            src={image ? URL.createObjectURL(image) : ""}
          ></img>

          <br />
          <input
            type="file"
            onChange={(e) => {
              setImage(e.target.files[0]);
            }}
          />
          <br />
          <button onClick={handleSubmit} className="uploadBtn">
            upload and Submit
          </button>
        </div>
      </card>
    </Fragment>
  );
};

export default Create;
