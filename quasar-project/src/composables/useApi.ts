import { api } from 'src/boot/axios';

export default function useApi(url: string) {
  const list = async () => {
    try {
      const { data } = await api.get(url);
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  const getById = async (id) => {
    try {
      const { data } = await api.get(`${url}/${id}`);
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  const post = async (form: string) => {
    try {
      const { data } = await api.post(url, form);
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  const update = async (form: any) => {
    try {
      const { data } = await api.put(`${url}/${form.id}`, form);
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  const remove = async (id: any) => {
    try {
      const { data } = await api.delete(`${url}/${id}`);
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  return { list, post, update, remove, getById };
}
