import React, { useEffect, useState } from "react";
import { db, auth, storage } from "../firebase";
import {
  collection,
  query,
  where,
  onSnapshot,
  addDoc,
  Timestamp,
  orderBy,
  setDoc,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import User from "../Components/User";
import MessageForm from "../Components/MessageForm";
import Message from "../Components/Message";

const Home = () => {
  const [users, setUsers] = useState([]);
  const [chat, setChat] = useState("");
  const [text, setText] = useState("");
  const [img, setImg] = useState("");
  // console.log(img, "initial");
  const [msgs, setMsgs] = useState([]);

  const user1 = auth.currentUser.uid;

  useEffect(() => {
    const userRef = collection(db, "users"); //Gets a CollectionReference instance that refers to the collection at the specified absolute path.
    // create query object
    const q = query(userRef, where("uid", "not-in", [user1]));

    // execute  query
    const unsub = onSnapshot(q, (querySnapsot) => {
      let users = [];
      querySnapsot.forEach((doc) => {
        users.push(doc.data());
      });
      setUsers(users);
    });
    return () => unsub();
  }, []);

  const selectUser =  (user) => {
    setChat(user);

    const user2 = user.uid;
    const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`;
    const msgsRef = collection(db, "messages", id, "chat");
    const q = query(msgsRef, orderBy("createdAt", "asc"));

    onSnapshot(q, (querySnapshot) => {
      let mssges = [];
      querySnapshot.forEach((doc) => {
        mssges.push(doc.data());
      });
      setMsgs(mssges);
    });

    // get last message b/w logged in user and selected user
    // const docSnap = await getDoc(doc(db, "lastMessage", id));
    // // if last message exists and message is from selected user
    // if (docSnap.data() && docSnap.data().from !== user1) {
    //   // update last message doc, set unread to false
    //   await updateDoc(doc(db, "lastMessage", id), { unread: false });
    // }
  };
  // console.log(msgs,"messagessss"); { array of mesages}
  // console.log(chat,"chatssss");{// chat is like user detail to whom are you chatting his email,uid etc.}
  // msgs.map((msg) => (console.log(msg.uid)));

  const handleSubmit = async (e) => {
    // console.log("hello")
    e.preventDefault();
    const user2 = chat.uid;
    // messages => id => chat sub collection => add doc
    const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`;

    let url;
    if (img) {
      const imgRef = ref(
        storage,
        `images/${new Date().getTime()} - ${img.name}`
      );
      const snap = await uploadBytes(imgRef, img);
      const dwldUrl = await getDownloadURL(ref(storage, snap.ref.fullPath));
      url = dwldUrl;
    }

    await addDoc(collection(db, "messages", id, "chat"), {
      text,
      from: user1,
      to: user2,
      createdAt: Timestamp.fromDate(new Date()),
      media: url || "",
    });
    // console.log(docRef)
    await setDoc(doc(db, "lastMessage", id), {
      text,
      from: user1,
      to: user2,
      createdAt: Timestamp.fromDate(new Date()),
      media: url || "",
      unread: true,
    });
    setText("");
    setImg("");
  };

  return (
    //home container
    <div className="border-2 w-screen h-[calc(100vh-4rem)]  grid grid-cols-6 space-x-2  relative">
      {/* user conatiner */}
      <div className="border-r-2 mt-2 col-span-2 overflow-y-auto">
        {users.map((user) => (
          <User
            key={user.uid}
            user={user}
            selectUser={selectUser}
            user1={user1}
            chat={chat}
          />
        ))}
      </div>
      {/* message container */}
      <div className="col-span-4 mt-2 relative">
        {chat ? (
          <>
            {/* user name */}
            <div className="text-center  p-2 border-b-2 border-double">
              <h2 className="text-xl">{chat.name}</h2>
            </div>

            {/* messgaes */}
            <div className="h-[calc(100vh-10rem)] overflow-y-auto border-b-2 p-2">
              {msgs.length
                ? msgs.map((msg, i) => (
                    <Message msg={msg} key={i} user1={user1} />
                  ))
                : null}
            </div>

            {/* message form where you will type the msse and send it
             */}
            <MessageForm
              handleSubmit={handleSubmit}
              text={text}
              setText={setText}
              setImg={setImg}
            />
          </>
        ) : (
          <h2 className="text-center text-xl font-bold ">
            Select a user to start Conversation
          </h2>
        )}
      </div>
    </div>
  );
};

export default Home;
