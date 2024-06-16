import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import ExampleDashboardComp from "../../../components/ExampleDashboardComp";
import { ROUTES } from "@/routes";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
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
      <div className="grid grid-cols-8 gap-7 p-7">
        <section className="col-span-5 2xl:col-span-6">
          <TestimonialsGroupWrapper firstTwo />
        </section>
        <section className="col-span-3 row-span-2 2xl:col-span-2">
          <CollectingWidget />
        </section>
        <section className="col-span-5 2xl:col-span-6">
          <FormGroupWrapper firstTwo />
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
