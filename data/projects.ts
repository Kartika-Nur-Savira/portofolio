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
  imageSrc?: string;
  demoUrl?: string;
  metrics?: ProjectMetric[];
  workflow?: WorkflowStep[];
  languages?: string[];
  libraries?: string[];
  algorithms?: string[];
  overview: string;
  problem: string;
  goals: string;
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
    id: 'tanitrend-forecasting-ntp',
    title: 'Analisis Tren & Forecasting Nilai Tukar Petani (NTP) Jawa Tengah (TaniTrend)',
    category: 'Forecasting',
    scope: 'ACADEMIC',
    dateRange: '2024 - 2026',
    shortDescription:
      'Analisis deret waktu komprehensif, dekomposisi musiman, dan forecasting Nilai Tukar Petani (NTP) Provinsi Jawa Tengah dengan SARIMAX, Auto ARIMA, dan Holt-Winters terintegrasi dashboard interaktif.',
    tools: ['Python', 'SARIMAX', 'Auto ARIMA', 'Holt-Winters', 'Statsmodels', 'JavaScript'],
    highlight: { value: 'SARIMAX', label: 'BPS Jawa Tengah' },
    imageSrc: '/images/NTP.png',
    demoUrl: 'https://agridata-ntpjateng.vercel.app/',
    githubUrl: 'https://github.com/Kartika-Nur-Savira/TaniTrend',
    featured: true,
    visualType: 'timeseries',
    metrics: [
      { value: 'SARIMAX', label: 'BEST MODEL', subtext: '(0,1,1)(2,0,0)[12]' },
      { value: '2018-2024', label: 'TEMPORAL SPAN', subtext: 'Data BPS Jawa Tengah' },
      { value: '5 Subsektor', label: 'CAKUPAN', subtext: 'Pangan, Hortikultura, Perkebunan' },
      { value: 'Web Dashboard', label: 'DEPLOYMENT', subtext: 'Visualizer Interaktif' },
    ],
    workflow: [
      { step: 1, title: 'Data Compilation', description: 'Ekstraksi & pembersihan time series NTP lintas subsektor dari BPS Provinsi Jawa Tengah.' },
      { step: 2, title: 'Dekomposisi Musiman', description: 'Uji stasioneritas Augmented Dickey-Fuller (ADF) dan dekomposisi tren serta seasonal periodik.' },
      { step: 3, title: 'Model Benchmarking', description: 'Pelatihan dan evaluasi komparatif model SARIMAX, Auto ARIMA, dan Holt-Winters Exponential Smoothing.' },
      { step: 4, title: 'Interactive Dashboard', description: 'Pembuatan antarmuka visualisasi web TaniTrend untuk simulasi prediksi dan pemantauan tren kesejahteraan petani.' },
    ],
    languages: ['Python', 'JavaScript', 'HTML/CSS'],
    libraries: ['Statsmodels', 'Pmdarima', 'Pandas', 'NumPy', 'Matplotlib', 'Chart.js'],
    algorithms: ['SARIMAX(0,1,1)(2,0,0)[12]', 'Auto ARIMA', 'Holt-Winters Seasonal', 'ADF Test'],
    overview:
      'TaniTrend merupakan proyek analisis time series komprehensif untuk memahami dinamika Nilai Tukar Petani (NTP) di Jawa Tengah. NTP adalah rasio indeks harga yang diterima petani (It) terhadap indeks harga yang dibayar petani (Ib), menjadi indikator utama daya beli dan kesejahteraan relatif petani. Proyek ini membandingkan berbagai model deret waktu dan menyajikan proyeksi prediksi masa depan dalam web dashboard interaktif.',
    problem:
      'Fluktuasi harga input produksi pertanian dan ketidakpastian harga panen sering menekan daya beli petani. Diperlukan model peramalan akurat untuk mengidentifikasi pola musiman serta membantu perencanaan kebijakan intervensi pasar yang tepat sasaran.',
    goals:
      'Membangun model peramalan time series yang optimal (SARIMAX) untuk memprediksi tren pergerakan NTP lintas subsektor dan menyediakan antarmuka web dashboard interaktif untuk pemantauan daya beli petani secara berkelanjutan.',
    dataset:
      'Data deret waktu bulanan Nilai Tukar Petani (NTP) gabungan dan 5 subsektor (Tanaman Pangan, Hortikultura, Perkebunan Rakyat, Peternakan, Perikanan) periode 2018–2024 dari Badan Pusat Statistik (BPS) Provinsi Jawa Tengah.',
    methodology:
      'Eksplorasi data berkala, differencing deret waktu untuk mencapai kestasioneran, identifikasi parameter orde autoregresif dan moving average dengan AIC/BIC, serta evaluasi akurasi forecast menggunakan MAE, RMSE, dan MAPE.',
    preprocessing:
      'Pengujian stasioneritas ADF, differencing lag pertama, dekomposisi musiman multiplikatif, dan scaling normalisasi data.',
    modelAlgorithm:
      'Model terbaik yang dipilih adalah SARIMAX(0,1,1)(2,0,0)[12] yang mampu menangkap komponen musiman tahunan siklus panen padi dan hortikultura dengan nilai AIC terendah.',
    results:
      'Model SARIMAX berhasil memproyeksikan tren NTP dengan residual stasioner dan tingkat akurasi tinggi, disajikan langsung pada dashboard web interaktif TaniTrend.',
    keyInsights: [
      'Subsektor Tanaman Pangan memiliki fluktuasi musiman terkuat akibat jadwal panen raya',
      'SARIMAX(0,1,1)(2,0,0)[12] mengungguli ARIMA murni karena memperhitungkan seasonal 12-bulanan',
      'Dashboard interaktif memudahkan stakeholders memantau tren subsektor yang mengalami penurunan daya beli',
    ],
  },
  {
    id: 'indoretail-sales-dashboard',
    title: 'Dashboard Penjualan Retail Indonesia (IndoRetail Analytics)',
    category: 'Data Visualization',
    scope: 'PERSONAL',
    dateRange: '2024 - 2026',
    shortDescription:
      'Dashboard analisis data interaktif berbasis Python & Streamlit untuk eksplorasi penjualan multi-wilayah, profit margin, volume transaksi, dan segmentasi pelanggan ritel Indonesia.',
    tools: ['Python', 'Streamlit', 'Pandas', 'Plotly', 'Excel ETL'],
    highlight: { value: 'Streamlit App', label: 'Retail BI Dashboard' },
    imageSrc: '/images/IndoRetail.png',
    demoUrl: 'https://indoretail.streamlit.app/',
    githubUrl: 'https://github.com/Kartika-Nur-Savira/indoretail',
    featured: true,
    visualType: 'etl',
    metrics: [
      { value: 'Streamlit', label: 'PLATFORM', subtext: 'Interactive Web Dashboard' },
      { value: 'Executive KPIs', label: 'METRIKS', subtext: 'Sales, Profit, Margin, AOV' },
      { value: 'Multi-Filter', label: 'INTERAKTIF', subtext: 'Tahun, Kota, Segmen, Wilayah' },
      { value: 'Time Trends', label: 'ANALISIS', subtext: 'Tren Bulanan & Pola Hari' },
    ],
    workflow: [
      { step: 1, title: 'Data Wrangling', description: 'ETL dataset transaksi ritel: deduplikasi, standarisasi mata uang, dan parsing tanggal.' },
      { step: 2, title: 'KPI Aggregation', description: 'Kalkulasi metrik kunci: Total Penjualan, Profit Margin (%), Transaksi, dan Average Order Value (AOV).' },
      { step: 3, title: 'Interactive Filtering', description: 'Pembangunan filter dinamis multi-kriteria berdasarkan wilayah, segmen pembeli, dan metode pengiriman.' },
      { step: 4, title: 'Visual Storytelling', description: 'Penyajian visualisasi chart interaktif tren waktu dan performa geografis berbasis Plotly.' },
    ],
    languages: ['Python'],
    libraries: ['Streamlit', 'Pandas', 'Plotly Express', 'OpenPyXL', 'NumPy'],
    algorithms: ['ETL Pipeline', 'KPI Aggregation Logic', 'Multi-dimensional Cross Filtering', 'Time Series Binning'],
    overview:
      'Aplikasi analitik bisnis dan dashboard penjualan interaktif yang dibangun dengan Python dan Streamlit. Memungkinkan pemangku kepentingan bisnis ritel mengeksplorasi performa finansial, tren penjualan musiman, dan profitabilitas berdasarkan wilayah dan segmen pelanggan.',
    problem:
      'Data transaksi ritel yang tersimpan dalam spreadsheet kompleks sulit dipahami secara cepat oleh manajemen tanpa visualisasi agregat dan filter waktu nyata.',
    goals:
      'Membangun dashboard business intelligence interaktif menggunakan Python & Streamlit untuk menyajikan metrik KPI eksekutif, analisis profitabilitas multi-wilayah, dan tren penjualan ritel Indonesia.',
    dataset:
      'Data penjualan ritel synthetic_store_indonesia.xlsx yang memuat ribuan baris data pesanan, pelanggan, kategori produk, wilayah kota, dan keuntungan.',
    methodology:
      'Pembersihan data dengan Pandas, desain tata letak UI Streamlit berbasis card KPI eksekutif, serta grafik interaktif Plotly yang merespons pemilihan filter.',
    preprocessing:
      'Normalisasi kolom tanggal, ekstraksi variabel bulan/hari/tahun, pembersihan nilai nol, dan pembuatan metrik turunan profit margin.',
    modelAlgorithm:
      'Logika agregasi analitik bisnis (Groupby multi-level, pivot table kalkulasi AOV, dan distribusi persentase keuntungan).',
    results:
      'Menghasilkan dashboard web responsif dan interaktif yang memudahkan penemuan wawasan bisnis seperti kota paling menguntungkan dan produk terlaris.',
    keyInsights: [
      'Segmentasi pelanggan korporasi menghasilkan Average Order Value (AOV) tertinggi',
      'Filter interaktif memungkinkan drill-down hingga ke tingkat sub-kategori produk spesifik per kota',
    ],
  },
  {
    id: 'brfss-health-classification',
    title: 'Klasifikasi Status Kesehatan dari Faktor Gaya Hidup (Ensemble Learning)',
    category: 'Machine Learning',
    scope: 'PERSONAL',
    dateRange: '2024 - 2026',
    shortDescription:
      'Proyek machine learning yang memprediksi status kesehatan umum (General Health) seseorang hanya menggunakan indikator non-klinis (gaya hidup, kondisi fisik, sosiodemografi) dengan CatBoost & SMOTE.',
    tools: ['Python', 'CatBoost', 'XGBoost', 'Random Forest', 'SMOTE', 'Scikit-learn'],
    highlight: { value: '443K+', label: 'BRFSS Adult Records' },
    imageSrc: '/images/ml.png',
    githubUrl: 'https://github.com/Kartika-Nur-Savira/Machine-Learning-Project',
    featured: true,
    visualType: 'classification',
    metrics: [
      { value: '443K+', label: 'CORE RECORDS', subtext: 'Survei Kesehatan Dewasa CDC' },
      { value: 'CatBoost', label: 'BEST MODEL', subtext: 'Gradient Boosting Classifier' },
      { value: 'SMOTE', label: 'BALANCING', subtext: 'Oversampling Kelas Minoritas' },
      { value: 'F1: 0.89', label: 'EVALUATION', subtext: 'Tingkat Deteksi Berisiko Tinggi' },
    ],
    workflow: [
      { step: 1, title: 'Data Cleaning', description: 'Pembersihan 443.000+ data survei, imputasi median/modus, dan penghapusan anomali.' },
      { step: 2, title: 'Class Balancing', description: 'Penerapan teknik SMOTE untuk menyeimbangkan distribusi status kesehatan minoritas.' },
      { step: 3, title: 'Model Comparison', description: 'Pelatihan komparatif Logistic Regression, Random Forest, XGBoost, dan CatBoost.' },
      { step: 4, title: 'Risk Drivers', description: 'Ekstraksi feature importance indikator gaya hidup penentu status kesehatan.' },
    ],
    languages: ['Python', 'SQL'],
    libraries: ['CatBoost', 'XGBoost', 'Scikit-learn', 'Pandas', 'NumPy', 'Matplotlib'],
    algorithms: ['CatBoost Classifier', 'Random Forest', 'XGBoost', 'SMOTE Oversampling'],
    overview:
      'Menggunakan dataset Behavioral Risk Factor Surveillance System (BRFSS) 2022 dari Centers for Disease Control and Prevention (CDC) dengan lebih dari 443.000 baris data survei untuk memprediksi status kesehatan umum secara akurat tanpa parameter tes laboratorium klinis.',
    problem:
      'Pemeriksaan medis laboratorium lengkap memerlukan biaya dan waktu. Prediksi kesehatan berbasis faktor gaya hidup non-invasif memungkinkan deteksi dini dan intervensi preventif kesehatan masyarakat secara massal.',
    goals:
      'Mengembangkan model prediktif ensemble learning berbasis data survei non-klinis untuk mendeteksi individu berisiko kesehatan buruk secara dini tanpa bergantung pada pemeriksaan laboratorium mahal.',
    dataset:
      'BRFSS 2022 Dataset (CDC): 443.000+ responden dengan 300+ indikator fisik, mental, perilaku merokok/alkohol, aktivitas fisik, BMI, dan demografi.',
    methodology:
      'Feature selection berbasis korelasi dan domain expertise, penanganan ketidakseimbangan kelas dengan SMOTE, normalisasi numerik, dan evaluasi menggunakan metrik F1-score pada kelas rentan.',
    preprocessing:
      'Imputasi missing values, label encoding kategori, scaling fitur kontinu, dan oversampling SMOTE pada data training.',
    modelAlgorithm:
      'CatBoost Classifier dipilih karena efektivitasnya dalam menangani fitur kategorikal berkorelasi tinggi dan menghasilkan AUC-ROC optimal.',
    results:
      'CatBoost menghasilkan F1-score 0.89. Jumlah hari sakit fisik, kesulitan berjalan/mobilitas, dan indeks massa tubuh (BMI) menjadi prediktor paling signifikan.',
    keyInsights: [
      'Jumlah hari sakit fisik per bulan merupakan indikator tunggal terkuat status kesehatan buruk',
      'Kesulitan berjalan berkorelasi tinggi terhadap penurunan kualitas hidup',
      'SMOTE berhasil meningkatkan recall kelas kesehatan buruk sebesar 24%',
    ],
  },
  {
    id: 'deteksi-fraktur-tulang-cnn',
    title: 'Deteksi Fraktur Tulang pada Citra X-Ray Menggunakan CNN & Transfer Learning',
    category: 'Computer Vision',
    scope: 'ACADEMIC',
    dateRange: '2024 - 2026',
    shortDescription:
      'Penerapan Convolutional Neural Network (CNN) dengan arsitektur MobileNetV2 dan teknik transfer learning untuk mengklasifikasikan fraktur tulang pada citra medis X-Ray.',
    tools: ['Python', 'TensorFlow', 'MobileNetV2', 'OpenCV', 'CLAHE', 'Keras'],
    highlight: { value: 'MobileNetV2', label: 'Bone Fracture CV' },
    githubUrl: 'https://github.com/Kartika-Nur-Savira/Deteksi-Fraktur-Tulang-pada-Citra-X-Ray-Menggunakan-Metode-Convolutional-Neural-Network-CNN-',
    featured: true,
    visualType: 'vision',
    metrics: [
      { value: 'MobileNetV2', label: 'ARCHITECTURE', subtext: 'Pretrained ImageNet Backbone' },
      { value: 'CLAHE', label: 'ENHANCEMENT', subtext: 'Adaptive Contrast Histogram' },
      { value: 'X-Ray Citra', label: 'DATASET', subtext: 'Kaggle Bone Fracture CV' },
      { value: 'Augmentasi', label: 'REGULARISASI', subtext: 'Rotasi, Zoom, Horizontal Flip' },
    ],
    workflow: [
      { step: 1, title: 'Preprocessing Citra', description: 'Resize resolusi standar 224x224, konversi grayscale ke RGB, dan normalisasi pixel.' },
      { step: 2, title: 'CLAHE Enhancement', description: 'Peningkatan kontras adaptif lokal untuk memperjelas garis retak pada tulang.' },
      { step: 3, title: 'Transfer Learning', description: 'Fine-tuning arsitektur MobileNetV2 dengan custom dense head, dropout, dan batch normalization.' },
      { step: 4, title: 'Evaluasi Medis', description: 'Pengukuran akurasi, presisi, recall, dan matriks konfusi klasifikasi fraktur vs normal.' },
    ],
    languages: ['Python'],
    libraries: ['TensorFlow', 'Keras', 'OpenCV', 'NumPy', 'Matplotlib', 'Scikit-learn'],
    algorithms: ['MobileNetV2 CNN', 'CLAHE Contrast Equalization', 'Data Augmentation', 'Adam Optimizer'],
    overview:
      'Mengembangkan sistem visi komputer berbantuan deep learning untuk mendeteksi fraktur tulang dari citra radiografi sinar-X. Mengombinasikan teknik peningkatan kontras citra medis (CLAHE) dan transfer learning MobileNetV2 untuk menghasilkan model ringan yang dapat diimplementasikan pada perangkat edge medis.',
    problem:
      'Kelelahan membaca ratusan citra X-Ray harian dan garis retak rambut yang sangat tipis dapat meningkatkan risiko false negative diagnosis fraktur.',
    goals:
      'Membangun sistem visi komputer berbantuan deep learning (MobileNetV2) dengan teknik enhancement citra CLAHE untuk mengotomatisasi deteksi fraktur tulang dari citra radiografi X-Ray secara akurat dan efisien.',
    dataset:
      'Bone Fracture Detection Computer Vision Dataset dari Kaggle berisi ribuan citra X-Ray tulang normal dan fraktur pada berbagai bagian anatomi.',
    methodology:
      'Eksperimen komparatif antara citra baseline mentah vs citra yang di-enhance dengan CLAHE, dilanjutkan pelatihan transfer learning dengan callback early stopping.',
    preprocessing:
      'Adaptive histogram equalization (CLAHE), augmentasi rotasi acak ±15°, zoom 0.1, dan normalisasi nilai pixel [0, 1].',
    modelAlgorithm:
      'MobileNetV2 dengan bobot ImageNet di-freeze pada base layers, ditambahkan GlobalAveragePooling2D, Dropout(0.3), dan Dense classification layer dengan aktivasi Sigmoid.',
    results:
      'Penggunaan CLAHE berhasil meningkatkan kontras garis fraktur secara signifikan dan meningkatkan akurasi klasifikasi dibandingkan citra mentah.',
    keyInsights: [
      'CLAHE mempertahankan detail tepi lokal fraktur tulang lebih baik dibanding histogram equalization standar',
      'MobileNetV2 memberikan trade-off ideal antara ukuran model ringan dan akurasi tinggi',
      'Augmentasi citra penting untuk mencegah overfitting pada dataset citra medis',
    ],
  },
  {
    id: 'sentimen-redenominasi-rupiah',
    title: 'Analisis Sentimen Publik Terhadap Isu Redenominasi Rupiah',
    category: 'NLP & Text Mining',
    scope: 'ACADEMIC',
    dateRange: '2024 - 2026',
    shortDescription:
      'Analisis opini publik pada media sosial terkait wacana redenominasi rupiah menggunakan pipeline NLP: text preprocessing, tokenizing, TF-IDF vectorization, dan klasifikasi sentimen.',
    tools: ['Python', 'NLP', 'NLTK', 'TF-IDF', 'Scikit-learn', 'Pandas'],
    highlight: { value: 'NLP Sentiment', label: 'Opini Publik Medsos' },
    githubUrl: 'https://github.com/Kartika-Nur-Savira/Analisis-Sentimen-Publik-Terhadap-Redenominasi-Rupiah-Oleh-Mentri-Keuangan-Purbaya-Yudi-Sadewa',
    featured: true,
    visualType: 'classification',
    metrics: [
      { value: 'Text Mining', label: 'DOMAIN', subtext: 'Opini Publik Media Sosial' },
      { value: 'TF-IDF', label: 'EKSTRAKSI FITUR', subtext: 'Pembobotan Kata & N-Gram' },
      { value: '3 Kelas', label: 'KLASIFIKASI', subtext: 'Positif, Netral, Negatif' },
      { value: 'NLP Pipeline', label: 'TEKS INDONESIA', subtext: 'Stemming & Normalisasi Slang' },
    ],
    workflow: [
      { step: 1, title: 'Data Scraping', description: 'Pengumpulan data teks opini masyarakat dari media sosial terkait isu redenominasi rupiah.' },
      { step: 2, title: 'Text Preprocessing', description: 'Case folding, pembersihan tanda baca, penghapusan stopwords bahasa Indonesia, dan stemming.' },
      { step: 3, title: 'TF-IDF Vectorization', description: 'Transformasi teks mentah menjadi matriks fitur numerik dengan pembobotan kata relevan.' },
      { step: 4, title: 'Sentiment Modeling', description: 'Pelatihan model classifier dan evaluasi akurasi distribusi opini positif, netral, dan negatif.' },
    ],
    languages: ['Python'],
    libraries: ['Scikit-learn', 'NLTK', 'Sastrawi', 'Pandas', 'NumPy', 'WordCloud', 'Matplotlib'],
    algorithms: ['TF-IDF Vectorizer', 'Multinomial Naive Bayes', 'Support Vector Machine (SVM)', 'Text Normalization'],
    overview:
      'Proyek pemrosesan bahasa alami (Natural Language Processing) untuk menganalisis respons dan polaritas opini publik di media sosial mengenai wacana kebijakan redenominasi rupiah. Mengklasifikasikan aspirasi masyarakat ke dalam sentimen positif, netral, dan negatif.',
    problem:
      'Kebijakan moneter strategis seperti redenominasi kerap menimbulkan kekhawatiran dan salah persepsi (misalnya disalahartikan sebagai sanering). Analisis sentimen membantu pembuat kebijakan memahami kekhawatiran publik.',
    goals:
      'Mengekstraksi opini publik dari media sosial dan mengklasifikasikan polaritas sentimen masyarakat terkait wacana redenominasi rupiah menggunakan pipeline NLP dan algoritma machine learning.',
    dataset:
      'Kumpulan opini dan komentar publik berbahasa Indonesia dari media sosial yang mendiskusikan pernyataan resmi dan isu redenominasi rupiah.',
    preprocessing:
      'Pembersihan mention/URL, penghapusan kata baku/slang tidak relevan, kamus normalisasi singkatan bahasa Indonesia, dan penghapusan kata umum (stopwords).',
    modelAlgorithm:
      'TF-IDF untuk representasi fitur teks dipadukan dengan Multinomial Naive Bayes dan SVM untuk klasifikasi polaritas sentimen.',
    methodology:
      'Pelabelan data sampel, pemisahan data latih-uji 80:20, pelatihan model berbasis representasi unigram dan bigram, serta visualisasi kata dominan dengan WordCloud.',
    results:
      'Berhasil mengidentifikasi porsi sentimen publik: opini positif menyambut penyederhanaan transaksi, sedangkan kekhawatiran negatif didominasi ketakutan akan kenaikan harga pembulatan ke atas.',
    keyInsights: [
      'Kata kunci "inflasi", "harga", dan "pasar" menjadi penggerak utama sentimen kehati-hatian/negatif',
      'Normalisasi bahasa slang Indonesia secara substansial meningkatkan akurasi klasifikasi sentimen',
    ],
  },
  {
    id: 'punk-record-api-security',
    title: 'Implementasi Layanan Keamanan Berbasis REST API (KID Project)',
    category: 'Web Application',
    scope: 'ACADEMIC',
    dateRange: '2024 - 2025',
    shortDescription:
      'Pengembangan simulasi security server berbasis API menggunakan FastAPI dan Python dengan mekanisme request-response authorization, hashing, dan dokumentasi otomatis Swagger UI.',
    tools: ['Python', 'FastAPI', 'Swagger UI', 'JWT', 'Security Server', 'Uvicorn'],
    highlight: { value: 'FastAPI', label: 'Security Server API' },
    githubUrl: 'https://github.com/Kartika-Nur-Savira/Punk_Record-VI_Implementasi_Layanan_Keamanan_Berbasis_API',
    featured: true,
    visualType: 'api',
    metrics: [
      { value: 'FastAPI', label: 'BACKEND', subtext: 'Asynchronous Python Web Framework' },
      { value: 'Swagger UI', label: 'DOKUMENTASI', subtext: 'Interactive OpenAPI Schema' },
      { value: 'Request Guard', label: 'KEAMANAN', subtext: 'Token Validation & Payload Hashing' },
      { value: 'UAS Sem 3', label: 'KID PROJECT', subtext: 'Mata Kuliah Keamanan Data' },
    ],
    workflow: [
      { step: 1, title: 'Arsitektur Endpoint', description: 'Perancangan rute API keamanan dengan schema validation berbasis Pydantic.' },
      { step: 2, title: 'Autentikasi & Otorisasi', description: 'Implementasi token bearer dan verifikasi hak akses pada request header.' },
      { step: 3, title: 'Enkripsi & Hashing', description: 'Penerapan algoritma hashing data sensitif pada pipeline request-response.' },
      { step: 4, title: 'Swagger Integration', description: 'Pengujian endpoint interaktif dan dokumentasi otomatis OpenAPI melalui Swagger UI.' },
    ],
    languages: ['Python'],
    libraries: ['FastAPI', 'Uvicorn', 'Pydantic', 'Passlib', 'PyJWT'],
    algorithms: ['Token Bearer Authentication', 'Payload Hashing', 'Input Sanitization', 'Role-Based Access Control'],
    overview:
      'Proyek UAS mata kuliah Keamanan Informasi dan Data (KID) yang mensimulasikan arsitektur security server berbasis REST API menggunakan FastAPI. Menunjukkan implementasi nyata dari pertahanan API terhadap akses tanpa izin, sanitasi input, dan validasi data terstruktur.',
    problem:
      'API tanpa lapisan keamanan yang tepat rentan terhadap kebocoran data, serangan injeksi, dan akses endpoint ilegal.',
    goals:
      'Mensimulasikan arsitektur backend REST API yang aman dengan menerapkan autentikasi berbasis token JWT, validasi skema ketat Pydantic, enkripsi payload, dan dokumentasi otomatis OpenAPI Swagger UI.',
    dataset:
      'Simulasi transaksi payload data kredensial dan data record rahasia (PunkRecord Server).',
    methodology:
      'Desain arsitektur mikroservis terisolasi, pembuatan middleware verifikasi token, validasi tipe data ketat dengan Pydantic models, dan uji coba payload.',
    preprocessing:
      'Pembersihan input request, sanitasi parameter URL, dan enkripsi field sensitif.',
    modelAlgorithm:
      'Mekanisme verifikasi signature token dan autentikasi bertingkat sebelum payload diteruskan ke lapisan database.',
    results:
      'Layanan API keamanan berhasil beroperasi secara stabil dengan waktu respons sangat cepat (<25ms) dan terdokumentasi rapi di Swagger UI.',
    keyInsights: [
      'Pydantic secara otomatis memfilter request yang tidak sesuai skema sebelum mencapai business logic',
      'Dokumentasi otomatis Swagger UI mempercepat kolaborasi dan debugging integrasi sistem',
    ],
  },
  
];
