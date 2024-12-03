import React, { useState, useEffect } from 'react';
import {
  Modal,
  Box,
  Typography,
  IconButton,
  Button,
  CircularProgress,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { format } from 'date-fns';
import axios from 'axios';

interface UploadModalProps {
  isModalOpen: boolean;
  handleCloseModal: () => void;
}

interface TableData {
  id: number;
  date: string;
  time: string;
  co_gt: number;
  pt08_s1_co: number;
  nmhc_gt: number;
  c6h6_gt: number;
  pt08_s2_nmhc: number;
  nox_gt: number;
  pt08_s3_nox: number;
  no2_gt: number;
  pt08_s4_no2: number;
  pt08_s5_o3: number;
}

const UploadModal: React.FC<UploadModalProps> = ({ isModalOpen, handleCloseModal }) => {
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [tableData, setTableData] = useState<TableData[]>([]);
  const [lastUploadTimestamp, setLastUploadTimestamp] = useState<number | null>(null);
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(100);
  const [totalRows, setTotalRows] = useState<number>(0);

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

  useEffect(() => {
    if (isModalOpen) {
      setTableData([]);
      setPage(0);
      fetchTableData(0, rowsPerPage);
    }
  }, [isModalOpen]);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];

      const allowedTypes = ['text/csv', 'application/vnd.ms-excel'];
      if (!allowedTypes.includes(file.type) && !file.name.endsWith('.csv')) {
        alert('Invalid file type. Please select a CSV file.');
        return;
      }

      setIsUploading(true);

      const formData = new FormData();
      formData.append('file', file);

      try {
        await axios.post(`${API_BASE_URL}/air-quality/ingest`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });

        setLastUploadTimestamp(Date.now());
        setPage(0);
        fetchTableData(0, rowsPerPage);
      } catch (error) {
        console.error('Error uploading file:', error);
        alert('Error uploading file. Please try again.');
      } finally {
        setIsUploading(false);
      }
    }
  };

  const fetchTableData = async (pageNumber: number, rowsPerPage: number) => {
    try {
      const response = await axios.get<{ data: TableData[]; total: number }>(`${API_BASE_URL}/air-quality/data`, {
        params: {
          offset: pageNumber * rowsPerPage,
          limit: rowsPerPage
        }
      });
      const newData: TableData[] = response.data.data;
      setTableData(newData);
      setTotalRows(response.data.total);
    } catch (error) {
      console.error('Error fetching table data:', error);
    }
  };

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
    fetchTableData(newPage, rowsPerPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    setRowsPerPage(newRowsPerPage);
    setPage(0);
    fetchTableData(0, newRowsPerPage);
  };

  return (
    <Modal open={isModalOpen} onClose={handleCloseModal} aria-labelledby="modal-title">
      <Box
        sx={{
          width: '80%',
          margin: 'auto',
          mt: 5,
          bgcolor: 'background.paper',
          p: 4,
          borderRadius: 1
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography id="modal-title" variant="h6" component="h2">
            Upload CSV File
          </Typography>
          <IconButton onClick={handleCloseModal}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Button variant="contained" component="label" sx={{ mt: 2 }}>
          Select CSV File
          <input type="file" accept=".csv" hidden onChange={handleFileChange} />
        </Button>
        {isUploading && (
          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
            <CircularProgress />
          </Box>
        )}
        {lastUploadTimestamp && (
          <Typography variant="body2" sx={{ mt: 2 }}>
            Last Uploaded: {format(new Date(lastUploadTimestamp), 'dd/MM/yyyy HH:mm:ss')}
          </Typography>
        )}
        {tableData.length > 0 && !isUploading && (
          <TableContainer component={Paper} sx={{ mt: 2, maxHeight: 400 }}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Time</TableCell>
                  <TableCell>CO(GT)</TableCell>
                  <TableCell>PT08.S1(CO)</TableCell>
                  <TableCell>NMHC(GT)</TableCell>
                  <TableCell>C6H6(GT)</TableCell>
                  <TableCell>PT08.S2(NMHC)</TableCell>
                  <TableCell>NOx(GT)</TableCell>
                  <TableCell>PT08.S3(NOx)</TableCell>
                  <TableCell>NO2(GT)</TableCell>
                  <TableCell>PT08.S4(NO2)</TableCell>
                  <TableCell>PT08.S5(O3)</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tableData.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>{row.id}</TableCell>
                    <TableCell>{format(new Date(row.date), 'dd/MM/yyyy')}</TableCell>
                    <TableCell>{row.time}</TableCell>
                    <TableCell>{row.co_gt}</TableCell>
                    <TableCell>{row.pt08_s1_co}</TableCell>
                    <TableCell>{row.nmhc_gt}</TableCell>
                    <TableCell>{row.c6h6_gt}</TableCell>
                    <TableCell>{row.pt08_s2_nmhc}</TableCell>
                    <TableCell>{row.nox_gt}</TableCell>
                    <TableCell>{row.pt08_s3_nox}</TableCell>
                    <TableCell>{row.no2_gt}</TableCell>
                    <TableCell>{row.pt08_s4_no2}</TableCell>
                    <TableCell>{row.pt08_s5_o3}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <TablePagination
              rowsPerPageOptions={[10, 25, 50, 100]}
              component="div"
              count={totalRows}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              labelDisplayedRows={({ from, to, count }) => `${from}-${to} of ${count}`}
              labelRowsPerPage="Rows per page:"
            />
          </TableContainer>
        )}
      </Box>
    </Modal>
  );
};

export default UploadModal;
