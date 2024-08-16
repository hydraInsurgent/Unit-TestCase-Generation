import { createRoot } from 'react-dom/client'
import { CodeBlock } from "react-code-blocks";
import './Shared.css';
import { useState } from 'react';

function GenerateUnitTestFromSnippet() {
    const data = {codeSnippet:""};
    const [inputData, setInputdata] = useState(data)

    const handleData = (e) => {
        setInputdata({...inputData, [e.target.name]:e.target.value})
    }

    async function uploadSnippet(e){
        e.preventDefault();

        //const formData = new FormData(e.target)
        const response = await fetch('/api/GenerateUnitTestCase/GenerateUnitTestFromSnippet',{
            method: "POST",
            body: JSON.stringify(inputData),
            headers: {'Content-Type': 'application/json','accept': 'text/plain,',"Access-Control-Allow-Origin": "*"}
        });
        const data = await response.json();
        var output = <CodeBlock
            text= {data.output}
            language='javascript'
            showLineNumbers={true}
            theme='atom-one-dark'
        />
        createRoot(document.querySelector("#snippetOutputSection")).render(output)
        console.log(data)
    }
    return (
        <div>
            <header>
                <h1>Snippet Uploader</h1>
            </header>
            <div id="snippetInputSection">
                <form action="#" method="post"  >
                    <div className="form-group">
                        <label>Input Code</label>
                        <textarea 
                            id="codeSnippet"
                            name="codeSnippet"
                            value={inputData.codeSnippet}
                            onChange={handleData}
                            cols="40" 
                            rows="5"
                        ></textarea>
                        <br />
                        <button onClick={uploadSnippet} >Submit</button>
                    </div>
                </form>
            </div>
            <div id="snippetOutputSection">
                
            </div>

        </div>
    )

}

// body: '"' +inputData.codeSnippet + '"',
export default GenerateUnitTestFromSnippet;