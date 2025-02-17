import { useTheme } from '@mui/material';

interface Props {
  bold?: boolean;
}

export default function Rolod0xText({ bold }: Props) {
  const theme = useTheme();

  return (
    <span style={{ fontWeight: bold && 'bold', fontFamily: 'Ubuntu Mono' }}>
      rolod<span style={{ color: theme.palette.primary.main }}>0x</span>
    </span>
  );
}
