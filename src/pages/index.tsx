import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Heading from '@theme/Heading';

import styles from './index.module.scss';
import Translate, {translate} from "@docusaurus/Translate";

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
            <Translate id={"homepage.title"} description={"Title of the homepage"}>
                 {siteConfig.title}
            </Translate>

        </Heading>
        <p className="hero__subtitle">
            <Translate id={"homepage.subtitle"} description={"Subtitle of the homepage"}>
                 {siteConfig.tagline}
            </Translate>

        </p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/intro">
            <Translate id={'homepage.tutorial-link'}>
                Go To Tutorial Page
            </Translate>
          </Link>
        </div>
      </div>
    </header>
  );
}

/*
export default function Home(): JSX.Element {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`${translate({id:"homepage.title"})}`}
      description="Description will go into a meta tag in <head />">
      <HomepageHeader />
      <main>
          <h1 style={{width:"100%",textAlign:"center",marginTop:"50px",fontSize:"40px",color:"var(--ifm-color-primary-darker)"}}>
              <Translate id={"homepage.features.title"}>
                  Now learning
              </Translate>
          </h1>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}

 */
function NewHomepageHeader(){
    const {siteConfig} = useDocusaurusContext();
  return (
      <header className={' glass flex flex-col justify-start items-center padding--lg hover-float' } style={{maxWidth: '90%'}}>

          <div className="container">
              <Heading as="h1" className="hero__title opacity-85 text--center select-none text-adaptive">
                  <Translate id={"homepage.title"} description={"Title of the homepage"}>
                      {siteConfig.title}
                  </Translate>

              </Heading>
              <p className="hero__subtitle text--center opacity-70 select-none transition-none text-adaptive">
                  <Translate id={"homepage.subtitle"} description={"Subtitle of the homepage"}>
                      {siteConfig.tagline}
                  </Translate>

              </p>
              <div className={`${styles.buttons}`}>
                  <Link
                      className={`select-none glass padding--sm text-black text-opacity-80 font-medium ${styles['link-button']} text-adaptive`}
                      to="/docs/intro">
                      <Translate id={'homepage.tutorial-link'}>
                          Go To Tutorial Page
                      </Translate>
                  </Link>
              </div>
          </div>
      </header>

  );
}

export default function Home(): JSX.Element {
    const {siteConfig} = useDocusaurusContext();
    return (
        <Layout
            title={`${translate({id: "homepage.title"})}`}
            description="Description will go into a meta tag in <head />">
            <div className={`${styles["background"]} gap-4`}>

                <NewHomepageHeader/>



                    <h1 style={{
                        width: "100%",
                        textAlign: "center",
                        marginTop: "50px",
                        fontSize: "40px",

                    }} className={'opacity-85 select-none text-adaptive'}>
                        <Translate id={"homepage.features.title"}>
                            Now learning
                        </Translate>
                    </h1>
                    <HomepageFeatures/>

            </div>

        </Layout>
    );
}