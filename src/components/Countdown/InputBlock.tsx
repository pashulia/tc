import React from 'react';

// пропсы
interface InputBlockProps {
    minutes: number;
    seconds: number;
    onTimeChange: (minutes: number, seconds: number) => void;
    isRunning: boolean;
}

function InputBlock({ minutes, seconds, onTimeChange, isRunning }: InputBlockProps) {
    // функции обработчика событий вызывается при изменении значений минут
    const handleMinutesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newMinutes = parseInt(e.target.value, 10);
        if (!isNaN(newMinutes)) {
            onTimeChange(newMinutes, seconds);
        }
    };
    // функции обработчика событий вызывается при изменении значений секунд
    const handleSecondsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newSeconds = parseInt(e.target.value, 10);
        if (!isNaN(newSeconds)) {
            onTimeChange(minutes, newSeconds);
        }
    };

    return (
        <div>
            <label>
                Minutes:
                <input
                    type="number"
                    value={minutes}
                    onChange={handleMinutesChange}
                    disabled={isRunning}
                    min={0}
                    max={720}
                />
            </label>
            <label>
                Seconds:
                <input
                    type="number"
                    value={seconds}
                    onChange={handleSecondsChange}
                    disabled={isRunning}
                    min={0}
                    max={59}
                />
            </label>
        </div>
    );
}

export default InputBlock;
