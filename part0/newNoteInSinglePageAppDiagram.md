```mermaid

sequenceDiagram
participant browser
participant server

browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
Note right of browser: prevent default behavior of POST, create and push note obj onto notes array, redraw updated ul, send created note to server

```