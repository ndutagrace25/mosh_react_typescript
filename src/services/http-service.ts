import apiClient from "./api-client";

interface Entity {
  id: number;
}

class HttpService {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  getAll<T>() {
    const controller = new AbortController();

    const request = apiClient.get<T[]>(this.endpoint, {
      signal: controller.signal,
    });

    return { cancel: () => controller.abort(), request };
  }
  delete(id: number) {
    const request = apiClient.delete(`${this.endpoint}/${id}`);
    return request;
  }
  create<T>(entity: T) {
    return apiClient.post(this.endpoint, entity);
  }

  update<T extends Entity>(entity: T) {
    return apiClient.patch(this.endpoint + "/" + entity.id, entity);
  }
}

const create = (endpoint: string) => new HttpService(endpoint);

export default create;
