
import { useState } from 'react';
import './App.css'
import Header from './components/Header.tsx/Header'
import Params from './components/Params/Params'
import Status from './components/Status/Status'

function App() {
 const [pass, setpass] = useState<string>('');

  return (
    <>
      <Header pass={pass} setPass={setpass}/>
      <div className="p-4 flex">
        <Params pass={pass}/>
        <Status pass={pass}/>
      </div>

    </>
  )
}

export default App
