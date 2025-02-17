import { ReactNode } from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function SettingsAccordionSection({
  title,
  children,
  defaultExpanded = true,
}: {
  title: string;
  children: ReactNode;
  defaultExpanded?: boolean;
}): ReactNode {
  return (
    <Accordion defaultExpanded={defaultExpanded} sx={{ mb: 2, maxWidth: 1000 }}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls={`${title}-content`}
        id={`${title}-header`}
        title="Click to expand/collapse">
        <Typography variant="h5" component="h3" color="primary.main" sx={{ fontWeight: 'bold' }}>
          {title}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>{children}</AccordionDetails>
    </Accordion>
  );
}
