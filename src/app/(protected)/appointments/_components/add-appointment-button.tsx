"use client ";

import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";
import UpsertAppointmentForm from "./upsert-appointment-form";
import { doctorsTable, patientsTable } from "@/src/db/schema";
import { Plus } from "lucide-react";

interface UpsertAppointmentFormProps {
  patients: (typeof patientsTable.$inferSelect)[];
  doctors: (typeof doctorsTable.$inferSelect)[];
}

const AddAppointmentButton = ({
  patients,
  doctors,
}: UpsertAppointmentFormProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Plus />
        <Button>Novo Agendamento</Button>
      </DialogTrigger>
      <UpsertAppointmentForm
        isOpen={isOpen}
        patients={patients}
        doctors={doctors}
        onSuccess={() => setIsOpen(false)}
      />
    </Dialog>
  );
};

export default AddAppointmentButton;
