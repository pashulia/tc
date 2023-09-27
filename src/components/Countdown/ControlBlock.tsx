import React from 'react';

import {
    Button,
    ButtonGroup,
} from '@mui/material';

// пропсы
interface ControlBlockProps {
    isRunning: boolean;
    onStartPause: () => void;
    onReset: () => void;
}

function ControlBlock({ isRunning, onStartPause, onReset }: ControlBlockProps) {
    return (
        <div>
            <ButtonGroup
                disableElevation
                aria-label="Disabled elevation buttons"
            >
                <Button variant="contained" onClick={onStartPause}>{isRunning ? 'Pause' : 'Start'}</Button>
                <Button variant="outlined" onClick={onReset}  disabled={isRunning}>
                    Reset
                </Button>
            </ButtonGroup>
        </div>
    );
}

export default ControlBlock;
