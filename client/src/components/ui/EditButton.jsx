
import { Pencil } from "lucide-react";
import { useNavigate } from "react-router-dom";

const EditButton = ({ reportId }) => {
    const navigate = useNavigate();

    const handleEdit = () => {
        navigate(`/member-report/${reportId}/edit`);
    };

    return (
        <button
            type="button"
            onClick={handleEdit}
            className="mb-4 inline-flex cursor-pointer items-center gap-2 rounded-full bg-[#3d8086] px-3 py-1 text-sm text-white hover:bg-[#326d72]"
        >
            <Pencil size={16} />
            Edit
        </button>
    );
};

export default EditButton;
