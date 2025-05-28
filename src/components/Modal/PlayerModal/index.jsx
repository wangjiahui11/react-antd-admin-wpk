import React, { useEffect, useState } from "react";
import { Modal, Button, message } from "antd";
import Player from "@/components/MediaPlayer";

export default function PlayerModal({ playUrl, urlApi, params }) {
  const [showModal, setShowModal] = useState(false);
  const [url, setUrl] = useState(playUrl);
  const handleCancel = () => {
    setShowModal(false);
    setUrl(null);
    document.querySelector("video").pause();
  };

  const getCndUrl = async () => {
    const res = await urlApi(params);
    return res;
  };

  const handleBtn = async () => {
    // 有播放链接的时候
    if (url) {
      setShowModal(true);
      return;
    }

    // 无连接链接的时候
    let { code, data } = await getCndUrl();
    if (code === 200) {
      setUrl(data.result || "http://vjs.zencdn.net/v/oceans.mp4");
      setShowModal(true);
    }
  };

  return (
    <>
      <Button type="link" onClick={handleBtn}>
        播放
      </Button>
      {showModal && (
        <Modal
          open={showModal}
          maskClosable={false}
          footer={[
            <Button key="back" onClick={handleCancel}>
              关闭
            </Button>,
          ]}
          title="视频播放"
          onCancel={handleCancel}
          width={800}
        >
          <Player playUrl={url} />
        </Modal>
      )}
    </>
  );
}
