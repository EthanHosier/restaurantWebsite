"use client";

import React, { useState } from 'react'
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import PhotoAlbum from "react-photo-album";


const PhotoGallery = ({DATA}) => {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const onClick = (index) => {
    setIndex(index);
    setOpen(true);
  }

  return (
    <div className='flex-wrap flex justify-center gap-2'>
      {DATA.images.map((src, i) => (
            <img src={src} key={i} onClick={() => onClick(i)} className="w-1/4 aspect-square object-cover extra-images cursor-pointer" alt={`restaurant image ${i}`} />
      ))}

      <Lightbox
        open={open}
        close={() => setOpen(false)}
        slides={DATA.images.map(d => ({ src: d }))}
        index={index}
      />
    </div>

  )
}

export default PhotoGallery