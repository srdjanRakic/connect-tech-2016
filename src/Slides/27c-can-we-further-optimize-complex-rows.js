import classnames from 'classnames';
import React, { Component, PropTypes } from 'react';
import { List } from 'react-virtualized';
import Note from '../Components/Note';
import Slide from '../Components/Slide';
import image from '../../public/profile-picture.jpg';
import '../shared-list-styles.css';
import './27-can-we-further-optimize-complex-rows.css';

export default class DefaultSlide extends Component {
  static contextTypes = {
    list: PropTypes.array
  };

  render () {
    const { list } = this.context;

    return (
      <Slide>
        <h1>Can we further optimize complex rows?</h1>

        <List
          className='List'
          height={300}
          overscanRowCount={2}
          rowCount={list.length}
          rowHeight={80}
          rowRenderer={({ index, isScrolling, key, style }) => (
            <div
              className={classnames('ListRow', {
                ListRowEven: index % 2 === 0,
                ListScrolling: isScrolling
              })}
              key={index}
              style={style}
            >
              {isScrolling && (
                <div className='ImagePlaceholder'></div>
              )}
              {!isScrolling && (
                <div className='ImageContainer'>
                  <img
                    className='Image'
                    role='presentation'
                    src={image}
                  />
                  <div
                    className='ImageTinter'
                    style={{
                      background: hexToRgba(list[index].color, 0.35)
                    }}
                  />
                </div>
              )}
              {list[index].name}
            </div>
          )}
          width={240}
        />

        <Note>
          Scroll to see row renderer changes.
        </Note>
      </Slide>
    );
  }
}

function hexToRgba(hex, alpha) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  const r = parseInt(result[1], 16);
  const g = parseInt(result[2], 16);
  const b = parseInt(result[3], 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}
