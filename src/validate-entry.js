import React from 'react';
import ReactDOM from 'react-dom';
import 'src/demo/index.scss';
import App from 'src/demo/App';


import A from "root/dist/ReactSlideToggle";
const B = require("root/dist/ReactSlideToggle").default;

ReactDOM.render(<App SlideToggle={A} SlideToggle2={B}/>, document.getElementById('root'));
