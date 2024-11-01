import {VisualizationDisplay} from "@site/src/components/VisualizationDisplay/VisualizationDisplay";
import {useState} from "react";

function PlayableTest(){
    return(
        <>
            <VisualizationDisplay playable={true}>
                111
            </VisualizationDisplay>
        </>
    )
}
function UpdateTest(){
    const [count,setCount]=useState(0);
    return(
        <>
            <button onClick={()=>{setCount(count+1)}}>click to update</button>
            <VisualizationDisplay data={
                count
            } onUpdate={(svg,data)=>{
                console.log(`update: ${data}`);
            }}/>
        </>
    )
}
export default { PlayableTest ,UpdateTest};