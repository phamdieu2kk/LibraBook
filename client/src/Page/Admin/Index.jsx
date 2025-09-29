import classNames from 'classnames/bind';
import styles from './Index.module.scss';
import { Layout, Menu } from 'antd';
import {
    HomeOutlined,
    ShoppingOutlined,
    UserOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    FileOutlined,
} from '@ant-design/icons';
import { useEffect, useState } from 'react';

import ManagerProduct from './Components/ManagerProducts/ManagerProduct';
import DashBoard from './Components/DashBoard/DashBoard';
import ManagerCategory from './Components/ManagerCategory/ManagerCategory';
import ManagerOrder from './Components/ManagerOrder/ManagerOrder';
import ManagerUser from './Components/ManagerUser/ManagerUser';
import { useNavigate } from 'react-router-dom';
import { requestAdmin } from '../../config/request';

const { Header, Sider, Content } = Layout;
const cx = classNames.bind(styles);

function Admin() {
    const [collapsed, setCollapsed] = useState(false);
    const [selectedKey, setSelectedKey] = useState('home');
    const navigate = useNavigate();

    useEffect(() => {
        const checkAdmin = async () => {
            try {
                await requestAdmin();
            } catch (error) {
                navigate('/');
            }
        };
        checkAdmin();
    }, []);

    const menuItems = [
        { key: 'home', icon: <HomeOutlined />, label: 'Trang chủ' },
        { key: 'products', icon: <ShoppingOutlined />, label: 'Quản lý sản phẩm' },
        { key: 'category', icon: <FileOutlined />, label: 'Quản lý danh mục' },
        { key: 'order', icon: <ShoppingOutlined />, label: 'Quản lý đơn hàng' },
        { key: 'users', icon: <UserOutlined />, label: 'Quản lý người dùng' },
    ];

    const renderContent = () => {
        switch (selectedKey) {
            case 'products':
                return <ManagerProduct />;
            case 'home':
                return <DashBoard />;
            case 'category':
                return <ManagerCategory />;
            case 'order':
                return <ManagerOrder />;
            case 'users':
                return <ManagerUser />;
            default:
                return <DashBoard />;
        }
    };

    return (
        <Layout className={cx('wrapper')}>
            {/* Sider */}
            <Sider
                collapsible
                collapsed={collapsed}
                onCollapse={(value) => setCollapsed(value)}
                style={{
                    background: '#93C5FD', // xanh nhạt
                    color: '#000',         // chữ đen
                }}
            >
                <div
                    className={cx('logo')}
                    style={{
                        color: '#000',
                        fontWeight: 'bold',
                        fontSize: collapsed ? '20px' : '24px',
                        textAlign: 'center',
                        padding: '16px 0',
                    }}
                >
                    {collapsed ? 'A' : 'ADMIN'}
                </div>

                <Menu
                    theme="light"
                    mode="inline"
                    selectedKeys={[selectedKey]}
                    items={menuItems}
                    onClick={(item) => setSelectedKey(item.key)}
                    style={{
                        background: 'transparent',
                        color: '#000',
                        fontWeight: '500',
                    }}
                    inlineCollapsed={collapsed}
                />
            </Sider>

            {/* Main Layout */}
            <Layout>
                {/* Header */}
                <Header
                    className={cx('header')}
                    style={{
                        background: '#F3F4F6',
                        display: 'flex',
                        alignItems: 'center',
                        padding: '0 24px',
                        fontSize: '16px',
                        color: '#000',
                    }}
                >
                    <button
                        type="button"
                        style={{
                            cursor: 'pointer',
                            border: 'none',
                            background: 'none',
                            fontSize: '20px',
                            color: '#000',
                        }}
                        onClick={() => setCollapsed(!collapsed)}
                    >
                        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                    </button>
                </Header>

                {/* Content */}
                <Content
                    className={cx('content')}
                    style={{
                        background: '#F9FAFB',
                        padding: '24px',
                        minHeight: '100vh',
                    }}
                >
                    {renderContent()}
                </Content>
            </Layout>
        </Layout>
    );
}

export default Admin;
