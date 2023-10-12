import { Box, Chip, Grid, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import DataTable, { DataTableColumn } from '../elements/DataTable';
import {
  TransgenderTwoTone,
  MaleTwoTone,
  FemaleTwoTone
} from '@mui/icons-material';

const Usuarios = () => {

  const [sort, setSort] = useState('Asc');
  const [sortColumn, setSortColumn] = useState('id');
  const handleSort = (column: string) => {
    if (column === sortColumn) {
      setSort(sort === 'Asc' ? 'Desc' : 'Asc');
    } else {
      setSortColumn(column);
      setSort('Asc');
    }
  };


  const [usuarios, setUsuarios] = useState<Array<any>>([]);

  function fetchUsuarios() {
    fetch(`/api/usuarios?page=${currentPage}&order_by=${sortColumn}&order=${sort}`)
    .then((res) => res.json())
      .then((data) => setUsuarios(data?.results || []));
  }

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const columns: Array<DataTableColumn> = [
    {
      title: 'ID',
      render: (data) => <Typography>{data.id}</Typography>,
      sortable: true,
      sortableName: 'id',
      config: {
        width: 80,
        align: 'center'
      }
    },
    {
      title: 'Nome',
      render: (data) => <Typography>{data.name}</Typography>,
      config: {
        width: 200,
        align: 'center'
      }
    },
    {
      title: 'Sobrenome',
      render: (data) => <Typography>{data.surname}</Typography>,
      config: {
        width: 200,
        align: 'center'
      }
    },
    {
      title: 'Idade',
      render: (data) => <Typography>{data.age}</Typography>,
      config: {
        width: 80,
        align: 'center'
      }
    },
    {
      title: 'Nascimento',
      render: (data) => {
        const date = new Date(data.birthday);

        return (
          <Typography>
            {date.toLocaleDateString('pt-BR', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric'
            })}
          </Typography>
        );
      },
      config: {
        width: 200,
        align: 'center'
      }
    },
    {
      title: 'E-mail',
      render: (data) => (
        <Typography>
          <Chip label={data.email} />
        </Typography>
      ),
      config: {
        width: 240,
        align: 'center'
      }
    },
    {
      title: 'Telefone',
      render: (data) => (
        <Typography>
          <Chip label={data.phone} />
        </Typography>
      ),
      config: {
        width: 200,
        align: 'center'
      }
    },
    {
      title: 'Gênero',
      render: (data) => {
        if (data?.gender === 'male') {
          return (
            <Typography>
              <Chip label={<MaleTwoTone />} />
            </Typography>
          );
        }

        if (data?.gender === 'female') {
          return (
            <Typography>
              <Chip label={<FemaleTwoTone />} />
            </Typography>
          );
        }

        return (
          <Typography>
            <Chip label={<TransgenderTwoTone />} />
          </Typography>
        );
      },
      config: {
        width: 80,
        align: 'center'
      }
    }
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + (itemsPerPage - 1);
  const usersToDisplay = usuarios.slice(startIndex, endIndex);

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} sx={{ overflowX: 'auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between'}}>
            <button onClick={prevPage} disabled={currentPage === 1}> Página Anterior </button>

            <button onClick={nextPage} disabled={endIndex >= usuarios.length}> Próxima Página</button>
          </div>
          {usuarios?.length === 0 && <Typography>Nenhum usuário</Typography>}
          {usuarios?.length > 0 && (
            <DataTable
              tableProps={{ size: 'small' }}
              sx={{ width: 'max-content' }}
              columns={columns}
              data={usuarios}
              onSort={handleSort}
              sortBy={sortColumn}
              sortOrder={sort}
            />
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default Usuarios;
