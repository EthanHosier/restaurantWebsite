"use client";

import React, { useState } from 'react'
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import PhotoAlbum from "react-photo-album";
import Image from 'next/image';

const PhotoGallery = ({ DATA }) => {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const onClick = (index) => {
    setIndex(index);
    setOpen(true);
  }

  return (
    <div className='flex-wrap flex justify-center gap-2'>
      {DATA.images.map((src, i) => (
        <div className='w-1/3 aspect-square relative extra-images skeleton-loading'>
          <Image src={src} key={i} onClick={() => onClick(i)} className="object-cover cursor-pointer" fill alt={`restaurant image ${i}`} />
        </div>
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
