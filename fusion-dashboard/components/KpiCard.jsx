export function KpiCard({ icon: Icon, label, value }) {
  const usefulTone = label === 'Active Ventures' ? 'green' : label === 'In Testing' ? 'red' : 'neutral';
  const toneClasses = {
    neutral: 'border-zinc-200 bg-zinc-50 text-zinc-800',
    green: 'border-emerald-100 bg-emerald-50 text-emerald-700',
    red: 'border-red-100 bg-red-50 text-red-600',
  };
  const valueClasses = {
    neutral: 'text-zinc-950',
    green: 'text-emerald-700',
    red: 'text-red-600',
  };

  return (
    <article className="flex min-h-[126px] min-w-0 items-center gap-4 rounded-lg border border-slate-200 bg-white p-5 shadow-soft">
      <div className={`grid h-[58px] w-[58px] shrink-0 place-items-center rounded-full border ${toneClasses[usefulTone]}`}>
        <Icon className="h-7 w-7" strokeWidth={2.2} />
      </div>
      <div className="min-w-0">
        <p className="max-w-[9rem] text-[15px] font-semibold leading-5 text-slate-900">{label}</p>
        <p className={`mt-2 text-[36px] font-extrabold leading-none ${valueClasses[usefulTone]}`}>{value}</p>
      </div>
    </article>
  );
}
