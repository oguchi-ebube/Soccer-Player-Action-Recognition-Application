import React from "react";
import utils from "../../utils/utils";
import { inject, observer } from "mobx-react";
import AppConsts from "../../lib/appconst";
import { Layout, Row, Col, Button, Spin } from "antd";
import ReactPlayer from "react-player";
import Stores from "../../stores/storeIdentifier";
import "./index.css";
const { Header, Content, Footer } = Layout;

@inject(Stores.metricsStore)
@observer
class Home extends React.Component {
  state = {
    // Initially, no file is selected
    selectedFile: null,
    uploading_video: false,
    team1_color: "",
    team2_color: "",
  };

  componentDidMount() {
    // setInterval(() => {
    //   this.fetchImage();
    //   this.fetch_latest_metrics();
    // }, 2000);
  }

  fetchImage() {
    const image_frame =
      AppConsts.remoteServiceBaseUrl + "/static/video_output/file.png";

    this.props.metricsStore.setImageFrame(image_frame);
  }

  fetch_latest_metrics() {
    this.props.metricsStore.getMetrics().catch((error) => {
      console.log(error);
    });
  }

  onFileChange = (event) => {
    // Update the state
    this.setState({ selectedFile: event.target.files[0] });
  };

  onFileUpload = async () => {
    this.setState({ uploading_video: true });
    /**
     {'file':'video.mp4, 
      'team1':'3ff',
      'team2':'3ff'
      }
     * 
     * 
     */
    //UPLOAD
    let fileObj = {
      file: this.state.selectedFile,
      team1: this.state.team1_color,
      team2: this.state.team2_color,
    };
    console.log("Before call", fileObj);

    await this.props.metricsStore.uploadVideo(fileObj);
    this.setState({ uploading_video: false });
  };

  team1colorChange = (event) => {
    this.setState({ team1_color: event.target.value });
  };

  team2colorChange = (event) => {
    this.setState({ team2_color: event.target.value });
  };

  render() {
    const {
      location: { pathname },
    } = this.props;

    const { metrics, image_frame, done_uploading } = this.props.metricsStore;

    return (
      <Layout id="main-page" style={{ minHeight: window.outerHeight }}>
        <Header id="header">
          <h2 className="header-title">SOCCER ANALYSIS</h2>
        </Header>
        <Layout>
          <Content id="main-content">
            <Row>
              <Col md={12} className="video-section">
                {!done_uploading && (
                  <Spin
                    tip="Processing video. Please wait..."
                    spinning={this.state.uploading_video}
                  >
                    <div className="upload-view">
                      <input type="file" onChange={this.onFileChange} />
                      <Button onClick={this.onFileUpload}>Upload video</Button>
                    </div>
                    <div>
                      <p>
                        Enter rgb value of team1's jesrsey color :
                        <input
                          type="text"
                          name="team1color"
                          pattern="^#+([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$"
                          value={this.state.team1color}
                          onChange={this.team1colorChange}
                        />
                      </p>
                      <p>
                        Enter rgb value of team2's jesrsey color :
                        <input
                          type="text"
                          name="team2color"
                          pattern="^#+([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$"
                          value={this.state.team2color}
                          onChange={this.team2colorChange}
                        />
                      </p>
                    </div>
                  </Spin>
                )}
                {/* {done_uploading && (
                  <img className="img-feed" src={image_frame} alt="" />
                )} */}

                {done_uploading && (
                  <ReactPlayer
                    controls
                    url={`${AppConsts.remoteServiceBaseUrl}/static/video.mp4`}
                    // url="http://c3095a49.ngrok.io/static/test.mp4"
                    playing
                  />
                )}
              </Col>
              <Col md={12} className="analysis-section ">
                <table id="metric-table">
                  <thead>
                    <tr>
                      <th>Metrics</th>
                      <th>Team A</th>
                      <th>Team B</th>
                      <th>Predicted Outcome</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Running</td>
                      <td>{metrics["team1"]["running"].count}</td>
                      <td>{metrics["team2"]["running"].count}</td>
                      <td> </td>
                    </tr>
                    <tr>
                      <td>Kicking</td>
                      <td>{metrics["team1"]["kicking"].count}</td>
                      <td>{metrics["team2"]["kicking"].count}</td>
                      <td></td>
                    </tr>
                    <tr>
                      <td>Dribbling</td>
                      <td>{metrics["team1"]["dribbling"].count}</td>
                      <td>{metrics["team2"]["dribbling"].count}</td>
                      <td> </td>
                    </tr>
                    <tr>
                      <td>Passing</td>
                      <td>{metrics["team1"]["passing"].count}</td>
                      <td>{metrics["team2"]["passing"].count}</td>
                      <td></td>
                    </tr>
                  </tbody>
                </table>
              </Col>
            </Row>
          </Content>
        </Layout>
        <Footer>footer</Footer>
      </Layout>
    );
  }
}

export default Home;
