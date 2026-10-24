import { CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

export default function IntroScreen({ onStart }) {
  return (
    <main className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-100 px-4 py-8 flex items-center justify-center font-sans">
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md rounded-3xl bg-white p-6 sm:p-8 text-center shadow-xl border border-emerald-100"
      >
        <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100">
          <CheckCircle2 className="h-10 w-10 text-emerald-600" />
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
          Trắc nghiệm Thể chất Đông Y
        </h1>
        <p className="mt-3 text-sm sm:text-base leading-relaxed text-gray-600">
          Khảo sát thể chất dựa trên bảng hỏi CCMQ. Vui lòng chọn giới tính để sử dụng câu hỏi 60 phù hợp.
        </p>

        <div className="mt-7 grid grid-cols-2 gap-3 sm:gap-4">
          <button
            type="button"
            onClick={() => onStart("male")}
            className="min-h-14 rounded-2xl border border-blue-200 bg-blue-50 px-4 py-3 font-semibold text-blue-700 transition hover:-translate-y-0.5 hover:bg-blue-100 focus:outline-none focus:ring-4 focus:ring-blue-100"
          >
            Nam
          </button>
          <button
            type="button"
            onClick={() => onStart("female")}
            className="min-h-14 rounded-2xl border border-pink-200 bg-pink-50 px-4 py-3 font-semibold text-pink-700 transition hover:-translate-y-0.5 hover:bg-pink-100 focus:outline-none focus:ring-4 focus:ring-pink-100"
          >
            Nữ
          </button>
        </div>

        <p className="mt-5 text-xs leading-relaxed text-gray-400">
          Kết quả mang tính tham khảo, không thay thế chẩn đoán y khoa.
        </p>
      </motion.section>
    </main>
  );
}
