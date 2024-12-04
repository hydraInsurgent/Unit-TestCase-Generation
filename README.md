# Design and Approach Document for Unit Test Case Generator 

  

## Project Overview 

The Unit Test Case Generator is a Generative AI-based tool that automates the creation of unit test cases from provided code snippets or entire code files. It uses OpenAI's GPT-3.5-turbo model via the ChatCompleteAsync API, the system generates both the test case scenarios and the corresponding unit test code. The project is implemented with a .NET Core Web API backend and a React-based frontend. 

### Demo 
**Generate unit tests from code**
![image](https://github.com/user-attachments/assets/92aae8a2-dd2d-4805-976b-1296cc74049d)

**Generate unit tests from a file**
![image](https://github.com/user-attachments/assets/98b2f5c2-dfc1-4da4-8dc8-6ead8b17e628)

## Solution Approach 

### Overview of System Architecture  

The system architecture consists of three primary components: 

**Frontend**: A React application responsible for user interaction, code input, and displaying generated unit test cases. 

**Backend**: A .NET Core Web API that handles requests from the frontend, interacts with the OpenAI API, and processes the results. 

**OpenAI API**: The generative AI engine that creates the unit test cases, and their code based on the provided input. 

  

## Components Design 

### Frontend (React): 

1. NavBar.jsx: For handling navigation and routing to components. 
2. GenerateUnitTestFromFile.jsx: Allows users to input code snippets, communicates with the backend, and displays generated unit tests.  
3. GenerateUnitTestFromSnippet.jsx: Handles code file uploads, sends data to the backend, and displays generated unit tests. 
4. RenderOutput.jsx: Allows the output to be rendered as a react code block. 

### Backend (ASP.NET Core Web API): 

**API Endpoints**:
1. '/api/GenerateUnitTestCase/GenerateUnitTestFromSnippet' 
  - It receives a code snippet and returns the generated test cases. 

2. '/api/GenerateUnitTestCase/GenerateUnitTestFromFile' 
  - It receives a code file and returns the generated test cases.  

**Services**: 

1. OpenAIService.cs:  
  - Constructs the prompt using the provided code input. 
  - Sends the prompt to the OpenAI ChatCompleteAsync API. 
  - Receives and processes the response to extract relevant unit test cases and code. 

 

**OpenAI API**: 

##### **Model Selection**:  

GPT-3.5-turbo is chosen for its balance between performance and cost-efficiency. 

##### **Prompt Structure**:  

The prompt includes a system message that defines the behaviour of the response expected and a user message that contains the code snippet or file content. 

System Message: You are a helpful assistant, who generates unit tests cases and unit test code from a code snippet provided to you in the same language. Start with generating a comprehensive list of unit test cases for the supplied code followed by the unit test code for each of the identified test cases. In the event user has not provided a code example then respond politely asking to enter a valid code example. 

##### **API**: 

The ChatCompleteAsync API is used to interact with the GPT-3.5-turbo model. 

This API is provided by the OpenAI NuGet package [.NuGet Gallery | OpenAI 2.0.0-beta.2](https://www.nuget.org/packages/OpenAI/2.0.0-beta.2) 

 

### User Workflow: 

1. The user inputs a code snippet or uploads a code file. 
2. The input is sent to the backend API for processing. 
3. The generated unit test cases are displayed on the frontend. 

 

### Data Flow: 

1. The controller receives input from the frontend. 
2. The input is sent to OpenAI via the OpenAIService. 
3. The unit test cases are returned to the frontend. 

 

### Conclusion 

This was a good learning experience that helped me develop my understanding of working with Chat GPT and React. I have learned how a generative ai model can be used to solve a problem technically.  
