import { BookOpen, ClipboardCheck } from "lucide-react";
import { useAppStore } from "../../store/useAppStore";

type AssessmentGrade = {
  type: "sor" | "soch";
  score: number;
  maxScore: number;
};

type SubjectGrades = {
  subjectId: number;
  subject: string;
  grades: {
    regular: number[];
    assessments: AssessmentGrade[];
  };
};

const MOCK_STUDENT_GRADES: SubjectGrades[] = [
  {
    subjectId: 1,
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
    subjectId: 2,
    subject: "Английский язык",
    grades: {
      regular: [7, 8, 9, 9],
      assessments: [
        { type: "sor", score: 14, maxScore: 20 },
        { type: "soch", score: 33, maxScore: 40 },
      ],
    },
  },
  {
    subjectId: 3,
    subject: "Физика",
    grades: {
      regular: [4, 6, 8, 5],
      assessments: [
        { type: "sor", score: 9, maxScore: 20 },
        { type: "soch", score: 27, maxScore: 40 },
      ],
    },
  },
  {
    subjectId: 4,
    subject: "Информатика",
    grades: {
      regular: [10, 9, 10, 10],
      assessments: [
        { type: "sor", score: 19, maxScore: 20 },
        { type: "soch", score: 38, maxScore: 40 },
      ],
    },
  },
  {
    subjectId: 5,
    subject: "История Казахстана",
    grades: {
      regular: [7, 8, 6, 9],
      assessments: [{ type: "sor", score: 15, maxScore: 20 }],
    },
  },
  {
    subjectId: 6,
    subject: "Казахский язык",
    grades: {
      regular: [8, 7, 9, 8],
      assessments: [
        { type: "sor", score: 17, maxScore: 20 },
        { type: "soch", score: 30, maxScore: 40 },
      ],
    },
  },
];

const labels = {
  ru: {
    title: "Мои оценки",
    subject: "Предмет",
    regular: "Текущие оценки",
    assessments: "СОР / СОЧ",
    noGrades: "Оценок пока нет",
  },
  en: {
    title: "My grades",
    subject: "Subject",
    regular: "Current grades",
    assessments: "Summative assessment",
    noGrades: "There are no grades yet",
  },
  kz: {
    title: "Менің бағаларым",
    subject: "Пән",
    regular: "Күнделікті бағалар",
    assessments: "БЖБ / ТЖБ",
    noGrades: "Әзірге бағалар жоқ",
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

export default function GradesForStudents() {
  const { theme, language } = useAppStore();

  const t = labels[language];
  const isLight = theme === "light";
  const data = MOCK_STUDENT_GRADES;

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
            {t.title}
          </h1>
        </div>

        {data.length > 0 ? (
          <div
            className={`overflow-hidden rounded-2xl border duration-100 ${
              isLight ? "border-slate-200" : "border-white/10"
            }`}
          >
            <div
              className={`hidden md:grid md:grid-cols-[minmax(180px,1fr)_2fr_1.4fr] gap-5 px-5 py-3 text-[11px] font-bold uppercase tracking-wider duration-100 ${
                isLight
                  ? "bg-slate-50 text-slate-500"
                  : "bg-white/[0.04] text-slate-400"
              }`}
            >
              <span>{t.subject}</span>
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
                  key={item.subjectId}
                  className={`grid gap-4 p-5 md:grid-cols-[minmax(180px,1fr)_2fr_1.4fr] md:items-center md:gap-5 transition-colors ${
                    isLight
                      ? "bg-white hover:bg-slate-50/60"
                      : "bg-white/[0.02] hover:bg-white/[0.04]"
                  }`}
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <BookOpen
                      size={16}
                      className="shrink-0 text-sky-500 opacity-70"
                    />
                    <h2 className="font-bold tracking-tight truncate">
                      {item.subject}
                    </h2>
                  </div>

                  <div>
                    <p className="mb-2 text-[10px] font-bold uppercase tracking-wider opacity-40 md:hidden">
                      {t.regular}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {item.grades.regular.map((grade, index) => (
                        <span
                          key={`${item.subjectId}-regular-${index}`}
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
                          key={`${item.subjectId}-${assessment.type}-${index}`}
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
            <ClipboardCheck className="mx-auto mb-3" size={24} />
            {t.noGrades}
          </div>
        )}
      </div>
    </main>
  );
}