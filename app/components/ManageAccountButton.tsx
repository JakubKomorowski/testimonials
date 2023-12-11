"use client";
import { generatePortalLink } from "@/app/actions/generatePortalLink";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSubscriptionStore } from "@/store/store";

const ManageAccountButton = () => {
  const [data, setData] = useState();
  const router = useRouter();
  const subscription = useSubscriptionStore((state) => state.subscription);
  const isSubscribed =
    subscription?.status === "active" && subscription.role === "pro";

  const fetchRequest = async () => {
    const response = await fetch("api/stripe");
    const json = await response.json();
    setData(json);
  };

  useEffect(() => {
    {
      isSubscribed && fetchRequest();
    }
  }, [isSubscribed]);

  const redirectUrl = (e: any) => {
    e.preventDefault();
    if (data) {
      router.push(data["url"]);
    }
  };

  return (
    <form onSubmit={redirectUrl}>
      <button type="submit">Manage Billing</button>
    </form>
  );
};

export default ManageAccountButton;
