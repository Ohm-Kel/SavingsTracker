/**
 * Reusable header component with title and optional actions
 */

import React from 'react';
import { Appbar } from 'react-native-paper';

interface HeaderProps {
  title: string;
  subtitle?: string;
  showBack?: boolean;
  onBack?: () => void;
  actions?: React.ReactNode;
}

export function Header({ title, subtitle, showBack, onBack, actions }: HeaderProps) {
  return (
    <Appbar.Header>
      {showBack && <Appbar.BackAction onPress={onBack} />}
      <Appbar.Content title={title} subtitle={subtitle} />
      {actions}
    </Appbar.Header>
  );
}
