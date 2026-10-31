import { useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { CheckCircle2 } from "lucide-react";
import { getWelcomeMessage } from "../data/getWelcomeMessage";

const WELCOME_DURATION = 4200;

export default function IntroScreen({ onStart }) {
  const [isWelcome, setIsWelcome] = useState(true);
  const stageRef = useRef(null);
  const paneRef = useRef(null);
  const quoteRef = useRef(null);
  const quoteTextRef = useRef(null);
  const contentRef = useRef(null);
  const transitionedRef = useRef(false);
  const timelineRef = useRef(null);

  useLayoutEffect(() => {
    const stage = stageRef.current;
    const pane = paneRef.current;
    const quote = quoteRef.current;
    const quoteText = quoteTextRef.current;
    const content = contentRef.current;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reducedMotion) {
      gsap.set(quoteText, { opacity: 1, scale: 1, filter: "blur(0px)" });
    } else {
      timelineRef.current = gsap.fromTo(
        quoteText,
        { filter: "blur(20px)", opacity: 0, scale: 0.9 },
        { filter: "blur(0px)", opacity: 1, scale: 1, duration: 1.5, ease: "power2.out" },
      );
    }

    const showQuestion = () => {
      if (transitionedRef.current) return;
      transitionedRef.current = true;
      window.clearTimeout(timer);
      timelineRef.current?.kill();
      gsap.killTweensOf([quote, quoteText]);

      if (reducedMotion) {
        setIsWelcome(false);
        return;
      }

      const width = Math.min(window.innerWidth - 32, 448);
      const height = Math.min(window.innerHeight - 32, 500);
      const timeline = gsap.timeline();
      timelineRef.current = timeline;
      timeline
        .to(quoteText, { opacity: 0, y: 24, scale: 0.98, filter: "blur(6px)", duration: 0.24, ease: "power2.in" }, 0)
        .to(pane, {
          width,
          height,
          borderRadius: 32,
          duration: 1.05,
          ease: "power3.inOut",
          boxShadow: "0 20px 52px rgba(34, 78, 62, .13), inset 0 1px 0 rgba(255,255,255,.72)",
        }, 0.52)
        .set(quote, { visibility: "hidden" }, 0.26)
        .to(content, { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.48, ease: "power2.out" }, 1.6)
        .call(() => setIsWelcome(false), [], 1.6);
    };

    const timer = window.setTimeout(showQuestion, WELCOME_DURATION);
    const onPointerDown = () => showQuestion();
    const onPointerMove = (event) => {
      const x = ((event.clientX / window.innerWidth) - 0.5) * 16;
      const y = ((event.clientY / window.innerHeight) - 0.5) * 16;
      stage.style.setProperty("--pointer-x", `${x}px`);
      stage.style.setProperty("--pointer-y", `${y}px`);
      stage.style.setProperty("--cursor-x", `${event.clientX}px`);
      stage.style.setProperty("--cursor-y", `${event.clientY}px`);
      stage.classList.add("has-pointer");
    };
    const onPointerLeave = () => stage.classList.remove("has-pointer");
    const onKeyDown = () => showQuestion();

    stage.addEventListener("pointerdown", onPointerDown, { once: true });
    stage.addEventListener("pointermove", onPointerMove, { passive: true });
    stage.addEventListener("pointerleave", onPointerLeave);
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.clearTimeout(timer);
      stage.removeEventListener("pointerdown", onPointerDown);
      stage.removeEventListener("pointermove", onPointerMove);
      stage.removeEventListener("pointerleave", onPointerLeave);
      window.removeEventListener("keydown", onKeyDown);
      timelineRef.current?.kill();
      gsap.set(quoteText, { clearProps: "opacity,filter,transform" });
    };
  }, []);

  const welcomeMessage = getWelcomeMessage();

  return (
    <main ref={stageRef} className={`welcome-stage ${isWelcome ? "is-welcome" : "is-ready"}`}>
      <div className="welcome-backdrop" aria-hidden="true">
        <span className="welcome-cursor-glow" />
        <span className="welcome-grain" />
      </div>

      <section ref={paneRef} className="welcome-pane" aria-label="Chào mừng">
        <div ref={quoteRef} className="welcome-quote" aria-hidden={!isWelcome}>
          <h3 ref={quoteTextRef} className="text">{welcomeMessage}</h3>
        </div>

        <div ref={contentRef} className="intro-content" inert={isWelcome}>
          <div className="intro-icon">
            <CheckCircle2 aria-hidden="true" />
          </div>
          <p className="intro-eyebrow">Lắng nghe cơ thể</p>
          <h1>Trắc nghiệm Thể chất Đông Y</h1>
          <p className="intro-description">
            Khảo sát thể chất dựa trên bảng hỏi CCMQ. Vui lòng chọn giới tính để sử dụng câu hỏi 60 phù hợp.
          </p>

          <div className="intro-gender-options">
            <button type="button" onClick={() => onStart("male")} className="intro-gender intro-gender-male">
              Nam
            </button>
            <button type="button" onClick={() => onStart("female")} className="intro-gender intro-gender-female">
              Nữ
            </button>
          </div>
          <p className="intro-note">Kết quả mang tính tham khảo, không thay thế chẩn đoán y khoa.</p>
        </div>
      </section>

      {isWelcome && <p className="welcome-hint">Chạm nhẹ để tiếp tục</p>}
    </main>
  );
}
