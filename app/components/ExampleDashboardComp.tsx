"use client";
import { collection, query } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../firebase";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import * as NProgress from "nprogress";

const ExampleDashboardComp = () => {
  const [users, loading, error] = useCollection(query(collection(db, "users")));
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    NProgress.done();
  }, [pathname, searchParams]);

  return (
    <div>
      <div>{users?.docs[0]?.data().email}</div>
    </div>
  );
};

export default ExampleDashboardComp;
