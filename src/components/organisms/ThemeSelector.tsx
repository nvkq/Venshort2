// src/components/organisms/ThemeSelector.tsx
import React from 'react';
import { ThemeOptionData } from '../../types';
import Heading from '../atoms/Heading';

interface ThemeSelectorProps {
    themes: ThemeOptionData[];
    selectedThemeId: string | null;
    onThemeChange: (themeId: string | null) => void;
}

/**
 * Component for selecting a single theme from a list.
 *
 * @param {ThemeOptionData[]} themes - Array of available themes.
 * @param {string | null} selectedThemeId - The ID of the currently selected theme.
 * @param {Function} onThemeChange - Callback function when the theme selection changes.
 * @returns {JSX.Element} The theme selector component.
 */
const ThemeSelector: React.FC<ThemeSelectorProps> = ({ themes, selectedThemeId, onThemeChange }) => {

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const themeId = event.target.value;
        const isChecked = event.target.checked;

        if (isChecked) {
            onThemeChange(themeId); // Select this theme, deselect others implicitly
        } else if (selectedThemeId === themeId) {
            onThemeChange(null); // Deselect if the currently selected one is unchecked
        }
    };

    // Allow clicking the entire option div to toggle selection
    const handleOptionClick = (themeId: string) => {
        if (selectedThemeId === themeId) {
            onThemeChange(null); // Deselect if clicking the selected one
        } else {
            onThemeChange(themeId); // Select the clicked one
        }
    };

    return (
        <div className="mb-6 p-6 bg-[rgba(var(--rgb-sky),0.1)] border border-[rgba(var(--rgb-sky),0.3)] rounded-lg">
            <Heading level={4} className="mb-4 text-[var(--accentSky)]">اختيار ثيم (اختياري - حد أقصى واحد)</Heading>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {themes.map((theme) => {
                    const isChecked = selectedThemeId === theme.id;
                    const checkboxId = `theme-${theme.id}`;
                    return (
                        <div
                            key={theme.id}
                            className={`
                                theme-option flex items-center p-3 border rounded-md transition-all duration-200 cursor-pointer
                                bg-[var(--bg1)] hover:bg-[var(--bg2)]
                                ${isChecked ? 'border-[var(--accentSky)] ring-2 ring-[var(--accentSky)] ring-opacity-50' : 'border-[var(--surface1)]'}
                            `}
                            onClick={() => handleOptionClick(theme.id)}
                        >
                            <input
                                type="checkbox"
                                id={checkboxId}
                                value={theme.id}
                                checked={isChecked}
                                onChange={handleCheckboxChange}
                                className="h-4 w-4 rounded border-[var(--surface1)] text-[var(--accentSky)] focus:ring-[var(--accentSky)] accent-[var(--accentSky)] ml-3" // RTL margin
                                aria-labelledby={`${checkboxId}-label`}
                            />
                            <label htmlFor={checkboxId} id={`${checkboxId}-label`} className="flex-grow flex items-center justify-between cursor-pointer">
                                <div>
                                    <span className="font-medium text-[var(--fg0)]">{theme.name}</span>
                                    <span className="text-xs text-[var(--accentPeach)] mr-2">بواسطة {theme.author}</span>
                                </div>
                                {theme.previewUrl && (
                                    <a
                                        href={theme.previewUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-xs text-[var(--accentTeal)] hover:underline flex items-center gap-1"
                                        onClick={(e) => e.stopPropagation()} // Prevent option click when clicking link
                                        aria-label={`معاينة ثيم ${theme.name}`}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3">
                                          <path d="M12.232 4.232a2.5 2.5 0 013.536 3.536l-1.225 1.224a.75.75 0 001.061 1.06l1.224-1.224a4 4 0 00-5.656-5.656l-3 3a4 4 0 00.225 5.865.75.75 0 00.977-1.138 2.5 2.5 0 01-.142-3.665l3-3z"></path>
                                          <path d="M8.603 17.03a4 4 0 005.656-5.656l-1.225-1.224a.75.75 0 00-1.061-1.06l-1.224 1.224a2.5 2.5 0 01-3.536-3.536l3-3a2.5 2.5 0 013.536 3.536.75.75 0 001.138.977 4 4 0 00-5.865-.225l-3 3a4 4 0 005.656 5.656z"></path>
                                        </svg>
                                         معاينة
                                    </a>
                                )}
                            </label>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ThemeSelector;
