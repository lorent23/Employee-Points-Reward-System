import React, { useEffect, useState, useRef } from "react";
import PointsService from "../../services/PointsService.js";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, Table, Input,Tag, Popconfirm, Switch, Card, List } from "antd";
import { useTranslation } from "react-i18next";
import axios from "axios";
import cn from "classnames";
import { useLocation } from "react-router-dom";
import { DRAWER_ACTIONS } from "../../utilities/constants.js";
import AddPoints from "../../components/addpoints/AddPoints.jsx";


const DEFAULT_PAGE_SIZE = 10;

const PointsList = () => {
  const location = useLocation();
  location.state = {
    title: "Points",
  };

  const [pagination, setPagination] = useState({ size: DEFAULT_PAGE_SIZE });

  const [users, setUsers] = useState([]);
  const [table, setTable] = useState([]);
  const [selectedPointsDetails, setSelectedPointsDetails] = useState(); 
  const [openForm, setOpenForm] = useState(false);
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(window.location.search)
  const paramsid = queryParams.get("id")


  const {
    data,
    refetch,
  } = useQuery(["points"], PointsService.pointsList,);


  useEffect(() => {

    axios({
      method: "get",
      url: (`http://localhost:8000/api/points/user?id=${paramsid}`),
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then(function (data) {
      setUsers(data.data.users);
      setTable(data.data.users.points);
      setPiket(data.data.piket);
      console.log(data);
    });
    
  }, [setUsers]);




  const { t } = useTranslation();

  const closeForm = (action) => {
    if (action !== DRAWER_ACTIONS.CANCEL) {
          setSelectedPointsDetails(null);
          setOpenForm(false);
          window.location.reload();
    } else {
        setOpenForm(false);
        setTable(data.data.users.points);
    }
};

  const editPoints = (points) => {
    setSelectedPointsDetails(points);
    setOpenForm(DRAWER_ACTIONS.UPDATE);
  };

  const handleDelete = (pointsId) => {
    PointsService
        .deletePoint(pointsId)
        .then(() => {
            setTable(table.filter((index) => index.pointsId !== pointsId));
        });
};

  const handleTableChange = (pagination, filters, sorter) => {
    const _pagination = {
      ...pagination,
      page: pagination.current,
      size: pagination.pageSize,
    };
    const _filters = {
      ...filters,
      isActive: filters.isActive && filters.isActive[0],
    };
    const _sorter = {
      sortBy: sorter.field,
      order: sorter.order,
    };
    setPagination(_pagination);
    setFilters({ ..._filters, ..._pagination, ..._sorter });
  };

  const columns = [
    {
      title: t("common.numberOfPoints"),
      dataIndex: "numberOfPoints",
      key: "numberOfPoints",
    },
    {
      title: t("common.description"),
      dataIndex: "description",
      key: "description",
    },
    {
      title: t("common.createdAt"),
      dataIndex: "createdAt",
      key: "createdAt",
    },
    {
      title: t("common.pointsType"),
      dataIndex: "pointsType",
      key: "pointsType",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
          <div className={cn("")}>
              <Popconfirm
                        title="Delete"
                        description="Are you sure?"
                        onConfirm={() => handleDelete(record.pointsId)}>
                        <Button>{t("common.delete")}</Button>
                    </Popconfirm>
          </div>
      )
  }
  ];

  return (
    <>
      <Button
        type="primary"
        className={cn("mb-3", "mx-1", "float-right")}
        onClick={() => setOpenForm(DRAWER_ACTIONS.CREATE)}
      >
       Add Points
      </Button>{" "}
      <Button className={cn("my-2", "mx-2", "float-left", )} danger>id:{users.id} {users.firstName} {users.lastName}</Button>
      <Table
        dataSource={table}
        columns={columns}
        pagination={{
          defaultPageSize: DEFAULT_PAGE_SIZE,
          current: pagination.currentPage,
          total: pagination.totalItems,
          showSizeChanger: true,
        }}
        onChange={handleTableChange}
      />

        <AddPoints details={selectedPointsDetails} openType={openForm} onClose={closeForm}/>
    </>
  );
};

export default PointsList;
