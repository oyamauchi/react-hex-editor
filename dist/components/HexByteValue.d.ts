import React from 'react';
import { HexEditorClassNames, SelectionDirectionType, SetSelectionBoundaryCallback } from '../types';
interface Props {
    className?: string;
    classNames?: HexEditorClassNames;
    columnIndex?: number;
    isCursor?: boolean;
    isCurrentColumn?: boolean;
    isCurrentRow?: boolean;
    isEditing?: boolean;
    isSelected?: boolean;
    isSelectionCursor?: boolean;
    isSelectionEnd?: boolean;
    isSelectionStart?: boolean;
    offset?: number;
    rowIndex?: number;
    setSelectionEnd?: SetSelectionBoundaryCallback;
    setSelectionRange?: (start: number | null, end?: number | null, direction?: SelectionDirectionType | null, takeFocus?: boolean) => void;
    setSelectionStart?: SetSelectionBoundaryCallback;
    style?: React.CSSProperties;
    value?: number | null;
}
declare const _default: React.MemoExoticComponent<React.ForwardRefExoticComponent<Props & React.RefAttributes<HTMLDivElement>>>;
export default _default;
