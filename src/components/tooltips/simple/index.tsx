import React, { useState } from 'react';

interface TooltipProps {
    children: React.ReactNode;
    text: string;
}

const Tooltip: React.FC<TooltipProps> = ({ children, text }) => {
    const [isHovering, setIsHovering] = useState(false);

    return (
        <div className="relative flex items-center">
            <div
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
            >
                {children}
            </div>
            {isHovering && (
                <div className="absolute bottom-full mb-2 px-3 py-2 text-sm bg-white text-black rounded-lg shadow-md">
                    {text}
                </div>
            )}
        </div>
    );
};

export default Tooltip;