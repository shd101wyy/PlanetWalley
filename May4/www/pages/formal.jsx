import React from 'react'
import L0ve from '../data/0504.js'

export default class Formal extends React.Component {
  constructor(props) {
    super(props)
    this.offset = 0
    this.sentences = L0ve
    this.clicked = false

    this.state = {
      sentence: this.sentences[this.offset],
      done: false,
      emailContent: '',
      emailSent: false
    }

    this.disableClick = false
  }

  componentDidMount() {
    console.log('Component Did Mount')
    document.title = "你好~"

    let next = ()=> {
      if (this.disableClick) return
      this.clicked = true
      this.offset++;
      if (this.offset > this.sentences.length || this.state.done) {
        // do nothing
      } else if (this.offset === this.sentences.length) {
        this.disableClick = true
        $('.wrapper').fadeOut(600, ()=> {
          this.setState({done: true})
          $('.wrapper').fadeIn(1000)
          this.disableClick = false
        })
      } else {
        this.disableClick = true
        $('.wrapper').fadeOut(600, ()=> {
          let sentence = this.sentences[this.offset]
          this.setState({sentence: sentence})
          if ( sentence.text.startsWith("对了，我又给你画了一幅画")) {
            this.props.app.showPictureSong()

            // change background color
            let $html = $('html')
            $html
              .removeClass('background-blue-gradient')
              .addClass('background-orange')
            setTimeout(()=> {
              $html.addClass('background-orange-gradient')
            }, 6000)
          }
          $('.wrapper').fadeIn(1000)
          this.disableClick = false
        })
      }
    }

    //
    $(document).on('touchstart click keydown', next)
  }

  inputEmailContent(event) {
    this.setState({emailContent: event.target.value})
  }

  sendEmail() {
    if (this.state.emailContent.length > 0) {
      $.post('server.php', { email: this.state.emailContent}); // send email to my mailbox
    }
    $('.wrapper').fadeOut(600, ()=> {
      this.setState({emailSent: true})

      // change background color
      let $html = $('html')
      $html
        .removeClass('background-orange background-orange-gradient')
        .addClass('background-black')
      setTimeout(()=>{ $html.addClass('background-black-gradient')}, 6000)

      $('.wrapper').fadeIn(2000, ()=> {
        let $thanks = $('.thanks')
        setTimeout(()=> {
          $thanks.animate({scrollTop: "2600px"}, 27000, "linear", ()=> {
            console.log('谢谢观赏')
            document.title = '谢谢你'
            $thanks.css({'overflow-y': 'hidden'}) // disable scroll
          })
        }, 5000)
      })
    })
  }

  // 这个不用了
  // mobile device 上有问题
  clickImage() {
    window.open(this.state.sentence.path,'_blank')
    window.focus()
  }

  render() {
    return (
      this.state.emailSent ?
      <div className="formal-page">
        <div className="wrapper thanks">
          <h1> By shd101wyy</h1> <br/>
          <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
          <h1> Special Thanks </h1> <br/>
          <br/><br/>
          <h2 className="thank-name"> 妈妈，爸爸</h2>
          <h2 className="thank-name"> 四人帮基友 小李子</h2>
          <h2 className="thank-name"> 四人帮基友 王上明</h2>
          <h2 className="thank-name"> 四人帮基友 夏荫杰</h2>
          <h2 className="thank-name"> 大学基友 楼神</h2>
          <h2 className="thank-name"> 大学基友 张总</h2>
          <h2 className="thank-name"> 知乎设计师 李奇</h2>
          <h2 className="thank-name"> 渡鸦Rui 姐姐</h2>
          <h2 className="thank-name"> 人生导师 于老师</h2>
          <br/><br/><br/><br/><br/><br/><br/>
          <h1> 感谢所有鼓励过我帮助过我的人们 ;) </h1> <br/>
          <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
          <h1 className="thank-end"> Thank you </h1>
        </div>
      </div>
       : (
        this.state.done ? (
          <div className="formal-page">
            <div className="wrapper">
              <h1 className="text"> 自言自语了这么多, 你有要对我说的话吗？</h1>
              <input type="text" className="email-content" placeholder="在这里输入你想说的话～" onChange={this.inputEmailContent.bind(this)} value={this.state.emailContent}/>
              <button className="send-email-btn" onClick={this.sendEmail.bind(this)}> Send </button>
            </div>
          </div>
        ) : (
          <div className="formal-page">
            <div className="wrapper">
            {this.state.sentence.type === 'text' ?
                <h1 className="text"> {this.state.sentence.text} </h1> :
                <div className="image-text">
                  <img src={this.state.sentence.path} />
                  <h1 className="text"> {this.state.sentence.text} </h1>
                </div>}
            </div>
            {this.clicked ? null : <p className="hint">
                                    <span className="desktop"> click screen to continue <br/> 点击(或键盘)屏幕继续 </span>
                                    <span className="mobile"> touch screen to continue <br/> 触摸屏幕继续 </span>
                                   </p>}
          </div>
        )))
  }
}
