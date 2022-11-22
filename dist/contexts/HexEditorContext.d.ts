/// <reference types="react" />
import { HexEditorClassNames, HexEditorInlineStyles, SelectionDirectionType, SetSelectionBoundaryCallback, SetSelectionRangeCallback, ValueFormatter } from '../types';
export interface HexEditorContextInterface {
    asciiPlaceholder: string | JSX.Element | null;
    classNames: HexEditorClassNames;
    columns: number;
    cursorColumn?: number;
    cursorOffset: number;
    cursorRow?: number;
    data: Uint8Array | number[];
    formatOffset: (offset: number) => string;
    formatValue: ValueFormatter;
    isEditing: boolean;
    nonce?: number | string;
    nybbleHigh: number | null;
    rows: number;
    selectionAnchor: number | null;
    selectionDirection: SelectionDirectionType;
    selectionEnd: number;
    selectionStart: number;
    setSelectionEnd: SetSelectionBoundaryCallback;
    setSelectionRange: SetSelectionRangeCallback;
    setSelectionStart: SetSelectionBoundaryCallback;
    showAscii: boolean;
    showRowLabels: boolean;
    styles: HexEditorInlineStyles;
}
declare const HexEditorContext: import("react").Context<HexEditorContextInterface>;
export default HexEditorContext;
