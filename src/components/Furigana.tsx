/*
import Kuroshiro from "kuroshiro";

// @ts-ignore
import KuromojiAnalyzer from "kuroshiro-analyzer-kuromoji";
import React, {useState} from "react";
const kuroshiro = new Kuroshiro();
await kuroshiro.init(new KuromojiAnalyzer({
    dictPath: "/node_modules/kuromoji/dict"
}));
export async function Furigana({children}: { children: string }) {
    const [text,setText] = useState(children)
    kuroshiro.convert(text, {to: "furigana"}).then(it=>{
        setText(it)
    })
    return (
        <>
            {text}
        </>
    )
}*/