import { StickyNote } from "lucide-react";

const NotesSection = ({ notes }) => {
  if (!notes) {
    return null;
  }

  return (
    <section className="border-b border-[#dcdddf] px-6 py-6">
      <div className="mb-5 flex items-center gap-2">
        <StickyNote size={18} className="text-[#3d8086]" />
        <h2 className="text-sm font-bold uppercase tracking-wider text-[#1b496d]">
          Notes
        </h2>
      </div>

      <div className="rounded-lg bg-[#f2f2f2] p-4">
        <p className="whitespace-pre-line text-sm leading-6 text-[#1b3040]">
          {notes}
        </p>
      </div>
    </section>
  );
};

export default NotesSection;