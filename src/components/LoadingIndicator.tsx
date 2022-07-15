import {CircularProgress,Box} from '@mui/material';
import * as React from 'react';
import { useTranslation } from 'react-i18next'

const LoadingIndicator = () => {
    const { t } = useTranslation()

   return (
        <Box sx={{ position: 'fixed', top: 0, bottom: 0, left: 0, right: 0, zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#0009' }}>
            <CircularProgress color="warning" />
        </Box>
    );
}
export default LoadingIndicator;
