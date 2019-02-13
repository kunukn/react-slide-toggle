import React from 'react';
import ReactDOM from 'react-dom';
import 'src/demo/index.scss';
import App from 'src/demo/App';
const { SlideToggle } = require("library/ReactSlideToggle");

ReactDOM.render(<App SlideToggle={SlideToggle}/>, document.getElementById('root'));
