export default function PageHeader({ title, breadcrumb, actions }) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div>
        <div className="flex items-center gap-2 text-sm text-stone-500 mb-2">
          <span>{breadcrumb}</span>
          <span className="material-symbols-outlined text-sm">
            chevron_right
          </span>
          <span className="text-[#C49C74]">{title}</span>
        </div>
        <h2 className="text-4xl font-semibold text-stone-900">{title}</h2>
      </div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        {actions}
      </div>
    </div>
  );
}
