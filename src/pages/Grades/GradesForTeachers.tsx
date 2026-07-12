import { ClipboardCheck, UserRound, Users } from "lucide-react";
import { useAppStore } from "../../store/useAppStore";
import { AVAILABLE_CLASSES } from "../Data_for_grades&schedule";

type AssessmentGrade = {
  type: "sor" | "soch";
  score: number;
  maxScore: number;
};

type StudentGrades = {
  studentId: number;
  studentName: string;
  classId: number;
  subject: string;
  grades: {
    regular: number[];
    assessments: AssessmentGrade[];
  };
};

// Должен совпадать с id класса 11А в AVAILABLE_CLASSES.
const ELEVENTH_A_CLASS_ID = 1;

const MOCK_GRADES: StudentGrades[] = [
  {
    studentId: 1,
    studentName: "Александр Иванов",
    classId: ELEVENTH_A_CLASS_ID,
    subject: "Алгебра",
    grades: {
      regular: [8, 9, 6, 10],
      assessments: [
        { type: "sor", score: 18, maxScore: 20 },
        { type: "soch", score: 31, maxScore: 40 },
      ],
    },
  },
  {
    studentId: 2,
    studentName: "Алия Садыкова",
    classId: ELEVENTH_A_CLASS_ID,
    subject: "Алгебра",
    grades: {
      regular: [7, 8, 9],
      assessments: [{ type: "sor", score: 14, maxScore: 20 }],
    },
  },
  {
    studentId: 3,
    studentName: "Данияр Омаров",
    classId: ELEVENTH_A_CLASS_ID,
    subject: "Алгебра",
    grades: {
      regular: [4, 6, 8, 5],
      assessments: [
        { type: "sor", score: 9, maxScore: 20 },
        { type: "soch", score: 27, maxScore: 40 },
      ],
    },
  },
  {
    studentId: 4,
    studentName: "Мария Ким",
    classId: ELEVENTH_A_CLASS_ID,
    subject: "Алгебра",
    grades: {
      regular: [10, 9, 10],
      assessments: [{ type: "sor", score: 19, maxScore: 20 }],
    },
  },
  {
    studentId: 5,
    studentName: "Арсен Тлеубаев",
    classId: ELEVENTH_A_CLASS_ID,
    subject: "Алгебра",
    grades: {
      regular: [6, 7, 8, 7],
      assessments: [{ type: "sor", score: 15, maxScore: 20 }],
    },
  },
  {
    studentId: 6,
    studentName: "Диана Ахметова",
    classId: ELEVENTH_A_CLASS_ID,
    subject: "Алгебра",
    grades: {
      regular: [9, 10, 8, 9],
      assessments: [
        { type: "sor", score: 19, maxScore: 20 },
        { type: "soch", score: 36, maxScore: 40 },
      ],
    },
  },
  {
    studentId: 7,
    studentName: "Нурислам Беков",
    classId: ELEVENTH_A_CLASS_ID,
    subject: "Алгебра",
    grades: {
      regular: [5, 6, 4, 7],
      assessments: [{ type: "sor", score: 11, maxScore: 20 }],
    },
  },
  {
    studentId: 8,
    studentName: "София Ли",
    classId: ELEVENTH_A_CLASS_ID,
    subject: "Алгебра",
    grades: {
      regular: [8, 8, 9, 10],
      assessments: [
        { type: "sor", score: 17, maxScore: 20 },
        { type: "soch", score: 34, maxScore: 40 },
      ],
    },
  },
  {
    studentId: 9,
    studentName: "Тимур Жаксылыков",
    classId: ELEVENTH_A_CLASS_ID,
    subject: "Алгебра",
    grades: {
      regular: [3, 5, 6, 4],
      assessments: [{ type: "sor", score: 8, maxScore: 20 }],
    },
  },
  {
    studentId: 10,
    studentName: "Элина Сарсенова",
    classId: ELEVENTH_A_CLASS_ID,
    subject: "Алгебра",
    grades: {
      regular: [7, 9, 8, 9],
      assessments: [
        { type: "sor", score: 16, maxScore: 20 },
        { type: "soch", score: 32, maxScore: 40 },
      ],
    },
  },
];

const labels = {
  ru: {
    title: "Оценки",
    student: "Ученик",
    regular: "Текущие оценки",
    assessments: "СОР / СОЧ",
    noGrades: "В выбранном классе пока нет оценок",
  },
  en: {
    title: "Grades",
    student: "Student",
    regular: "Current grades",
    assessments: "Summative assessment",
    noGrades: "There are no grades in the selected class yet",
  },
  kz: {
    title: "Бағалар",
    student: "Оқушы",
    regular: "Күнделікті бағалар",
    assessments: "БЖБ / ТЖБ",
    noGrades: "Таңдалған сыныпта әзірге бағалар жоқ",
  },
};

function getRegularGradeColor(grade: number, isLight: boolean) {
  if (grade <= 4) {
    return isLight
      ? "bg-red-50 border-red-200 text-red-600"
      : "bg-red-500/10 border-red-500/20 text-red-400";
  }

  if (grade <= 7) {
    return isLight
      ? "bg-orange-50 border-orange-200 text-orange-600"
      : "bg-orange-500/10 border-orange-500/20 text-orange-400";
  }

  return isLight
    ? "bg-emerald-50 border-emerald-200 text-emerald-600"
    : "bg-emerald-500/10 border-emerald-500/20 text-emerald-400";
}

function getAssessmentColor(score: number, maxScore: number, isLight: boolean) {
  const percentage = (score / maxScore) * 100;

  if (percentage < 50) {
    return isLight
      ? "bg-red-50 border-red-200 text-red-600"
      : "bg-red-500/10 border-red-500/20 text-red-400";
  }

  if (percentage < 75) {
    return isLight
      ? "bg-orange-50 border-orange-200 text-orange-600"
      : "bg-orange-500/10 border-orange-500/20 text-orange-400";
  }

  return isLight
    ? "bg-emerald-50 border-emerald-200 text-emerald-600"
    : "bg-emerald-500/10 border-emerald-500/20 text-emerald-400";
}

export default function GradesPage() {
  const { theme, language, selectedClass, setSelectedClass, teacherSubject } =
    useAppStore();

  const t = labels[language];
  const isLight = theme === "light";

  const data = MOCK_GRADES.filter(
    (item) => item.classId === selectedClass && item.subject === teacherSubject,
  );

  return (
    <main
      className={`min-h-screen w-full pt-16 md:pt-24 pb-12 transition-colors duration-100 ${
        isLight ? "bg-white text-slate-900" : "bg-[#0b0f1a] text-slate-100"
      }`}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="mb-8 md:mb-10 text-center sm:text-left">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight flex items-center justify-center sm:justify-start gap-3">
            <ClipboardCheck
              className={isLight ? "text-sky-600" : "text-sky-400"}
              size={28}
            />
            {t.title}: {teacherSubject}
          </h1>
        </div>

        <div className="mb-8 w-full sm:w-auto">
          <select
            value={selectedClass}
            onChange={(event) => setSelectedClass(Number(event.target.value))}
            className={`w-full sm:w-32 px-4 py-3 rounded-xl font-bold text-sm border transition-all appearance-none cursor-pointer outline-none ${
              isLight
                ? "bg-slate-50 border-slate-200 text-slate-800 focus:border-sky-500"
                : "bg-white/5 border-white/10 text-white focus:border-sky-500"
            }`}
          >
            {AVAILABLE_CLASSES.map((schoolClass) => (
              <option
                key={schoolClass.id}
                value={schoolClass.id}
                className={
                  isLight ? "text-slate-950" : "bg-[#0b0f1a] text-white"
                }
              >
                {schoolClass.name}
              </option>
            ))}
          </select>
        </div>

        {data.length > 0 ? (
          <div
            className={`overflow-hidden rounded-2xl border duration-100 ${
              isLight ? "border-slate-200" : "border-white/10"
            }`}
          >
            <div
              className={`duration-100 hidden md:grid md:grid-cols-[minmax(180px,1fr)_2fr_1.4fr] gap-5 px-5 py-3 text-[11px] font-bold uppercase tracking-wider ${
                isLight
                  ? "bg-slate-50 text-slate-500"
                  : "bg-white/[0.04] text-slate-400"
              }`}
            >
              <span>{t.student}</span>
              <span>{t.regular}</span>
              <span>{t.assessments}</span>
            </div>

            <div
              className={
                isLight
                  ? "divide-y divide-slate-100"
                  : "divide-y divide-white/5"
              }
            >
              {data.map((item) => (
                <div
                  key={item.studentId}
                  className={`grid gap-4 p-5 md:grid-cols-[minmax(180px,1fr)_2fr_1.4fr] md:items-center md:gap-5 transition-colors ${
                    isLight
                      ? "bg-white hover:bg-slate-50/60"
                      : "bg-white/[0.02] hover:bg-white/[0.04]"
                  }`}
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <UserRound
                      size={16}
                      className="shrink-0 text-sky-500 opacity-70"
                    />
                    <h2 className="font-bold tracking-tight truncate">
                      {item.studentName}
                    </h2>
                  </div>

                  <div>
                    <p className="mb-2 text-[10px] font-bold uppercase tracking-wider opacity-40 md:hidden">
                      {t.regular}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {item.grades.regular.map((grade, index) => (
                        <span
                          key={`${item.studentId}-regular-${index}`}
                          className={`duration-100 flex h-9 min-w-9 items-center justify-center rounded-lg border px-2 text-sm font-bold ${getRegularGradeColor(
                            grade,
                            isLight,
                          )}`}
                        >
                          {grade}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="mb-2 text-[10px] font-bold uppercase tracking-wider opacity-40 md:hidden">
                      {t.assessments}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {item.grades.assessments.map((assessment, index) => (
                        <div
                          key={`${item.studentId}-${assessment.type}-${index}`}
                          className={`duration-100 rounded-lg border px-2.5 py-1.5 text-center ${getAssessmentColor(
                            assessment.score,
                            assessment.maxScore,
                            isLight,
                          )}`}
                        >
                          <span className="block text-[9px] font-bold uppercase leading-none opacity-60">
                            {assessment.type}
                          </span>
                          <span className="text-sm font-bold leading-tight">
                            {assessment.score}/{assessment.maxScore}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div
            className={`text-center py-16 rounded-3xl border border-dashed text-sm opacity-40 font-medium ${
              isLight ? "border-slate-200" : "border-white/10"
            }`}
          >
            <Users className="mx-auto mb-3" size={24} />
            {t.noGrades}
          </div>
        )}
      </div>
    </main>
  );
}