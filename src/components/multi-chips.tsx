"use client";

export function MultiChips<T extends string>({
  options,
  selected,
  onChange,
  label,
}: {
  options: readonly T[];
  selected: T[];
  onChange: (next: T[]) => void;
  label: string;
}) {
  function toggle(o: T) {
    onChange(selected.includes(o) ? selected.filter((s) => s !== o) : [...selected, o]);
  }
  return (
    <div>
      <label className="mb-2 block text-xs font-medium uppercase tracking-wide text-neutral-400">{label}</label>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => (
          <button
            key={o}
            type="button"
            onClick={() => toggle(o)}
            className={`rounded-lg border px-3 py-1.5 text-sm transition-colors ${
              selected.includes(o)
                ? "border-transparent bg-neutral-900 text-white"
                : "border-neutral-200 bg-white text-neutral-600 hover:border-neutral-300"
            }`}
          >
            {o}
          </button>
        ))}
      </div>
    </div>
  );
}

export function SingleSelect<T extends string>({
  options,
  value,
  onChange,
  label,
  placeholder = "Select…",
}: {
  options: readonly T[];
  value: T | "";
  onChange: (next: T) => void;
  label: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="mb-2 block text-xs font-medium uppercase tracking-wide text-neutral-400">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as T)}
        className="w-full rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm text-neutral-700 outline-none focus:border-neutral-400"
      >
        <option value="">{placeholder}</option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}
