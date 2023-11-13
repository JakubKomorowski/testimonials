"use client";
import { collection, query } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../firebase";

const ExampleDashboardComp = () => {
  const [users, loading, error] = useCollection(query(collection(db, "users")));

  return (
    <div>
      <div>{users?.docs[0].data().email}</div>
    </div>
  );
};

export default ExampleDashboardComp;
