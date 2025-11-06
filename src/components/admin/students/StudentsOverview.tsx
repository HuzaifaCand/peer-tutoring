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
import { formatStudent } from "@/lib/users/userFormatters";

export default function StudentsOverview() {
  const [rowCount, setRowCount] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [selectedStudent, setSelectedStudent] =
    useState<ComputedStudentRow | null>(null);

  const closeModal = useCloseModal(setShowModal, setSelectedStudent);

  useEffect(() => {
    const url = new URL(window.location.href);
    const id = url.searchParams.get("id");
    if (id) {
      setShowModal(true);
      const getStudent = async () => {
        const data = await getStudentById(id);
        setSelectedStudent(data);
      };
      getStudent();
    }
  }, []);
  return (
    <main>
      {showModal && selectedStudent && (
        <Modal type="student" onClose={closeModal} data={selectedStudent} />
      )}
      <SectionHeader
        title="Registered Students"
        rightSlot={`${rowCount} rows shown`}
      />

      <StudentsTable
        setShowModal={setShowModal}
        setStudent={setSelectedStudent}
        setRowCount={setRowCount}
      />
    </main>
  );
}
