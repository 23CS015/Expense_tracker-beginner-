import { useState, useRef } from 'react'
import './ReceiptUpload.css'

function ReceiptUpload({ onFileChange, currentFile }) {
  const [dragActive, setDragActive] = useState(false)
  const [preview, setPreview] = useState(null)
  const fileInputRef = useRef(null)

  const handleFiles = (files) => {
    const file = files[0]
    if (!file) return

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'application/pdf']
    if (!allowedTypes.includes(file.type)) {
      alert('Please upload an image (JPEG, PNG, WebP) or PDF file')
      return
    }

    // Validate file size (5MB max)
    const maxSize = 5 * 1024 * 1024 // 5MB
    if (file.size > maxSize) {
      alert('File size must be less than 5MB')
      return
    }

    // Create preview for images
    if (file.type.startsWith('image/')) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setPreview(e.target.result)
      }
      reader.readAsDataURL(file)
    } else {
      setPreview(null)
    }

    onFileChange(file)
  }

  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files)
    }
  }

  const handleInputChange = (e) => {
    e.preventDefault()
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files)
    }
  }

  const handleButtonClick = () => {
    fileInputRef.current?.click()
  }

  const handleRemove = () => {
    setPreview(null)
    onFileChange(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  return (
    <div className="receipt-upload">
      <input
        ref={fileInputRef}
        type="file"
        className="file-input-hidden"
        accept="image/*,.pdf"
        onChange={handleInputChange}
      />
      
      {currentFile ? (
        <div className="file-preview">
          {preview ? (
            <div className="image-preview">
              <img src={preview} alt="Receipt preview" className="preview-image" />
            </div>
          ) : (
            <div className="file-info">
              <div className="file-icon">📄</div>
              <div className="file-details">
                <div className="file-name">{currentFile.name}</div>
                <div className="file-size">{formatFileSize(currentFile.size)}</div>
              </div>
            </div>
          )}
          
          <div className="file-actions">
            <button
              type="button"
              className="file-action-btn change-btn"
              onClick={handleButtonClick}
            >
              Change
            </button>
            <button
              type="button"
              className="file-action-btn remove-btn"
              onClick={handleRemove}
            >
              Remove
            </button>
          </div>
        </div>
      ) : (
        <div
          className={`upload-area ${dragActive ? 'drag-active' : ''}`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={handleButtonClick}
        >
          <div className="upload-icon">📷</div>
          <div className="upload-text">
            <div className="upload-primary">Click to upload or drag and drop</div>
            <div className="upload-secondary">PNG, JPG, WebP or PDF (max 5MB)</div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ReceiptUpload