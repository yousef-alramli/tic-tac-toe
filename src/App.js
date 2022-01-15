import './App.css';
import React, { Component } from 'react'

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      indexes: [],
      arr: ["", "", "", "", "", "", "", "", ""],
      turn: "X"
    }
  }

  handleClicking = (i) => {
    const tempArr = this.state.arr

    if (tempArr[i] != "") {
      return
    }

    if (this.state.turn == "X") {
      this.setState({
        turn: "O"
      })
    }
    else {
      this.setState({
        turn: "X"
      })
    }

    tempArr[i] = this.state.turn
    this.setState({
      indexes: [...this.state.indexes, i],
      arr: tempArr
    })

    this.checkWinner(tempArr)
  }

  checkWinner = (array) => {
    const winCases = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ]

    for (let i = 0; i < winCases.length; i++) {
      let [first, second, last] = winCases[i]

      if (array[first] != "" && array[first] == array[second] && array[second] === array[last]) {
        this.setState({
          indexes: [],
          arr: ["", "", "", "", "", "", "", "", ""],
          turn: "X"
        })
        return alert(`${this.state.turn} Player won`)
      }
    }

    if (this.state.indexes.length === 8) {
      this.setState({
        indexes: [],
        arr: ["", "", "", "", "", "", "", "", ""],
        turn: "X"
      })
      return alert(`Draw`)
    }

  }

  undo = () => {
    const indexes = this.state.indexes;
    const index = indexes.pop();
    const array = this.state.arr
    array[index] = ""

    this.setState({
      arr: array,
      indexes: indexes
    })
    if (this.state.turn == "X") {
      this.setState({
        turn: "O"
      })
    }
    else {
      this.setState({
        turn: "X"
      })
    }

  }

  render() {
    return (
      <div className='game'>
        <h2>Player {this.state.turn} Turn</h2>
        <table>
          <tbody>
            <tr>
              {
                this.state.arr.map((elem, i) => {
                  return i < 3 && <th onClick={() => { this.handleClicking(i) }}>{elem}</th>
                })
              }
            </tr>
            <tr>
              {
                this.state.arr.map((elem, i) => {
                  return (i > 2 && i < 6) && <th onClick={() => { this.handleClicking(i) }}>{elem}</th>
                })
              }
            </tr>
            <tr>
              {
                this.state.arr.map((elem, i) => {
                  return i > 5 && <th onClick={() => { this.handleClicking(i) }}>{elem}</th>
                })
              }
            </tr>
          </tbody>
        </table>
        <a>
          <button class="bn54" onClick={this.undo}>
            <span class="bn54span">Undo</span>
          </button>
        </a>
      </div>
    )
  }
}

export default App

