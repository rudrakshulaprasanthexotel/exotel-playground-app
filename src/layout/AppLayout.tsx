import { useMemo, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import type { NavigateFunction } from 'react-router-dom'
import {
  Box,
  AppBar as ExoAppBar,
  Icon,
  Navigation,
  type NavSectionProps,
} from '@exotel-npm-dev/signal-design-system'
import type { ThemeMode } from '@exotel-npm-dev/signal-design-system'
import { BRAND_LOGO } from '../constants/app'

function buildNavSections(navigate: NavigateFunction): NavSectionProps[] {
  const go = (path: string) => () => navigate(path)

  return [
    {
      items: [
        {
          id: 'home',
          icon: <Icon name="house" size="sm" color="grey" />,
          label: 'Home',
          path: '/',
          openNewPage: false,
          onClick: go('/'),
        },
        {
          id: 'example-table',
          icon: <Icon name="columns" size="sm" color="grey" />,
          label: 'Example - Table Page',
          path: '/example-table',
          openNewPage: false,
          onClick: go('/example-table'),
        },
        {
          id: 'example-settings',
          icon: <Icon name="gear" size="sm" color="grey" />,
          label: 'Example - Settings',
          path: '/example-settings',
          openNewPage: false,
          onClick: go('/example-settings'),
        },
        {
          id: 'example-node',
          icon: <Icon name="layout" size="sm" color="grey" />,
          label: 'Example - Node Flow',
          path: '/example-node',
          openNewPage: false,
          onClick: go('/example-node'),
        },
        {
          id: 'example-4',
          icon: <Icon name="chart-bar" size="sm" color="grey" />,
          label: 'Example 4',
          openNewPage: false,
          children: [
            {
              id: 'example-4-child-1',
              icon: <Icon name="circle" size="sm" color="grey" />,
              label: 'Child 1',
              path: '/example-4/child-1',
              openNewPage: false,
              onClick: go('/example-4/child-1'),
            },
            {
              id: 'example-4-child-2',
              icon: <Icon name="circle" size="sm" color="grey" />,
              label: 'Child 2',
              path: '/example-4/child-2',
              openNewPage: false,
              onClick: go('/example-4/child-2'),
            },
          ],
        },
      ],
    },
    {
      label: 'APPS',
      items: [
        {
          id: 'app-1',
          icon: <Icon name="squares-four" size="sm" color="grey" />,
          label: 'App 1',
          path: '/app-1',
          openNewPage: true,
          onClick: go('/app-1'),
        },
        {
          id: 'app-2',
          icon: <Icon name="squares-four" size="sm" color="grey" />,
          label: 'App 2',
          path: '/app-2',
          openNewPage: true,
          onClick: go('/app-2'),
        },
      ],
    },
  ]
}

export function AppLayout() {
  const navigate = useNavigate()
  const [themeMode, setThemeMode] = useState<ThemeMode>('light')

  const navSections = useMemo(() => buildNavSections(navigate), [navigate])

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', bgcolor: 'grey.50' }}>
      <ExoAppBar
        appLauncherProps={{
          type: 'default',
          iconName: 'squares-four',
          products: [
            {
              id: 'design-playground',
              name: 'Design Playground',
              section: 'Products',
              icon: <Icon name="squares-four" size="sm" />,
              onProductClick: () => {},
            },
            {
              id: 'contact-center',
              name: 'Contact Center',
              section: 'Products',
              icon: <Icon name="headset" size="sm" />,
              onProductClick: () => {},
            },
            {
              id: 'campaigns',
              name: 'Campaigns',
              section: 'Products',
              icon: <Icon name="chart-bar" size="sm" />,
              onProductClick: () => {},
            },
          ],
        }}
        brandLogo={BRAND_LOGO}
        avatarMenuProps={{
          avatarName: 'OP User',
          menuGroups: [
            {
              id: 'primary',
              items: [
                { id: 'item1', label: 'Menu Item 1', onClick: () => console.log('item1') },
                { id: 'item2', label: 'Menu Item 2', onClick: () => console.log('item2') },
                { id: 'item3', label: 'Menu Item 3', onClick: () => console.log('item3') },
              ],
            },
            {
              id: 'secondary',
              items: [
                { id: 'error-logs', label: 'Send Error Logs', onClick: () => console.log('error-logs') },
                { id: 'shortcuts', label: 'Keyboard Shortcuts', onClick: () => console.log('shortcuts') },
              ],
            }
          ],
          footerInfo: [{ label: 'Version', value: '1.0.0' }],
          selectedTheme: themeMode,
          onThemeChange: setThemeMode,
          onLogout: () => {},
        }}
        onNotificationClick={() => {}}
      />
      <Box sx={{ display: 'flex', flex: 1, minHeight: 0 }}>
        <Navigation items={navSections} staticSidebar />
        <Box
          sx={{
            flex: 1,
            bgcolor: 'grey.50',
            p: 1,
            overflow: 'auto',
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  )
}
