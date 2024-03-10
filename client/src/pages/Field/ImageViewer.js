import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX, faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import './ImageViewer.css';

const ImageViewer = ({ urls, toggleView }) => {
  const [imgIndex, setImgIndex] = useState(0)

  const incrementIndex = () => {
    if (imgIndex < urls.length - 1) {
      setImgIndex(prevState => prevState + 1)
    } 
  }

  const decrementIndex = () => {
    if (imgIndex >= 1) {
      setImgIndex(prevState => prevState - 1)
    }    
  }

  return (
    <div className='overlay'>
      <div className='image-viewer'>
        <div className='icon close' onClick={toggleView}>
          <FontAwesomeIcon icon={faX} />
        </div>

        <div className="viewer">
          <div className={`icon ${imgIndex === 0 && 'disabled'}`} >
            <FontAwesomeIcon icon={faChevronLeft} onClick={decrementIndex} />
          </div>

          <div className="image-container">
            <img src={urls[imgIndex]} alt='Large preview'/>
          </div>

          <div className={`icon ${imgIndex === urls.length - 1 && 'disabled'}`} >
            <FontAwesomeIcon icon={faChevronRight} onClick={incrementIndex} />
          </div>
        </div>

        <div className="count">
          {imgIndex + 1} of {urls.length}
        </div>
      </div>
    </div>
  )
}

export default ImageViewer