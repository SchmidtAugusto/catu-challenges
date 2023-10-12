import { Stack, Typography } from '@mui/material';
import { useState, useEffect } from 'react';

const Pedido = () => {

  const [pedidoData, setPedidoData] = useState(null);



  function fetchPedido() {
    fetch('/api/pedido')
      .then((response) => response.json())
      .then((data) => {
        setPedidoData(data);
      });
  }

  useEffect(() => {
    fetchPedido();
  }, []);

if (pedidoData) {
  return (
    <Stack gap={2}>
      <Typography variant={'h5'}>
        Pedido: <Typography fontWeight={'700'}>{pedidoData.dish}</Typography>
      </Typography>
      <Typography variant={'h6'}>
        Porções: <Typography fontWeight={'700'}>{pedidoData.servings}</Typography>
      </Typography>
      <Typography variant={'h6'}>
        Extras: <Typography fontWeight={'700'}>{pedidoData.extras}</Typography>
      </Typography>
    </Stack>
  );
  };
}

export default Pedido;
