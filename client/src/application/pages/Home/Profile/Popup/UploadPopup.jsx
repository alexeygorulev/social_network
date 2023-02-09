import { observer } from 'mobx-react';
import { useRef } from 'react';
import { useEffect, useState } from 'react';

const UploadPopup = (props) => {
  const { handle, handleUpload, origimgFile, avatarId, toggleUpload } = props;
  const n = require('application/assets/img/defaultPhoto.jpg');

  return (
    <>
      <div className="container-popup">
        <div className="popup__box">
          <div style={{ textAlign: 'right' }}>
            <i style={{ cursor: 'pointer' }} onClick={() => toggleUpload()} className="uil uil-times-circle"></i>
          </div>
          <h4 style={{ textAlign: 'center', paddingBottom: 20 }} className="text-muter">
            Обновить фотографию
          </h4>
          <form>
            <div className="popup-photo__container">
              <img
                src={origimgFile ? origimgFile : n }
                alt=""
              />
            </div>
            <div style={{ textAlign: 'center' }}>
              <input
                name="file"
                type="file"
                id="input__file"
                onChange={(e) => handle(e)}
                className="input input__file"
                multiple
              />
              <label htmlFor="input__file" className="input__file-button">
                <span className="input__file-icon-wrapper">
                  <i className="uil uil-export input__file-icon"></i>
                </span>
                <span className="input__file-button-text">Выберите файл</span>
              </label>
              <button
                onClick={(event) => handleUpload(event)}
                style={{ marginTop: 30 }}
                type="submit"
                className="btn btn-primary"
              >
                Отправить
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default observer(UploadPopup);
