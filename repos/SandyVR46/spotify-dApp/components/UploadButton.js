import React from 'react'

const styles = {
  uploadButton: `bg-green-500 mr-10 px-3 py-1.5 cursor-pointer hover:scale-95 transition rounded-full`,
}

const UploadButton = ({setShowUploadMusic}) => {

  const uploadClicked = () => {
    console.log(setShowUploadMusic)
    setShowUploadMusic(true)
  }

  return (
    <div>
      <div onClick={uploadClicked} className={styles.uploadButton}>
        Upload music
      </div>
    </div>
  )
}

export default UploadButton