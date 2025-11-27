import http from '../api/http';

export class BaseService<T> {

  private baseUrl =''

  async getAll(params?: any) {
    const r = await http.get<T[]>(this.baseUrl, { params });
    return r.data;
  }

  async getById(id: number | string) {
    const r = await http.get<T>(`${this.baseUrl}/${id}`);
    return r.data;
  }

  async create(data: Partial<T>) {
    const r = await http.post<T>(this.baseUrl, data);
    return r.data;
  }

  async update(id: number | string, data: Partial<T>) {
    const r = await http.put<T>(`${this.baseUrl}/${id}`, data);
    return r.data;
  }

  async patch(id: number | string, data: Partial<T>) {
    const r = await http.patch<T>(`${this.baseUrl}/${id}`, data);
    return r.data;
  }

  async remove(id: number | string) {
    const r = await http.delete(`${this.baseUrl}/${id}`);
    return r.data;
  }
}
