import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import ExampleDashboardComp from "../../../components/ExampleDashboardComp";
import { ROUTES } from "@/routes";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import { Button } from "@/components/ui/button";
import { collection } from "firebase/firestore";
import { db } from "@/app/firebase";
import FormCard from "@/app/components/ui/FormCard";

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
          <FormCard />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
