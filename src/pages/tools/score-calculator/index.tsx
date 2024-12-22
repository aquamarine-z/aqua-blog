import {Button, Card, Flex, List} from "antd";
import {Input} from "antd"
import {create} from "zustand"
import {persist} from "zustand/middleware";
import {useEffect} from "react";

interface CalculatorInformation {
    subjectName: string,
    totalScore: number,
    passScore: number,
    usualScore: number,
    usualScoreRate: number
    minFinalScore: number,
}

interface ScoreCalculatorStorage {
    subjectName: string,
    totalScore: number,
    passScore: number,
    usualScore: number,
    usualScoreRate: number,
    minFinalScore: number,
    setData: (data: ScoreCalculatorStorage) => void,
    savedData: CalculatorInformation[]
}

const useCalculatorStorage = create<ScoreCalculatorStorage>()(persist((set, get) => {
    return {
        subjectName: "",
        totalScore: 100,
        passScore: 60,
        usualScore: 100,
        usualScoreRate: 30,
        minFinalScore: 0,
        setData: (data: ScoreCalculatorStorage) => {
            set(data)
        },
        savedData: [],
    }
}, {name: "score-calculator"}))
export default function ScoreCalculatorPage() {
    const calculatorStorage = useCalculatorStorage()
    useEffect(() => {

        //console.log((calculatorStorage.passScore-(calculatorStorage.usualScore*(calculatorStorage.usualScoreRate/100))))
        //console.log((1-calculatorStorage.usualScoreRate/100))
        const minFinalScore = ((calculatorStorage.passScore - (calculatorStorage.usualScore * (calculatorStorage.usualScoreRate / 100))) / (1 - calculatorStorage.usualScoreRate / 100)).toFixed(2)
        calculatorStorage.setData({...calculatorStorage, minFinalScore: parseFloat(minFinalScore)})
    }, [
        calculatorStorage.usualScore,
        calculatorStorage.usualScoreRate,
        calculatorStorage.passScore,
        calculatorStorage.totalScore,

    ]);
    return <div className={"w-[100vw] h-[100vh] flex items-center justify-center bg-white"}>
        <div
            className={"max-h-[500px] max-w-[800px] h-11/12 w-11/12 rounded-lg shadow border-gray-600 border-solid border-[1px] flex flex-col justify-start items-center gap-4 pt-4 overflow-y-scroll scrollbar-none pb-4"}>
            <h1 className={"font-medium text-gray-700 select-none "}>期末考试合格计算器</h1>
            <Card title={<h1 className={"font-medium text-xl text-gray-700 select-none mb-0 h-fit"}>基本信息</h1>}
                  className={"w-11/12 h-fit "}>
                <Flex gap={"middle"} vertical={true} justify={"start"}>
                    <Flex gap={"middle"} vertical={false} justify={"center"}>
                        <Input
                            prefix={<span className={"text-gray-700 select-none"}>学科名称</span>}
                            className={"w-full h-8"}
                            type={"text"}
                            value={calculatorStorage.subjectName}
                            onChange={(e) => {
                                calculatorStorage.setData({...calculatorStorage, subjectName: e.target.value})
                            }}
                        />

                    </Flex>
                    <Flex gap={"middle"} vertical={false} justify={"space-between"}>
                        <Input
                            prefix={<span className={"text-gray-700 select-none"}>总分</span>}
                            className={"w-1/2 h-8"}
                            type={"text"}
                            value={calculatorStorage.totalScore}
                            onChange={(e) => {
                                calculatorStorage.setData({
                                    ...calculatorStorage,
                                    totalScore: parseFloat(e.target.value) || 0
                                })
                            }}
                        />
                        <Input
                            prefix={<span className={"text-gray-700 select-none"}>合格成绩</span>}
                            className={"w-1/2 h-8"}
                            type={"text"}
                            value={calculatorStorage.passScore}
                            onChange={(e) => {
                                calculatorStorage.setData({
                                    ...calculatorStorage,
                                    passScore: parseFloat(e.target.value) || 0
                                })
                            }}
                        />
                    </Flex>
                    <Flex gap={"middle"} vertical={false} justify={"space-between"}>
                        <Input
                            prefix={<span className={"text-gray-700 select-none"}>平时成绩</span>}
                            className={"w-1/2 h-8"}
                            type={"text"}
                            value={calculatorStorage.usualScore}
                            onChange={(e) => {
                                calculatorStorage.setData({
                                    ...calculatorStorage,
                                    usualScore: parseFloat(e.target.value) || 0
                                })
                            }}
                        />
                        <Input
                            prefix={<span className={"text-gray-700 select-none"}>平时成绩占比</span>}
                            suffix={<span className={"text-gray-700 select-none"}>%</span>}
                            className={"w-1/2 h-8"}
                            type={"text"}
                            value={calculatorStorage.usualScoreRate}
                            onChange={(e) => {
                                calculatorStorage.setData({
                                    ...calculatorStorage,
                                    usualScoreRate: parseFloat(e.target.value) || 0
                                })
                            }}
                        />
                    </Flex>
                    <Flex gap={"middle"} vertical={false} justify={"center"}>
                        <span className={"select-none text-gray-700"}>期末成绩最低分:</span>
                        <span>{calculatorStorage.minFinalScore}</span>
                    </Flex>
                    <Flex gap={"middle"} vertical={false} justify={"center"}>
                        <Button type={"primary"} onClick={() => {
                            const data = calculatorStorage.savedData
                            data.push({
                                subjectName: calculatorStorage.subjectName,
                                totalScore: calculatorStorage.totalScore,
                                passScore: calculatorStorage.passScore,
                                usualScore: calculatorStorage.usualScore,
                                usualScoreRate: calculatorStorage.usualScoreRate,
                                minFinalScore: calculatorStorage.minFinalScore
                            })
                            calculatorStorage.setData({...calculatorStorage, savedData: data})
                        }}>保存档案</Button>
                    </Flex>
                </Flex>

            </Card>
            <Card title={<h1 className={"font-medium text-xl text-gray-700 select-none mb-0 h-fit"}>保存记录</h1>}
                  className={"w-11/12 h-fit "}>
                <List dataSource={calculatorStorage.savedData}
                      renderItem={(item, index) => {
                          return <List.Item key={index}>
                              <div className={"w-full h-full rounded border-gray-600 border-[0px] border-solid p-4 overflow-x-scroll scrollbar-none"}>
                                  <Flex gap={"middle"} vertical={false} justify={"start"} className={"text-sm select-none"} align={"center"}>
                                      <span>{item.subjectName}</span>
                                      <span>合格分数 </span>
                                      <span>{item.passScore}</span>
                                      <span>平时分 </span>
                                      <span>{item.usualScore} * {item.usualScoreRate}%</span>
                                      <span>期末最低 </span>
                                      <span className={"text-red-400"}>{item.minFinalScore}</span>
                                      <div className={"flex-grow"}/>
                                      <Button danger={true} type={"primary"} onClick={()=>{
                                            const data = calculatorStorage.savedData
                                            data.splice(index,1)
                                            calculatorStorage.setData({...calculatorStorage,savedData:data})
                                      }}>删除</Button>
                                  </Flex>
                                  
                              </div>
                          </List.Item>
                      }}
                >

                </List>
            </Card>
        </div>
    </div>
}