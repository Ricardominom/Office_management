import React from 'react';
import { AppBar, Toolbar, Button, IconButton, Badge, Box, Divider } from '@mui/material';
import { Bell, Moon, Sun, Building2 } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { LogoutDialog } from './LogoutDialog';

interface NavbarProps {
  user: { name: string };
}

export const Navbar: React.FC<NavbarProps> = ({ user }) => {
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [isLogoutOpen, setIsLogoutOpen] = React.useState(false);

  const handleLogout = () => {
    console.log('Sesión cerrada desde Navbar');
    setIsLogoutOpen(false);
    navigate('/');
  };

  const buttonTextStyle = theme === 'dark' ? 'text-primary' : 'text-gray-800';
  const buttonIconStyle = theme === 'dark' ? 'text-primary' : 'text-gray-800';

  return (
    <AppBar 
      position="fixed" 
      sx={{ 
        background: 'transparent',
        boxShadow: 'none',
        height: 'var(--nav-height)',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backdropFilter: 'saturate(180%) blur(20px)',
          backgroundColor: 'var(--glass-bg)',
          borderBottom: '1px solid var(--border-color)',
          zIndex: -1,
        }
      }}
    >
      <Toolbar 
        sx={{ 
          minHeight: 'var(--nav-height) !important',
          px: { xs: 2, md: 4 },
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
          gap: 2,
        }}
      >
        <button 
          onClick={() => navigate('/')}
          className={`flex-shrink-0 flex items-center hover:opacity-80 transition-opacity ${buttonTextStyle}`}
        >
          <Building2 className={`h-8 w-8 ${buttonIconStyle}`} />
          <span className={`ml-2 text-xl font-bold ${buttonTextStyle}`}>Plataforma UNO</span>
        </button>

        <Box 
          sx={{ 
            display: 'flex',
            gap: 2,
            justifyContent: 'center',
            flex: 1,
          }}
        >
          {[
            { path: '/agreements', label: 'Acuerdos' },
            { path: '/todos', label: 'To-dos' },
            { path: '/toolbox', label: 'Toolbox' }
          ].map((item) => (
            <Button 
              key={item.path}
              component={Link} 
              to={item.path}
              sx={{ 
                color: location.pathname === item.path ? 'var(--text-primary)' : 'var(--text-secondary)',
                fontSize: '0.875rem',
                fontWeight: 400,
                textTransform: 'none',
                px: 2,
                minWidth: 0,
                '&:hover': {
                  backgroundColor: 'transparent',
                  color: 'var(--text-primary)',
                },
                transition: 'color 0.2s ease',
              }}
            >
              {item.label}
            </Button>
          ))}
        </Box>

        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center',
          gap: 3,
          minWidth: '300px',
          justifyContent: 'flex-end',
        }}>
          <Divider orientation="vertical" flexItem sx={{ borderColor: 'var(--border-color)' }} />

          <Box sx={{ display: 'flex', gap: 1.5 }}>
            <IconButton
              onClick={toggleTheme}
              size="small"
              sx={{
                color: 'var(--text-secondary)',
                '&:hover': {
                  color: 'var(--text-primary)',
                  backgroundColor: 'transparent',
                }
              }}
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </IconButton>

            <IconButton 
              size="small"
              sx={{ 
                color: 'var(--text-secondary)',
                '&:hover': {
                  color: 'var(--text-primary)',
                  backgroundColor: 'transparent',
                }
              }}
            >
              <Badge 
                badgeContent={4} 
                color="error"
                sx={{
                  '& .MuiBadge-badge': {
                    backgroundColor: '#ff2d55',
                    minWidth: '16px',
                    height: '16px',
                    fontSize: '0.75rem',
                  }
                }}
              >
                <Bell size={18} />
              </Badge>
            </IconButton>

            <LogoutDialog
              isOpen={isLogoutOpen}
              onOpenChange={setIsLogoutOpen}
              onLogout={handleLogout}
            />
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
