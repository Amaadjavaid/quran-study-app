"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { verses } from "@/data/quran";
import { useLanguage } from "@/components/LanguageProvider";
import LanguageToggle from "@/components/LanguageToggle";

export default function HomePage() {
  const [query, setQuery] = useState("");
  const { t } = useLanguage();

  const filteredVerses = useMemo(() => {
    const value = query.trim().toLowerCase();
    if (!value) return verses;

    return verses.filter((verse) => {
      return (
        verse.arabic.toLowerCase().includes(value) ||
        verse.english.toLowerCase().includes(value) ||
        verse.theme.toLowerCase().includes(value) ||
        verse.transliteration.toLowerCase().includes(value) ||
        verse.keywords.some((k) => k.toLowerCase().includes(value)) ||
        verse.topicTags.some((tag) => tag.toLowerCase().includes(value))
      );
    });
  }, [query]);

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="tag mb-3">{t("appName")}</p>
          <h1 className="text-4xl font-bold tracking-tight">{t("homeTitle")}</h1>
        </div>
        <LanguageToggle />
      </div>

      <div className="mb-8 flex flex-wrap gap-3">
        <Link href="/terms" className="rounded-xl bg-teal-700 px-4 py-2 text-sm font-semibold text-white">
          {t("openTerms")}
        </Link>
        <Link href="/compare" className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700">
          {t("compare")}
        </Link>
        <Link href="/search" className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700">
          {t("verseSearch")}
        </Link>
        <Link href="/research" className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700">
          {t("topicResearch")}
        </Link>
        <Link href="/research/summary?topic=mercy" className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700">
          {t("researchSummary")}
        </Link>
        <Link href="/topic-compare" className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700">
          Topic Comparison
        </Link>
        <Link href="/keyword-clusters" className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700">
          Keyword Clusters
        </Link>
      </div>

      <div className="mb-8 rounded-2xl border border-teal-200 bg-teal-50 p-5">
        <p className="text-sm font-semibold uppercase tracking-wide text-teal-800">{t("studyTools")}</p>
        <p className="text-slate-700">{t("exploreTerms")}</p>
      </div>

      <div className="w-full max-w-md">
        <label className="mb-2 block text-sm font-medium text-slate-700">{t("search")}</label>
        <form action="/search" method="get">
          <div className="flex gap-2">
            <input
              name="q"
              defaultValue={query}
              placeholder={t("searchPlaceholder")}
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-teal-500"
            />
            <button type="submit" className="rounded-xl bg-teal-700 px-4 py-3 font-semibold text-white">
              {t("search")}
            </button>
          </div>
        </form>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {filteredVerses.map((verse) => (
          <Link key={verse.id} href={`/verse/${verse.id}`} className="card block p-5 transition hover:-translate-y-1 hover:shadow-xl">
            <div className="mb-3 flex items-center justify-between">
              <span className="tag">Surah {verse.surah}</span>
              <span className="text-sm text-slate-500">Ayah {verse.ayah}</span>
            </div>

            <p className="arabic-text mb-4 text-2xl leading-loose">{verse.arabic}</p>
            <p className="mb-3 text-sm text-slate-600">{verse.transliteration}</p>
            <p className="text-base text-slate-700">{verse.english}</p>

            <div className="mt-4 flex flex-wrap gap-2">
              {verse.topicTags.slice(0, 3).map((tag) => (
                <span key={tag} className="tag">{tag}</span>
              ))}
            </div>
          </Link>
        ))}
      </div>

      {filteredVerses.length === 0 && (
        <div className="card mt-8 p-8 text-center">
          <p className="text-lg font-medium text-slate-700">{t("noResults")}</p>
        </div>
      )}
    </main>
  );
}
