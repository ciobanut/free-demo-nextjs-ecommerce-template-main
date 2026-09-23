'use client';

import React, { useState } from 'react';

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

const ToolsTab: React.FC = () => {
    const [message, setMessage] = useState<string | null>(null);

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

            {message && (
                <p className="text-xs text-green-dark font-medium">{message}</p>
            )}
        </div>
    );
};

export default ToolsTab;
