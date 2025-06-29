import { useState, type Dispatch, type FC, type SetStateAction } from "react";
import { Upload } from "antd";
import type { GetProp, UploadFile, UploadProps } from "antd";
import ImgCrop from "antd-img-crop";
import { API } from "../hooks/getEnv";
import type { UploadImgType } from "../types/UpdateImgType";

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

const UploadImg: FC<{
  setImage: Dispatch<SetStateAction<any>>;
  updatedData?: UploadImgType | {};
}> = ({ setImage, updatedData }) => {
  const initialFiles: UploadFile[] = Array.isArray(updatedData)
    ? (updatedData as UploadFile[])
    : [];

  const [fileList, setFileList] = useState<UploadFile[]>(initialFiles);

  const onChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    if (newFileList[0]?.response) {
      setImage(newFileList[0].response);
    }
  };

  const onPreview = async (file: UploadFile) => {
    let src = file.url as string;
    if (!src && file.originFileObj) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj as FileType);
        reader.onload = () => resolve(reader.result as string);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  return (
    <ImgCrop rotationSlider>
      <Upload
        action={`${API}/file`}
        listType="picture-card"
        fileList={fileList}
        onChange={onChange}
        onPreview={onPreview}
      >
        {fileList.length < 1 && "+ Yuklash"}
      </Upload>
    </ImgCrop>
  );
};

export default UploadImg;
