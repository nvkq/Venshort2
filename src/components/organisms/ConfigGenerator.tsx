// src/components/organisms/ConfigGenerator.tsx
import React, { useState, useCallback } from 'react';
import Button from '../atoms/Button';
import Heading from '../atoms/Heading'; // Added missing import
import { VencordConfig, Plugin, Categories, ThemeOptionData, PluginState } from '../../types';
import { requiredPlugins as corePluginsList } from '../../data/pluginsData'; // Import required plugins list

interface ConfigGeneratorProps {
    allPlugins: Plugin[];
    selectedPluginStates: Record<string, PluginState>; // Changed name for clarity
    selectedThemeId: string | null;
    allThemes: ThemeOptionData[];
}

/**
 * Component responsible for generating, displaying, and exporting the Vencord config.
 *
 * @param {Plugin[]} allPlugins - Array of all available plugin definitions.
 * @param {Record<string, PluginState>} selectedPluginStates - The current state (enabled/settings) of all plugins.
 * @param {string | null} selectedThemeId - The ID of the currently selected theme.
 * @param {ThemeOptionData[]} allThemes - Array of all available theme definitions.
 * @returns {JSX.Element} The configuration generator component.
 */
const ConfigGenerator: React.FC<ConfigGeneratorProps> = ({
    allPlugins,
    selectedPluginStates,
    selectedThemeId,
    allThemes
}) => {
    const [generatedConfigJson, setGeneratedConfigJson] = useState<string>('');
    const [isConfigGenerated, setIsConfigGenerated] = useState<boolean>(false);
    const [copyButtonText, setCopyButtonText] = useState<string>('نسخ التكوين');

    // --- Function to build the base Vencord config structure ---
    const buildBaseConfig = useCallback((): VencordConfig => {
        const settingsPlugin = allPlugins.find(p => p.name === 'Settings');
        const defaultSettingsLocation = settingsPlugin?.settings?.find(s => s.name === 'settingsLocation')?.defaultValue ?? 'aboveNitro';

        const base: VencordConfig = {
            settings: {
                autoUpdate: true,
                autoUpdateNotification: true,
                useQuickCss: true,
                themeLinks: [],
                enabledThemes: [],
                enableReactDevtools: false,
                frameless: false,
                transparent: false,
                winCtrlQ: false,
                disableMinSize: false,
                winNativeTitleBar: false,
                plugins: {}
            },
            notifications: {
                timeout: 5000,
                position: "bottom-right",
                useNative: "not-focused",
                logLimit: 50
            },
            cloud: {
                authenticated: false,
                url: "https://api.vencord.dev/",
                settingsSync: false,
                settingsSyncVersion: Date.now() // Use timestamp
            },
            eagerPatches: false,
            quickCss: ""
        };

        // Populate default plugin structures
        allPlugins.forEach(plugin => {
            const isCore = corePluginsList.includes(plugin.name);
            const pluginConfig: Record<string, any> = { enabled: isCore };

            plugin.settings?.forEach(setting => {
                // Ensure correct default value handling
                pluginConfig[setting.name] = setting.defaultValue;
                // Special case for Settings location
                if(plugin.name === "Settings" && setting.name === "settingsLocation") {
                    pluginConfig[setting.name] = defaultSettingsLocation;
                }
            });
            base.settings.plugins[plugin.name] = pluginConfig;
        });

        return base;
    }, [allPlugins]);

    // --- Generate Config Logic ---
    const handleGenerateConfig = useCallback(() => {
        const config = buildBaseConfig();

        // Apply user selections and settings
        Object.entries(selectedPluginStates).forEach(([pluginName, state]) => {
            if (config.settings.plugins[pluginName]) {
                const isCore = corePluginsList.includes(pluginName);
                // Only override 'enabled' if it's not a core plugin
                if (!isCore) {
                    // Use 'enabled' from state, not 'isEnabled'
                    config.settings.plugins[pluginName].enabled = state.enabled;
                } else {
                     config.settings.plugins[pluginName].enabled = true; // Ensure core are always enabled
                }


                // Apply customized settings only if the plugin is enabled (or core)
                if (state.enabled || isCore) {
                     const pluginDef = allPlugins.find(p => p.name === pluginName);

                     Object.entries(state.settings).forEach(([settingName, value]) => {
                        if (config.settings.plugins[pluginName].hasOwnProperty(settingName)) {
                             const settingDef = pluginDef?.settings?.find(s => s.name === settingName);
                             let processedValue = value;

                             if (settingDef) {
                                 if (settingDef.type === 'number') {
                                     processedValue = Number(value);
                                     if (isNaN(processedValue)) processedValue = settingDef.defaultValue;
                                 } else if (settingDef.type === 'checkbox') {
                                     processedValue = Boolean(value);
                                 } else if (settingDef.type === 'color') {
                                     // Store color *without* '#' in the final JSON config
                                     processedValue = String(value).startsWith('#') ? String(value).substring(1) : String(value);
                                      // Validate hex format maybe? For now just strip #
                                      if (!/^[0-9a-fA-F]{6}$/.test(processedValue) && !/^[0-9a-fA-F]{8}$/.test(processedValue)) {
                                        console.warn(`Invalid color format for ${pluginName}.${settingName}: ${value}. Using default.`);
                                        processedValue = String(settingDef.defaultValue).startsWith('#') ? String(settingDef.defaultValue).substring(1) : String(settingDef.defaultValue);
                                      }
                                 } else {
                                     processedValue = String(value);
                                 }
                             }
                            config.settings.plugins[pluginName][settingName] = processedValue;
                        }
                     });
                }
            } else {
                 console.warn(`Plugin ${pluginName} from state not found in base config.`);
            }
        });

        // Add selected theme's download URL
        if (selectedThemeId) {
            const selectedTheme = allThemes.find(theme => theme.id === selectedThemeId);
            if (selectedTheme?.downloadUrl) {
                config.settings.themeLinks = [selectedTheme.downloadUrl];
                 // config.settings.enabledThemes = [selectedTheme.id]; // Vencord likely uses themeLinks
            }
        } else {
            config.settings.themeLinks = [];
            // config.settings.enabledThemes = [];
        }

        const configString = JSON.stringify(config, null, 4); // Pretty print JSON
        setGeneratedConfigJson(configString);
        setIsConfigGenerated(true);
        setCopyButtonText('نسخ التكوين'); // Reset copy button text

    }, [buildBaseConfig, selectedPluginStates, selectedThemeId, allThemes, allPlugins]);

    // --- Copy Config Logic ---
    const handleCopyConfig = useCallback(async () => {
        if (!isConfigGenerated || !generatedConfigJson) return;
        try {
            await navigator.clipboard.writeText(generatedConfigJson);
            setCopyButtonText('تم النسخ!');
            setTimeout(() => setCopyButtonText('نسخ التكوين'), 2000);
        } catch (err) {
            console.error('فشل النسخ:', err);
            setCopyButtonText('فشل النسخ');
            // You might want to show a more user-friendly error message
        }
    }, [isConfigGenerated, generatedConfigJson]);

    // --- Download Config Logic ---
    const handleDownloadConfig = useCallback(() => {
        if (!isConfigGenerated || !generatedConfigJson) return;
        try {
            const blob = new Blob([generatedConfigJson], { type: 'application/json;charset=utf-8' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'vencord_config.json';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        } catch (err) {
            console.error('فشل التنزيل:', err);
            // Show error message to user
        }
    }, [isConfigGenerated, generatedConfigJson]);

     // --- Show Instructions Logic ---
     const handleShowInstructions = () => {
        alert(
            "لاستيراد إعدادات Vencord، يمكنك اتباع أحد الخيارين التاليين:\n\n" +
            "الخيار الأول (مستحسن):\n" +
            "1. من قائمة Vencord داخل Discord، انتقل إلى Settings.\n" +
            "2. اختر Backup & Restore.\n" +
            "3. اضغط على زر Import Settings.\n" +
            "4. حدد ملف 'vencord_config.json' الذي قمت بتنزيله.\n" +
            "5. بعد اكتمال الاستيراد بنجاح، أعد تشغيل Discord بالكامل.\n\n" +
            "الخيار الثاني (يدوي):\n" +
            "1. انسخ محتوى التكوين من مربع النص أعلاه.\n" +
            "2. افتح ملفًا نصيًا جديدًا (باستخدام Notepad أو محرر نصوص آخر).\n" +
            "3. الصق المحتوى المنسوخ في الملف النصي.\n" +
            "4. احفظ الملف باسم 'vencord_config.txt'.\n" +
            "5. قم بتغيير امتداد الملف من '.txt' إلى '.json' ليصبح 'vencord_config.json'.\n" +
            "6. اتبع الآن الخطوات نفسها المذكورة في الخيار الأول (Import Settings -> إعادة تشغيل Discord)."
        );
    };

    return (
        <div className="mt-8 p-6 bg-[var(--bg1)] border border-[var(--surface0)] rounded-lg shadow-inner">
            <Heading level={2} className="mb-4 text-[var(--accentTeal)]">إنشاء وتصدير التكوين</Heading>
            <div className="flex flex-wrap gap-3 mb-4">
                <Button variant="primary" onClick={handleGenerateConfig} className="bg-[var(--accentBlue)] hover:bg-opacity-80">
                    إنشاء التكوين
                </Button>
                <Button
                    variant="secondary"
                    className={`bg-[var(--accentAqua)] text-[var(--base)] hover:bg-opacity-80 ${copyButtonText === 'تم النسخ!' ? 'bg-[var(--accentGreen)]' : ''}`}
                    onClick={handleCopyConfig}
                    disabled={!isConfigGenerated}
                >
                    {copyButtonText}
                </Button>
                <Button
                    variant="secondary"
                    className="bg-[var(--accentAqua)] text-[var(--base)] hover:bg-opacity-80"
                    onClick={handleDownloadConfig}
                    disabled={!isConfigGenerated}
                >
                    تنزيل التكوين
                </Button>
                 <Button
                    variant="secondary"
                    className="bg-[var(--accentRed)] text-[var(--base)] hover:bg-opacity-80 mr-auto" // Push to start in RTL
                    onClick={handleShowInstructions}
                 >
                     كيفية تطبيق التكوين؟
                 </Button>
            </div>
            <textarea
                readOnly
                value={generatedConfigJson}
                placeholder="سيظهر هنا ملف التكوين بتنسيق JSON بعد النقر على زر 'إنشاء التكوين'... تأكد من تحديد الإضافات التي تريدها أولاً."
                aria-label="مخرج التكوين بصيغة JSON"
                className="w-full min-h-[300px] p-3 border border-[var(--surface1)] rounded-md bg-[var(--base)] text-[var(--fg0)] text-sm font-mono whitespace-pre overflow-auto direction-ltr text-left focus:outline-none focus:ring-1 focus:ring-[var(--accentBlue)] resize-vertical"
            />
        </div>
    );
};

export default ConfigGenerator;

