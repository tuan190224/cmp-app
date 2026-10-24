# cmp-app UI refactor

This package contains the UI refactor files for `tuan190224/cmp-app`.

Changes:
- Split UI into IntroScreen, QuizScreen, ResultScreen, DonateModal.
- Moved questionnaire data to `src/data/questions.js`.
- Moved constitution metadata to `src/data/constitutions.js`.
- Added the sex-specific CCMQ item 60 to the visible questionnaire.
- Removed the invalid `/src/style.css` reference from `index.html`.
- Simplified Tailwind v4 CSS entry.
- Improved mobile layout, focus states, modal accessibility, sticky navigation, progress display, and action bar.
- Removed the implicit `answer || 3` fallback; incomplete answers now throw instead of silently changing a score.

Keep the existing `src/pdfGenerator.js` and assets under `public/`.
