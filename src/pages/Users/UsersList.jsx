import React, {useState, useEffect} from "react";
import {useSelector} from "react-redux";
import UserService from "../../services/UserService.js";
import {useQuery} from "react-query";
import {useLocation, Link} from "react-router-dom";
import {
    Button,
    Table,
    Input,
    Popconfirm,
    Modal
} from "antd";
import {useTranslation} from "react-i18next";
import cn from "classnames";
import AddUser from "../../components/adduser/AddUser.jsx";
import {DRAWER_ACTIONS} from "../../utilities/constants.js";

const DEFAULT_PAGE_SIZE = 10;

const UsersList = ({search}) => {

    const roleId = useSelector((state) => state.auth.user.roleId);

    const location = useLocation();
    location.state = {
        title: "Users"
    };

    const [filters, setFilters] = useState({size: DEFAULT_PAGE_SIZE});
    const [pagination, setPagination] = useState({size: DEFAULT_PAGE_SIZE});
    const [users, setUsers] = useState([]);
    const [selectedUserDetails, setSelectedUserDetails] = useState();
    const [openForm, setOpenForm] = useState(false);
    const [searchValue, setSearchValue] = useState("");

    const {Search} = Input;

    const {data, isLoading: loading, refetch} = useQuery([
        "users",
        filters,
        "users", {
            search: searchValue
        }
    ], UserService.list);

    useEffect(() => {
        if (data) {
            const filteredData = data
                .data
                .filter(
                    user => user.firstName.toLowerCase().includes(searchValue.toLowerCase()) 
                    || user.lastName.toLowerCase().includes(searchValue.toLowerCase()) 
                    || user.email.toLowerCase().includes(searchValue.toLowerCase())
                );
            setUsers(filteredData);
            setPagination({
                ...pagination,
                ...data.meta
            });
        }
    }, [data, searchValue]);

    const {t} = useTranslation();

    const closeForm = (action) => {
        if (action !== DRAWER_ACTIONS.CANCEL) {
            refetch().then(() => {
                setSelectedUserDetails(null);
                setOpenForm(false);
            });
        } else {
            setSelectedUserDetails(null);
            setOpenForm(false);
        }
    };

    const editUser = (users) => {
        setSelectedUserDetails(users);
        setOpenForm(DRAWER_ACTIONS.UPDATE);
    };

    const handleDelete = (id) => {
        UserService
            .deleteUser(id)
            .then(() => {
                setUsers(users.filter((user) => user.id !== id));
            });
    };

    const handleTableChange = (pagination, filters, sorter) => {
        const _pagination = {
            ...pagination,
            page: pagination.current,
            size: pagination.pageSize
        };
        const _filters = {
            ...filters,
            isActive: filters.isActive && filters.isActive[0],
            search: searchValue
        };
        const _sorter = {
            ...sorter,
            direction: sorter.role === "asc"
                ? "desc"
                : "asc",
            order: sorter.direction === "desc"
                ? "asc"
                : "desc"
        };
        setPagination(_pagination);
        setFilters({
            ..._filters,
            ..._pagination,
            ..._sorter
        });
    };

    const handleSearch = (value) => {
        setSearchValue(value);
        setPagination({
            ...pagination
        });
        refetch();
    };

    const columns = [
        {
            title: t("common.firstName"),
            dataIndex: "firstName",
            key: "id",
            filteredValue: filters.search
                ? [filters.search]
                : null
        }, {
            title: t("common.lastName"),
            dataIndex: "lastName",
            key: "lastName"
        }, {
            title: t("common.email"),
            dataIndex: "email",
            key: "email"
        }, {
            title: t("common.isVerified"),
            dataIndex: "isVerified",
            key: "isVerified",
            render: (text) => String(text)
        }, {
            title: t("common.role"),
            dataIndex: "role",
            key: "role",
            render: (role) => <span checked={role.name}>{role.name}</span>
        }, 
        {
            title: t("common.totalPoints"),
            dataIndex: "totalPoints",
            key: "totalPoints",
        }, 
        {
            title: t("common.value"),
            dataIndex: "value",
            key: "value",
        }, 
        {
            title: "Action",
            key: "action",
            render: (_, record) => (
                <div className={cn("")}>
                    <Button>
                        <Link to={`/points/user?id=${record.id}`}>View</Link>
                    </Button>
                    <Button onClick={() => editUser(record)}>{t("common.edit")}</Button>
                    <Popconfirm
                        title="Delete"
                        description="Are you sure?"
                        onConfirm={() => handleDelete(record.id)}>
                        <Button>{t("common.delete")}</Button>
                    </Popconfirm>
                </div>
            )
        }
    ];

    return (
        <> < Input.Search placeholder = "Search name" onSearch = {
            handleSearch
        }
        enterButton style = {{
            width: 200,
          }}
        />
        <Button
            type="primary"
            className={cn("mb-3", "mx-1", "float-right")}
            onClick={() => setOpenForm(DRAWER_ACTIONS.CREATE)}>Add User</Button > <Button className={cn("mb-3", "mx-1", "float-right")}>
            <Link to={`/exchangeRate`}>Change Exchange Rate</Link>
        </Button>
        <Table
            dataSource={users}
            loading={loading}
            columns={columns}
            rowKey={"id"}
            pagination={{
                defaultPageSize: DEFAULT_PAGE_SIZE,
                current: pagination.currentPage,
                total: pagination.totalItems,
                showSizeChanger: true
            }}
            scroll={{
                y: 420
            }}
            onChange={handleTableChange}/>
        <AddUser details={selectedUserDetails} openType={openForm} onClose={closeForm}/>
    </>
    );
};

export default UsersList;
