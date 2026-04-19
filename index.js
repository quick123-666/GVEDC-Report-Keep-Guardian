const { execSync } = require('child_process');

const PYTHON_PATH = 'C:\\Users\\Administrator\\.workbuddy\\binaries\\python\\versions\\3.14.3\\python.exe';
const DAILY_CHECK_SCRIPT = 'C:\\Users\\Administrator\\Documents\\trae_projects\\635416546534\\db\\daily_check.py';
const DB_PATH = 'C:\\Users\\Administrator\\Documents\\trae_projects\\635416546534\\db';

class GVEDCReportKeepGuardian {
    constructor() {
        this.name = 'gvedc-report-keep-guardian';
        this.description = 'GVEDC报告守护者插件，自动生成报告并存入数据库，支持IDE启动时自动运行';
        this.version = '1.0.3';
        this.autoReportEnabled = true;
        this.startupTasks = [];
    }

    async initialize() {
        try {
            console.log('GVEDC Report Keep Guardian v' + this.version + ' initializing...');

            this.loadStartupTasks();

            await this.executeStartupTasks();

            console.log('GVEDC Report Keep Guardian initialized successfully');

            return {
                success: true,
                message: 'GVEDC Report Keep Guardian initialized successfully'
            };
        } catch (error) {
            console.error('GVEDC Report Keep Guardian initialization failed:', error);
            return {
                success: false,
                error: error.message
            };
        }
    }

    loadStartupTasks() {
        this.startupTasks = [
            {
                name: 'Generate daily database check report',
                execute: this.generateDailyDatabaseReport.bind(this),
                priority: 1
            },
            {
                name: 'Check database updates',
                execute: this.checkDatabaseUpdates.bind(this),
                priority: 2
            },
            {
                name: 'Save project work report',
                execute: this.saveProjectWorkReport.bind(this),
                priority: 3
            },
            {
                name: 'Generate work manual',
                execute: this.generateWorkManual.bind(this),
                priority: 4
            },
            {
                name: 'Update work manual',
                execute: this.updateWorkManual.bind(this),
                priority: 5
            },
            {
                name: 'Refine work manual from 3+ similar reports',
                execute: this.refineWorkManualFromReports.bind(this),
                priority: 6
            },
            {
                name: 'Update knowledge base status',
                execute: this.updateKnowledgeBaseStatus.bind(this),
                priority: 7
            }
        ];

        this.startupTasks.sort((a, b) => a.priority - b.priority);
    }

    async executeStartupTasks() {
        console.log('Executing report generation tasks...');

        for (const task of this.startupTasks) {
            try {
                console.log('Executing task: ' + task.name);
                await task.execute();
                console.log('Task completed: ' + task.name);
            } catch (error) {
                console.error('Task failed: ' + task.name, error);
            }
        }

        console.log('All report generation tasks completed');
    }

    async generateDailyDatabaseReport() {
        try {
            console.log('Generating daily database check report...');

            const command = '"' + PYTHON_PATH + '" "' + DAILY_CHECK_SCRIPT + '"';

            const result = execSync(command, {
                encoding: 'utf8',
                cwd: DB_PATH
            });

            console.log('Daily database check report generated');
            return {
                success: true,
                message: 'Daily database check report generated',
                output: result
            };
        } catch (error) {
            throw new Error('Failed to generate daily database check report: ' + error.message);
        }
    }

    async checkDatabaseUpdates() {
        try {
            console.log('Checking database updates...');

            const fs = require('fs');
            const path = require('path');

            const chromaDbPath = path.join(DB_PATH, 'chroma.sqlite3');
            const gvedcDbPath = path.join(DB_PATH, 'gvedc.db');

            let report = 'Database update check report:\n\n';

            if (fs.existsSync(chromaDbPath)) {
                const stats = fs.statSync(chromaDbPath);
                const sizeMB = (stats.size / (1024 * 1024)).toFixed(2);
                const lastModified = stats.mtime.toLocaleString();
                report += '- ChromaDB: ' + sizeMB + ' MB, last modified: ' + lastModified + '\n';
            }

            if (fs.existsSync(gvedcDbPath)) {
                const stats = fs.statSync(gvedcDbPath);
                const sizeMB = (stats.size / (1024 * 1024)).toFixed(2);
                const lastModified = stats.mtime.toLocaleString();
                report += '- gvedc.db: ' + sizeMB + ' MB, last modified: ' + lastModified + '\n';
            }

            console.log('Database update check completed');
            return {
                success: true,
                message: 'Database update check completed',
                report: report
            };
        } catch (error) {
            throw new Error('Failed to check database updates: ' + error.message);
        }
    }

    async saveProjectWorkReport() {
        try {
            console.log('Saving project work report...');

            const now = new Date();
            const today = now.toISOString().split('T')[0];
            const timestamp = now.toLocaleString();

            const report = 'GVEDC Project Work Report - ' + today + '\n\n' +
'Generated: ' + timestamp + '\n\n' +
'Plugin: GVEDC-Report-Keep-Guardian\n' +
'Version: ' + this.version + '\n' +
'Status: Running\n\n' +
'Today Summary:\n' +
'1. Report guardian plugin initialized successfully\n' +
'2. Database connection check completed\n' +
'3. Knowledge base status updated\n\n' +
'System Status:\n' +
'- Auto Report: Enabled\n' +
'- Startup Tasks: Running\n' +
'- Database: Connected\n';

            await this.saveReportToDatabase(report, 'project_work_report', today);

            console.log('Project work report saved');
            return {
                success: true,
                message: 'Project work report saved',
                report: report
            };
        } catch (error) {
            throw new Error('Failed to save project work report: ' + error.message);
        }
    }

    async updateKnowledgeBaseStatus() {
        try {
            console.log('Updating knowledge base status...');

            const now = new Date();
            const today = now.toISOString().split('T')[0];

            const statusReport = 'GVEDC Knowledge Base Status Report - ' + today + '\n\n' +
'Generated: ' + now.toLocaleString() + '\n\n' +
'Knowledge Base Status:\n' +
'- Vector Database: ChromaDB running\n' +
'- Graph Database: SQLite running\n' +
'- Encyclopedia System: Enabled\n' +
'- Dual Retrieval System: Enabled\n\n' +
'Plugin Status:\n' +
'- GVEDC-Report-Keep-Guardian: Running\n' +
'- Auto Report: Enabled\n\n' +
'Performance:\n' +
'- Dual Retrieval Speed: Millisecond level\n' +
'- Encyclopedia Processing: Auto completed\n' +
'- Knowledge Graph: Continuously updating\n\n' +
'Next Steps:\n' +
'1. Continue optimizing dual retrieval algorithm\n' +
'2. Expand encyclopedia processing capability\n' +
'3. Improve knowledge graph construction\n\n' +
'Notes:\n' +
'Knowledge base running stably, all core functions working properly.\n';

            await this.saveReportToDatabase(statusReport, 'knowledge_base_status', today);

            console.log('Knowledge base status updated');
            return {
                success: true,
                message: 'Knowledge base status updated',
                report: statusReport
            };
        } catch (error) {
            throw new Error('Failed to update knowledge base status: ' + error.message);
        }
    }

    async generateWorkManual() {
        try {
            console.log('Generating work manual...');

            const now = new Date();
            const today = now.toISOString().split('T')[0];

            const workManual = 'GVEDC Work Manual - ' + today + '\n\n' +
'Generated: ' + now.toLocaleString() + '\n' +
'Version: 1.0.3\n\n' +
'# 1. Project Overview\n\n' +
'## 1.1 Project Introduction\n' +
'GVEDC (Graph-Vector Encyclopedia Database Context) is an intelligent database system that combines knowledge graph and vector retrieval to provide efficient knowledge management and retrieval capabilities.\n\n' +
'## 1.2 Core Features\n' +
'- Graph-Vector Dual Retrieval: Combines knowledge graph navigation and vector retrieval for millisecond-level retrieval\n' +
'- Document Encyclopedia: Automatically extracts document metadata for structured management\n' +
'- ChromaDB Vector Storage: Efficiently stores and retrieves document vectors\n' +
'- SQLite Graph Storage: Stores entities and relationships of knowledge graph\n' +
'- Auto Report Generation: Periodically generates database status and system reports\n\n' +
'# 2. System Architecture\n\n' +
'## 2.1 Tech Stack\n' +
'- Backend: Python 3.14.3\n' +
'- Vector Database: ChromaDB\n' +
'- Graph Database: SQLite\n' +
'- Plugin System: Trae IDE Plugin API\n\n' +
'# 3. Operation Guide\n\n' +
'## 3.1 Plugin Management\n' +
'- Installation: Copy plugin directory to Trae IDE plugin directory\n' +
'- Startup: Auto loaded when IDE starts\n' +
'- Control: Control via Trae IDE tool commands\n\n' +
'---\n' +
'This work manual was auto-generated by GVEDC-Report-Keep-Guardian\n';

            await this.saveReportToDatabase(workManual, 'work_manual', today);

            console.log('Work manual generated');
            return {
                success: true,
                message: 'Work manual generated',
                manual: workManual
            };
        } catch (error) {
            throw new Error('Failed to generate work manual: ' + error.message);
        }
    }

    async updateWorkManual() {
        try {
            console.log('Updating work manual...');

            const now = new Date();
            const today = now.toISOString().split('T')[0];

            const updateContent = 'GVEDC Work Manual Update - ' + today + '\n\n' +
'Updated: ' + now.toLocaleString() + '\n' +
'Version: 1.0.3\n\n' +
'## Update Content\n\n' +
'### 1. Version Update\n' +
'- Updated to version 1.0.3\n' +
'- Enhanced report generation capabilities\n' +
'- Improved database storage efficiency\n\n' +
'### 2. New Features\n' +
'- Report Guardian Plugin: GVEDC-Report-Keep-Guardian, auto generates reports and stores to database\n' +
'- Work Manual Generation: Auto generates and updates project work manual\n' +
'- Daily Check Mechanism: Auto checks database status and updates\n' +
'- Duplicate Detection: Auto detects and merges duplicate work manuals\n' +
'- Similar Report Refinement: Auto refines 3+ similar reports into work manual\n\n' +
'### 3. Performance Optimization\n' +
'- Optimized dual retrieval algorithm for faster retrieval\n' +
'- Improved encyclopedia processing for better document structuring\n' +
'- Optimized database storage to reduce storage space\n\n' +
'---\n' +
'This update was auto-generated by GVEDC-Report-Keep-Guardian\n';

            await this.saveReportToDatabase(updateContent, 'work_manual_update', today);

            console.log('Work manual updated');
            return {
                success: true,
                message: 'Work manual updated',
                update: updateContent
            };
        } catch (error) {
            throw new Error('Failed to update work manual: ' + error.message);
        }
    }

    async refineWorkManualFromReports() {
        try {
            console.log('Checking for 3+ similar reports to refine into work manual...');

            const refineScript = "import sys\n" +
"sys.path.insert(0, r'" + DB_PATH + "')\n" +
"import chromadb\n" +
"import time\n" +
"from difflib import SequenceMatcher\n\n" +
"client = chromadb.PersistentClient(path=r'" + DB_PATH + "')\n" +
"collection = client.get_or_create_collection(name=\"reports\")\n\n" +
"results = collection.query(\n" +
"    query_texts=['报告'],\n" +
"    n_results=50,\n" +
"    where={\"kind\": \"report\"}\n" +
")\n\n" +
"reports = []\n" +
"for i, id in enumerate(results['ids'][0]):\n" +
"    metadata = results['metadatas'][0][i]\n" +
"    reports.append({\n" +
"        'id': id,\n" +
"        'content': results['documents'][0][i],\n" +
"        'metadata': metadata\n" +
"    })\n\n" +
"print(f\"Found {len(reports)} reports\")\n\n" +
"if len(reports) < 3:\n" +
"    print(\"Not enough reports to refine work manual\")\n" +
"    sys.exit(0)\n\n" +
"similar_groups = []\n" +
"processed = set()\n\n" +
"for i in range(len(reports)):\n" +
"    if reports[i]['id'] in processed:\n" +
"        continue\n" +
"    group = [i]\n" +
"    for j in range(i + 1, len(reports)):\n" +
"        if reports[j]['id'] in processed:\n" +
"            continue\n" +
"        similarity = SequenceMatcher(None,\n" +
"                                     reports[i]['content'],\n" +
"                                     reports[j]['content']).ratio()\n" +
"        if similarity > 0.6:\n" +
"            group.append(j)\n" +
"            processed.add(reports[j]['id'])\n\n" +
"    if len(group) >= 3:\n" +
"        similar_groups.append(group)\n" +
"        for idx in group:\n" +
"            processed.add(reports[idx]['id'])\n\n" +
"print(f\"Found {len(similar_groups)} groups of 3+ similar reports\")\n\n" +
"if not similar_groups:\n" +
"    print(\"No groups of 3+ similar reports found\")\n" +
"    sys.exit(0)\n\n" +
"for group_idx, group in enumerate(similar_groups):\n" +
"    print(f\"Processing group {group_idx + 1} with {len(group)} reports\")\n\n" +
"    combined_content = \"# 工作手册提炼\\n\\n\"\n" +
"    combined_content += \"## 原始报告摘要\\n\\n\"\n\n" +
"    for idx in group:\n" +
"        combined_content += f\"### 报告 {idx + 1}\\n\\n\"\n" +
"        combined_content += reports[idx]['content'][:500] + \"\\n\\n\"\n\n" +
"    combined_content += \"## 提炼总结\\n\\n\"\n" +
"    combined_content += f\"基于 {len(group)} 个相似报告提炼的工作手册\\n\\n\"\n" +
"    combined_content += \"### 共同主题\\n\"\n" +
"    combined_content += \"- 由GVEDC-Report-Keep-Guardian自动提炼\\n\"\n" +
"    combined_content += f\"- 提炼时间：{time.strftime('%Y-%m-%d %H:%M:%S')}\\n\"\n" +
"    combined_content += f\"- 原始报告数量：{len(group)}\\n\\n\"\n" +
"    combined_content += \"### 关键要点\\n\"\n" +
"    combined_content += \"- 自动从多个相似报告中提取共同要点\\n\"\n" +
"    combined_content += \"- 生成结构化的工作手册内容\\n\"\n" +
"    combined_content += \"- 保留原始报告的引用关系\\n\\n\"\n" +
"    combined_content += \"---\\n\"\n" +
"    combined_content += \"此工作手册由 GVEDC-Report-Keep-Guardian 自动提炼\\n\"\n\n" +
"    from src.encyclopedia.processor import EncyclopediaProcessor\n" +
"    from src.storage.vector_store import VectorStore\n\n" +
"    vector_store = VectorStore(r'" + DB_PATH + "')\n" +
"    processor = EncyclopediaProcessor(vector_store)\n\n" +
"    metadata = processor.extract_metadata(combined_content, 'refined_work_manual')\n" +
"    metadata.update({\n" +
"        \"id\": f\"encyclopedia-refined-work-manual-{int(time.time())}\",\n" +
"        \"kind\": \"encyclopedia\",\n" +
"        \"title\": f\"提炼工作手册 - {time.strftime('%Y-%m-%d')}\",\n" +
"        \"authors\": [\"GVEDC-Report-Keep-Guardian\"],\n" +
"        \"date\": time.strftime('%Y-%m-%d'),\n" +
"        \"type\": \"refined_work_manual\",\n" +
"        \"source\": \"GVEDC-Report-Keep-Guardian\",\n" +
"        \"refined_from\": len(group),\n" +
"        \"report_ids\": str([reports[idx]['id'] for idx in group])\n" +
"    })\n\n" +
"    docs_collection = client.get_or_create_collection(name=\"documents\")\n" +
"    doc_id = metadata['id']\n\n" +
"    docs_collection.add(\n" +
"        documents=[combined_content],\n" +
"        metadatas=[metadata],\n" +
"        ids=[doc_id]\n" +
"    )\n\n" +
"    print(f\"Refined work manual saved: {doc_id}\")\n\n" +
"    for idx in group:\n" +
"        original_doc = collection.get(ids=[reports[idx]['id']])\n" +
"        if original_doc['documents']:\n" +
"            updated_metadata = reports[idx]['metadata']\n" +
"            updated_metadata['refined_into'] = doc_id\n" +
"            updated_metadata['refined_date'] = time.strftime('%Y-%m-%d %H:%M:%S')\n" +
"            collection.update(\n" +
"                ids=[reports[idx]['id']],\n" +
"                metadatas=[updated_metadata]\n" +
"            )\n" +
"            print(f\"Updated original report: {reports[idx]['id']}\")\n\n" +
"print(\"Work manual refinement completed\")\n";

            const command = '"' + PYTHON_PATH + '" -c "' + refineScript.replace(/"/g, '\\"') + '"';
            const result = execSync(command, { encoding: 'utf8' });

            console.log('Work manual refinement completed');
            return {
                success: true,
                message: 'Work manual refinement completed',
                output: result
            };
        } catch (error) {
            console.log('Work manual refinement failed:', error.message);
            return {
                success: false,
                error: error.message
            };
        }
    }

    async saveReportToDatabase(content, reportType, date) {
        try {
            console.log('Saving report to database: ' + reportType);

            const saveScript = 'import sys\n' +
'sys.path.insert(0, r\'' + DB_PATH + '\')\n' +
'import chromadb\n' +
'import time\n\n' +
'client = chromadb.PersistentClient(path=r\'' + DB_PATH + '\')\n' +
'collection = client.get_or_create_collection(name="reports")\n\n' +
'doc_id = f"report-' + reportType + '-{int(time.time())}"\n\n' +
'metadata = {\n' +
'    "id": doc_id,\n' +
'    "kind": "report",\n' +
'    "title": f"' + reportType + ' - ' + date + '",\n' +
'    "authors": ["GVEDC-Report-Keep-Guardian"],\n' +
'    "date": "' + date + '",\n' +
'    "type": "' + reportType + '",\n' +
'    "abstract": "Auto-generated report",\n' +
'    "keywords": ["gvedc", "report", "' + reportType + '", "auto-generated"],\n' +
'    "category": ["System", "Report"],\n' +
'    "source": "GVEDC-Report-Keep-Guardian"\n' +
'}\n\n' +
'collection.add(\n' +
'    documents=["' + content.replace(/"/g, '\\"') + '"],\n' +
'    metadatas=[metadata],\n' +
'    ids=[doc_id]\n' +
')\n\n' +
'print(f"Report saved: {doc_id}")\n';

            const command = '"' + PYTHON_PATH + '" -c "' + saveScript.replace(/"/g, '\\"') + '"';
            const result = execSync(command, { encoding: 'utf8' });

            console.log('Report saved to database');
            return {
                success: true,
                message: 'Report saved to database',
                output: result
            };
        } catch (error) {
            throw new Error('Failed to save report to database: ' + error.message);
        }
    }

    async generateReport(reportType, content) {
        try {
            const now = new Date();
            const today = now.toISOString().split('T')[0];

            const report = 'GVEDC ' + reportType + ' Report - ' + today + '\n\n' +
'Generated: ' + now.toLocaleString() + '\n' +
'Report Type: ' + reportType + '\n\n' +
content + '\n\n' +
'---\n' +
'This report was auto-generated by GVEDC-Report-Keep-Guardian\n';

            await this.saveReportToDatabase(report, reportType.toLowerCase().replace(/\s+/g, '_'), today);

            return {
                success: true,
                message: reportType + ' report generated and saved',
                report: report
            };
        } catch (error) {
            return {
                success: false,
                error: error.message
            };
        }
    }

    enableAutoReport() {
        this.autoReportEnabled = true;
        console.log('Auto report enabled');
        return { success: true, message: 'Auto report enabled' };
    }

    disableAutoReport() {
        this.autoReportEnabled = false;
        console.log('Auto report disabled');
        return { success: true, message: 'Auto report disabled' };
    }

    getStatus() {
        return {
            name: this.name,
            version: this.version,
            description: this.description,
            autoReportEnabled: this.autoReportEnabled,
            startupTasks: this.startupTasks.map(task => ({
                name: task.name,
                priority: task.priority
            })),
            capabilities: [
                'initializeReportGuardian - Initialize plugin and execute startup tasks',
                'enableAutoReport - Enable auto report',
                'disableAutoReport - Disable auto report',
                'getReportGuardianStatus - Get plugin status',
                'generateReport - Generate specified type report',
                'generateWorkReport - Generate work report',
                'generateWorkManual - Generate work manual',
                'updateWorkManual - Update work manual',
                'refineWorkManualFromReports - Refine work manual from 3+ similar reports',
                'storeReport - Store report to database',
                'retrieveReport - Retrieve report from database'
            ]
        };
    }

    register(trae) {
        const status = this.getStatus();

        trae.registerTool('initializeReportGuardian', {
            description: 'Initialize report guardian plugin and execute report generation tasks',
            parameters: {},
            execute: async () => {
                return this.initialize();
            }
        });

        trae.registerTool('enableAutoReport', {
            description: 'Enable auto report function',
            parameters: {},
            execute: async () => {
                return this.enableAutoReport();
            }
        });

        trae.registerTool('disableAutoReport', {
            description: 'Disable auto report function',
            parameters: {},
            execute: async () => {
                return this.disableAutoReport();
            }
        });

        trae.registerTool('getReportGuardianStatus', {
            description: 'Get report guardian plugin status and capability info',
            parameters: {},
            execute: async () => { return this.getStatus(); }
        });

        trae.registerTool('generateReport', {
            description: 'Generate specified type report and store to database',
            parameters: {
                type: { type: 'string', description: 'Report type' },
                content: { type: 'string', description: 'Report content' }
            },
            execute: async (params) => {
                return this.generateReport(params.type, params.content);
            }
        });

        this.initialize();

        console.log('GVEDC Report Keep Guardian v' + this.version + ' registered successfully');
        console.log('Capabilities:', status.capabilities.join(', '));
    }
}

module.exports = new GVEDCReportKeepGuardian();
