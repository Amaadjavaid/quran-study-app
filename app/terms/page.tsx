import Link from "next/link";
import { terms } from "@/data/terms";

export default function TermsPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <div className="mb-8">
        <p className="tag mb-3">Quranic Terms</p>
        <h1 className="text-4xl font-bold tracking-tight">Concepts and meanings in classical understanding</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {terms.map((term) => (
          <Link href={`/term/${term.slug}`} key={term.slug} className="card block p-5 transition hover:-translate-y-1 hover:shadow-xl">
            <div className="mb-3">
              <p className="arabic-text text-3xl">{term.arabic}</p>
              <p className="mt-2 text-lg font-semibold">{term.transliteration}</p>
            </div>
            <p className="mb-2 text-sm text-slate-600">Root: <span className="font-semibold text-slate-800">{term.root}</span></p>
            <p className="mb-3 text-sm text-slate-700">{term.literalMeaning}</p>
            <div className="flex flex-wrap gap-2">
              {term.semanticMap.slice(0, 3).map((item) => (
                <span key={item} className="tag">{item}</span>
              ))}
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
