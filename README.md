# MaScholar

> 半途而废比较浪费这两年的研究和思考  
> 2025.08.01

MasScholar 是一款专为 教学实验室、科研团队与跨学科项目 打造的统计分析与协作平台。
集成桌面级应用体验与云端协作能力，旨在成为 SPSS® 和 SAS® 在教学与探索性数据分析场景下的现代交互的可替代品。

## Quick Start For Developers

```bash
pnpm i
pnpm dev:app
```

## Structure

```bash
├── apps/
  └── app                 # Client App
  └── web                 # Portal / Blog / Docs / Manager
├── crates/
  └── ms-language-env     # R / Python
  └── ms-simulation       # Simulation
  └── ms-statistics       # Statistics
├── packages/
  └── ms-agent            # Ai Agent
  └── ms-chart            # Chart
  └── ms-core             # Framework Core for Electron App
  └── ms-datasource       # Data Source e.g. SQLite, MySQL, PostgreSQL, etc.
  └── ms-i18n             # Internationalization
  └── ms-ui               # Ui Component for Electron App / Web App
├── vender/
  └── something third party
├── package.json
├── pnpm-workspace.yaml
├── README.md
├── turbo.json
```

## 算法模块

| 分类模块              | 子模块/功能方向（用户常见问题）                                               |
| --------------------- | ----------------------------------------------------------------------------- |
| **1. 描述统计**       | [ ] 数据清洗、[ ]频数、[ ]均值、[ ]中位数、[ ]标准差                          |
| **2. 推论统计**       | [ ]假设检验、[ ]t 检验、[ ]卡方检验、[ ]方差分析（ANOVA）、[ ]置信区间        |
| **3. 回归分析**       | [ ]线性回归、[ ]逻辑回归、[ ]多元回归、[ ]逐步回归、[ ]残差分析               |
| **4. 方差模型**       | [ ]单因子/多因子方差分析、[ ]重复测量、[ ]混合设计                            |
| **5. 非参数方法**     | [ ]秩和检验、[ ]Mann-Whitney U、[ ]Wilcoxon 检验                              |
| **6. 多重比较**       | [ ]Bonferroni、[ ]Tukey HSD、[ ]Scheffe 等                                    |
| **7. 生存分析**       | [ ]Kaplan-Meier、[ ]Cox 回归、[ ]Log-rank 检验                                |
| **8. 多变量分析**     | [ ]主成分分析（PCA）、[ ]因子分析、[ ]判别分析、[ ]聚类分析                   |
| **9. 贝叶斯分析**     | [ ]贝叶斯回归、[ ]贝叶斯更新、[ ]贝叶斯因子检验                               |
| **10. 模型构建/模拟** | [ ]自定义模型、[ ]最小二乘、[ ]多层线性模型、[ ]混合效应模型、[ ]蒙特卡洛模拟 |

## Comparisions

<a href="https://star-history.com/#MasScholar/MasScholar&liquibase/liquibase&flyway/flyway&dbeaver/cloudbeaver&Date">
  <img src="https://api.star-history.com/svg?repos=MasScholar/MasScholar,jasp-stats/jasp-desktop,jamovi/jamovi&type=Date" alt="Star History Chart">
</a>

## 声明

- 本项目遵循 [AGPL-3.0](https://www.gnu.org/licenses/agpl-3.0.html) 开源协议。
- SAS® is registered trademarks of The SAS Institute Inc.
- SPSS® is registered trademarks of IBM Corp.
- MATLAB® is a registered trademark of The MathWorks, Inc.
- R® is a registered trademark of R Core Team.
- Python® is a registered trademark of the Python Software Foundation.
