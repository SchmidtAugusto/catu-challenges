import { NextApiRequest, NextApiResponse } from 'next';
import UserData from '@/pages/api/usuarios.json';

/**
 * Seu desafio full stack também passa por aqui! 👀
 */
const requestHandler = (req: NextApiRequest, res: NextApiResponse) => {
  const { query } = req;

  let page: number = parseInt(`${query?.page}`);
  page = isNaN(page) ? 1 : page;

  let pageSize: number | null = parseInt(`${query?.page_size}`);
  pageSize = isNaN(pageSize) ? 10 : pageSize;

  let order: string | null = `${query?.order}`.toLowerCase();
  if (order !== 'asc' && order !== 'desc') order = 'asc';

  let orderBy: string | null = `${query?.order_by}`.toLowerCase();
  if (!!orderBy === false || orderBy === 'undefined') orderBy = 'id';

  const sliceStart = (page - 1) * pageSize;
  const sliceEnd = sliceStart + pageSize;

  const userData = [...UserData].sort((a: any, b: any) => {
    switch (orderBy) {
      case 'name':
      case 'surname':
      case 'birthday':
        return order === 'asc'
          ? a[`${orderBy}`] > b[`${orderBy}`]
            ? 1
            : -1
          : a[`${orderBy}`] > b[`${orderBy}`]
          ? -1
          : 1;
      case 'age':
        return order === 'asc' ? a.age - b.age : b.age - a.age;
      default:
        return order === 'asc' ? a.id - b.id : b.id - a.id;
    }
  });

  const resultsData = userData.slice(sliceStart, sliceEnd);

  res.status(200).json({
    results: resultsData,
    order_by: orderBy,
    order: order,
    total_results: userData.length
  });
};

export default requestHandler;
