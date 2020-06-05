import { action, observable } from "mobx";

import metricsService from "../services/metricsService/metricsService";

class MetricsStore {
  @observable metrics = {
    team1: {
      dribbling: { count: 0 },
      kicking: { count: 0 },
      passing: { count: 0 },
      running: { count: 0 },
    },
    team2: {
      dribbling: { count: 0 },
      kicking: { count: 0 },
      passing: { count: 0 },
      running: { count: 0 },
    },
  };

  @observable image_frame = "";

  @observable done_uploading = false;

  @action
  setDribbling(data) {
    this.metrics["dribbling"] = { ...this.metrics["dribbling"], data };
  }
  @action
  setKickingg(data) {
    this.metrics["kicking"] = { ...this.metrics["kicking"], data };
  }

  @action
  setPassing(data) {
    this.metrics["passing"] = { ...this.metrics["passing"], data };
  }
  @action
  setRunning(data) {
    this.metrics["running"] = { ...this.metrics["running"], data };
  }

  @action
  setImageFrame(image) {
    this.image_frame = image;
  }

  @action
  async getMetrics() {
    const data = await metricsService.getMetrics();
    this.metrics = data;
  }

  @action
  async uploadVideo(fileObj) {
    console.log(fileObj);
    if (!fileObj) return;
    // Create an object of formData
    const formData = new FormData();

    /*
    {'file':'video.mp4, 
      'team1':'3ff',
      'team2':'3ff'
      }
    
    */
    // Update the formData object
    formData.append("file", fileObj.file, fileObj.file.name);
    formData.append("team1", fileObj.team1);
    formData.append("team2", fileObj.team2);

    console.log(formData);

    const result = await metricsService.uploadVideo(formData);
    console.log(result);

    this.metrics = result;

    this.done_uploading = true;

    return result;
  }
}

export default MetricsStore;
