import { StickyNote } from "lucide-react";

const NotesSection = ({ notes }) => {
    if (!notes) {
        return null;
    }

    return (
        <section className="border-b border-slate-200 px-6 py-6">
            <div className="mb-5 flex items-center gap-2">
                <StickyNote
                    size={18}
                    className="text-[#00a968]"
                />

                <h2 className="text-sm font-bold uppercase tracking-wider text-[#010a1f]">
                    Notes
                </h2>
            </div>

            <div className="rounded-lg bg-slate-50 p-4">
                <p className="whitespace-pre-line text-sm leading-6 text-slate-700">
                    {notes}
                </p>
            </div>
        </section>
    );
};

export default NotesSection;