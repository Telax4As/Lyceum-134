import { useAppStore } from '../../store/useAppStore'
import GuestHomePage from './GuestHomePage'
import StudentHomePage from './StudentHomePage'
import TeacherHomePage from './TeacherHomePage'

export default function HomePage() {
  const { role } = useAppStore()

  if (role === 'student') {
    return <StudentHomePage />
  }
  if (role === 'teacher') {
    return <TeacherHomePage />
  }
  return <GuestHomePage />
}