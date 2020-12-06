import React from 'react';
import './CalculatorApp.css';

const digits = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
const opNames = ['add', 'subtract', 'multiply', 'divide', 'equals'];

const digitToNum = {
  zero: '0',
  one: '1',
  two: '2',
  three: '3',
  four: '4',
  five: '5',
  six: '6',
  seven: '7',
  eight: '8',
  nine: '9'
};

const nameToSymbol = {
  'add': '+',
  'subtract': '-',
  'multiply': '*',
  'divide': '/',
}

class CalculatorApp extends React.Component
{
  constructor(props)
  {
    super(props);

    this.state = {
      display: '0',
      answer: 0,
      formula: ''
    };

    this.handleClick = this.handleClick.bind(this);
  };
  
  componentDidMount()
  {
  };

  componentWillUnmount()
  {
  };

  parseInput(str)
  {
    // Return an object containing an array of numbers and an array of
    // operands for use in evaluate().

    // Handle the lead sign once everything else is working.
    // const leadSignRE = new RegExp(/(?<=^\s*)[-+]/);
    const numRE = new RegExp(/[0-9.]+/, 'g');
    const opRE = new RegExp(/[+\-*/]+/, 'g');
    let stack = {
      numbers: [],
      ops: []
    };
    let number;
    let op;

    // Validate input.
    console.log(this.validateInput(str));
    if (this.validateInput(str))
    {
      // Build number and operand arrays.
      while ((number = numRE.exec(str)) !== null)
      {
        stack['numbers'].push(number[0]);
      }

      while ((op = opRE.exec(str)) !== null)
      {
        stack['ops'].push(op[0]);
      }

      return stack;
    }
    else
    {
      return null;
    }
  }

  validateInput(str)
  {
    // const leadSignRE = new RegExp(/(?<=^\s*)[-+]/);
    const numRE = new RegExp(/[0-9.]+/, 'g');
    // Shouldn't need to validate operations.
    // Spec defines how to handle multiple operations.
    // const opRE = new RegExp(/[+\-*/]+/, 'g');
    let number;

    while ((number = numRE.exec(str)) !== null)
    {
      if (! this.validateZeroes(number[0])) return false;
      if (! this.validateDecimals(number[0])) return false;
    }

    return true;
  }

  validateDecimals(num)
  {
    return ! /\..*\./.test(num);
  }

  validateZeroes(num)
  {
    return ! /^0{2,}/.test(num);
  }

  clearCalculator()
  {
    this.setState({
      display: '0',
      formula: ''
    });
  };

  evaluateOneOp(one, two, op)
  {
    let result;

    switch (op)
    {
      case '+':
      result = parseFloat(one) + parseFloat(two);
      break;

      case '-':
      result = parseFloat(one) - parseFloat(two);
      break;

      case '*':
      result = parseFloat(one) * parseFloat(two);
      break;

      case '/':
      result = parseFloat(one) / parseFloat(two);
      break;

      default:
      break;
    }

    return result;
  }
  
  evaluateMultiOp(one, two, op)
  {
    if (op[op.length - 1] === '-')
    {
      console.log(one, two, op[op.length - 2]);
      return this.evaluateOneOp(one, '-' + two, op[op.length - 2]);
    }
    else
    {
      console.log(one, two, op[op.length - 1]);
      return this.evaluateOneOp(one, two, op[op.length - 1]);
    }
  }
  
  evaluate(stack)
  {
    console.log(stack);
    let result = stack['numbers'][0];

    for (let i = 0; i < stack['ops'].length; i++)
    {
      if (stack['ops'][i].length === 1)
      {
        result = this.evaluateOneOp(result, stack['numbers'][i + 1], stack['ops'][i]);
      }
      else
      {
        result = this.evaluateMultiOp(result, stack['numbers'][i + 1], stack['ops'][i]);
      }
    }
    
    return result;
  };

  handleClick(event)
  {
    // Clear.
    if (event.currentTarget.id === 'clear')
    {
      this.clearCalculator();
    }
    // Digits.
    else if (digits.includes(event.currentTarget.id))
    {
      const num = digitToNum[event.currentTarget.id];
      if (this.state.display === '0')
      {
        this.setState({display: num});
      }
      else
      {
        if (this.validateInput(this.state.display + num))
        {
          this.setState((state) =>
                        {
                          return {
                            display: state.display + num
                          };
                        });
        }
      }
    }
    // Decimal point.
    else if (event.currentTarget.id === 'decimal')
    {
      if (this.validateInput(this.state.display + '.'))
      {
        this.setState((state) =>
                      {
                        return {
                          display: state.display + '.'
                        };
                      });
      }
    }
    // Operation.
    else if (opNames.includes(event.currentTarget.id))
    {
      // this.handleOp(event.currentTarget.id);

      switch (event.currentTarget.id)
      {
        case 'equals':
        // console.log(this.state.display);
        // console.log(this.parseInput(this.state.display));
        const result = this.evaluate(this.parseInput(this.state.display));
        // console.log(result);

        this.setState((state) =>
                      {
                        return {
                          display: result,
                          answer: result
                        };
                      });

        break;

        default:
        const symbol = nameToSymbol[event.currentTarget.id];
        if (this.validateInput(this.state.display + symbol))
        {
          this.setState((state) =>
                        {
                          return {
                            display: state.display + symbol
                          };
                        });
        }
      }
    }
  };

  render()
  {
    return (
        <div className="calculatorApp" id="calculatorAppContainer">
        <CalculatorDisplay display={this.state.display} stack={this.state.stack} />
        <CalculatorKeypad click={this.handleClick} />
        </div>
    );
  };
};

class CalculatorDisplay extends React.Component
{
  render()
  {
    return (
        <div className="calculatorApp" id="display">
        {this.props.display}
      </div>
    );
  }
};

class CalculatorKeypad extends React.Component
{
  constructor(props)
  {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }
  
  handleClick(event)
  {
    this.props.click(event);
  }

  render()
  {
    return (
        <div className="calculatorApp" id="calculatorKeypadContainer">
        <CalculatorKey label={'F1'} id={'f1'} click={this.props.click} />
        <CalculatorKey label={'F2'} id={'f2'} click={this.props.click} />
        <CalculatorKey label={'F3'} id={'f3'} click={this.props.click} />
        <CalculatorKey label={'F4'} id={'f4'} click={this.props.click} />
        <CalculatorKey label={'F5'} id={'f5'} click={this.props.click} />

        <CalculatorKey label={'2nd'} id={'second'} click={this.props.click} />
        <CalculatorKey label={'EXIT'} id={'exit'} click={this.props.click} />
        <CalculatorKey label={'MORE'} id={'more'} click={this.props.click} />
        <CalculatorKey label={'^'} id={'up'} click={this.props.click} />
        <CalculatorKey label={'v'} id={'down'} click={this.props.click} />

        <CalculatorKey label={'alpha'} id={'alpha'} click={this.props.click} />
        <CalculatorKey label={'x-VAR'} id={'xvar'} click={this.props.click} />
        <CalculatorKey label={'DEL'} id={'del'} click={this.props.click} />
        <CalculatorKey label={'<'} id={'left'} click={this.props.click} />
        <CalculatorKey label={'>'} id={'right'} click={this.props.click} />

        <CalculatorKey label={'GR'} id={'graph'} click={this.props.click} />
        <CalculatorKey label={'STAT'} id={'stat'} click={this.props.click} />
        <CalculatorKey label={'PRGM'} id={'program'} click={this.props.click} />
        <CalculatorKey label={'CUST'} id={'custom'} click={this.props.click} />
        <CalculatorKey label={'CLEAR'} id={'clear'} click={this.props.click} />

        <CalculatorKey label={'LOG'} id={'log'} click={this.props.click} />
        <CalculatorKey label={'SIN'} id={'sine'} click={this.props.click} />
        <CalculatorKey label={'COS'} id={'cosine'} click={this.props.click} />
        <CalculatorKey label={'TAN'} id={'tangent'} click={this.props.click} />
        <CalculatorKey label={'^'} id={'power'} click={this.props.click} />

        <CalculatorKey label={'LN'} id={'natlog'} click={this.props.click} />
        <CalculatorKey label={'EE'} id={'scinot'} click={this.props.click} />
        <CalculatorKey label={'('} id={'lparen'} click={this.props.click} />
        <CalculatorKey label={')'} id={'rparen'} click={this.props.click} />
        <CalculatorKey label={'/'} id={'divide'} click={this.props.click} />

        <CalculatorKey label={'x^2'} id={'square'} click={this.props.click} />
        <CalculatorKey label={'7'} id={'seven'} click={this.props.click} />
        <CalculatorKey label={'8'} id={'eight'} click={this.props.click} />
        <CalculatorKey label={'9'} id={'nine'} click={this.props.click} />
        <CalculatorKey label={'*'} id={'multiply'} click={this.props.click} />

        <CalculatorKey label={','} id={'comma'} click={this.props.click} />
        <CalculatorKey label={'4'} id={'four'} click={this.props.click} />
        <CalculatorKey label={'5'} id={'five'} click={this.props.click} />
        <CalculatorKey label={'6'} id={'six'} click={this.props.click} />
        <CalculatorKey label={'-'} id={'subtract'} click={this.props.click} />

        <CalculatorKey label={'STO>'} id={'store'} click={this.props.click} />
        <CalculatorKey label={'1'} id={'one'} click={this.props.click} />
        <CalculatorKey label={'2'} id={'two'} click={this.props.click} />
        <CalculatorKey label={'3'} id={'three'} click={this.props.click} />
        <CalculatorKey label={'+'} id={'add'} click={this.props.click} />

        <CalculatorKey label={'ON'} id={'on'} click={this.props.click} />
        <CalculatorKey label={'0'} id={'zero'} click={this.props.click} />
        <CalculatorKey label={'.'} id={'decimal'} click={this.props.click} />
        <CalculatorKey label={'(-)'} id={'negative'} click={this.props.click} />
        <CalculatorKey label={'='} id={'equals'} click={this.props.click} />
        </div>
    );
  }
};

class CalculatorKey extends React.Component
{
  constructor(props)
  {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }
  
  handleClick(event)
  {
    this.props.click(event);
  }

  render()
  {
    if (digits.includes(this.props.id))
    {
      return (
          <div className="calculatorApp calculatorKey numpad" id={this.props.id} onClick={this.props.click}>
          {this.props.label}
        </div>
      );
    }
    else
    {
      return (
          <div className="calculatorApp calculatorKey" id={this.props.id} onClick={this.props.click}>
          {this.props.label}
        </div>
      );
    }
  };
}

export default CalculatorApp;
