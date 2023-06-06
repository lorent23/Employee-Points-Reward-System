import React, { useEffect, useState } from "react";
import PointsService from "../../services/PointsService.js";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import { Button, Table } from "antd";
import { useTranslation } from "react-i18next";
import axios from "axios";
import cn from "classnames";
import { useLocation, useParams } from "react-router-dom";


const DEFAULT_PAGE_SIZE = 10;

const PointsOnly = () => {
  const location = useLocation();
  location.state = {
    title: "Points",
  };

  const [pagination, setPagination] = useState({ size: DEFAULT_PAGE_SIZE });

  const [users, setUsers] = useState([]);
  const [table, setTable] = useState([]);
  const [piket, setPiket] = useState([]);
  const { token } = useSelector((state) => state.auth);
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
    });
    
  }, [setUsers]);




  const { t } = useTranslation();

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
  ];

  return (
    <>
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
      <Button>Total Points: {users.totalPoints}</Button>
      <Button>Value of Money: LEK {users.value}</Button>
    </>
  );
};

export default PointsOnly;
