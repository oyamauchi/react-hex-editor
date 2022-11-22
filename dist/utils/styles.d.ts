import { HexEditorTheme } from '../themes';
export declare const hexEditorTheme: <K extends "asciiPaddingX" | "bytePaddingX" | "rowPaddingY" | "scrollWidth" | "cursorBlinkSpeed" | "colorBackground" | "colorBackgroundColumnEven" | "colorBackgroundColumnOdd" | "colorBackgroundCursor" | "colorBackgroundCursorHighlight" | "colorBackgroundEven" | "colorBackgroundInactiveCursor" | "colorBackgroundInactiveCursorHighlight" | "colorBackgroundInactiveSelection" | "colorBackgroundInactiveSelectionCursor" | "colorBackgroundLabel" | "colorBackgroundLabelCurrent" | "colorBackgroundOdd" | "colorBackgroundRowEven" | "colorBackgroundRowOdd" | "colorBackgroundSelection" | "colorBackgroundSelectionCursor" | "colorScrollbackTrack" | "colorScrollbackThumb" | "colorScrollbackThumbHover" | "colorText" | "colorTextColumnEven" | "colorTextColumnOdd" | "colorTextCursor" | "colorTextCursorHighlight" | "colorTextEven" | "colorTextInactiveCursor" | "colorTextInactiveCursorHighlight" | "colorTextInactiveSelection" | "colorTextInactiveSelectionCursor" | "colorTextLabel" | "colorTextLabelCurrent" | "colorTextOdd" | "colorTextRowEven" | "colorTextRowOdd" | "colorTextSelection" | "colorTextSelectionCursor" | "fontFamily" | "fontSize" | "gutterWidth" | "labelPaddingX" | "textTransform">(key: K) => ({ theme: { hexEditor } }: {
    theme: {
        hexEditor: HexEditorTheme;
    };
}) => HexEditorTheme[K];
declare const _default: any;
export default _default;
