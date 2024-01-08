import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import ExampleDashboardComp from "../../components/ExampleDashboardComp";
import { ROUTES } from "@/routes";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth";

const Dashboard = async () => {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect(ROUTES.signin);
  }
  return (
    <div className="bg-white dark:bg-black">
      <ExampleDashboardComp />
      {/* {session?.user.email} */}
    </div>
  );
};

export default Dashboard;
