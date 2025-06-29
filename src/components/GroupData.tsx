import { PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";
import CustomTable from "./CustomTable";
import type { FC } from "react";
import { getGroup } from "../service/getGroups";

const GroupData: FC<{ id: string | undefined }> = ({ id }) => {
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

  const groups = getGroup("/groups", id);

  return (
    <>
      <div className="pt-7 flex items-center justify-between">
        <h2 className="font-semibold text-[20px]">Guruxlari</h2>
        <Button type="primary" icon={<PlusOutlined />}>
          Qo'shish
        </Button>
      </div>

      <div className="pt-15">
        <CustomTable columns={columns} data={groups} loading={false} />
      </div>
    </>
  );
};

export default GroupData