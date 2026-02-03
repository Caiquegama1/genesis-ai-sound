
import React, { ReactNode } from 'react';

interface StepWrapperProps {
    title: string;
    children: ReactNode;
    stepKey: number | string;
}

const StepWrapper: React.FC<StepWrapperProps> = ({ title, children, stepKey }) => {
    return (
        <div key={stepKey} className="animate-fade-in">
            <h2 className="text-2xl font-bold text-center text-white mb-6">{title}</h2>
            {children}
        </div>
    );
};

export default StepWrapper;