import styles from '../styles/UploadModal.module.css'

const UploadModal = ({
    title,
    musicUrl,
    newMusic,
    setTitle,
    setMusicUrl,
    setShowUploadMusic,
  }) => {
    return (
        <div className={styles.wrapper}>
          <div className={styles.modalTitle}>Upload Music</div>
              
          <div className={styles.inputField}>
            <div className={styles.inputTitle}>Title</div>
            <div className={styles.inputContainer}>
              <input
                className={styles.input}
                type='text'
                value={title}
                onChange={e => setTitle(e.target.value)}
              />
            </div>
          </div>
          <div className={styles.inputField}>
            <div className={styles.inputTitle}>Music Url</div>
            <div className={styles.inputContainer}>
              <input
                className={styles.input}
                type='text'
                value={musicUrl}
                onChange={e => setMusicUrl(e.target.value)}
              />
            </div>
          </div>
          <div className={styles.modalButtons}>
           <button
            onClick={() => 
            setShowUploadMusic(false)}
            className={`${styles.button} ${styles.cancelButton}`}
           >
                Cancel
           </button>
           <button
            onClick={newMusic}
            className={`${styles.button} ${styles.createButton}`}
            >
                Create New
            </button>
          </div>
        </div>
      )
}

export default UploadModal