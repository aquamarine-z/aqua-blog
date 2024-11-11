//该文件是为了方便将java cpp的作业和实验代码全部写入一个markdown而设计

import fs from 'fs'
import * as path from "node:path";

const rootDir: string = 'Z:\\University\\Homework\\2024-DSA-2\\lab4'
const projectLanguage = 'cpp'
const markdownTitle = 'Lab4'
const projectType:string = 'cpp-homework'

function getFilesSync(dir: string): string[] {
    const files: string[] = [];

    function walk(currentDir: string) {
        const dirents = fs.readdirSync(currentDir, {withFileTypes: true});

        for (const dirent of dirents) {
            const res = path.resolve(currentDir, dirent.name);
            if (dirent.isDirectory()) {
                walk(res);
            } else {
                files.push(res);
            }
        }
    }

    walk(dir);
    return files;
}


//将整个项目编译到一个markdown文件 目前只适配了java cpp作业项目 且只实现了一层文件嵌套
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
            const subFiles = getFilesSync(filePath)
            for (const subFile of subFiles) {
                //const subFilePath = path.join(filePath, subFile)
                const subFilePath = subFile
                const subStat = fs.statSync(subFilePath)
                const subFileName = subFilePath.replace(`${path.join(rootDir, file)}\\`, "")
                //console.log(path.join(rootDir,file))
                if (subStat.isFile()) {
                    const content = fs.readFileSync(subFilePath, 'utf-8')
                    //console.log(subFilePath)
                    markdownContent += `
\`\`\`${projectLanguage} title="${subFileName}"
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

//rootDir要精确到labx这个位置
function generateMarkdownCppExperiment() {

    let markdownContent = `---
title: ${markdownTitle}
---

# ${markdownTitle}
`

    const files = fs.readdirSync(rootDir)

    for (const file of files) {

        if(!file.startsWith('task')) continue

        const taskName = file
        markdownContent += `
## ${taskName}
`

        const taskPath = path.join(rootDir, file)
        const projectFiles = getFilesSync(taskPath)
        for (const projectFile of projectFiles) {
            if (projectFile.endsWith(".cpp") || projectFile.endsWith(".h")) {
                const fileName = projectFile.replace(`${taskPath}\\`, "")
                const fileContent = fs.readFileSync(projectFile, 'utf-8')
                markdownContent += `
\`\`\`cpp title="${fileName}"
${fileContent}
\`\`\`
`
            }
        }
    }
    return markdownContent
}
function generateMarkdown(){
    switch (projectType) {
        case "java-homework":
            return generateMarkdownJavaHomework()
        case "cpp-homework":
            return generateMarkdownCppExperiment()
    }
}

console.log(generateMarkdown())
//console.log(getFilesSync(rootDir))