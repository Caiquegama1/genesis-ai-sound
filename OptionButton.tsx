
import React from 'react';

interface OptionButtonProps {
    label: string;
    isSelected: boolean;
    onClick: () => void;
}

const OptionButton: React.FC<OptionButtonProps> = ({ label, isSelected, onClick }) => {
    return (
        <button
            onClick={onClick}
            className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 font-semibold
                ${isSelected 
                    ? 'bg-[#00C853] border-[#00C853] text-white shadow-lg' 
                    : 'bg-transparent border-[#E10600] text-[#E10600] hover:bg-[#E10600] hover:text-white'
                }`}
        >
            {label}
        </button>
    );
};

export default OptionButton;