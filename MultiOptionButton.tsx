
import React from 'react';

interface MultiOptionButtonProps {
    label: string;
    isSelected: boolean;
    onClick: () => void;
}

const MultiOptionButton: React.FC<MultiOptionButtonProps> = ({ label, isSelected, onClick }) => {
    return (
        <button
            onClick={onClick}
            className={`flex items-center justify-between w-full text-left p-3 rounded-md border-2 transition-all duration-200
                ${isSelected 
                    ? 'bg-[#00C853] border-[#00C853] text-white shadow-md' 
                    : 'bg-transparent border-[#E10600] text-[#E10600] hover:bg-[#E10600] hover:text-white'
                }`}
        >
            <span>{label}</span>
            <div className={`w-5 h-5 rounded-sm border-2 flex items-center justify-center
                ${isSelected ? 'bg-[#00C853] border-[#00C853]' : 'border-[#E10600]'}`}
            >
                {isSelected && <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>}
            </div>
        </button>
    );
};

export default MultiOptionButton;