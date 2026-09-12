import { Clock } from "lucide-react";

const HoursBreakdown = ({ hours = [] }) => {
  if (!hours.length) {
    return null;
  }

  const totalHours = hours.reduce(
    (total, item) => total + Number(item.hours || 0),
    0
  );

  return (
    <section className="border-b border-[#dcdddf] px-6 py-6">
      <div className="mb-5 flex items-center gap-2">
        <Clock size={18} className="text-[#3d8086]" />
        <h2 className="text-sm font-bold uppercase tracking-wider text-[#1b496d]">
          Hours Breakdown
        </h2>
      </div>

      <div className="space-y-3">
        {hours.map((item, index) => (
          <div
            key={item._id || item.id || index}
            className="flex items-center justify-between border-b border-[#f2f2f2] pb-3 last:border-0 last:pb-0"
          >
            <span className="text-sm text-[#6b7280]">
              {item.taskType || item.type || item.category || "-"}
            </span>

            <span className="font-semibold text-[#1b3040]">
              {item.hours || 0}h
            </span>
          </div>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-[#dcdddf] pt-4">
        <span className="text-sm font-bold uppercase text-[#1b496d]">
          Total
        </span>

        <span className="text-lg font-bold text-[#3d8086]">
          {totalHours}h
        </span>
      </div>
    </section>
  );
};

export default HoursBreakdown;