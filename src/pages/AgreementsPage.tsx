import React, { useState, useMemo } from 'react';
import {
  Box,
  Button,
  Container,
  Tab,
  Tabs,
  TextField,
  Typography,
  Paper,
  InputAdornment,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { Plus, Search } from 'lucide-react';
import { AgreementTable } from '../components/agreements/AgreementTable';
import { NewAgreementDialog } from '../components/agreements/NewAgreementDialog';
import { EditAgreementDialog } from '../components/agreements/EditAgreementDialog';
import { NewListDialog } from '../components/todos/NewListDialog';
import { Agreement, AgreementStatus } from '../types/agreement';
import { Dayjs } from 'dayjs';

// Mock data with two different lists
const mockAgreements: Agreement[] = [
  // Lista de Contratos
  {
    id: '1',
    element: 'Contrato de Servicios Cloud',
    responsible: 'Ana Martínez',
    status: 'in_progress',
    requestDate: '2024-02-15',
    deliveryDate: '2024-02-28',
    description: 'Revisión y actualización del contrato de servicios cloud con el proveedor principal',
    sjRequest: 'Revisar cláusulas de seguridad y privacidad',
    sjStatus: 'sj_review',
  },
  {
    id: '2',
    element: 'Acuerdo de Confidencialidad',
    responsible: 'Carlos Ruiz',
    status: 'completed',
    requestDate: '2024-02-10',
    deliveryDate: '2024-02-20',
    description: 'Preparación de NDA para nuevo proyecto de innovación',
    sjRequest: 'Verificar alcance y duración',
    sjStatus: 'completed',
  },
  {
    id: '3',
    element: 'Términos y Condiciones App',
    responsible: 'Ana Martínez',
    status: 'stuck',
    requestDate: '2024-02-18',
    deliveryDate: '2024-03-01',
    description: 'Actualización de T&C para la nueva versión de la aplicación móvil',
    sjRequest: 'Incluir nuevas funcionalidades',
    sjStatus: 'not_started',
  },

  // Lista de Compliance
  {
    id: '4',
    element: 'Auditoría GDPR',
    responsible: 'Miguel Torres',
    status: 'in_progress',
    requestDate: '2024-02-12',
    deliveryDate: '2024-03-15',
    description: 'Revisión de cumplimiento con regulaciones GDPR',
    sjRequest: 'Evaluar procesos de datos personales',
    sjStatus: 'in_progress',
  },
  {
    id: '5',
    element: 'Política de Seguridad',
    responsible: 'Laura Sánchez',
    status: 'sj_review',
    requestDate: '2024-02-14',
    deliveryDate: '2024-02-25',
    description: 'Actualización de políticas de seguridad corporativa',
    sjRequest: 'Revisar medidas de ciberseguridad',
    sjStatus: 'in_progress',
  },
  {
    id: '6',
    element: 'Certificación ISO 27001',
    responsible: 'Miguel Torres',
    status: 'not_started',
    requestDate: '2024-02-20',
    deliveryDate: '2024-04-01',
    description: 'Preparación para certificación de seguridad ISO',
    sjRequest: 'Documentar procesos de seguridad',
    sjStatus: 'not_started',
  },
];

export const AgreementsPage: React.FC = () => {
  const [agreements, setAgreements] = useState<Agreement[]>(mockAgreements);
  const [currentTab, setCurrentTab] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [isNewAgreementOpen, setIsNewAgreementOpen] = useState(false);
  const [isNewListOpen, setIsNewListOpen] = useState(false);
  const [editingAgreement, setEditingAgreement] = useState<Agreement | null>(null);
  const [deletingAgreement, setDeletingAgreement] = useState<Agreement | null>(null);

  const filteredAgreements = useMemo(() => {
    if (!searchTerm) return agreements;

    const searchLower = searchTerm.toLowerCase();
    return agreements.filter((agreement) => {
      return (
        agreement.element.toLowerCase().includes(searchLower) ||
        agreement.responsible.toLowerCase().includes(searchLower) ||
        agreement.description.toLowerCase().includes(searchLower) ||
        agreement.sjRequest.toLowerCase().includes(searchLower)
      );
    });
  }, [searchTerm, agreements]);

  const handleStatusChange = (id: string, status: AgreementStatus) => {
    setAgreements(agreements.map(agreement =>
      agreement.id === id ? { ...agreement, status } : agreement
    ));
  };

  const handleEdit = (agreement: Agreement) => {
    setEditingAgreement(agreement);
  };

  const handleEditSubmit = (updatedAgreement: Agreement) => {
    setAgreements(agreements.map(agreement =>
      agreement.id === updatedAgreement.id ? updatedAgreement : agreement
    ));
    setEditingAgreement(null);
  };

  const handleDelete = (agreement: Agreement) => {
    setDeletingAgreement(agreement);
  };

  const confirmDelete = () => {
    if (deletingAgreement) {
      setAgreements(agreements.filter(a => a.id !== deletingAgreement.id));
      setDeletingAgreement(null);
    }
  };

  const handleNewAgreement = (agreement: {
    element: string;
    responsible: string;
    status: AgreementStatus;
    requestDate: Dayjs; // Cambiado a Dayjs
    deliveryDate: Dayjs; // Cambiado a Dayjs
    description: string;
    sjRequest: string;
    sjStatus: AgreementStatus;
  }) => {
    const newAgreement: Agreement = {
      ...agreement,
      id: (agreements.length + 1).toString(),
      requestDate: agreement.requestDate.format('YYYY-MM-DD'), // Convertir a string
      deliveryDate: agreement.deliveryDate.format('YYYY-MM-DD'), // Convertir a string
    };
    setAgreements([...agreements, newAgreement]);
  };

  const handleNewList = (list: { name: string; color: string }) => {
    console.log('New list:', list);
  };

  return (
    <Box sx={{
      pt: 'calc(var(--nav-height) + 24px)',
      pb: 4,
      px: { xs: 2, sm: 3, md: 4 },
      minHeight: '100vh',
      backgroundColor: 'var(--app-bg)',
    }}>
      <Container maxWidth="xl" sx={{ mb: 4 }}>
        <Box sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          gap: 2,
          mb: 6,
        }}>
          <Button
            variant="contained"
            startIcon={<Plus size={16} />}
            onClick={() => setIsNewAgreementOpen(true)}
            sx={{
              backgroundColor: '#0071e3',
              fontSize: '0.875rem',
              fontWeight: 400,
              textTransform: 'none',
              borderRadius: '980px',
              px: 3,
              height: '32px',
              boxShadow: 'none',
              '&:hover': {
                backgroundColor: '#0077ED',
                boxShadow: 'none',
              }
            }}
          >
            Nuevo Acuerdo
          </Button>
          <Button
            variant="outlined"
            startIcon={<Plus size={16} />}
            onClick={() => setIsNewListOpen(true)}
            sx={{
              borderColor: 'var(--border-color)',
              color: 'var(--text-primary)',
              fontSize: '0.875rem',
              fontWeight: 400,
              textTransform: 'none',
              borderRadius: '980px',
              px: 3,
              height: '32px',
              '&:hover': {
                borderColor: 'var(--text-secondary)',
                backgroundColor: 'transparent',
              }
            }}
          >
            Nueva Lista
          </Button>
        </Box>

        <Box sx={{ mb: 4 }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Buscar acuerdos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search size={16} color="var(--text-secondary)" />
                </InputAdornment>
              ),
              sx: {
                fontSize: '0.875rem',
                height: '36px',
                backgroundColor: 'var(--surface-secondary)',
                color: 'var(--text-primary)',
                '&:hover': {
                  backgroundColor: 'var(--hover-bg)',
                },
                '& .MuiInputBase-input::placeholder': {
                  color: 'var(--text-secondary)',
                  opacity: 1,
                },
              }
            }}
            sx={{
              maxWidth: '600px',
              '& .MuiOutlinedInput-root': {
                borderRadius: '8px',
                '& fieldset': {
                  border: 'none',
                },
                '&:hover fieldset': {
                  border: 'none',
                },
                '&.Mui-focused fieldset': {
                  border: 'none',
                },
              },
            }}
          />
        </Box>

        <Paper
          sx={{
            mb: 4,
            borderRadius: '12px',
            overflow: 'hidden',
            boxShadow: 'none',
            backgroundColor: 'var(--surface-primary)',
          }}
          className="glass-effect"
        >
          <Tabs
            value={currentTab}
            onChange={(_, newValue) => setCurrentTab(newValue)}
            sx={{
              borderBottom: '1px solid var(--border-color)',
              '& .MuiTabs-indicator': {
                backgroundColor: '#0071e3',
              },
            }}
          >
            <Tab
              label="Contratos"
              sx={{
                textTransform: 'none',
                fontSize: '0.875rem',
                fontWeight: 400,
                color: 'var(--text-secondary)',
                '&.Mui-selected': {
                  color: '#0071e3',
                },
              }}
            />
            <Tab
              label="Compliance"
              sx={{
                textTransform: 'none',
                fontSize: '0.875rem',
                fontWeight: 400,
                color: 'var(--text-secondary)',
                '&.Mui-selected': {
                  color: '#0071e3',
                },
              }}
            />
          </Tabs>
        </Paper>

        <AgreementTable
          agreements={filteredAgreements.filter((_, index) =>
            currentTab === 0 ? index < 3 : index >= 3
          )}
          onStatusChange={handleStatusChange}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

        <NewAgreementDialog
          open={isNewAgreementOpen}
          onClose={() => setIsNewAgreementOpen(false)}
          onSubmit={handleNewAgreement}
        />

        <EditAgreementDialog
          open={!!editingAgreement}
          onClose={() => setEditingAgreement(null)}
          onSubmit={handleEditSubmit}
          agreement={editingAgreement}
        />

        <NewListDialog
          open={isNewListOpen}
          onClose={() => setIsNewListOpen(false)}
          onSubmit={handleNewList}
        />

        {/* Delete Confirmation Dialog */}
        <Dialog
          open={!!deletingAgreement}
          onClose={() => setDeletingAgreement(null)}
          PaperProps={{
            elevation: 0,
            sx: {
              borderRadius: '12px',
              backgroundColor: 'var(--surface-primary)',
              backdropFilter: 'blur(20px)',
              border: '1px solid var(--border-color)',
            },
          }}
        >
          <DialogTitle sx={{
            fontSize: '1.125rem',
            fontWeight: 600,
            color: 'var(--text-primary)',
            p: 2,
            borderBottom: '1px solid var(--border-color)',
          }}>
            Confirmar eliminación
          </DialogTitle>
          <DialogContent sx={{ p: 2, mt: 1 }}>
            <Typography sx={{ color: 'var(--text-primary)' }}>
              ¿Estás seguro de que deseas eliminar este acuerdo?
            </Typography>
            <Typography sx={{
              color: 'var(--text-secondary)',
              fontSize: '0.875rem',
              mt: 1,
            }}>
              Esta acción no se puede deshacer.
            </Typography>
          </DialogContent>
          <DialogActions sx={{
            p: 2,
            borderTop: '1px solid var(--border-color)',
            gap: 1,
          }}>
            <Button
              onClick={() => setDeletingAgreement(null)}
              sx={{
                color: 'var(--text-secondary)',
                fontSize: '0.875rem',
                fontWeight: 500,
                textTransform: 'none',
                px: 2.5,
                borderRadius: '6px',
                '&:hover': {
                  backgroundColor: 'var(--hover-bg)',
                  color: 'var(--text-primary)',
                },
              }}
            >
              Cancelar
            </Button>
            <Button
              onClick={confirmDelete}
              sx={{
                backgroundColor: '#ff3b30',
                color: '#fff',
                fontSize: '0.875rem',
                fontWeight: 500,
                textTransform: 'none',
                px: 2.5,
                borderRadius: '6px',
                boxShadow: 'none',
                '&:hover': {
                  backgroundColor: '#ff453a',
                  boxShadow: 'none',
                },
              }}
            >
              Eliminar
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
};