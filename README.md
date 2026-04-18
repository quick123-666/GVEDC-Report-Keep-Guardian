# GVEDC-Report-Keep-Guardian

基于GVEDC数据库的自动报告生成和工作手册管理插件，支持IDE启动时自动运行。

## Table of Contents

- [项目介绍](#项目介绍)
- [核心特性](#核心特性)
- [技术栈](#技术栈)
- [快速开始](#快速开始)
- [使用指南](#使用指南)
- [核心功能](#核心功能)
- [项目结构](#项目结构)
- [版本信息](#版本信息)
- [致谢](#致谢)

## 项目介绍

**GVEDC-Report-Keep-Guardian** 是GVEDC项目的报告守护者插件，自动生成工作报告和工作手册，并存储到GVEDC向量数据库中。插件支持IDE启动时自动运行，持续监控和更新知识库状态。

## 核心特性

| 特性 | 说明 | 状态 |
|------|------|------|
| 自动报告生成 | IDE启动时自动生成多种类型的报告 | ✅ 已实现 |
| 工作手册生成 | 自动生成和更新项目工作手册 | ✅ 已实现 |
| 数据库存储 | 自动将报告存入ChromaDB向量数据库 | ✅ 已实现 |
| 百科化处理 | 报告自动进行百科化元数据提取 | ✅ 已实现 |
| 查重功能 | 自动检测和合并重复的报告和手册 | ✅ 已实现 |
| 图谱更新 | 添加新文档时自动更新知识图谱 | ✅ 已实现 |
| 启动任务 | IDE启动时自动加载和执行 | ✅ 已实现 |

## 技术栈

| 类别 | 技术 | 版本 |
|------|------|------|
| 插件环境 | Node.js | - |
| 数据库 | ChromaDB | >= 0.4.0 |
| 编程语言 | Python | 3.14.3 |
| 执行环境 | Python.exe | C:\Users\Administrator\.workbuddy\binaries\python\versions\3.14.3\python.exe |
| 目标数据库 | GVEDC DB | - |

## 快速开始

### 1. 安装插件

将插件目录 `GVEDC-Report-Keep-Guardian` 复制到Trae IDE的插件目录中。

### 2. 配置插件

插件会自动加载并执行启动任务，无需额外配置。

### 3. 验证安装

```javascript
// 获取插件状态
const status = await trae.executeTool('getReportGuardianStatus');
console.log(status);
```

## 使用指南

### 基本操作

#### 初始化插件

插件会在IDE启动时自动初始化，也可以手动初始化：

```javascript
await trae.executeTool('initializeReportGuardian');
```

#### 生成报告

```javascript
await trae.executeTool('generateReport', {
    type: 'Project Progress',
    content: '报告内容...'
});
```

#### 启用/禁用自动报告

```javascript
// 启用自动报告
await trae.executeTool('enableAutoReport');

// 禁用自动报告
await trae.executeTool('disableAutoReport');
```

### 启动任务

插件会在启动时自动执行以下任务：

| 任务名称 | 优先级 | 描述 |
|---------|-------|------|
| 生成每日数据库检查报告 | 1 | 检查数据库状态并生成报告 |
| 检查数据库新增内容 | 2 | 检查数据库文件大小和更新情况 |
| 保存项目工作报告 | 3 | 保存项目工作进度和状态报告 |
| 生成工作手册 | 4 | 生成详细的项目工作手册 |
| 更新工作手册 | 5 | 维护和更新工作手册 |
| 更新知识库状态 | 6 | 更新知识库运行状态和性能指标 |

## 核心功能

### 1. 报告生成

插件自动生成以下类型的报告：

- **每日数据库检查报告**：记录数据库状态、文件大小、新增内容
- **项目工作报告**：记录项目进度、工作总结、系统状态
- **工作手册**：详细的项目工作指南和操作手册
- **知识库状态报告**：记录知识库运行状态、性能指标、下一步计划

### 2. 百科化处理

插件使用EncyclopediaProcessor对报告进行百科化处理：

- 自动提取标题、作者、日期
- 自动提取关键词和分类
- 自动生成摘要
- 存储到documents集合

### 3. 查重功能

插件自动检测和处理重复内容：

- **工作报告查重**：相似度超过80%的报告自动合并或删除
- **工作手册查重**：相似度超过85%的手册自动合并或删除
- **相似合并**：相似度超过70%的工作手册生成合并版本

### 4. 图谱更新

当添加新文档到数据库时：

- 自动触发图谱重新构建
- 从新文档中提取实体和关系
- 更新图谱节点和边
- 生成新的图谱报告

## API 接口

### initializeReportGuardian

初始化插件并执行报告生成任务。

```javascript
const result = await trae.executeTool('initializeReportGuardian');
```

### enableAutoReport

启用自动报告功能。

```javascript
const result = await trae.executeTool('enableAutoReport');
```

### disableAutoReport

禁用自动报告功能。

```javascript
const result = await trae.executeTool('disableAutoReport');
```

### getReportGuardianStatus

获取插件状态和功能信息。

```javascript
const status = await trae.executeTool('getReportGuardianStatus');
console.log(status);
// 输出：
// {
//   name: 'gvedc-report-keep-guardian',
//   version: '1.0.1',
//   description: 'GVEDC报告守护者插件...',
//   autoReportEnabled: true,
//   startupTasks: [...],
//   capabilities: [...]
// }
```

### generateReport

生成指定类型的报告并存入数据库。

```javascript
const result = await trae.executeTool('generateReport', {
    type: 'Project Progress',
    content: '本次工作完成了以下任务...'
});
```

## 项目结构

```
GVEDC-Report-Keep-Guardian/
├── index.js                 # 插件主代码
├── package.json              # 插件配置
├── openclaw.plugin.json      # 插件注册信息
├── README.md                 # 项目说明文档
└── LICENSE                  # 许可证文件
```

### 核心模块

- **index.js**: 插件主代码，包含报告生成、工作手册、查重等功能
- **package.json**: npm包配置，定义插件元数据
- **openclaw.plugin.json**: Trae IDE插件注册配置

## 数据库存储

插件将所有报告存储到GVEDC数据库：

- **数据库路径**: `C:\Users\Administrator\Documents\trae_projects\635416546534\db`
- **集合名称**: `reports`
- **存储格式**: ChromaDB向量数据库

报告元数据包含：
- 标题、作者、日期
- 报告类型、关键词
- 分类、摘要
- 来源信息

## 配置选项

插件配置文件为 `openclaw.plugin.json`：

```json
{
  "plugin": {
    "name": "GVEDC-Report-Keep-Guardian",
    "type": "core",
    "version": "1.0.1",
    "loadOnStartup": true,
    "autoInitialize": true,
    "capabilities": [
      "initializeReportGuardian",
      "enableAutoReport",
      "disableAutoReport",
      "getReportGuardianStatus",
      "generateReport"
    ]
  }
}
```

## 故障排除

### 插件不自动启动

- 检查 `openclaw.plugin.json` 中的 `loadOnStartup` 和 `autoInitialize` 配置
- 检查插件目录是否正确放置
- 查看IDE控制台日志，了解启动失败原因

### 报告生成失败

- 检查数据库路径是否正确配置
- 检查ChromaDB数据库是否正常
- 查看IDE控制台日志，了解具体失败原因

### 数据库存储失败

- 检查数据库写入权限
- 检查数据库路径是否存在
- 检查ChromaDB数据库是否正常

## 版本信息

- **版本**: 1.0.1
- **日期**: 2026-04-18
- **状态**: 🟢 活跃开发中

## 贡献

欢迎提交Issue和Pull Request来改进这个插件！

## 致谢

本项目的设计和实现受到了 Milla Jovovich（《生化危机》系列电影女主）及其向量数据库项目 MemPalace 的启发。她的创新思路和技术探索为我们提供了宝贵的参考，特别是在向量数据存储和检索方面的实践经验。我们在此表示诚挚的感谢，感谢她为推动向量数据库技术发展所做出的贡献。

English: The design and implementation of this project was inspired by Milla Jovovich (Resident Evil series actress) and her vector database project MemPalace. Her innovative ideas and technical explorations have provided us with valuable references, especially in the field of vector data storage and retrieval. We hereby express our sincere gratitude for her contributions to the advancement of vector database technology.

GitHub: milla-jovovich/mempalace

---

**Guardian Reports, Record Growth** - GVEDC-Report-Keep-Guardian