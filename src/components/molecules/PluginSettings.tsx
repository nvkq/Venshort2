// src/components/molecules/PluginSettings.tsx
import React from 'react';
import { PluginSetting as SettingType } from '../../types';

interface PluginSettingsProps {
    pluginName: string;
    settings: SettingType[];
    currentSettings: Record<string, any>; // Current values for this plugin's settings
    onChange: (pluginName: string, settingName: string, value: any) => void;
}

/**
 * Renders the settings form for a single plugin.
 *
 * @param {string} pluginName - The name/ID of the plugin.
 * @param {SettingType[]} settings - The array of setting definitions for the plugin.
 * @param {Record<string, any>} currentSettings - The current values of the settings.
 * @param {Function} onChange - Callback function when a setting value changes.
 * @returns {JSX.Element} The settings form component.
 */
const PluginSettings: React.FC<PluginSettingsProps> = ({
    pluginName,
    settings,
    currentSettings,
    onChange
}) => {

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name: settingName, type } = event.target;
        let value: string | number | boolean;

        if (type === 'checkbox') {
            value = (event.target as HTMLInputElement).checked;
        } else if (type === 'number') {
            value = parseFloat((event.target as HTMLInputElement).value);
            // Handle potential NaN if input is cleared or invalid
            if (isNaN(value)) {
                const settingDefinition = settings.find(s => s.name === settingName);
                value = typeof settingDefinition?.defaultValue === 'number' ? settingDefinition.defaultValue : 0;
            }
        } else if (type === 'color') {
             // Keep the '#' for the input element's value state
             value = (event.target as HTMLInputElement).value;
        } else {
            value = event.target.value;
        }
        onChange(pluginName, settingName, value);
    };

    // Helper to get current value for an input, falling back to default
    const getSettingValue = (setting: SettingType) => {
        const currentValue = currentSettings[setting.name];
        // For color type, ensure value starts with # if it doesn't
        if (setting.type === 'color' && currentValue !== undefined && !String(currentValue).startsWith('#')) {
           return `#${currentValue}`;
        }
         if (setting.type === 'color' && currentValue === undefined && !String(setting.defaultValue).startsWith('#')) {
             return `#${setting.defaultValue}`;
         }

        return currentValue !== undefined ? currentValue : setting.defaultValue;
    };

    return (
        <div className="mt-4 p-4 bg-[var(--bg0)] border border-[var(--surface0)] rounded-md space-y-4">
            <h4 className="text-md font-medium text-[var(--accentLavender)] mb-3 border-b border-[var(--surface0)] pb-2">
                إعدادات الإضافة
            </h4>
            {settings.map((setting) => {
                 const inputId = `${pluginName}-${setting.name}`; // Simpler ID
                 const currentValue = getSettingValue(setting);

                return (
                    <div key={setting.name} className="plugin-setting flex items-center justify-between gap-4">
                        <label htmlFor={inputId} className="text-sm text-[var(--fg1)] flex-shrink-0 max-w-[150px]">
                            {setting.label}
                        </label>

                        <div className="flex-grow">
                            {setting.type === 'checkbox' && (
                                <input
                                    type="checkbox"
                                    id={inputId}
                                    name={setting.name}
                                    checked={!!currentValue} // Ensure boolean
                                    onChange={handleInputChange}
                                    className="h-4 w-4 rounded border-[var(--surface1)] text-[var(--accentPurple)] focus:ring-[var(--accentPurple)] accent-[var(--accentPurple)]"
                                />
                            )}
                            {setting.type === 'text' && (
                                <input
                                    type="text"
                                    id={inputId}
                                    name={setting.name}
                                    value={String(currentValue)} // Ensure string
                                    onChange={handleInputChange}
                                    className="w-full p-1 border border-[var(--surface1)] rounded-md bg-[var(--base)] text-[var(--fg0)] text-sm focus:outline-none focus:ring-1 focus:ring-[var(--accentBlue)]"
                                />
                            )}
                            {setting.type === 'number' && (
                                <input
                                    type="number"
                                    id={inputId}
                                    name={setting.name}
                                    value={Number(currentValue)} // Ensure number
                                    min={setting.min}
                                    max={setting.max}
                                    step={setting.step}
                                    onChange={handleInputChange}
                                     className="w-full p-1 border border-[var(--surface1)] rounded-md bg-[var(--base)] text-[var(--fg0)] text-sm focus:outline-none focus:ring-1 focus:ring-[var(--accentBlue)]"
                                />
                            )}
                            {setting.type === 'color' && (
                                <input
                                    type="color"
                                    id={inputId}
                                    name={setting.name}
                                    value={String(currentValue)} // Value should have '#'
                                    onChange={handleInputChange}
                                    className="p-0.5 h-7 w-10 border border-[var(--surface1)] rounded-md cursor-pointer bg-[var(--base)]"
                                />
                            )}
                            {setting.type === 'select' && (
                                <select
                                    id={inputId}
                                    name={setting.name}
                                    value={String(currentValue)} // Ensure string
                                    onChange={handleInputChange}
                                    className="w-full p-1 border border-[var(--surface1)] rounded-md bg-[var(--base)] text-[var(--fg0)] text-sm focus:outline-none focus:ring-1 focus:ring-[var(--accentBlue)]"
                                >
                                    {setting.options?.map((opt) => (
                                        <option key={opt.value} value={opt.value}>
                                            {opt.label}
                                        </option>
                                    ))}
                                </select>
                            )}
                           {setting.description && (
                               <p className="text-xs text-[var(--grey1)] mt-1">{setting.description}</p>
                           )}
                        </div>
                    </div>
                );
             })}
        </div>
    );
};

export default PluginSettings;

