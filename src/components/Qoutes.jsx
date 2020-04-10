import React, { Component } from 'react';
import axios from 'axios';
import { FaTwitterSquare } from "react-icons/fa";
import './App.css';

class Qoutes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quote: '',
      author: '',
      bgColor: '#f99192',
      clickCount: 0,
    }
     this.getNewQuote = this.getNewQuote.bind(this);
  }

  getNewQuote = () =>{
    this.getQuote()
    this.changeColor();
    
 }  

  componentDidMount() {
    this.getQuote();
    
  }

  getQuote() {
    axios.get('https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json')
      .then((response) => {
        let data = response.data.quotes
        let number = Math.floor(Math.random() * 100);
        let randomQuote = data[number]

        this.setState({

          quote: randomQuote['quote'],
          author: randomQuote['author'],        
        })
      })
    }
  
  
   changeColor = () => {
    const color = ['#B246F0 ', '#4691F0 ', '#F1C513','#13F121', '#f97171', '#F12B13', '#F08146', '#1338F1' ];
    let i = this.state.clickCount;

    this.setState({
      clickCount: this.state.clickCount+1,
    });

    if(i<7) {
      this.setState({
        bgColor: color[i],
      });
    } else if(i>=7) {
      this.setState({
        bgColor: color[i],
        clickCount: 0,
      });
    } else if (i===0) {
      this.setState({
        clickCount: this.state.clickCount+1,
        bgColor: color[i],
      });
    }
  }

  

  render() {
          return (
            <div id="main">
            <style>
            {`
            :root {
              --main-bg-color: ${this.state.bgColor};
              --main-txt-color: ${this.state.bgColor};
              }
            `}
          </style>
            <div className="App text center" id="quote-box">
            <h1 id="text">{`"${this.state.quote}"`}</h1>
            <h5 id="author" className="d-flex justify-content-end">{`---${this.state.author}`}</h5>
            <div id='buttons'>
                  <a id='tweet-quote' className="rounded-lg width" href={`https://twitter.com/intent/tweet?text=${this.state.quote} ${this.state.author}`} target='_blank' title="Post this quote on twitter!">
                     <span>
                     <i className="twitter-icon "><FaTwitterSquare /></i>
                     </span>
                  </a>
                  <button id='new-quote' className='button' onClick={this.getNewQuote}>New Quote</button>
               </div>
            </div>
            </div>
          );
  }
}



export default Qoutes;