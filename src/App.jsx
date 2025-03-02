import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'

export default function App() {
  // All buttons
  const lambdaFuncURL                       = 'https://d4kp46mntnq3egbvsnlfruggnu0bimre.lambda-url.us-west-2.on.aws/'
  const [consoleOut, setConsoleOut]         = useState('Hello!  This application modifies and searches data (see previous).\n\nSource Data Format (line breaks delimit entries):\n  \"LastName FirstName attr1=val1 attr2=val2 ... attrN=valN\"\n\nSource Data Examples:\n  https://jaichong-p4.s3.us-west-2.amazonaws.com/test1.txt\n  https://jaichong-p4.s3.us-west-2.amazonaws.com/test2.txt')
  const [sourceS3Object, setSourceS3Object] = useState('');
  const lambdaReq = async (buttonName, reqBody) => {
    try {
      const resp = await fetch(lambdaFuncURL, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(reqBody)
      })
      const data      = await resp.json()
      const formatted = JSON.stringify(data, null, 2).replace(/\\n/g, '\n')
      setConsoleOut((consoleOut) => consoleOut + '\n\n' + formatted)
    }
    catch(err) { setConsoleOut((consoleOut) => consoleOut + '\n\n' + buttonName + ' Request to Lambda Failed: ' + err) }
  }
  
  // Load Data button
  // const sourceS3Object = 'https://s3-us-west-2.amazonaws.com/css490/input.txt'
  const loadData = async () => {
    try {
      const sourceResp = await fetch(sourceS3Object)
      const sourceData = await sourceResp.text()
      if (sourceData.charAt(0) == '<') {
        throw new Error('Invalid URL')
      }
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

  return (<>
    <header><h1>AWS Storage/Retrieval Tool</h1></header>
    
    <main>  {/* TODO: Replace FlexBoxes with Grid, so .search-inputs can be easily center-aligned */}
      <section className="section-input">
        <div> {/* HACK */}
          <h2>Modify Database</h2>
          <article className="article-modify-database">
            <input
              type="text"
              placeholder="Enter a source text URL..."
              value={sourceS3Object}
              onChange={event => setSourceS3Object(event.target.value)}
            />
            <button onClick={clearData}>Clear Data</button>
            <button onClick={loadData }>Load Data </button>
          </article>
        </div>

        <div>
          <h2 id="h2-hack">Search Database</h2>
          <article className="article-search-database">
            <div>
              <input
                type="text"
                placeholder="Enter a first name..."
                value={firstName}
                onChange={event => setFirstName(event.target.value)}
              />
              <input
                type="text"
                placeholder="Enter a last name..."
                value={lastName}
                onChange={event => setLastName(event.target.value)}
              />
            </div>
            <button onClick={query}>Query</button>
          </article>
        </div>
      </section>

      <section className="section-output">
        <div>
          <h2>Output</h2>
          <article className="console">{consoleOut}</article>
        </div>
      </section>
    </main>

    <footer>
      <p>
        Built using:
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="vite" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank" >
          <img src={reactLogo} className="react" alt="React logo" />
        </a>
        <a href="https://aws.amazon.com/amplify/" target="_blank">
          <img src="https://d3rrzw75sdtfe5.cloudfront.net/icon/9da5a168cf8194c8ee5ed192a443d563-674375b53bc8ae94f48cfdb5c81e8363.svg" className="amplify" alt="AWS Amplify logo" />
        </a>
        <a href="https://aws.amazon.com/lambda/" target="_blank">
          <img src="https://d3rrzw75sdtfe5.cloudfront.net/icon/945f3fc449518a73b9f5f32868db466c-926961f91b072604c42b7f39ce2eaf1c.svg" className="lambda" alt="AWS Lambda logo" />
        </a>
        <a href="https://aws.amazon.com/s3/" target="_blank">
          <img src="https://d3rrzw75sdtfe5.cloudfront.net/icon/c0828e0381730befd1f7a025057c74fb-43acc0496e64afba82dbc9ab774dc622.svg" className="s3" alt="AWS S3 logo" />
        </a>
        <a href="https://aws.amazon.com/dynamodb/" target="_blank">
          <img src="https://d3rrzw75sdtfe5.cloudfront.net/icon/6f419a45e63123b4c16bd679549610f6-87862c68693445999110bbd6a467ce88.svg" className="dynamodb" alt="AWS DynamoDB logo" />
        </a>
      </p>
      <p>
        Written by:&nbsp;
        <a href="https://github.com/JaiChong/" className="author" target="_blank">
          Jaimi Chong
        </a>
      </p>
    </footer>
  </>)
}