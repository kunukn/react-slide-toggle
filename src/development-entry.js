import React from 'react';
import ReactDOM from 'react-dom';
import 'src/demo/index.scss';
import App from 'src/demo/App';

import SlideToggle from "root/src/library/ReactSlideToggle";
const SlideToggle2 = require("root/src/library/ReactSlideToggle").default;

ReactDOM.render(<App SlideToggle={SlideToggle} SlideToggle2={SlideToggle2}/>, document.getElementById('root'));
