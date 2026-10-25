import Link from "next/link";
import { topicComparison } from "@/data/topicComparison";
import LanguageToggle from "@/components/LanguageToggle";

export default function TopicComparePage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <div className="mb-8 flex items-center justify-between gap-4">
        <div>
          <p className="tag mb-3">Quran Study</p>
          <h1 className="text-4xl font-bold tracking-tight">Topic Comparison</h1>
        </div>
        <LanguageToggle />
      </div>

      <div className="space-y-6">
        {topicComparison.map((item) => (
          <div key={`${item.left}-${item.right}`} className="card p-6">
            <div className="mb-4 flex flex-wrap items-center gap-3">
              <span className="tag">{item.left}</span>
              <span className="text-xl font-medium text-slate-500">vs</span>
              <span className="tag">{item.right}</span>
            </div>
            <p className="mb-2 text-sm uppercase tracking-wide text-slate-500">{item.focus}</p>
            <p className="mb-4 text-slate-700">{item.primaryDifference}</p>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <p className="mb-2 text-sm font-semibold text-slate-800">Similarities</p>
                <ul className="list-disc space-y-1 pl-5 text-slate-700">
                  {item.similarities.map((similarity) => (
                    <li key={similarity}>{similarity}</li>
                  ))}
                </ul>
              </div>

              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <p className="mb-2 text-sm font-semibold text-slate-800">Practical takeaway</p>
                <p className="text-slate-700">{item.practicalTakeaway}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
