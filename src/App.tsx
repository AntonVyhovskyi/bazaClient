
import { useState } from 'react';
import './App.css'
import Header from './components/Header.tsx/Header'
import Params from './components/Params/Params'
import Status from './components/Status/Status'
import Hystory from './components/Hystory/Hystory';

function App() {
 const [pass, setpass] = useState<string>('');

  return (
    <>
      <Header pass={pass} setPass={setpass}/>
      <div className="p-4 flex">
        <Params pass={pass}/>
        <Status pass={pass}/>
      </div>
      <div className=' border-2 border-gray-300 p-4 mx-auto my-4 max-w-300'>
        <Hystory/>
      </div>

    </>
  )
}

export default App
