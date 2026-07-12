import { useState } from "react";
import { Mail, CheckCircle2, Loader2, Download, ShieldCheck } from "lucide-react";

// Lead magnet email capture — "The 18-Month Aliyah Countdown" checklist.
// POSTs { name, email, source } to /api/subscribe. The checklist PDF doesn't
// exist yet, so the success state promises delivery by email (follow-up mode)
// rather than linking a file.

type SubmitStatus = "idle" | "loading" | "done" | "error";

interface LeadMagnetCaptureProps {
  source?: string;
}

const LeadMagnetCapture = ({ source = "homepage" }: LeadMagnetCaptureProps) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<SubmitStatus>("idle");

  const valid = name.trim().length > 1 && /.+@.+\..+/.test(email) && consent;

  async function submit() {
    setStatus("loading");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), email: email.trim(), source }),
      });
      if (!res.ok) throw new Error("bad status");
      setStatus("done");
    } catch {
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <div className="rounded-2xl border border-gold-500 bg-[#FBFAF7] p-8 text-center">
        <CheckCircle2 className="w-10 h-10 mx-auto mb-3 text-gold-500" />
        <h3 className="text-lg font-bold text-primary mb-2">You're on the list</h3>
        <p className="text-sm text-slate-600 max-w-sm mx-auto">
          The 18-Month Aliyah Countdown is on its way to your inbox. If it doesn't arrive within a few
          minutes, check your spam folder.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-sm md:grid md:grid-cols-5">
      {/* Left: pitch */}
      <div className="p-8 md:col-span-3 bg-primary">
        <p className="text-xs font-bold tracking-widest uppercase text-gold-500 mb-3">
          Free Planning Checklist
        </p>
        <h3 className="text-2xl font-bold text-white mb-3">The 18-Month Aliyah Countdown</h3>
        <p className="text-sm text-slate-200 leading-relaxed mb-5">
          The financial to-do list for the year and a half before a move — what typically gets handled
          at 18 months, 12 months, 6 months, and landing. The checklist families wish they'd had at the
          start.
        </p>
        <ul className="space-y-2">
          {[
            "Account & investment restructuring questions to examine early",
            "The benefit and healthcare decisions with real deadlines",
            "Document and timing steps people most often discover too late",
          ].map((line) => (
            <li key={line} className="flex gap-2 text-xs text-slate-300">
              <Download className="w-3.5 h-3.5 shrink-0 mt-0.5 text-gold-500" />
              {line}
            </li>
          ))}
        </ul>
      </div>

      {/* Right: form */}
      <div className="p-8 bg-white md:col-span-2 flex flex-col justify-center gap-3">
        <input
          className="w-full border border-slate-300 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
          placeholder="First name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="w-full border border-slate-300 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
          placeholder="Email address"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label className="flex items-start gap-2 text-xs text-slate-500 leading-relaxed cursor-pointer">
          <input
            type="checkbox"
            className="mt-0.5"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
          />
          Send me the checklist and occasional educational updates from Aliya Financial. Unsubscribe
          anytime.
        </label>
        <button
          onClick={submit}
          disabled={!valid || status === "loading"}
          className="btn-gold inline-flex items-center justify-center gap-2 text-sm font-semibold px-5 py-2.5 rounded-lg disabled:opacity-40 transition"
        >
          {status === "loading" ? <Loader2 className="w-4 h-4 animate-spin" /> : <Mail className="w-4 h-4" />}
          {status === "loading" ? "Sending…" : "Send me the checklist"}
        </button>
        {status === "error" && (
          <p className="text-xs text-red-600">Something went wrong — please try again.</p>
        )}
        <p className="flex items-start gap-1.5 text-[11px] text-slate-400 leading-relaxed">
          <ShieldCheck className="w-3.5 h-3.5 shrink-0 mt-0.5" />
          Educational material only — requesting it doesn't create an advisory relationship, and we
          never share your information.
        </p>
      </div>
    </div>
  );
};

export default LeadMagnetCapture;
