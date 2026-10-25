import { keywordClusters } from "@/data/keywordClusters";
import { topicComparison } from "@/data/topicComparison";
import { topicLibrary } from "@/data/topicLibrary";

export default function ComparePage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <div className="mb-8">
        <p className="tag mb-3">Topic Comparison</p>
        <h1 className="text-4xl font-bold tracking-tight">Comparing key Quranic themes</h1>
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

      <div className="mt-12">
        <h2 className="mb-4 text-2xl font-bold">Topic library</h2>
        <div className="flex flex-wrap gap-2">
          {topicLibrary.map((topic) => (
            <span key={topic.slug} className="tag">{topic.label}</span>
          ))}
        </div>
      </div>

      <div className="mt-12">
        <h2 className="mb-4 text-2xl font-bold">Keyword clusters</h2>
        <div className="space-y-4">
          {keywordClusters.map((cluster) => (
            <div key={cluster.keyword} className="card p-4">
              <p className="mb-2 text-lg font-semibold capitalize">{cluster.keyword}</p>
              <div className="flex flex-wrap gap-2">
                {cluster.relatedWords.map((word) => (
                  <span key={word} className="tag">{word}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
