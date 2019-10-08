import React from 'react'

export default class Construction extends React.Component {
  constructor(props) {
    super(props)

    let rightNow = new Date()
    let startDate = new Date(2015, 10, 11, 23, 55) // 2015 11 月 11 日 23:55

    this.timeDifference = rightNow - startDate     // realtime

    this.state = {
      day: -1,
      hour: 0,
      minute: 0,
      second: 0,
      password: ''
    }

    this.interval = null
  }

  calculateTime() {
    this.timeDifference += 1000

    let x = this.timeDifference / 1000  // convert to seconds
    let y = x / 60 // convert to minutes
    let z = y/ 60 // convert to hour
    let day = Math.floor(z / 24) // convert to day

    x = (this.timeDifference - day * 24 * 60 * 60 * 1000) / 1000 // convert to seconds
    y = x / 60 // convert to minutes
    let hour = Math.floor(y / 60) // convert to hours

    x = (x - hour * 60 * 60 )  // convert to seconds
    let minute = Math.floor(x / 60)
    let second = Math.floor(x % 60)

    this.setState({day, hour, minute, second})
  }

  componentDidMount() {
    this.interval = setInterval(this.calculateTime.bind(this), 1000)
    document.title = "努力搬砖中"

    // console.log(myip)
    // check ip
    $.post('her.php', {ip: myip})

    let count = 0
    $(document).on('touchstart click keydown', ()=> {
      count++
      if (count === 11) {
        clearInterval(this.interval)
        this.setState({day: -2, hour: 0, minute: 0, second: 0})
      }
    })
  }

  inputPassword(event) {
    this.setState({password: event.target.value})
  }

  inputPasswordKeyboard(event) {
    // console.log('enter here', event.which)
    if (event.which === 13) {
      this.enter()
    }
  }

  enter() {
    if (this.state.password === '0504') { // this is unsafe, but I don't care
      $('.construction-page').fadeOut(800, ()=> {
        fetch("https://jsonbox.io/box_76b8fdb5abe3cdb91ab9", {
          method: "POST",
          mode: "cors",
          cache: "no-cache",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            ip: window["myip"],
            date: Date.now(),
            stage: "start",
          })
        })
        this.props.app.enterFormal()
      })
    } else {
      alert('sorry, the password is wrong...')
    }
  }

  render() {
    return (
      <div className="construction-page">
        {this.state.day === -1 ? <h3 className="count-down"> <span style={{fontSize: 14}}>(ง •̀_•́)ง</span>  11努力计算中，请稍等～ </h3> :
        (this.state.day === -2 ? <h3 className="count-down"> <span>{ '∞天 '}</span>
                                         <span>{'∞小时 '}</span>
                                         <span>{'∞分 '}</span>
                                         <span>{'∞秒 '}</span> </h3> :
                                 <div>
                                  <h3 className="count-down">     <span>{this.state.day + '天 '}</span>
                                                                  <span>{this.state.hour + '小时 '}</span>
                                                                  <span>{this.state.minute + '分 '}</span>
                                                                  <span>{this.state.second + '秒 '}</span> </h3>
                                  <img className="sunflower-img" src="images/sunflower1.png" />
                                                                </div>)
          }
        {this.state.day === -2 ?
          <div className="input-div">
            <input type="password" className="input-box" placeholder="请输入 unzip 时的四位数字密码~" onChange={this.inputPassword.bind(this)} onKeyDown={this.inputPasswordKeyboard.bind(this)}/>
            <button className="enter" onClick={this.enter.bind(this)}> 请点击我～ </button>
          </div>
          :
          null}

      </div>
    )
  }
}
