import React from "react";
import styles from "./Timer.module.css";

class Timer extends React.Component {
  state = {
    dataInfo: [
      { data: new Date().toLocaleTimeString("en-US"), format: "ws" },
      {
        data: new Date().toLocaleDateString("en-US"),
        format: "d",
      },
      { data: new Date().toLocaleTimeString("en-US"), format: "ns" },
      {
        data: "",
        format: "dwm",
        style1: { width: "800px" },
        style2: "flex-start",
      },
    ],
    colors: [
      "0099e5",
      "ff0000",
      "f48924",
      "00c16e",
      "00a8e0",
      "b3dcff",
      "fff200",
    ],
    currentColor: "",
    activeIndex: 0,
  };

  componentDidMount() {
    setInterval(() => {
      this.setFormat();
    }, 1000);
    this.setBackground();
  }
  setFormat() {
    let timeNoSeconds = new Date().toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
    let timeWithSeconds = new Date().toLocaleTimeString("en-US");
    this.setState((state) => {
      const list = state.dataInfo.map((item, index, arr) => {
        if (item.format === "ws") {
          return (item.data = timeWithSeconds);
        }
        if (item.format === "ns") {
          return (item.data = timeNoSeconds);
        }
        if (item.format === "dwm") {
          const f = function () {
            let date = new Date();
            let m = date.toLocaleDateString("en-US", {
              month: "long",
            });
            let d = date.toLocaleDateString("en-US", {
              day: "numeric",
            });
            let y = date.toLocaleDateString("en-US", {
              year: "2-digit",
            });

            let fullDate = `${m} ${d}th ${y}`;
            return fullDate;
          };
          return (item.data = f());
        }
        return arr;
      });
      return { list };
    });
  }
  randomInteger(min, max) {
    let rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(rand);
  }
  setBackground() {
    let bgColor =
      "#" +
      this.state.colors[this.randomInteger(0, this.state.colors.length - 1)];
    this.setState({ currentColor: bgColor });
  }
  changeHandler() {
    this.setState({
      activeIndex:
        this.state.activeIndex + 1 < this.state.dataInfo.length
          ? this.state.activeIndex + 1
          : 0,
    });
    this.setBackground();
  }
  render() {
    return (
      <>
        {this.state.dataInfo.map((item, index) => {
          const key = (Math.random() * 1000).toString();
          return (
            <div
              className={`${styles.content} ${
                this.state.activeIndex === index ? styles.active : ""
              }`}
              style={{
                backgroundColor: this.state.currentColor,
                justifyContent: item.style2,
              }}
              onClick={() => this.changeHandler()}
              key={key}
            >
              <span style={item.style1}>{item.data}</span>
            </div>
          );
        })}
      </>
    );
  }
}

export default Timer;
