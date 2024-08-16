import { createRoot } from 'react-dom/client'
import { CodeBlock } from "react-code-blocks";
import RenderOutput  from './RenderOutput'
import './Shared.css';
import { useState } from 'react';

function GenerateUnitTestFromSnippet() {
    const data = {codeSnippet:""};
    const [inputData, setInputdata] = useState(data)

    const handleData = (e) => {
        setInputdata({...inputData, [e.target.name]:e.target.value})
    }

    return (
        <div >
            <header>
                <h3 className="text-center mb-4">Generate Unit Tests from Code Snippet</h3>
            </header>
            <div className="row">
                {/* Input Section on the Left */}
                <div id="snippetInputSection" className="col-md-6">
                    <form action="#" method="post">
                        <div className="form-group">
                            <h5 >Input Code Here</h5>
                            <textarea
                                id="codeSnippet"
                                name="codeSnippet"
                                className="form-control"
                                value={inputData.codeSnippet}
                                onChange={handleData}
                                cols="300"
                                rows="20"
                            ></textarea>
                            <br />
                            <button className="btn btn-primary" onClick={uploadSnippet}>
                                Generate
                            </button>
                        </div>
                    </form>
                </div>

                {/* Output Section on the Right */}
                <div id="OutputSection" className="col-md-6">
                    <h5 >Generated Unit Tests</h5>
                    <div id="snippetOutputSection" >

                    </div>
                    {/* The output code block will be rendered here */}
                </div>
            </div>
        </div>
    )

    async function uploadSnippet(e){
        e.preventDefault();

        //const formData = new FormData(e.target)
        const response = await fetch('/api/GenerateUnitTestCase/GenerateUnitTestFromSnippet',{
            method: "POST",
            body: JSON.stringify(inputData),
            headers: {'Content-Type': 'application/json','accept': 'text/plain,',"Access-Control-Allow-Origin": "*"}
        });
        const data = await response.json();

        createRoot(document.querySelector("#snippetOutputSection")).render(<RenderOutput content = {data.output} />)
        console.log(data)
    }
}

export default GenerateUnitTestFromSnippet;