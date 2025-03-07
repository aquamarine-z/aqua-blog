import React from 'react';
import clsx from 'clsx';
import {useWindowSize} from '@docusaurus/theme-common';
import {useDoc} from '@docusaurus/plugin-content-docs/client';
import DocItemPaginator from '@theme/DocItem/Paginator';
import DocVersionBanner from '@theme/DocVersionBanner';
import DocVersionBadge from '@theme/DocVersionBadge';
import DocItemFooter from '@theme/DocItem/Footer';
import DocItemTOCMobile from '@theme/DocItem/TOC/Mobile';
import DocItemTOCDesktop from '@theme/DocItem/TOC/Desktop';
import DocItemContent from '@theme/DocItem/Content';
import DocBreadcrumbs from '@theme/DocBreadcrumbs';
import ContentVisibility from '@theme/ContentVisibility';
import type {Props} from '@theme/DocItem/Layout';

import styles from './styles.module.css';
import Comment from '../../../components/Comment';

/**
 * Decide if the toc should be rendered, on mobile or desktop viewports
 */
function useDocTOC() {
    const {frontMatter, toc} = useDoc();
    const windowSize = useWindowSize();

    const hidden = frontMatter.hide_table_of_contents;
    const canRender = !hidden && toc.length > 0;

    const mobile = canRender ? <DocItemTOCMobile/> : undefined;

    const desktop =
        canRender && (windowSize === 'desktop' || windowSize === 'ssr') ? (
            <DocItemTOCDesktop/>
        ) : undefined;

    return {
        hidden,
        mobile,
        desktop,
    };
}

export default function DocItemLayout({children}: Props): JSX.Element {
    const docTOC = useDocTOC();
    const {frontMatter} = useDoc();
    //@ts-ignore
    const {hide_comment: hideComment} = frontMatter;
    const {metadata} = useDoc();
    // min-h-[90vh]是为了让页面在markdown过短的时候至少有一个90%的高度 不然感觉不好看
    return (

        <div className={"row" + " min-h-[90vh]"}>

            <div className={clsx('col', !docTOC.hidden && styles.docItemCol)}>
                <ContentVisibility metadata={metadata}/>
                <DocVersionBanner/>
                <div className={styles.docItemContainer}>

                    <article>
                        <DocBreadcrumbs/>
                        <DocVersionBadge/>
                        {docTOC.mobile}
                        <DocItemContent>{children}</DocItemContent>
                        <DocItemFooter/>
                    </article>
                    <DocItemPaginator/>
                </div>
                {!hideComment && <Comment/>}
            </div>
            {docTOC.desktop && <div className="col col--3">{docTOC.desktop}</div>}
        </div>
    );
}
