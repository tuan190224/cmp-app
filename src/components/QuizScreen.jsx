import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, ChevronLeft } from "lucide-react";

export default function QuizScreen({
  questions,
  options,
  currentIndex,
  answers,
  onAnswer,
  onBack,
  isAnswering,
}) {
  const currentQ = questions[currentIndex];
  const progress = ((currentIndex + 1) / questions.length) * 100;

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <header className="sticky top-0 z-20 border-b border-gray-100 bg-white/95 px-4 py-3 shadow-sm backdrop-blur">
        <div className="mx-auto max-w-2xl">
          <div className="mb-2 flex items-center justify-between">
            <button
              type="button"
              onClick={onBack}
              disabled={isAnswering}
              aria-label="Quay lại"
              className="rounded-full p-2 text-gray-600 transition hover:bg-gray-100 disabled:opacity-40"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>

            <span className="text-sm font-semibold text-gray-500">
              Câu {currentIndex + 1}/{questions.length}
            </span>

            <span className="w-10 text-right text-xs text-gray-400">
              {Math.round(progress)}%
            </span>
          </div>

          <div
            className="h-2 overflow-hidden rounded-full bg-gray-100"
            role="progressbar"
            aria-valuemin="1"
            aria-valuemax={questions.length}
            aria-valuenow={currentIndex + 1}
          >
            <motion.div
              className="h-full rounded-full bg-emerald-500"
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.25 }}
            />
          </div>
        </div>
      </header>

      <section className="flex flex-1 items-start justify-center px-4 py-6 sm:items-center sm:py-10">
        <AnimatePresence mode="wait">
          <motion.article
            key={currentQ.id}
            initial={{ opacity: 0, x: 18 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -18 }}
            transition={{ duration: 0.18 }}
            className="w-full max-w-2xl rounded-3xl border border-gray-100 bg-white p-5 shadow-lg sm:p-8 md:p-10"
          >
            <div className="mb-7">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">
                Câu hỏi {currentIndex + 1}
              </span>
              <h2 className="mt-2 text-xl font-bold leading-snug text-gray-800 sm:text-2xl">
                {currentQ.text}
              </h2>
            </div>

            <div className="space-y-3">
              {options.map((option) => {
                const selected = answers[currentQ.id] === option.value;

                return (
                  <button
                    key={option.value}
                    type="button"
                    disabled={isAnswering}
                    onClick={() => onAnswer(option.value)}
                    aria-pressed={selected}
                    className={`flex min-h-14 w-full items-center justify-between rounded-2xl border-2 px-4 py-3 text-left transition duration-150 focus:outline-none focus:ring-4 focus:ring-emerald-100 disabled:cursor-wait
                      ${selected
                        ? "border-emerald-500 bg-emerald-50 text-emerald-800"
                        : "border-gray-100 bg-white text-gray-700 hover:border-emerald-200 hover:bg-gray-50"
                      }`}
                  >
                    <span className="font-medium">{option.label}</span>
                    {selected && <CheckCircle2 className="h-5 w-5 text-emerald-600" />}
                  </button>
                );
              })}
            </div>
          </motion.article>
        </AnimatePresence>
      </section>
    </main>
  );
}
