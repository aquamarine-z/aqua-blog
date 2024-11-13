import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import type {Props} from '@theme/PaginatorNavLink';
import {appearanceSettings} from "@site/src/theme-settings/appearance-settings";

export default function PaginatorNavLink(props: Props): JSX.Element {
  const {permalink, title, subLabel, isNext} = props;

  return (
    <Link
      className={clsx(
        'pagination-nav__link',
        isNext ? 'pagination-nav__link--next' : 'pagination-nav__link--prev',
          (appearanceSettings.paginator === 'glass' && 'glass')
      )}
      to={permalink}>
      {subLabel && <div className="pagination-nav__sublabel">{subLabel}</div>}
      <div className="pagination-nav__label">{title}</div>
    </Link>
  );
}
