import React from 'react';
import './QuoteMachineApp.css';

const quotes = [
  {text: "Oops.", author: "John Doe"},
  {text: "My bad, yo.", author: "Rory Smith"},
  {text: "I did that.", author: "Steve Urkel"},
  {text: "I can smell what the Rock is cooking.", author: "Steve Austin"},
  {text: "The nut doesn't fall far from the nut.", author: "Jeremy Gray"},
  {text: "Say again?", author: "Dr Who"},
];

class QuoteMachineApp extends React.Component
{
  constructor(props)
  {
    super(props);
    this.state = {
      index: Math.floor(Math.random() * quotes.length)
    };
    
    this.newQuote = this.newQuote.bind(this);
  }

  newQuote()
  {
    this.setState({index: Math.floor(Math.random() * quotes.length)});
  }

  render()
  {
    return (<div id="quote-box">
            <div id="text">
            <p>
            {quotes[this.state.index].text}
            </p>
            </div>
            <div id="author">
            <p>
            &mdash;{quotes[this.state.index].author}
            </p>
            </div>
            <div id="controls">
            <div id="buttons">
            <button type="button" onClick={this.newQuote} id="new-quote">
            New Quote
            </button>
            <a href="twitter.com/intent/tweet" id="tweet-quote">
            Tweet Quote
            </a>
            </div>
            </div>
            </div>);
  }
}

export default QuoteMachineApp;
