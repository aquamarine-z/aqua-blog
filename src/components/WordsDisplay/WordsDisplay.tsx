export interface Word {
    word: string,
    hiragana?: string,
    meaning?: string,

}

export interface KataganaWord extends Word {
    originWord?: string,
    originWordLanguage?: string
}

export interface WordsDisplayProps {
    words?: Word[],
    tableType?: "word" | "katagana"
}

export const word = (word: string, hiragana: string, meaning: string) => {
    return {word: word, hiragana: hiragana, meaning: meaning}
}
export const kataganaWord = (word: string, originWord: string, meaning: string, originWordLanguage?: string) => {
    return {word: word, meaning: meaning, originWord: originWord, originWordLanguage: originWordLanguage || "英语"}
}
export const WordsDisplay = (props: WordsDisplayProps) => {
    if (props.tableType === "katagana") {
        return <div className="glass p-4 w-full">
            <table className="w-full table-fixed rounded-md">
                <tbody className={"table w-full"}>
                    <tr>
                        <th className="w-1/4 max-w-[25%] px-4 py-2">单词</th>
                        <th className="w-1/4 max-w-[25%] px-4 py-2">来源单词</th>
                        <th className="w-1/4 max-w-[25%] px-4 py-2">来源语言</th>
                        <th className="w-1/4 max-w-[25%] px-4 py-2">意思</th>
                    </tr>
                    {props.words?.map((word: KataganaWord, index) => (
                        <tr key={index}>
                            <td className="w-1/4 max-w-[25%]  px-4 py-2 text-center">{word.word}</td>
                            <td className="w-1/4 max-w-[25%] px-4 py-2 text-center">{word.originWord}</td>
                            <td className="w-1/4 max-w-[25%] px-4 py-2 text-center">{word.originWordLanguage}</td>
                            <td className="w-1/4 max-w-[25%] px-4 py-2 text-center">{word.meaning}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    } else return <div className="glass p-4 w-full">
        <table className="w-full table-fixed rounded-md">
            <tbody className={"table w-full"}>
                <tr>
                    <th className="w-1/3 px-4 py-2">单词</th>
                    <th className="w-1/3 px-4 py-2">假名</th>
                    <th className="w-1/3 px-4 py-2">意思</th>
                </tr>
                {props.words?.map((word, index) => (
                    <tr key={index}>
                        <td className="w-1/3  px-4 py-2 text-center">{word.word}</td>
                        <td className="w-1/3  px-4 py-2 text-center">{word.hiragana}</td>
                        <td className="w-1/3  px-4 py-2 text-center">{word.meaning}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
}