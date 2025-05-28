import videojs from "video.js"
import React, { useEffect, useRef } from "react"

// 自动检测视频类型
const getSourceType = (url) => {
  if (url.includes(".m3u8")) return "application/x-mpegURL"
  if (url.includes(".mpd")) return "application/dash+xml"
  if (url.includes(".mp4")) return "video/mp4"
  if (url.includes(".webm")) return "video/webm"
  return "video/mp4" // 默认类型
}

export default function Player(props) {
  const videoRef = useRef(null)
  const playerRef = useRef(null)
  const { options, playUrl, onReady } = props

  useEffect(() => {
    // make sure Video.js player is only initialized once
    if (!playerRef.current) {
      const videoElement = videoRef.current
      if (!videoElement) return

      const player = (playerRef.current = videojs(
        videoElement,
        {
          ...options,
          html5: {
            vhs: {
              overrideNative: true, // 关键：启用HLS/DASH的HTML5播放
            },
          },
        },
        () => {
          // console.log("player is ready", playUrl)
          onReady && onReady(player)
          player.src({
            src: playUrl,
            type: getSourceType(playUrl), // 自动检测类型
          })
          player.play()
          player.focus() // 聚焦上去防止可以esc退出操作
        }
      ))
    } else {
      // you can update player here [update player through props]
      const player = playerRef.current
      player.src({
        src: playUrl,
        type: getSourceType(playUrl),
      })
      player.autoplay(true)
      player.focus() // 聚焦上去防止可以esc退出操作
    }
  }, [options, playUrl, videoRef, onReady])

  return (
    <div data-vjs-player style={{ width: "100%" ,maxHeight: "66vh"}}>
      <video ref={videoRef} className="video-js vjs-big-play-centered" controls />
    </div>
  )
}
