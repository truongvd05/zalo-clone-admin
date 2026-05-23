function StatCard({ label, value, icon, delta, color = 'blue' }) {
  return (
    <div className="rounded-xl border bg-card p-5 flex-1">
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm text-muted-foreground">{label}</span>
        {icon && <span className={`text-${color}-500`}>{icon}</span>}
      </div>
      <div className="text-3xl font-medium">{value.toLocaleString('vi-VN')}</div>
      {delta && (
        <div className="text-xs text-emerald-600 mt-2 flex items-center gap-1">
          ↑ {delta}% so với hôm qua
        </div>
      )}
    </div>
  );
}

export default StatCard