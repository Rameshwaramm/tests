// assets
import { IconDashboard } from '@tabler/icons';

// constant
const icons = { IconDashboard };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const dashboard = {
  id: 'dashboard',
  type: 'group',
  children: [
    {
      id: 'default',
      title: 'Dashboard',
      type: 'item',
      url: '/dashboard/default',
      icon: icons.IconDashboard,
      breadcrumbs: false
    },
    {
      id: 'default',
      title: 'Web-Scraper',
      type: 'item',
      url: '/dashboard/default',
      icon: icons.Icon ,
      breadcrumbs: false
    },
    {
      id: 'default',
      title: 'Google Search Scraper',
      type: 'item',
      url: '/dashboard/default',
      icon: icons.Icon,
      breadcrumbs: false
    }
  ]
};

export default dashboard;
