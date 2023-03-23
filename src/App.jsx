import { useEffect, useRef, useState } from 'react'
import { useFormik } from 'formik';
import './App.css'

function App() {
  
  const {errors, touched, handleChange: formikHandle, handleBlur} = useFormik();

  const inputRef = useRef({})
  const [otp, setOtp] = useState({
    digitOne : "",
    digitTwo : "",
    digitThree : "",
    digitFour : "",
    digitFive : "",
    digitSix : "",
  })
 
  useEffect(() => {
    inputRef.current[0].focus();

    inputRef.current[0].addEventListener("paste", pasteText);

    return () => inputRef.current[0].removeEventListener("paste", pasteText);
  }, [])

  const pasteText = (event) => {
    const pastedText =  event.clipboardData.getData("text");
    const fieldValues = {};
    //console.log(pastedText);
    Object.keys(otp).forEach((keys,index) => {
      fieldValues[keys] = pastedText[index] ;
    });

    setOtp(fieldValues);
    inputRef.current[5].focus();
  }
  
  const handleChange = (event, index) => {
    const { name , value }  = event.target;

    if(/[a-z]/gi.test(value)) return;

    setOtp(prev => ({
      ...prev,
      [name] : value.slice(-1),

    }))

    if(value && index < 5)
        inputRef.current[index +1].focus();
  };

  const handleBackSpace = (event, index) => {
    if(event.key === "Backspace")
      if(index > 0)
        inputRef.current[index -1].focus();
  }

  const renderInput =() =>{
    return Object.keys(otp).map(( keys, index) => (
      <input 
         type="text" 
         key={index}
         name={keys} 
        // maxLength="1"
         value={otp[keys]}
         ref={(element) => (inputRef.current[index] = element)}
         className='w-16 h-12 rounded-md mr-3 text-center text-xl' 
         onChange={(event) => handleChange(event,index)}
         onKeyUp={(event) => handleBackSpace(event,index)}
        />
    ));
  };


  return (
    <form action="">
      <h3 className='text-3xl mb-8 '>Please fill in the otp</h3>
      <div>{renderInput()}</div>   
      <button className='mt-4 w-34 border border-solid bg-[#3b3b3b] rounded hover:bg-[#252525] hover:border-[#3b3b3b3b]'>Submit</button>
    </form>
  )
}

export default App
