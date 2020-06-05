import httpService from "../services/httpService";

class ApiService {
  async getConnectionSourceDetails(options, token) {
    let result = await httpService.post(
      "/orx/get-connection-source-details",
      options,
      {
        headers: {
          Authorization: `JWT ${token}`,
        },
      }
    );

    return result.data;
  }
}

export default new ApiService();
