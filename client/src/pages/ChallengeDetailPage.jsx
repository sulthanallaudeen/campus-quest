import React from "react";
import { CheckCircle2, RotateCcw, Sparkles } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Loading from "../components/Loading.jsx";
import { api, getStudentId } from "../services/api.js";

export default function ChallengeDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [challenge, setChallenge] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [message, setMessage] = useState("");
  const [resultDetails, setResultDetails] = useState(null);
  const [completed, setCompleted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [rewardBadge, setRewardBadge] = useState(null);

  useEffect(() => {
    api.get(`/challenges/${id}?studentId=${getStudentId()}`).then((response) => {
      setChallenge(response.data);
      setCompleted(response.data.completed);
      setAnswers(Array(response.data.quiz_questions.length).fill(null));
    });
  }, [id]);

  useEffect(() => {
    if (!rewardBadge) return undefined;

    const redirectTimer = setTimeout(() => {
      navigate("/dashboard");
    }, 2600);

    return () => clearTimeout(redirectTimer);
  }, [navigate, rewardBadge]);

  const progress = useMemo(() => {
    if (!challenge) return 0;
    return Math.round(((currentQuestion + 1) / challenge.quiz_questions.length) * 100);
  }, [challenge, currentQuestion]);

  function chooseAnswer(optionIndex) {
    const nextAnswers = [...answers];
    nextAnswers[currentQuestion] = optionIndex;
    setAnswers(nextAnswers);
    setMessage("");
    setResultDetails(null);
  }

  function retryQuiz() {
    setAnswers(Array(challenge.quiz_questions.length).fill(null));
    setCurrentQuestion(0);
    setMessage("");
    setResultDetails(null);
  }

  async function submitQuiz() {
    setSubmitting(true);
    setMessage("");
    setResultDetails(null);

    try {
      const response = await api.post("/submissions", {
        studentId: getStudentId(),
        challengeId: id,
        answers
      });
      const unlockedBadge = response.data.unlockedBadges[0] || {
        icon: "🏆",
        name: challenge.title.replace(/^Level \d+: /, "")
      };
      setCompleted(true);
      setRewardBadge({ ...unlockedBadge, points: response.data.student.points });
      setMessage(`Perfect score: ${response.data.score}/${response.data.total}. Redirecting to dashboard...`);
    } catch (error) {
      setMessage(error.response?.data?.message || "Could not submit this quiz.");
      setResultDetails(error.response?.data?.details || null);
    } finally {
      setSubmitting(false);
    }
  }

  if (!challenge) return <Loading />;

  const question = challenge.quiz_questions[currentQuestion];
  const isLastQuestion = currentQuestion === challenge.quiz_questions.length - 1;
  const allAnswered = answers.every((answer) => answer !== null);

  return (
    <div className="mx-auto max-w-4xl">
      {rewardBadge && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-slate-950/90 px-5 text-center backdrop-blur-md">
          <div className="badge-burst absolute h-72 w-72 rounded-full bg-teal-300/20" />
          <div className="reward-card relative max-w-md rounded-3xl border border-teal-300/40 bg-slate-900/95 p-8 shadow-glow">
            <div className="mx-auto grid h-24 w-24 place-items-center rounded-full bg-teal-300 text-5xl text-slate-950 reward-badge-icon">
              {rewardBadge.icon}
            </div>
            <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-teal-300/30 bg-teal-300/10 px-4 py-2 text-sm font-bold text-teal-100">
              <Sparkles size={16} /> Badge Unlocked
            </div>
            <h2 className="mt-4 text-4xl font-black text-white">{rewardBadge.name}</h2>
            <p className="mt-3 text-slate-300">Perfect score. Your badge is added and your XP is updated.</p>
            <p className="mt-5 text-sm font-semibold uppercase text-teal-200">Returning to dashboard...</p>
          </div>
        </div>
      )}

      <Link to="/challenges" className="text-sm text-teal-200">Back to levels</Link>
      <article className="mt-5 rounded-3xl border border-white/10 bg-white/[0.07] p-8 shadow-glow">
        <div className="flex flex-col justify-between gap-4 md:flex-row">
          <div>
            <p className="text-sm font-semibold uppercase text-teal-200">{challenge.category}</p>
            <h1 className="mt-3 text-4xl font-black">{challenge.title}</h1>
          </div>
          <div className="text-left md:text-right">
            <p className="text-3xl font-black text-teal-200">{challenge.points} XP</p>
            <p className="text-sm text-slate-400">{challenge.difficulty}</p>
          </div>
        </div>

        <p className="mt-6 text-lg text-slate-300">{challenge.description}</p>
        <p className="mt-3 text-sm text-slate-400">{challenge.requirements}</p>

        <div className="mt-8">
          <div className="flex items-center justify-between text-sm text-slate-300">
            <span>Question {currentQuestion + 1} of {challenge.quiz_questions.length}</span>
            <span>{progress}%</span>
          </div>
          <div className="mt-2 h-3 overflow-hidden rounded-full bg-slate-800">
            <div className="h-full rounded-full bg-gradient-to-r from-teal-300 to-pink-400 transition-all" style={{ width: `${progress}%` }} />
          </div>
        </div>

        <section className="mt-8 rounded-2xl border border-white/10 bg-slate-950/60 p-5">
          <h2 className="text-2xl font-bold">{question.question}</h2>
          <div className="mt-5 grid gap-3">
            {question.options.map((option, optionIndex) => {
              const selected = answers[currentQuestion] === optionIndex;
              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => chooseAnswer(optionIndex)}
                  className={`rounded-xl border px-4 py-3 text-left font-semibold transition ${
                    selected ? "border-teal-300 bg-teal-300 text-slate-950" : "border-white/10 bg-white/[0.06] text-slate-100 hover:border-teal-300/50"
                  }`}
                >
                  {option}
                </button>
              );
            })}
          </div>
        </section>

        <div className="mt-6 flex flex-wrap gap-3">
          <button
            type="button"
            disabled={currentQuestion === 0}
            onClick={() => setCurrentQuestion((questionIndex) => questionIndex - 1)}
            className="rounded-xl border border-white/10 px-5 py-3 font-bold text-slate-200 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Previous
          </button>
          {!isLastQuestion && (
            <button
              type="button"
              disabled={answers[currentQuestion] === null}
              onClick={() => setCurrentQuestion((questionIndex) => questionIndex + 1)}
              className="rounded-xl bg-teal-300 px-5 py-3 font-black text-slate-950 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Next Question
            </button>
          )}
          {isLastQuestion && (
            <button
              type="button"
              disabled={!allAnswered || completed || submitting}
              onClick={submitQuiz}
              className="inline-flex items-center gap-2 rounded-xl bg-teal-300 px-5 py-3 font-black text-slate-950 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <CheckCircle2 size={20} />
              {completed ? "Level Completed" : submitting ? "Checking..." : "Submit Quiz"}
            </button>
          )}
          <button type="button" onClick={retryQuiz} className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-5 py-3 font-bold text-slate-200">
            <RotateCcw size={18} /> Retry
          </button>
        </div>

        {message && <p className="mt-5 rounded-xl border border-teal-300/30 bg-teal-300/10 p-4 text-teal-50">{message}</p>}
        {resultDetails && (
          <div className="mt-4 rounded-xl border border-amber-300/30 bg-amber-300/10 p-4 text-sm text-amber-50">
            Score: {resultDetails.score}/{resultDetails.total}. Review your answers and try again.
          </div>
        )}
      </article>
    </div>
  );
}
