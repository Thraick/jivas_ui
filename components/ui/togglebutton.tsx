import { Moon, Sun, ToggleLeft, ToggleLeftIcon } from 'lucide-react';
import React, { useState } from 'react';
// import { Moon, Sun } from 'react-feather'; // Replace 'react-feather' with the library you're using for Lucide icons

const ToggleButton = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
        // Add your dark mode toggle logic here, e.g., updating CSS classes or theme
    };

    return (
        <>
            <button
                className={`p-2 rounded-full ${isDarkMode ? 'bg-gray-500' : 'bg-gray-300'
                    }`}
                onClick={toggleDarkMode}
            >
                {isDarkMode ? (
                    // <ToggleLeft className="text-yellow-500" /> // Customize the color of the Sun icon
                    // <ToggleLeftIcon className="text-yellow-500" /> // Customize the color of the Sun icon
                    <Sun className="text-yellow-500" /> // Customize the color of the Sun icon
                ) : (
                    <Moon className="text-gray-600" /> // Customize the color of the Moon icon

                )}
            </button>
        </>
    );
};

export default ToggleButton;
