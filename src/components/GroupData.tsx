import { PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";
import CustomTable from "./CustomTable";
import type { FC } from "react";
import { getGroup } from "../service/getGroups";
import { useNavigate } from "react-router-dom";

const GroupData: FC<{ id?: string | undefined }> = ({ id }) => {
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
    },
    {
      title: "Nomi",
      dataIndex: "name",
    },
    {
      title: "Dars xonasi",
      dataIndex: "roomName",
    },
    {
      title: "Yaratilgan Vaqti",
      dataIndex: "createdAt",
    },
    {
      title: "Xolati",
      dataIndex: "status",
    },
    {
      title: "Batafsil",
      dataIndex: "action",
    },
  ];

  const navigate = useNavigate()
  const groups = getGroup("/groups", id);

  return (
    <>
      {id ? (
        <div className="pt-7 flex items-center justify-between">
          <h2 className="font-semibold text-[20px]">Guruxlari</h2>
          <Button
            onClick={() => navigate("/groups/create")}
            type="primary"
            icon={<PlusOutlined />}
          >
            Qo'shish
          </Button>
        </div>
      ) : (
        ""
      )}

      <div className="pt-15">
        <CustomTable columns={columns} data={groups} loading={false} />
      </div>
    </>
  );
};

export default GroupData