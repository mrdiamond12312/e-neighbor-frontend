import { Icon as IconFunction } from '@iconify/react';

interface IconifyProps {
  icon?: string;
  style?: React.CSSProperties;
}

export const Iconify: React.FC<IconifyProps> = ({
  icon = 'akar-icons:vscode-fill',
  style,
  ...other
}) => {
  return IconFunction({ icon, style, ...other });
};
