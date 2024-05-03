import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import ExampleDashboardComp from "../../../components/ExampleDashboardComp";
import { ROUTES } from "@/routes";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import { Button } from "@/components/ui/button";
import { collection } from "firebase/firestore";
import { db } from "@/app/firebase";
import FormCard from "@/app/components/molecules/FormCard";
import TestimonialsCard from "@/app/components/molecules/TestimonialsCard";
import FormCardWrapper from "@/app/components/molecules/FormCardWrapper";
import TestimonialsCardWrapper from "@/app/components/molecules/TestimonialsCardWrapper";

const Dashboard = async () => {
  const session = await getServerSession(authOptions);
  const emailRef = collection(db, "emails");

  if (!session || !session.user) {
    redirect(ROUTES.signin);
  }
  return (
    <div className="bg-white dark:bg-black">
      <ExampleDashboardComp />
      {session?.user.email}
      <div className="grid grid-cols-8 gap-4 p-7">
        <div className="col-span-6">
          <FormCardWrapper firstTwo />
        </div>
        <div className="col-span-6">
          <TestimonialsCardWrapper />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
