import React from 'react';
import { HexEditorClassNames, HexEditorInlineStyles, ValueFormatter } from '../types';
interface Props {
    asciiPlaceholder?: string | JSX.Element | null;
    asciiValue?: number;
    asciiWidth?: number;
    byteWidth?: number;
    className?: string;
    classNames?: HexEditorClassNames;
    data?: Uint8Array | number[];
    formatOffset?: (offset: number) => string | number;
    formatValue?: ValueFormatter;
    gutterWidth?: number;
    labelWidth?: number;
    offset?: number;
    onMeasure?: (measurements: {
        asciiWidth: number;
        byteWidth: number;
        gutterWidth: number;
        labelWidth: number;
        rowHeight: number;
        scrollbarWidth: number;
    }) => void;
    rowHeight?: number;
    style?: React.CSSProperties | null;
    styles?: HexEditorInlineStyles;
    value?: number;
}
declare const HexEditorMeasureRow: {
    ({ asciiPlaceholder, asciiValue, asciiWidth: explicitAsciiWidth, byteWidth: explicitByteWidth, className, classNames, formatOffset, formatValue, gutterWidth: explicitGutterWidth, styles, labelWidth: explicitLabelWidth, offset, onMeasure, rowHeight: explicitRowHeight, style, value, }: Props): JSX.Element;
    displayName: string;
};
export default HexEditorMeasureRow;
