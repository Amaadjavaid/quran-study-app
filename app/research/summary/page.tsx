"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { buildResearchSummary } from "@/data/researchSummary";
import LanguageToggle from "@/components/LanguageToggle";
import { useLanguage } from "@/components/LanguageProvider";

export default function ResearchSummaryPage() {
  const params = useSearchParams();
  const topic = params.get("topic") || "mercy";
  const { t } = useLanguage();
  const summary = buildResearchSummary(topic);

  const renderSection = (title: string, items: string[]) => {
    if (items.length === 0) return null;
    return (
      <section className="card p-5">
        <h3 className="mb-3 text-xl font-bold">{title}</h3>
        <ul className="space-y-2">
          {items.map((item, index) => (
            <li key={`${title}-${index}`} className="text-slate-700">- {item}</li>
          ))}
        </ul>
      </section>
    );
  };

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <div className="mb-8 flex items-center justify-between gap-4">
        <div>
          <p className="tag mb-3">Quran Study</p>
          <h1 className="text-4xl font-bold tracking-tight">{t("summaryPageTitle")}</h1>
        </div>
        <LanguageToggle />
      </div>

      <form action="/research/summary" method="get" className="mb-8">
        <div className="flex flex-col gap-3 md:flex-row">
          <input
            name="topic"
            defaultValue={topic}
            placeholder={t("researchPlaceholder")}
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 focus:border-teal-500"
          />
          <button type="submit" className="rounded-xl bg-teal-700 px-5 py-3 font-semibold text-white">
            Build Summary
          </button>
        </div>
      </form>

      <div className="mb-8 rounded-2xl border border-slate-200 bg-slate-50 p-6">
        <p className="mb-2 text-sm uppercase tracking-wide text-slate-500">{t("overview")}</p>
        <p className="text-slate-700">{summary.overview}</p>
      </div>

      <div className="mb-8 grid gap-6 lg:grid-cols-2">
        <section className="card p-5">
          <h3 className="mb-3 text-xl font-bold">{t("whyRuleExists")}</h3>
          <p className="text-slate-700">{summary.whyThisRuleExists}</p>
        </section>
        <section className="card p-5">
          <h3 className="mb-3 text-xl font-bold">{t("historicalContext")}</h3>
          <p className="text-slate-700">{summary.historicalContext}</p>
        </section>
      </div>

      <div className="mb-8">
        <h2 className="mb-4 text-2xl font-bold">{t("scholarNotes")}</h2>
        <div className="space-y-4">
          {summary.scholarNotes.length > 0 ? (
            summary.scholarNotes.map((note, index) => (
              <div key={`${note.author}-${index}`} className="card p-5">
                <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-slate-500">{note.author}</p>
                <p className="text-slate-700">{note.note}</p>
              </div>
            ))
          ) : (
            <div className="card p-5"><p className="text-slate-700">No scholar notes available.</p></div>
          )}
        </div>
      </div>

      <div className="mb-8">
        <h2 className="mb-4 text-2xl font-bold">{t("asbab")}</h2>
        <div className="space-y-4">
          {summary.asbab.length > 0 ? (
            summary.asbab.map((item, index) => (
              <div key={`${item.verseReference}-${index}`} className="card p-5">
                <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-slate-500">{item.verseReference}</p>
                <p className="text-slate-700">{item.summary}</p>
              </div>
            ))
          ) : (
            <div className="card p-5"><p className="text-slate-700">No historical context is available yet.</p></div>
          )}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {renderSection("Rules", summary.rules)}
        {renderSection("Instructions", summary.instructions)}
        {renderSection("Methods", summary.methods)}
        {renderSection("Prohibitions", summary.prohibitions)}
        {renderSection("Principles", summary.principles)}
        {renderSection("Warnings", summary.warnings)}
      </div>

      <div className="mt-8">
        <h2 className="mb-4 text-2xl font-bold">{t("relevantVerses")}</h2>
        <div className="space-y-4">
          {summary.relevantVerses.map((verse) => (
            <Link key={verse.id} href={`/verse/${verse.id}`} className="card block p-5 transition hover:-translate-y-1 hover:shadow-xl">
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
    </main>
  );
}
