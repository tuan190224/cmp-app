import { useState, useRef, } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, CheckCircle2, Download, RefreshCw, AlertCircle, X } from 'lucide-react'; import { generatePDF } from './pdfGenerator';

import icon from '../public/icon.webp';
import qr from '../public/qr.jpeg';
import kofi_logo from '../public/kofi_logo.svg';
// --- DỮ LIỆU CÂU HỎI & CÔNG THỨC TÍNH ĐIỂM (THEO FILE CCMQ) ---

const QUESTIONS = [
  { id: 1, text: "Bạn có cảm thấy tràn đầy năng lượng không?" },
  { id: 2, text: "Bạn có dễ bị mệt mỏi không?" },
  { id: 3, text: "Bạn có bị khó thở không?" },
  { id: 4, text: "Bạn có bị đánh trống ngực không?" },
  { id: 5, text: "Bạn có dễ bị chóng mặt hoặc choáng váng khi đứng dậy không?" },
  { id: 6, text: "Bạn có thích yên tĩnh và không thích nói chuyện không?" },
  { id: 7, text: "Giọng nói của bạn có yếu khi nói chuyện không?" },
  { id: 8, text: "Bạn có hay quên không?" },
  { id: 9, text: "Bạn có cảm thấy u sầu và trầm cảm không?" },
  { id: 10, text: "Bạn có dễ lo lắng không?" },
  { id: 11, text: "Bạn có nhạy cảm, dễ xúc động không?" },
  { id: 12, text: "Bạn có dễ sợ hãi không?" },
  { id: 13, text: "Bạn có bị căng tức vùng nách hoặc ngực không?" },
  { id: 14, text: "Bạn có cảm thấy tức ngực hoặc đầy bụng không?" },
  { id: 15, text: "Bạn có thở dài vô cớ không?" },
  { id: 16, text: "Cơ thể bạn có cảm thấy nặng nề hoặc lờ đờ không?" },
  { id: 17, text: "Lòng bàn tay hoặc bàn chân bạn có nóng không?" },
  { id: 18, text: "Tay hoặc chân bạn có lạnh hoặc ẩm ướt không?" },
  { id: 19, text: "Bụng, lưng, thắt lưng hoặc đầu gối bạn có dễ bị lạnh không?" },
  { id: 20, text: "Bạn có nhạy cảm với lạnh và mặc nhiều quần áo hơn người khác không?" },
  { id: 21, text: "Mặt hoặc cơ thể bạn có cảm thấy nóng không?" },
  { id: 22, text: "Bạn có chịu lạnh kém hơn người khác (mùa đông, điều hòa, quạt...) không?" },
  { id: 23, text: "Bạn có dễ bị cảm lạnh hơn người khác không?" },
  { id: 24, text: "Bạn có hắt hơi ngay cả khi không bị cảm không?" },
  { id: 25, text: "Bạn có bị sổ mũi hoặc nghẹt mũi khi không bị cảm không?" },
  { id: 26, text: "Bạn có ho do thay đổi mùa, nhiệt độ hoặc mùi khó chịu không?" },
  { id: 27, text: "Bạn có dễ đổ mồ hôi khi vận động nhẹ không?" },
  { id: 28, text: "Trán hoặc vùng chữ T của bạn có quá nhiều dầu không?" },
  { id: 29, text: "Da hoặc môi bạn có khô không?" },
  { id: 30, text: "Bạn có bị dị ứng không? (Thuốc, thức ăn, phấn hoa...)" },
  { id: 31, text: "Da bạn có dễ nổi mề đay không?" },
  { id: 32, text: "Da bạn có xuất hiện ban xuất huyết (đốm tím) do dị ứng không?" },
  { id: 33, text: "Vết bầm tím đen/tím có xuất hiện trên da vô cớ không?" },
  { id: 34, text: "Da bạn có đỏ lên và để lại vết khi gãi không?" },
  { id: 35, text: "Môi bạn có đỏ hơn người khác không?" },
  { id: 36, text: "Bạn có thấy mao mạch/tĩnh mạch nhỏ trên má không?" },
  { id: 37, text: "Bạn có cảm thấy đau ở đâu đó trên cơ thể không?" },
  { id: 38, text: "Bạn có bị bốc hỏa không?" },
  { id: 39, text: "Mũi hoặc mặt bạn có nhờn, bóng dầu không?" },
  { id: 40, text: "Mặt bạn có sạm tối hoặc dễ bị nám không?" },
  { id: 41, text: "Bạn có dễ bị mụn nhọt không?" },
  { id: 42, text: "Mí mắt trên của bạn có sưng không?" },
  { id: 43, text: "Bạn có dễ bị quầng thâm dưới mắt không?" },
  { id: 44, text: "Mắt bạn có khô và phải dùng thuốc nhỏ mắt không?" },
  { id: 45, text: "Môi bạn có sẫm màu hoặc tím tái hơn bình thường không?" },
  { id: 46, text: "Bạn có thường xuyên khát nước và cần uống nước không?" },
  { id: 47, text: "Cổ họng bạn có cảm giác lạ (như vướng mắc cục gì đó) không?" },
  { id: 48, text: "Miệng bạn có vị đắng hoặc vị lạ không?" },
  { id: 49, text: "Miệng bạn có cảm giác dính nhớt không?" },
  { id: 50, text: "Lưỡi bạn có lớp rêu dày không?" },
  { id: 51, text: "Bạn có nhiều đờm, đặc biệt là trong cổ họng không?" },
  { id: 52, text: "Bạn có khó chịu khi ăn/uống đồ lạnh hoặc tránh đồ lạnh không?" },
  { id: 53, text: "Bạn có khả năng thích nghi với sự thay đổi môi trường tự nhiên/xã hội không?" },
  { id: 54, text: "Bạn có bị mất ngủ không?" },
  { id: 55, text: "Bạn có dễ bị tiêu chảy khi nhiễm lạnh hoặc ăn đồ lạnh không?" },
  { id: 56, text: "Phân bạn có dính và/hoặc cảm giác đi chưa hết phân không?" },
  { id: 57, text: "Bạn có dễ bị táo bón hoặc phân khô không?" },
  { id: 58, text: "Bụng bạn có mềm/nhão không?" },
  { id: 59, text: "Niệu đạo có nóng khi tiểu hoặc nước tiểu sẫm màu không?" },
  // Câu 60 tách riêng Nam/Nữ trong logic xử lý bên dưới
];

const OPTIONS = [
  { label: "Không", value: 1 },
  { label: "Hiếm khi", value: 2 },
  { label: "Thỉnh thoảng", value: 3 },
  { label: "Thường xuyên", value: 4 },
  { label: "Luôn luôn", value: 5 },
];

// Định nghĩa các thể chất và câu hỏi tương ứng (theo Scoring Formula)
// R = Reverse Score (Đảo ngược điểm: 1->5, 2->4, 3->3, 4->2, 5->1)
const CONSTITUTIONS = {
  BALANCED: {
    name: "Thể chất Bình Hòa (Khỏe mạnh)",
    items: [
      { id: 1, reverse: false },
      { id: 2, reverse: true },
      { id: 7, reverse: true },
      { id: 8, reverse: true },
      { id: 9, reverse: true },
      { id: 22, reverse: true },
      { id: 53, reverse: false },
      { id: 54, reverse: true },
    ],
    description: "Âm dương khí huyết điều hòa, sức khỏe dồi dào, ít bệnh tật.",
    advice: "Duy trì lối sống lành mạnh, ăn uống ngủ nghỉ điều độ, vận động vừa phải."
  },
  QI_DEF: {
    name: "Thể chất Khí Hư (Hơi thở yếu)",
    items: [2, 3, 4, 5, 6, 7, 23, 27],
    description: "Nguyên khí bất túc, dễ mệt mỏi, hụt hơi, giọng nói nhỏ, dễ ốm vặt.",
    advice: "Ăn thực phẩm bổ khí (đậu nành, thịt gà, táo tàu). Tránh lao động quá sức, giữ ấm cơ thể."
  },
  YANG_DEF: {
    name: "Thể chất Dương Hư (Tạng lạnh)",
    items: [18, 19, 20, 22, 23, 52, 55],
    description: "Dương khí bất túc, sợ lạnh, chân tay không ấm, thích ăn đồ nóng.",
    advice: "Ăn thực phẩm ôn dương (thịt bò, gừng, hành). Giữ ấm lưng và bụng, tránh đồ lạnh."
  },
  YIN_DEF: {
    name: "Thể chất Âm Hư (Tạng nóng)",
    items: [17, 21, 29, 35, 38, 44, 46, 57],
    description: "Âm dịch suy hư, miệng khô, lòng bàn tay chân nóng, người gầy.",
    advice: "Ăn thực phẩm dưỡng âm (thịt lợn, đậu xanh, bí đao). Tránh thức khuya, hạn chế vận động ra mồ hôi nhiều."
  },
  PHLEGM_DAMP: {
    name: "Thể chất Đàm Thấp (Dễ béo)",
    items: [14, 16, 28, 42, 49, 50, 51, 58],
    description: "Hình thể béo, bụng to, da mặt nhiều dầu, miệng dính, nhiều đờm.",
    advice: "Ăn thanh đạm, hạn chế đồ béo ngọt. Tăng cường vận động, tránh môi trường ẩm thấp."
  },
  DAMP_HEAT: {
    name: "Thể chất Thấp Nhiệt (Nóng ẩm)",
    items: [39, 41, 48, 56, 59, 60], // 60 sẽ xử lý dynamic
    description: "Mặt bóng dầu, dễ mụn nhọt, miệng đắng, tiểu vàng, người nặng nề.",
    advice: "Ăn đồ mát lợi tiểu (đậu đỏ, dưa chuột). Kiêng đồ cay nóng, dầu mỡ. Tránh môi trường nóng ẩm."
  },
  BLOOD_STASIS: {
    name: "Thể chất Huyết Ứ (Máu lưu thông kém)",
    items: [8, 33, 36, 37, 40, 43, 45],
    description: "Sắc da tối sạm, dễ bị nám, môi tím, hay quên, dễ đau nhức.",
    advice: "Ăn thực phẩm hoạt huyết (táo gai, trà hoa hồng). Vận động thường xuyên, ngủ đủ giấc."
  },
  QI_STAG: {
    name: "Thể chất Khí Uất (Hay u uất)",
    items: [9, 10, 11, 12, 13, 15, 47],
    description: "Tinh thần uất ức, hay lo âu, thở dài, nhạy cảm đa nghi.",
    advice: "Ăn đồ giúp thư giãn (trà hoa hồng, rong biển). Tham gia hoạt động xã hội, tránh ở một mình."
  },
  SPECIAL: {
    name: "Thể chất Cơ địa (Dị ứng/Bẩm sinh)",
    items: [24, 25, 26, 30, 31, 32, 34],
    description: "Dễ dị ứng (thuốc, thức ăn, thời tiết), mắc các bệnh di truyền hoặc bẩm sinh.",
    advice: "Tránh tác nhân gây dị ứng. Ăn uống thanh đạm, tăng cường miễn dịch."
  }
};

// --- COMPONENT CHÍNH ---

export default function App() {
  const [step, setStep] = useState('intro'); // intro, quiz, result
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [gender, setGender] = useState(null); // 'male' or 'female'
  const resultRef = useRef();
  // Thêm cùng các state khác
  const [showDonate, setShowDonate] = useState(false);
  // Xử lý chọn giới tính ở đầu
  const startQuiz = (selectedGender) => {
    setGender(selectedGender);
    setStep('quiz');
  };

  // Xử lý trả lời câu hỏi
  const handleAnswer = (value) => {
    const newAnswers = { ...answers, [QUESTIONS[currentIndex].id]: value };
    setAnswers(newAnswers);

    // Tự động chuyển câu sau delay ngắn để UX mượt hơn
    setTimeout(() => {
      if (currentIndex < QUESTIONS.length - 1) {
        setCurrentIndex(prev => prev + 1);
      } else {
        setStep('result');
      }
    }, 300);
  };

  // Quay lại câu trước
  const handleBack = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    } else if (step === 'quiz') {
      // Nếu đang ở câu đầu tiên mà bấm back thì quay về màn hình chọn giới tính
      setStep('intro');
    }
  };

  // Tính toán điểm số
  const calculateScores = () => {
    const getScore = (id, reverse = false) => {
      let val = answers[id] || 3; // Default 3 nếu chưa trả lời (an toàn)
      return reverse ? (6 - val) : val;
    };

    const results = {};

    Object.keys(CONSTITUTIONS).forEach(key => {
      const consti = CONSTITUTIONS[key];
      let rawSum = 0;
      let itemCount = consti.items.length;

      // Xử lý đặc biệt cho Thấp Nhiệt (câu 60)
      if (key === 'DAMP_HEAT') {
        const q60Id = gender === 'female' ? '60_1' : '60_2';
        // Trong mảng items của DAMP_HEAT ta để placeholder 60, giờ map lại
        consti.items.forEach(item => {
          if (item === 60) {
            rawSum += (answers[q60Id] || 3);
          } else {
            rawSum += getScore(item);
          }
        });
      }
      // Xử lý Bình Hòa (có reverse)
      else if (key === 'BALANCED') {
        consti.items.forEach(item => {
          rawSum += getScore(item.id, item.reverse);
        });
      }
      // Các thể chất còn lại
      else {
        consti.items.forEach(id => {
          rawSum += getScore(id);
        });
      }

      // Công thức: ((Raw - N) / (N * 4)) * 100
      const converted = Math.round(((rawSum - itemCount) / (itemCount * 4)) * 100);

      results[key] = {
        ...consti,
        score: converted,
        status: converted >= 40 ? (converted >= 60 && key === 'BALANCED' ? 'Yes' : 'Yes') : (converted >= 30 ? 'Tend to' : 'No')
      };
    });

    // Logic xác định Bình Hòa chuẩn xác hơn theo doc
    const balanced = results.BALANCED;
    const others = Object.values(results).filter(r => r.name !== balanced.name);
    const allOthersLow = others.every(r => r.score < 30);
    const allOthersMed = others.every(r => r.score < 40);

    if (balanced.score >= 60 && allOthersLow) balanced.finalStatus = "Bình Hòa (Khỏe Mạnh)";
    else if (balanced.score >= 60 && allOthersMed) balanced.finalStatus = "Cơ Bản Bình Hòa";
    else balanced.finalStatus = "Không Bình Hòa";

    return results;
  };

  // Xuất PDF
  const downloadPDF = () => {
    const scores = calculateScores();
    const sortedResults = Object.values(scores).sort((a, b) => {
      if (a.name.includes("Bình Hòa")) return -1;
      if (b.name.includes("Bình Hòa")) return 1;
      return b.score - a.score;
    });

    // Gọi hàm tạo PDF từ dữ liệu, không cần DOM
    generatePDF(scores, gender, sortedResults);
  };
  const closeDonate = () => setShowDonate(false);
  // --- RENDER CÁC MÀN HÌNH ---

  if (step === 'intro') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-100 flex items-center justify-center p-4 font-sans">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl shadow-xl p-8 max-w-md w-full text-center border border-emerald-100"
        >
          <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-emerald-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-3">Trắc Nghiệm Thể Chất Đông Y</h1>
          <p className="text-gray-600 mb-8 leading-relaxed">
            Khảo sát thể chất dựa trên bảng hỏi CCMQ chuẩn hóa. Hãy chọn giới tính của bạn để bắt đầu.
          </p>

          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => startQuiz('male')}
              className="py-4 px-6 rounded-xl bg-blue-50 text-blue-700 font-semibold hover:bg-blue-100 transition-all border-2 border-transparent hover:border-blue-200"
            >
              Nam
            </button>
            <button
              onClick={() => startQuiz('female')}
              className="py-4 px-6 rounded-xl bg-pink-50 text-pink-700 font-semibold hover:bg-pink-100 transition-all border-2 border-transparent hover:border-pink-200"
            >
              Nữ
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  if (step === 'quiz') {
    const progress = ((currentIndex + 1) / QUESTIONS.length) * 100;
    const currentQ = QUESTIONS[currentIndex];

    return (
      <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
        {/* Header Progress */}
        <div className="bg-white shadow-sm sticky top-0 z-10 px-4 py-4">
          <div className="max-w-2xl mx-auto flex items-center justify-between mb-2">
            <button onClick={handleBack} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <ChevronLeft className="w-6 h-6 text-gray-600" />
            </button>
            <span className="text-sm font-medium text-gray-500">Câu {currentIndex + 1}/{QUESTIONS.length}</span>
            <div className="w-8"></div> {/* Spacer */}
          </div>
          <div className="max-w-2xl mx-auto h-2 bg-gray-100 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-emerald-500 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        {/* Question Card */}
        <div className="flex-1 flex items-center justify-center p-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQ.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-3xl shadow-lg p-6 md:p-10 max-w-2xl w-full border border-gray-100"
            >
              <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-8 leading-snug">
                {currentQ.text}
              </h2>

              <div className="space-y-3">
                {OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => handleAnswer(opt.value)}
                    className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 flex items-center justify-between group
                      ${answers[currentQ.id] === opt.value
                        ? 'border-emerald-500 bg-emerald-50 text-emerald-800'
                        : 'border-gray-100 hover:border-emerald-200 hover:bg-gray-50 text-gray-700'
                      }`}
                  >
                    <span className="font-medium">{opt.label}</span>
                    {answers[currentQ.id] === opt.value && (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    )}
                  </button>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    );
  }

  // --- MÀN HÌNH KẾT QUẢ ---
  const scores = calculateScores();
  // Sắp xếp: Bình Hòa lên đầu, sau đó đến các thể chất có điểm cao nhất
  const sortedResults = Object.values(scores).sort((a, b) => {
    if (a.name.includes("Bình Hòa")) return -1;
    if (b.name.includes("Bình Hòa")) return 1;
    return b.score - a.score;
  });

  return (
    <div className="min-h-screen bg-gray-50 pb-20 font-sans">
      {
        showDonate && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={closeDonate}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 20 }}
              className="bg-white rounded-3xl shadow-2xl p-6 md:p-8 max-w-md w-full border border-emerald-100"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={closeDonate}
                className=" text-gray-500 hover:text-gray-700 text-sm font-medium transition-colors"
              >
                Đóng ×
              </button>
              <div className="text-center">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">❤️</span>
                </div>

                <h3 className="text-xl font-bold text-gray-800 mb-2">Cảm ơn bạn đã ủng hộ!</h3>
                <p className="text-gray-600 mb-6 text-sm leading-relaxed">
                  Ứng dụng này được phát triển với mong muốn hỗ trợ cộng đồng chăm sóc sức khỏe theo Y học Cổ truyền.
                  Mọi đóng góp của bạn sẽ giúp duy trì và phát triển thêm nhiều tính năng hữu ích hơn nữa trong tương lai.
                </p>
                <div className="space-y-3 mb-6">
                  <img src={qr} alt="QR Code" className="w-64 mx-auto mb-4 rounded-[12px]" />

                  <a
                    href="https://ko-fi.com/itthatnghiep/tip"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full py-3 px-4 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <img src={kofi_logo} alt="Ko-fi Logo" className=" h-5" />
                    Donate via Ko-fi
                  </a>

                </div>
                <img src={icon} alt="App Icon" className="w-20 h-20 mx-auto rounded-full" />


              </div>
            </motion.div>
          </motion.div>
        )
      }

      {/* Navbar Result */}
      <div className="bg-emerald-700 text-white p-6 shadow-md">
        <div className="max-w-3xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Kết Quả Thể Chất</h1>
          <button
            onClick={() => { setAnswers({}); setCurrentIndex(0); setStep('intro'); }}
            className="flex items-center gap-2 text-sm bg-emerald-600 hover:bg-emerald-500 px-4 py-2 rounded-lg transition-colors"
          >
            <RefreshCw className="w-4 h-4" /> Làm lại
          </button>
        </div>
      </div>

      {/* Content to be exported as PDF */}
      <div ref={resultRef} className="max-w-3xl mx-auto p-4 md:p-6 space-y-6 mt-6">

        {/* Summary Card */}
        <div className="bg-white rounded-2xl shadow-sm p-6 border-l-4 border-emerald-500">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Tổng quan</h3>
          <p className="text-gray-600">
            Dựa trên câu trả lời của bạn trong năm qua, dưới đây là phân tích thể chất theo Y học Cổ truyền.
            Kết quả này mang tính tham khảo để hỗ trợ chăm sóc sức khỏe chủ động.
          </p>
        </div>

        {/* Detailed Results */}
        <div className="space-y-4">
          {sortedResults.map((item, idx) => (
            <div key={idx} className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100">
              <div className="p-5">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-bold text-lg text-gray-800">{item.name}</h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide
                    ${item.score >= 40 ? 'bg-orange-100 text-orange-700' : 'bg-gray-100 text-gray-600'}
                    ${item.name.includes('Bình Hòa') && item.score >= 60 ? 'bg-emerald-100 text-emerald-700' : ''}
                  `}>
                    Điểm: {item.score}
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-gray-100 rounded-full h-2.5 mb-4">
                  <div
                    className={`h-2.5 rounded-full ${item.score >= 40 ? 'bg-orange-400' : 'bg-gray-300'} ${item.name.includes('Bình Hòa') && item.score >= 60 ? 'bg-emerald-500' : ''}`}
                    style={{ width: `${Math.min(item.score, 100)}%` }}
                  ></div>
                </div>

                <div className="space-y-2 text-sm text-gray-600">
                  <p><span className="font-semibold text-gray-800">Đặc điểm:</span> {item.description}</p>
                  {item.score >= 30 && (
                    <div className="mt-3 p-3 bg-blue-50 rounded-lg border border-blue-100">
                      <p className="flex items-start gap-2 text-blue-800">
                        <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                        <span><strong>Lời khuyên:</strong> {item.advice}</span>
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer for PDF */}
        <div className="text-center text-xs text-gray-400 pt-8 border-t border-gray-200 mt-8 hidden print:block pdf-footer">
          <p>Kết quả được tạo bởi Ứng dụng Trắc nghiệm Thể chất Đông y (CCMQ)</p>
          <p>Ngày tạo: {new Date().toLocaleDateString('vi-VN')}</p>
        </div>
      </div>

      {/* Fixed Action Buttons */}
      <div className="fixed bottom-6 left-0 right-0 flex justify-center gap-4 pointer-events-none">
        <button
          onClick={downloadPDF}
          className="pointer-events-auto flex items-center gap-2 bg-gray-900 text-white px-6 py-4 rounded-full shadow-2xl hover:bg-gray-800 hover:scale-105 transition-all duration-300 font-semibold"
        >
          <Download className="w-5 h-5" /> Tải PDF
        </button>

        <button
          onClick={() => setShowDonate(true)}
          className="pointer-events-auto flex items-center gap-2 bg-emerald-600 text-white px-6 py-4 rounded-full shadow-2xl hover:bg-emerald-500 hover:scale-105 transition-all duration-300 font-semibold"
        >
          ❤️ Ủng hộ
        </button>
      </div>
    </div>
    /* Donate Popup Modal */

  );
}