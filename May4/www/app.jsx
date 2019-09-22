import './less/index.less'

import React from 'react'
import ReactDOM from 'react-dom'
import Construction from './pages/construction.jsx'
import Formal from './pages/formal.jsx'

class App extends React.Component {
  constructor(props) {
    super(props)

    this.count = 0

    this.state = {
      underConstruction: true,
      NotFound404: true
    }
  }

  componentDidMount() {
    this.song = new Audio('./songs/老男孩.mp3')

    $(document).on('touchstart click keydown', ()=> {
      this.count++
      if (this.count === 11) {
        this.setState({NotFound404: false}, ()=> {
          console.log('enter here')
          this.song.loop = true
          this.song.volume = 1
          this.song.play()
        })
      }
    })
  }

  enterFormal() {
    $(this.song).animate({volume: 0}, 1000, 'linear', ()=> {
      this.song.pause()
      this.song = new Audio('./songs/夜空中最亮的星.mp3')
      this.song.loop = true
      this.song.play()
    })
    this.setState({underConstruction: false})
  }

  showPictureSong() {
    $(this.song).animate({volume: 0}, 1000, 'linear', ()=> {
      this.song.pause()
      this.song = new Audio('./songs/夏洛特烦恼.mp3')
      this.song.loop = true
      this.song.play()
    })
  }

  render() {
    return (
      this.state.NotFound404 ? <div className="page-404"> <h2 className="hint"> 404 error</h2> </div> :
        (this.state.underConstruction ? <Construction app={this} /> : <Formal app={this} />)
    )
  }
}

ReactDOM.render(
  (<App />),
  document.getElementById('app')
);
