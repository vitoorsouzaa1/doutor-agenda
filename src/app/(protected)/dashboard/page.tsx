import dayjs from "dayjs";
import { eq } from "drizzle-orm";
import { Calendar } from "lucide-react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";
import {
  PageActions,
  PageContainer,
  PageContent,
  PageDescription,
  PageHeader,
  PageHeaderContent,
  PageTitle,
} from "@/components/ui/page-container";
import { auth } from "@/lib/auth";
import { getDashboard } from "@/src/data/get-dashboard";
import { db } from "@/src/db";
import { usersToClinicsTable } from "@/src/db/schema";

import { appointmentsTableColumns } from "../appointments/_components/table-columns";
import AppointmentsChart from "./_components/appointments-charts";
import { DatePicker } from "./_components/date-picker";
import StatsCard from "./_components/stats-card";
import TopDoctors from "./_components/top-doctors";
import TopSpecialties from "./_components/top-specialties";

interface DashboardPageProps {
  searchParams: Promise<{
    from: string;
    to: string;
  }>;
}

const DashboardPage = async ({ searchParams }: DashboardPageProps) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/authentication");
  }

  const clinics = await db.query.usersToClinicsTable.findMany({
    where: eq(usersToClinicsTable.userId, session.user.id),
  });

  if (clinics.length === 0) {
    redirect("/clinic-form");
  }

  if (!session.user.clinic?.id) {
    redirect("/clinic-form");
  }

  const { from, to } = await searchParams;

  if (!from || !to) {
    redirect(
      `/dashboard?from=${dayjs().format("YYYY-MM-DD")}&to=${dayjs().add(1, "month").format("YYYY-MM-DD")}`,
    );
  }

  const clinicId = session.user.clinic.id;

  const {
    totalRevenue,
    totalAppointments,
    totalPatients,
    totalDoctors,
    topDoctors,
    topSpecialties,
    todayAppointments,
    dailyAppointmentsData,
  } = await getDashboard({
    from,
    to,
    session: { user: { clinic: { id: clinicId } } },
  });

  return (
    <PageContainer>
      <PageHeader>
        <PageHeaderContent>
          <PageTitle>Dashboard</PageTitle>
          <PageDescription>Visualize os dados da sua clínica</PageDescription>
        </PageHeaderContent>
        <PageActions>
          <DatePicker />
        </PageActions>
      </PageHeader>
      <PageContent>
        <StatsCard
          totalRevenue={Number(totalRevenue.total ?? 0)}
          totalAppointments={Number(totalAppointments.total ?? 0)}
          totalPatients={Number(totalPatients.total ?? 0)}
          totalDoctors={Number(totalDoctors.total ?? 0)}
        />
        <div className="grid grid-cols-[2.25fr_1fr] gap-4">
          <AppointmentsChart dailyAppointmentsData={dailyAppointmentsData} />
          <TopDoctors doctors={topDoctors} />
        </div>
        <div className="grid grid-cols-1 gap-4">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <Calendar className="text-muted-foreground" />
                <CardTitle>Agendamentos de hoje</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <DataTable
                columns={appointmentsTableColumns}
                data={todayAppointments}
              />
            </CardContent>
          </Card>
          <TopSpecialties topSpecialties={topSpecialties} />
        </div>
      </PageContent>
    </PageContainer>
  );
};

export default DashboardPage;
