import React, { useState } from "react";

import popup from "popup";
import { Upload, Modal } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import Image from "components/shared/image";

import imageService from "services/images";
import { convertToBase64 } from "utils";

interface Props {
    collection: string;
    directory: string;
    acceptedExtensions: string;
    onChange: (any: any[]) => void;
    listType?: "text" | "picture" | "picture-card";
    maxFiles?: number;
    initialList?: any[]
}
  
const ImageUploader: React.FunctionComponent<Props> = (props) => {

  const {
    collection,
    directory,
    acceptedExtensions,
    onChange,
    listType = "picture-card",
    maxFiles = null,
    initialList = []
  } = props;

  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState(initialList);
  const [presignedInfo, setPresignedInfo] = useState<any>({});

  const handleBeforeUpload = async (file) => {
    try {

      // const imageHash = createRandomHash();
      const imageHash = file.uid;
      const imageExtension = file.type.split("/")[1];

      // get pre-signed url
      const { data: [info] } = await imageService.getPresignedUrl({
        payload: [{
          bucketName: imageService.getBucketName(collection),
          bucketKey: `${directory}/${imageHash}.${imageExtension}`,
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

      if(!presignedInfo || !presignedInfo.url) throw new Error("Could not get a presigned url!");

      await imageService.usePresignedUrl({
        url: presignedInfo.url,
        payload: file,
        options: {
          headers: {
            "x-amz-acl": "public-read",
            "Content-Type": presignedInfo.ContentType || file.type
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
    console.log("change!", { presignedInfo }, { fileList });
    onChange(fileList);
  };

  return (
    <>
      <Upload
        accept={acceptedExtensions}
        listType={listType}
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
        beforeUpload={handleBeforeUpload}
        customRequest={handleUpload}
        multiple={false} // might need to come up with functionality in the future
      >
        {(maxFiles && fileList.length >= maxFiles) ? null : <div>
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
        <Image collection="events" src={previewImage} alt="example" style={{ width: "100%" }} />
      </Modal>
    </>
  );
};

export default ImageUploader;
