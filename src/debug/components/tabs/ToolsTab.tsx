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
                <h4 className="text-xs font-semibold text-gray-7 mb-2">Сессия</h4>
                <button
                    onClick={handleClearSession}
                    className="w-full text-left bg-gray-2 border border-gray-3 hover:bg-gray-3 rounded px-3 py-2 text-xs text-gray-7 font-medium transition-colors duration-200"
                >
                    Удалить jp_session_id + jp_banner_impressions
                </button>
                <p className="text-[11px] text-gray-6 mt-1 leading-snug">
                    В дашборде появится новая сессия. jp_session_id удаляется из sessionStorage, jp_banner_impressions — из localStorage.
                </p>
            </div>

            <div>
                <h4 className="text-xs font-semibold text-gray-7 mb-2">Пользователь</h4>
                <button
                    onClick={handleClearUser}
                    className="w-full text-left bg-gray-2 border border-gray-3 hover:bg-gray-3 rounded px-3 py-2 text-xs text-gray-7 font-medium transition-colors duration-200"
                >
                    Удалить jp_user_id
                </button>
                <p className="text-[11px] text-gray-6 mt-1 leading-snug">
                    Следующий запрос будет считаться новым пользователем. jp_user_id удаляется из localStorage.
                </p>
            </div>

            <div>
                <h4 className="text-xs font-semibold text-gray-7 mb-2">Всё сразу</h4>
                <button
                    onClick={handleClearAll}
                    className="w-full text-left bg-red border border-red hover:bg-red-dark rounded px-3 py-2 text-xs text-red-light-5 font-medium transition-colors duration-200"
                >
                    Clean all
                </button>
                <p className="text-[11px] text-gray-6 mt-1 leading-snug">
                    В дашборде появятся новая сессия и новый пользователь. jp_session_id удаляется из sessionStorage, jp_banner_impressions и jp_user_id — из localStorage.
                </p>
            </div>

            <p className="text-[11px] text-gray-6 leading-snug">
                Во всех случаях текущая сессия не удаляется, а завершится (перестанет быть live) через несколько секунд после клика.
            </p>

            {message && (
                <p className="text-xs text-green-dark font-medium">{message}</p>
            )}
        </div>
    );
};

export default ToolsTab;
