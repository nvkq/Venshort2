import React, { useState, useEffect, useMemo, useCallback } from 'react';
import Layout from '../templates/Layout';
import Heading from '../atoms/Heading';
import PluginCategory from '../organisms/PluginCategory';
import Button from '../atoms/Button';
import AnimatedContainer from '../atoms/AnimatedContainer';
import ConfigGenerator from '../organisms/ConfigGenerator'; // Import the new component
import ThemeSelector from '../organisms/ThemeSelector'; // Import the new component

// Import actual data and types
import { Plugin, PluginState, ThemeOptionData, Categories, CategoryInfo } from '../../types';
import { pluginsData, categories, requiredPlugins, themeOptions } from '../../data/pluginsData';
import { useDebounce } from '../../hooks/useDebounce'; // Assuming this hook exists or will be created

/**
 * The plugins page component.
 * Allows users to browse, search, manage plugins, select a theme, and generate config.
 *
 * @returns {JSX.Element} The plugins page component.
 */
const PluginsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const [selectedPlugins, setSelectedPlugins] = useState<Record<string, PluginState>>({});
  const [selectedThemeId, setSelectedThemeId] = useState<string | null>(null); // No default theme selected

  // Initialize plugin states on mount
  useEffect(() => {
    const initialPluginStates: Record<string, PluginState> = {};
    pluginsData.forEach(plugin => {
      const defaultSettings: Record<string, any> = {};
      plugin.settings?.forEach(setting => {
        defaultSettings[setting.name] = setting.defaultValue;
      });
      initialPluginStates[plugin.name] = { // Use plugin.name as the key
        enabled: requiredPlugins.includes(plugin.name), // Enable core plugins by default
        settings: defaultSettings,
      };
    });
    setSelectedPlugins(initialPluginStates);
  }, []); // Run only once on mount

  // --- Plugin Toggling and Setting Change Handlers ---
  const handlePluginToggle = useCallback((pluginName: string, enabled: boolean) => {
    setSelectedPlugins(prev => ({
      ...prev,
      [pluginName]: { ...(prev[pluginName] || { settings: {} }), enabled } // Preserve settings when toggling
    }));
  }, []);

  const handleSettingChange = useCallback((pluginName: string, settingName: string, value: any) => {
    setSelectedPlugins(prev => {
      // Ensure the plugin entry exists
      const currentPluginState = prev[pluginName] || { enabled: false, settings: {} };
      return {
        ...prev,
        [pluginName]: {
          ...currentPluginState,
          settings: {
            ...currentPluginState.settings,
            [settingName]: value,
          },
        },
      };
    });
  }, []);

  // --- Theme Selection Handler ---
  const handleThemeChange = useCallback((themeId: string | null) => {
    setSelectedThemeId(themeId);
  }, []);

  // --- Filtering Logic ---
  const filteredPlugins = useMemo(() => {
    const lowerCaseSearch = debouncedSearchTerm.toLowerCase().trim();
    if (!lowerCaseSearch) {
      return pluginsData;
    }
    return pluginsData.filter(plugin =>
      plugin.name.toLowerCase().includes(lowerCaseSearch) ||
      plugin.description.toLowerCase().includes(lowerCaseSearch) ||
      plugin.author?.toLowerCase().includes(lowerCaseSearch) ||
      plugin.category?.toLowerCase().includes(lowerCaseSearch) || // Search by category name too
      plugin.tags?.some(tag => tag.toLowerCase().includes(lowerCaseSearch))
    );
  }, [debouncedSearchTerm]);

  // Group filtered plugins by category
  const pluginsByCategory = useMemo(() => {
    const grouped: Record<string, Plugin[]> = {};
    filteredPlugins.forEach(plugin => {
      const categoryKey = plugin.category || 'misc'; // Use 'misc' as fallback key
      if (!grouped[categoryKey]) {
        grouped[categoryKey] = [];
      }
      grouped[categoryKey].push(plugin);
    });
    return grouped;
  }, [filteredPlugins]);


   // --- Bulk Selection Handlers ---
    const handleSelectAll = useCallback(() => {
        setSelectedPlugins(prev => {
            const newState = { ...prev };
            pluginsData.forEach(plugin => {
                // Use 'enabled' from PluginState type
                newState[plugin.name] = { ...(newState[plugin.name] || { settings: {} }), enabled: true };
            });
            return newState;
        });
    }, []);

    const handleSelectNone = useCallback(() => {
        setSelectedPlugins(prev => {
            const newState = { ...prev };
            pluginsData.forEach(plugin => {
                if (!requiredPlugins.includes(plugin.name)) {
                    // Use 'enabled' from PluginState type
                    newState[plugin.name] = { ...(newState[plugin.name] || { settings: {} }), enabled: false };
                } else {
                     newState[plugin.name] = { ...(newState[plugin.name] || { settings: {} }), enabled: true }; // Ensure core stay enabled
                }
            });
            return newState;
        });
        setSelectedThemeId(null); // Deselect theme as well
    }, []);

    const handleSelectSuggested = useCallback(() => {
        const suggestedPluginNames = [ /* ... Paste suggested list from previous solution ... */
             // Example list - replace with actual suggested plugins
             "FakeNitro",
             // "CallTimer", "ClearURLs", "FriendsSince", "GameActivityToggle",
             // "MessageLinkEmbeds", "PinDMs", "PreviewMessage", "ReadAllNotificationsButton",
             // "ReverseImageSearch", "SendTimestamps", "ServerInfo", "ShowConnections",
             // "Translate", "UserVoiceShow", "ValidReply", "ValidUser", "ViewIcons",
             // "VolumeBooster", "YoutubeAdblock", "YoutubeAdblock.desktop",
             // "BetterUploadButton", "CopyUserURLs", "BetterSessions", "EmoteCloner",
             // "BetterFolders", "BetterRoleDot", "FixImagesQuality", "NoTypingAnimation",
             // "AlwaysAnimate", "FavoriteEmojiFirst",
        ];
        const suggestedThemeId = 'ClearVision';

        setSelectedPlugins(prev => {
            const newState: Record<string, PluginState> = {};
            pluginsData.forEach(plugin => {
                const isCore = requiredPlugins.includes(plugin.name);
                const isSuggested = suggestedPluginNames.includes(plugin.name);
                const defaultSettings: Record<string, any> = {};
                plugin.settings?.forEach(setting => {
                    defaultSettings[setting.name] = setting.defaultValue;
                });
                newState[plugin.name] = {
                    enabled: isCore || isSuggested,
                    settings: defaultSettings // Reset to defaults when selecting suggested
                };
            });
            return newState;
        });
        setSelectedThemeId(suggestedThemeId);
    }, []);


  const hasVisiblePlugins = Object.keys(pluginsByCategory).length > 0;


  return (
    <Layout>
      <AnimatedContainer>
        <Heading level={1} className="mb-4">الإضافات ومولد التكوين</Heading>
        <p className="text-[var(--fg1)] mb-6">
          تصفح قائمة إضافات Vencord المصنفة، واختر ما يناسبك، ثم قم بإنشاء ملف التكوين الخاص بك بسهولة. يمكنك تعديل إعدادات بعض الإضافات مباشرة من هنا.
        </p>

        {/* Search Input */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="ابحث عن الإضافات بالاسم، الوصف، المطور، أو الفئة..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-3 border border-[var(--surface1)] rounded-lg bg-[var(--bg1)] text-[var(--fg0)] focus:outline-none focus:ring-2 focus:ring-[var(--accentPurple)] placeholder-[var(--grey1)]"
          />
        </div>

        {/* Required Plugins Notice */}
         <div className="mb-6 p-4 bg-[rgba(var(--rgb-yellow),0.1)] border border-[rgba(var(--rgb-yellow),0.3)] rounded-lg text-[var(--yellow)]">
             <h4 className="font-bold mb-2">الإضافات الأساسية (إجبارية)</h4>
             <p className="text-sm text-[var(--fg1)] mb-2">
                 الإضافات التالية ضرورية لعمل Vencord وسيتم تفعيلها دائمًا:
             </p>
             <div className="flex flex-wrap gap-2">
                {requiredPlugins.map(name => (
                     <span key={name} className="text-sm bg-[rgba(var(--rgb-yellow),0.15)] px-2 py-0.5 rounded">{name}</span>
                ))}
             </div>
         </div>


        {/* Theme Selection */}
        <ThemeSelector
            themes={themeOptions}
            selectedThemeId={selectedThemeId}
            onThemeChange={handleThemeChange}
         />


        {/* Selection Buttons */}
        <div className="my-6 flex flex-wrap gap-3">
            <Button onClick={handleSelectAll} variant="secondary" className="bg-[var(--accentPink)] text-[var(--base)] hover:bg-opacity-80">تحديد الكل</Button>
            <Button onClick={handleSelectSuggested} variant="secondary" className="bg-[var(--accentPink)] text-[var(--base)] hover:bg-opacity-80">تحديد المقترح</Button>
            <Button onClick={handleSelectNone} variant="secondary" className="bg-[var(--accentPink)] text-[var(--base)] hover:bg-opacity-80">إلغاء تحديد الكل</Button>
        </div>

        {/* Plugin List by Category */}
        <div className="space-y-8">
            {hasVisiblePlugins ? (
                Object.entries(pluginsByCategory).map(([categoryKey, pluginsInCategory]) => {
                     // Find category display info, fallback to key if not found
                     const categoryInfo = categories[categoryKey] || { name: categoryKey, description: '' };
                    return (
                        <PluginCategory
                            key={categoryKey}
                            categoryName={categoryInfo.name} // Use display name
                            categoryDescription={categoryInfo.description} // Pass description
                            plugins={pluginsInCategory}
                            enabledPlugins={selectedPlugins} // Pass the whole state object
                            onTogglePlugin={handlePluginToggle}
                            onSettingChange={handleSettingChange} // Pass setting change handler
                        />
                    );
                })
            ) : (
                <p className="text-[var(--grey0)] text-center py-10 italic">لم يتم العثور على إضافات تطابق بحثك.</p>
            )}
        </div>

        {/* Config Generator */}
        <ConfigGenerator
            allPlugins={pluginsData}
            selectedPluginStates={selectedPlugins}
            selectedThemeId={selectedThemeId}
            allThemes={themeOptions}
        />

      </AnimatedContainer>
    </Layout>
  );
};

// Assuming useDebounce hook exists in this path
// If not, it needs to be created or imported from a library
// Example basic implementation:
// import { useState, useEffect } from 'react';
// export function useDebounce<T>(value: T, delay: number): T {
//   const [debouncedValue, setDebouncedValue] = useState<T>(value);
//   useEffect(() => {
//     const handler = setTimeout(() => {
//       setDebouncedValue(value);
//     }, delay);
//     return () => {
//       clearTimeout(handler);
//     };
//   }, [value, delay]);
//   return debouncedValue;
// }

export default PluginsPage;

