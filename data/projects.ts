export interface ProjectTool {
  name: string;
}

export interface ProjectMetric {
  value: string;
  label: string;
  subtext: string;
}

export interface WorkflowStep {
  step: number;
  title: string;
  description: string;
}

export interface Project {
  id: string;
  title: string;
  category: string;
  scope?: string;
  dateRange?: string;
  shortDescription: string;
  tools: string[];
  highlight?: { value: string; label: string };
  metrics?: ProjectMetric[];
  workflow?: WorkflowStep[];
  languages?: string[];
  libraries?: string[];
  algorithms?: string[];
  overview: string;
  problem: string;
  dataset: string;
  methodology: string;
  preprocessing: string;
  modelAlgorithm: string;
  results: string;
  keyInsights: string[];
  visualType: 'classification' | 'etl' | 'clustering' | 'vision' | 'timeseries' | 'api';
  githubUrl?: string;
  featured: boolean;
}

export const projects: Project[] = [
  {
    id: 'brfss-health-prediction',
    title: 'Predicting General Health from Lifestyle & Health Indicators',
    category: 'Machine Learning',
    scope: 'PERSONAL',
    dateRange: 'Agu 2026 - Agu 2026',
    shortDescription:
      'A machine learning project using the BRFSS 2022 dataset to predict self-reported general health based on lifestyle, physical health, mental health, and demographic-related indicators.',
    tools: ['Python', 'Pandas', 'Scikit-learn', 'XGBoost', 'CatBoost', 'SMOTE'],
    highlight: { value: '443K+', label: 'Records Analyzed' },
    metrics: [
      { value: '443K+', label: 'CORE SCOPE', subtext: 'US Adult Health Records' },
      { value: '2022-2024', label: 'TARGET ERA', subtext: 'BRFSS Surveillance Data' },
      { value: 'Python + CatBoost', label: 'PRIMARY STACK', subtext: 'ML & Imbalance Handling' },
      { value: 'Health Risk', label: 'ANALYSIS FOCUS', subtext: 'Predictive Lifestyle Indicators' },
    ],
    workflow: [
      { step: 1, title: 'Data Imputation', description: 'Handled missing values with median/mode & correlation filtering.' },
      { step: 2, title: 'Class Balancing', description: 'Applied SMOTE oversampling for minority health categories.' },
      { step: 3, title: 'Model Comparison', description: 'Evaluated Logistic Regression, Random Forest, XGBoost & CatBoost.' },
      { step: 4, title: 'Predictive Scoring', description: 'Extracted key risk drivers (physical health days, BMI, mobility).' },
    ],
    languages: ['Python', 'SQL'],
    libraries: ['Pandas', 'NumPy', 'Scikit-learn', 'CatBoost', 'XGBoost', 'Matplotlib'],
    algorithms: ['SMOTE Imbalance', 'Logistic Regression', 'Random Forest', 'CatBoost Classifier'],
    overview:
      'The BRFSS (Behavioral Risk Factor Surveillance System) 2022 dataset contains over 443,000 survey records from US adults, capturing a broad range of health behaviors, chronic conditions, and demographic information. The goal was to build a classification model predicting self-reported general health status.',
    problem:
      'Self-reported general health is a strong predictor of mortality and healthcare utilization. Building accurate predictive models from survey data enables earlier identification of at-risk individuals and potential public health interventions.',
    dataset:
      'BRFSS 2022 dataset — 443,000+ records, 300+ features covering physical health, mental health, lifestyle behaviors, demographics, and chronic disease indicators.',
    methodology:
      'Data was preprocessed with feature selection, missing value imputation, and class imbalance handling using SMOTE. Multiple classifiers were trained and compared: Logistic Regression, Random Forest, XGBoost, and CatBoost.',
    preprocessing:
      'Handled missing values with median/mode imputation, encoded categorical features, applied SMOTE for class imbalance, and used correlation analysis + feature importance for feature selection.',
    modelAlgorithm:
      'Compared Logistic Regression baseline against ensemble methods (Random Forest, XGBoost, CatBoost). Final model selected based on F1-score on the minority class.',
    results:
      'CatBoost achieved the best overall performance. Physical health days, difficulty walking, BMI, mental health days, and removed teeth were among the strongest predictors of self-reported health.',
    keyInsights: [
      'Physical health days missed is the single strongest predictor',
      'Difficulty walking strongly correlates with poor self-reported health',
      'BMI shows non-linear relationship with health outcomes',
      'Mental health indicators contribute meaningfully to prediction',
      'SMOTE significantly improved minority class recall',
    ],
    visualType: 'classification',
    githubUrl: 'https://github.com/Kartika-Nur-Savira',
    featured: true,
  },
  {
    id: 'data-warehouse-etl',
    title: 'Sales Data Warehouse & ETL Pipeline',
    category: 'Data Warehouse',
    scope: 'PERSONAL',
    dateRange: 'Mei 2026 - Jun 2026',
    shortDescription:
      'Designed an ETL workflow that transforms transactional data into a structured star-schema data warehouse for analytical querying.',
    tools: ['PostgreSQL', 'SQL', 'ETL', 'Star Schema', 'pgAdmin'],
    highlight: { value: 'Star Schema', label: 'Data Warehouse' },
    metrics: [
      { value: 'Star Schema', label: 'CORE SCOPE', subtext: 'Fact & Dimension Architecture' },
      { value: '2023-2024', label: 'TARGET ERA', subtext: 'Transactional Sales Data' },
      { value: 'PostgreSQL + SQL', label: 'PRIMARY STACK', subtext: 'ETL & Dimensional Modeling' },
      { value: 'Analytics', label: 'ANALYSIS FOCUS', subtext: 'BI & Time-Series Querying' },
    ],
    workflow: [
      { step: 1, title: 'Raw Extraction', description: 'Ingested transactional sales logs from OLTP source systems.' },
      { step: 2, title: 'Data Cleaning', description: 'Deduplicated records, standardized dates & normalized currency.' },
      { step: 3, title: 'Star Modeling', description: 'Modeled fact_sales table and dimension tables (customer, product, date).' },
      { step: 4, title: 'Warehouse Load', description: 'Loaded structured data into PostgreSQL DW with SCD Type 2 tracking.' },
    ],
    languages: ['SQL', 'Python'],
    libraries: ['pgAdmin', 'PostgreSQL', 'psycopg2', 'Pandas'],
    algorithms: ['Kimball Dimensional Modeling', 'Star Schema', 'SCD Type 2', 'Indexing Optimization'],
    overview:
      'Built a complete data warehouse solution from raw transactional sales data. The project covers extraction from source systems, transformation into analytical structures, and loading into a PostgreSQL warehouse following star schema design principles.',
    problem:
      'Transactional databases are optimized for writes and operational queries, not analytics. A data warehouse with proper dimensional modeling enables fast, flexible business intelligence queries.',
    dataset:
      'Simulated sales transactional data including orders, customers, products, territories, and returns across multiple time periods.',
    methodology:
      'Followed the Kimball methodology for dimensional modeling. Designed fact and dimension tables, built ETL scripts to extract, clean, transform, and load data, and validated referential integrity.',
    preprocessing:
      'Data cleaning included deduplication, null handling, date standardization, and currency normalization. SCD Type 2 applied for slowly changing dimensions.',
    modelAlgorithm:
      'Star schema with one fact_sales table, one fact_returns table, and dimension tables for customer, product, territory, and date.',
    results:
      'Analytical queries running significantly faster against the warehouse compared to the source OLTP system. Enabled time-series revenue analysis, regional performance comparisons, and product category breakdowns.',
    keyInsights: [
      'Star schema reduced query complexity significantly',
      'Proper indexing on date and key columns improved query performance',
      'ETL pipeline successfully handles incremental loads',
      'dim_date enables flexible time-based aggregations',
    ],
    visualType: 'etl',
    githubUrl: 'https://github.com/Kartika-Nur-Savira',
    featured: true,
  },
  {
    id: 'regional-clustering',
    title: 'Regional Clustering & Data Exploration',
    category: 'Data Mining',
    scope: 'ACADEMIC',
    dateRange: 'Jul 2026 - Jul 2026',
    shortDescription:
      'Explored regional characteristics using clustering techniques to identify groups of areas with similar socioeconomic patterns.',
    tools: ['Python', 'Scikit-learn', 'Pandas', 'Matplotlib', 'Seaborn'],
    highlight: { value: '3 Algorithms', label: 'Clustering Comparison' },
    metrics: [
      { value: 'Multi-Region', label: 'CORE SCOPE', subtext: 'Socioeconomic Indicators' },
      { value: '2023-2024', label: 'TARGET ERA', subtext: 'Regional Data Exploration' },
      { value: 'Python + Scikit', label: 'PRIMARY STACK', subtext: 'K-Means & DBSCAN & PCA' },
      { value: 'Pattern ID', label: 'ANALYSIS FOCUS', subtext: 'Natural Regional Groupings' },
    ],
    workflow: [
      { step: 1, title: 'PCA Filtering', description: 'Compressing dense socioeconomic features into principal components.' },
      { step: 2, title: 'Graph Construction', description: 'Building structural network nodes based on feature similarity.' },
      { step: 3, title: 'Community Isolation', description: 'Running community detection & clustering algorithms.' },
      { step: 4, title: 'Regression Analysis', description: 'Applying MLR pipelines across derived clusters.' },
    ],
    languages: ['Python'],
    libraries: ['NetworkX', 'Scikit-learn', 'Pandas', 'Statsmodels', 'Matplotlib', 'Seaborn'],
    algorithms: ['Principal Component Analysis (PCA)', 'K-Means Clustering', 'DBSCAN', 'Hierarchical Clustering'],
    overview:
      'Applied multiple unsupervised learning techniques to identify natural groupings in regional data. Used dimensionality reduction and cluster evaluation metrics to determine optimal clustering solutions.',
    problem:
      'Understanding regional patterns requires unsupervised approaches that can identify natural groupings without predefined labels, enabling targeted policy or resource allocation.',
    dataset:
      'Regional socioeconomic and demographic indicators across multiple areas.',
    methodology:
      'Applied K-Means, Hierarchical Clustering, and DBSCAN. Used PCA for dimensionality reduction and visualization. Evaluated clusters using silhouette score, Davies-Bouldin index, and elbow method.',
    preprocessing:
      'Standardized features using StandardScaler, handled outliers, applied PCA to reduce dimensions while retaining variance.',
    modelAlgorithm:
      'K-Means with k selection via elbow method and silhouette analysis. Hierarchical clustering with Ward linkage for comparison. DBSCAN for density-based outlier detection.',
    results:
      'Identified distinct regional clusters with meaningful socioeconomic differences between groups.',
    keyInsights: [
      'PCA revealed key variance dimensions in the dataset',
      'K-Means and hierarchical clustering showed consistent groupings',
      'DBSCAN identified outlier regions not fitting main clusters',
    ],
    visualType: 'clustering',
    githubUrl: 'https://github.com/Kartika-Nur-Savira',
    featured: true,
  },
  {
    id: 'computer-vision',
    title: 'Image Processing & Computer Vision',
    category: 'Computer Vision',
    scope: 'PERSONAL',
    dateRange: 'Apr 2026 - Mei 2026',
    shortDescription:
      'Explored image enhancement, segmentation, and classification techniques through multiple computer vision experiments.',
    tools: ['Python', 'OpenCV', 'MobileNetV2', 'TensorFlow', 'Keras'],
    highlight: { value: 'Transfer Learning', label: 'MobileNetV2' },
    metrics: [
      { value: 'CV Pipeline', label: 'CORE SCOPE', subtext: 'Enhancement to Classification' },
      { value: '2024', label: 'TARGET ERA', subtext: 'Medical & General Imagery' },
      { value: 'OpenCV + MobileNet', label: 'PRIMARY STACK', subtext: 'CLAHE & Transfer Learning' },
      { value: 'Segmentation', label: 'ANALYSIS FOCUS', subtext: 'Otsu & GrabCut & CNN' },
    ],
    workflow: [
      { step: 1, title: 'Image Enhancement', description: 'Gaussian noise reduction & histogram equalization.' },
      { step: 2, title: 'CLAHE Equalization', description: 'Applied adaptive contrast enhancement for low-contrast images.' },
      { step: 3, title: 'Otsu Segmentation', description: 'Extracted foreground objects via thresholding & GrabCut.' },
      { step: 4, title: 'Transfer Learning', description: 'Fine-tuned MobileNetV2 pretrained deep neural network.' },
    ],
    languages: ['Python'],
    libraries: ['OpenCV', 'TensorFlow', 'Keras', 'NumPy', 'Matplotlib'],
    algorithms: ['CLAHE Contrast Enhancement', 'Otsu Thresholding', 'GrabCut Segmentation', 'MobileNetV2 CNN'],
    overview:
      'A series of computer vision experiments covering the image processing pipeline from enhancement through segmentation to classification using both classical and deep learning approaches.',
    problem:
      'Understanding the full image processing pipeline — from raw image enhancement to automated classification — is essential for real-world computer vision applications.',
    dataset:
      'Multiple image datasets used across experiments for enhancement, segmentation, and classification tasks.',
    methodology:
      'Systematic exploration of image enhancement (histogram equalization, CLAHE), edge detection, segmentation (Otsu thresholding, GrabCut), and classification (MobileNetV2 with transfer learning).',
    preprocessing:
      'Applied Gaussian blur for noise reduction, histogram equalization for contrast enhancement, CLAHE for adaptive contrast, resized images to model input specifications.',
    modelAlgorithm:
      'Classical methods: Otsu thresholding, GrabCut. Deep learning: MobileNetV2 with ImageNet pretrained weights, fine-tuned on target dataset with data augmentation.',
    results:
      'CLAHE outperformed standard histogram equalization for low-contrast images. MobileNetV2 transfer learning achieved strong classification accuracy with limited training data.',
    keyInsights: [
      'CLAHE preserves local contrast better than global histogram equalization',
      'GrabCut achieves better segmentation than simple thresholding for complex images',
      'Transfer learning enables strong performance with small datasets',
    ],
    visualType: 'vision',
    githubUrl: 'https://github.com/Kartika-Nur-Savira',
    featured: true,
  },
  {
    id: 'time-series-forecasting',
    title: 'Time Series Forecasting & Predictive Analytics',
    category: 'Forecasting (Tabular)',
    scope: 'PERSONAL',
    dateRange: 'Mar 2026 - Apr 2026',
    shortDescription:
      'Built and compared several forecasting approaches to understand temporal patterns and predict future observations.',
    tools: ['Python', 'statsmodels', 'pmdarima', 'Pandas', 'Matplotlib'],
    highlight: { value: 'Auto ARIMA', label: 'Time Series' },
    metrics: [
      { value: 'Temporal', label: 'CORE SCOPE', subtext: 'Trend & Seasonal Patterns' },
      { value: '2024', label: 'TARGET ERA', subtext: 'Time Series Observations' },
      { value: 'Auto ARIMA', label: 'PRIMARY STACK', subtext: 'statsmodels & pmdarima' },
      { value: 'Forecasting', label: 'ANALYSIS FOCUS', subtext: 'MAE & RMSE & MAPE Metrics' },
    ],
    workflow: [
      { step: 1, title: 'Stationarity Test', description: 'Executed ADF stationarity testing & seasonal decomposition.' },
      { step: 2, title: 'Differencing', description: 'Transformed non-stationary series into stationary residuals.' },
      { step: 3, title: 'SARIMA Training', description: 'Trained Holt-Winters, SARIMA, & Auto ARIMA models.' },
      { step: 4, title: 'Validation', description: 'Evaluated MAE, RMSE, & MAPE metrics for forecast horizon.' },
    ],
    languages: ['Python'],
    libraries: ['statsmodels', 'pmdarima', 'Pandas', 'Matplotlib', 'Seaborn'],
    algorithms: ['ADF Stationarity Test', 'Holt-Winters Exponential Smoothing', 'SARIMA', 'Auto ARIMA'],
    overview:
      'Comprehensive time series analysis and forecasting project comparing classical statistical methods against more advanced seasonal decomposition approaches.',
    problem:
      'Accurate time series forecasting is critical for inventory management, demand planning, and resource allocation. Choosing the right model requires systematic comparison across methods.',
    dataset:
      'Time series data with seasonal and trend components. Multiple frequencies and patterns explored.',
    methodology:
      'Exploratory time series analysis (decomposition, stationarity tests), followed by implementation and comparison of Moving Average, Holt-Winters, SARIMA, and Auto ARIMA.',
    preprocessing:
      'Checked stationarity (ADF test), applied differencing where needed, identified seasonal periods, decomposed into trend/seasonal/residual components.',
    modelAlgorithm:
      'Moving Average as baseline. Holt-Winters for trend+seasonal data. SARIMA with manual parameter selection. Auto ARIMA for automated parameter optimization.',
    results:
      'Auto ARIMA and SARIMA outperformed simpler methods on most datasets. Holt-Winters competitive for data with clear seasonality.',
    keyInsights: [
      'Seasonal decomposition critical before model selection',
      'Auto ARIMA reduces parameter selection time significantly',
      'Holt-Winters excels at clear seasonal patterns',
    ],
    visualType: 'timeseries',
    githubUrl: 'https://github.com/Kartika-Nur-Savira',
    featured: true,
  },
  {
    id: 'secure-rest-api',
    title: 'Secure REST API Service',
    category: 'Web Application',
    scope: 'PERSONAL',
    dateRange: 'Jan 2026 - Feb 2026',
    shortDescription:
      'Developed a REST API with authentication and authorization mechanisms using FastAPI and JWT.',
    tools: ['Python', 'FastAPI', 'JWT', 'PostgreSQL'],
    highlight: { value: 'FastAPI + JWT', label: 'Secure REST API' },
    metrics: [
      { value: 'REST API', label: 'CORE SCOPE', subtext: 'Authentication & Authorization' },
      { value: '2024', label: 'TARGET ERA', subtext: 'Backend Security Service' },
      { value: 'FastAPI + JWT', label: 'PRIMARY STACK', subtext: 'Pydantic & PostgreSQL' },
      { value: 'Security', label: 'ANALYSIS FOCUS', subtext: 'Role-Based Control & Hashing' },
    ],
    workflow: [
      { step: 1, title: 'OpenAPI Design', description: 'Designed Pydantic request/response schemas & routes.' },
      { step: 2, title: 'JWT Token Auth', description: 'Implemented access & refresh token rotation with bcrypt.' },
      { step: 3, title: 'RBAC Middleware', description: 'Enforced role-based access control across endpoints.' },
      { step: 4, title: 'PostgreSQL DW', description: 'Parameterized queries for SQL injection prevention.' },
    ],
    languages: ['Python', 'SQL'],
    libraries: ['FastAPI', 'Pydantic', 'PyJWT', 'psycopg2', 'SQLAlchemy'],
    algorithms: ['JWT HS256 Token Auth', 'Bcrypt Hashing', 'Role-Based Access Control', 'Parameterized Queries'],
    overview:
      'Built a production-ready REST API implementing secure authentication and role-based authorization using FastAPI, JWT tokens, and PostgreSQL as the backing database.',
    problem:
      'Unsecured APIs are a major attack vector. Implementing proper authentication, authorization, and input validation is essential for any real-world backend service.',
    dataset: 'N/A — Backend service project, no external dataset required.',
    methodology:
      'Designed RESTful endpoints following OpenAPI specification. Implemented JWT-based authentication flow with access and refresh tokens.',
    preprocessing: 'Input validation using Pydantic schemas. Password hashing with bcrypt.',
    modelAlgorithm:
      'JWT authentication with HS256 signing. Role-based middleware for endpoint authorization.',
    results:
      'Fully functional secure API with authentication, authorization, and proper error handling.',
    keyInsights: [
      'JWT refresh token rotation improves security',
      'Pydantic validation prevents malformed input',
      'Parameterized queries essential for SQL injection prevention',
    ],
    visualType: 'api',
    githubUrl: 'https://github.com/Kartika-Nur-Savira',
    featured: false,
  },
];
