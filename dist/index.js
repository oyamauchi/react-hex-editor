'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
var joinClassNames = _interopDefault(require('classnames'));
var Keycoder = _interopDefault(require('keycoder'));
var keycodeJs = require('keycode-js');
var reactWindow = require('react-window');
var AutoSizer = _interopDefault(require('react-virtualized-auto-sizer'));
var styled = require('styled-components');
var styled__default = _interopDefault(styled);

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

function __makeTemplateObject(cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
}

var _a;
var EDIT_MODE_HEX = 'hex';
var EDIT_MODE_ASCII = 'ascii';
var SELECTION_DIRECTION_FORWARD = 'forward';
var SELECTION_DIRECTION_BACKWARD = 'backward';
var SELECTION_DIRECTION_NONE = 'none';
var KEY_VALUES = (_a = {},
    _a[keycodeJs.KEY_0] = 0x0,
    _a[keycodeJs.KEY_1] = 0x1,
    _a[keycodeJs.KEY_2] = 0x2,
    _a[keycodeJs.KEY_3] = 0x3,
    _a[keycodeJs.KEY_4] = 0x4,
    _a[keycodeJs.KEY_5] = 0x5,
    _a[keycodeJs.KEY_6] = 0x6,
    _a[keycodeJs.KEY_7] = 0x7,
    _a[keycodeJs.KEY_8] = 0x8,
    _a[keycodeJs.KEY_9] = 0x9,
    _a[keycodeJs.KEY_A] = 0xa,
    _a[keycodeJs.KEY_B] = 0xb,
    _a[keycodeJs.KEY_C] = 0xc,
    _a[keycodeJs.KEY_D] = 0xd,
    _a[keycodeJs.KEY_E] = 0xe,
    _a[keycodeJs.KEY_F] = 0xf,
    _a);
var EMPTY_CLASSNAMES = {};
var EMPTY_INLINE_STYLES = {};

var ASCII_LOOKUP = new Array(0x100).fill(0)
    .map(function (_v, i) { return (i >= 0x20 && i < 0x80 ? String.fromCodePoint(i) : '.'); });
var REGEX_MAC_LIKE = /Mac|iPhone|iPod|iPad/;
function isMacLike() {
    return REGEX_MAC_LIKE.test(navigator.platform);
}
function getScrollbarSize(parentNode) {
    if (parentNode === void 0) { parentNode = document.body; }
    var outer = document.createElement('div');
    outer.setAttribute('data-measure-scrollbar', 'true');
    outer.style.visibility = 'hidden';
    outer.style.overflow = 'scroll';
    parentNode.appendChild(outer);
    var inner = document.createElement('div');
    outer.appendChild(inner);
    var scrollbarWidth = outer.offsetWidth - inner.offsetWidth;
    var scrollbarHeight = outer.offsetHeight - inner.offsetHeight;
    parentNode.removeChild(outer);
    return [scrollbarWidth, scrollbarHeight];
}
function formatHex(value, padToLength) {
    var hexValue = value.toString(16);
    return padToLength ? hexValue.padStart(padToLength, '0') : hexValue;
}
function formatHexByte(value) {
    return (value & 0xff).toString(16).padStart(2, '0');
}
function byteToAscii(value) {
    return ASCII_LOOKUP[value & 0xff];
}
function hasSelection(start, end, selectionStart, selectionEnd) {
    if (selectionEnd === void 0) { selectionEnd = selectionStart; }
    // Selection contains range
    if (selectionStart <= start && selectionEnd >= end) {
        return true;
    }
    // Selection starts in range
    if (selectionStart >= start && selectionStart <= end) {
        return true;
    }
    // Selection ends in range
    if (selectionEnd >= start && selectionEnd <= end) {
        return true;
    }
    // Selection does not overlap range
    return false;
}

var CLASS_NAMES = {
    ascii: 'asciiValue',
    asciiHeader: 'asciiHeader',
    asciiValues: 'asciiValues',
    body: 'hexEditorBody',
    byte: 'byteValue',
    byteHeader: 'byteHeader',
    byteValues: 'byteValues',
    currentColumn: 'currentColumn',
    currentRow: 'currentRow',
    cursor: 'cursor',
    cursorHigh: 'cursorHigh',
    cursorLow: 'cursorLow',
    editAscii: 'editAscii',
    editHex: 'editHex',
    even: 'even',
    gutter: 'gutter',
    gutterHeader: 'gutterHeader',
    header: 'hexEditorHeader',
    highlight: 'highlight',
    invalid: 'invalid',
    notFocused: 'notFocused',
    nybbleHigh: 'nybbleHighValue',
    nybbleLow: 'nybbleLowValue',
    odd: 'odd',
    offsetLabel: 'offsetLabel',
    offsetLabelHeader: 'offsetLabelHeader',
    row: 'hexEditorRow',
    rowHeader: 'hexEditorRowHeader',
    selection: 'selection',
    selectionCursor: 'selectionCursor',
    selectionEnd: 'selectionEnd',
    selectionStart: 'selectionStart',
};

var EDITOR_STYLE = {
    fontFamily: 'monospace',
    position: 'relative',
};
var INPUT_STYLE = {
    border: 0,
    bottom: 0,
    cursor: 'text',
    display: 'block',
    height: '100%',
    left: 0,
    opacity: 0,
    outline: 0,
    padding: 0,
    pointerEvents: 'none',
    position: 'absolute',
    right: 0,
    top: 0,
    width: '100%',
};
var MEASURE_STYLE = {
    opacity: 0,
    pointerEvents: 'none',
    position: 'absolute',
    fontFamily: 'monospace',
};
var ROW_STYLE = {
    display: 'flex',
    flexDirection: 'row',
};
var CELL_STYLE = {
    alignItems: 'center',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'row',
    flexShrink: 0,
    justifyContent: 'center',
};
var ROWS_STYLE = {
    boxSizing: 'border-box',
    minWidth: '100%',
    overflowX: 'hidden',
    overflowY: 'scroll',
};
var INLINE_STYLES = {
    ascii: CELL_STYLE,
    asciiValues: ROW_STYLE,
    body: ROWS_STYLE,
    byte: CELL_STYLE,
    byteValues: ROW_STYLE,
    editor: EDITOR_STYLE,
    header: ROWS_STYLE,
    offsetLabel: CELL_STYLE,
    row: ROW_STYLE,
};

var HexOffsetLabel = function (_a, ref) {
    var className = _a.className, formatOffset = _a.formatOffset, offset = _a.offset, style = _a.style;
    var formattedOffset = React.useMemo(function () { return (formatOffset && offset != null ? formatOffset(offset) : offset); }, [offset, formatOffset]);
    return (React__default.createElement("div", { className: className, ref: ref, style: style }, formattedOffset));
};
HexOffsetLabel.displayName = 'HexOffsetLabel';
var HexOffsetLabel$1 = React.memo(React.forwardRef(HexOffsetLabel));

var HexEditorGutter = function (_a, ref) {
    var _b = _a.children, children = _b === void 0 ? React__default.createElement(React__default.Fragment, null, "\u00A0") : _b, className = _a.className, style = _a.style;
    return (React__default.createElement("div", { className: className, ref: ref, style: style }, children));
};
HexEditorGutter.displayName = 'HexEditorGutter';
var HexEditorGutter$1 = React.memo(React.forwardRef(HexEditorGutter));

var HexByte = function (_a, ref) {
    var _b;
    var className = _a.className, _c = _a.classNames, classNames = _c === void 0 ? EMPTY_CLASSNAMES : _c, columnIndex = _a.columnIndex, isCursor = _a.isCursor, isCurrentColumn = _a.isCurrentColumn, isCurrentRow = _a.isCurrentRow, isEditing = _a.isEditing, isSelected = _a.isSelected, isSelectionCursor = _a.isSelectionCursor, isSelectionEnd = _a.isSelectionEnd, isSelectionStart = _a.isSelectionStart, _d = _a.offset, offset = _d === void 0 ? 0 : _d, setSelectionEnd = _a.setSelectionEnd, setSelectionRange = _a.setSelectionRange, setSelectionStart = _a.setSelectionStart, style = _a.style, _e = _a.value, value = _e === void 0 ? 0x00 : _e;
    var handleMouseDown = React.useCallback(function (e) {
        if (setSelectionStart && e.button === 0 && !e.ctrlKey) {
            if (e.shiftKey) {
                e.preventDefault();
            }
            else {
                setSelectionStart(offset, EDIT_MODE_HEX, e);
            }
        }
    }, [offset, setSelectionStart]);
    var handleMouseMove = React.useCallback(function (e) {
        if (setSelectionEnd) {
            setSelectionEnd(offset, EDIT_MODE_HEX, e);
        }
    }, [offset, setSelectionEnd]);
    var handleClick = React.useCallback(function (e) {
        e.preventDefault();
        if (setSelectionRange) {
            if (e.shiftKey) {
                setSelectionRange(null, offset, null, true);
            }
            else {
                setSelectionRange(offset, null, null, true);
            }
        }
    }, [offset, setSelectionRange]);
    var handleDoubleClick = React.useCallback(function () {
        if (setSelectionRange) {
            setSelectionRange(offset, offset + 1, null, true);
        }
    }, [offset, setSelectionRange]);
    return (React__default.createElement("div", { className: joinClassNames(className, (_b = {},
            _b[classNames.currentColumn || ''] = isCurrentColumn,
            _b[classNames.currentRow || ''] = isCurrentRow,
            _b[classNames.cursor || ''] = isCursor,
            _b[classNames.cursorHigh || ''] = isCursor && !isEditing,
            _b[classNames.cursorLow || ''] = isCursor && isEditing,
            _b[classNames.even || ''] = columnIndex != null && columnIndex % 2 === 0,
            _b[classNames.highlight || ''] = isCursor || isSelectionCursor,
            _b[classNames.invalid || ''] = value == null,
            _b[classNames.odd || ''] = columnIndex != null && columnIndex % 2 === 1,
            _b[classNames.selection || ''] = isSelected,
            _b[classNames.selectionCursor || ''] = isSelectionCursor,
            _b[classNames.selectionEnd || ''] = isSelectionEnd,
            _b[classNames.selectionStart || ''] = isSelectionStart,
            _b)), "data-offset": offset, onClick: setSelectionRange && handleClick, onDoubleClick: setSelectionRange && handleDoubleClick, onMouseDown: setSelectionStart && handleMouseDown, onMouseMove: setSelectionEnd && handleMouseMove, ref: ref, style: style },
        React__default.createElement("span", { className: classNames.nybbleHigh }, value != null ? (value >>> 4).toString(16) : React__default.createElement(React__default.Fragment, null, "\u00A0")),
        React__default.createElement("span", { className: classNames.nybbleLow }, value != null ? (value & 0xf).toString(16) : React__default.createElement(React__default.Fragment, null, "\u00A0"))));
};
HexByte.displayName = 'HexByte';
var HexByteValue = React.memo(React.forwardRef(HexByte));

var HexByteAscii = function (_a, ref) {
    var _b;
    var className = _a.className, _c = _a.classNames, classNames = _c === void 0 ? EMPTY_CLASSNAMES : _c, _d = _a.formatValue, formatValue = _d === void 0 ? byteToAscii : _d, isCursor = _a.isCursor, isSelected = _a.isSelected, isSelectionCursor = _a.isSelectionCursor, isSelectionEnd = _a.isSelectionEnd, isSelectionStart = _a.isSelectionStart, _e = _a.offset, offset = _e === void 0 ? 0 : _e, placeholder = _a.placeholder, setSelectionEnd = _a.setSelectionEnd, setSelectionRange = _a.setSelectionRange, setSelectionStart = _a.setSelectionStart, style = _a.style, _f = _a.value, value = _f === void 0 ? 0x00 : _f;
    var formattedValue = React.useMemo(function () { return (formatValue && value != null ? formatValue(value) : value); }, [value, formatValue]);
    var handleMouseDown = React.useCallback(function (e) {
        if (setSelectionStart && e.button === 0 && !e.ctrlKey) {
            if (e.shiftKey) {
                e.preventDefault();
            }
            else {
                setSelectionStart(offset, EDIT_MODE_ASCII, e);
            }
        }
    }, [offset, setSelectionStart]);
    var handleMouseMove = React.useCallback(function (e) {
        if (setSelectionEnd) {
            setSelectionEnd(offset, EDIT_MODE_ASCII, e);
        }
    }, [offset, setSelectionEnd]);
    var handleClick = React.useCallback(function (e) {
        e.preventDefault();
        if (setSelectionRange) {
            if (e.shiftKey) {
                setSelectionRange(null, offset, null, true);
            }
            else {
                setSelectionRange(offset, null, null, true);
            }
        }
    }, [offset, setSelectionRange]);
    var handleDoubleClick = React.useCallback(function () {
        if (setSelectionRange) {
            setSelectionRange(offset, offset + 1, null, true);
        }
    }, [offset, setSelectionRange]);
    return (React__default.createElement("div", { className: joinClassNames(className, (_b = {},
            _b[classNames.cursor || ''] = isCursor,
            _b[classNames.highlight || ''] = isCursor || isSelectionCursor,
            _b[classNames.invalid || ''] = value == null,
            _b[classNames.selection || ''] = isSelected,
            _b[classNames.selectionCursor || ''] = isSelectionCursor,
            _b[classNames.selectionEnd || ''] = isSelectionEnd,
            _b[classNames.selectionStart || ''] = isSelectionStart,
            _b)), "data-offset": offset, onClick: setSelectionRange && handleClick, onDoubleClick: setSelectionRange && handleDoubleClick, onMouseDown: setSelectionStart && handleMouseDown, onMouseMove: setSelectionEnd && handleMouseMove, ref: ref, style: style }, placeholder == null ? formattedValue : (React__default.createElement(React__default.Fragment, null,
        React__default.createElement("span", { style: { position: 'absolute' } }, formattedValue),
        placeholder))));
};
HexByteAscii.displayName = 'HexByteAscii';
var HexAsciiValue = React.memo(React.forwardRef(HexByteAscii));

function areRowPropsEquivalent(prevProps, nextProps) {
    var _a = prevProps.columns, prevColumns = _a === void 0 ? prevProps.data ? prevProps.data.length : 0 : _a, prevCursorOffset = prevProps.cursorOffset, prevCursorRow = prevProps.cursorRow, prevIsEditing = prevProps.isEditing, prevNybbleHigh = prevProps.nybbleHigh, _b = prevProps.offset, prevOffset = _b === void 0 ? 0 : _b, prevRowIndex = prevProps.rowIndex, prevSelectionEnd = prevProps.selectionEnd, prevSelectionStart = prevProps.selectionStart, prevRest = __rest(prevProps, ["columns", "cursorOffset", "cursorRow", "isEditing", "nybbleHigh", "offset", "rowIndex", "selectionEnd", "selectionStart"]);
    var _c = nextProps.columns, nextColumns = _c === void 0 ? nextProps.data ? nextProps.data.length : 0 : _c, nextCursorOffset = nextProps.cursorOffset, nextCursorRow = nextProps.cursorRow, nextIsEditing = nextProps.isEditing, nextNybbleHigh = nextProps.nybbleHigh, _d = nextProps.offset, nextOffset = _d === void 0 ? 0 : _d, nextRowIndex = nextProps.rowIndex, nextSelectionEnd = nextProps.selectionEnd, nextSelectionStart = nextProps.selectionStart, nextRest = __rest(nextProps, ["columns", "cursorOffset", "cursorRow", "isEditing", "nybbleHigh", "offset", "rowIndex", "selectionEnd", "selectionStart"]);
    // Row, column, or offset has changed
    if (prevRowIndex !== nextRowIndex || prevColumns !== nextColumns || prevOffset !== nextOffset) {
        return false;
    }
    // Cursor is or was on this row
    if (prevRowIndex === prevCursorRow || nextRowIndex === nextCursorRow) {
        // Cursor has moved to or from this row
        if (prevCursorRow !== nextCursorRow) {
            return false;
        }
        // Editing on this row
        if (prevIsEditing !== nextIsEditing || prevNybbleHigh !== nextNybbleHigh) {
            return false;
        }
    }
    var prevOffsetEnd = prevOffset + prevColumns;
    var nextOffsetEnd = nextOffset + nextColumns;
    if (prevCursorOffset != null && nextCursorOffset != null) {
        if (hasSelection(prevOffset, prevOffsetEnd, prevCursorOffset)) {
            return false;
        }
        if (hasSelection(nextOffset, nextOffsetEnd, nextCursorOffset)) {
            return false;
        }
    }
    if (prevSelectionStart != null && prevSelectionEnd != null
        && nextSelectionStart != null && nextSelectionEnd != null) {
        var prevHasSelection = hasSelection(prevOffset, prevOffsetEnd, prevSelectionStart, prevSelectionEnd);
        var nextHasSelection = hasSelection(nextOffset, nextOffsetEnd, nextSelectionStart, nextSelectionEnd);
        if (prevHasSelection !== nextHasSelection) {
            return false;
        }
        if (prevSelectionStart !== nextSelectionStart) {
            if (hasSelection(prevOffset, prevOffsetEnd, prevSelectionStart)) {
                return false;
            }
            if (hasSelection(nextOffset, nextOffsetEnd, nextSelectionStart)) {
                return false;
            }
        }
        if (prevSelectionEnd !== nextSelectionEnd) {
            if (hasSelection(prevOffset, prevOffsetEnd, prevSelectionEnd)) {
                return false;
            }
            if (hasSelection(nextOffset, nextOffsetEnd, nextSelectionEnd)) {
                return false;
            }
        }
    }
    return reactWindow.areEqual(prevRest, nextRest);
}
var HexEditorRow = function (_a, ref) {
    var _b;
    var asciiPlaceholder = _a.asciiPlaceholder, _c = _a.className, className = _c === void 0 ? '' : _c, _d = _a.classNames, classNames = _d === void 0 ? EMPTY_CLASSNAMES : _d, columns = _a.columns, cursorColumn = _a.cursorColumn, cursorOffset = _a.cursorOffset, cursorRow = _a.cursorRow, _e = _a.data, data = _e === void 0 ? [] : _e, _f = _a.disabled, disabled = _f === void 0 ? false : _f, formatOffset = _a.formatOffset, formatValue = _a.formatValue, isEditing = _a.isEditing, _g = _a.isHeader, isHeader = _g === void 0 ? false : _g, labelOffset = _a.labelOffset, nybbleHigh = _a.nybbleHigh, _h = _a.offset, dataOffset = _h === void 0 ? 0 : _h, rowIndex = _a.rowIndex, selectionDirection = _a.selectionDirection, _j = _a.selectionEnd, selectionEnd = _j === void 0 ? -1 : _j, _k = _a.selectionStart, selectionStart = _k === void 0 ? -1 : _k, setSelectionEnd = _a.setSelectionEnd, setSelectionRange = _a.setSelectionRange, setSelectionStart = _a.setSelectionStart, _l = _a.showAscii, showAscii = _l === void 0 ? true : _l, _m = _a.showLabel, showLabel = _m === void 0 ? true : _m, style = _a.style, _o = _a.styles, styles = _o === void 0 ? EMPTY_INLINE_STYLES : _o;
    var dataOffsets = React.useMemo(function () {
        return new Array(columns == null ? data.length - dataOffset : columns)
            .fill(0)
            .map(function (_v, i) { return (dataOffset + i); });
    }, [dataOffset, columns, data.length]);
    var isSelecting = selectionEnd > selectionStart;
    var isCurrentRow = cursorRow != null && rowIndex === cursorRow;
    return (React__default.createElement("div", { className: className, ref: ref, style: style },
        !showLabel ? null : (React__default.createElement(React__default.Fragment, null,
            React__default.createElement(HexOffsetLabel$1, { className: joinClassNames((_b = {},
                    _b[classNames.offsetLabelHeader || ''] = isHeader,
                    _b[classNames.offsetLabel || ''] = !isHeader,
                    _b[classNames.currentRow || ''] = isCurrentRow,
                    _b)), formatOffset: formatOffset, offset: labelOffset == null ? dataOffset : labelOffset, style: styles.offsetLabel }),
            React__default.createElement(HexEditorGutter$1, { className: isHeader ? classNames.gutterHeader : classNames.gutter, style: styles.gutter }))),
        !(columns || data.length) ? null : (React__default.createElement("div", { className: classNames.byteValues, style: styles.byteValues }, dataOffsets.map(function (offset, columnIndex) {
            var isCurrentColumn = cursorColumn != null && columnIndex === cursorColumn;
            var isCursor = offset === cursorOffset && !isSelecting;
            var isSelected = offset >= selectionStart && offset < selectionEnd;
            var isSelectionStart = offset === selectionStart;
            var isSelectionEnd = offset === selectionEnd - 1;
            var isSelectionCursor = isSelecting && (selectionDirection === SELECTION_DIRECTION_BACKWARD
                ? isSelectionStart
                : isSelectionEnd);
            var value = null;
            if (offset < data.length) {
                value = isCursor && nybbleHigh != null
                    ? (nybbleHigh << 4) | (0x0f & data[offset])
                    : data[offset];
            }
            return (React__default.createElement(HexByteValue, { className: isHeader ? classNames.byteHeader : classNames.byte, classNames: classNames, columnIndex: columnIndex, isCurrentColumn: isCurrentColumn, isCurrentRow: isCurrentRow, isCursor: isCursor && !disabled, isEditing: isEditing && !disabled, isSelected: isSelected && !disabled, isSelectionCursor: isSelectionCursor && !disabled, isSelectionEnd: isSelectionEnd && !disabled, isSelectionStart: isSelectionStart && !disabled, key: offset, offset: offset, rowIndex: rowIndex, setSelectionEnd: setSelectionEnd, setSelectionRange: setSelectionRange, setSelectionStart: setSelectionStart, style: styles.byte, value: value }));
        }))),
        !showAscii ? null : (React__default.createElement(React__default.Fragment, null,
            React__default.createElement(HexEditorGutter$1, { className: isHeader ? classNames.gutterHeader : classNames.gutter, style: styles.gutter }),
            React__default.createElement("div", { className: classNames.asciiValues, style: styles.asciiValues }, dataOffsets.map(function (offset, columnIndex) {
                var isCursor = offset === cursorOffset && !isSelecting;
                var isSelected = offset >= selectionStart && offset < selectionEnd;
                var isSelectionStart = offset === selectionStart;
                var isSelectionEnd = offset === selectionEnd - 1;
                var isSelectionCursor = isSelecting && (selectionDirection === SELECTION_DIRECTION_BACKWARD
                    ? isSelectionStart
                    : isSelectionEnd);
                var value = offset < data.length ? data[offset] : null;
                return (React__default.createElement(HexAsciiValue, { className: isHeader ? classNames.asciiHeader : classNames.ascii, classNames: classNames, columnIndex: columnIndex, formatValue: formatValue, isCursor: isCursor && !disabled, isEditing: isEditing && !disabled, isSelected: isSelected && !disabled, isSelectionCursor: isSelectionCursor && !disabled, isSelectionEnd: isSelectionEnd && !disabled, isSelectionStart: isSelectionStart && !disabled, key: offset, offset: offset, placeholder: asciiPlaceholder, rowIndex: rowIndex, setSelectionEnd: setSelectionEnd, setSelectionRange: setSelectionRange, setSelectionStart: setSelectionStart, style: styles.ascii, value: value }));
            }))))));
};
HexEditorRow.displayName = 'HexEditorRow';
var HexEditorRow$1 = React.memo(React.forwardRef(HexEditorRow), areRowPropsEquivalent);

var HexEditorContext = React.createContext({
    asciiPlaceholder: null,
    classNames: {},
    columns: 1,
    cursorColumn: undefined,
    cursorOffset: 0,
    cursorRow: undefined,
    data: [],
    formatOffset: formatHex,
    formatValue: formatHex,
    isEditing: false,
    nonce: undefined,
    nybbleHigh: null,
    rows: 1,
    selectionAnchor: null,
    selectionDirection: SELECTION_DIRECTION_NONE,
    selectionEnd: 0,
    selectionStart: 0,
    setSelectionEnd: function () { },
    setSelectionRange: function () { },
    setSelectionStart: function () { },
    showAscii: false,
    showRowLabels: false,
    styles: {},
});

var HexEditorBodyRow = function (_a) {
    var rowIndex = _a.index, itemStyle = _a.style;
    var _b = React.useContext(HexEditorContext), asciiPlaceholder = _b.asciiPlaceholder, classNames = _b.classNames, columns = _b.columns, cursorColumn = _b.cursorColumn, cursorOffset = _b.cursorOffset, cursorRow = _b.cursorRow, data = _b.data, formatOffset = _b.formatOffset, formatValue = _b.formatValue, isEditing = _b.isEditing, nonce = _b.nonce, nybbleHigh = _b.nybbleHigh, selectionDirection = _b.selectionDirection, selectionEnd = _b.selectionEnd, selectionStart = _b.selectionStart, setSelectionEnd = _b.setSelectionEnd, setSelectionRange = _b.setSelectionRange, setSelectionStart = _b.setSelectionStart, showAscii = _b.showAscii, showRowLabels = _b.showRowLabels, styles = _b.styles;
    return (React__default.createElement(HexEditorRow$1, { asciiPlaceholder: asciiPlaceholder, className: classNames.row, classNames: classNames, columns: columns, cursorColumn: cursorColumn, cursorOffset: cursorOffset, cursorRow: cursorRow, data: data, formatOffset: formatOffset, formatValue: formatValue, isEditing: isEditing, nonce: nonce, nybbleHigh: nybbleHigh, offset: rowIndex * columns, rowIndex: rowIndex, selectionDirection: selectionDirection, selectionEnd: selectionEnd, selectionStart: selectionStart, setSelectionEnd: setSelectionEnd, setSelectionRange: setSelectionRange, setSelectionStart: setSelectionStart, showAscii: showAscii, showLabel: showRowLabels, style: styles.row ? __assign(__assign({}, itemStyle), styles.row) : itemStyle, styles: styles }));
};
HexEditorBodyRow.displayName = 'HexEditorBodyRow';

var HexEditorBody = function (_a, ref) {
    var bodyChildren = _a.children, _b = _a.className, className = _b === void 0 ? undefined : _b, height = _a.height, _c = _a.itemRenderer, itemRenderer = _c === void 0 ? HexEditorBodyRow : _c, onItemsRendered = _a.onItemsRendered, onScroll = _a.onScroll, overscanCount = _a.overscanCount, rowCount = _a.rowCount, rowHeight = _a.rowHeight, rows = _a.rows, style = _a.style, width = _a.width;
    var innerElementType = React.useMemo(function () {
        if (bodyChildren) {
            return React.forwardRef(function (_a, ref) {
                var listChildren = _a.children, props = __rest(_a, ["children"]);
                return (React__default.createElement("div", __assign({ ref: ref }, props),
                    listChildren,
                    (typeof bodyChildren === 'function'
                        ? bodyChildren()
                        : bodyChildren)));
            });
        }
        return 'div';
    }, [bodyChildren]);
    return (React__default.createElement(reactWindow.FixedSizeList, { className: className, height: height, innerElementType: innerElementType, itemCount: rowCount, itemSize: rowHeight, layout: "vertical", onItemsRendered: onItemsRendered, onScroll: onScroll, overscanCount: overscanCount, ref: ref, style: __assign(__assign({}, style), { overflowY: 'scroll' }), width: width }, itemRenderer));
};
HexEditorBody.displayName = 'HexEditorBody';
var HexEditorBody$1 = React.memo(React.forwardRef(HexEditorBody));

var reducer = function (prevState, mergeState) { return (__assign(__assign({}, prevState), mergeState)); };
var HexEditor = function (_a, ref) {
    var _b;
    var _c = _a.asciiPlaceholder, asciiPlaceholder = _c === void 0 ? React__default.createElement(React__default.Fragment, null, "\u00A0") : _c, _d = _a.autoFocus, autoFocus = _d === void 0 ? false : _d, children = _a.children, className = _a.className, _f = _a.classNames, classNames = _f === void 0 ? CLASS_NAMES : _f, columns = _a.columns, _g = _a.data, data = _g === void 0 ? [] : _g, _h = _a.formatValue, formatValue = _h === void 0 ? byteToAscii : _h, height = _a.height, _j = _a.highlightColumn, highlightColumn = _j === void 0 ? false : _j, _k = _a.inlineStyles, inlineStyles = _k === void 0 ? INLINE_STYLES : _k, _l = _a.inputStyle, inputStyle = _l === void 0 ? INPUT_STYLE : _l, nonce = _a.nonce, onBlur = _a.onBlur, onFocus = _a.onFocus, onItemsRendered = _a.onItemsRendered, onSetValue = _a.onSetValue, overscanCount = _a.overscanCount, _m = _a.readOnly, readOnly = _m === void 0 ? false : _m, rowHeight = _a.rowHeight, rows = _a.rows, _o = _a.showAscii, showAscii = _o === void 0 ? false : _o, _p = _a.showColumnLabels, showColumnLabels = _p === void 0 ? false : _p, _q = _a.showRowLabels, showRowLabels = _q === void 0 ? false : _q, style = _a.style, tabIndex = _a.tabIndex, width = _a.width;
    var _r = React.useReducer(reducer, {
        cursorOffset: 0,
        editMode: EDIT_MODE_HEX,
        isFocused: false,
        nybbleHigh: null,
        nybbleOffset: 0,
        overscanStartIndex: 0,
        overscanStopIndex: 0,
        selectionAnchor: null,
        selectionDirection: SELECTION_DIRECTION_NONE,
        selectionEnd: 0,
        selectionStart: 0,
        viewportRowOffset: 0,
        visibleStartIndex: 0,
        visibleStopIndex: 0,
    }), state = _r[0], setState = _r[1];
    var columnData = React.useMemo(function () { return new Array(columns).fill(0).map(function (_v, i) { return i; }); }, [columns]);
    var rowListRef = React.useRef(null);
    var inputRef = React.useRef(null);
    var stateRef = React.useRef(__assign({ columns: columns,
        data: data,
        readOnly: readOnly,
        rows: rows,
        showAscii: showAscii }, state));
    React.useLayoutEffect(function () {
        stateRef.current = __assign({ columns: columns,
            data: data,
            readOnly: readOnly,
            rows: rows,
            showAscii: showAscii }, state);
    }, [columns, data, data.length, readOnly, rows, showAscii, state]);
    var blur = React.useCallback(function () {
        if (inputRef.current) {
            inputRef.current.blur();
        }
    }, []);
    var focus = React.useCallback(function () {
        if (inputRef.current) {
            inputRef.current.focus();
            inputRef.current.setSelectionRange(0, inputRef.current.value.length);
        }
    }, []);
    var setSelectionRange = React.useCallback(function (start, end, direction, takeFocus) {
        var _a;
        if (takeFocus) {
            focus();
        }
        var _b = stateRef.current, currentData = _b.data, currentEditMode = _b.editMode, prevSelectionStart = _b.selectionStart, prevSelectionEnd = _b.selectionEnd, prevSelectionDirection = _b.selectionDirection;
        var dataLength = data.length;
        var selectionStart = start;
        var selectionEnd = end;
        var selectionDirection = direction;
        if (selectionStart == null) {
            // extend selection from anchor
            selectionStart = prevSelectionDirection === SELECTION_DIRECTION_BACKWARD
                ? prevSelectionEnd
                : prevSelectionStart;
        }
        selectionStart = Math.max(0, Math.min(selectionStart || 0, dataLength));
        selectionEnd = selectionEnd == null ? selectionStart : Math.max(0, Math.min(selectionEnd, dataLength));
        // Swap start/end if they are given backwards
        if (selectionEnd < selectionStart) {
            _a = [selectionEnd, selectionStart], selectionStart = _a[0], selectionEnd = _a[1];
            if (selectionDirection == null) {
                selectionDirection = SELECTION_DIRECTION_BACKWARD;
            }
        }
        // Default selection direction
        if (selectionDirection == null) {
            selectionDirection = selectionEnd > selectionStart
                ? SELECTION_DIRECTION_FORWARD
                : SELECTION_DIRECTION_NONE;
        }
        var cursorOffset = selectionDirection === SELECTION_DIRECTION_BACKWARD
            ? selectionStart
            : selectionEnd;
        var selectedValue = '';
        for (var i = selectionStart; i < selectionEnd; i += 1) {
            selectedValue += currentEditMode === EDIT_MODE_ASCII
                ? String.fromCharCode(currentData[i])
                : formatHexByte(currentData[i]);
        }
        if (selectionStart === selectionEnd && selectionStart >= dataLength) {
            selectionStart = selectionEnd = dataLength - 1;
        }
        setState({
            cursorOffset: cursorOffset,
            nybbleHigh: null,
            nybbleOffset: 0,
            selectionStart: selectionStart,
            selectionEnd: selectionEnd,
            selectionDirection: selectionDirection,
        });
        try {
            if (inputRef.current) {
                inputRef.current.value = selectedValue;
                inputRef.current.setSelectionRange(0, selectedValue.length);
            }
        }
        catch (e) {
            // shrug
        }
    }, [focus, data.length]);
    React.useEffect(function () {
        if (state.selectionAnchor != null) {
            var handleWindowMouseUp_1 = function (_e) {
                setState({ selectionAnchor: null });
                focus();
            };
            window.addEventListener('mouseup', handleWindowMouseUp_1);
            return function () {
                window.removeEventListener('mouseup', handleWindowMouseUp_1);
            };
        }
    }, [state.selectionAnchor, focus]);
    var setSelectionStart = React.useCallback(function (offset, editMode, _e) {
        var selectionAnchor = stateRef.current.selectionAnchor;
        if (selectionAnchor == null) {
            if (editMode != null) {
                setState({ editMode: editMode });
            }
            setState({ selectionAnchor: offset });
            setSelectionRange(offset, offset, null, false);
        }
    }, [setSelectionRange]);
    var setSelectionEnd = React.useCallback(function (offset, editMode, e) {
        var _a = stateRef.current, prevEditMode = _a.editMode, selectionAnchor = _a.selectionAnchor, selectionEnd = _a.selectionEnd, selectionStart = _a.selectionStart;
        if (selectionAnchor != null) {
            if (e && editMode !== prevEditMode) {
                return;
            }
            if (editMode != null) {
                setState({ editMode: editMode });
            }
            var start = Math.min(selectionAnchor, offset);
            var end = Math.max(selectionAnchor, offset);
            var selectionDirection = offset > selectionAnchor
                ? SELECTION_DIRECTION_FORWARD
                : SELECTION_DIRECTION_BACKWARD;
            if (!e || start !== end || selectionStart !== selectionEnd || Math.abs(e.movementX) > 2) {
                setSelectionRange(start, end + 1, selectionDirection, false);
            }
        }
    }, [setSelectionRange]);
    var setValue = React.useCallback(function (offset, value) {
        if (typeof onSetValue === 'function') {
            onSetValue(offset, value);
        }
    }, [onSetValue]);
    var scrollTo = React.useCallback(function (scrollTop) {
        if (rowListRef.current) {
            rowListRef.current.scrollTo(scrollTop);
        }
    }, []);
    var scrollToItem = React.useCallback(function (rowIndex, align) {
        if (rowListRef.current) {
            rowListRef.current.scrollToItem(rowIndex, align);
        }
    }, []);
    React.useImperativeHandle(ref, function () { return ({
        blur: blur,
        focus: focus,
        scrollTo: scrollTo,
        scrollToItem: scrollToItem,
        setSelectionRange: setSelectionRange,
        setValue: setValue,
    }); }, [blur, focus, scrollTo, scrollToItem, setSelectionRange, setValue]);
    var handleBlur = React.useCallback(function (e) {
        setState({ isFocused: false });
        if (onBlur) {
            onBlur(e);
        }
    }, [onBlur]);
    var handleFocus = React.useCallback(function (e) {
        setState({ isFocused: true });
        if (onFocus) {
            onFocus(e);
        }
    }, [onFocus]);
    var handleKeyDown = React.useCallback(function (e) {
        var _a;
        var which = e.which, shiftKey = e.shiftKey, ctrlKey = e.ctrlKey, metaKey = e.metaKey;
        var _b = stateRef.current, columns = _b.columns, data = _b.data, editMode = _b.editMode, nybbleHigh = _b.nybbleHigh, nybbleOffset = _b.nybbleOffset, readOnly = _b.readOnly, rows = _b.rows, selectionStart = _b.selectionStart, selectionEnd = _b.selectionEnd, selectionDirection = _b.selectionDirection, showAscii = _b.showAscii;
        var dataLength = data.length;
        var isSelection = selectionStart !== selectionEnd;
        var isMacKeyboard = isMacLike();
        var offsetAmounts = (_a = {},
            _a[keycodeJs.KEY_DOWN] = columns,
            _a[keycodeJs.KEY_LEFT] = 1,
            _a[keycodeJs.KEY_PAGE_DOWN] = rows * columns,
            _a[keycodeJs.KEY_PAGE_UP] = rows * columns,
            _a[keycodeJs.KEY_RIGHT] = 1,
            _a[keycodeJs.KEY_UP] = columns,
            _a);
        switch (true) {
            // Select all
            case !isMacKeyboard && ctrlKey && which === keycodeJs.KEY_A:
            case isMacKeyboard && metaKey && which === keycodeJs.KEY_A: {
                setSelectionRange(0, dataLength);
                e.preventDefault();
                return;
            }
            // Go to first character
            case isMacKeyboard && metaKey && which === keycodeJs.KEY_UP:
            case !isMacKeyboard && ctrlKey && which === keycodeJs.KEY_HOME: {
                if (shiftKey) {
                    var end = selectionDirection === SELECTION_DIRECTION_BACKWARD
                        ? selectionEnd
                        : selectionStart;
                    setSelectionRange(0, end, SELECTION_DIRECTION_BACKWARD);
                }
                else {
                    setSelectionRange(0);
                }
                e.preventDefault();
                return;
            }
            // Go to last character
            case isMacKeyboard && metaKey && which === keycodeJs.KEY_DOWN:
            case !isMacKeyboard && ctrlKey && which === keycodeJs.KEY_END: {
                if (shiftKey) {
                    var start = selectionDirection === SELECTION_DIRECTION_BACKWARD
                        ? selectionEnd
                        : selectionStart;
                    setSelectionRange(start, dataLength, SELECTION_DIRECTION_FORWARD);
                }
                else {
                    setSelectionRange(dataLength - 1);
                }
                e.preventDefault();
                return;
            }
            // Toggle between hex and ascii panes
            case (which === keycodeJs.KEY_TAB): {
                if (!shiftKey && showAscii && editMode === EDIT_MODE_HEX) {
                    setState({ editMode: EDIT_MODE_ASCII });
                    e.preventDefault();
                }
                else if (shiftKey && editMode === EDIT_MODE_ASCII) {
                    setState({ editMode: EDIT_MODE_HEX });
                    e.preventDefault();
                }
                return;
            }
            // Go to start of line
            case isMacKeyboard && ctrlKey && which === keycodeJs.KEY_A:
            case isMacKeyboard && metaKey && which === keycodeJs.KEY_LEFT:
            case which === keycodeJs.KEY_HOME: {
                var selectionAnchor = selectionDirection === SELECTION_DIRECTION_BACKWARD
                    ? selectionStart
                    : selectionEnd;
                if (shiftKey) {
                    var cursorPosition = columns * Math.floor(Math.max(0, (selectionAnchor - 1)) / columns);
                    if (selectionDirection === SELECTION_DIRECTION_BACKWARD) {
                        setSelectionRange(selectionEnd, cursorPosition);
                    }
                    else {
                        setSelectionRange(selectionStart, cursorPosition);
                    }
                }
                else {
                    var cursorPosition = columns * Math.floor(selectionAnchor / columns);
                    setSelectionRange(cursorPosition);
                }
                e.preventDefault();
                return;
            }
            // Go to end of line
            case isMacKeyboard && ctrlKey && which === keycodeJs.KEY_E:
            case isMacKeyboard && metaKey && which === keycodeJs.KEY_RIGHT:
            case which === keycodeJs.KEY_END: {
                var selectionAnchor = selectionDirection === SELECTION_DIRECTION_BACKWARD
                    ? selectionStart
                    : selectionEnd;
                if (shiftKey) {
                    var cursorPosition = columns * (Math.floor(selectionAnchor / columns) + 1);
                    if (selectionDirection === SELECTION_DIRECTION_BACKWARD) {
                        setSelectionRange(selectionEnd, cursorPosition);
                    }
                    else {
                        setSelectionRange(selectionStart, cursorPosition);
                    }
                }
                else {
                    var cursorPosition = columns * (Math.floor(selectionAnchor / columns) + 1) - 1;
                    setSelectionRange(Math.min(cursorPosition, dataLength - 1));
                }
                e.preventDefault();
                return;
            }
            // Ignore modified keys
            case ctrlKey || metaKey:
                return;
            // Go back one row or column
            case which === keycodeJs.KEY_PAGE_UP:
            case which === keycodeJs.KEY_UP:
            case which === keycodeJs.KEY_LEFT: {
                var offset = offsetAmounts[which] || 1;
                if (shiftKey) {
                    if (selectionDirection === SELECTION_DIRECTION_BACKWARD) {
                        setSelectionRange(selectionEnd, selectionStart - offset);
                    }
                    else {
                        setSelectionRange(selectionStart, selectionEnd - offset);
                    }
                }
                else {
                    var cursorPosition = isSelection
                        ? selectionStart
                        : selectionStart - offset;
                    setSelectionRange(Math.max(0, cursorPosition));
                }
                e.preventDefault();
                return;
            }
            // Go forward one row or column
            case which === keycodeJs.KEY_PAGE_DOWN:
            case which === keycodeJs.KEY_DOWN:
            case which === keycodeJs.KEY_RIGHT: {
                var offset = offsetAmounts[which] || 1;
                if (shiftKey) {
                    if (selectionDirection === SELECTION_DIRECTION_BACKWARD) {
                        setSelectionRange(selectionEnd, selectionStart + offset);
                    }
                    else {
                        setSelectionRange(selectionStart, selectionEnd + offset);
                    }
                }
                else {
                    var cursorPosition = isSelection
                        ? selectionEnd - 1
                        : selectionEnd + offset;
                    setSelectionRange(Math.min(cursorPosition, data.length - 1));
                }
                e.preventDefault();
                return;
            }
            // Clear previous character
            case which === keycodeJs.KEY_BACK_SPACE: {
                if (!readOnly) {
                    if (nybbleOffset && nybbleHigh != null) {
                        setState({
                            nybbleHigh: null,
                            nybbleOffset: 0,
                        });
                    }
                    else if (shiftKey) {
                        setValue(selectionEnd, 0x00);
                        setSelectionRange(selectionEnd);
                    }
                    else {
                        setValue(selectionEnd - 1, 0x00);
                        setSelectionRange(selectionEnd - 1);
                    }
                }
                e.preventDefault();
                return;
            }
            // Clear next character
            case which === keycodeJs.KEY_DELETE: {
                if (!readOnly) {
                    if (nybbleOffset && nybbleHigh != null) {
                        setState({
                            nybbleHigh: null,
                            nybbleOffset: 0,
                        });
                    }
                    else if (shiftKey) {
                        setValue(selectionEnd, 0x00);
                        setSelectionRange(selectionEnd);
                    }
                    else {
                        setValue(selectionEnd, 0x00);
                        setSelectionRange(selectionEnd + 1);
                    }
                }
                e.preventDefault();
                return;
            }
            // Edit hex value
            case editMode === EDIT_MODE_HEX && which in KEY_VALUES: {
                if (!readOnly) {
                    var nybbleValue = KEY_VALUES[which];
                    if (nybbleOffset && nybbleHigh != null) {
                        var value = (nybbleHigh << 4) | nybbleValue;
                        setValue(selectionEnd, value);
                        setSelectionRange(Math.min(selectionEnd + 1, dataLength - 1));
                    }
                    else {
                        if (isSelection) {
                            setSelectionRange((selectionDirection === SELECTION_DIRECTION_BACKWARD
                                ? selectionStart
                                : selectionEnd - 1));
                        }
                        setState({
                            nybbleOffset: 1,
                            nybbleHigh: nybbleValue,
                        });
                    }
                }
                e.preventDefault();
                return;
            }
            // Edit ascii value
            case editMode === EDIT_MODE_ASCII: {
                if (!readOnly) {
                    var key = Keycoder.fromEvent(e.nativeEvent);
                    if (key.isPrintableCharacter && key.charCode != null) {
                        var value = shiftKey ? key.shift.charCode : key.charCode;
                        if (value != null) {
                            setValue(selectionEnd, value);
                            setSelectionRange(Math.min(selectionEnd + 1, dataLength - 1));
                        }
                    }
                }
                e.preventDefault();
                return;
            }
            // Ignore
            default:
                return;
        }
    }, [setValue, setSelectionRange]);
    var handlePaste = React.useCallback(function (e) {
        var _a = stateRef.current, cursorOffset = _a.cursorOffset, data = _a.data, currentEditMode = _a.editMode, readOnly = _a.readOnly;
        var dataLength = data.length;
        var maxOffset = dataLength - cursorOffset;
        e.preventDefault();
        if (readOnly) {
            return;
        }
        var clipboardText = e.clipboardData.getData('Text');
        var values = currentEditMode === EDIT_MODE_ASCII
            ? clipboardText.split('').map(function (v) { return v.charCodeAt(0); })
            : (clipboardText.replace(/[^0-9a-f]/gi, '').match(/.{2}/g) || []).map(function (v) { return parseInt(v, 16); });
        values.forEach(function (value, i) {
            if (i < maxOffset) {
                setValue(cursorOffset + i, value);
            }
        });
        setSelectionRange(Math.min(cursorOffset + values.length, dataLength - 1));
    }, [setValue, setSelectionRange]);
    var handleItemsRendered = React.useCallback(function (props) {
        setState(props);
        if (onItemsRendered) {
            onItemsRendered(props);
        }
    }, [onItemsRendered]);
    React.useLayoutEffect(function () {
        if (autoFocus) {
            focus();
        }
    }, [autoFocus, focus]);
    React.useLayoutEffect(function () {
        if (rowListRef.current) {
            var _a = stateRef.current, visibleStartIndex = _a.visibleStartIndex, visibleStopIndex = _a.visibleStopIndex;
            var rowIndex = Math.floor(state.cursorOffset / columns);
            if (rowIndex <= visibleStartIndex) {
                rowListRef.current.scrollToItem(rowIndex, 'center');
            }
            else if (rowIndex >= visibleStopIndex) {
                rowListRef.current.scrollToItem(rowIndex, 'center');
            }
        }
    }, [columns, state.cursorOffset]);
    var rowCount = React.useMemo(function () { return Math.ceil(data.length / columns); }, [data.length, columns]);
    var formatOffset = React.useMemo(function () {
        var padToLength = 2 * Math.ceil(formatHex(Math.max(0, data.length - 1)).length / 2);
        return function (offset) { return formatHex(offset, padToLength); };
    }, [data.length]);
    var _s = React.useMemo(function () { return ({
        formatHeaderOffset: function () { return formatOffset(0).replace(/./g, '\u00A0'); },
        formatHeaderValue: function () { return '\u00A0'; },
    }); }, [formatOffset]), formatHeaderOffset = _s.formatHeaderOffset, formatHeaderValue = _s.formatHeaderValue;
    var _t = React.useMemo(function () {
        var isForwardSelection = (state.selectionStart !== state.selectionEnd
            && state.selectionDirection !== SELECTION_DIRECTION_BACKWARD);
        var nextCursorColumn = isForwardSelection
            ? (state.cursorOffset - 1) % columns
            : state.cursorOffset % columns;
        var nextCursorRow = isForwardSelection
            ? Math.floor((state.cursorOffset - 1) / columns)
            : Math.floor(state.cursorOffset / columns);
        return {
            cursorColumn: nextCursorColumn,
            cursorRow: nextCursorRow,
        };
    }, [
        columns,
        state.cursorOffset,
        state.selectionStart,
        state.selectionEnd,
        state.selectionDirection,
    ]), cursorColumn = _t.cursorColumn, cursorRow = _t.cursorRow;
    var editorStyle = React.useMemo(function () { return (style && inlineStyles.editor
        ? __assign(__assign({}, inlineStyles.editor), style) : (style || inlineStyles.editor || undefined)); }, [style, inlineStyles.editor]);
    var headerStyle = React.useMemo(function () { return (__assign(__assign({}, inlineStyles.header), { height: rowHeight, width: width })); }, [inlineStyles.header, rowHeight, width]);
    var bodyStyle = React.useMemo(function () { return (__assign(__assign({}, inlineStyles.body), { overflowY: 'scroll' })); }, [inlineStyles.body]);
    var hexEditorContext = React.useMemo(function () { return ({
        asciiPlaceholder: asciiPlaceholder,
        classNames: classNames,
        columns: columns,
        cursorColumn: highlightColumn ? cursorColumn : undefined,
        cursorOffset: state.cursorOffset,
        cursorRow: cursorRow,
        data: data,
        formatOffset: formatOffset,
        formatValue: formatValue,
        isEditing: !!state.nybbleOffset,
        nonce: nonce,
        nybbleHigh: state.nybbleHigh,
        rows: rows,
        selectionAnchor: state.selectionAnchor,
        selectionDirection: state.selectionDirection,
        selectionEnd: state.selectionEnd,
        selectionStart: state.selectionStart,
        setSelectionEnd: setSelectionEnd,
        setSelectionRange: setSelectionRange,
        setSelectionStart: setSelectionStart,
        showAscii: showAscii,
        showRowLabels: showRowLabels,
        styles: inlineStyles,
    }); }, [
        asciiPlaceholder,
        classNames,
        columns,
        cursorColumn,
        cursorRow,
        data,
        formatOffset,
        formatValue,
        highlightColumn,
        inlineStyles,
        nonce,
        rows,
        setSelectionEnd,
        setSelectionRange,
        setSelectionStart,
        showAscii,
        showRowLabels,
        state.cursorOffset,
        state.nybbleHigh,
        state.nybbleOffset,
        state.selectionAnchor,
        state.selectionDirection,
        state.selectionEnd,
        state.selectionStart,
    ]);
    return (React__default.createElement(HexEditorContext.Provider, { value: hexEditorContext },
        React__default.createElement("div", { className: joinClassNames(className, (_b = {},
                _b[classNames.editAscii || ''] = state.editMode === EDIT_MODE_ASCII,
                _b[classNames.editHex || ''] = state.editMode === EDIT_MODE_HEX,
                _b[classNames.notFocused || ''] = !state.isFocused && state.selectionAnchor == null,
                _b)), style: editorStyle },
            React__default.createElement("input", { onBlur: handleBlur, onFocus: handleFocus, onKeyDown: handleKeyDown, onPaste: handlePaste, ref: inputRef, style: inputStyle || undefined, tabIndex: tabIndex, type: "text" }),
            !showColumnLabels ? null : (React__default.createElement("div", { className: classNames.header, style: headerStyle },
                React__default.createElement(HexEditorRow$1, { className: classNames.rowHeader, classNames: classNames, columns: columns, cursorColumn: cursorColumn, data: columnData, disabled: true, formatOffset: formatHeaderOffset, formatValue: formatHeaderValue, isHeader: true, labelOffset: data.length, nonce: nonce, showAscii: showAscii, showLabel: showRowLabels, style: inlineStyles.row, styles: inlineStyles }))),
            React__default.createElement(HexEditorBody$1, { className: classNames.body, height: showColumnLabels ? height - rowHeight : height, onItemsRendered: handleItemsRendered, overscanCount: overscanCount || rows, rowCount: rowCount, rowHeight: rowHeight, rows: rows, ref: rowListRef, style: bodyStyle, width: width }, children))));
};
HexEditor.displayName = 'HexEditor';
var HexEditor$1 = React.memo(React.forwardRef(HexEditor));

var HexEditorMeasureRow = function (_a) {
    var asciiPlaceholder = _a.asciiPlaceholder, asciiValue = _a.asciiValue, explicitAsciiWidth = _a.asciiWidth, explicitByteWidth = _a.byteWidth, className = _a.className, _b = _a.classNames, classNames = _b === void 0 ? EMPTY_CLASSNAMES : _b, formatOffset = _a.formatOffset, formatValue = _a.formatValue, explicitGutterWidth = _a.gutterWidth, _c = _a.styles, styles = _c === void 0 ? EMPTY_INLINE_STYLES : _c, explicitLabelWidth = _a.labelWidth, offset = _a.offset, onMeasure = _a.onMeasure, explicitRowHeight = _a.rowHeight, style = _a.style, _d = _a.value, value = _d === void 0 ? 0 : _d;
    var measureContainerRef = React.useRef(null);
    var measureGutterRef = React.useRef(null);
    var measureLabelRef = React.useRef(null);
    var measureByteRef = React.useRef(null);
    var measureAsciiRef = React.useRef(null);
    React.useLayoutEffect(function () {
        var scrollbarWidth = 0;
        var gutterWidth = 0;
        var asciiWidth = 0;
        var byteWidth = 0;
        var labelWidth = 0;
        var rowHeight = 0;
        if (measureContainerRef.current) {
            scrollbarWidth = getScrollbarSize(measureContainerRef.current)[0];
        }
        if (measureGutterRef.current) {
            var gutterRect = measureGutterRef.current.getBoundingClientRect();
            gutterWidth = gutterRect.width;
            rowHeight = Math.max(rowHeight, gutterRect.height);
        }
        if (measureAsciiRef.current) {
            var asciiRect = measureAsciiRef.current.getBoundingClientRect();
            asciiWidth = asciiRect.width;
            rowHeight = Math.max(rowHeight, asciiRect.height);
        }
        if (measureByteRef.current) {
            var byteRect = measureByteRef.current.getBoundingClientRect();
            byteWidth = byteRect.width;
            rowHeight = Math.max(rowHeight, byteRect.height);
        }
        if (measureLabelRef.current) {
            var labelRect = measureLabelRef.current.getBoundingClientRect();
            labelWidth = labelRect.width;
            rowHeight = Math.max(rowHeight, labelRect.height);
        }
        if (onMeasure) {
            onMeasure({
                asciiWidth: asciiWidth,
                byteWidth: byteWidth,
                gutterWidth: gutterWidth,
                labelWidth: labelWidth,
                rowHeight: rowHeight,
                scrollbarWidth: scrollbarWidth,
            });
        }
    }, [onMeasure]);
    return (React__default.createElement("div", { className: className, style: style || undefined, ref: measureContainerRef },
        React__default.createElement(HexEditorGutter$1, { className: classNames.gutter, ref: measureGutterRef, style: __assign({ width: explicitGutterWidth, height: explicitRowHeight }, styles.gutter) }),
        React__default.createElement(HexOffsetLabel$1, { className: classNames.offsetLabel, formatOffset: formatOffset, ref: measureLabelRef, offset: offset, style: __assign({ width: explicitLabelWidth, height: explicitRowHeight }, styles.offsetLabel) }),
        React__default.createElement(HexByteValue, { className: classNames.byte, classNames: classNames, ref: measureByteRef, style: __assign({ width: explicitByteWidth, height: explicitRowHeight }, styles.byte), value: value }),
        React__default.createElement(HexAsciiValue, { className: classNames.ascii, classNames: classNames, formatValue: formatValue, placeholder: asciiPlaceholder, ref: measureAsciiRef, style: __assign({ width: explicitAsciiWidth, height: explicitRowHeight }, styles.ascii), value: asciiValue == null ? value : asciiValue })));
};
HexEditorMeasureRow.displayName = 'HexEditorMeasureRow';

var reducer$1 = function (prevState, mergeState) { return (__assign(__assign({}, prevState), mergeState)); };
var AutoSizeHexEditor = function (_a, ref) {
    var asciiPlaceholder = _a.asciiPlaceholder, explicitAsciiWidth = _a.asciiWidth, explicitByteWidth = _a.byteWidth, _b = _a.classNames, classNames = _b === void 0 ? CLASS_NAMES : _b, explicitColumns = _a.columns, explicitGutterWidth = _a.gutterWidth, explicitHeight = _a.height, _c = _a.inlineStyles, inlineStyles = _c === void 0 ? INLINE_STYLES : _c, explicitLabelWidth = _a.labelWidth, _d = _a.measureStyle, measureStyle = _d === void 0 ? MEASURE_STYLE : _d, explicitRowHeight = _a.rowHeight, explicitRows = _a.rows, explicitScrollbarWidth = _a.scrollbarWidth, explicitWidth = _a.width, props = __rest(_a, ["asciiPlaceholder", "asciiWidth", "byteWidth", "classNames", "columns", "gutterWidth", "height", "inlineStyles", "labelWidth", "measureStyle", "rowHeight", "rows", "scrollbarWidth", "width"]);
    var _e = React.useReducer(reducer$1, {
        asciiWidth: explicitAsciiWidth || 10,
        byteWidth: explicitByteWidth || 20,
        columns: explicitColumns || 0x10,
        gutterWidth: explicitGutterWidth || 0,
        labelWidth: explicitLabelWidth || 80,
        rowHeight: explicitRowHeight || 20,
        rows: explicitRows || 0x10,
        scrollbarWidth: explicitScrollbarWidth || 0,
    }), state = _e[0], setState = _e[1];
    var handleMeasure = React.useCallback(function (_a) {
        var asciiWidth = _a.asciiWidth, byteWidth = _a.byteWidth, gutterWidth = _a.gutterWidth, labelWidth = _a.labelWidth, rowHeight = _a.rowHeight, scrollbarWidth = _a.scrollbarWidth;
        setState({
            asciiWidth: explicitAsciiWidth == null ? asciiWidth : explicitAsciiWidth,
            byteWidth: explicitByteWidth == null ? byteWidth : explicitByteWidth,
            gutterWidth: explicitGutterWidth == null ? gutterWidth : explicitGutterWidth,
            labelWidth: explicitLabelWidth == null ? labelWidth : explicitLabelWidth,
            rowHeight: explicitRowHeight == null ? rowHeight : explicitRowHeight,
            scrollbarWidth: explicitScrollbarWidth == null ? scrollbarWidth : explicitScrollbarWidth,
        });
    }, [
        explicitAsciiWidth,
        explicitByteWidth,
        explicitGutterWidth,
        explicitLabelWidth,
        explicitRowHeight,
        explicitScrollbarWidth,
    ]);
    var formatOffset = React.useMemo(function () {
        var padToLength = 2 * Math.ceil(formatHex(Math.max(0, props.data.length - 1)).length / 2);
        return function (offset) { return formatHex(offset, padToLength); };
    }, [props.data.length]);
    var measureStyles = React.useMemo(function () { return ({
        ascii: __assign(__assign({}, measureStyle), inlineStyles.ascii),
        byte: __assign(__assign({}, measureStyle), inlineStyles.byte),
        gutter: __assign(__assign({}, measureStyle), inlineStyles.gutter),
        offsetLabel: __assign(__assign({}, measureStyle), inlineStyles.offsetLabel),
    }); }, [inlineStyles, measureStyle]);
    return (React__default.createElement(React__default.Fragment, null,
        React__default.createElement(HexEditorMeasureRow, { asciiPlaceholder: asciiPlaceholder, asciiValue: 0x41, asciiWidth: explicitAsciiWidth, byteWidth: explicitByteWidth, className: props.className, classNames: classNames, formatOffset: formatOffset, formatValue: props.formatValue, gutterWidth: explicitGutterWidth, labelWidth: explicitLabelWidth, offset: props.data.length, onMeasure: handleMeasure, style: measureStyle, styles: measureStyles, value: 0x00 }),
        React__default.createElement(AutoSizer, { disableWidth: explicitWidth != null || explicitColumns != null, disableHeight: explicitHeight != null || explicitRows != null }, function (_a) {
            var autoSizerWidth = _a.width, autoSizerHeight = _a.height;
            // Horizontal
            var width = explicitWidth == null ? autoSizerWidth : explicitWidth;
            var columns = explicitColumns;
            if (columns != null && width == null) {
                // Calculate width from the columns and component measurements
                width = state.scrollbarWidth;
                if (props.showRowLabels) {
                    width += state.labelWidth + state.gutterWidth;
                }
                width += columns * state.byteWidth;
                if (props.showAscii) {
                    width += (columns * state.asciiWidth) + state.gutterWidth;
                }
                width = Math.ceil(width);
            }
            else if (width != null) {
                // Determine the number of columns using the width
                var remainingWidth = width - state.scrollbarWidth;
                if (props.showRowLabels) {
                    remainingWidth -= state.labelWidth + state.gutterWidth;
                }
                if (props.showAscii) {
                    remainingWidth -= state.gutterWidth;
                }
                var columnMinimumWidth = props.showAscii
                    ? state.asciiWidth + state.byteWidth
                    : state.byteWidth;
                columns = Math.max(1, Math.floor(remainingWidth / columnMinimumWidth));
            }
            else {
                console.warn('Horizontal size inference failed!');
                columns = 1;
            }
            // Vertical
            var height = explicitHeight == null ? autoSizerHeight : explicitHeight;
            var rows = explicitRows;
            var rowHeight = explicitRowHeight == null ? state.rowHeight : explicitRowHeight;
            if (rows != null && height == null) {
                // Calculate height from the columns and component measurements
                height = rows * rowHeight;
                if (props.showColumnLabels) {
                    height += rowHeight;
                }
                height = Math.ceil(height);
            }
            else if (height != null) {
                // Determine the number of rows using the height
                rows = Math.max(1, height && rowHeight && Math.floor(height / rowHeight));
                if (rows && props.showColumnLabels) {
                    rows -= 1;
                }
            }
            else {
                console.warn('Vertical size inference failed!');
                rows = 1;
            }
            return (React__default.createElement(HexEditor$1, __assign({ asciiPlaceholder: asciiPlaceholder, classNames: classNames, columns: columns, height: height, inlineStyles: inlineStyles, ref: ref, rowHeight: rowHeight, rows: rows, width: width }, props, { style: __assign(__assign({}, props.style), { width: width,
                    height: height }) })));
        })));
};
AutoSizeHexEditor.displayName = 'AutoSizeHexEditor';
var AutoSizeHexEditor$1 = React.memo(React.forwardRef(AutoSizeHexEditor));

var hexEditorTheme = {
    asciiPaddingX: 0,
    bytePaddingX: '0.1em',
    rowPaddingY: '0.1em',
    colorBackground: '#fff',
    colorBackgroundColumnEven: '#fff',
    colorBackgroundColumnOdd: '#f6f8fa',
    colorBackgroundCursor: '#f1f8ff',
    colorBackgroundCursorHighlight: '#c8e1ff',
    colorBackgroundEven: '#fff',
    colorBackgroundInactiveCursor: '#fffbdd',
    colorBackgroundInactiveCursorHighlight: '#fffbdd',
    colorBackgroundInactiveSelection: '#e6ebf1',
    colorBackgroundInactiveSelectionCursor: '#e6ebf1',
    colorBackgroundLabel: '#fff',
    colorBackgroundLabelCurrent: '#fff',
    colorBackgroundOdd: '#f6f8fa',
    colorBackgroundRowEven: '#fff',
    colorBackgroundRowOdd: '#f6f8fa',
    colorBackgroundSelection: '#0366d6',
    colorBackgroundSelectionCursor: '#005cc5',
    colorScrollbackTrack: '#f6f8fa',
    colorScrollbackThumb: '#c6cbd1',
    colorScrollbackThumbHover: '#959da5',
    colorText: '#24292e',
    colorTextColumnEven: '#24292e',
    colorTextColumnOdd: '#24292e',
    colorTextCursor: '#1074e7',
    colorTextCursorHighlight: '#0366d6',
    colorTextEven: '#24292e',
    colorTextInactiveCursor: '#735c0f',
    colorTextInactiveCursorHighlight: '#735c0f',
    colorTextInactiveSelection: '#586069',
    colorTextInactiveSelectionCursor: '#586069',
    colorTextLabel: '#c6cbd1',
    colorTextLabelCurrent: '#676a6c',
    colorTextOdd: '#24292e',
    colorTextRowEven: '#24292e',
    colorTextRowOdd: '#24292e',
    colorTextSelection: '#fff',
    colorTextSelectionCursor: '#fff',
    fontFamily: 'monospace',
    fontSize: '16px',
    gutterWidth: '0.5em',
    cursorBlinkSpeed: '0.5s',
    labelPaddingX: '0.5em',
    scrollWidth: 'auto',
    textTransform: 'uppercase',
};

var hexEditorTheme$1 = function (key) {
    return function (_a) {
        var _b = _a.theme.hexEditor, hexEditor = _b === void 0 ? hexEditorTheme : _b;
        var value = hexEditor[key] || hexEditorTheme[key];
        return typeof value === 'number' ? value + "px" : value;
    };
};
var hexEditorStyles = styled.css(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  font-family: ", ";\n  font-size: ", ";\n\n  color: ", ";\n  background-color: ", ";\n\n  @keyframes highlight-animation {\n    50% {\n      background-color: ", ";\n      color: ", ";\n    }\n  }\n\n  @keyframes highlight-animation-unfocused {\n    50% {\n      background-color: ", ";\n      color: ", ";\n    }\n  }\n\n  &::selection {\n    background-color: transparent;\n  }\n\n  *::selection {\n    background-color: transparent;\n  }\n\n  /* Layout & Sizing */\n  .gutter,\n  .gutterHeader {\n    width: ", ";\n    padding-top: ", ";\n    padding-bottom: ", ";\n  }\n\n  .hexEditorHeader,\n  .hexEditorBody {\n    min-width: 100%;\n    overflow-x: hidden;\n    overflow-y: scroll;\n    box-sizing: border-box;\n  }\n\n  [data-measure-scrollbar],\n  .hexEditorHeader,\n  .hexEditorBody {\n    &::-webkit-scrollbar {\n      width: ", ";\n      height: 0;\n    }\n\n    &::-webkit-scrollbar-thumb {\n      width: ", ";\n      background-color: ", ";\n\n      &:hover {\n        background-color: ", ";\n      }\n    }\n\n    &::-webkit-scrollbar-track {\n      width: ", ";\n      background-color: ", ";\n    }\n\n    &::-webkit-scrollbar-button {\n      width: ", ";\n      background-color: ", ";\n      height: 0;\n    }\n  }\n\n  .hexEditorRow,\n  .hexEditorRowHeader {\n    display: flex;\n    flex-direction: row;\n    justify-content: flex-start;\n  }\n\n  .byteValues,\n  .asciiValues {\n    display: flex;\n    flex-direction: row;\n    justify-content: flex-start;\n  }\n\n  .asciiValue,\n  .asciiHeader,\n  .byteValue,\n  .byteHeader,\n  .gutter,\n  .gutterHeader,\n  .offsetLabel,\n  .offsetLabelHeader {\n    display: flex;\n    flex-direction: row;\n    flex-shrink: 0;\n    align-items: center;\n    justify-content: center;\n    box-sizing: border-box;\n  }\n\n  .offsetLabel,\n  .offsetLabelHeader {\n    padding: ", " ", ";\n  }\n\n  .byteValue,\n  .byteHeader {\n    text-transform: ", ";\n\n    > .nybbleHighValue,\n    > .nybbleLowValue {\n      padding-top: ", ";\n      padding-bottom: ", ";\n    }\n\n    > .nybbleHighValue {\n      padding-left: ", ";\n    }\n\n    > .nybbleLowValue {\n      padding-right: ", ";\n    }\n  }\n\n  .asciiValue,\n  .asciiHeader {\n    padding: ", " ", ";\n  }\n\n  /* Colors */\n  .gutter,\n  .gutterHeader {\n    background-color: ", ";\n  }\n\n  .offsetLabel,\n  .offsetLabelHeader {\n    background-color: ", ";\n    color: ", ";\n\n    &.currentRow {\n      background-color: ", ";\n      color: ", ";\n    }\n  }\n\n  .byteHeader {\n    background-color: ", ";\n    color: ", ";\n\n    &.currentColumn {\n      background-color: ", ";\n      color: ", ";\n    }\n  }\n\n  .asciiHeader {\n    background-color: ", ";\n    color: ", ";\n  }\n\n  .byteValue {\n    &.even {\n      background-color: ", ";\n      color: ", ";\n\n      &.currentColumn {\n        background-color: ", ";\n        color: ", ";\n      }\n\n      &.currentRow {\n        background-color: ", ";\n        color: ", ";\n      }\n    }\n\n    &.odd {\n      background-color: ", ";\n      color: ", ";\n\n      &.currentColumn {\n        background-color: ", ";\n        color: ", ";\n      }\n\n      &.currentRow {\n        background-color: ", ";\n        color: ", ";\n      }\n    }\n\n    &.cursor > .nybbleHighValue,\n    &.cursor > .nybbleLowValue {\n      background-color: ", ";\n      color: ", ";\n    }\n\n    &.cursorHigh.highlight > .nybbleHighValue,\n    &.cursorLow.highlight > .nybbleLowValue {\n      animation: highlight-animation ", " step-start 0s infinite;\n    }\n\n    &.selection > .nybbleHighValue,\n    &.selection > .nybbleLowValue {\n      background-color: ", ";\n      color: ", ";\n    }\n\n    &.selectionCursor > .nybbleHighValue,\n    &.selectionCursor > .nybbleLowValue {\n      background-color: ", ";\n      color: ", ";\n    }\n  }\n\n  &.editAscii .byteValue,\n  &.notFocused .byteValue {\n    &.cursor > .nybbleHighValue,\n    &.cursor > .nybbleLowValue {\n      background-color: ", ";\n      color: ", ";\n    }\n\n    &.cursorHigh.highlight > .nybbleHighValue,\n    &.cursorLow.highlight > .nybbleLowValue {\n      animation: highlight-animation-unfocused ", " step-start 0s infinite;\n    }\n\n    &.selection > .nybbleHighValue,\n    &.selection > .nybbleLowValue {\n      background-color: ", ";\n      color: ", ";\n    }\n\n    &.selectionCursor > .nybbleHighValue,\n    &.selectionCursor > .nybbleLowValue {\n      background-color: ", ";\n      color: ", ";\n    }\n  }\n\n  .asciiValue {\n    &.cursor {\n      background-color: ", ";\n      color: ", ";\n    }\n\n    &.cursor.highlight {\n      animation: highlight-animation ", " step-start 0s infinite;\n    }\n\n    &.selection {\n      background-color: ", ";\n      color: ", ";\n    }\n\n    &.selectionCursor {\n      background-color: ", ";\n      color: ", ";\n    }\n  }\n\n  &.editHex .asciiValue,\n  &.notFocused .asciiValue {\n    &.cursor {\n      background-color: ", ";\n      color: ", ";\n    }\n\n    &.cursor.highlight {\n      animation: highlight-animation-unfocused ", " step-start 0s infinite;\n    }\n\n    &.selection {\n      background-color: ", ";\n      color: ", ";\n    }\n\n    &.selectionCursor {\n      background-color: ", ";\n      color: ", ";\n    }\n  }\n"], ["\n  font-family: ", ";\n  font-size: ", ";\n\n  color: ", ";\n  background-color: ", ";\n\n  @keyframes highlight-animation {\n    50% {\n      background-color: ", ";\n      color: ", ";\n    }\n  }\n\n  @keyframes highlight-animation-unfocused {\n    50% {\n      background-color: ", ";\n      color: ", ";\n    }\n  }\n\n  &::selection {\n    background-color: transparent;\n  }\n\n  *::selection {\n    background-color: transparent;\n  }\n\n  /* Layout & Sizing */\n  .gutter,\n  .gutterHeader {\n    width: ", ";\n    padding-top: ", ";\n    padding-bottom: ", ";\n  }\n\n  .hexEditorHeader,\n  .hexEditorBody {\n    min-width: 100%;\n    overflow-x: hidden;\n    overflow-y: scroll;\n    box-sizing: border-box;\n  }\n\n  [data-measure-scrollbar],\n  .hexEditorHeader,\n  .hexEditorBody {\n    &::-webkit-scrollbar {\n      width: ", ";\n      height: 0;\n    }\n\n    &::-webkit-scrollbar-thumb {\n      width: ", ";\n      background-color: ", ";\n\n      &:hover {\n        background-color: ", ";\n      }\n    }\n\n    &::-webkit-scrollbar-track {\n      width: ", ";\n      background-color: ", ";\n    }\n\n    &::-webkit-scrollbar-button {\n      width: ", ";\n      background-color: ", ";\n      height: 0;\n    }\n  }\n\n  .hexEditorRow,\n  .hexEditorRowHeader {\n    display: flex;\n    flex-direction: row;\n    justify-content: flex-start;\n  }\n\n  .byteValues,\n  .asciiValues {\n    display: flex;\n    flex-direction: row;\n    justify-content: flex-start;\n  }\n\n  .asciiValue,\n  .asciiHeader,\n  .byteValue,\n  .byteHeader,\n  .gutter,\n  .gutterHeader,\n  .offsetLabel,\n  .offsetLabelHeader {\n    display: flex;\n    flex-direction: row;\n    flex-shrink: 0;\n    align-items: center;\n    justify-content: center;\n    box-sizing: border-box;\n  }\n\n  .offsetLabel,\n  .offsetLabelHeader {\n    padding: ", " ", ";\n  }\n\n  .byteValue,\n  .byteHeader {\n    text-transform: ", ";\n\n    > .nybbleHighValue,\n    > .nybbleLowValue {\n      padding-top: ", ";\n      padding-bottom: ", ";\n    }\n\n    > .nybbleHighValue {\n      padding-left: ", ";\n    }\n\n    > .nybbleLowValue {\n      padding-right: ", ";\n    }\n  }\n\n  .asciiValue,\n  .asciiHeader {\n    padding: ", " ", ";\n  }\n\n  /* Colors */\n  .gutter,\n  .gutterHeader {\n    background-color: ", ";\n  }\n\n  .offsetLabel,\n  .offsetLabelHeader {\n    background-color: ", ";\n    color: ", ";\n\n    &.currentRow {\n      background-color: ", ";\n      color: ", ";\n    }\n  }\n\n  .byteHeader {\n    background-color: ", ";\n    color: ", ";\n\n    &.currentColumn {\n      background-color: ", ";\n      color: ", ";\n    }\n  }\n\n  .asciiHeader {\n    background-color: ", ";\n    color: ", ";\n  }\n\n  .byteValue {\n    &.even {\n      background-color: ", ";\n      color: ", ";\n\n      &.currentColumn {\n        background-color: ", ";\n        color: ", ";\n      }\n\n      &.currentRow {\n        background-color: ", ";\n        color: ", ";\n      }\n    }\n\n    &.odd {\n      background-color: ", ";\n      color: ", ";\n\n      &.currentColumn {\n        background-color: ", ";\n        color: ", ";\n      }\n\n      &.currentRow {\n        background-color: ", ";\n        color: ", ";\n      }\n    }\n\n    &.cursor > .nybbleHighValue,\n    &.cursor > .nybbleLowValue {\n      background-color: ", ";\n      color: ", ";\n    }\n\n    &.cursorHigh.highlight > .nybbleHighValue,\n    &.cursorLow.highlight > .nybbleLowValue {\n      animation: highlight-animation ", " step-start 0s infinite;\n    }\n\n    &.selection > .nybbleHighValue,\n    &.selection > .nybbleLowValue {\n      background-color: ", ";\n      color: ", ";\n    }\n\n    &.selectionCursor > .nybbleHighValue,\n    &.selectionCursor > .nybbleLowValue {\n      background-color: ", ";\n      color: ", ";\n    }\n  }\n\n  &.editAscii .byteValue,\n  &.notFocused .byteValue {\n    &.cursor > .nybbleHighValue,\n    &.cursor > .nybbleLowValue {\n      background-color: ", ";\n      color: ", ";\n    }\n\n    &.cursorHigh.highlight > .nybbleHighValue,\n    &.cursorLow.highlight > .nybbleLowValue {\n      animation: highlight-animation-unfocused ", " step-start 0s infinite;\n    }\n\n    &.selection > .nybbleHighValue,\n    &.selection > .nybbleLowValue {\n      background-color: ", ";\n      color: ", ";\n    }\n\n    &.selectionCursor > .nybbleHighValue,\n    &.selectionCursor > .nybbleLowValue {\n      background-color: ", ";\n      color: ", ";\n    }\n  }\n\n  .asciiValue {\n    &.cursor {\n      background-color: ", ";\n      color: ", ";\n    }\n\n    &.cursor.highlight {\n      animation: highlight-animation ", " step-start 0s infinite;\n    }\n\n    &.selection {\n      background-color: ", ";\n      color: ", ";\n    }\n\n    &.selectionCursor {\n      background-color: ", ";\n      color: ", ";\n    }\n  }\n\n  &.editHex .asciiValue,\n  &.notFocused .asciiValue {\n    &.cursor {\n      background-color: ", ";\n      color: ", ";\n    }\n\n    &.cursor.highlight {\n      animation: highlight-animation-unfocused ", " step-start 0s infinite;\n    }\n\n    &.selection {\n      background-color: ", ";\n      color: ", ";\n    }\n\n    &.selectionCursor {\n      background-color: ", ";\n      color: ", ";\n    }\n  }\n"])), hexEditorTheme$1('fontFamily'), hexEditorTheme$1('fontSize'), hexEditorTheme$1('colorText'), hexEditorTheme$1('colorBackground'), hexEditorTheme$1('colorBackgroundCursorHighlight'), hexEditorTheme$1('colorTextCursorHighlight'), hexEditorTheme$1('colorBackgroundInactiveCursorHighlight'), hexEditorTheme$1('colorTextInactiveCursorHighlight'), hexEditorTheme$1('gutterWidth'), hexEditorTheme$1('rowPaddingY'), hexEditorTheme$1('rowPaddingY'), hexEditorTheme$1('scrollWidth'), hexEditorTheme$1('scrollWidth'), hexEditorTheme$1('colorScrollbackThumb'), hexEditorTheme$1('colorScrollbackThumbHover'), hexEditorTheme$1('scrollWidth'), hexEditorTheme$1('colorScrollbackTrack'), hexEditorTheme$1('scrollWidth'), hexEditorTheme$1('colorScrollbackThumb'), hexEditorTheme$1('rowPaddingY'), hexEditorTheme$1('labelPaddingX'), hexEditorTheme$1('textTransform'), hexEditorTheme$1('rowPaddingY'), hexEditorTheme$1('rowPaddingY'), hexEditorTheme$1('bytePaddingX'), hexEditorTheme$1('bytePaddingX'), hexEditorTheme$1('rowPaddingY'), hexEditorTheme$1('asciiPaddingX'), hexEditorTheme$1('colorBackground'), hexEditorTheme$1('colorBackgroundLabel'), hexEditorTheme$1('colorTextLabel'), hexEditorTheme$1('colorBackgroundLabelCurrent'), hexEditorTheme$1('colorTextLabelCurrent'), hexEditorTheme$1('colorBackgroundLabel'), hexEditorTheme$1('colorTextLabel'), hexEditorTheme$1('colorBackgroundLabelCurrent'), hexEditorTheme$1('colorTextLabelCurrent'), hexEditorTheme$1('colorBackgroundLabel'), hexEditorTheme$1('colorTextLabel'), hexEditorTheme$1('colorBackgroundEven'), hexEditorTheme$1('colorTextEven'), hexEditorTheme$1('colorBackgroundColumnEven'), hexEditorTheme$1('colorTextColumnEven'), hexEditorTheme$1('colorBackgroundRowEven'), hexEditorTheme$1('colorTextRowEven'), hexEditorTheme$1('colorBackgroundOdd'), hexEditorTheme$1('colorTextOdd'), hexEditorTheme$1('colorBackgroundColumnOdd'), hexEditorTheme$1('colorTextColumnOdd'), hexEditorTheme$1('colorBackgroundRowOdd'), hexEditorTheme$1('colorTextRowOdd'), hexEditorTheme$1('colorBackgroundCursor'), hexEditorTheme$1('colorTextCursor'), hexEditorTheme$1('cursorBlinkSpeed'), hexEditorTheme$1('colorBackgroundSelection'), hexEditorTheme$1('colorTextSelection'), hexEditorTheme$1('colorBackgroundSelectionCursor'), hexEditorTheme$1('colorTextSelectionCursor'), hexEditorTheme$1('colorBackgroundInactiveCursor'), hexEditorTheme$1('colorTextInactiveCursor'), hexEditorTheme$1('cursorBlinkSpeed'), hexEditorTheme$1('colorBackgroundInactiveSelection'), hexEditorTheme$1('colorTextInactiveSelection'), hexEditorTheme$1('colorBackgroundInactiveSelectionCursor'), hexEditorTheme$1('colorTextInactiveSelectionCursor'), hexEditorTheme$1('colorBackgroundCursor'), hexEditorTheme$1('colorTextCursor'), hexEditorTheme$1('cursorBlinkSpeed'), hexEditorTheme$1('colorBackgroundSelection'), hexEditorTheme$1('colorTextSelection'), hexEditorTheme$1('colorBackgroundSelectionCursor'), hexEditorTheme$1('colorTextSelectionCursor'), hexEditorTheme$1('colorBackgroundInactiveCursor'), hexEditorTheme$1('colorTextInactiveCursor'), hexEditorTheme$1('cursorBlinkSpeed'), hexEditorTheme$1('colorBackgroundInactiveSelection'), hexEditorTheme$1('colorTextInactiveSelection'), hexEditorTheme$1('colorBackgroundInactiveSelectionCursor'), hexEditorTheme$1('colorTextInactiveSelectionCursor'));
var templateObject_1;

var StyledHexEditor = function (_a, ref) {
    var _b = _a.inlineStyles, inlineStyles = _b === void 0 ? EMPTY_INLINE_STYLES : _b, restProps = __rest(_a, ["inlineStyles"]);
    return (React__default.createElement(HexEditor$1, __assign({ inlineStyles: inlineStyles, ref: ref }, restProps)));
};
StyledHexEditor.displayName = 'StyledHexEditor';
var StyledHexEditor$1 = styled__default(React.forwardRef(StyledHexEditor))(templateObject_1$1 || (templateObject_1$1 = __makeTemplateObject(["", ""], ["", ""])), hexEditorStyles);
var templateObject_1$1;

var StyledAutoSizeHexEditor = function (_a, ref) {
    var _b = _a.inlineStyles, inlineStyles = _b === void 0 ? EMPTY_INLINE_STYLES : _b, restProps = __rest(_a, ["inlineStyles"]);
    return (React__default.createElement(AutoSizeHexEditor$1, __assign({ inlineStyles: inlineStyles, ref: ref }, restProps)));
};
StyledAutoSizeHexEditor.displayName = 'StyledAutoSizeHexEditor';
var StyledAutoSizeHexEditor$1 = styled__default(React.forwardRef(StyledAutoSizeHexEditor))(templateObject_1$2 || (templateObject_1$2 = __makeTemplateObject(["", ""], ["", ""])), hexEditorStyles);
var templateObject_1$2;

exports.BaseHexEditor = StyledHexEditor$1;
exports.UnstyledBaseHexEditor = HexEditor$1;
exports.UnstyledHexEditor = AutoSizeHexEditor$1;
exports.default = StyledAutoSizeHexEditor$1;
//# sourceMappingURL=index.js.map
