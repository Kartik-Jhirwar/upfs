import { useJumboTheme } from "@jumbo/components/JumboTheme/hooks";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import {
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ThemeProvider,
  Typography,
  Box,
  Button,
  useMediaQuery,
} from "@mui/material";
import { authUser } from "./data";
import { JumboDdPopover } from "@jumbo/components/JumboDdPopover";
import { useAuth } from "@app/_components/_core/AuthProvider/hooks";
import { useNavigate } from "react-router-dom";
import { ThemeModeOption } from "@app/_components/layout/Header/components/ThemeModeOptions";
import RefreshIcon from '@mui/icons-material/Refresh';

const AuthUserPopover = () => {
  const { theme } = useJumboTheme();
  const { logout } = useAuth();
  const navigate = useNavigate();
  const isBelowSm = useMediaQuery(theme.breakpoints.down("sm")); 

  async function handleLogout() {
    await logout();
    return navigate("/auth/login-1");
  }

  return (
    <ThemeProvider theme={theme}>
      <JumboDdPopover
        triggerButton={
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              padding: "8px 12px",
              borderRadius: "20px",
              cursor: "pointer",
              boxShadow: "2px 2px 6px rgba(0,0,0,0.1)",
            }}
          >
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center",minWidth:105 }}>
              <Typography
                sx={{
                  fontWeight: "500",
                  color: "primary.main",
                  paddingLeft: "8px",
                  fontSize: { xs: "0.75rem", md: "0.875rem" },
                }}
              >
                {authUser.name.toUpperCase()}
              </Typography>
              <Typography sx={{ color: "grey", textTransform: "uppercase", fontSize: { xs: 10, md: 12 } }}>
                {authUser.job_title.toUpperCase()}
              </Typography>
            </Box>

            <AccountCircleIcon sx={{ color: "primary.main", fontSize: { xs: 25, md: 32 } }} />
          </Box>
        }
        sx={{ ml: 1 }}
      >
        <nav>
          <List disablePadding sx={{ pr: (theme) => theme.spacing(3), pb: 1, pt: 1 }}>
            
       
            {isBelowSm && (
              <ListItemButton onClick={() => window.location.reload()}>
                <ListItemIcon sx={{ minWidth: 36 ,ml:1.}}>
                  <RefreshIcon/>
                </ListItemIcon>
                <ListItemText primary="Refresh" sx={{ my: 0 }} />
              </ListItemButton>
            )}

            {isBelowSm && (
              <ListItemButton>
                <ThemeModeOption />
                <ListItemText primary="Theme" sx={{ my: 0,ml:1 }} />
              </ListItemButton>
            )}         
        
            <ListItemButton onClick={handleLogout}>
              <ListItemIcon sx={{ minWidth: 36,ml:1.5 }}>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary="Logout" sx={{ my: 0 }} />
            </ListItemButton>

          </List>
        </nav>
      </JumboDdPopover>
    </ThemeProvider>
  );
};

export { AuthUserPopover };
