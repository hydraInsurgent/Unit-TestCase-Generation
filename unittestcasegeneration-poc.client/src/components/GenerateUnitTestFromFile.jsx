import { createRoot } from 'react-dom/client'
import { CodeBlock } from "react-code-blocks";

import './Shared.css';

function GenerateUnitTestFromFile() {
    return (
        <div>
            <header>
                <h1>File Uploader</h1>
            </header>
            <form action="#" method="post" onSubmit={uploadFile}>
                <label htmlFor="file">Select File(s)</label>
                <br />
                <input type="file" id="file" required name="uploadFile"/>

                <br />
                <input type="submit" value="Upload" />
            </form>

        </div>
    )

    async function uploadFile(e){
        e.preventDefault();
        const formData = new FormData(e.target)
        const response = await fetch('/api/GenerateUnitTestCase/GenerateUnitTestFromFile',{
            method: "POST",
            body: formData
        });
        const data = await response.json();
        var output = <CodeBlock
            text= {data.output}
            language='javascript'
            showLineNumbers={true}
            theme='atom-one-dark'
        />
        createRoot(document.querySelector("#fileOutput")).render(createRoot)
        console.log(data)
    }
}

export default GenerateUnitTestFromFile;