# GVEDC-Report-Keep-Guardian

自动生成报告和工作手册的插件，支持IDE启动时自动运行。

## 功能

- 自动生成每日数据库检查报告
- 自动生成和更新工作手册
- 报告百科化处理
- 自动检测重复报告并合并
- **3个相似报告自动提炼工作手册**
- 报告自动存储到数据库

## 安装

复制 `GVEDC-Report-Keep-Guardian` 目录到 Trae IDE 插件目录即可。

## 使用

插件会在IDE启动时自动运行，无需手动操作。

## 启动任务

插件启动时自动执行以下任务：

1. 生成每日数据库检查报告
2. 检查数据库新增内容
3. 保存项目工作报告
4. 生成工作手册
5. 更新工作手册
6. **3个相似报告提炼工作手册**
7. 更新知识库状态

## 命令

```javascript
// 获取状态
trae.executeTool('getReportGuardianStatus')

// 生成报告
trae.executeTool('generateReport', {
    type: '报告类型',
    content: '报告内容'
})
```

## 配置

插件配置文件：`openclaw.plugin.json`

```json
{
  "plugin": {
    "loadOnStartup": true,
    "autoInitialize": true
  }
}
```

## 版本

- **版本**: 1.0.3
- **日期**: 2026-04-18

## 关联项目

本插件依赖 [GVEDC](https://github.com/quick123-666/Graph-Vector-Encyclopedia-Database-Context) 图谱向量数据库项目。