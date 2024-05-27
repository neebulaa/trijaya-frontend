import { ArrowLeftOutlined, DownOutlined, LogoutOutlined, UserOutlined } from "@ant-design/icons"
import { Button, Dropdown, Layout, MenuProps, Space, message } from "antd"
import { useNavigate } from "react-router-dom"

const { Header } = Layout

// type collapsedType = boolean;

// const onClick: MenuProps["onClick"] = ({ key }) => {
//   message.info(`Click on item ${key}`);
// };

const HeaderMenuItems: MenuProps['items'] = [
  {
    label: 'Profile',
    key: 'profile',
    icon: <UserOutlined />,
    onClick: () => {
      message.info('Click on Profile')
    },
  },
  {
    label: 'Logout',
    key: 'logout',
    icon: <LogoutOutlined />,
    onClick: () => {
      message.info('Click on Logout')
    },
  },
]

/**
 * Type
 */
type HeaderProps = {
  collapsed: boolean
  index: boolean
  logo?: React.ReactNode
  title: string
  prevRoute: string | undefined
}

export default function LayoutHeader(props: HeaderProps) {
  const { collapsed, index, logo, title, prevRoute } = props
  const navigate = useNavigate()

  const handleNavigate = () => {
    navigate(prevRoute!)
  }

  return (
    <Header
      className={`flex justify-between w-full text-white px-0 ${
        collapsed ? 'collapsed' : ''
      }`}
    >
      <div className={`logo-horizontal ${collapsed ? 'collapsed' : ''}`}>
        <strong>{collapsed ? 'LOGO' : 'LOGO AWESOME APP'}</strong>
      </div>
      <div className="right-top w-full flex justify-between">
        <div className="flex">
          {!index && (
            <Button
              type="text"
              className="h-[64px] leading-none"
              onClick={handleNavigate}
            >
              {!logo && (
                <ArrowLeftOutlined style={{ fontSize: 16, color: '#f3f3f3' }} />
              )}
            </Button>
          )}
          <div className="text-[16px] leading-1 ps-5 font-semibold">
            {title}
          </div>
        </div>
        <Dropdown
          menu={{ items: HeaderMenuItems }}
          trigger={['click']}
          placement="bottomRight"
          className="text-white"
        >
          <a onClick={(e) => e.preventDefault()}>
            <Space>
              <span>Username</span>
              <DownOutlined />
            </Space>
          </a>
        </Dropdown>
      </div>
    </Header>
  )
}