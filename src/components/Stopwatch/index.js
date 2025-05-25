import './index.css'
import {Component} from 'react'

class Stopwatch extends Component {
  state = {minutes: 0, seconds: 0, isRunning: false}

  componentWillUnmount() {
    clearInterval(this.timerId)
  }

  tick = () => {
    this.setState(prevState => {
      const {minutes, seconds} = prevState

      if (seconds === 59) {
        return {minutes: minutes + 1, seconds: 0}
      }

      return {seconds: seconds + 1}
    })
  }

  onStart = () => {
    const {isRunning} = this.state
    if (!isRunning) {
      this.timerId = setInterval(this.tick, 1000)
      this.setState({isRunning: true})
    }
  }

  onStop = () => {
    clearInterval(this.timerId)
    this.setState({isRunning: false})
  }

  onReset = () => {
    clearInterval(this.timerId)
    this.setState({minutes: 0, seconds: 0, isRunning: false})
  }

  formatTime = value => (value < 10 ? `0${value}` : value)

  render() {
    const {minutes, seconds} = this.state

    return (
      <div className="app-bg-container">
        <h1 className="stopwatchText">Stopwatch</h1>
        <div className="timer-container">
          <div className="iconAndText">
            <img
              src="https://assets.ccbp.in/frontend/react-js/stopwatch-timer.png"
              alt="stopwatch"
            />
            <p className="timerText">Timer</p>
          </div>
          <h1 className="timerLive">
            {this.formatTime(minutes)}:{this.formatTime(seconds)}
          </h1>
          <div className="btn-container">
            <button type="button" className="startBtn" onClick={this.onStart}>
              Start
            </button>
            <button type="button" className="stopBtn" onClick={this.onStop}>
              Stop
            </button>
            <button type="button" className="resetBtn" onClick={this.onReset}>
              Reset
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default Stopwatch
