import { ArrowLeft } from "lucide-react";

const BackButton = () => {
    const handleBack = () => {
        window.history.back();
    };

    return (
        <button
            type="button"
            onClick={handleBack}
            className="mb-4 inline-flex cursor-pointer items-center gap-2 rounded-full bg-[#1b496dba] px-2 py-1 text-sm text-white"
        >
            <ArrowLeft size={16} />
            Back
        </button>
    );
};

export default BackButton;
