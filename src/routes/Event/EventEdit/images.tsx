import React, { useState } from "react";

import popup from "popup";
import { Upload, Modal } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import Image from "components/shared/image";
import { convertToBase64, createRandomHash } from "utils";

import imageService from "services/images";

import { Event } from "types/props";

interface Props {
    event: Event;
}
  
const EventEditImages: React.FunctionComponent<Props> = ({ event }) => {

  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState({});
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState([]);
  const [presignedInfo, setPresignedInfo] = useState<any>({});

  const handleBeforeUpload = async (file) => {
    try {

      const imageHash = createRandomHash();
      const imageExtension = file.type.split("/")[1];

      // get pre-signed url
      const { data: [info] } = await imageService.getPresignedUrl({
        payload: [{
          bucketName: imageService.getBucketName("event"),
          bucketKey: `${event._id}/cover/${imageHash}.${imageExtension}`,
          contentType: file.type,
          meta: {
            hash: imageHash,
            name: file.name,
            size: String(file.size),
            type: file.type,
            uid: file.uid,
            lastModified: String(file.lastModified)
          }
        }]
      });
      setPresignedInfo(info);

    }
    catch(err) {
      popup.error("Error getting pre-signed url: ", err.message);
    }
  };

  const handleUpload = async ({
    onSuccess, onError, file,
    // onProgress, withCredentials, action, headers, data, filename
  }) => {
    try {

      const { url, ...info } = presignedInfo;

      await imageService.usePresignedUrl({
        url: url,
        payload: file,
        options: {
        //   params: info,
          headers: {
            "x-amz-acl": "public-read",
            "Content-Type": info.ContentType || file.type
          },
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
      file.preview = await convertToBase64(file.originFileObj);
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
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
        beforeUpload={handleBeforeUpload}
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
