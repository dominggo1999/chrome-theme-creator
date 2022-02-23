import React, { useState } from 'react';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

const data = {
  name: 'ThemeBeta.com',
  version: '1.0',
  description: '',
  manifest_version: 2,
  theme: {
    images: {
      theme_frame: 'images/theme_frame.png',
      theme_toolbar: 'images/theme_toolbar.png',
      theme_tab_background: 'images/theme_tab_background.png',
    },
    colors: {
      frame: [
        222,
        225,
        230,
      ],
      toolbar: [
        255,
        255,
        255,
      ],
      tab_text: [
        60,
        64,
        67,
      ],
      tab_background_text: [
        60,
        64,
        67,
      ],
      bookmark_text: [
        60,
        64,
        67,
      ],
      ntp_background: [
        255,
        255,
        255,
      ],
      ntp_text: [
        0,
        0,
        0,
      ],
      ntp_link: [
        6,
        55,
        116,
      ],
      button_background: [
        0,
        0,
        0,
        0,
      ],
    },
    tints: {
      buttons: [
        0,
        0,
        0.44,
      ],
    },
    properties: {
      ntp_background_alignment: 'bottom',
      ntp_background_repeat: 'no-repeat',
    },
  },
};

const Zipper = () => {
  const [imageOne, setImageOne] = useState('');
  const [imageTwo, setImageTwo] = useState('');

  const handleImageOne = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      setImageOne(reader.result);
    };
    reader.onerror = (error) => {
      console.log('Error: ', error);
    };
  };

  const handleImageTwo = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      setImageTwo(reader.result);
    };
    reader.onerror = (error) => {
      console.log('Error: ', error);
    };
  };

  const handleZIP = () => {
    const zip = new JSZip();

    zip.file('manifest.json', JSON.stringify(data));
    const imgFolder = zip.folder('images');
    imgFolder.file('image-1.jpg', imageOne.replace(/^data:image\/(png|jpg);base64,/, ''), { base64: true });
    imgFolder.file('image-2.jpg', imageTwo.replace(/^data:image\/(png|jpg);base64,/, ''), { base64: true });

    zip.generateAsync({ type: 'blob' }).then((content) => {
      // see FileSaver.js
      saveAs(content, 'my-theme.zip');
    });
  };

  return (
    <div>
      <input
        type="file"
        onChange={handleImageOne}
        accept=".jpg, .jpeg, .png"
      />
      <input
        type="file"
        onChange={handleImageTwo}
        accept=".jpg, .jpeg, .png"
      />
      <button onClick={handleZIP}>ZIP and Download</button>
    </div>
  );
};

export default Zipper;
