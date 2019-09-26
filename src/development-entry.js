import React from 'react';
import ReactDOM from 'react-dom';
import 'src/demo/index.scss';
import App from 'src/demo/App';

import SlideToggle from "~/src/library/ReactSlideToggle/SlideToggle";
const SlideToggle2 = require("~/src/library/ReactSlideToggle/SlideToggle").default;

ReactDOM.render(<App SlideToggle={SlideToggle} SlideToggle2={SlideToggle2}/>, document.getElementById('root'));
