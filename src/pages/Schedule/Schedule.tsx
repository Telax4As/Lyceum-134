import NotAuth from "../../components/NotAuth";
import { useAppStore } from "../../store/useAppStore";
import ScheduleForStudents from "./ScheduleForStudents";
import ScheduleForTeachers from "./ScheduleForTeachers";

export default function Schedule() {
    const { role } = useAppStore();

    return (
        <div className="flex items-center justify-center">
            {role === 'guest' && <NotAuth />}
            {role === 'student' && <ScheduleForStudents />}
            {role === 'teacher' || role === 'admin' && <ScheduleForTeachers />}
        </div>
    )
}