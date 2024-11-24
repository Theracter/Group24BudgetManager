import React from 'react';
import './ProgressBar.css'

interface BasicProgressBarProps {
  currentValue: number;
  maxValue: number;
}

export const ProgressBar: React.FC<BasicProgressBarProps> = ({ currentValue, maxValue }) => (
  <progress value={currentValue} max={maxValue}>
    {currentValue}%
  </progress>
);
