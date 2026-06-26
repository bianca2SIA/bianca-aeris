/**
 * AccordionItem — Reusable accordion FAQ item
 *
 * Props:
 *   question  {string}   Pertanyaan
 *   answer    {string}   Jawaban
 *   isOpen    {boolean}  Status terbuka/tertutup
 *   onToggle  {function} Callback toggle
 *   index     {number}   Nomor urut
 */
export default function AccordionItem({ question, answer, isOpen, onToggle, index }) {
  return (
    <div
      className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
        isOpen
          ? "border-[#4F7DF3]/30 bg-[#F8FBFF] shadow-sm"
          : "border-[#E5E7EB] bg-white hover:border-[#4F7DF3]/20 hover:bg-[#FAFCFF]"
      }`}
    >
      {/* Question button */}
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
        aria-expanded={isOpen}
      >
        {/* Number + question */}
        <div className="flex items-center gap-4 min-w-0">
          <span
            className={`text-[12px] font-black w-6 flex-shrink-0 transition-colors duration-300 ${
              isOpen ? "text-[#4F7DF3]" : "text-[#CBD5E1]"
            }`}
          >
            {String(index + 1).padStart(2, "0")}
          </span>
          <p
            className={`text-[15px] font-bold leading-snug transition-colors duration-200 ${
              isOpen ? "text-[#4F7DF3]" : "text-[#1D3557]"
            }`}
          >
            {question}
          </p>
        </div>

        {/* Toggle icon */}
        <div
          className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
            isOpen ? "bg-[#4F7DF3] rotate-45" : "bg-[#F1F5F9] rotate-0"
          }`}
        >
          <span
            className={`material-symbols-outlined text-[18px] transition-colors duration-300 ${
              isOpen ? "text-white" : "text-[#64748B]"
            }`}
          >
            add
          </span>
        </div>
      </button>

      {/* Answer — smooth height transition via max-height */}
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-96" : "max-h-0"
        }`}
      >
        <div className="px-6 pb-5 ml-10">
          <p className="text-[14px] text-[#64748B] leading-relaxed border-t border-[#E5E7EB] pt-4">
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
}
