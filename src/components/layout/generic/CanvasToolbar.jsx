import React from 'react';
import Icon from '../../common/Icon';

const CanvasToolbar = React.memo(({
    zoomPercent = 100,
    onZoomIn,
    onZoomOut,
    onResetZoom,
    onFitView,
    fitViewTitle = 'Fit Route',
}) => {
    return (
        <div
            className="absolute top-12 right-12 z-999 flex items-center gap-6 bg-white rounded-6 p-6 b-shadow"
            style={{ border: '1px solid var(--tertiary, #e2e8f0)' }}
        >
            <button
                type="button"
                onClick={onZoomOut}
                className="w-28 h-28 flex items-center justify-center rounded-4 border-0 bg-transparent text-dark hover:bg-slate-100 cursor-pointer p-0"
                title="Zoom Out"
            >
                <Icon name="Minus" width="14" height="14" stroke="currentColor" />
            </button>

            <span className="mini-text font-600 text-dark px-6 select-none" style={{ minWidth: 42, textAlign: 'center' }}>
                {zoomPercent}%
            </span>

            <button
                type="button"
                onClick={onZoomIn}
                className="w-28 h-28 flex items-center justify-center rounded-4 border-0 bg-transparent text-dark hover:bg-slate-100 cursor-pointer p-0"
                title="Zoom In"
            >
                <Icon name="Plus" width="14" height="14" stroke="currentColor" />
            </button>

            {(onFitView || onResetZoom) && (
                <>
                    <div style={{ width: 1, height: 16, background: '#e2e8f0', margin: '0 4px' }} />
                    <button
                        type="button"
                        onClick={onFitView || onResetZoom}
                        className="px-8 h-28 flex items-center gap-4 rounded-4 border-0 bg-transparent text-primary hover:bg-slate-100 cursor-pointer mini-text font-500"
                        title={fitViewTitle}
                    >
                        <span>{fitViewTitle}</span>
                    </button>
                </>
            )}
        </div>
    );
});

CanvasToolbar.displayName = 'CanvasToolbar';

export default CanvasToolbar;

