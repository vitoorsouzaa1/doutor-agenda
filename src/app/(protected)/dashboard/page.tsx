import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { usersToClinicsTable } from "@/src/db/schema";
import {
  PageActions,
  PageContainer,
  PageDescription,
  PageHeader,
  PageHeaderContent,
  PageTitle,
  PageContent,
} from "@/components/ui/page-container";
import { sum, and, count, eq, lte, gte, sql, desc } from "drizzle-orm";
import { db } from "@/src/db";
import {
  appointmentsTable,
  patientsTable,
  doctorsTable,
} from "@/src/db/schema";

import { DatePicker } from "./_components/date-picker";
import dayjs from "dayjs";
import StatsCard from "./_components/stats-card";
import AppointmentsChart from "./_components/appointments-charts";
import TopDoctors from "./_components/top-doctors";

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

  const { from, to } = await searchParams;

  if (!from || !to) {
    redirect(
      `/dashboard?from=${dayjs().format("YYYY-MM-DD")}&to=${dayjs().add(1, "month").format("YYYY-MM-DD")}`,
    );
  }

  const [
    [totalRevenue],
    [totalAppointments],
    [totalPatients],
    [totalDoctors],
    topDoctors,
  ] = await Promise.all([
    db
      .select({
        total: sum(appointmentsTable.appointmentPriceInCents),
      })
      .from(appointmentsTable)
      .where(
        and(
          eq(appointmentsTable.clinicId, session.user.clinic.id),
          gte(appointmentsTable.date, new Date(from)),
          lte(appointmentsTable.date, new Date(to)),
        ),
      ),
    db
      .select({
        total: count(),
      })
      .from(appointmentsTable)
      .where(
        and(
          eq(appointmentsTable.clinicId, session.user.clinic.id),
          gte(appointmentsTable.date, new Date(from)),
          lte(appointmentsTable.date, new Date(to)),
        ),
      ),
    db
      .select({
        total: count(),
      })
      .from(patientsTable)
      .where(eq(patientsTable.clinicId, session.user.clinic.id)),
    db
      .select({
        total: count(),
      })
      .from(doctorsTable)
      .where(eq(doctorsTable.clinicId, session.user.clinic.id)),
    db
      .select({
        id: doctorsTable.id,
        name: doctorsTable.name,
        avatarImageUrl: doctorsTable.avatarImageUrl,
        specialty: doctorsTable.specialty,
        appointments: count(appointmentsTable.id),
      })
      .from(doctorsTable)
      .leftJoin(
        appointmentsTable,
        and(
          eq(appointmentsTable.doctorId, doctorsTable.id),
          gte(appointmentsTable.date, new Date(from)),
          lte(appointmentsTable.date, new Date(to)),
        ),
      )
      .where(eq(doctorsTable.clinicId, session.user.clinic.id))
      .groupBy(doctorsTable.id)
      .orderBy(desc(count(appointmentsTable.id)))
      .limit(10),
  ]);

  const chartStartDate = dayjs().subtract(10, "days").startOf("day").toDate();
  const chartEndDate = dayjs().add(10, "days").endOf("day").toDate();

  const dailyAppointments = await db
    .select({
      date: sql<string>`DATE(${appointmentsTable.date})`.as("date"),
      appointments: count(appointmentsTable.id),
      revenue:
        sql<number>`COALESCE(SUM(${appointmentsTable.appointmentPriceInCents}), 0)`.as(
          "revenue",
        ),
    })
    .from(appointmentsTable)
    .where(
      and(
        gte(appointmentsTable.date, chartStartDate),
        lte(appointmentsTable.date, chartEndDate),
      ),
    )
    .groupBy(sql`DATE(${appointmentsTable.date})`)
    .orderBy(sql`DATE(${appointmentsTable.date})`);

  return (
    <PageContainer>
      <PageHeader>
        <PageHeaderContent>
          <PageTitle>Pacientes</PageTitle>
          <PageDescription>
            Gerencie os pacientes da sua clínica
          </PageDescription>
        </PageHeaderContent>
        <PageActions>
          <DatePicker />
        </PageActions>
      </PageHeader>
      <PageContent>
        <StatsCard
          totalRevenue={totalRevenue.total ? Number(totalRevenue.total) : 0}
          totalAppointments={totalAppointments.total}
          totalPatients={totalPatients.total}
          totalDoctors={totalDoctors.total}
        />
        <div className="grid grid-cols-[2.25fr_1fr] gap-4">
          <AppointmentsChart dailyAppointmentsData={dailyAppointments} />
          <TopDoctors doctors={topDoctors} />
        </div>
      </PageContent>
    </PageContainer>
  );
};

export default DashboardPage;
