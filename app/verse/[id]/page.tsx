import Link from "next/link";
import { notFound } from "next/navigation";
import { verses } from "@/data/quran";

export default function VerseDetailPage({ params }: { params: { id: string } }) {
  const verse = verses.find((item) => item.id === Number(params.id));

  if (!verse) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <Link href="/" className="mb-6 inline-block text-sm font-semibold text-teal-700">
        ← Back to verses
      </Link>

      <div className="card p-6 md:p-8">
        <div className="mb-4 flex flex-wrap items-center gap-3">
          <span className="tag">Surah {verse.surah}</span>
          <span className="tag">Ayah {verse.ayah}</span>
        </div>

        <p className="arabic-text mb-6 text-4xl leading-loose">{verse.arabic}</p>
        <p className="mb-2 text-lg text-slate-800">{verse.transliteration}</p>
        <p className="mb-6 text-xl text-slate-700">{verse.english}</p>

        <div className="mb-8 rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <p className="mb-1 text-sm font-semibold uppercase tracking-wide text-slate-600">Theme</p>
          <p className="text-slate-700">{verse.theme}</p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          <section>
            <h2 className="mb-4 text-2xl font-bold">Word-by-word meaning</h2>
            <div className="space-y-4">
              {verse.words.length > 0 ? (
                verse.words.map((word, index) => (
                  <div key={`${word.word}-${index}`} className="word-box">
                    <p className="arabic-text mb-2 text-2xl">{word.word}</p>
                    <p className="mb-1 text-sm text-slate-500">Root: <span className="font-semibold text-slate-700">{word.root}</span></p>
                    <p className="mb-1 text-sm">Meaning: <span className="font-semibold text-slate-800">{word.meaning}</span></p>
                    <p className="text-sm">Grammar: <span className="font-semibold text-slate-800">{word.grammar}</span></p>
                  </div>
                ))
              ) : (
                <div className="word-box"><p className="text-slate-700">Word-by-word detail is not yet expanded for this verse.</p></div>
              )}
            </div>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold">Tafsir & references</h2>
            <div className="space-y-4">
              {verse.tafsir.map((note, index) => (
                <div key={index} className="rounded-xl border border-slate-200 bg-white p-4">
                  <p className="text-slate-700">{note}</p>
                </div>
              ))}

              <div className="mt-8">
                <h3 className="mb-3 text-xl font-bold">Authentic hadith references</h3>
                <div className="space-y-3">
                  {verse.hadith.length > 0 ? (
                    verse.hadith.map((item, index) => (
                      <div key={`${item.reference}-${index}`} className="rounded-xl border border-emerald-100 bg-emerald-50 p-4">
                        <p className="mb-1 text-sm font-semibold text-emerald-800">{item.reference}</p>
                        <p className="text-sm text-emerald-900">{item.summary}</p>
                      </div>
                    ))
                  ) : (
                    <div className="rounded-xl border border-slate-200 bg-white p-4">
                      <p className="text-slate-700">No hadith reference has been assigned to this verse yet.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
