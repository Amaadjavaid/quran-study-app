"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { searchVerses } from "@/data/search";
import LanguageToggle from "@/components/LanguageToggle";
import { useLanguage } from "@/components/LanguageProvider";

export default function SearchPage() {
  const params = useSearchParams();
  const query = params.get("q") || "";
  const { t } = useLanguage();
  const results = searchVerses(query);

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <div className="mb-8 flex items-center justify-between gap-4">
        <div>
          <p className="tag mb-3">Quran Study</p>
          <h1 className="text-4xl font-bold tracking-tight">{t("searchPageTitle")}</h1>
        </div>
        <LanguageToggle />
      </div>

      <form action="/search" method="get" className="mb-8">
        <div className="flex flex-col gap-3 md:flex-row">
          <input
            name="q"
            defaultValue={query}
            placeholder={t("searchPlaceholder")}
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 focus:border-teal-500"
          />
          <button type="submit" className="rounded-xl bg-teal-700 px-5 py-3 font-semibold text-white">
            {t("search")}
          </button>
        </div>
      </form>

      {!query ? (
        <div className="card p-8 text-center">
          <p className="text-slate-700">Enter a keyword or topic to find related verses.</p>
        </div>
      ) : results.all.length === 0 ? (
        <div className="card p-8 text-center">
          <p className="text-slate-700">{t("noMatch")}</p>
        </div>
      ) : (
        <div className="space-y-8">
          {results.grouped.map((group) => (
            <div key={group.label}>
              <h2 className="mb-4 text-2xl font-bold capitalize">{group.label}</h2>
              <div className="space-y-4">
                {group.items.map((verse) => (
                  <Link
                    key={verse.id}
                    href={`/verse/${verse.id}`}
                    className="card block p-5 transition hover:-translate-y-1 hover:shadow-xl"
                  >
                    <div className="mb-2 flex items-center justify-between">
                      <span className="tag">Surah {verse.surah}</span>
                      <span className="text-sm text-slate-500">Ayah {verse.ayah}</span>
                    </div>
                    <p className="arabic-text mb-3 text-3xl">{verse.arabic}</p>
                    <p className="mb-2 text-slate-600">{verse.transliteration}</p>
                    <p className="mb-2 text-slate-800">{verse.english}</p>
                    <div className="mb-2 flex flex-wrap gap-2">
                      {verse.topicTags.map((tag) => (
                        <span key={tag} className="tag">{tag}</span>
                      ))}
                    </div>
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
