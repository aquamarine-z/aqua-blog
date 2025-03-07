import React from 'react';
import Head from '@docusaurus/Head';
// @ts-ignore
import {useBlogPostStructuredData} from '@docusaurus/plugin-content-blog/client';

export default function BlogPostStructuredData(): JSX.Element {
  const structuredData = useBlogPostStructuredData();
  return (
    <Head>
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Head>
  );
}
