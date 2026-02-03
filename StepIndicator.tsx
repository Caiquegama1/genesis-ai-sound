
import React from 'react';

interface StepIndicatorProps {
    current: number;
    total: number;
}

const StepIndicator: React.FC<StepIndicatorProps> = ({ current, total }) => {
    const progressPercentage = (current / total) * 100;

    return (
        <div className="w-full bg-[#444444] rounded-full h-1.5">
            <div
                className="bg-[#00C853] h-1.5 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progressPercentage}%` }}
            ></div>
        </div>
    );
};

export default StepIndicator;
