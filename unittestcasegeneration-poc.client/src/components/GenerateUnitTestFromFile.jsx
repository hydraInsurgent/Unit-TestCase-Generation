import { createRoot } from 'react-dom/client'
import RenderOutput  from './RenderOutput'
import './Shared.css';

function GenerateUnitTestFromFile() {
    return (
        <div className="container">
            <header className="text-center">
                <h3>Generate Unit Tests from Code File</h3>
            </header>
            <div id="fileInputSection" className="d-flex justify-content-center my-4">
                <form action="#" method="post" onSubmit={uploadFile}>
                    <div className="form-group text-center">
                        <h5 >Select File</h5>
                        <input type="file" id="file" required name="uploadFile" className="form-control-file"/>
                    </div>
                    <div className="form-group text-center">
                        <input type="submit" value="Generate" className="btn btn-primary"/>
                    </div>
                </form>
            </div>
            <div id="fileOutputSection" className="mx-auto"></div>
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
        
        createRoot(document.querySelector("#fileOutputSection")).render(<RenderOutput content = {data.output} />)
        console.log(data)
    }
}

export default GenerateUnitTestFromFile;