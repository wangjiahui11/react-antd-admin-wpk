import React, { useEffect, useState } from "react";
import { message, Upload, Row, Col } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { uploadImg } from "@/service/common/common.js";
import ImgCrop from "antd-img-crop";
import beforeUpload from "./beforeUpload";

const UploadImg = (props) => {
  const { value, onChange, maxCount, disabled, uploadProps = {}, isCrop, imgCropProps, limitProps, children } = props;
  const [files, setFiles] = useState([]);
  useEffect(() => {
    value && handleFileData(value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const handleChange = (info) => {
    const { fileList = [], file } = info;
    // console.log(info, "---info");
    if (["done", "removed"].includes(file.status)) {
      let urls = fileList?.map(({ response, url }) => ({ url: response || url }));
      // console.log(info, 222222222);
      if (maxCount === 1) {
        onChange && onChange(urls?.[0]?.url);
      } else {
        console.log(urls, "成功回调");
        onChange && onChange(urls);
      }
    }
    file.status && setFiles(fileList?.filter(({ status }) => status !== "error"));
  };

  const handleFileData = (files) => {
    // maxCount=1表示单个，初始化数据就是字符串url链接，maxCount>=1 表示多个上传，初始化数据位数组
    // console.log(Array.isArray(value), maxCount, value);
    if ((maxCount > 1 && !Array.isArray(value)) || (Array.isArray(value) && maxCount === 1)) {
      message.warning("请传入正确的maxCount数量或者正确的数据格式");
      return;
    }
    if (maxCount === 1) {
      // console.log(1111111, files, maxCount, !Array.isArray(files));
      setFiles([{ url: files }]);
    } else {
      setFiles(files);
    }
  };

  const handleUploadImage = async (options) => {
    const { onSuccess, onError, file } = options;
    const fmData = new FormData();
    fmData.append("imgFile", file);

    try {
      let res = await uploadImg(fmData);
      if (res.code === 200) onSuccess(res.data);
    } catch (err) {
      console.log("Eroor: ", err);
      onError({ err });
    }
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>上传图片</div>
    </div>
  );

  const uploadElement = (
    <Upload
      name="avatar"
      listType="picture-card"
      fileList={files}
      maxCount={maxCount}
      disabled={disabled}
      customRequest={handleUploadImage}
      beforeUpload={(file) => {
        if (!isCrop) {
          return beforeUpload(file, limitProps);
        }
        return true;
      }}
      onChange={handleChange}
      {...uploadProps}
    >
      {uploadButton}
    </Upload>
  );

  return (
    <Row type="flex" align="middle" gutter={[8, 0]}>
      <Col>
        {isCrop ? (
          <ImgCrop
            showGrid
            showReset
            modalTitle="裁剪操作"
            {...imgCropProps}
            beforeCrop={async (file) => {
              let res = await beforeUpload(file, limitProps);
              return res;
            }}
          >
            {uploadElement}
          </ImgCrop>
        ) : (
          uploadElement
        )}
      </Col>
      {children}
    </Row>
  );
};

UploadImg.defaultProps = {
  maxCount: 1,
  disabled: false,
  isCrop: false, // 是否剪切
  imgCropProps: {
    aspect: 16 / 9,
  },
  limitProps: {
    // 图片限制的参数
    allowAll: true,
    allowedTypes: ["image/jpeg", "image/jpg", "image/png"],
    maxSizeInMB: null,
    aspect: null,
    minWidth: null,
    minHeight: null,
  },
};

export default UploadImg;
