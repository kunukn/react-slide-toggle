import React from 'react';
import ReactDOM from 'react-dom';
import 'src/demo/index.scss';
import App from 'src/demo/App';


import A from "root/dist/ReactSlideToggle.js";
const B = require("root/dist/ReactSlideToggle.js");
const C = require("root/dist/ReactSlideToggle.cjs.js");

ReactDOM.render(<App SlideToggle={A} SlideToggle2={B} SlideToggle3={C}/>, document.getElementById('root'));
