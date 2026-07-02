import NotAuth from "../NotAuthPage";
import { useAppStore } from "../../store/useAppStore";
import GradesForStudents from "./GradesForStudents";
import GradesForTeachers from "./GradesForTeachers";

export default function Grades() {
    const { role } = useAppStore();

    return (
        <div className="flex items-center justify-center">
            {role === 'guest' && <NotAuth />}
            {role === 'student' && <GradesForStudents />}
            {role === 'teacher' || role === 'admin' && <GradesForTeachers />}
        </div>
    )
}