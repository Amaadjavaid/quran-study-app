import { keywordClusters } from "@/data/keywordClusters";
import LanguageToggle from "@/components/LanguageToggle";

export default function KeywordClustersPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <div className="mb-8 flex items-center justify-between gap-4">
        <div>
          <p className="tag mb-3">Quran Study</p>
          <h1 className="text-4xl font-bold tracking-tight">Keyword Clusters</h1>
        </div>
        <LanguageToggle />
      </div>

      <div className="space-y-6">
        {keywordClusters.map((cluster) => (
          <div key={cluster.keyword} className="card p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-2xl font-bold capitalize">{cluster.keyword}</h2>
              <span className="tag">{cluster.focus}</span>
            </div>
            <p className="mb-4 text-slate-700">{cluster.explanation}</p>
            <div className="flex flex-wrap gap-2">
              {cluster.relatedWords.map((word) => (
                <span key={word} className="tag">{word}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
