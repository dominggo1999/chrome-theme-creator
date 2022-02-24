import React, { useRef } from 'react';

const FileInput = ({ style, onChange, children }) => {
  const fileInputRef = useRef();

  const handleUpload = (e) => {
    const file = e.target.files[0];

    onChange(file);

    // free up the fileInput again
    fileInputRef.current.value = null;
  };

  return (
    <div style={style}>
      <input
        type="file"
        style={{ display: 'none' }}
        onChange={handleUpload}
        ref={fileInputRef}
      />
      {React.cloneElement(children, {
        onClick: () => fileInputRef.current.click(),
      })}
    </div>
  );
};

export default FileInput;
