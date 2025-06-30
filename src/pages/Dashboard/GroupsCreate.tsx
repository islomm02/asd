import { Button, Input } from "antd";
import CreateCaption from "../../components/CreateCaption";
import UploadImg from "../../components/UploadImg";
import { useContext, useEffect, useState, type FormEvent } from "react";
import type { UploadType } from "../../types/UploadType";
import { instance } from "../../hooks/instance";
import { useNavigate, useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { Context } from "../../context/Context";
import { API } from "../../hooks/getEnv";
import type { UploadImgType } from "../../types/UpdateImgType";
import ConvertSelect from "../../components/ConvertSelect";
import CustomSelect from "../../components/CustomSelect";
import { PlusOutlined } from "@ant-design/icons";

const MajorCreate = () => {
  const [updatedData, setUpdatedData] = useState<UploadImgType | {}>({});
  const navigate = useNavigate();
  const { token } = useContext(Context);
  const [loading, setIsLoading] = useState<boolean>(false);
  const [image, setImage] = useState<UploadType | any>();
    const [name, setName] = useState<string>("");
    
    const [stackId, setStackId] = useState<string | null>(null)
    const [roomId, setRoomId] = useState<string | null>(null)
    const [teacherId, setTeacherId] = useState<string | null>(null)

  const stacksList = ConvertSelect("/stacks");
  const roomsList = ConvertSelect("/rooms");
  const teachersList = ConvertSelect("/teachers");

  const { id } = useParams();

  function handleCreate(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    const data = { image: image.filename, name };
    instance
      .post("/stacks", data, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        toast.success("Yaratildi");
        setIsLoading(false);
        setTimeout(() => navigate(-1), 600);
      })
      .catch(() => {
        setIsLoading(false);
        toast.error("Xatolik bor");
      });
  }

  useEffect(() => {
    if (id) {
      instance(`/stacks/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      }).then((res) => {
        setName(res.data.name);
        const type =
          res.data.image.split(".")[res.data.image.split(".").length - 1];
        const data: UploadImgType = {
          uid: "-1",
          name: `image.${type}`,
          status: "done",
          url: `${API}/file/${res.data.image}`,
        };
        setUpdatedData(data);
      });
    }
  }, []);

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <form onSubmit={handleCreate} autoComplete="off" className="p-5">
        <div className="bg-white rounded-md p-5">
          <CreateCaption loading={loading} title="Gurux qo'shish" />
          <div className="mt-[30px] flex items-center justify-around gap-1">
            <div className="flex flex-col w-[45%]  gap-3 ">
              <Input size="large" placeholder="Gurux nomi" />
              <CustomSelect
                options={stacksList}
                placeholder="Yo'nalish tanlang"
              />
            </div>
            <div className="flex flex-col w-[45%] gap-3">
              <CustomSelect options={roomsList} placeholder="Xonani tanlang" />
              <CustomSelect
                options={teachersList}
                placeholder="Ustozni tanlang"
              />
            </div>
          </div>
          <div className="pt-5 flex justify-end pr-3">
            <Button type="primary" icon={<PlusOutlined />}>
              Qoshish
            </Button>
          </div>
        </div>
      </form>
    </>
  );
};

export default MajorCreate;
