import * as React from "react";
import { Spin } from "antd";
import Lottie from "react-lottie";
import animationData from "../../assets/loader-animation.json";

const Loading = () => (
  <div style={{ paddingTop: 100, textAlign: "center" }}>
    <Lottie
      options={{
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
          preserveAspectRatio: "xMidYMid slice"
        }
      }}
      height={200}
      width={200}
    />
  </div>
);

export default Loading;
