import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import ExampleDashboardComp from "../components/ExampleDashboardComp";
import { authOptions } from "../api/auth/[...nextauth]/route";

const Dashboard = async () => {
  const session = await getServerSession(authOptions);
  // console.log(session?.user?.email);
  if (!session || !session.user) {
    redirect("/signin");
  }
  return (
    <div>
      <ExampleDashboardComp />
      {session?.user.email}
    </div>
  );
};

export default Dashboard;
