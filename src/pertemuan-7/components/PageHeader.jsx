export default function PageHeader({ title, breadcrumb, actions }) {
  return (
    <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">

      <div>

        <div className="flex items-center gap-2 text-sm text-[#6B8FD6] mb-3">

          <span>{breadcrumb}</span>

          <span className="material-symbols-outlined text-sm">
            chevron_right
          </span>

          <span>{title}</span>

        </div>

        <h2 className="text-4xl font-bold text-[#1E293B]">
          {title}
        </h2>

      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        {actions}
      </div>

    </div>
  );
}