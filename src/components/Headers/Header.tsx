import { useAppStore } from '../../store/useAppStore'
import GuestHeader from './GuestHeader'
import StudentHeader from './StudentHeader'
import TeacherHeader from './TeacherHeader'

export default function Header() {
  const { role } = useAppStore()

  if (role === 'student') {
    return <StudentHeader />
  }
  if (role === 'teacher') {
    return <TeacherHeader />
  }
  return <GuestHeader />
}