import { useState, useCallback, useEffect,useRef, use } from 'react'
import './App.css'

function App() {
  const [length , setLength]  = useState(8);
  const [numberAllowed, setNumberAllowed]  = useState(false);
  const [charAllowed, setCharAllowed]  = useState(false);
  const [password, setPassword]  = useState("");

  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(()  =>{
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if(numberAllowed) str += "0123456789";
    if(charAllowed) str +="][;'./=-~!@#$%^&*";

    for (let i = 1; i <= length; i++){
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);

    }
    setPassword(pass);
    
  } , [length, numberAllowed,charAllowed,setPassword])

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    
    window.navigator.clipboard.writeText(password);
  },[password])

useEffect(() => {
  passwordGenerator();
}, [length, numberAllowed , charAllowed , passwordGenerator])
  return (
    <>
    <div className="w-full text-center max-w-md mx-auto shadow-md rounded-lg px-4 my-13 py-2 text-orange-500 bg-gray-700"> 
      <h1 className='text-white text-xl my-2'>PassWord Generator</h1>
      <div className='flex shadow rounded-lg overflow-hidden mb-4'>

        <input type="text" 
        value ={password}
        className='outline-none bg-white  w-full py-2 px-auto'
        placeholder='Password'
        readOnly 
        ref={passwordRef}/>
        <button onClick={copyPasswordToClipboard} className='placeholder-black outline-none bg-blue-700 text-white px-3 py-1 shrink-0'>Copy</button>

      </div>
      <div className="flex text-sm gap-x-2">
            <div className="flex items-center gap-x-1">
              <input type="range"
              min ={6}
              max = {100}
              value={length}
              className='cursor-pointer' 
              onChange={(e) => {setLength(e.target.value)}}/>
              <label > Length: {length} </label>
            </div>
            <div className="flex items-center gap-x-1">
              <input type="checkbox"
              defaultChecked = {numberAllowed}
              id = "numberInput"
              onChange={(e) => {
                setNumberAllowed((prev) => !prev);
              }} />
              <label htmlFor="numberIntput" > Numbers</label>
            </div>
            <div className="flex items-center gap-x-1">
              <input type="checkbox"
              defaultChecked = {charAllowed}
              id = "charInput"
              onChange={() => {
                setNumberAllowed((prev) => !prev);
              }} />
              <label htmlFor="charInput" > Characters</label>
            </div>
          </div>
    </div>
    </>
  )
}

export default App
