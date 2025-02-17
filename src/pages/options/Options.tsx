import { Routes, Route } from 'react-router-dom';
import { withErrorBoundary } from 'react-error-boundary';

import withSuspense from '@src/shared/hoc/withSuspense';
import ErrorPage from '@src/components/ErrorPage';
import Rolod0xThemeProvider from '@src/components/Rolod0xThemeProvider';
import { PageTitleProvider } from '@src/shared/contexts/PageTitleContext';

import ResponsiveDrawer from './layout/ResponsiveDrawer';
import AddressesSettings from './AddressesSettings';
import DisplaySettings from './DisplaySettings';
import Donate from './Donate';
import SiteSettings from './SiteSettings';
import ManageSettings from './ManageSettings';
import Help from './Help';
import About from './About';

const Options = () => {
  return (
    <Rolod0xThemeProvider>
      <PageTitleProvider>
        <Routes>
          <Route path="/" element={<ResponsiveDrawer />}>
            <Route index element={<AddressesSettings />} />
            <Route path="Addresses" element={<AddressesSettings />} />
            <Route path="Display" element={<DisplaySettings />} />
            <Route path="Sites" element={<SiteSettings />} />
            <Route path="Donate" element={<Donate />} />
            <Route path="Manage" element={<ManageSettings />} />
            <Route path="Help" element={<Help />} />
            <Route path="About" element={<About />} />
            <Route path="*" element={<AddressesSettings />} />
          </Route>
        </Routes>
      </PageTitleProvider>
    </Rolod0xThemeProvider>
  );
};

export default withErrorBoundary(withSuspense(Options, <h1> Loading rolod0x option... </h1>), {
  fallbackRender: ({ error }) => <ErrorPage error={error} />,
});
