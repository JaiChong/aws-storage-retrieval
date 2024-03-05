import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'

function App() {
  // Update Database
  const [data, setData] = useState(null)
  const loadData = () => {
    
  }
  const clearData = () => {
    
  }
  
  // Search Database
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const query = () => {
    
  }

  return (
    <div className="App">
      <h1>CSS 436 P4: Website + Storage</h1>
      <div className="body">
        <table align="center">
          <tr>
            <td>
              <h2>Update Database</h2>
              <button onClick={loadData}>Load Data</button>
              &ensp;
              <button onClick={clearData}>Clear Data</button>
            </td>
            <td style={{minWidth:'5em'}} />
            <td>
              <h2>Search Database</h2>
              <table>
                <tr>
                  <td>
                    <input type="text" placeholder="Enter a first name..." value={firstName}
                      onChange={event => setFirstName(event.target.value)} />
                    <br />
                    <input type="text" placeholder="Enter a last name..." value={lastName}
                      onChange={event => setLastName(event.target.value)} />
                  </td>
                  &ensp;
                  <td>
                    <button onClick={query}>Query</button>
                  </td>
                </tr>
              </table>
            </td>
            <td style={{minWidth:'5em'}} />
            <td>
              <h2>Search Results</h2>
              uwu
            </td>
          </tr>
        </table>
      </div>
      <div className="credits">
        <p>
          Built using&nbsp;
          <a href="https://vitejs.dev" target="_blank">
            <img src="/vite.svg" className="logo" alt="Vite logo" />
          </a>
          &nbsp;Vite +&nbsp;
          <a href="https://reactjs.org" target="_blank" >
            <img src={reactLogo} className="logo react" alt="React logo" />
          </a>
          &nbsp;React
        </p>
        <p>Written by Jaimi Chong</p>
      </div>
    </div>
  )
}

export default App