import NotAuth from "../../components/NotAuth";
import { useAppStore } from "../../store/useAppStore";
import ProfileForStudents from "./ProfileForStudents";
import ProfileForTeachers from "./ProfileForTeachers";

export default function Profile() {
    const { role } = useAppStore();

    return (
        <div className="flex items-center justify-center">
            {role === 'guest' && <NotAuth />}
            {role === 'student' && <ProfileForStudents />}
            {role === 'teacher' || role === 'admin' && <ProfileForTeachers />}
        </div>
    )
}