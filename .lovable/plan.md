# AI English Speaking Platform — UI Build Plan

A complete, frontend-only UI build (mock data, no backend) for a Duolingo-inspired English fluency app. All pages, routes, and a cohesive design system.

## Design system

**Tokens** (`src/styles.css`, oklch):
- `--primary`: emerald 600 + `--primary-glow` emerald 400 → `--gradient-primary`
- `--secondary`: dark slate 800
- `--accent`: warm yellow (XP/rewards) + `--accent-glow`
- `--success`, `--destructive`, `--muted`, neutral background
- `--shadow-soft`, `--shadow-card`, `--shadow-glow` for rewarding feel
- Radius scale tuned rounder (`--radius: 1rem`)

**Typography**: Plus Jakarta Sans (display/headings) + Inter (body), via Google Fonts in `__root.tsx`.

**Reusable components** (`src/components/`):
- `AppShell` — desktop sidebar + mobile bottom nav wrapper
- `Sidebar`, `BottomNav` — primary nav (Dashboard, Map, Review, Conversations, Profile)
- `XPBar`, `StreakBadge`, `LevelChip`, `RewardPill`
- `ChapterCard`, `MissionCard`, `StatCard`, `AchievementBadge`
- `Flashcard` (flip + swipe via CSS transitions / pointer events)
- `QuizOption`, `FeedbackToast`
- `ChatBubble`, `MicButton` (CSS-animated pulse), `VoiceWaveform`, `TutorAvatar`
- `ScoreRing` (SVG circular progress)
- `SectionHeader`, `EmptyState`

## Routes (TanStack Start, file-based)

```
src/routes/
  __root.tsx                 (fonts, providers, Toaster)
  index.tsx                  → redirects to /dashboard (mock auth)
  login.tsx
  register.tsx               (multi-step: account → goal)
  _app.tsx                   (layout: AppShell with Outlet)
  _app/dashboard.tsx
  _app/map.tsx               (chapter world map)
  _app/chapters.$chapterId.tsx
  _app/vocabulary.$chapterId.tsx
  _app/grammar.$chapterId.tsx
  _app/quiz.$chapterId.tsx
  _app/conversations.tsx                  (lobby)
  _app/conversations.$scenarioId.tsx      (room)
  _app/conversations.$scenarioId.result.tsx
  _app/review.tsx
  _app/profile.tsx
  _app/settings.tsx
```

Each route sets unique `head()` meta.

## Page highlights

- **Login / Register**: split layout — auth card left, emerald gradient illustration panel right. Register is 2-step (account → goal chips: Travel, Work, Interview, Daily).
- **Dashboard**: greeting + level/XP/streak row, "Continue Learning" gradient hero, daily missions grid, recommended review, current chapter progress, speaking minutes ring, achievements strip.
- **Chapter Map**: vertical zigzag of chapter nodes (Coffee Shop, Airport, Office, Shopping, Hotel, +more), locked/unlocked states, difficulty dots, est. time, SVG path connectors.
- **Chapter Detail**: objective hero, vocab chips, grammar topics, rewards, progress, Start Lesson CTA, AI challenge teaser.
- **Vocabulary**: large flashcard with flip + swipe, play-audio button, example sentence, progress dots, mini-quiz at end.
- **Grammar**: explanation card, example cards with highlighted parts, inline practice, continue CTA.
- **Quiz**: progress bar, MC + reorder + fill-blank, animated feedback, XP burst.
- **AI Conversation Lobby**: difficulty + category filters, scenario card grid with tutor avatars and duration.
- **Conversation Room** (flagship):
  - 3-column desktop / single-column mobile
  - Left: tutor profile, objective, vocab hints, progress
  - Center: chat bubbles, AI "speaking…" waveform indicator
  - Bottom bar: large mic button (idle/listening/processing), live transcript preview, retry, replay AI voice, translate toggle, hint
  - Immersive minimal chrome, soft gradient background
- **Conversation Result**: 4 score rings (pronunciation, fluency, grammar, vocab), AI feedback cards, mistake highlights, XP gained, retry + continue CTAs.
- **Review**: tabs (Words / Grammar / Speaking), queue cards, daily progress, smart recs.
- **Profile**: avatar, stats grid, calendar heatmap streak viz, achievements grid, speaking history list.
- **Settings**: grouped cards — AI voice speed slider, notification toggles, difficulty select, account fields.

## Technical details

- **Stack**: TanStack Start, Tailwind v4, shadcn/ui, lucide-react.
- **Animations**: pure CSS / Tailwind transitions + small keyframes in `styles.css` (mic pulse, XP burst, score ring fill, flashcard flip). No framer-motion.
- **Auth**: mocked — login/register navigate to `/dashboard`.
- **Data**: typed mock data in `src/data/` (chapters, scenarios, vocabulary, user stats).
- **Responsive**: mobile-first; sidebar collapses to bottom nav under `md`; conversation room stacks vertically on mobile with sticky bottom controls.
- **Accessibility**: semantic HTML, single H1 per page, focus rings, alt text, aria-labels, prefers-reduced-motion honored.

## Out of scope

- Real auth, real AI/STT/TTS, persistence — all mocked. Easy to wire to Lovable Cloud + AI Gateway later.

## Deliverable

A polished, navigable demo where every page is reachable from the nav, with realistic mock content and a rewarding gamified feel.
