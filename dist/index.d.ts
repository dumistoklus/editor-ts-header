import { API, BlockTool, HTMLPasteEvent, PasteConfig, ToolboxConfig, ToolSettings } from '@editorjs/editorjs';
interface HeaderConfig extends ToolSettings {
    placeholder?: string;
}
interface HeaderInputData {
    text?: string;
    level?: number;
}
interface HeaderData {
    text: string;
    level: number;
}
interface HeaderConstructorConfig {
    api: API;
    config?: HeaderConfig;
    data?: HeaderInputData;
}
export declare class Header implements BlockTool {
    private api;
    private _CSS;
    private _settings?;
    private _data;
    private _element;
    private settingsButtons;
    constructor({ api, config, data }: HeaderConstructorConfig);
    /**
     * Return Tool's view
     */
    render(): HTMLHeadingElement;
    /**
     * Create Block's settings block
     */
    renderSettings(): HTMLElement;
    /**
     * Method that specified how to merge two Text blocks.
     * Called by Editor.js by backspace at the beginning of the Block
     */
    merge(data: HeaderData): void;
    /**
     * Validate Text block data:
     * - check for emptiness
     */
    validate(blockData: HeaderData): boolean;
    /**
     * Extract Tool's data from the view
     */
    save(toolsContent: HTMLHeadingElement): HeaderData;
    /**
     * Sanitizer Rules
     */
    readonly sanitize: {
        level: {};
    };
    /**
     * Handle H1-H6 tags on paste to substitute it with header Tool
     */
    onPaste(event: HTMLPasteEvent): void;
    /**
     * Used by Editor.js paste handling API.
     * Provides configuration to handle H1-H6 tags.
     */
    static readonly pasteConfig: PasteConfig;
    /**
     * Get Tool toolbox settings
     */
    static readonly toolbox: ToolboxConfig;
    private normalizeData;
    /**
     * Callback for Block's settings buttons
     */
    private setLevel;
    /**
     * Get current Tools`s data
     */
    /**
    * Store data in plugin:
    * - at the this._data property
    * - at the HTML
    */
    private data;
    /**
     * Get tag for target level
     * By default returns second-leveled header
     */
    private getTag;
    /**
     * Get current level
     */
    private readonly currentLevel;
}
export {};
