 <!DOCTYPE html>
<html lang="sw">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ripoti Hitilafu - NYONI MEDIA</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link rel="stylesheet" href="style.css">
    <style>
        .error-report-page {
            min-height: 80vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 40px 20px;
        }
        
        .error-container {
            max-width: 700px;
            width: 100%;
            background: rgba(30, 41, 59, 0.8);
            border-radius: 20px;
            padding: 40px;
            border: 2px solid #3b82f6;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        }
        
        .error-header {
            text-align: center;
            margin-bottom: 30px;
        }
        
        .error-header i {
            font-size: 3.5rem;
            color: #3b82f6;
            margin-bottom: 20px;
        }
        
        .error-header h2 {
            font-size: 2.2rem;
            margin-bottom: 10px;
            background: linear-gradient(to right, #3b82f6, #8b5cf6);
            -webkit-background-clip: text;
            background-clip: text;
            color: transparent;
        }
        
        .error-form {
            display: flex;
            flex-direction: column;
            gap: 20px;
        }
        
        .form-group {
            display: flex;
            flex-direction: column;
            gap: 8px;
        }
        
        .form-group label {
            font-weight: 600;
            color: #cbd5e1;
        }
        
        .form-control {
            padding: 15px;
            border-radius: 10px;
            border: 2px solid #334155;
            background: #1e293b;
            color: white;
            font-size: 1rem;
            transition: border 0.3s;
        }
        
        .form-control:focus {
            outline: none;
            border-color: #3b82f6;
        }
        
        textarea.form-control {
            min-height: 150px;
            resize: vertical;
        }
        
        .submit-btn {
            padding: 17px;
            background: linear-gradient(to right, #3b82f6, #2563eb);
            color: white;
            border: none;
            border-radius: 10px;
            font-size: 1.1rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s;
            margin-top: 10px;
        }
        
        .submit-btn:hover {
            transform: translateY(-3px);
            box-shadow: 0 6px 20px rgba(37, 99, 235, 0.4);
        }
        
        .contact-methods {
            margin-top: 30px;
            padding-top: 25px;
            border-top: 1px solid #334155;
        }
        
        .contact-methods h3 {
            margin-bottom: 20px;
            color: #cbd5e1;
        }
        
        .contact-options {
            display: flex;
            flex-wrap: wrap;
            gap: 20px;
            justify-content: center;
        }
        
        .contact-option {
            display: flex;
            align-items: center;
            gap: 12px;
            padding: 15px 25px;
            background: rgba(51, 65, 85, 0.5);
            border-radius: 10px;
            color: #cbd5e1;
            text-decoration: none;
            transition: all 0.3s;
        }
        
        .contact-option:hover {
            background: #3b82f6;
            color: white;
            transform: translateY(-3px);
        }
        
        .back-home {
            text-align: center;
            margin-top: 30px;
        }
        
        .back-home a {
            color: #60a5fa;
            text-decoration: none;
        }
        
        @media (max-width: 768px) {
            .error-container {
                padding: 30px 20px;
            }
            
            .contact-options {
                flex-direction: column;
            }
        }
    </style>
</head>
<body>
    <header>
        <div class="container">
            <div class="logo-area">
                <i class="fas fa-bug logo-icon"></i>
                <h1>RIPOTI <span>HITILAFU</span></h1>
            </div>
            <p class="tagline">Tusaidie kuboresha huduma yetu</p>
        </div>
    </header>
    
    <main class="error-report-page">
        <div class="container">
            <div class="error-container">
                <div class="error-header">
                    <i class="fas fa-exclamation-circle"></i>
                    <h2>Ripoti Hitilafu</h2>
                    <p>Tafadhali eleza hitilafu uliyoiona kwa undani</p>
                </div>
                
                <form class="error-form" id="errorReportForm">
                    <div class="form-group">
                        <label for="name">Jina lako</label>
                        <input type="text" id="name" class="form-control" placeholder="Weka jina lako" required>
                    </div>
                    
                    <div class="form-group">
                        <label for="email">Barua pepe yako</label>
                        <input type="email" id="email" class="form-control" placeholder="weka@baruapepe.com" required>
                    </div>
                    
                    <div class="form-group">
                        <label for="errorType">Aina ya Hitilafu</label>
                        <select id="errorType" class="form-control" required>
                            <option value="">Chagua aina ya hitilafu</option>
                            <option value="technical">Hitilafu ya kiufundi</option>
                            <option value="content">Hitilafu ya maudhui</option>
                            <option value="ui">Hitilafu ya muonekano</option>
                            <option value="other">Nyingine</option>
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <label for="description">Maelezo ya Hitilafu</label>
                        <textarea id="description" class="form-control" placeholder="Eleza hitilafu uliyoiona kwa kina..." required></textarea>
                    </div>
                    
                    <div class="form-group">
                        <label for="pageUrl">URL ya Ukurasa (ikiwa inatumika)</label>
                        <input type="url" id="pageUrl" class="form-control" placeholder="https://nyoni-media.com/ukurasa">
                    </div>
                    
                    <button type="submit" class="submit-btn">
                        <i class="fas fa-paper-plane"></i> Tumia Ripoti
                    </button>
                </form>
                
                <div class="contact-methods">
                    <h3>Njia Mbadala za Kuwasiliana</h3>
                    <div class="contact-options">
                        <a href="tel:+255763111390" class="contact-option">
                            <i class="fas fa-phone-alt"></i>
                            <div>
                                <strong>Piga Simu</strong>
                                <p>+255 763 111 390</p>
                            </div>
                        </a>
                        
                        <a href="https://whatsapp.com/channel/0029VbAffhD2ZjChG9DX922r" target="_blank" class="contact-option">
                            <i class="fab fa-whatsapp"></i>
                            <div>
                                <strong>WhatsApp Channel</strong>
                                <p>Jiunge na channel yetu</p>
                            </div>
                        </a>
                        
                        <a href="https://github.com/Raheem-cm/RAHEEM-XMD-3/fork" target="_blank" class="contact-option">
                            <i class="fab fa-github"></i>
                            <div>
                                <strong>GitHub Repo</strong>
                                <p>Angalia msimbo wetu</p>
                            </div>
                        </a>
                    </div>
                </div>
                
                <div class="back-home">
                    <a href="index.html"><i class="fas fa-arrow-left"></i> Rudi Nyumbani</a>
                </div>
            </div>
        </div>
    </main>
    
    <footer>
        <div class="container">
            <div class="copyright">
                <p>&copy; <span id="currentYear"></span> NYONI MEDIA. Tovuti ya kutafuta filamu.</p>
            </div>
        </div>
    </footer>
    
    <script>
        // Weka mwaka wa sasa
        document.getElementById('currentYear').textContent = new Date().getFullYear();
        
        // Usimamizi wa fomu
        document.getElementById('errorReportForm').
