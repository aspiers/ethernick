import { ReactNode } from 'react';
import { styled } from '@mui/material';

interface Props {
  children: ReactNode;
  className?: string;
}

export default function StyledCode({ children, className }: Props) {
  const Code = styled('code')(
    ({ theme }) =>
      `
        margin: 2px 4px;
        padding: 2px;
        color: ${theme.palette.text.code.main};
        border-color: ${theme.palette.text.code.border};
        border-width: 1px;
        border-radius: 4px;
        border-style: solid;
      `,
  );
  return <Code {...{ className }}>{children}</Code>;
}
