"use client";

import SectionHeader from "@/components/ui/SectionHeader";
import StudentsTable from "./StudentsTable";
import { useEffect, useState } from "react";
import {
  ComputedStudentRow,
  getStudentById,
} from "../../../lib/users/getStudents";
import { Modal } from "@/components/modal/ModalComponent";
import { useCloseModal } from "@/components/modal/useCloseModal";

export default function StudentsOverview() {
  const [rowCount, setRowCount] = useState(0);
  const [selectedStudent, setSelectedStudent] =
    useState<ComputedStudentRow | null>(null);

  const closeModal = useCloseModal(setSelectedStudent);

  useEffect(() => {
    const url = new URL(window.location.href);
    const id = url.searchParams.get("id");
    if (id) {
      const getStudent = async () => {
        const data = await getStudentById(id);
        setSelectedStudent(data);
      };
      getStudent();
    }
  }, []);
  return (
    <main>
      <Modal type="student" onClose={closeModal} data={selectedStudent} />

      <SectionHeader
        title="Registered Students"
        rightSlot={`${rowCount} rows shown`}
      />

      <StudentsTable
        setStudent={setSelectedStudent}
        setRowCount={setRowCount}
      />
    </main>
  );
}
