# GVEDC-Report-Keep-Guardian

GVEDC Report Guardian Plugin - Auto generates reports and stores to database, supports auto run at IDE startup.

## Features

- **Auto Report Generation**: Automatically generates various types of reports at IDE startup
- **Database Storage**: Automatically stores reports to ChromaDB vector database
- **Task Management**: Supports multi-task execution with priority sorting
- **System Check**: Automatically checks database updates and system status
- **Knowledge Guardian**: Continuously monitors and updates knowledge base status

## Core Functions

### Startup Tasks

| Task Name | Priority | Description |
|-----------|----------|-------------|
| Generate daily database check report | 1 | Check database status and generate report |
| Check database updates | 2 | Check database file size and update status |
| Save project work report | 3 | Save project progress and status report |
| Generate work manual | 4 | Generate detailed work manual |
| Update work manual | 5 | Maintain and update work manual |
| Update knowledge base status | 6 | Update knowledge base running status and performance metrics |

### Report Types

- **Daily Database Check Report**: Records database status, file size, new content
- **Project Work Report**: Records project progress, work summary, system status
- **Work Manual**: Detailed project work guide and operation manual
- **Knowledge Base Status Report**: Records knowledge base running status, performance metrics, next steps

## Installation

### 1. Install Plugin

Copy the plugin directory `GVEDC-Report-Keep-Guardian` to Trae IDE's plugin directory.

### 2. Configure Plugin

Plugin auto loads and executes startup tasks, no additional configuration needed.

### 3. Manual Control

Control plugin manually via commands:

```javascript
// Initialize plugin and execute startup tasks
await trae.executeTool('initializeReportGuardian');

// Enable auto report
await trae.executeTool('enableAutoReport');

// Disable auto report
await trae.executeTool('disableAutoReport');

// Get plugin status
const status = await trae.executeTool('getReportGuardianStatus');

// Generate specified type report
await trae.executeTool('generateReport', {
    type: 'Project Progress',
    content: 'Report content...'
});
```

## API Interface

### 1. initializeReportGuardian
- **Description**: Initialize plugin and execute report generation tasks
- **Parameters**: None
- **Returns**: Initialization result

### 2. enableAutoReport
- **Description**: Enable auto report function
- **Parameters**: None
- **Returns**: Operation result

### 3. disableAutoReport
- **Description**: Disable auto report function
- **Parameters**: None
- **Returns**: Operation result

### 4. getReportGuardianStatus
- **Description**: Get plugin status
- **Parameters**: None
- **Returns**: Plugin status information

### 5. generateReport
- **Description**: Generate specified type report and store to database
- **Parameters**:
  - `type`: Report type
  - `content`: Report content
- **Returns**: Generated report

## Plugin Configuration

Plugin configuration file is `openclaw.plugin.json`, main config items:

- **loadOnStartup**: Whether to load at startup (default: true)
- **autoInitialize**: Whether to auto initialize (default: true)
- **capabilities**: Plugin capability list

```json
{
  "plugin": {
    "type": "core",
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

## Database Storage

All reports auto store to GVEDC database:

- **Database Path**: `C:\Users\Administrator\Documents\trae_projects\635416546534\db`
- **Collection Name**: `reports`
- **Storage Format**: ChromaDB vector database

Report metadata contains:
- Title, author, date
- Report type, keywords
- Category, abstract
- Source information

## Version Info

- **Version**: 1.0.1
- **Date**: 2026-04-18
- **Status**: Active

## Troubleshooting

### Plugin not auto starting
- Check `loadOnStartup` and `autoInitialize` config in `openclaw.plugin.json`
- Check if plugin directory is placed correctly
- Check IDE console logs for startup failure reasons

### Report generation failed
- Check if database path is configured correctly
- Check if ChromaDB database is running properly
- Check IDE console logs for specific failure reasons

### Database storage failed
- Check database write permissions
- Check if database path exists
- Check if ChromaDB database is running properly

## Contributing

Issues and Pull Requests are welcome to improve this plugin!

## License

This project uses MIT license. See [LICENSE](LICENSE) file for details.

---

**Guardian Reports, Record Growth** - GVEDC-Report-Keep-Guardian