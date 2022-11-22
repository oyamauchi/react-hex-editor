import React from 'react';
import { FixedSizeList as List, ListChildComponentProps, ListOnItemsRenderedProps, ListOnScrollProps } from 'react-window';
import { HexEditorBodyChildren } from '../types';
export interface HexEditorBodyProps {
    children?: HexEditorBodyChildren;
    className?: string;
    height: number;
    itemRenderer?: React.ComponentType<ListChildComponentProps>;
    onItemsRendered: (props: ListOnItemsRenderedProps) => any;
    onScroll?: (props: ListOnScrollProps) => any;
    overscanCount: number;
    rowCount: number;
    rowHeight: number;
    rows: number;
    style?: React.CSSProperties;
    width: number;
}
declare const _default: React.MemoExoticComponent<React.ForwardRefExoticComponent<HexEditorBodyProps & React.RefAttributes<List<any>>>>;
export default _default;
