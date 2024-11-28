import React, {  Dispatch, SetStateAction } from "react";

interface DeletePopupProps {
    deleteSelectedNotes: () => void;
    setDeletePopup: Dispatch<SetStateAction<boolean>>;
}
const DeletePopup: React.FunctionComponent<DeletePopupProps> = ({
    deleteSelectedNotes,
    setDeletePopup
}) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-4 rounded-lg shadow-lg">
                <h2 className="text-lg font-semibold mb-4">Confirm Delete</h2>
                <div className="flex justify-end space-x-3">
                    <button
                        onClick={() => setDeletePopup(false)}
                        className="px-4 py-2 text-sm text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={deleteSelectedNotes}
                        className="px-4 py-2 text-sm text-white bg-red-600 rounded-md hover:bg-red-700"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeletePopup;
