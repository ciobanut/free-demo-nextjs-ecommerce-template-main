'use client';

import React, { useEffect, useState } from 'react';
import { useEnvironment } from '../../../app/context/EnvironmentContext';
import { getEnvironmentConfig } from '../../../config/environments';

const SIGNAL_MAP: Record<string, { label: string; unit: string | null; tip: string }> = {
    pages_viewed:           { label: 'Просмотрено страниц',   unit: 'стр.', tip: 'Просмотри ещё страниц магазина' },
    session_duration_sec:   { label: 'Время на сайте',         unit: 'сек.', tip: 'Проведи больше времени на сайте' },
    scroll_depth_pct:       { label: 'Глубина прокрутки',      unit: '%',    tip: 'Прокрути страницу ниже' },
has_search_query:       { label: 'Использован поиск',      unit: null,   tip: 'Воспользуйся поиском по магазину' },
    has_added_to_cart:      { label: 'Добавлено в корзину',    unit: null,   tip: 'Добавь товар в корзину' },
    has_added_to_favorites: { label: 'Добавлено в избранное',  unit: null,   tip: 'Добавь товар в избранное' },
    is_returning:           { label: 'Повторный визит',        unit: null,   tip: 'Вернись на сайт ещё раз' },
};

interface Contribution {
    reason: string;
    weight: number;
}

interface PredictData {
    show_banner: boolean;
    probability: number;
    banner_show_threshold: number;
    reason: string;
    signals?: Record<string, unknown>;
    contributions?: Contribution[];
}

const ScoreTab: React.FC = () => {
    const { currentEnvironment } = useEnvironment();
    const envConfig = getEnvironmentConfig(currentEnvironment);
    const [data, setData] = useState<PredictData | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const poll = async () => {
            const sessionId = sessionStorage.getItem('jp_session_id');
            if (!sessionId) {
                setError('Ожидание сессии от виджета...');
                return;
            }
            try {
                const res = await fetch(`${envConfig.apiBaseUrl}/api/v1/predict/${sessionId}`);
                const json = await res.json();
                if (json.success && json.data) {
                    setData(json.data);
                    setError(null);
                } else {
                    setError(json.message || 'Ошибка API');
                }
            } catch {
                setError('Сеть недоступна');
            }
        };

        poll();
        const timer = setInterval(poll, 3000);
        return () => clearInterval(timer);
    }, [envConfig.apiBaseUrl]);

    if (error) {
        return (
            <div className="p-4 text-center text-red-500 text-sm">{error}</div>
        );
    }

    if (!data) {
        return (
            <div className="p-4 text-center text-gray-500 text-sm">
                Загрузка...
            </div>
        );
    }

    const { show_banner, probability, banner_show_threshold, reason, signals, contributions } = data;

    if (!signals || !contributions) {
        return (
            <div className="p-4 text-center text-gray-500 text-sm">
                Данные скора недоступны для этой конфигурации
            </div>
        );
    }

    const scoreInt = Math.round(probability * 100);
    const thresholdInt = Math.round(banner_show_threshold * 100);
    const progressPct = banner_show_threshold > 0
        ? Math.min(100, Math.round((probability / banner_show_threshold) * 100))
        : 0;
    const progressColor = show_banner
        ? 'bg-green-500'
        : progressPct >= 80
            ? 'bg-yellow-500'
            : 'bg-blue-500';

    const positiveContributions = contributions.filter((c) => c.weight > 0);
    const negativeContributions = contributions.filter((c) => c.weight < 0);

    const inactiveSignals = Object.entries(SIGNAL_MAP).filter(([key]) => {
        const val = signals[key];
        return !val || val === 0 || val === false;
    });

    const statusConfig: Record<string, { text: string; color: string }> = {
        below_threshold:   { text: 'Скора пока не хватает для показа баннера', color: 'text-yellow-600' },
        no_eligible_banner:{ text: 'Нет подходящего баннера для твоего профиля', color: 'text-gray-500' },
        already_shown:     { text: 'Баннер уже был показан в этой сессии', color: 'text-blue-600' },
    };
    const status = show_banner
        ? { text: 'Баннер показан ✓', color: 'text-green-600' }
        : statusConfig[reason] ?? { text: reason, color: 'text-gray-500' };

    return (
        <div className="p-4 space-y-4">
            {/* Progress bar */}
            <div>
                <div className="flex justify-between text-xs text-gray-600 mb-1">
                    <span>Скор: <strong>{scoreInt}</strong></span>
                    <span>Порог: <strong>{thresholdInt}</strong></span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                        className={`h-3 rounded-full transition-all duration-300 ${progressColor}`}
                        style={{ width: `${progressPct}%` }}
                    />
                </div>
            </div>

            {/* Already counting */}
            {positiveContributions.length > 0 && (
                <div>
                    <h4 className="text-xs font-semibold text-gray-700 mb-2">Уже засчитано</h4>
                    <div className="space-y-1">
                        {positiveContributions.map((c, i) => (
                            <div
                                key={`${c.reason}-${i}`}
                                className="flex items-center justify-between bg-green-50 border border-green-100 rounded px-3 py-2"
                            >
                                <div className="flex items-center gap-2">
                                    <span className="text-green-600 text-sm">✓</span>
                                    <span className="text-xs text-gray-800">{c.reason}</span>
                                </div>
                                <span className="text-xs text-green-600 font-medium">
                                    +{c.weight.toFixed(2)}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Penalties */}
            {negativeContributions.length > 0 && (
                <div>
                    <h4 className="text-xs font-semibold text-gray-700 mb-2">Штрафы</h4>
                    <div className="space-y-1">
                        {negativeContributions.map((c, i) => (
                            <div
                                key={`${c.reason}-${i}`}
                                className="flex items-center justify-between bg-red-50 border border-red-100 rounded px-3 py-2"
                            >
                                <div className="flex items-center gap-2">
                                    <span className="text-red-500 text-sm">−</span>
                                    <span className="text-xs text-gray-800">{c.reason}</span>
                                </div>
                                <span className="text-xs text-red-500 font-medium">
                                    {c.weight.toFixed(2)}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* What else can help */}
            {inactiveSignals.length > 0 && (
                <div>
                    <h4 className="text-xs font-semibold text-gray-700 mb-2">Что ещё поможет</h4>
                    <div className="space-y-1">
                        {inactiveSignals.map(([key, meta]) => (
                            <div
                                key={key}
                                className="flex items-center gap-2 bg-gray-50 border border-gray-100 rounded px-3 py-2"
                            >
                                <span className="text-gray-400 text-sm flex-shrink-0">○</span>
                                <span className="text-xs text-gray-600">{meta.tip}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Status */}
            <p className={`text-xs font-medium ${status.color}`}>{status.text}</p>
        </div>
    );
};

export default ScoreTab;
