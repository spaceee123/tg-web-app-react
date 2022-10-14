import './App.css';
import {useEffect} from "react";
import {useTelegram} from "./components/hooks/useTelegram";


function App() {
    const{onToggleButton,tg} = useTelegram();

    useEffect(()=>{
        tg.ready();
    },[])

  return (
    <div className="App">
     <button onClick={onToggleButton}>togglee</button>
    </div>
  );
}

export default App;
