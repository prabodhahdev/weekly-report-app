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
        <section className="border-b border-slate-200 px-6 py-6">
            <div className="mb-5 flex items-center gap-2">
                <Clock
                    size={18}
                    className="text-[#00a968]"
                />

                <h2 className="text-sm font-bold uppercase tracking-wider text-[#010a1f]">
                    Hours Breakdown
                </h2>
            </div>

            <div className="space-y-3">
                {hours.map((item, index) => (
                    <div
                        key={item._id || item.id || index}
                        className="flex items-center justify-between border-b border-slate-100 pb-3 last:border-0 last:pb-0"
                    >
                        <span className="text-sm text-slate-600">
                            {item.taskType ||
                                item.type ||
                                item.category ||
                                "-"}
                        </span>

                        <span className="font-semibold text-[#010a1f]">
                            {item.hours || 0}h
                        </span>
                    </div>
                ))}
            </div>

            <div className="mt-4 flex items-center justify-between border-t border-slate-200 pt-4">
                <span className="text-sm font-bold uppercase text-[#010a1f]">
                    Total
                </span>

                <span className="text-lg font-bold text-[#00a968]">
                    {totalHours}h
                </span>
            </div>
        </section>
    );
};

export default HoursBreakdown;