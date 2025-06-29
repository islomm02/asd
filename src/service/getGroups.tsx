import {
  useContext,
  useEffect,
  useState,
} from "react";
import { instance } from "../hooks/instance";
import { Context } from "../context/Context";
import {  MoreOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import { formatTime } from "../hooks/formatTime";

export const getGroup = (url: string, stackId: undefined | string) => {
  const [data, setData] = useState<any>([]);
  const navigate = useNavigate();
  const { token } = useContext(Context);

  useEffect(() => {
    instance(url, {
      params: { stackId },
      headers: { Authorization: `Bearer ${token}` },
    }).then((res) => {
      res.data.data.map((item: any) => {
        item.createdAt = formatTime(item.createdAt);
        item.key = item.id;
          item.roomName = item.room.name;
          item.status = item.status ? (
              <Button
                  size="small"
              type="text"
              className="!bg-green-500 !text-white !font-semibold !rounded-2xl !p-3"
            >
              Faol
            </Button>
          ) : (
            <Button
              type="text"
              className="!bg-red-500 !text-white !font-semibold !rounded-2xl"
            >
              Faol emas
            </Button>
          ); 
        item.action = (
          <Button
            onClick={() => navigate(`${item.id}`)}
            className="w-[25px] h-[25px]"
            size="small"
          >
            {" "}
            <MoreOutlined />{" "}
          </Button>
        );
        return item;
      });
      setData(res.data.data);
    });
  }, []);

  return data;
};
