import React, {
    useCallback,
    useRef,
    useState,
} from 'react';

import Typography from '@mui/joy/Typography';
import {
    Button,
    ButtonGroup,
} from '@mui/material';

import { STimer } from '../../assets/styles/componets.styles';

// компонент объявляется как функциональный компонент и обернут в React.memo, 
// что позволяет мемоизировать компонент для оптимизации производительности. 
// Мемоизация гарантирует, что компонента перерисовывается только при изменении 
// пропсов или состояния
const Timer: React.FC = React.memo(() => {
    // состояние таймера (запущен или приостановлен)
    const [isRunning, setIsRunning] = useState(false);
    // текущее время в миллисекундах
    const [time, setTime] = useState(0);
    // ссылка для хранения идентификатора интервала, используемого для
    // обновления времени
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    // функция принимает время в миллисекундах и форматирует его в виде строки
    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60000);
        const seconds = Math.floor((time % 60000) / 1000);
        const milliseconds = time % 1000;
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}:${milliseconds}`;
    };

    // обработчик срабатывает при клике на кнопку "Старт/Пауза". Он проверяет,
    // запущен ли таймер, и либо запускает интервал обновления времени, либо  
    // приостанавливает его. Также он переключает состояние isRunning
    
    // useCallback вернёт мемоизированную версию колбэка, который изменяется только, 
    // если изменяются значения одной из зависимостей. Это полезно при передаче
    // колбэков оптимизированным дочерним компонентам, которые полагаются на равенство
    // ссылок для предотвращения ненужных рендеров (например, shouldComponentUpdate).
    const handleStartPause = useCallback(() => {
        if (isRunning) {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
        } else {
            const startTime = Date.now() - time;
            intervalRef.current = setInterval(() => {
                setTime(Date.now() - startTime);
            }, 10);
        }
        setIsRunning(!isRunning);
    }, [isRunning, time]);

    // обработчик срабатывает при клике на кнопку "Сброс". Он сбрасывает время 
    // и устанавливает состояние isRunning в false
    const handleReset = useCallback(() => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
        setTime(0);
        setIsRunning(false);
    }, []);

    return (
        <STimer>
            <Typography level="h1">Timer</Typography>
            <Typography level="h3">{formatTime(time)}</Typography>
            <ButtonGroup
                disableElevation
                aria-label="Disabled elevation buttons"
            >
                <Button variant="contained" onClick={handleStartPause}>{isRunning ? 'Pause' : 'Start'}</Button>
                <Button variant="outlined" onClick={handleReset}  disabled={isRunning}>Reset</Button>
            </ButtonGroup>
        </STimer>
    );
});

export default Timer;
