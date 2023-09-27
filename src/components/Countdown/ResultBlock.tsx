import React from 'react';

import { Typography } from '@mui/joy';

interface ResultBlockProps {
  totalSeconds: number;
  initialMinutes: number;
  initialSeconds: number;
}

function ResultBlock({ totalSeconds, initialMinutes, initialSeconds }: ResultBlockProps) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  // вычесляем прценты
  const progressPercentage = (
    Math.round((1 - (totalSeconds / (initialMinutes * 60 + initialSeconds))) * 100)
  );

  return (
    <div>
      <Typography level="h3">
        Time Remaining: {minutes} minutes {seconds} seconds
      </Typography>
      <Typography level="h3">
        Progress: {progressPercentage}% completed
      </Typography>
    </div>
  );
}

export default ResultBlock;
