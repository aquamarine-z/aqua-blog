import fs from 'fs'
import * as path from "node:path";

const rootDir: string = 'Z:\\Programming\\Projects\\Java Projects\\JavaClassProjects\\Homework4\\src'
const projectLanguage = 'java'
const markdownTitle = 'Homework4'
const type='java-homework'
//将整个项目编译到一个markdown文件 目前只适配了java作业项目 且只实现了一层文件嵌套
function generateMarkdownJavaHomework() {
    let markdownContent =
        `---
title: ${markdownTitle}
---`
    //获取root下面的所有子文件
    const files = fs.readdirSync(rootDir)
    for (const file of files) {
        const filePath = path.join(rootDir, file)

        const stat = fs.statSync(filePath)
        let packageName = ''
        if (stat.isDirectory()) {
            packageName = file.toString()
            markdownContent+=`
## ${packageName}

            `
            //console.log(filePath)

            //获取子文件夹下面的所有文件
            const subFiles = fs.readdirSync(filePath)
            for (const subFile of subFiles) {
                const subFilePath = path.join(filePath, subFile)
                const subStat = fs.statSync(subFilePath)

                if (subStat.isFile()) {
                    const content = fs.readFileSync(subFilePath, 'utf-8')
                    //console.log(subFilePath)
                    markdownContent += `
\`\`\`${projectLanguage} title="${packageName}/${subFile}"
${content}
\`\`\`
`
                }
            }
        }
    }
    //console.log(markdownContent)
    return markdownContent
}
function generateMarkdown(){
    switch (type){
        case "java-homework":
            return generateMarkdownJavaHomework()
    }
}

console.log(generateMarkdown())