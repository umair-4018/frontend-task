import React from 'react';

const Loader = () => {
    return (
        <div className="flex items-center justify-center h-screen">
            <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-16 w-16">
                {/* Custom loader content */}
                <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-purple-500"></div>
            </div>
        </div>
    );
};

export default Loader;