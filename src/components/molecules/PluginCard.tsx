// src/components/molecules/PluginCard.tsx
import React, { useState } from 'react';
import Button from '../atoms/Button';
import Heading from '../atoms/Heading';
import AnimatedContainer from '../atoms/AnimatedContainer';
import SafeHtml from '../atoms/SafeHtml';
import PluginSettings from './PluginSettings'; // Import PluginSettings
import { Plugin, PluginState } from '../../types'; // Import types

interface PluginCardProps {
    plugin: Plugin;
    pluginState: PluginState | undefined; // Use the state object
    isCoreRequired: boolean;
    onToggle: (pluginName: string, enabled: boolean) => void; // Pass name and new state
    settingsValues: Record<string, any>; // Kept for passing down
    onSettingChange: (pluginName: string, settingName: string, value: any) => void;
}

/**
 * A card component for displaying plugin information and settings toggle.
 *
 * @param {Plugin} plugin - The plugin data object.
 * @param {PluginState | undefined} pluginState - The current state of the plugin.
 * @param {boolean} isCoreRequired - Whether the plugin is core.
 * @param {Function} onToggle - Callback when the enable/disable button is clicked.
 * @param {Record<string, any>} settingsValues - Current settings values for this plugin.
 * @param {Function} onSettingChange - Callback when a setting value changes.
 * @returns {JSX.Element} The plugin card component.
 */
const PluginCard: React.FC<PluginCardProps> = ({
    plugin,
    pluginState,
    isCoreRequired,
    onToggle,
    settingsValues,
    onSettingChange
}) => {
    const isEnabled = pluginState?.enabled ?? false;
    const [showSettings, setShowSettings] = useState(false); // State to control settings visibility

    const handleToggle = () => {
        if (!isCoreRequired) {
            onToggle(plugin.name, !isEnabled);
            if (isEnabled) { // If disabling, hide settings
                setShowSettings(false);
            }
        }
    };

    // Toggle settings visibility only if plugin is enabled and has settings
    const toggleSettingsVisibility = (e: React.MouseEvent) => {
        // Prevent toggle if clicking the main toggle button or within settings itself
        if (
            (e.target as HTMLElement).closest('.plugin-main-toggle-button') ||
            (e.target as HTMLElement).closest('.plugin-settings-area')
        ) {
            return;
        }
        if (isEnabled && plugin.settings && plugin.settings.length > 0) {
            setShowSettings(!showSettings);
        }
    };

    const cardClasses = `
        bg-[var(--bg1)] rounded-lg shadow-md p-4 mb-4 border transition-all duration-200
        ${isCoreRequired ? 'border-[rgba(var(--rgb-yellow),0.4)]' : 'border-[var(--surface0)]'}
        ${isEnabled ? 'border-l-4 border-l-[var(--accentGreen)]' : ''}
         ${isEnabled && plugin.settings && plugin.settings.length > 0 ? 'cursor-pointer hover:shadow-lg hover:border-[var(--surface1)]' : ''}
    `;

    return (
        <AnimatedContainer className={cardClasses} onClick={toggleSettingsVisibility}>
            <div className="flex justify-between items-start gap-4"> {/* Added gap */}
                {/* Plugin Info */}
                <div className="flex-grow">
                    <Heading level={3} className="mb-1">{plugin.name}</Heading>
                    <p className="text-xs text-[var(--grey1)] mb-2">
                        بواسطة: <span className="text-[var(--accentBlue)]">{plugin.author}</span>
                         {isCoreRequired && <span className="text-[var(--accentRed)] font-bold mr-2">(أساسي)</span>}
                    </p>
                    <SafeHtml html={plugin.description} className="text-sm text-[var(--fg1)] mb-3" />
                    {plugin.tags && plugin.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-2">
                            {plugin.tags.map((tag, index) => (
                                <span
                                    key={index}
                                    className="bg-[var(--bg2)] text-[var(--grey0)] text-xs px-1.5 py-0.5 rounded"
                                >
                                    #{tag}
                                </span>
                            ))}
                        </div>
                    )}
                </div>

                {/* Controls Area */}
                <div className="flex flex-col items-end flex-shrink-0 space-y-1">
                   {/* Main Enable/Disable Button */}
                   <div className="plugin-main-toggle-button">
                        <Button
                            variant={isEnabled ? 'primary' : 'secondary'}
                            onClick={handleToggle}
                            disabled={isCoreRequired}
                            className={`min-w-[80px] text-sm py-1 px-3 ${isCoreRequired ? '!bg-[var(--accentGreen)] !text-[var(--base)] cursor-not-allowed' : ''}`}
                        >
                            {isCoreRequired ? 'مفعل دائماً' : (isEnabled ? 'معطل' : 'مفعل')}
                        </Button>
                    </div>

                    {/* Settings Toggle Button */}
                    {isEnabled && plugin.settings && plugin.settings.length > 0 && (
                         <button
                            className="text-xs text-[var(--accentSky)] hover:underline mt-1 focus:outline-none"
                            onClick={(e) => { e.stopPropagation(); setShowSettings(!showSettings); }}
                            aria-expanded={showSettings}
                         >
                            {showSettings ? 'إخفاء الإعدادات' : 'عرض الإعدادات'}
                        </button>
                    )}
                </div>
            </div>

            {/* Settings Area */}
            {isEnabled && showSettings && plugin.settings && (
                <div className="plugin-settings-area mt-3 border-t border-[var(--surface0)] pt-3">
                     <PluginSettings
                        pluginName={plugin.name}
                        settings={plugin.settings}
                        currentSettings={settingsValues}
                        onChange={onSettingChange}
                    />
                </div>
            )}
        </AnimatedContainer>
    );
};


export default PluginCard;

