import styles from "./index.module.scss"
import React, {MouseEvent, MouseEventHandler, useEffect, useRef} from "react";
import Layout from "@theme/Layout";
import Translate, {translate} from "@docusaurus/Translate";
// @ts-ignore
import avatarApricityx from "@site/static/friends-avatar/Apricityx.png"
//@ts-ignore
import avatarWinstonChen from "@site/static/friends-avatar/WinstonChen.png"
//@ts-ignore
import avatarSyanWang from "@site/static/friends-avatar/SyanWang.png"
// @ts-ignore
import logoGithub from "@site/static/icon/MdiGithub.png"
// @ts-ignore
import logoBlog from "@site/static/icon/Fa6SolidBlog.png"

// @ts-ignore
import  logoLink from "@site/static/icon/MaterialSymbolsLink.png"
const friendsList = [
    {
        name: "Apricityx",
        avatar: avatarApricityx,
        labels: ['friend','schoolmate'],
        links: [
            {
                name: 'Github',
                icon: logoGithub,
                link: "https://github.com/apricityx"
            }, {
                name: 'Blog',
                icon: logoBlog,
                link: "https://blog.apricityx.top/"
            }
        ]
    },
    {
        name: "Winston Chen",
        avatar: avatarWinstonChen,
        labels: ['friend','schoolmate'],
        links: [
            {
                name: 'Github',
                icon: logoGithub,
                link: "https://github.com/WinstonCHEN1/"
            }, {
                name: 'Blog',
                icon: logoBlog,
                link: "https://winstonchen1.github.io/"
            }
        ]
    },
    {
        name: "Syan Wang",
        avatar: avatarSyanWang,
        labels: ['friend','schoolmate'],
        links: [
            {
                name: 'Github',
                icon: logoGithub,
                link: "https://github.com/TheSorry404"
            }, {
                name: 'Blog',
                icon: logoBlog,
                link: "https://40404.site/"
            }
        ]
    }
]
const labelDefaultColors = {
    friend: "#95fce3",
    schoolmate:"#5aacfa",
    teacher:"#fdffa0",
    lover:"#f5d0ff",
    family:'#9bf3b3',
    common: "#8f72ee",
}

interface FriendViewProps {
    avatar?: string,
    name?: string,
    labels?: string[],
    links?: { name: string, icon: string, link: string }[],
}

function FriendView(props: FriendViewProps) {
    useEffect(() => {

    }, []);
    return <div className={styles['friend-view-container']}>
        <div className={styles["heading"]}>
            <img className={styles["avatar"]} src={props.avatar ?? ""} alt={""}/>
            <h1>{props.name}</h1>


        </div>
        <div className={styles["label-view"]}>
            {
                props.labels.map((it,index) => {
                    return <p key={index} className={styles["label"]}
                              style={{background: labelDefaultColors[it] ?? labelDefaultColors["common"]}}>

                        <Translate id={`friends.labels.${it}`}>
                            {it}
                        </Translate>
                    </p>
                })
            }
        </div>
        <div className={styles["link-list"]}>
            {
                props.links.map((it,index) => {
                    return <div key={index} className={styles['link-view']}>
                        <img className={styles['link-img']} src={it.icon ?? logoLink} alt={""}/>
                        <a className={styles['link-link']} href={it.link} onClick={(e) => {
                            e.preventDefault()
                            window.open(it.link)
                        }}>{it.name}</a>
                    </div>
                })
            }
        </div>


    </div>
}

export default function Friends() {
    return <Layout
        title={`${translate({id: "friends.title"})}`}
        description="Description will go into a meta tag in <head />">
        <main>
            <div className={styles["background"]}>
                <div className={styles['content']}>
                    {friendsList.map((it,index) => {
                        return <FriendView key={index} avatar={it.avatar} name={it.name} labels={it.labels} links={it.links}/>
                    })}
                </div>
            </div>
        </main>
    </Layout>
}
/*
export default function Friends() {
    const containerRef = useRef<HTMLDivElement>()
    let isDragging = false;
    let startX: number
    let scrollLeft: number;
    let isOverContent = false;
    const mouseDown = (event: MouseEvent) => {
        isDragging = true;
        isOverContent = true;
        startX = event.pageX - containerRef.current.offsetLeft;
        scrollLeft = containerRef.current.scrollLeft;
        containerRef.current.style.cursor = 'grabbing';
    }
    const mouseMove = (event: MouseEvent) => {
        if (!isDragging) return;
        event.preventDefault();
        const x = event.pageX - containerRef.current.offsetLeft;
        const walk = (x - startX) * 2; // 调整滚动速度
        containerRef.current.scrollLeft = scrollLeft - walk;
    }
    const mouseLeave = (event: MouseEvent) => {
        isOverContent = false
        isDragging = false;
        containerRef.current.style.cursor = 'grab';
        document.body.style.overflowY = ""
    }
    const mouseEnter = (event: MouseEvent) => {
        isOverContent = true;
        document.body.style.overflowY = "hidden"
    }
    const mouseUp = (event: MouseEvent) => {
        isOverContent = false
        isDragging = false;
        containerRef.current.style.cursor = 'grab';
    }
    const scrollMove = (event: WheelEvent) => {
        if (isOverContent) {

            isDragging = true;
            event.preventDefault();
            containerRef.current.scrollLeft += event.deltaY;
        }
    }
    useEffect(() => {
        const preventWindowScroll = (event: Event) => {
            if (isOverContent) {
                //event.preventDefault()
            }
        }
        window.addEventListener("wheel", preventWindowScroll)
        return () => {
            window.removeEventListener("wheel", preventWindowScroll)
        }
    }, []);
    return <Layout
        title={`${translate({id: "friends.title"})}`}
        description="Description will go into a meta tag in <head />">
        <main>
            <div className={styles["background"]}>
                <div
                    className={styles['content']}
                    ref={containerRef}
                    onMouseDown={mouseDown}
                    onMouseMove={mouseMove}
                    onMouseLeave={mouseLeave}
                    onMouseUp={mouseUp}
                    onMouseEnter={mouseEnter}
                    onWheel={scrollMove}
                >
                    <FriendsView fatherDivRef={containerRef} rotation={12}/>
                    <FriendsView fatherDivRef={containerRef} rotation={30}/>
                    <FriendsView fatherDivRef={containerRef} rotation={12}/>
                    <FriendsView fatherDivRef={containerRef} rotation={30}/>
                    <FriendsView fatherDivRef={containerRef} rotation={12}/>
                    <FriendsView fatherDivRef={containerRef} rotation={30}/>
                    <FriendsView fatherDivRef={containerRef} rotation={12}/>
                    <FriendsView fatherDivRef={containerRef} rotation={30}/>
                    <FriendsView fatherDivRef={containerRef} rotation={12}/>
                    <FriendsView fatherDivRef={containerRef} rotation={30}/>
                </div>
            </div>
        </main>
    </Layout>
}*/