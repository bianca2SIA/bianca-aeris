export default function GenericTable({ columns, data, renderRow }) {
  return (
    <table className="min-w-full divide-y divide-gray-200 overflow-hidden rounded-2xl">
      <thead className="bg-[#EAF4FF]">
        <tr>
          {columns.map((col, idx) => (
            <th
              key={idx}
              className="px-6 py-4 text-left text-[13px] font-semibold text-[#8F96A3]"
            >
              {col}
            </th>
          ))}
        </tr>
      </thead>

      <tbody className="bg-white divide-y divide-gray-100 text-sm text-gray-800">
        {data.map((item, index) => (
          <tr key={item.id || index} className="hover:bg-[#F8FBFF] transition">
            {renderRow(item, index)}
          </tr>
        ))}
      </tbody>
    </table>
  );
}