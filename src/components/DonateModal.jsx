import { X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export default function DonateModal({ open, onClose, qr, kofiLogo, icon }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/50 p-4 backdrop-blur-sm"
          onMouseDown={onClose}
        >
          <motion.div
            initial={{ scale: 0.96, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.96, opacity: 0, y: 10 }}
            className="relative my-auto max-h-[calc(100vh-2rem)] w-full max-w-md overflow-y-auto rounded-3xl bg-white p-5 shadow-2xl sm:p-7"
            onMouseDown={(event) => event.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="donate-title"
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Đóng"
              className="absolute right-3 top-3 rounded-full p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-800"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-2xl">
                ❤️
              </div>
              <h2 id="donate-title" className="text-xl font-bold text-gray-800">
                Cảm ơn bạn đã ủng hộ!
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-gray-600">
                Đóng góp của bạn giúp duy trì và phát triển ứng dụng.
              </p>

              <img
                src={qr}
                alt="Mã QR ủng hộ"
                className="mx-auto my-5 w-full max-w-[260px] rounded-2xl border border-gray-100"
              />

              <a
                href="https://ko-fi.com/itthatnghiep/tip"
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-100"
              >
                <img src={kofiLogo} alt="" className="h-5" />
                Donate via Ko-fi
              </a>

              <img src={icon} alt="CCMQ App" className="mx-auto mt-6 h-16 w-16 rounded-2xl" />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
