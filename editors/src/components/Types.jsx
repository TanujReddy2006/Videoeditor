import React from 'react';
import './Types.css'

function Types() {
  return (
    <div id='editors1'>
        <div id='editors2'>
          <ul>
            <li id='i1'onClick={()=>window.location.href='/photoeditors'}>Video Editors</li>
            <li id='i2'onClick={()=>window.location.href='./photoeditors'}>Photo Editors</li>
            <li id='i3'onClick={()=>window.location.href='./thumbnaileditors'}>Thumbnail Editors</li>
            <li id='i4'onClick={()=>window.location.href='./shortseditors'}>Shorts Editors</li>
          </ul>
        </div>
    </div>
  )
}

export default Types
