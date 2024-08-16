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
        <div >
            <header>
                <h1 className="text-center mb-4">Snippet Uploader</h1>
            </header>
            <div className="row">
                {/* Input Section on the Left */}
                <div id="snippetInputSection" className="col-md-6">
                    <form action="#" method="post">
                        <div className="form-group">
                            <label htmlFor="codeSnippet">Input Code</label>
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
                                Submit
                            </button>
                        </div>
                    </form>
                </div>

                {/* Output Section on the Right */}
                <div id="snippetOutputSection" className="col-md-6">
                    {/* The output code block will be rendered here */}
                </div>
            </div>
        </div>
    )

}

// body: '"' +inputData.codeSnippet + '"',
export default GenerateUnitTestFromSnippet;