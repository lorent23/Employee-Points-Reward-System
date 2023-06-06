import React from 'react'
import { useSelector } from 'react-redux';
import {SmileOutlined} from '@ant-design/icons';
import {Result,Button} from 'antd';
import {Link} from "react-router-dom";

const UserOnly = () => {
    const usrid = useSelector((state) => state.auth.user.id);
    const usrname = useSelector((state) => state.auth.user.firstName);
    const lstname = useSelector((state) => state.auth.user.lastName);

    return (
        <div>
            <Result
                icon={<SmileOutlined />}
                title="Go check your points"
                extra={<Button><Link to={`/points/only?id=${usrid}`} >@ {usrname} {lstname}</Link></Button>
                }
            />
        </div>
    )
}

export default UserOnly
