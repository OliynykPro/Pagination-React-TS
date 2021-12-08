import React from "react";
import Pagination from "./components/Pagination/Pagination";

const App:React.FC = () => {
  return (
    <div className="App">
      <Pagination pages={20} onPageChange={() => console.log('log')}/>
    </div>
  );
}

export default App;
