import React, { Dispatch, ReactNode, useRef } from 'react'
// import styles from './FileUpload.module.scss'

interface FileUploadProps {
    setFile: Dispatch<File>,
    accept: string,
    children: ReactNode,
}

const FileUpload: React.FC<FileUploadProps> = ({ setFile, accept, children }) => {
    const ref = useRef<HTMLInputElement>()

    return (
        <div onClick={() => ref.current.click()}>
            <input
                type="file"
                accept={accept}
                style={{ display: 'none' }}
                ref={ref}
                onChange={(e) => setFile(e.target.files[0])}
            />
            {children}
        </div>

    )
}

export default FileUpload
