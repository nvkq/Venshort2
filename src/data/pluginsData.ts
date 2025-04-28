// src/data/pluginsData.ts
import { Plugin, Categories, ThemeOptionData } from '../types';

/**
 * List of core plugins that are always required and enabled.
 * Extracted from plugins.html script.
 */
export const requiredPlugins: string[] = ["NoTrack", "Settings", "SupportHelper", "CrashHandler"];

/**
 * Information about each plugin category.
 * Extracted from plugins.html script.
 */
export const categories: Categories = {
  "api": { name: "واجهات برمجة التطبيقات (API)", description: "توفر هذه الإضافات وظائف برمجية للمطورين الآخرين لبناء إضافاتهم الخاصة أو للتفاعل مع Vencord و Discord بشكل أعمق. لا تحتاج لتفعيلها إلا إذا طُلِب منك ذلك من إضافة أخرى." },
  "core": { name: "الإضافات الأساسية", description: "إضافات ضرورية لعمل Vencord بشكل صحيح، مثل نظام الإعدادات ومعالج الأخطاء. يتم تفعيلها دائمًا ولا يمكن تعطيلها." },
  "appearance": { name: "المظهر والتخصيص", description: "إضافات لتغيير شكل ومظهر واجهة Discord، مثل تعديل الألوان، تحسين عرض العناصر، أو إضافة تأثيرات بصرية." },
  "utility": { name: "الأدوات المساعدة", description: "إضافات تضيف وظائف وأدوات عملية لتحسين الإنتاجية أو إضافة ميزات مفيدة غير موجودة في Discord افتراضيًا." },
  "fun": { name: "المرح والترفيه", description: "إضافات تضيف لمسة من المرح والتسلية، مثل استبدال صور GIF أو تخصيصات طريفة أخرى." },
  "privacy": { name: "الخصوصية والأمان", description: "إضافات تركز على حماية خصوصيتك عن طريق منع التتبع، إخفاء المعلومات، أو تنظيف الروابط." },
  "misc": { name: "متنوعة", description: "إضافات لا تندرج بوضوح تحت الفئات الأخرى أو تؤدي وظائف متخصصة جدًا." }
};

/**
 * Data for available themes.
 * Extracted from plugins.html HTML structure.
 */
export const themeOptions: ThemeOptionData[] = [
    { id: 'ClearVision', name: 'ClearVision', author: 'Nyxls', previewUrl: 'https://gibbu.github.io/ThemePreview/?file=https://raw.githubusercontent.com/ClearVision/ClearVision-v6/master/ClearVision_v6.theme.css', downloadUrl: 'https://betterdiscord.app/Download?id=23' },
    { id: 'DiscordMatter', name: 'Discord Matter', author: 'TropicaI', previewUrl: 'https://gibbu.github.io/ThemePreview/?file=https://raw.githubusercontent.com/Tropix126/Discord-Matter/main/Discord%20Matter.theme.css', downloadUrl: 'https://betterdiscord.app/Download?id=174' },
    { id: 'Discord+', name: 'Discord+', author: 'Insta', previewUrl: 'https://gibbu.github.io/ThemePreview/?file=https://raw.githubusercontent.com/InstaCodeClient/DiscordPlus/main/DiscordPlus.theme.css', downloadUrl: 'https://betterdiscord.app/Download?id=209' },
    { id: 'NotAnotherAnimeTheme', name: 'NotAnotherAnimeTheme', author: 'puckzxz', previewUrl: 'https://gibbu.github.io/ThemePreview/?file=https://raw.githubusercontent.com/puckzxz/NotAnotherAnimeTheme/main/NotAnotherAnimeTheme.theme.css', downloadUrl: 'https://betterdiscord.app/Download?id=286' },
    { id: 'FrostedGlass', name: 'Frosted Glass', author: 'Gibbu', previewUrl: 'https://cdn.jsdelivr.net/gh/DiscordStyles/FrostedGlass@c87ce3498268bdb3757f20858365c1f4f505cec3/dist/FrostedGlass.theme.css', downloadUrl: 'https://betterdiscord.app/Download?id=2' },
    { id: 'TokyoNight', name: 'Tokyo Night', author: 'ENNUI', previewUrl: 'https://gibbu.github.io/ThemePreview/?file=https://raw.githubusercontent.com/Dyzean/Tokyo-Night-Discord/main/tokyonight.theme.css', downloadUrl: 'https://betterdiscord.app/Download?id=280' },
    { id: 'Catppuccin', name: 'Catppuccin', author: 'Catppuccin', previewUrl: 'https://gibbu.github.io/ThemePreview/?file=https://raw.githubusercontent.com/catppuccin/discord/main/themes/mocha.theme.css', downloadUrl: 'https://betterdiscord.app/Download?id=379' },
    { id: 'Fluent', name: 'Fluent', author: 'DiscordStyles', previewUrl: 'https://gibbu.github.io/ThemePreview/?file=https://raw.githubusercontent.com/DiscordStyles/Fluent/main/Fluent.theme.css', downloadUrl: 'https://betterdiscord.app/Download?id=290' },
];


/**
 * Detailed data for all Vencord plugins.
 * Extracted from plugins.html script and formatted for TypeScript.
 */
export const pluginsData: Plugin[] = [
  // --- API Category ---
  { name: "ChatInputButtonAPI", description: "للمطورين: تتيح إضافة أزرار مخصصة إلى شريط إدخال الدردشة.", author: "Vendicated", category: "api" },
  { name: "CommandsAPI", description: "للمطورين: تسمح بإنشاء وتسجيل أوامر سلاش (/) مخصصة.", author: "Vendicated", category: "api" },
  { name: "MemberListDecoratorsAPI", description: "للمطورين: تتيح إضافة أيقونات أو زخارف بجانب أسماء المستخدمين في قائمة الأعضاء.", author: "Vendicated", category: "api" },
  { name: "MessageAccessoriesAPI", description: "للمطورين: تسمح بإضافة عناصر إضافية (مثل أزرار) أسفل الرسائل.", author: "Vendicated", category: "api" },
  { name: "MessageDecorationsAPI", description: "للمطورين: تتيح إضافة عناصر مرئية (زخارف) حول أو داخل الرسائل.", author: "Vendicated", category: "api" },
  { name: "MessageEventsAPI", description: "للمطورين: تسمح بالتفاعل مع أحداث الرسائل (الإرسال، التعديل، الحذف).", author: "Vendicated", category: "api" },
  { name: "MessagePopoverAPI", description: "للمطورين: تتيح إضافة خيارات مخصصة لقائمة الرسالة المنبثقة.", author: "Vendicated", category: "api" },
  { name: "MessageUpdaterAPI", description: "للمطورين: تسمح بتعديل محتوى الرسائل ديناميكيًا بعد إرسالها.", author: "Vendicated", category: "api" },
  { name: "ServerListAPI", description: "للمطورين: تتيح التفاعل مع قائمة الخوادم وتخصيصها.", author: "Vendicated", category: "api" },
  { name: "UserSettingsAPI", description: "للمطورين: تسمح بإضافة أقسام وإعدادات مخصصة إلى قائمة إعدادات المستخدم.", author: "Vendicated", category: "api" },
  { name: "DynamicImageModalAPI", description: "للمطورين: تتيح عرض الصور في نافذة منبثقة ديناميكية.", author: "Vendicated", category: "api" },
  { name: "BadgeAPI", description: "للمطورين: تسمح بإضافة شارات مخصصة إلى ملفات تعريف المستخدمين.", author: "Vendicated", category: "api" },

  // --- Core Category ---
  { name: "CrashHandler", description: "أساسي: يعالج الأعطال غير المتوقعة في Vencord ويساعد في تشخيص المشاكل.", author: "Vendicated", category: "core", required: true },
  { name: "Settings", description: "أساسي: يضيف لوحة تحكم Vencord ضمن إعدادات Discord لإدارة الإضافات والميزات.", author: "Vendicated", category: "core", required: true, settings: [ { type: "select", name: "settingsLocation", label: "موقع الإعدادات:", options: [ { value: "aboveNitro", label: "فوق Nitro" }, { value: "belowNitro", label: "تحت Nitro" }, { value: "aboveActivity", label: "فوق الأعدادات" } ], defaultValue: "aboveNitro" } ] },
  { name: "SupportHelper", description: "أساسي: يوفر أدوات ومعلومات للمساعدة في تشخيص المشكلات وطلب الدعم.", author: "Vendicated", category: "core", required: true },

  // --- Privacy Category ---
  { name: "NoTrack", description: "أساسي/خصوصية: يمنع Discord من جمع بيانات الاستخدام والتحليلات عنك.", author: "Vendicated", category: "privacy", required: true, settings: [ { type: "checkbox", name: "disableAnalytics", label: "تعطيل التحليلات:", defaultValue: true } ] },
  { name: "ClearURLs", description: "خصوصية: يزيل تلقائيًا معلمات التتبع (مثل utm_source) من الروابط.", author: "Vendicated", category: "privacy" },
  { name: "AnonymiseFileNames", description: "خصوصية: يغير أسماء الملفات التي ترفعها إلى أسماء عامة (مثل 'file.png') قبل الإرسال.", author: "fawn", category: "privacy" },

  // --- Appearance Category ---
  { name: "ClientTheme", description: "مظهر: يتيح لك تغيير لون الخلفية الرئيسي لواجهة Discord.", author: "Vendicated", category: "appearance", settings: [ { type: "color", name: "color", label: "اللون:", defaultValue: "313338" } ] },
  { name: "BetterFolders", description: "مظهر: يحسن عرض مجلدات الخوادم مع خيار للشريط الجانبي وزر لإغلاق الكل.", author: "Juby210, AutumnVN, Nuckyz", category: "appearance", settings: [ { type: "checkbox", name: "sidebarFolders", label: "مجلدات الشريط الجانبي:", defaultValue: true }, { type: "checkbox", name: "closeAllFolders", label: "زر إغلاق الكل (في المجلدات):", defaultValue: true }, { type: "checkbox", name: "closeAllHomeButton", label: "زر إغلاق الكل (في زر الصفحة الرئيسية):", defaultValue: true } ] },
  { name: "BetterRoleDot", description: "مظهر: يسمح بنسخ لون الدور عند النقر على النقطة، ويتيح الجمع بين النقطة والاسم الملون.", author: "Vee, AutumnVN", category: "appearance", settings: [ { type: "checkbox", name: "bothStyles", label: "عرض النقطة والاسم الملون معًا:", defaultValue: true } ] },
  { name: "AlwaysAnimate", description: "مظهر: يجبر الصور الرمزية والبانرات والرموز التعبيرية المتحركة على التحرك دائمًا.", author: "Fiery", category: "appearance" },
  { name: "AlwaysExpandRoles", description: "مظهر: يعرض قائمة الأدوار موسعة بالكامل دائمًا عند فتح ملف شخصي.", author: "Chloe", category: "appearance" },
  { name: "BetterGifAltText", description: "مظهر: يجعل النص البديل لصور GIF أكثر فائدة (باستخدام علامات أو اسم الملف).", author: "Vee", category: "appearance" },
  { name: "BetterGifPicker", description: "مظهر/أداة: يجعل نافذة اختيار GIF تفتح قسم 'المفضلة' تلقائيًا.", author: "Samwich", category: "appearance" },
  { name: "BetterNotesBox", description: "مظهر/أداة: يتيح إخفاء صندوق الملاحظات في الملف الشخصي أو تعطيل التدقيق الإملائي فيه.", author: "Vee", category: "appearance" },
  { name: "BetterSettings", description: "مظهر/أداء: يحسن سلاسة وسرعة فتح قائمة إعدادات Discord.", author: "Kyuuhachi", category: "appearance" },
  { name: "BiggerStreamPreview", description: "مظهر: يكبر نافذة معاينة البث المباشر عند المرور عليها بالفأرة.", author: "phil", category: "appearance" },
  { name: "BlurNSFW", description: "مظهر/خصوصية: يموه الصور والمرفقات في قنوات NSFW حتى تمرير الفأرة فوقها.", author: "Vee", category: "appearance" },
  { name: "ColorSighted", description: "مظهر: يضيف تلوينًا للأزرار في مربعات الحوار لتسهيل التمييز (مفيد لعمى الألوان).", author: "Vendicated", category: "appearance" },
  { name: "Decor", description: "مظهر: يتيح تخصيصات مرئية متنوعة (مثل إخفاء عناصر) عبر CSS مخصص.", author: "Vendicated", category: "appearance" },
  { name: "FakeProfileThemes", description: "مظهر: يطبق سمات ملف شخصي مخصصة مرئية لمستخدمي Vencord الآخرين.", author: "Vendicated", category: "appearance" },
  { name: "FavoriteEmojiFirst", description: "مظهر/أداة: يعرض الرموز التعبيرية المفضلة في بداية قائمة الاختيار.", author: "Vendicated", category: "appearance" },
  { name: "FixImagesQuality", description: "مظهر: يحاول منع Discord من ضغط جودة الصور المعروضة.", author: "Vendicated", category: "appearance" },
  { name: "NoMosaic", description: "مظهر: يمنع عرض مجموعات الصور المتعددة بشكل فسيفساء.", author: "Vendicated", category: "appearance", settings: [ { type: "checkbox", name: "noMosaicAttachments", label: "إزالة الفسيفساء من المرفقات:", defaultValue: true }, { type: "checkbox", name: "noMosaicEmbeds", label: "إزالة الفسيفساء من المضمنات:", defaultValue: true } ] },
  { name: "NoTypingAnimation", description: "مظهر: يزيل مؤشر (...) الذي يظهر عندما يكتب شخص ما.", author: "Vendicated", category: "appearance" },

  // --- Utility Category ---
  { name: "BetterRoleContext", description: "أداة: يضيف خيارات مفيدة (نسخ اللون، تعديل) لقائمة الأدوار في الملف الشخصي.", author: "Vee, goodbee", category: "utility" },
  { name: "BetterUploadButton", description: "أداة: يغير سلوك زر الرفع (نقرة للاختيار، يمين للقائمة).", author: "fawn, Vee", category: "utility" },
  { name: "AccountPanelServerProfile", description: "أداة: يتيح فتح ملفك الشخصي للخادم الحالي بالنقر اليمين على لوحة حسابك.", author: "Nuckyz, Relitrix", category: "utility" },
  { name: "AlwaysTrust", description: "أداة/أمان: يتجاوز تلقائيًا تحذيرات الروابط والملفات 'غير الموثوقة'. (استخدم بحذر!)
