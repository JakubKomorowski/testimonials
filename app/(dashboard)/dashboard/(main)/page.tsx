import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import ExampleDashboardComp from "../../../components/ExampleDashboardComp";
import { ROUTES } from "@/routes";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import { collection } from "firebase/firestore";
import { db } from "@/app/firebase";
import FormGroupWrapper from "@/app/components/organisms/Forms/FormGroupWrapper";
import TestimonialsGroupWrapper from "@/app/components/organisms/Testimonials/TestimonialsGroupWrapper";
import CollectingWidget from "@/app/components/molecules/CollectingWidget";

const Dashboard = async () => {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect(ROUTES.signin);
  }
  return (
    <div className="bg-white dark:bg-black">
      <ExampleDashboardComp />
      {session?.user.email}
      <div className="grid grid-cols-8 gap-4 p-7">
        <div className="col-span-6">
          <TestimonialsGroupWrapper />
        </div>
        <div className="col-span-2">
          <CollectingWidget />
        </div>
        <div className="col-span-8">
          <FormGroupWrapper firstTwo />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
