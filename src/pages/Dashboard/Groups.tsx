import { PlusOutlined } from "@ant-design/icons"
import Caption from "../../components/Caption"
import GroupData from "../../components/GroupData"
import { instance } from "../../hooks/instance"
import { useContext, useState } from "react"
import { Context } from "../../context/Context"

const Groups = () => {
  
  const { token } = useContext(Context)
  const [groupsCount, setGroupsCount] = useState<number>(0)

    instance("/groups", { headers: { "Authorization": `Bearer ${token}` } }).then(res => {
      setGroupsCount(res.data.data.length);
      
    })

  return (
    <div className="p-5">
      <div className="p-5 bg-white rounded-md ">
        <Caption count={groupsCount} icon={<PlusOutlined />} title="Guruhlar" />
        <GroupData/>
      </div>
    </div>
  )
}

export default Groups