import React, { useEffect, useState } from "react";
import CompaniesService from "../../services/CompaniesService.js";
import { useQuery } from "react-query";
import { Button, Table, Input, Popconfirm, Switch } from "antd";
import { useTranslation } from "react-i18next";
import cn from "classnames";
import { useLocation } from "react-router-dom";
import CompanyForm from "../../components/createcompany/CreateCompany";
import { DRAWER_ACTIONS } from "../../utilities/constants.js";

const DEFAULT_PAGE_SIZE = 20;

const CompaniesList = () => {
  const location = useLocation();
  location.state = {
    title: "Companies",
  };

  const [filters, setFilters] = useState({ size: DEFAULT_PAGE_SIZE });
  const [pagination, setPagination] = useState({ size: DEFAULT_PAGE_SIZE });
  const [companies, setCompanies] = useState([]);
  const [selectedCompanyDetails, setSelectedCompanyDetails] = useState();
  const [openForm, setOpenForm] = useState(false);
  const { Search } = Input;

  const {
    data,
    isLoading: loading,
    refetch,
  } = useQuery(["companies", filters], CompaniesService.companyList);

  useEffect(() => {
    if (data) {
      setCompanies(data.data);
      setPagination({ ...pagination, ...data.meta });
    }
  }, [data]);

  const { t } = useTranslation();

  const handleDelete = (id) => {
    CompaniesService.deleteCompany(id).then(() => {
      setCompanies(companies.filter((company) => company.id !== id));
    });
  };

  const closeForm = (action) => {
    if (action !== DRAWER_ACTIONS.CANCEL) {
      refetch().then(() => {
        setSelectedCompanyDetails(null);
        setOpenForm(false);
      });
    } else {
      setSelectedCompanyDetails(null);
      setOpenForm(false);
    }
  };

  const editCompany = (company) => {
    setSelectedCompanyDetails(company);
    setOpenForm(DRAWER_ACTIONS.UPDATE);
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
      title: t("common.name"),
      dataIndex: "name",
      key: "name",
      onFilter: (value, record) => record.name.indexOf(value) === 0,
      sorter: true,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: t("common.description"),
      dataIndex: "description",
      key: "description",
      onFilter: (value, record) => record.name.indexOf(value) === 0,
    },
    {
      title: t("common.active"),
      dataIndex: "isActive",
      key: "isActive",
      filters: [
        { text: t("common.active"), value: true },
        { text: t("common.inactive"), value: false },
      ],
      filterMultiple: false,
      render: (company) => (
        <Switch size="small" disabled checked={company.isActive} />
      ),
    },
    {
      title: t("common.actions"),
      key: "actions",
      render: (_, record) => (
        <div className={cn("")}>
          <Button onClick={() => editCompany(record)}>
            {t("common.edit")}
          </Button>

          <Popconfirm
            title="Delete"
            description="Are you sure?"
            onConfirm={() => handleDelete(record.id)}
          >
            <Button>{t("common.delete")}</Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <>
      <Search
        onSearch={(e) => setFilters({ name: e })}
        style={{ width: 304 }}
        loading={loading}
        placeholder="Search"
      />
      <Button
        type="primary"
        className={cn("mb-3", "mx-1", "float-right")}
        onClick={() => setOpenForm(DRAWER_ACTIONS.CREATE)}
      >
        Create
      </Button>{" "}
      <Table
        dataSource={companies}
        loading={loading}
        columns={columns}
        pagination={{
          defaultPageSize: DEFAULT_PAGE_SIZE,
          current: pagination.currentPage,
          total: pagination.totalItems,
          showSizeChanger: true,
        }}
        scroll={{ y: 420 }}
        onChange={handleTableChange}
      />
      <CompanyForm
        details={selectedCompanyDetails}
        openType={openForm}
        onClose={closeForm}
      />
    </>
  );
};

export default CompaniesList;
