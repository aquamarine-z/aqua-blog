import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';
import Translate, {translate} from "@docusaurus/Translate";

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: translate({
        id:"homepage.feature1.title"
    }),
    Svg: require('@site/static/img/features/d3-logo.svg').default,
    description: (
      <Translate id={"homepage.feature1.description"}>
      </Translate>
    ),
  },
    {
        title: translate({
            id: "homepage.feature2.title"
        }),
        Svg: require('@site/static/img/features/react-logo.svg').default,
    description: (
        <Translate id={"homepage.feature2.description"}>
        </Translate>
    ),
  },
    {
        title: translate({
            id: "homepage.feature3.title"
        }),
        Svg: require('@site/static/img/features/japanese-hiragana-logo.svg').default,
        description: (
            <Translate id={"homepage.feature3.description"}>
            </Translate>
        ),
    },
];

function Feature({title, Svg, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
