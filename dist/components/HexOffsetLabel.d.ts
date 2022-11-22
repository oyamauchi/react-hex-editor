import React from 'react';
interface Props {
    className?: string;
    formatOffset?: (offset: number) => number | string;
    offset?: number | null;
    style?: React.CSSProperties;
}
declare const _default: React.MemoExoticComponent<React.ForwardRefExoticComponent<Props & React.RefAttributes<HTMLDivElement>>>;
export default _default;
