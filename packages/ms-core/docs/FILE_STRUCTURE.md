# .mslab 文件结构设计（MasScholar Project）

🧬 .mslab 实质上是一个 ZIP 压缩包（MIME: application/x-mslab）

```bash
project_name.mslab
└── [解压后是一个文件夹结构]
```

## 📦 总体原则

- 结构灵活清晰（支持 Playground + Block 式组合）

- 数据与分析分离（支持引用外部数据源）

- 适合压缩/同步/协作（可 zip 后上传或 Git 管理）

- 易于 AI 与版本系统解析

- 支持文件加密及签名（防篡改）

## File Structure

```bash
MyProject.mslab/
├── project.xml             # 主描述文件（核心元数据 + 结构）
├── history.xml             # 历史记录文件
├── toc.xml                 # 目录结构文件
├── datasets/
│   └── dataset1.csv        # 原始数据文件（或 JSON 格式）
├── assets/
│   └── chart1.svg          # 图像资源
├── blocks/
│   └── block-001.xml       # 单个分析任务的描述
├── results/
│   └── result-001.csv      # 结果文件
├── attachments/
│   └── attachment-001.pdf  # 附件文件
├── scripts/
│   └── script-001.py       # 自定义脚本
│   └── script-001.ipynb    # 自定义脚本
└── meta/
    └── version.json        # 项目版本信息
    └── config.json         # 项目配置信息
    └── i18n.json           # 国际化信息
    └── theme.json          # 主题信息
```
