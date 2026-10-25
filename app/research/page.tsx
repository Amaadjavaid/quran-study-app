"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { findTopicMatches } from "@/data/researchEngine";
import LanguageToggle from "@/components/LanguageToggle";
import { useLanguage } from "@/components/LanguageProvider";

export default function ResearchPage() {
  const params = useSearchParams();
  const query = params.get("q") || "";
  const { t } = useLanguage();
  const results = findTopicMatches(query);

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <div className="mb-8 flex items-center justify-between gap-4">
        <div>
          <p className="tag mb-3">Quran Study</p>
          <h1 className="text-4xl font-bold tracking-tight">{t("researchPageTitle")}</h1>
        </div>
        <LanguageToggle />
      </div>

      <form action="/research" method="get" className="mb-8">
        <div className="flex flex-col gap-3 md:flex-row">
          <input
            name="q"
            defaultValue={query}
            placeholder={t("researchPlaceholder")}
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 focus:border-teal-500"
          />
          <button type="submit" className="rounded-xl bg-teal-700 px-5 py-3 font-semibold text-white">
            {t("search")}
          </button>
        </div>
      </form>

      {!query ? (
        <div className="card p-8 text-center">
          <p className="text-slate-700">Search a topic to gather related verses and main themes.</p>
        </div>
      ) : results.length === 0 ? (
        <div className="card p-8 text-center">
          <p className="text-slate-700">{t("noMatch")}</p>
        </div>
      ) : (
        <div className="space-y-8">
          {results.map((result) => (
            <div key={result.slug} className="card p-6">
              <div className="mb-4 flex flex-wrap items-center gap-3">
                <span className="tag">{result.label}</span>
                {result.categories.map((category) => (
                  <span key={category} className="tag">{category}</span>
                ))}
              </div>

              <p className="mb-4 text-slate-700">{result.description}</p>

              <div className="mb-5">
                <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-slate-500">Related keywords</p>
                <div className="flex flex-wrap gap-2">
                  {result.relatedKeywords.map((keyword) => (
                    <span key={keyword} className="tag">{keyword}</span>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                {result.matches.map((verse) => (
                  <Link
                    key={verse.id}
                    href={`/verse/${verse.id}`}
                    className="block rounded-2xl border border-slate-200 bg-slate-50 p-4 transition hover:border-teal-300"
                  >
                    <div className="mb-2 flex items-center justify-between">
                      <span className="tag">Surah {verse.surah}</span>
                      <span className="text-sm text-slate-500">Ayah {verse.ayah}</span>
                    </div>
                    <p className="arabic-text mb-2 text-3xl">{verse.arabic}</p>
                    <p className="mb-1 text-slate-600">{verse.transliteration}</p>
                    <p className="mb-2 text-slate-800">{verse.english}</p>
                    <p className="text-sm text-slate-600">{verse.theme}</p>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
