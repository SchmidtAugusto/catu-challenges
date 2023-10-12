import { Divider, Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import Head from 'next/head'; import Pedido from '@/components/exercicio-01/Pedido';

/**
 * @/pages/exercicios/01-fetch
 * ----------------------------------------------------------------------
 * Opa! Tudo bom? Seja bem-vindo ao primeiro exercício do repositório!
 *
 * Aqui a premisa é _bem_ simples: você deve fazer uma requisição para
 * um endpoint e exibir o resultado na tela.
 *
 * Só isso...ou só mesmo? 🤔
 *
 * Talvez haja alguma coisa a mais? Talvez você precise _tratar_ alguma
 * coisa? Não sabemos, é por sua conta aqui! 🤷‍♂️
 *
 * Você precisará solicitar dados do endpoint em `/api/pedido` para isso.
 *
 * Dizem que este endpoint pode retornar algum erro. Mas não sei, afinal,
 * na minha máquina funciona! 🤷‍♂️
 *
 * P.s.: você não precisa exibir _tuuuuuudo_ que retorna no pedido, o
 * importante aqui é o request e exibir o que retorna. Mas, se quiser fazer
 * algo a mais, fique à vontade! 😁
 *
 * @returns
 */
const ExercisePage = () => {
  return (
    <>
      <Head>
        <title>Exercício 01 : Fetch</title>
        <meta
          name="description"
          content="Execute um fetch, colha os resultados!"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Typography variant={'h3'}>Exercício 01</Typography>
      <Typography variant={'h5'}>Traz meu pedido aí, por favor! 🙏</Typography>

      <Divider sx={{ my: 2 }} />

      <Pedido />
    </>
  );
};

export default ExercisePage;
