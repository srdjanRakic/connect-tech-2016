import classnames from 'classnames';
import React, { Component, PropTypes } from 'react';
import { List } from 'react-virtualized';
import CodeMirror from '../Components/CodeMirror';
import Note from '../Components/Note';
import Slide from '../Components/Slide';
import Step from '../Components/Step';
import Stepper from '../Components/Stepper';
import '../shared-list-styles.css';
import source from './Examples/is-scrolling-cell-renderer.js';

export default class DefaultSlide extends Component {
  static contextTypes = {
    list: PropTypes.array
  };

  render () {
    const { list } = this.context;

    return (
      <Stepper numSteps={5}>
        <Slide>
          <h1>Render less while scrolling</h1>
          <ul>
            <Step><li>Is your cell renderer heavy?</li></Step>
            <Step><li>Are you having trouble hitting 60fps even with windowing?</li></Step>
            <Step><li>Use the <code>isScrolling</code> named parameter to render less while scrolling:</li></Step>
          </ul>
          <Step index={3} exactMatch>
            <CodeMirror source={source} />
          </Step>
          <Step index={4} exactMatch>
            <div>
              <List
                className='List'
                height={200}
                overscanRowCount={2}
                rowCount={list.length}
                rowHeight={40}
                rowRenderer={({ index, isScrolling, key, style }) => (
                  <div
                    className={classnames('ListRow', {
                      ListRowEven: index % 2 === 0,
                      ListScrolling: isScrolling
                    })}
                    key={index}
                    style={style}
                  >
                    {isScrolling
                      ? 'Scrolling...'
                      : list[index].name
                    }
                  </div>
                )}
                width={240}
              />

              <Note>
                Scroll to see row renderer changes.
              </Note>
            </div>
          </Step>
        </Slide>
      </Stepper>
    );
  }
}
