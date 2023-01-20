import { TabBar } from 'antd-mobile';
import { HistogramOutline, PieOutline, UserOutline } from 'antd-mobile-icons'
import React from 'react';
import styles from './app.module.less';
import {
  Route,
  Routes,
  useNavigate,
  useLocation,
  MemoryRouter,
} from 'react-router-dom'
import { Bookshelf } from './pages/bookshelf';
import { Statistics } from './pages/statistics';
import { PersonalCenter } from './pages/personal-center';

enum PagePaths {
  // 书架
  BOOKSHELF = '/bookshelf',
  // 统计
  STATISTICS = '/statistics',
  // 个人中心
  PERSONAL_CENTER = '/personalCenter'
}

const pageConfigs = [
  {
    path: PagePaths.BOOKSHELF,
    icon: <HistogramOutline />,
    component: <Bookshelf />
  },
  {
    path: PagePaths.STATISTICS,
    icon: <PieOutline />,
    component: <Statistics />
  },
  {
    path: PagePaths.PERSONAL_CENTER,
    icon: <UserOutline />,
    component: <PersonalCenter />
  },
]

const Bottom: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname: activePath } = location;

  return (
    <TabBar activeKey={activePath} onChange={navigate}>
      {pageConfigs.map(({ path, icon }) => (
        <TabBar.Item key={path} icon={icon} />
      ))}
    </TabBar>
  )
}

const App: React.FC = () => {
  return (
    <MemoryRouter initialEntries={[PagePaths.BOOKSHELF]}>
      <div className={styles.app}>
        <div className={styles.body}>
          <Routes>
            {
              pageConfigs.map(({ path, component }) => <Route path={path} element={component} key={path} />)
            }
          </Routes>
        </div>
        <div className={styles.bottom}>
          <Bottom />
        </div>
      </div>
    </MemoryRouter>
  )
}

export default App;
