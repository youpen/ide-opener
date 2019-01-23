# ide-opener

#### Mac下快速用ide启动项目的命令行工具

#####Install
```base
npm install -g ide-opener
```

#####Usage
---
##### set default ide
```
op default webstorm
op ./MyProject
```
##### start a project or file
```
op webstorm ./MyProjects 
```
##### set alias for ide
```
op alias webstorm ws
op ww ./MyProjects
```
##### config a new ide
op config <ide> <idePath>
```
op config webstorm /Applications/WebStorm.app
```
##### show config
```bash
op show
```
