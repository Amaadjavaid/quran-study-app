import { topicLibrary } from "@/data/topicLibrary";

export default function TopicLibraryPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <div className="mb-8">
        <p className="tag mb-3">Quranic Topics</p>
        <h1 className="text-4xl font-bold tracking-tight">Topic library</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {topicLibrary.map((topic) => (
          <div key={topic.slug} className="card p-5">
            <p className="mb-2 text-xl font-bold">{topic.label}</p>
            <p className="text-slate-700">{topic.description}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {topic.relatedKeywords.map((keyword) => (
                <span key={keyword} className="tag">{keyword}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
