import React, { useCallback, useEffect, useState } from 'react';
import { Box } from '@mui/system';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { parseLabels } from '../../shared/parser';
import { optionsStorage } from '../../shared/options-storage';

import CodeMirrorTextAddresses from './CodeMirrorTextAddresses';

export default function LocalAddressBook() {
  const [labels, setLabels] = useState('');
  const [error, setError] = useState<string | null>();

  const validate = useCallback(
    (labels: string): void => {
      if (!labels) return;

      try {
        console.log(`Parsing: ${labels.slice(0, 30)}...`);
        const [linesParsed, _labelMap] = parseLabels(labels);
        console.log(`Parsed ${linesParsed} lines`);
        setError(null);
      } catch (err: unknown) {
        console.error(err);
        if (err instanceof Error) {
          setError(err.message);
        }
      }
    },
    [setError],
  );

  const handleLabelsChange = useCallback(
    async newValue => {
      setLabels(newValue);
    },
    [setLabels],
  );

  const handleSave = useCallback(async () => {
    await optionsStorage.set({ labels });
    validate(labels);
  }, [labels, validate]);

  const getOptions = useCallback(async () => {
    const options = await optionsStorage.getAll();
    console.log('Hydrated options from storage');
    setLabels(options.labels);
    validate(options.labels);
  }, [setLabels, validate]);

  useEffect(() => {
    getOptions();
  }, [getOptions]);

  return (
    <form className="detail-view-container">
      <Stack direction="row" justifyContent="space-between" alignItems="flex-end" sx={{ pb: 1 }}>
        <Box>
          <Typography>
            Enter your address labels here, one on each line. Each entry should look something like:
          </Typography>
          <Box sx={{ p: 2, fontFamily: 'Monospace' }}>
            <code>0xaddress Label for address</code>
          </Box>
          <Typography>
            You can optionally add <code>{'// a comment'}</code> after the address to provide more information.
          </Typography>
        </Box>
        <Box>
          <Button variant="contained" onClick={handleSave}>
            Save
          </Button>
        </Box>
      </Stack>
      <div id="parser-error" style={{ display: error ? 'block' : 'none' }}>
        {error}
      </div>
      <CodeMirrorTextAddresses value={labels} onChange={handleLabelsChange} />
    </form>
  );
}
