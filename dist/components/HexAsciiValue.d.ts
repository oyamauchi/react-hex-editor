import React from 'react';
import { HexEditorClassNames, SetSelectionBoundaryCallback, SetSelectionRangeCallback, ValueFormatter } from '../types';
interface Props {
    className?: string;
    classNames?: HexEditorClassNames;
    columnIndex?: number;
    formatValue?: ValueFormatter;
    isCursor?: boolean;
    isEditing?: boolean;
    isSelected?: boolean;
    isSelectionCursor?: boolean;
    isSelectionEnd?: boolean;
    isSelectionStart?: boolean;
    offset?: number;
    placeholder?: string | JSX.Element | null;
    rowIndex?: number;
    setSelectionEnd?: SetSelectionBoundaryCallback;
    setSelectionRange?: SetSelectionRangeCallback;
    setSelectionStart?: SetSelectionBoundaryCallback;
    style?: React.CSSProperties;
    value?: number | null;
}
declare const _default: React.MemoExoticComponent<React.ForwardRefExoticComponent<Props & React.RefAttributes<HTMLDivElement>>>;
export default _default;
