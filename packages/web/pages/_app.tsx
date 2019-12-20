import 'semantic-ui-css/semantic.min.css';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import App from 'next/app';
import NProgress from 'next-nprogress/component';

import { NextPageContextWithApollo } from '../types/NextPageContextWithApollo';

class MyApp extends App<NextPageContextWithApollo> {
  render() {
    const { apolloClient, Component, pageProps } = this.props;

    return (
      <>
        <NProgress
          color="#29d"
          options={{ trickleSpeed: 50 }}
          showAfterMs={300}
          spinner
        />
        <Component {...pageProps} apolloClient={apolloClient} />
      </>
    );
  }
}

export default MyApp;
