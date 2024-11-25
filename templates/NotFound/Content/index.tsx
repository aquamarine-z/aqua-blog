
import React from 'react';
import clsx from 'clsx';
import Translate from '@docusaurus/Translate';
import type {Props} from '@theme/NotFound/Content';
import Heading from '@theme/Heading';
import BrowserOnly from "@docusaurus/BrowserOnly";

export default function NotFoundContent({className}: Props): JSX.Element {
  const content=()=> <>
    <main className={clsx('container margin-vert--xl', className)} style={{minHeight: '100vh'}}>
      <div className="row select-none ">
        <div className="col col--6 col--offset-3 glass pt-5 pb-5 hover-float" onClick={() => {
          window.location.href = '/aqua-blog';
        }}>
          <Heading as="h1" className="hero__title text-center opacity-70">
            <Translate
                id="theme.NotFound.title"
                description="The title of the 404 page">
              Page Not Found
            </Translate>
          </Heading>
          <p className={'text-center opacity-70'}>
            <Translate
                id="theme.NotFound.p1"
                description="The first paragraph of the 404 page">
              We could not find what you were looking for.
            </Translate>
          </p>
          <p className={'text-center opacity-70'}>
            <Translate
                id="theme.NotFound.p2"
                description="The 2nd paragraph of the 404 page">
              Please contact the owner of the site that linked you to the
              original URL and let them know their link is broken.
            </Translate>
          </p>
        </div>
      </div>
    </main>
  </>
  return (
      <BrowserOnly>
        {content}
      </BrowserOnly>

  );
}
