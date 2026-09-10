'use client';

import React, { useState } from 'react';

const clearSession = () => {
    sessionStorage.removeItem('jp_session_id');
    localStorage.removeItem('jp_banner_impressions');
};

const clearUser = () => {
    localStorage.removeItem('jp_user_id');
};

const ToolsTab: React.FC = () => {
    const [message, setMessage] = useState<string | null>(null);

    const handleClearSession = () => {
        clearSession();
        setMessage('Сессия очищена (jp_session_id, jp_banner_impressions)');
    };

    const handleClearUser = () => {
        clearUser();
        setMessage('Пользователь очищен (jp_user_id)');
    };

    const handleClearAll = () => {
        clearSession();
        clearUser();
        setMessage('Все данные очищены');
    };

    return (
        <div className="p-4 space-y-3">
            <div>
                <h4 className="text-xs font-semibold text-gray-700 mb-2">Сессия</h4>
                <button
                    onClick={handleClearSession}
                    className="w-full text-left bg-orange-50 border border-orange-100 hover:bg-orange-100 rounded px-3 py-2 text-xs text-orange-700 font-medium transition-colors duration-200"
                >
                    Удалить jp_session_id + jp_banner_impressions
                </button>
            </div>

            <div>
                <h4 className="text-xs font-semibold text-gray-700 mb-2">Пользователь</h4>
                <button
                    onClick={handleClearUser}
                    className="w-full text-left bg-orange-50 border border-orange-100 hover:bg-orange-100 rounded px-3 py-2 text-xs text-orange-700 font-medium transition-colors duration-200"
                >
                    Удалить jp_user_id
                </button>
            </div>

            <div>
                <h4 className="text-xs font-semibold text-gray-700 mb-2">Всё сразу</h4>
                <button
                    onClick={handleClearAll}
                    className="w-full text-left bg-red-50 border border-red-100 hover:bg-red-100 rounded px-3 py-2 text-xs text-red-700 font-medium transition-colors duration-200"
                >
                    Clean all
                </button>
            </div>

            {message && (
                <p className="text-xs text-green-600 font-medium">{message}</p>
            )}
        </div>
    );
};

export default ToolsTab;
