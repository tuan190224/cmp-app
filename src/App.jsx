import { useMemo, useState } from "react";
import { generatePDF } from "./pdfGenerator";
import { CONSTITUTIONS } from "./data/constitutions";
import { getQuestions, OPTIONS } from "./data/questions";
import IntroScreen from "./components/IntroScreen";
import QuizScreen from "./components/QuizScreen";
import ResultScreen from "./components/ResultScreen";
import DonateModal from "./components/DonateModal";

const getScore = (answers, id, reverse = false) => {
  const value = answers[id];
  if (value == null) return null;
  return reverse ? 6 - value : value;
};

function calculateScores(answers, gender) {
  const results = {};

  Object.entries(CONSTITUTIONS).forEach(([key, constitution]) => {
    let rawSum = 0;
    const itemCount = constitution.items.length;

    if (key === "BALANCED") {
      for (const item of constitution.items) {
        const score = getScore(answers, item.id, item.reverse);
        if (score == null) throw new Error(`Thiếu câu ${item.id}`);
        rawSum += score;
      }
    } else {
      for (const item of constitution.items) {
        const id = item === 60
          ? gender === "female" ? "60_1" : "60_2"
          : item;

        const score = getScore(answers, id);
        if (score == null) throw new Error(`Thiếu câu ${id}`);
        rawSum += score;
      }
    }

    const score = Math.round(((rawSum - itemCount) / (itemCount * 4)) * 100);

    results[key] = {
      ...constitution,
      score,
      status: score >= 40 ? "Yes" : score >= 30 ? "Tend to" : "No",
    };
  });

  const balanced = results.BALANCED;
  const others = Object.values(results).filter((item) => item !== balanced);

  if (balanced.score >= 60 && others.every((item) => item.score < 30)) {
    balanced.finalStatus = "Bình Hòa (Khỏe Mạnh)";
  } else if (balanced.score >= 60 && others.every((item) => item.score < 40)) {
    balanced.finalStatus = "Cơ Bản Bình Hòa";
  } else {
    balanced.finalStatus = "Không Bình Hòa";
  }

  return results;
}

function sortResults(scores) {
  return Object.values(scores).sort((a, b) => {
    if (a.name.includes("Bình Hòa")) return -1;
    if (b.name.includes("Bình Hòa")) return 1;
    return b.score - a.score;
  });
}

export default function App() {
  const [step, setStep] = useState("intro");
  const [gender, setGender] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isAnswering, setIsAnswering] = useState(false);
  const [showDonate, setShowDonate] = useState(false);

  const questions = useMemo(() => getQuestions(gender), [gender]);

  const scores = step === "result" ? calculateScores(answers, gender) : null;
  const sortedResults = scores ? sortResults(scores) : [];

  const startQuiz = (selectedGender) => {
    setGender(selectedGender);
    setAnswers({});
    setCurrentIndex(0);
    setStep("quiz");
  };

  const handleAnswer = (value) => {
    if (isAnswering) return;

    const question = questions[currentIndex];
    setAnswers((previous) => ({ ...previous, [question.id]: value }));
    setIsAnswering(true);

    window.setTimeout(() => {
      if (currentIndex < questions.length - 1) {
        setCurrentIndex((previous) => previous + 1);
        setIsAnswering(false);
      } else {
        setStep("result");
        setIsAnswering(false);
      }
    }, 220);
  };

  const handleBack = () => {
    if (isAnswering) return;

    if (currentIndex > 0) {
      setCurrentIndex((previous) => previous - 1);
    } else {
      setStep("intro");
    }
  };

  const restart = () => {
    setAnswers({});
    setGender(null);
    setCurrentIndex(0);
    setStep("intro");
    setShowDonate(false);
  };

  const downloadPDF = () => {
    generatePDF(scores, gender, sortedResults);
  };

  let screen;
  if (step === "intro") {
    screen = <IntroScreen onStart={startQuiz} />;
  } else if (step === "quiz") {
    screen = (
      <QuizScreen
        questions={questions}
        options={OPTIONS}
        currentIndex={currentIndex}
        answers={answers}
        onAnswer={handleAnswer}
        onBack={handleBack}
        isAnswering={isAnswering}
      />
    );
  } else {
    screen = (
      <>
        <ResultScreen
          sortedResults={sortedResults}
          gender={gender}
          onRestart={restart}
          onDownload={downloadPDF}
          onDonate={() => setShowDonate(true)}
        />

        <DonateModal
          open={showDonate}
          onClose={() => setShowDonate(false)}
          qr="/qr.jpeg"
          kofiLogo="/kofi_logo.svg"
          icon="/icon.webp"
        />
      </>
    );
  }

  return (
    <div className="app-shell">
      <div className="bgx-aurora" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <div className="app-content">{screen}</div>
    </div>
  );
}
