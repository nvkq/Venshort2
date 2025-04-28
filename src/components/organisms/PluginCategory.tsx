import React from 'react';
import Heading from '../atoms/Heading';
import PluginCard from '../molecules/PluginCard';
import { Plugin, PluginState } from '../../types'; // Import types

type PluginCategoryProps = {
  categoryName: string;
  categoryDescription?: string; // Optional description
  plugins: Plugin[];
  enabledPlugins: { [key: string]: PluginState }; // Use PluginState map
  onTogglePlugin: (pluginName: string, enabled: boolean) => void; // Pass enabled state
  onSettingChange: (pluginName: string, settingName: string, value: any) => void; // Pass setting handler
};

/**
 * A component to display a category of plugins.
 *
 * @param {string} categoryName - The name of the category.
 * @param {string} [categoryDescription] - Optional description for the category.
 * @param {Plugin[]} plugins - The list of plugins in this category.
 * @param {{ [key: string]: PluginState }} enabledPlugins - State of enabled plugins and their settings.
 * @param {Function} onTogglePlugin - Function to toggle a plugin's enabled state.
 * @param {Function} onSettingChange - Function to handle changes in plugin settings.
 * @returns {JSX.Element} The plugin category component.
 */
const PluginCategory: React.FC<PluginCategoryProps> = ({
  categoryName,
  categoryDescription,
  plugins,
  enabledPlugins,
  onTogglePlugin,
  onSettingChange // Receive the handler
}) => {
  return (
    <section className="mb-10"> {/* Use section for semantics */}
      <Heading level={2} className="mb-2 border-b border-[var(--surface1)] pb-2 text-[var(--accentLavender)]">{categoryName}</Heading>
      {categoryDescription && <p className="text-sm text-[var(--fg1)] mb-5">{categoryDescription}</p>}
      <div className="space-y-4"> {/* Use space-y for consistent gap */}
        {plugins.map((plugin) => {
          const pluginState = enabledPlugins[plugin.name];
          const isCore = requiredPlugins.includes(plugin.name);
          return (
            <PluginCard
              key={plugin.name}
              plugin={plugin} // Pass the full plugin object
              pluginState={pluginState} // Pass the current state object
              isCoreRequired={isCore}
              onToggle={onTogglePlugin} // Pass the toggle handler
              settingsValues={pluginState?.settings ?? {}} // Pass current settings
              onSettingChange={onSettingChange} // Pass the setting change handler
            />
          );
        })}
      </div>
    </section>
  );
};

// Need to import requiredPlugins here as well or pass it as a prop
import { requiredPlugins } from '../../data/pluginsData';

export default PluginCategory;
