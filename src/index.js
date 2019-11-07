import React, { useState } from "react";
import ReactDOM from "react-dom";

import "./styles.css";
import MultiSelect from "./MultiSelect";

function App() {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const handleChange = value => {
    setSelectedOptions(value);
  };
  return (
    <div className="App">
     <div className='multi-select-container' style={{ width: '25%', display: 'flex', alignItems: 'center' }}>
        <MultiSelect
        value={selectedOptions}
        options={[
          { value: "option1", label: "option1" },
          { value: "option2", label: "option2" },
          { value: "option3", label: "option3" },
          { value: "option31", label: "option31" },
          { value: "option4", label: "option4" },
          { value: "option5", label: "option5" },
          { value: "option6", label: "option6" },
          { value: "option7", label: "option7" },
          { value: "option8", label: "option8" },
          { value: "option9", label: "option9" },
          { value: "option10", label: "option10" }
        ]}
        onChange={handleChange}
      />
      </div> 
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
