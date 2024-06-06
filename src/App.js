import './App.css';
import axios from 'axios';
import { useState } from 'react';
import translate from 'translate'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  axios.defaults.baseURL = "http://localhost:5000/hadith";
  const [hadithData, setHadithData] = useState([]);
  const [filteredData, setFilteredData] = useState(null);
  const [bgcolor] = useState(["lightyellow","lightsalmon","lightpink", "lightcoral", "lightblue","lightcyan","lightgray","lightorange","lightgreen","lightskyblue"]);
  const [currentColor, setCurrentColor] = useState("");
  const [translateprocess,settranslateprocess]=useState(true)
  const [checkindex,setcheckindex]=useState(1)
  

  const handleClick = async () => {
    const result = await axios.get("/");
    if (result.data.message === 'success') {
      setHadithData(result.data.hadith);
      const randomIndex = Math.floor(Math.random() * result.data.hadith.length);
      const randomColorIndex = Math.floor(Math.random() * bgcolor.length);
      setFilteredData(result.data.hadith[randomIndex]);
      setCurrentColor(bgcolor[randomColorIndex]);
      // console.log(bgcolor[randomColorIndex]);
      console.log(hadithData)
      setcheckindex(randomIndex)
    }
  };
  const translatedata=async()=>{
    // console.log(filteredData.quote)
    // settranslateprocess(translateprocess)
      if(translateprocess===true)
        {
    const quote=await translate(filteredData.quote,
      {
        from:'en',
        to:'hi'
      }
    )
    const reference=await translate(filteredData.reference,
      {
        from:'en',
        to:'hi'
      }
    )
    setFilteredData({quote,reference})
    settranslateprocess(false)
  }
  else
  {
    const quote=await translate(filteredData.quote,
      {
        from:'hi',
        to:'en'
      }
    )
    const reference=await translate(filteredData.reference,
      {
        from:'hi',
        to:'en'
      }
    )
    setFilteredData({quote,reference})
    settranslateprocess(true)

  }
  
  }
const copydataquote=()=>{
      const quote="Quote: "+filteredData.quote+"\nReference: "+filteredData.reference
     navigator.clipboard.writeText(quote)
     toast("Text Copied..!");
    
}
  return (
    <>
     <h2 align='center'> Islamic Quote Generater</h2>
    <div className="App">
      <div className='container'>
        <button onClick={handleClick}>Generate Quote</button>
        <ToastContainer />
      </div>
      {filteredData && (
        <>
          <div className='container-2' style={{ backgroundColor: currentColor }}>
          <div className='copydiv'>
        <p>{checkindex+1} Of {hadithData.length}</p>
              <svg  onClick={copydataquote} className='btncopy' width='30px' height='20px'xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M6 4V8H18V4H20.0066C20.5552 4 21 4.44495 21 4.9934V21.0066C21 21.5552 20.5551 22 20.0066 22H3.9934C3.44476 22 3 21.5551 3 21.0066V4.9934C3 4.44476 3.44495 4 3.9934 4H6ZM8 2H16V6H8V2Z"></path></svg>
            </div>
            <p><b>Quote:</b> {filteredData.quote}</p>
            <p><b>Reference:</b> {filteredData.reference}</p> 
            <div className='btntranslatediv'><button className='btntranslate'onClick={translatedata}>Translate</button></div>
            
          </div>
        </>
      )}
    </div>
    </>
  );
}

export default App;
