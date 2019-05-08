import {API, HTMLPasteEvent, PasteConfig, ToolboxConfig, ToolSettings} from '@editorjs/editorjs';

interface HeaderCss {
    block: string;
    settingsButton: string;
    settingsButtonActive: string;
    wrapper: string;
}

interface HeaderConfig extends ToolSettings {
    placeholder?: string; // Block's placeholder
}

interface HeaderInputData {
    text?: string; // Header's content
    level?: number; // Header's level from 1 to 3
}

interface HeaderData {
    text: string;
    level: number;
}

interface HeaderLevel {
    number: number; // level number
    tag: string; // tag correspondes with level number
    svg: string; // icon
}

interface HeaderConstructorConfig {
    api: API;
    config: HeaderConfig;
    data: HeaderInputData;
}

const levels: HeaderLevel[] = [
    {
        number: 1,
        tag: 'H1',
        svg: '<svg width="16" height="14" xmlns="http://www.w3.org/2000/svg"><path d="M2.1 1.5V5h4.7V1.5c0-.5 0-.9.3-1.1a1 1 0 0 1 .7-.4c.3 0 .6.1.8.4.2.2.3.6.3 1v9.7c0 .5-.1.9-.3 1.1a1 1 0 0 1-.8.4 1 1 0 0 1-.7-.4c-.2-.2-.3-.6-.3-1.1V7H2v4c0 .6 0 1-.3 1.2a1 1 0 0 1-.7.4 1 1 0 0 1-.8-.4C0 12 0 11.6 0 11.1V1.5C0 1 .1.6.3.4A1 1 0 0 1 1 0c.3 0 .5.1.7.4.2.2.3.6.3 1zm11.7 10V5.3c-1.3.9-2.1 1.3-2.6 1.3a.8.8 0 0 1-.6-.2.7.7 0 0 1-.2-.6c0-.2 0-.4.2-.5l.9-.4 1.5-.8a5.8 5.8 0 0 0 1-1l.5-.6c0-.1.2-.2.5-.2l.6.3c.2.2.2.5.2.8v7.8c0 1-.3 1.4-1 1.4a1 1 0 0 1-.7-.3c-.2-.2-.3-.5-.3-.8z"/></svg>'
    },
    {
        number: 2,
        tag: 'H2',
        svg: '<svg width="18" height="14" xmlns="http://www.w3.org/2000/svg"><path d="M2.2 1.5V5h4.6V1.5c0-.5.1-.9.3-1.1a1 1 0 0 1 .8-.4c.3 0 .5.1.7.4.2.2.4.6.4 1v9.7c0 .5-.2.9-.4 1.1a1 1 0 0 1-.7.4 1 1 0 0 1-.8-.4c-.2-.2-.3-.6-.3-1.1V7H2.2v4c0 .6-.1 1-.4 1.2a1 1 0 0 1-.7.4 1 1 0 0 1-.8-.4C0 12 0 11.6 0 11.1V1.5C0 1 .1.6.3.4A1 1 0 0 1 1 0c.3 0 .6.1.8.4.2.2.3.6.3 1zm11 9.3h3.5c.3 0 .6 0 .8.2.2.1.2.3.2.6 0 .2 0 .4-.2.5-.1.2-.3.3-.6.3h-5a1 1 0 0 1-.8-.3.9.9 0 0 1-.3-.7l.2-.6.4-.6A38.6 38.6 0 0 1 13 8.6l1-1a6 6 0 0 0 1-.7l.5-.8c.2-.3.2-.6.2-.8 0-.3 0-.6-.2-.8A1.4 1.4 0 0 0 15 4a1.6 1.6 0 0 0-.8-.2c-.6 0-1 .2-1.4.8l-.2.5-.4.7c-.1.2-.3.3-.6.3a.8.8 0 0 1-.5-.3.8.8 0 0 1-.3-.6l.3-1 .6-.9a3 3 0 0 1 1-.6 4 4 0 0 1 1.5-.3c.7 0 1.3.1 1.8.3a2.6 2.6 0 0 1 1.4 1.5l.2 1c0 .6-.2 1.1-.4 1.6l-.9 1a43 43 0 0 1-2.8 2.5 3.8 3.8 0 0 0-.4.5z"/></svg>'
    },
    {
        number: 3,
        tag: 'H3',
        svg: '<svg width="18" height="14" xmlns="http://www.w3.org/2000/svg"><path d="M2.2 1.5V5h4.6V1.5c0-.5.1-.9.3-1.1a1 1 0 0 1 .8-.4c.3 0 .5.1.7.4.2.2.4.6.4 1v9.7c0 .5-.2.9-.4 1.1a1 1 0 0 1-.7.4 1 1 0 0 1-.8-.4c-.2-.2-.3-.6-.3-1.1V7H2.2v4c0 .6-.1 1-.4 1.2a1 1 0 0 1-.7.4 1 1 0 0 1-.8-.4C0 12 0 11.6 0 11.1V1.5C0 1 .1.6.3.4A1 1 0 0 1 1 0c.3 0 .6.1.8.4.2.2.3.6.3 1zm11.6 5c.4 0 .7-.2 1-.5.3-.2.5-.6.5-1A1.3 1.3 0 0 0 14 3.7l-.7.1a1.1 1.1 0 0 0-.4.3 2.3 2.3 0 0 0-.3.5l-.3.6a.5.5 0 0 1-.2.2 1 1 0 0 1-.5 0 .7.7 0 0 1-.5-.1.8.8 0 0 1-.2-.6c0-.3 0-.5.2-.8a2.7 2.7 0 0 1 .7-.7 3.1 3.1 0 0 1 1-.6 4.1 4.1 0 0 1 1.4-.2c.4 0 .8 0 1.2.2l.9.5a2.3 2.3 0 0 1 .8 1.8c0 .4 0 .8-.3 1.1a4 4 0 0 1-.8 1l.9.6a2.5 2.5 0 0 1 .7 1.8 3 3 0 0 1-1 2.2 3.5 3.5 0 0 1-1.1.8 4 4 0 0 1-1.5.2 3.5 3.5 0 0 1-1.5-.3 3.3 3.3 0 0 1-1.7-1.6 2 2 0 0 1-.2-.8c0-.3.1-.5.3-.6a.9.9 0 0 1 .6-.3l.4.1a.5.5 0 0 1 .2.3c.3.6.5 1.1.8 1.4.2.3.6.5 1.1.5a1.7 1.7 0 0 0 1.5-.9l.2-.9c0-.5-.1-1-.4-1.3-.3-.3-.7-.4-1.2-.4h-.8l-.6-.1a.7.7 0 0 1-.2-.6c0-.2 0-.4.3-.5l.7-.2h.3z"/></svg>'
    },
    {
        number: 4,
        tag: 'H4',
        svg: '<svg width="20" height="14" xmlns="http://www.w3.org/2000/svg"><path d="M2.2 1.5V5h4.6V1.5c0-.5.1-.9.3-1.1a1 1 0 0 1 .8-.4c.3 0 .5.1.7.4.2.2.4.6.4 1v9.7c0 .5-.2.9-.4 1.1a1 1 0 0 1-.7.4 1 1 0 0 1-.8-.4c-.2-.2-.3-.6-.3-1.1V7H2.2v4c0 .6-.1 1-.4 1.2a1 1 0 0 1-.7.4 1 1 0 0 1-.8-.4C0 12 0 11.6 0 11.1V1.5C0 1 .1.6.3.4A1 1 0 0 1 1 0c.3 0 .6.1.8.4.2.2.3.6.3 1zm13 10v-1.2h-3.4c-.5 0-.8 0-1-.3a1 1 0 0 1-.3-1l.2-.3.2-.3.2-.3 3.6-4.8a5.4 5.4 0 0 1 .6-.6.8.8 0 0 1 .5-.3c.7 0 1 .4 1 1.2v5.2h.3c.4 0 .7 0 .9.2.2 0 .3.3.3.6l-.3.6-.8.1h-.4v1.3c0 .3 0 .6-.2.8l-.6.2a.8.8 0 0 1-.6-.3c-.2-.1-.2-.4-.2-.7zm-3-2.7h3V5l-3 4z"/></svg>'
    },
    {
        number: 5,
        tag: 'H5',
        svg: '<svg width="18" height="14" xmlns="http://www.w3.org/2000/svg"><path d="M2.2 1.5V5h4.6V1.5c0-.5.1-.9.3-1.1a1 1 0 0 1 .8-.4c.3 0 .5.1.7.4.2.2.4.6.4 1v9.7c0 .5-.2.9-.4 1.1a1 1 0 0 1-.7.4 1 1 0 0 1-.8-.4c-.2-.2-.3-.6-.3-1.1V7H2.2v4c0 .6-.1 1-.4 1.2a1 1 0 0 1-.7.4 1 1 0 0 1-.8-.4C0 12 0 11.6 0 11.1V1.5C0 1 .1.6.3.4A1 1 0 0 1 1 0c.3 0 .6.1.8.4.2.2.3.6.3 1zM16.3 4h-3.2l-.4 2.2c.6-.3 1.2-.5 1.8-.5a3 3 0 0 1 2.2 1 3.2 3.2 0 0 1 1 2.2c0 .7-.2 1.3-.5 1.8-.3.6-.8 1-1.3 1.3-.6.3-1.2.5-2 .5-.7 0-1.4-.1-2-.4l-1-1-.3-1c0-.3 0-.4.2-.6a.7.7 0 0 1 .6-.2c.4 0 .6.2.8.6l.8 1a1.7 1.7 0 0 0 2 0c.2-.1.4-.4.5-.7.2-.3.2-.7.2-1.1 0-.4 0-.8-.2-1.1a1.6 1.6 0 0 0-.6-.7 1.7 1.7 0 0 0-.9-.2l-.8.1-.7.5-.8.4a.8.8 0 0 1-.6-.3.7.7 0 0 1-.3-.5l.1-.5.6-3.2c0-.4.2-.7.3-.9.2-.2.5-.3.9-.3h3.6c.7 0 1 .3 1 .8a.7.7 0 0 1-.2.6c-.2.2-.5.2-.8.2z"/></svg>'
    },
    {
        number: 6,
        tag: 'H6',
        svg: '<svg width="18" height="14" xmlns="http://www.w3.org/2000/svg"><path d="M2.2 1.5V5h4.6V1.5c0-.5.1-.9.3-1.1a1 1 0 0 1 .8-.4c.3 0 .5.1.7.4.2.2.4.6.4 1v9.7c0 .5-.2.9-.4 1.1a1 1 0 0 1-.7.4 1 1 0 0 1-.8-.4c-.2-.2-.3-.6-.3-1.1V7H2.2v4c0 .6-.1 1-.4 1.2a1 1 0 0 1-.7.4 1 1 0 0 1-.8-.4C0 12 0 11.6 0 11.1V1.5C0 1 .1.6.3.4A1 1 0 0 1 1 0c.3 0 .6.1.8.4.2.2.3.6.3 1zM12.5 7a3 3 0 0 1 1-.9 2.7 2.7 0 0 1 1.2-.2A3 3 0 0 1 17 7c.3.2.5.6.6 1a3.6 3.6 0 0 1 .3 1.2c0 .7-.2 1.2-.5 1.8-.3.5-.7.9-1.2 1.2-.5.3-1.1.4-1.8.4s-1.4-.2-2-.5c-.5-.4-1-1-1.2-1.7-.3-.7-.4-1.6-.4-2.7 0-.8 0-1.6.2-2.2.2-.7.4-1.3.8-1.7.3-.5.7-.8 1.2-1 .4-.3 1-.4 1.6-.4.6 0 1 .1 1.5.4.5.2.8.5 1 .8.2.3.3.7.3 1 0 .2 0 .3-.2.5a.7.7 0 0 1-.5.2.9.9 0 0 1-.5-.2 1 1 0 0 1-.4-.5 1.4 1.4 0 0 0-.5-.6 1.3 1.3 0 0 0-.8-.3l-.7.2a1.9 1.9 0 0 0-.6.6c-.3.5-.5 1.3-.6 2.6zm1.9 4.2c.4 0 .8-.2 1.1-.6.3-.4.4-.9.4-1.5 0-.4 0-.7-.2-1a1.6 1.6 0 0 0-.5-.7 1.5 1.5 0 0 0-.9-.2c-.2 0-.5 0-.8.2L13 8a2 2 0 0 0-.2 1c0 .6.2 1.2.5 1.6.3.4.7.6 1.2.6z"/></svg>'
    }
];

// Use H2 as default header
const defaultLevel = levels[1];

export class Header {

    private api: API;

    private _CSS: HeaderCss;

    private _settings: HeaderConfig;

    private _data: HeaderData;

    private _element: HTMLHeadingElement;

    private settingsButtons: HTMLElement[];

    constructor({api, config, data}: HeaderConstructorConfig) {
        this.api = api;

        this._CSS = {
            block: this.api.styles.block,
            settingsButton: this.api.styles.settingsButton,
            settingsButtonActive: this.api.styles.settingsButtonActive,
            wrapper: 'ce-header',
        };

        this._settings = config;
        this._data = this.normalizeData(data);
        this._element = this.getTag();
        this.settingsButtons = [];
    }

    /**
     * Return Tool's view
     */
    public render(): HTMLHeadingElement {
        return this._element;
    }

    /**
     * Create Block's settings block
     */
    public renderSettings(): HTMLElement {
        let holder = document.createElement('DIV');

        /** Add type selectors */
        levels.forEach(level => {
            let selectTypeButton = document.createElement('SPAN');

            selectTypeButton.classList.add(this._CSS.settingsButton);

            /**
             * Highlight current level button
             */
            if (this.currentLevel.number === level.number) {
                selectTypeButton.classList.add(this._CSS.settingsButtonActive);
            }

            /**
             * Add SVG icon
             */
            selectTypeButton.innerHTML = level.svg;

            /**
             * Save level to its button
             */
            selectTypeButton.dataset.level = level.number.toString();

            /**
             * Set up click handler
             */
            selectTypeButton.addEventListener('click', () => {
                this.setLevel(level.number);
            });

            /**
             * Append settings button to holder
             */
            holder.appendChild(selectTypeButton);

            /**
             * Save settings buttons
             */
            this.settingsButtons.push(selectTypeButton);
        });

        return holder;
    }

    /**
     * Method that specified how to merge two Text blocks.
     * Called by Editor.js by backspace at the beginning of the Block
     */
    public merge(data: HeaderData) {
        this.data = {
            text: this.data.text + data.text,
            level: this.data.level
        };
    }

    /**
     * Validate Text block data:
     * - check for emptiness
     */
    public validate(blockData: HeaderData): boolean {
        return blockData.text.trim() !== '';
    }

    /**
     * Extract Tool's data from the view
     */
    public save(toolsContent: HTMLHeadingElement): HeaderData {
        return {
            text: toolsContent.innerHTML,
            level: this.currentLevel.number
        };
    }

    /**
     * Sanitizer Rules
     */
    public get sanitize() {
        return {
            level: {}
        };
    }

    /**
     * Handle H1-H6 tags on paste to substitute it with header Tool
     */
    public onPaste(event: HTMLPasteEvent) {
        const content = event.detail.data;

        /**
         * Define default level value
         */
        let level = 2;

        switch (content.tagName) {
            case 'H1':
                level = 1;
                break;
            /** H2 is a default level */
            case 'H3':
                level = 3;
                break;
            case 'H4':
                level = 4;
                break;
            case 'H5':
                level = 5;
                break;
            case 'H6':
                level = 6;
                break;
        }

        this.data = {
            level,
            text: content.innerHTML
        };
    }

    /**
     * Used by Editor.js paste handling API.
     * Provides configuration to handle H1-H6 tags.
     */
    public static get pasteConfig(): PasteConfig {
        return {
            tags: ['H1', 'H2', 'H3', 'H4', 'H5', 'H6']
        };
    }

    /**
     * Get Tool toolbox settings
     */
    public static get toolbox(): ToolboxConfig {
        return {
            icon: '<svg width="11" height="14" xmlns="http://www.w3.org/2000/svg"><path d="M7.6 8.2H2.3v4.5a1.1 1.1 0 0 1-2.3 0V1a1.1 1.1 0 1 1 2.3 0V6h5.3V1.1a1.1 1.1 0 0 1 2.3 0v11.6a1.1 1.1 0 0 1-2.3 0V8.2z"/></svg>',
            title: 'Header'
        };
    }

    private normalizeData(data: HeaderInputData): HeaderData {
        if (typeof data !== 'object') {
            data = {};
        }

        return {
            text: data && data.text || '',
            level: data.level || defaultLevel.number,
        };
    }

    /**
     * Callback for Block's settings buttons
     */
    private setLevel(level: number) {
        this.data = {
            level: level,
            text: this.data.text
        };

        /**
         * Highlight button by selected level
         */
        this.settingsButtons.forEach(button => {
            button.classList.toggle(this._CSS.settingsButtonActive, parseInt(button.dataset.level) === level);
        });
    }

    /**
     * Get current Tools`s data
     */
    private get data(): HeaderData {
        this._data.text = this._element.innerHTML;
        this._data.level = this.currentLevel.number;

        return this._data;
    }

    /**
     * Store data in plugin:
     * - at the this._data property
     * - at the HTML
     */
    private set data(data: HeaderData) {
        this._data = this.normalizeData(data);

        /**
         * If level is set and block in DOM
         * then replace it to a new block
         */
        if (data.level !== undefined && this._element.parentNode) {
            /**
             * Create a new tag
             */
            let newHeader = this.getTag();

            /**
             * Save Block's content
             */
            newHeader.innerHTML = this._element.innerHTML;

            /**
             * Replace blocks
             */
            this._element.parentNode.replaceChild(newHeader, this._element);

            /**
             * Save new block to private variable
             */
            this._element = newHeader;
        }

        /**
         * If data.text was passed then update block's content
         */
        if (data.text !== undefined) {
            this._element.innerHTML = this._data.text || '';
        }
    }

    /**
     * Get tag for target level
     * By default returns second-leveled header
     */
    private getTag(): HTMLHeadingElement {
        /**
         * Create element for current Block's level
         */
        let tag = document.createElement(this.currentLevel.tag) as HTMLHeadingElement;

        /**
         * Add text to block
         */
        tag.innerHTML = this._data.text || '';

        /**
         * Add styles class
         */
        tag.classList.add(this._CSS.wrapper);

        /**
         * Make tag editable
         */
        tag.contentEditable = 'true';

        /**
         * Add Placeholder
         */
        tag.dataset.placeholder = this._settings.placeholder || '';

        return tag;
    }

    /**
     * Get current level
     */
    private get currentLevel(): HeaderLevel {
        let level = levels.find(levelItem => levelItem.number === this._data.level);

        if (!level) {
            level = defaultLevel;
        }

        return level;
    }
}
