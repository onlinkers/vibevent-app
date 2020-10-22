import React, { useState } from "react";
import { Link } from "react-router-dom";
import crypto from "crypto";

import popup from "popup";
import { Upload, Modal } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import Image from "components/shared/image";

import imageService from "services/images";

import { Event } from "types/props";

interface Props {
    event: Event;
}
  
const EventEditImages: React.FunctionComponent<Props> = () => {

  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState({});
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState([]);
  const [presignedInfo, setPresignedInfo] = useState<any>({});

  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  };

  const handleBeforeUpload = async (type, { file, fileList }) => {
    try {

      // create image hash name
      const bytes = crypto.randomBytes(32);
      // create the md5 hash of the random bytes
      const imageHash = crypto.createHash("MD5").update(bytes).digest("hex");

      console.log({ file }, file.name, file.size);
      // get pre-signed url
      const { data: [info] } = await imageService.getPresignedUrl([{
        bucketName: imageService.BUCKET_NAME,
        bucketKey: `events/${type}/${imageHash}`,
        contentType: file.type,
        meta: {
          name: file.name,
          size: String(file.size),
          type: file.type,
          uid: file.uid,
          lastModified: String(file.lastModified)
        }
      }]);
      console.log({ info });
      setPresignedInfo(info);
      // TODO: Add metadata

    }
    catch(err) {
      popup.error("Error getting pre-signed url: ", err.message);
    }
  };

  const handleUpload = async ({
    onSuccess, onError, data, filename, file,
    // onProgress, withCredentials, action, headers
  }) => {
    try {
      console.log("uploading", { file }, filename, { data });
      console.log(presignedInfo);

      const { url, ...info } = presignedInfo;

      await imageService.usePresignedUrl({
        url: url,
        payload: file,
        options: {
          params: info,
          headers: {
            "Content-Type": info.ContentType || file.type
          }
        }
      });
      onSuccess(null, file);
    }
    catch(err) {
      onError(err.message, err, file);
    }

  };

  const handleCancel = () => {
    setPreviewVisible(false);
  };

  const handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setPreviewImage(file.url || file.preview);
    setPreviewVisible(true);
    setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf("/") + 1));
  };

  const handleChange = ({ fileList }) => {
    setFileList(fileList);
  };

  return (
    <div className="Page">
      <Upload
        accept=".png,.jpg,.jpeg"
        action={presignedInfo.url}
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
        beforeUpload={(file, fileList) => handleBeforeUpload("cover", { file, fileList })}
        customRequest={handleUpload}
      >
        {fileList.length >= 8 ? null : <div>
          <PlusOutlined />
          <div style={{ marginTop: 8 }}>Upload</div>
        </div>}
      </Upload>

      <Modal
        visible={previewVisible}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}
      >
        <Image alt="example" style={{ width: "100%" }} src={previewImage} />
      </Modal>
    </div>
  );
};

export default EventEditImages;
