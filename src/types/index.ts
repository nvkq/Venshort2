// src/types/index.ts

/**
 * Represents options for a 'select' type plugin setting.
 */
export interface PluginSettingOption {
  value: string;
  label: string;
}

/**
 * Defines the structure for a single setting within a plugin.
 */
export interface PluginSetting {
  type: 'checkbox' | 'text' | 'number' | 'color' | 'select';
  name: string;         // Internal name/key for the setting
  label: string;        // User-facing label for the setting
  defaultValue: string | number | boolean;
  description?: string; // Optional description for the setting
  options?: PluginSettingOption[]; // For 'select' type
  min?: number;         // For 'number' type
  max?: number;         // For 'number' type
  step?: number;        // For 'number' type
}

/**
 * Defines the structure for a single Vencord plugin.
 */
export interface Plugin {
  name: string;         // Unique identifier and display name
  description: string;
  author: string;
  category: string;     // Category key (e.g., "utility", "appearance")
  tags?: string[];      // Optional tags for searching/filtering
  settings?: PluginSetting[]; // Array of settings for this plugin
  required?: boolean;   // If the plugin is core and always enabled
  // Add other fields if necessary, e.g., version, requiredAPIs, dependencies
}

/**
 * Represents the state of a plugin (enabled/disabled and its current settings).
 */
export interface PluginState {
    enabled: boolean;
    settings: Record<string, any>; // Key: setting name, Value: current setting value
}

/**
 * Defines the structure for plugin category information.
 */
export interface CategoryInfo {
  name: string;         // Display name of the category (e.g., "الأدوات المساعدة")
  description: string;  // Description of the category
}

/**
 * Defines the structure for the collection of all categories.
 * Key is the category identifier (e.g., "utility"), value is CategoryInfo.
 */
export type Categories = Record<string, CategoryInfo>;

/**
 * Defines the structure for a theme option.
 */
export interface ThemeOptionData {
    id: string;         // Unique identifier for the theme (e.g., 'ClearVision')
    name: string;       // Display name of the theme
    author: string;     // Author of the theme
    previewUrl: string; // URL for theme preview
    downloadUrl: string;// URL for downloading the theme (important for config)
}


// --- Vencord Configuration Types ---
// These types define the structure of the generated JSON config file.
// They are based on the structure observed in the first solution and original JS.

export interface VencordPluginConfig {
  enabled: boolean;
  [key: string]: any; // Accommodate various dynamic setting types
}

export interface VencordCloudConfig {
    authenticated: boolean;
    url: string;
    settingsSync: boolean;
    settingsSyncVersion: number; // Consider using a Date number or specific version
}

export interface VencordNotificationConfig {
    timeout: number;
    position: "bottom-right" | "top-right" | "bottom-left" | "top-left"; // Example positions
    useNative: "always" | "never" | "not-focused";
    logLimit: number;
}

export interface VencordSettingsConfig {
    autoUpdate: boolean;
    autoUpdateNotification: boolean;
    useQuickCss: boolean;
    themeLinks: string[]; // Array of theme download URLs (usually just one)
    enabledThemes: string[]; // Vencord might primarily use themeLinks
    enableReactDevtools: boolean;
    frameless: boolean;
    transparent: boolean;
    winCtrlQ: boolean;
    disableMinSize: boolean;
    winNativeTitleBar: boolean;
    plugins: Record<string, VencordPluginConfig>; // Key: plugin name, Value: plugin config
}

export interface VencordConfig {
  settings: VencordSettingsConfig;
  notifications: VencordNotificationConfig;
  cloud: VencordCloudConfig;
  eagerPatches: boolean;
  quickCss: string;
}

