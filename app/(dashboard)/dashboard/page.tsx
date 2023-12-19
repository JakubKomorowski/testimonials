import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import ExampleDashboardComp from "../../components/ExampleDashboardComp";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import { ROUTES } from "@/routes";

const Dashboard = async () => {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect(ROUTES.signin);
  }
  return (
    <div>
      <ExampleDashboardComp />
      {/* {session?.user.email} */}
    </div>
  );
};

export default Dashboard;
