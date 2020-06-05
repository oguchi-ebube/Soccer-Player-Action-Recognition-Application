// import httpService from "../httpService";
import axios from "axios";
import AppConsts from "../../lib/appconst";

class MetricsService {
  async uploadVideo(data) {
    const url = `${AppConsts.remoteServiceBaseUrl}/analyze_video`;

    let result = await axios.post(url, data);

    return result.data;
  }

  async getMetrics() {
    // let result = await httpService.get(`/metrics`);
    // return result.data;
  }
}

export default new MetricsService();
