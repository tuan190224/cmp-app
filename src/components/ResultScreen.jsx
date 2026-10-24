import { AlertCircle, Download, RefreshCw } from "lucide-react";
import { motion } from "framer-motion";

export default function ResultScreen({
  sortedResults,
  gender,
  onRestart,
  onDownload,
  onDonate,
}) {
  return (
    <main className="min-h-screen bg-gray-50 pb-28 font-sans">
      <header className="sticky top-0 z-20 bg-emerald-700 px-4 py-4 text-white shadow-md">
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-3">
          <h1 className="text-xl font-bold sm:text-2xl">Kết quả thể chất</h1>
          <button
            type="button"
            onClick={onRestart}
            className="flex min-h-10 items-center gap-2 rounded-xl bg-emerald-600 px-3 py-2 text-sm font-semibold transition hover:bg-emerald-500 focus:outline-none focus:ring-4 focus:ring-emerald-300"
          >
            <RefreshCw className="h-4 w-4" />
            <span className="hidden sm:inline">Làm lại</span>
          </button>
        </div>
      </header>

      <div className="mx-auto max-w-3xl space-y-5 px-4 py-6 sm:px-6">
        <section className="rounded-2xl border border-emerald-100 border-l-4 border-l-emerald-500 bg-white p-5 shadow-sm sm:p-6">
          <h2 className="font-semibold text-gray-800">Tổng quan</h2>
          <p className="mt-2 text-sm leading-relaxed text-gray-600">
            Dựa trên câu trả lời của bạn trong năm qua, đây là kết quả tham khảo theo bảng hỏi CCMQ.
          </p>
          <p className="mt-2 text-xs text-gray-400">
            Giới tính: {gender === "male" ? "Nam" : "Nữ"}
          </p>
        </section>

        <section className="space-y-4">
          {sortedResults.map((item) => {
            const isBalanced = item.name.includes("Bình Hòa");
            const isHigh = item.score >= 40;
            const isBalancedHealthy = isBalanced && item.score >= 60;

            return (
              <motion.article
                key={item.name}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm"
              >
                <div className="p-5 sm:p-6">
                  <div className="flex items-start justify-between gap-3">
                    <h2 className="text-base font-bold leading-snug text-gray-800 sm:text-lg">
                      {item.name}
                    </h2>
                    <span
                      className={`shrink-0 rounded-full px-3 py-1 text-xs font-bold
                        ${isBalancedHealthy
                          ? "bg-emerald-100 text-emerald-700"
                          : isHigh
                            ? "bg-orange-100 text-orange-700"
                            : "bg-gray-100 text-gray-600"}`}
                    >
                      {item.score}
                    </span>
                  </div>

                  <div className="mt-4 h-2.5 overflow-hidden rounded-full bg-gray-100">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.max(0, Math.min(item.score, 100))}%` }}
                      transition={{ duration: 0.6 }}
                      className={`h-full rounded-full ${
                        isBalancedHealthy ? "bg-emerald-500" : isHigh ? "bg-orange-400" : "bg-gray-300"
                      }`}
                    />
                  </div>

                  <p className="mt-4 text-sm leading-relaxed text-gray-600">
                    <strong className="text-gray-800">Đặc điểm:</strong> {item.description}
                  </p>

                  {item.score >= 30 && (
                    <div className="mt-4 rounded-xl border border-blue-100 bg-blue-50 p-3">
                      <p className="flex items-start gap-2 text-sm leading-relaxed text-blue-800">
                        <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                        <span><strong>Lời khuyên:</strong> {item.advice}</span>
                      </p>
                    </div>
                  )}
                </div>
              </motion.article>
            );
          })}
        </section>

        <p className="border-t border-gray-200 pt-5 text-center text-xs leading-relaxed text-gray-400">
          Kết quả chỉ mang tính tham khảo và không thay thế chẩn đoán y khoa.
        </p>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-gray-200 bg-white/95 px-4 py-3 shadow-lg backdrop-blur">
        <div className="mx-auto flex max-w-3xl gap-3">
          <button
            type="button"
            onClick={onDownload}
            className="flex min-h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-gray-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-gray-800 focus:outline-none focus:ring-4 focus:ring-gray-200"
          >
            <Download className="h-5 w-5" />
            Tải PDF
          </button>
          <button
            type="button"
            onClick={onDonate}
            className="flex min-h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-emerald-500 focus:outline-none focus:ring-4 focus:ring-emerald-100"
          >
            ❤️ <span>Ủng hộ</span>
          </button>
        </div>
      </div>
    </main>
  );
}
