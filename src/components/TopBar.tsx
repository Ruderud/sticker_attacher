import { Typography } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';

export default function TopBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Typography variant="h6" fontWeight="bold" sx={{ p: 1 }}>
          Sticker Attacher
        </Typography>
      </AppBar>
    </Box>
  );
}
