import React, { useContext, useEffect, useState } from "react";
import Heart from "../assets/Heart";
import { FirebaseContext } from "../store/firebaseContext";
import { useNavigate } from "react-router-dom";
import { getFirestore, getDocs, collection } from "firebase/firestore";
import { PostContext } from "../store/PostContext";

function Posts() {
  const [products, setProducts] = useState([]);
  const { firebase } = useContext(FirebaseContext);
  const {setPostDetails} = useContext(PostContext)
  const navigate = useNavigate()

  useEffect(() => {

    const db = getFirestore(firebase);
    const productsCollectionRef = collection(db, "products");
    getDocs(productsCollectionRef)
      .then((querySnapshot) => {
       
            console.log("Documensts : ",querySnapshot);
            const fetchedProducts = [];
            querySnapshot.forEach((doc) => {
              fetchedProducts.push({ id: doc.id, ...doc.data() });
            });
            setProducts(fetchedProducts);
            
      })
      .catch((error) => {
        console.error("Error getting document:", error);
      });
    return () => {};
  }, []);

  return (
    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <span>View more</span>
        </div>
        <div className="cards">
          
        {
           products.map((product)=>(
            <div key={product.id} className="card" onClick={()=>{
                setPostDetails(product)
                console.log(product.name);
                navigate("/product");
            }}>
            <div className="favorite">
              <Heart></Heart>
            </div>
            <div className="image">
              <img src={product.url} alt="" />
            </div>
            <div className="content">
              <p className="rate">&#x20B9; {product.price}</p>
              <span className="kilometer">{product.name}</span>
              <p className="name">{product.category}</p>
            </div>
            <div className="date">
              <span>{product.createdAt}</span>
            </div>
          </div>
           ))
        }


        </div>
      </div>
      <div className="recommendations">
        <div className="heading">
          <span>Fresh recommendations</span>
        </div>
        <div className="cards">
          <div className="card">
            <div className="favorite">
              <Heart></Heart>
            </div>
            <div className="image">
              <img src="../../../Images/R15V3.jpg" alt="" />
            </div>
            <div className="content">
              <p className="rate">&#x20B9; 250000</p>
              <span className="kilometer">Two Wheeler</span>
              <p className="name"> YAMAHA R15V3</p>
            </div>
            <div className="date">
              <span>10/5/2021</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Posts;
