const nums = [7, 8, 9, 4, 5, 6, 1, 2, 3, 0];
const ops = [ '/', '*', '-', '+'];
const ids = {
  7: 'seven', 
  8: 'eight', 
  9: 'nine', 
  4: 'four', 
  5: 'five', 
  6: 'six', 
  1: 'one', 
  2: 'two', 
  3: 'three', 
  0: 'zero',
  '/': 'divide', 
  '*': 'multiply', 
  '-': 'subtract', 
  '+': 'add'
}

class App extends React.Component {
  state = {
    lastPress: undefined,
    calc: '0',
  }
  
  
  click = (e) => {
    const { calc, lastPress } = this.state;
    const { innerText } = e.target;
    
    switch(innerText) {
      case 'AC': {
        this.setState({
          calc: '0',
        });
        break;
      }
      case '&#9003;': {
        this.setState({
          calc: "0",
        });
        break;
      }    
      case '=': {
        const evaluated = eval(calc);
        this.setState({
          calc: evaluated
        });
        break;
      }
        
      case '.': {
        const splitted = calc.split(/[\+\-\*\/]/);
        const last     = splitted.slice(-1)[0];
        
        if(!last.includes('.')) {
          this.setState({
            calc: calc+'.'
          })
        }
        
        break;
      }
        
      default: {
        let e = undefined;
        if(ops.includes(innerText)) {
          if(ops.includes(lastPress) && innerText !== '-') {
            const lastNumId = calc.split('').reverse()
                .findIndex(char => char !== ' ' && nums.includes(+char)); 
            e = calc.slice(0, calc.length - lastNumId) + ` ${innerText} `;
          } else {
            e = `${calc} ${innerText} `;
          }
        } else {
          e = (calc === '0') ? innerText : (calc + innerText);
        }
        this.setState({
          calc: e
        });
      }
    }
    
    this.setState({
      lastPress: innerText
    })
    
  }
  
  render() {
    const { currentNumber, calc } = this.state;
    
    return (
      <div>  
      <div className="title">
        A Simple Calculator
      </div>  
      <div className = "calculator">        
        <div
            id        = "display"
            className = "display">
            {calc}
        </div>
        <div 
            className = "nums-cont">
            <button 
                className = "wider light-grey ac" 
                onClick   = {this.click} 
                id        = "clear"
            >
            AC
            </button>
            <button 
                className = "light-grey" 
                onClick   = {this.click} 
                id        = "cl"
            >
            &#9003;
            </button>            
            {nums.map(num => (
                <button 
                    className = {`dark-grey ${num === 0 && 'wider'}`} 
                    key       = {num} 
                    onClick   = {this.click}
                    id        = {ids[num]}
                    >
                    {num}
                </button>
            ))}
            <button 
                className = "light-grey" 
                onClick   = {this.click} 
                id        = "decimal"
            >
            .
            </button>
        </div>
        <div 
            className = "ops-cont">
            {ops.map(op => (
                <button 
                    className = "blue" 
                    key      = {op} 
                    onClick = {this.click}
                    id = {ids[op]}
                    >
                    {op}
                </button>
            ))}
            <button 
                className = "blue" 
                onClick   = {this.click} 
                id        = "equals"
                >
                =
            </button>
        </div>
      </div>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));