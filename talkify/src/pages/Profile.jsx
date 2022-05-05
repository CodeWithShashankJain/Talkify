import React, { useRef, useState, useEffect } from "react";
import Img from "../default.png";
// import Camera from "../Components/svg/Camera";
import { AiFillEdit, AiOutlineDelete } from "react-icons/ai";
import { storage, db, auth } from "../firebase";
import {
  ref,
  getDownloadURL,
  uploadBytes,
  deleteObject,
} from "firebase/storage";
import { getDoc, doc, updateDoc } from "firebase/firestore";
import { useHistory } from "react-router-dom";

const Profile = () => {
  const inputRef = useRef(null);
  const handleOpenFileInput = () => {
    inputRef.current.click();
  };
  const history = useHistory();
  const [img, setImg] = useState("");
  const [user, setUser] = useState("");
  console.log(img, "initial img");
  useEffect(() => {
    //query from firestore so that we can get the currently logged in users document
    getDoc(doc(db, "users", auth.currentUser.uid)).then((docSnap) => {
      if (docSnap.exists) {
        setUser(docSnap.data());
      }
    });
    // use effect will run when there is change in img but if it is not null then we will go inside  if block
    if (img) {
      const uploadImg = async () => {
        // creating the image ref
        const imgRef = ref(
          storage,
          `avatar/${new Date().getTime()}- ${img.name}`
        );
        // console.log(imgRef, "imgref");
        try {
          // if say you have  already an image profile so you want to delete it first right then upload;
          if (user.avatarPath) {
            await deleteObject(ref(storage, user.avatarPath));
          }
          //now uploadingthe img and storing in snap
          const snap = await uploadBytes(imgRef, img);
          // console.log(snap, "snap");
          // grabbing the url
          const url = await getDownloadURL(ref(storage, snap.ref.fullPath));
          // console.log(url);
          // updating the doc so that wecan show the url and path in firestore
          await updateDoc(doc(db, "users", auth.currentUser.uid), {
            avatar: url,
            avatarPath: snap.ref.fullPath,
          });
          setImg("");
        } catch (error) {
          console.log(error.message);
        }
      };
      uploadImg();
    }
  }, [img]);
  const deleteImage = async () => {
    try {
      const confirm = window.confirm("Delete avatar?");
      if (confirm) {
        await deleteObject(ref(storage, user.avatarPath));

        await updateDoc(doc(db, "users", auth.currentUser.uid), {
          avatar: "",
          avatarPath: "",
        });
        history.replace("/home");
      }
    } catch (err) {
      console.log(err.message);
    }
  };
  return user ? (
    <div className="flex  h-64  items-center justify-center">
      {/*profile container */}
      <div className="flex space-x-4 items-center rounded-md border-2 p-5  w-5/12  shadow-xl">
        <div className="realtive p-3 ">
          <img
            src={user.avatar ? user.avatar : Img}
            alt="avatar"
            className="w-20 h-20 border border-blue-500 rounded-full transition-all duration-75 ease-in-out hover:opacity-40 object-cover"
          />
          <div className="absolute top-52 left-1/3 items-center mt-2">
            <label htmlFor="photo">
              <button onClick={handleOpenFileInput}>
                <AiFillEdit className="w-5 h-5 opacity-60 hover:opacity-80" />
              </button>
              <button onClick={deleteImage} className="bottom-0">
                {user.avatar ? (
                  <AiOutlineDelete className=" w-5 h-5 opacity-60 hover:opacity-80" />
                ) : null}
              </button>
            </label>

            <input
              type="file"
              ref={inputRef}
              accept="image/*"
              className="hidden"
              onChange={(e) => setImg(e.target.files[0])}
            />
          </div>
        </div>
        <div className="flex-grow  space-y-2">
          {/*txt container */}
          <h3 className="text-">Name:- {user.name}</h3>
          <p>Email:- {user.email}</p>
          <hr className="w-full border-2"></hr>
          <span>Joined on... {user.createdAt.toDate().toDateString()}</span>
        </div>
      </div>
    </div>
  ) : null;
};

export default Profile;
