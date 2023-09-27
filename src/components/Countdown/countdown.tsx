import React, {
    useEffect,
    useState,
} from 'react';

import { Typography } from '@mui/joy';

import { STimer } from '../../assets/styles/componets.styles';
import ControlBlock from './ControlBlock';
import InputBlock from './InputBlock';
import ResultBlock from './ResultBlock';

function Countdown() {
    // перменные для вводы в инпут начальное значение минут и секунд таймера = 0
    const [initialMinutes, setInitialMinutes] = useState(0);
    const [initialSeconds, setInitialSeconds] = useState(0);
    // текущее значение минут и секунд таймера, которое может изменяться во время работы приложения
    const [minutes, setMinutes] = useState(initialMinutes);
    const [seconds, setSeconds] = useState(initialSeconds);
    // общее количество секунд в таймере и вычисляется как initialMinutes * 60
    const [totalSeconds, setTotalSeconds] = useState(initialMinutes * 60);
    // состояние, которое указывает, запущен ли таймер в данный момент или приостановлен
    const [isRunning, setIsRunning] = useState(false);
    // Воспроизведение аудио
    function playAudio() {
        const audioUrl = 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3';
        const audio = new Audio(audioUrl);
        audio.play()
            .then(() => {
            console.log('Аудио воспроизводится');
        })
        .catch((error) => {
            console.error('Произошла ошибка при воспроизведении аудио:', error);
        });
    }

    // следим за изменениями isRunning и totalSeconds. Если таймер запущен (isRunning равен true) и 
    // totalSeconds больше 0, то каждую секунду уменьшаем значение totalSeconds. 
    // Когда totalSeconds достигает 0, таймер останавливается

    // Хук useEffect даёт вам возможность выполнять побочные эффекты после каждого рендера
    useEffect(() => {
        if (isRunning) {
            const timer = setInterval(() => {
                if (totalSeconds > 0) {
                    setTotalSeconds((prevTotalSeconds) => prevTotalSeconds - 1);
                } else {
                    // очищаем интервал и
                    clearInterval(timer);
                    // проигрываем звуковой сигнал
                    playAudio();
                }
            }, 1000);
            return () => clearInterval(timer);
        }
    }, [isRunning, totalSeconds]);

    // функция, которая вызывается при изменении времени через компонент InputBlock. 
    // Она обновляет initialMinutes, initialSeconds, minutes, seconds и totalSeconds в
    // соответствии с новыми значениями минут и секунд
    const handleTimeChange = (newMinutes: number, newSeconds: number) => {
        const newTotalSeconds = newMinutes * 60 + newSeconds;
        setInitialMinutes(newMinutes);
        setInitialSeconds(newSeconds);
        setMinutes(newMinutes);
        setSeconds(newSeconds);
        setTotalSeconds(newTotalSeconds);
    };

    // функция, которая вызывается при нажатии кнопки "Start/Pause". Она переключает
    // состояние isRunning между true и false, что позволяет запустить или приостановить таймер
    const handleStartPause = () => {
        setIsRunning((prevIsRunning) => !prevIsRunning);
    };

    // функция, вызываемая при нажатии кнопки "Reset". Она сбрасывает таймер в начальное состояние,
    // устанавливая значения минут, секунд и общего количества секунд = 0
    const handleReset = () => {
        setIsRunning(false);
        setMinutes(initialMinutes);
        setSeconds(initialSeconds);
        setTotalSeconds(initialMinutes * 60);
    };

    return (
        <STimer>
            <hr/>
            <Typography level="h1">Countdown</Typography>
            <InputBlock
                minutes={minutes}
                seconds={seconds}
                onTimeChange={handleTimeChange}
                isRunning={isRunning}
            />
            <ResultBlock
                totalSeconds={totalSeconds}
                initialMinutes={initialMinutes}
                initialSeconds={initialSeconds}
            />
            <ControlBlock
                isRunning={isRunning}
                onStartPause={handleStartPause}
                onReset={handleReset}
            />
        </STimer>
    );
}

export default Countdown;
