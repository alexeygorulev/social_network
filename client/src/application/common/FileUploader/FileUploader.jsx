import { observer } from 'mobx-react';
import React, { useCallback } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDropzone } from 'react-dropzone';

const FileUploader = (props) => {
  const { type, createVideo, closeUploader, handleSubmit } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [isChangeNameStep, setIsChangeNameStep] = useState(false);
  const [origFile, setOrigFile] = useState([]);
  const [uploadProgressById, setUploadProgressById] = useState([]);
  const [error, setError] = useState([]);
  const [isDisabled, setIsDisabled] = useState(false);

  const isVideo = type === 'isVideo';
  const isPhoto = type === 'isPhoto';
  const isMusic = type === 'isMusic';

  useEffect(() => {
    if (error.length > 0) setIsDisabled(true);
    return () => {
      setIsDisabled(false);
    };
  }, [error]);

  useEffect(() => {
    return () => {
      setError([]);
    };
  }, []);

  const downloadVideo = async (event, file, index) => {
    setIsDisabled(true);
    event.preventDefault();
    event.stopPropagation();
    const formData = new FormData();
    formData.append('video', file);
    await createVideo(formData, changeProgressFileById, index);
  };

  const changeProgressFileById = (index, progress) => {
    setUploadProgressById((prevProgress) => [
      ...prevProgress.slice(0, index),
      progress,
      ...prevProgress.slice(index + 1),
    ]);
  };

  const setErrorByCondition = (condition, nameError, reader, file) => {
    if (condition) {
      setError((arr) => [...arr, { fileName: file.name, title: nameError }]);
      reader.abort();
      return;
    }
  };
  const onDrop = useCallback((acceptedFiles) => {
    setIsDisabled(true);
    let fileCounter = 0;
    const acceptedFormatsVideos = ['video/mp4', 'video/mpeg'];
    setError([]);
    let errorCount = 0;

    if (acceptedFiles.length > 3)
      return setError((arr) => [...arr, { fileName: '', title: 'Вы загрузили больше трех файлов' }]);

    acceptedFiles.forEach((file, index) => {
      const reader = new FileReader();
      reader.onabort = () => {
        console.log('file reading was aborted');
        errorCount++;
      };
      reader.onerror = () => console.log('file reading has failed');
      reader.onload = async (event) => {
        setIsLoading(true);
        setOrigFile((arr) => [...arr, { url: URL.createObjectURL(file), count: fileCounter, progress: 1 }]);
        fileCounter++;
        try {
          if (isVideo) {
            await downloadVideo(event, file, index);
            setIsDisabled(false);
          }
        } catch (error) {}
      };

      reader.readAsDataURL(file);

      switch (type) {
        case 'isVideo':
          if (errorCount > 0) reader.abort();
          setErrorByCondition(!acceptedFormatsVideos.includes(file.type), 'Поддерживаются только mp4', reader, file);
          setErrorByCondition(!file || file.size > 25 * 1024 * 1024, 'Поддерживаются файлы до 7 мб', reader, file);
          break;
        default:
          console.log('Вы передали неверный тип в загрузчик');
          reader.abort();
          break;
      }
    });
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });
  return (
    <>
      <div className="file-uploader__wrapper">
        <div className="file-uploader__container">
          <div onClick={closeUploader} className="file-uploader__exit">
            <i className="uil uil-times-circle"></i>
          </div>
          {!isLoading ? (
            <div className="file-uploader__content" {...getRootProps()}>
              <input {...getInputProps()} />
              <div>
                <i className="uil uil-cloud-upload"></i>
              </div>
              {!error.length ? (
                <>
                  <div className="file-uploader__info">
                    <span>Перетащите сюда до 3 файлов</span>
                  </div>
                  <span>или</span>
                </>
              ) : (
                <>
                  {error.map((item) => (
                    <span key={item.fileName}>{item.title}</span>
                  ))}
                </>
              )}
              <div className="file-uploader__button">
                <button>Нажмите кнопку</button>
              </div>
            </div>
          ) : (
            <div style={{ justifyContent: 'space-between' }} className="file-uploader__content">
              <div className="file-uploader__title">Ваши файлы загружаются</div>
              <div style={{ width: '75%' }}>
                <div className="file-uploader__item">
                  {origFile.map((item, index) => (
                    <div key={item.url} className="file-uploader__file-container">
                      <div className="file-item">{isVideo && <video key={item} src={item.url}></video>}</div>
                      <div className="file-uploader__indicator">
                        <div style={{ textAlign: 'center' }}>
                          <p>{uploadProgressById[index]}%</p>
                        </div>
                        <div
                          style={{ '--progress-loaded': `${uploadProgressById[index]}` }}
                          className="file-uploader__loader"
                        ></div>
                        <div className="file-uploader__delete">
                          <i className="uil uil-trash-alt"></i>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="file-uploader__uploaded">
                  <button disabled={isDisabled} onClick={handleSubmit}>
                    Завершить
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default observer(FileUploader);
