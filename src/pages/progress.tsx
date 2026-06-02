import { useEffect, useMemo, useRef } from "react";
import * as d3 from "d3";
import { Flame, Star, Trophy } from "lucide-react";
import {
  useAllBadges,
  useProgress,
  useSubjects,
  totalActivitiesForSubject,
  useLevel,
  useTotalActivitiesForSubject,
} from "@/lib/brainy-hooks";
import { DAILY_CHALLENGE_ID, type SubjectId } from "@/lib/brainy-data";
import { BadgePill } from "@/components/brainy/BadgePill";
import { Shimmer } from "@/components/brainy/Shimmer";
import { cn } from "@/lib/utils";

interface ChartDatum {
  subjectId: SubjectId;
  name: string;
  completed: number;
  total: number;
  color: string;
  emoji: string;
}

function useChartData(): ChartDatum[] {
  const level = useLevel();
  const { data: subjects } = useSubjects();
  const { data: progress } = useProgress();

  return useMemo(() => {
    if (!subjects) return [];
    const completed: Record<SubjectId, Set<string>> = {
      math: new Set(), science: new Set(), history: new Set(), geography: new Set(), reading: new Set(), states: new Set(), presidents: new Set(), language: new Set(), sel: new Set(),
    };
    progress?.results.forEach((r) => { if (r.activityId !== DAILY_CHALLENGE_ID) completed[r.subjectId].add(r.activityId); });
    return subjects.map((s) => ({
      subjectId: s.id,
      name: s.name,
      completed: completed[s.id].size,
      total: totalActivitiesForSubject(s.id),
      color: s.chartVar,
      emoji: s.emoji,
    }));
  }, [subjects, progress, level]);
}

function ProgressChart({ data }: { data: ChartDatum[] }) {
  const ref = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (!ref.current || data.length === 0) return;
    const svg = d3.select(ref.current);
    svg.selectAll("*").remove();

    const width = ref.current.clientWidth || 600;
    const height = 240;
    const margin = { top: 20, right: 16, bottom: 36, left: 36 };

    const x = d3
      .scaleBand<string>()
      .domain(data.map((d) => d.name))
      .range([margin.left, width - margin.right])
      .padding(0.25);

    const yMax = Math.max(1, d3.max(data, (d) => d.total) ?? 1);
    const y = d3
      .scaleLinear()
      .domain([0, yMax])
      .nice()
      .range([height - margin.bottom, margin.top]);

    svg
      .attr("viewBox", `0 0 ${width} ${height}`)
      .attr("preserveAspectRatio", "xMidYMid meet");

    // y axis grid
    const yTicks = y.ticks(4);
    svg
      .append("g")
      .selectAll("line")
      .data(yTicks)
      .join("line")
      .attr("x1", margin.left)
      .attr("x2", width - margin.right)
      .attr("y1", (d) => y(d))
      .attr("y2", (d) => y(d))
      .attr("stroke", "currentColor")
      .attr("opacity", 0.08);

    // background bars (total)
    svg
      .append("g")
      .selectAll("rect.bg")
      .data(data)
      .join("rect")
      .attr("class", "bg")
      .attr("x", (d) => x(d.name)!)
      .attr("y", (d) => y(d.total))
      .attr("width", x.bandwidth())
      .attr("height", (d) => y(0) - y(d.total))
      .attr("rx", 8)
      .attr("fill", "currentColor")
      .attr("opacity", 0.08);

    // foreground bars (completed)
    const bars = svg
      .append("g")
      .selectAll("rect.fg")
      .data(data)
      .join("rect")
      .attr("class", "fg")
      .attr("x", (d) => x(d.name)!)
      .attr("y", () => y(0))
      .attr("width", x.bandwidth())
      .attr("height", 0)
      .attr("rx", 8)
      .attr("fill", (d) => d.color);

    bars
      .transition()
      .duration(700)
      .ease(d3.easeCubicOut)
      .attr("y", (d) => y(d.completed))
      .attr("height", (d) => y(0) - y(d.completed));

    // labels above bars
    svg
      .append("g")
      .selectAll("text.value")
      .data(data)
      .join("text")
      .attr("class", "value")
      .attr("x", (d) => (x(d.name) ?? 0) + x.bandwidth() / 2)
      .attr("y", (d) => y(d.completed) - 6)
      .attr("text-anchor", "middle")
      .attr("font-size", 12)
      .attr("font-weight", 700)
      .attr("fill", "currentColor")
      .text((d) => `${d.completed}/${d.total}`);

    // x axis labels
    svg
      .append("g")
      .selectAll("text.label")
      .data(data)
      .join("text")
      .attr("class", "label")
      .attr("x", (d) => (x(d.name) ?? 0) + x.bandwidth() / 2)
      .attr("y", height - margin.bottom + 18)
      .attr("text-anchor", "middle")
      .attr("font-size", 12)
      .attr("font-weight", 600)
      .attr("fill", "currentColor")
      .text((d) => `${d.emoji} ${d.name}`);

    // y axis ticks text
    svg
      .append("g")
      .selectAll("text.ytick")
      .data(yTicks)
      .join("text")
      .attr("class", "ytick")
      .attr("x", margin.left - 6)
      .attr("y", (d) => y(d) + 4)
      .attr("text-anchor", "end")
      .attr("font-size", 10)
      .attr("opacity", 0.6)
      .attr("fill", "currentColor")
      .text((d) => d.toString());
  }, [data]);

  return <svg ref={ref} className="w-full text-foreground" role="img" aria-label="Activities completed by subject" />;
}

export default function ProgressPage() {
  useLevel(); // subscribe to level changes
  const { data: progress } = useProgress();
  const { data: subjects } = useSubjects();
  const { data: badges } = useAllBadges();
  const data = useChartData();

  const totalStars = progress?.totalStars ?? 0;
  const streakDays = progress?.streakDays ?? 0;
  const completedTotal = progress?.results.length ?? 0;
  const earnedSet = new Set(progress?.earnedBadgeIds ?? []);

  return (
    <div className="space-y-6">
      <header className="rounded-3xl border-2 border-white/60 bg-gradient-to-br from-violet-200 via-fuchsia-200 to-amber-200 shadow-md p-6 md:p-8">
        <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight">My Progress</h1>
        <p className="text-sm md:text-base text-foreground/70 mt-1">
          Look how much you’ve learned! Keep practicing to grow your streak.
        </p>
        <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-3">
          <StatCard icon={<Star className="size-5 text-amber-500 fill-amber-400" />} label="Total stars" value={totalStars} tone="amber" />
          <StatCard icon={<Flame className="size-5 text-orange-500" />} label="Day streak" value={streakDays} tone="orange" />
          <StatCard icon={<Trophy className="size-5 text-violet-500" />} label="Activities done" value={completedTotal} tone="violet" />
        </div>
      </header>

      <section className="rounded-3xl border-2 border-white/60 bg-white/80 backdrop-blur shadow-md p-5 md:p-6">
        <h2 className="text-lg md:text-xl font-extrabold mb-3">Activities completed by subject</h2>
        {!subjects || !progress ? (
          <Shimmer className="h-60 w-full" />
        ) : (
          <ProgressChart data={data} />
        )}
      </section>

      <section className="rounded-3xl border-2 border-white/60 bg-white/80 backdrop-blur shadow-md p-5 md:p-6">
        <h2 className="text-lg md:text-xl font-extrabold mb-3">Subject progress</h2>
        {!subjects ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {Array.from({ length: 4 }).map((_, i) => <Shimmer key={i} className="h-16" />)}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {subjects.map((s) => {
              const total = totalActivitiesForSubject(s.id);
              const completed = (progress?.results ?? []).filter((r) => r.subjectId === s.id && r.activityId !== DAILY_CHALLENGE_ID).length;
              const stars = (progress?.results ?? [])
                .filter((r) => r.subjectId === s.id && r.activityId !== DAILY_CHALLENGE_ID)
                .reduce((acc, r) => acc + r.starsEarned, 0);
              const pct = total === 0 ? 0 : Math.round((completed / total) * 100);
              return (
                <div key={s.id} className="rounded-2xl border-2 border-white/60 bg-white p-4 shadow-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl" aria-hidden>{s.emoji}</span>
                    <div className="font-bold flex-1">{s.name}</div>
                    <span className="inline-flex items-center gap-1 text-amber-700 text-sm font-bold">
                      <Star className="size-3.5 fill-amber-400 text-amber-500" />
                      {stars}
                    </span>
                  </div>
                  <div className="text-xs text-muted-foreground mb-1">
                    {completed} of {total} activities • {pct}%
                  </div>
                  <div className="h-3 rounded-full bg-muted overflow-hidden">
                    <div
                      className="h-full rounded-full transition-[width] duration-700"
                      style={{ width: `${pct}%`, backgroundColor: s.chartVar }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      <section className="rounded-3xl border-2 border-white/60 bg-white/80 backdrop-blur shadow-md p-5 md:p-6">
        <h2 className="text-lg md:text-xl font-extrabold mb-3">Badge gallery</h2>
        {!badges ? (
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
            {Array.from({ length: 9 }).map((_, i) => <Shimmer key={i} className="h-24" />)}
          </div>
        ) : (
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
            {badges.map((b) => (
              <BadgePill key={b.id} badge={b} earned={earnedSet.has(b.id)} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
  tone,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
  tone: "amber" | "orange" | "violet";
}) {
  const toneClass: Record<typeof tone, string> = {
    amber: "bg-amber-50 ring-amber-200",
    orange: "bg-orange-50 ring-orange-200",
    violet: "bg-violet-50 ring-violet-200",
  };
  return (
    <div className={cn("rounded-2xl ring-1 p-4 flex items-center gap-3 shadow-sm", toneClass[tone])}>
      <div className="size-10 rounded-full bg-white inline-flex items-center justify-center shadow">
        {icon}
      </div>
      <div>
        <div className="text-xs font-bold uppercase tracking-wide text-muted-foreground">{label}</div>
        <div className="text-2xl font-extrabold">{value}</div>
      </div>
    </div>
  );
}
