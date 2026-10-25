import Link from "next/link";
import { notFound } from "next/navigation";
import { terms } from "@/data/terms";
import TermAudioPlayer from "@/components/TermAudioPlayer";

export default function TermDetailPage({ params }: { params: { slug: string } }) {
  const term = terms.find((item) => item.slug === params.slug);

  if (!term) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <Link href="/terms" className="mb-6 inline-block text-sm font-semibold text-teal-700">
        ← Back to terms
      </Link>

      <div className="card p-6 md:p-8">
        <div className="mb-6">
          <p className="tag mb-3">Quranic Term</p>
          <p className="arabic-text text-5xl">{term.arabic}</p>
          <p className="mt-2 text-xl font-semibold">{term.transliteration}</p>
        </div>

        <div className="mb-8">
          <TermAudioPlayer
            termName={term.transliteration}
            arabic={term.arabic}
            description="This audio explains the term in a clear, scholarly way using classical Arabic meaning and context."
          />
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          <section>
            <h2 className="mb-4 text-2xl font-bold">Core meaning</h2>
            <div className="space-y-4">
              <div className="word-box">
                <p className="text-sm text-slate-500">Root</p>
                <p className="font-semibold text-slate-800">{term.root}</p>
              </div>
              <div className="word-box">
                <p className="text-sm text-slate-500">Literal meaning</p>
                <p className="font-semibold text-slate-800">{term.literalMeaning}</p>
              </div>
              <div className="word-box">
                <p className="text-sm text-slate-500">Classical meaning</p>
                <p className="text-slate-700">{term.classicalMeaning}</p>
              </div>
              <div className="word-box">
                <p className="text-sm text-slate-500">Historical context</p>
                <p className="text-slate-700">{term.historicalContext}</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold">Visual meaning map</h2>
            <div className="flex flex-wrap gap-2">
              {term.semanticMap.map((item) => (
                <span key={item} className="tag">{item}</span>
              ))}
            </div>
            <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">Semantic structure</p>
              <div className="space-y-3">
                {term.semanticMap.map((item, index) => (
                  <div key={item} className="flex items-center gap-3">
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-teal-700 text-xs font-bold text-white">
                      {index + 1}
                    </div>
                    <p className="text-slate-700">{item}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-6 space-y-3">
              <h3 className="text-lg font-bold">Quranic examples</h3>
              {term.quranicExamples.map((item) => (
                <div key={item} className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                  <p className="font-medium text-slate-800">{item}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          <section>
            <h2 className="mb-4 text-2xl font-bold">Tafsir notes</h2>
            <div className="space-y-3">
              {term.tafsirNotes.map((item, index) => (
                <div key={index} className="rounded-xl border border-slate-200 bg-white p-4">
                  <p className="text-slate-700">{item}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold">Authentic support</h2>
            <div className="space-y-3">
              {term.supportingHadith.map((item, index) => (
                <div key={index} className="rounded-xl border border-emerald-100 bg-emerald-50 p-4">
                  <p className="mb-1 text-sm font-semibold text-emerald-800">{item.reference}</p>
                  <p className="text-sm text-emerald-900">{item.summary}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="mt-10">
          <h2 className="mb-4 text-2xl font-bold">Rejected or weak interpretations</h2>
          <div className="space-y-3">
            {term.rejectedInterpretations.map((item, index) => (
              <div key={index} className="rounded-xl border border-red-200 bg-red-50 p-4">
                <p className="text-red-900">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
