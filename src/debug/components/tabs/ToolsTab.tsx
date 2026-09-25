'use client';

import React, { useEffect, useState } from 'react';

const clearSession = () => {
    sessionStorage.removeItem('jp_session_id');
    localStorage.removeItem('jp_banner_impressions');
};

const clearUser = () => {
    const cookieDomain = window.location.hostname.replace(/^www\./i, '');

    document.cookie = [
        'jp_user_id=',
        'Path=/',
        'Max-Age=0',
        `Domain=${cookieDomain}`,
        'SameSite=Lax',
    ].join('; ');
};

const DEBUG_KEY = 'jp_debug';

const isDebugEnabled = () => {
    try {
        return localStorage.getItem(DEBUG_KEY) === 'true';
    } catch {
        return false;
    }
};

const ToolsTab: React.FC = () => {
    const [message, setMessage] = useState<string | null>(null);
    const [debugEnabled, setDebugEnabled] = useState(false);

    useEffect(() => {
        setDebugEnabled(isDebugEnabled());
    }, []);

    const handleEnableDebug = () => {
        localStorage.setItem(DEBUG_KEY, 'true');
        setDebugEnabled(true);
        setMessage('Debug enabled. Reload the page to apply.');
    };

    const handleDisableDebug = () => {
        localStorage.removeItem(DEBUG_KEY);
        setDebugEnabled(false);
        setMessage('Debug disabled. Reload the page to apply.');
    };

    const handleClearAll = () => {
        clearSession();
        clearUser();
        setMessage('All data cleared');
        window.location.reload();
    };

    return (
        <div className="p-4 space-y-3">

            <div>
                <h4 className="font-semibold text-gray-7 mb-1">Simulate Being a New Visitor</h4>
                <p className="text-xs text-gray-6 mb-2 leading-snug">
                    Reset this browser's visitor ID and simulate a first-time visitor. The current session is not deleted; it will end (stop being live) a few seconds after clicking.
            </p>
                <button
                    onClick={handleClearAll}
                    className="text-left bg-red border border-red hover:bg-red-dark rounded px-3 py-2 text-xs text-red-light-5 font-medium transition-colors duration-200"
                >
                    Reset Visitor
                </button>
            </div>

            <div>
                <h4 className="font-semibold text-gray-7 mb-1">Widget Debug Logs</h4>
                <p className="text-xs text-gray-6 mb-2 leading-snug">
                    Enable Behavora widget debug messages in the browser console (sets <code>{DEBUG_KEY}</code> in localStorage). Reload the page to apply.
                </p>
                <p className="text-xs text-gray-6 mb-2">
                    Status:{' '}
                    <span className={debugEnabled ? 'text-green-dark font-medium' : 'text-gray-7 font-medium'}>
                        {debugEnabled ? 'Enabled' : 'Disabled'}
                    </span>
                </p>
                <div className="flex gap-2">
                    <button
                        onClick={handleEnableDebug}
                        disabled={debugEnabled}
                        className="bg-blue border border-blue hover:bg-blue-dark rounded px-3 py-2 text-xs text-white font-medium transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Enable Debug
                    </button>
                    <button
                        onClick={handleDisableDebug}
                        disabled={!debugEnabled}
                        className="bg-white border border-gray-3 hover:bg-gray-1 rounded px-3 py-2 text-xs text-gray-7 font-medium transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Disable Debug
                    </button>
                </div>
            </div>

            {message && (
                <p className="text-xs text-green-dark font-medium">{message}</p>
            )}
        </div>
    );
};

export default ToolsTab;
