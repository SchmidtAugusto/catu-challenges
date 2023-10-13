import { Box, Chip, Grid, Typography, Button, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import DataTable, { DataTableColumn } from '../elements/DataTable';
import {
  TransgenderTwoTone,
  MaleTwoTone,
  FemaleTwoTone
} from '@mui/icons-material';

const Usuarios = () => {
  const [usuarios, setUsuarios] = useState<Array<any>>([]);
  const [maxPageSize, setMaxPageSize] = useState(0);
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState({
    page: 1,
    order: 'asc',
    order_by: 'id',
    page_size: 10,
  })



  const handleSort = (column: string | undefined) => {
      setFilters({
        ...filters,
        order: filters.order === 'asc' ? 'desc' : 'asc',
        order_by: typeof column === "string" ? column : ""
      })
  };


  async function fetchUsuarios() {
    const { page, order, order_by, page_size } = filters
    const url = `http://localhost:3000/api/usuarios?page=${page}&order=${order}&order_by=${order_by}&page_size=${page_size}`
    console.log(url)
    try {
      const request = await fetch(url)
      const requestParsed = await request.json()
      const {results, total_results} = requestParsed
      setUsuarios(search(results))
      calculateMaxPage(query === "" ? total_results : 1)
    } catch(error) {
      console.error(error)
    }
  }

  const search = (data: any) => {
    return data.filter((item: any) =>
      item.name.toLowerCase().includes(query) |
      item.surname.toLowerCase().includes(query)
    )
  }

  useEffect(() => {
    fetchUsuarios();
  }, [filters, query]);

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
      sortable: true,
      sortableName: 'name',
      config: {
        width: 200,
        align: 'center'
      }
    },
    {
      title: 'Sobrenome',
      render: (data) => <Typography>{data.surname}</Typography>,
      sortable: true,
      sortableName: 'surname',
      config: {
        width: 200,
        align: 'center'
      }
    },
    {
      title: 'Idade',
      render: (data) => <Typography>{data.age}</Typography>,
      sortable: true,
      sortableName: 'age',
      config: {
        width: 80,
        align: 'center'
      }
    },
    {
      title: 'Nascimento',
      sortable: true,
      sortableName: 'birthday',
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


  const handleNextPage = () => {
    setFilters({
      ...filters,
      page: filters.page + 1
    })
  };

  const handlePrevPage = () => {
    if (filters.page > 1) {
      setFilters({
        ...filters,
        page: filters.page - 1
      })
    }
  };

  const calculateMaxPage = (totalResults: number) => {
    let maxPage = Math.ceil(totalResults / filters.page_size)
    console.log(maxPage)
    setMaxPageSize(maxPage)
  }

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} sx={{ overflowX: 'auto' }}>
          <Box component="form" sx={{
            '& .MuiTextField-root': {
            m: 1, width: '25ch' },}}
            noValidate
            autoComplete="off">
            <div>
              <TextField
                onChange={(e) => setQuery(e.target.value)}
                label="Search"
                id="outlined-size-small"
                defaultValue=""
                size="small"/>
            </div>
          </Box>
          <Box sx={{display: 'flex', justifyContent: 'space-between'}} >
            <Button  onClick={handlePrevPage} disabled={filters.page === 1}> Página Anterior </Button>
            <Typography>{`${filters.page}/${maxPageSize}`}</Typography>
            <Button onClick={handleNextPage} disabled={filters.page === maxPageSize}> Próxima Página</Button>
          </Box>
          {usuarios?.length === 0 && <Typography>Nenhum usuário</Typography>}
          {usuarios?.length > 0 && (
            <DataTable
              tableProps={{ size: 'small' }}
              sx={{ width: 'max-content' }}
              columns={columns}
              data={usuarios}
              onSort={handleSort}
              sortBy={filters.order_by}
              sortOrder={filters.order}
            />
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default Usuarios;
