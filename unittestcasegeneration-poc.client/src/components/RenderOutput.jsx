import React from 'react';
import { CopyBlock } from "react-code-blocks";

const RenderOutput = ({content}) => {

    return(<CopyBlock
            text={content}
            language={identifyLanguage(content)}
            showLineNumbers= {false}
            theme='atom-one-dark'
        />
    );

    function identifyLanguage(content) {
        // Regular expression to capture text after ```
        const regex = /```(\w+)/;
        const match = content.match(regex);
      
        if (match) {
          return match[1]; // The language identifier
        }
      
        return "javascript"; // Fallback if no language is found
      }
};


export default RenderOutput;