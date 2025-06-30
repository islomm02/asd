import{ useContext, useEffect, useState } from 'react'
import { instance } from '../hooks/instance'
import { Context } from '../context/Context'

function ConvertSelect(url: string) {

    const {token} = useContext(Context)
    const [data, setData] = useState<any[]>([])

    useEffect(() => {

        instance(url, { headers: { "Authorization": `Bearer ${token}` } }).then(res => {
            setData(res.data.data.map((item: any) => {
                let list = {
                    label: item.name,
                    value: item.id
                }
                return list
            }))
        })

    }, [])

  return data
}

export default ConvertSelect