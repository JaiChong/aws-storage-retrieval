import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'

export default function App() {
  // All buttons
  const lambdaFuncURL               = 'https://d4kp46mntnq3egbvsnlfruggnu0bimre.lambda-url.us-west-2.on.aws/'
  const [consoleOut, setConsoleOut] = useState('Hello!  This application updates and searches data (see left).\n\nSource Data Format (line breaks delimit entries):\n  \"LastName FirstName attr1=val1 attr2=val2 ... attrN=valN\"\n\nSource Data Examples:\n  https://jaichong-p4.s3.us-west-2.amazonaws.com/test1.txt\n  https://jaichong-p4.s3.us-west-2.amazonaws.com/test2.txt')
  const [sourceS3Object, setSourceS3Object] = useState('');
  const lambdaReq = async (buttonName, reqBody) => {
    try {
      const resp = await fetch(lambdaFuncURL, {method:'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(reqBody)
      })
      const data      = await resp.json()
      const formatted = JSON.stringify(data, null, 2).replace(/\\n/g, '\n')
      setConsoleOut((consoleOut) => consoleOut + '\n\n' + formatted)
    }
    catch(err) {  setConsoleOut((consoleOut) => consoleOut + '\n\n' + buttonName + ' Request to Lambda Failed: ' + err) }
  }
  
  // Load Data button
  // const sourceS3Object = 'https://s3-us-west-2.amazonaws.com/css490/input.txt'
  const loadData = async () => {
    try {
      const sourceResp = await fetch(sourceS3Object)
      const sourceData = await sourceResp.text()
      
      const lambdaReqBody = {
        button: 'loadData',
        key:    'input.txt',
        object: sourceData
      }
      lambdaReq('Load Data', lambdaReqBody)
    }
    catch(err) { setConsoleOut((consoleOut) => consoleOut + '\n\n' + 'Load Data Request to Source S3 Object Failed: ' + err) }
  }

  // Clear Data button
  const clearData = () => {
    const lambdaReqBody = {
      button: 'clearData',
      key:    'input.txt'
    }
    lambdaReq('Clear Data', lambdaReqBody)
  }
  
  // Query button
  const [firstName, setFirstName] = useState('')
  const [lastName,  setLastName ] = useState('')
  const query = () => {
    const lambdaReqBody = {
      button:     'query',
      last_name:  lastName,
      first_name: firstName
    }
    lambdaReq('Query', lambdaReqBody)
  }

  return (
    <div className="App">
      <h1>CSS 436 P4: Website + Storage</h1>
      
      <div className="body">
        <table align="center">
          <tbody>
            <tr>

              {/* Left column */}
              <td>
                <table>
                  <tbody>
                    <tr>

                      {/* Top-left cell */}
                      <td>
                        <h2>Update Database</h2>
                        <input type="text" placeholder="Enter a source data text file URL..." value={sourceS3Object}
                          onChange={event => setSourceS3Object(event.target.value)} style={{width:"14rem", marginBottom:"0.5rem"}} />
                        <br />
                        <button onClick={clearData}>Clear Data</button>
                        &ensp;
                        <button onClick={loadData}>Load Data</button>
                      </td>

                    </tr>
                    <tr>

                      {/* Bottom-left cell */}
                      <td>
                        <h2>Search Database</h2>
                        <table>
                          <tbody>
                            <tr style={{verticalAlign:"middle"}}>
                              <td>
                                <input type="text" placeholder="Enter a first name..." value={firstName}
                                  onChange={event => setFirstName(event.target.value)} style={{width:"8.5rem"}} />
                                <br />
                                <input type="text" placeholder="Enter a last name..." value={lastName}
                                  onChange={event => setLastName(event.target.value)} style={{width:"8.5rem"}} />
                              </td>
                              <td>
                                &ensp;
                                <button onClick={query}>Query</button>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>

                    </tr>
                  </tbody>
                </table>
              </td>

              {/* Spacing between columns */}
              <td style={{minWidth:'5vw'}} />
              
              {/* Right column */}
              <td>
                <h2>Output</h2>
                <div id="console">{consoleOut}</div>
              </td>
              
            </tr>
          </tbody>
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