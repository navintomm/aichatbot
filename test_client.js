const http = require('http');

function diagnose(symptoms) {
    const data = JSON.stringify({
        symptoms: symptoms,
        duration: "Few Days",
        severity: 5
    });

    const options = {
        hostname: 'localhost',
        port: 3000,
        path: '/api/diagnose',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(data)
        }
    };

    const req = http.request(options, (res) => {
        let body = '';
        res.on('data', (chunk) => body += chunk);
        res.on('end', () => {
            console.log(`\n--- Symptoms: ${symptoms.join(', ')} ---`);
            if (res.statusCode === 200) {
                try {
                    const json = JSON.parse(body);
                    if (json.results && json.results.primaryDiagnoses) {
                        const top = json.results.primaryDiagnoses[0];
                        console.log(`Top Match: ${top ? top.name : 'None'} (${top ? top.confidence.toFixed(1) : 0}%)`);
                        console.log('Top 3 Results:');
                        json.results.primaryDiagnoses.slice(0, 3).forEach(r => {
                            console.log(`- ${r.name}: ${r.confidence.toFixed(1)}%`);
                        });
                    } else {
                        console.log('No diagnoses returned');
                    }
                } catch (e) {
                    console.log('Parse Error:', e);
                    console.log('Body:', body);
                }
            } else {
                console.log('Error:', res.statusCode, body);
            }
        });
    });

    req.on('error', (error) => {
        console.error('Request Error:', error);
    });

    req.write(data);
    req.end();
}

// Run sequence
const s1 = ["Cough"];
const s2 = ["Cough", "Sore throat"];
const s3 = ["Cough", "Sore throat", "Nasal congestion"];
const s4 = ["Cough", "Sore throat", "Nasal congestion", "Fatigue"];

setTimeout(() => diagnose(s1), 500);
setTimeout(() => diagnose(s2), 1500);
setTimeout(() => diagnose(s3), 2500);
setTimeout(() => diagnose(s4), 3500);
