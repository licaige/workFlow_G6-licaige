import { request } from 'umi';
export async function getInitialState(): Promise<{ name: string }> {
  return { name: 'CMS' };
}

export const layout = () => {
  return {
    logo: 'https://img.alicdn.com/tfs/TB1YHEpwUT1gK0jSZFhXXaAtVXa-28-27.svg',
    menu: {
      locale: false,
      request: () => request('/api/menu').then(res => res.data.list)
    },
  };
};
