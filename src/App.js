import React from 'react';
import {SlideToggle} from './ReactSlideToggle';

class App extends React.Component {
  state = { duration: 300 };

  render() {
    const toggleBoxes = [];
    for (let i = 0; i < 10; i++) {
      toggleBoxes.push(
        <SlideToggle
          key={i}
          duration={this.state.duration}
          ease="quartInOut"
          toggleState="COLLAPSED"
          render={({ onToggle, setBoxElement, state }) => (
            <div className="togglebox">
              <div className="togglebox__toggle">
                <button onClick={onToggle}>toggle</button>
              </div>
              <div className="togglebox__box" ref={setBoxElement}>
                <div className="togglebox__box-inner">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book. It has survived not only five centuries, but
                  also the leap into electronic typesetting, remaining
                  essentially unchanged. It was popularised in the 1960s with
                  the release of Letraset sheets containing Lorem Ipsum
                  passages, and more recently with desktop publishing software
                  like Aldus PageMaker including versions of Lorem Ipsum.
                </div>
              </div>
              <pre>
                {(() => {
                  return JSON.stringify(state, null, 2);
                })()}
              </pre>
            </div>
          )}
        />
      );
    }

    return (
      <div className="app">
        <button
          onClick={() => {
            this.setState({ duration: ~~(Math.random() * 800 + 200) });
          }}
        >
          change
        </button>
        {toggleBoxes}
      </div>
    );
  }
}

export default App;
