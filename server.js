// ===========================
// EXPRESS SERVER
// ===========================
// Backend API for AI Healthcare Assistant

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const DiagnosisEngine = require('./diagnosisEngine');

const rateLimit = require('express-rate-limit');
const morgan = require('morgan');

const app = express();
const PORT = process.env.PORT || 3000;

// Initialize diagnosis engine
const diagnosisEngine = new DiagnosisEngine();

// Middleware
app.use(morgan('dev')); // Request logging
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Rate Limiter
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: {
        success: false,
        error: 'Too many requests from this IP, please try again later.'
    }
});
app.use('/api/', limiter);

// Serve static files
app.use(express.static(__dirname));

// ===========================
// API ROUTES
// ===========================

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({
        status: 'healthy',
        message: 'AI Healthcare Assistant API is running',
        timestamp: new Date().toISOString()
    });
});

// Get all available symptoms
app.get('/api/symptoms', (req, res) => {
    const diseaseDatabase = require('./diseaseDatabase');
    const allSymptoms = new Set();

    diseaseDatabase.forEach(disease => {
        Object.keys(disease.symptoms).forEach(symptom => {
            allSymptoms.add(symptom);
        });
    });

    res.json({
        success: true,
        symptoms: Array.from(allSymptoms).sort(),
        count: allSymptoms.size
    });
});

// Get all diseases
app.get('/api/diseases', (req, res) => {
    const diseaseDatabase = require('./diseaseDatabase');

    const diseases = diseaseDatabase.map(disease => ({
        id: disease.id,
        name: disease.name,
        category: disease.category,
        description: disease.description,
        severity: disease.severity
    }));

    res.json({
        success: true,
        diseases: diseases,
        count: diseases.length
    });
});

// Main diagnosis endpoint
app.post('/api/diagnose', (req, res) => {
    try {
        const { symptoms, duration, severity, additionalInfo } = req.body;

        // Validation
        if (!symptoms || !Array.isArray(symptoms) || symptoms.length === 0) {
            return res.status(400).json({
                success: false,
                error: 'Symptoms array is required and must not be empty'
            });
        }

        if (!duration) {
            return res.status(400).json({
                success: false,
                error: 'Duration is required'
            });
        }

        if (severity === undefined || severity < 1 || severity > 10) {
            return res.status(400).json({
                success: false,
                error: 'Severity must be between 1 and 10'
            });
        }

        // Perform diagnosis
        const result = diagnosisEngine.diagnose(
            symptoms,
            duration,
            severity,
            additionalInfo || ''
        );

        res.json(result);

    } catch (error) {
        console.error('Diagnosis error:', error);
        res.status(500).json({
            success: false,
            error: 'Internal server error during diagnosis',
            message: error.message
        });
    }
});

// Get disease details by ID
app.get('/api/disease/:id', (req, res) => {
    const diseaseDatabase = require('./diseaseDatabase');
    const diseaseId = parseInt(req.params.id);

    const disease = diseaseDatabase.find(d => d.id === diseaseId);

    if (!disease) {
        return res.status(404).json({
            success: false,
            error: 'Disease not found'
        });
    }

    res.json({
        success: true,
        disease: disease
    });
});

// ===========================
// ERROR HANDLING
// ===========================

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        error: 'Endpoint not found'
    });
});

// Global error handler
app.use((err, req, res, next) => {
    console.error('Server error:', err);
    res.status(500).json({
        success: false,
        error: 'Internal server error',
        message: err.message
    });
});

// ===========================
// START SERVER
// ===========================

app.listen(PORT, () => {
    console.log(`
╔════════════════════════════════════════════════════════════╗
║                                                            ║
║   🏥  AI Healthcare Assistant - Backend Server            ║
║                                                            ║
║   Status: Running                                          ║
║   Port: ${PORT}                                              ║
║   URL: http://localhost:${PORT}                              ║
║                                                            ║
║   API Endpoints:                                           ║
║   - POST /api/diagnose      (Main diagnosis)               ║
║   - GET  /api/symptoms      (Get all symptoms)             ║
║   - GET  /api/diseases      (Get all diseases)             ║
║   - GET  /api/disease/:id   (Get disease details)          ║
║   - GET  /api/health        (Health check)                 ║
║                                                            ║
╚════════════════════════════════════════════════════════════╝
    `);
});

module.exports = app;
