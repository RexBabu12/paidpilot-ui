import React from 'react';
import { Moon, Sun } from '@phosphor-icons/react';
import { useTheme } from '../contexts/ThemeContext';
import { Button } from './ui/button';

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="transition-transform duration-300 hover:scale-110"
      data-testid="theme-toggle-button"
    >
      {theme === 'light' ? (
        <Moon className="h-5 w-5" weight="duotone" />
      ) : (
        <Sun className="h-5 w-5" weight="duotone" />
      )}
    </Button>
  );
};