import { message } from "antd";

// 校验文件类型
const validateFileType = (file, allowedTypes) => {
  return allowedTypes.includes(file.type);
};

// 校验文件大小
const validateFileSize = (file, maxSizeInMB) => {
  return file.size / 1024 / 1024 < maxSizeInMB;
};

// 校验图片尺寸和比例
const validateImageDimensions = (file, args) => {
  const { aspect, minWidth, minHeight } = args;
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    const img = new Image();

    reader.readAsDataURL(file);
    reader.onload = (e) => {
      img.src = e.target.result;
      img.onload = () => {
        const width = img.width;
        const height = img.height;
        const actualAspect = width / height;
        const isValidAspect = aspect && Math.abs(actualAspect - aspect) < 0.001; // 允许一定的精度误差
        const isValidWidth = minWidth && width >= minWidth;
        const isValidHeight = minHeight && height >= minHeight;

        let errorMsg = "";

        if (!isValidAspect && aspect) {
          errorMsg = `图片长宽比例需为 ${aspect}`;
        }

        if (!isValidWidth && minWidth) {
          errorMsg = `图片宽度不低于 ${minWidth}`;
        }

        if (!isValidHeight && minHeight) {
          errorMsg = `图片高度不低于 ${minHeight}`;
        }
        // console.log(
        //   width,
        //   isValidWidth,
        //   height,
        //   isValidHeight,
        //   actualAspect,
        //   isValidAspect,
        //   errorMsg,
        //   "上传的参数",
        //   aspect,
        //   minWidth,
        //   minHeight
        // );
        errorMsg ? reject(new Error(errorMsg)) : resolve(true);
      };
      img.onerror = () => {
        reject(new Error("图片加载失败，请重新选择"));
      };
    };
    reader.onerror = () => {
      reject(new Error("文件读取失败，请重新选择"));
    };
  });
};

//将"image/jpeg", "image/jpg", "image/png"] 数组转换成字符串 "JPG、JPEG、PNG"的方法
function mimeTypeArrayToString(mimeTypeArray) {
  return mimeTypeArray.reduce((acc, mimeType, index) => {
    const fileType = mimeType.split("/")[1].toUpperCase();
    if (index === 0) {
      return fileType;
    }
    return `${acc}、${fileType}`;
  }, "");
}

const beforeUpload = async (file, limit) => {
  const { allowAll, allowedTypes, maxSizeInMB, aspect, minWidth, minHeight } = limit;

  const typesLimit = false || allowedTypes?.length;
  const maxSizeLimit = false || maxSizeInMB;
  const dimensionsLimit = false || aspect || minWidth || minHeight;

  if (allowAll) return true;

  const typeValid = typesLimit ? validateFileType(file, allowedTypes) : true;
  const sizeValid = maxSizeLimit ? validateFileSize(file, maxSizeInMB) : true;

  let dimensionsValid = true;
  let dimensionsError = null;

  if (dimensionsLimit) {
    try {
      dimensionsValid = await validateImageDimensions(file, { aspect, minWidth, minHeight });
    } catch (error) {
      dimensionsError = error.message;
      dimensionsValid = false;
    }
  }

  const allValid = typeValid && sizeValid && dimensionsValid;

  if (!allValid) {
    let errorMessage = [];
    if (!typeValid) {
      errorMessage.push(`仅支持${mimeTypeArrayToString(allowedTypes)}的格式`);
    }
    if (!sizeValid) {
      errorMessage.push(`图片文件不大于${maxSizeInMB}MB!`);
    }
    if (dimensionsError) {
      errorMessage.push(dimensionsError);
    }
    message.error(errorMessage.join(" "));
  }

  // console.log(allValid, "---beforeUpload-");

  return allValid;
};

export default beforeUpload;
