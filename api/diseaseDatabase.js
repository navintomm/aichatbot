// ===========================
// DISEASE KNOWLEDGE BASE
// ===========================
// Authentic database mapping symptoms to diseases with clinically-informed weights

const diseaseDatabase = [
    {
        id: 1,
        name: "Common Cold",
        category: "Respiratory Infection",
        description: "A viral infection of the upper respiratory tract. Typically mild and self-limiting.",
        symptoms: {
            "Cough": 0.8,
            "Sore throat": 0.9,
            "Nasal congestion": 0.95,
            "Fatigue": 0.6,
            "Headache": 0.5,
            "Body aches": 0.4,
            "Phlegm production": 0.7
        },
        severity: "mild",
        recommendations: [
            "Rest and stay hydrated",
            "Over-the-counter cold medications",
            "Warm fluids and throat lozenges",
            "Consult doctor if symptoms persist beyond 10 days"
        ]
    },
    {
        id: 2,
        name: "Influenza (Flu)",
        category: "Respiratory Infection",
        description: "A contagious respiratory illness caused by influenza viruses. Often presents with sudden onset of high fever and systemic symptoms.",
        symptoms: {
            "Fever": 0.95,
            "Cough": 0.8,
            "Sore throat": 0.7,
            "Fatigue": 0.95,
            "Body aches": 0.95,
            "Headache": 0.85,
            "Chills": 0.9,
            "Nasal congestion": 0.6,
            "Sweating": 0.7
        },
        severity: "moderate",
        recommendations: [
            "Rest and isolate from others",
            "Antiviral medications if prescribed early",
            "Stay hydrated and manage fever",
            "Seek immediate care if breathing difficulty occurs"
        ]
    },
    {
        id: 3,
        name: "COVID-19",
        category: "Respiratory Infection",
        description: "Coronavirus disease caused by SARS-CoV-2. Known for a wide range of symptoms including loss of taste/smell.",
        symptoms: {
            "Fever": 0.85,
            "Cough": 0.9,
            "Fatigue": 0.9,
            "Shortness of breath": 0.85,
            "Body aches": 0.7,
            "Headache": 0.65,
            "Sore throat": 0.6,
            "Loss of taste/smell": 1.0,
            "Diarrhea": 0.3,
            "Nausea": 0.25
        },
        severity: "moderate-severe",
        recommendations: [
            "Get tested immediately",
            "Isolate from others",
            "Monitor oxygen levels",
            "Seek emergency care if severe breathing difficulty"
        ]
    },
    {
        id: 4,
        name: "Gastroenteritis (Stomach Flu)",
        category: "Gastrointestinal",
        description: "Inflammation of the stomach and intestines, usually caused by a virus or bacteria.",
        symptoms: {
            "Nausea": 0.95,
            "Vomiting": 0.9,
            "Diarrhea": 0.95,
            "Abdominal pain": 0.85,
            "Fever": 0.5,
            "Headache": 0.4,
            "Fatigue": 0.7,
            "Loss of appetite": 0.8
        },
        severity: "mild-moderate",
        recommendations: [
            "Stay hydrated with electrolyte solutions",
            "Eat bland foods (BRAT diet)",
            "Rest and avoid solid foods initially",
            "Seek care if dehydration symptoms appear"
        ]
    },
    {
        id: 5,
        name: "Migraine",
        category: "Neurological",
        description: "A neurological condition that can cause multiple symptoms, most notably intense, debilitating headaches.",
        symptoms: {
            "Headache": 1.0,
            "Nausea": 0.8,
            "Vomiting": 0.5,
            "Blurred vision": 0.75,
            "Dizziness": 0.6,
            "Light sensitivity": 0.95,
            "Fatigue": 0.6
        },
        severity: "moderate",
        recommendations: [
            "Rest in a dark, quiet room",
            "Apply cold compress to forehead",
            "Take prescribed migraine medication",
            "Identify and avoid triggers"
        ]
    },
    {
        id: 6,
        name: "Asthma Attack",
        category: "Respiratory",
        description: "Acute narrowing of airways causing breathing difficulty, often triggered by allergens or exercise.",
        symptoms: {
            "Shortness of breath": 1.0,
            "Wheezing": 0.95,
            "Cough": 0.8,
            "Chest pain": 0.6,
            "Fatigue": 0.5
        },
        severity: "moderate-severe",
        recommendations: [
            "Use rescue inhaler immediately",
            "Sit upright and stay calm",
            "Seek emergency care if no improvement",
            "Avoid known triggers"
        ]
    },
    {
        id: 7,
        name: "Allergic Reaction",
        category: "Allergic/Immune",
        description: "The body's immune system reacting to a normally harmless substance.",
        symptoms: {
            "Rash": 0.85,
            "Itching": 0.95,
            "Hives": 0.9,
            "Swelling": 0.8,
            "Nasal congestion": 0.6,
            "Skin redness": 0.8,
            "Shortness of breath": 0.5
        },
        severity: "mild-severe",
        recommendations: [
            "Take antihistamine medication",
            "Avoid allergen exposure",
            "Apply cool compress to affected areas",
            "Seek emergency care if breathing difficulty or severe swelling"
        ]
    },
    {
        id: 8,
        name: "Myocardial Infarction (Heart Attack)",
        category: "Cardiovascular",
        description: "A serious medical emergency where the supply of blood to the heart is suddenly blocked.",
        symptoms: {
            "Chest pain": 1.0,
            "Radiating pain": 1.0,
            "Shortness of breath": 0.85,
            "Sweating": 0.9,
            "Nausea": 0.6,
            "Fainting": 0.7,
            "Palpitations": 0.7,
            "Anxiety": 0.6
        },
        severity: "severe",
        recommendations: [
            "CALL EMERGENCY SERVICES (911) IMMEDIATELY",
            "Chew an aspirin if not allergic",
            "Sit or lie down and try to stay calm",
            "Unlock front door for paramedics"
        ]
    },
    {
        id: 9,
        name: "Stroke",
        category: "Neurological",
        description: "A medical emergency caused by an interruption of blood supply to the brain.",
        symptoms: {
            "Facial droop": 1.0,
            "Arm weakness": 1.0,
            "Speech difficulty": 1.0,
            "Dizziness": 0.8,
            "Confusion": 0.9,
            "Blurred vision": 0.85,
            "Headache": 0.6,
            "Numbness": 0.9
        },
        severity: "severe",
        recommendations: [
            "CALL EMERGENCY SERVICES (911) IMMEDIATELY",
            "Note the time when symptoms first started",
            "Do not give the person food or drink",
            "Stay with the person until help arrives"
        ]
    },
    {
        id: 10,
        name: "Appendicitis",
        category: "Gastrointestinal",
        description: "Inflammation of the appendix. Characterized by pain shifting to the right lower abdomen.",
        symptoms: {
            "Abdominal pain": 1.0,
            "Nausea": 0.8,
            "Vomiting": 0.7,
            "Fever": 0.65,
            "Loss of appetite": 0.95,
            "Constipation": 0.4,
            "Diarrhea": 0.3
        },
        severity: "moderate-severe",
        recommendations: [
            "Consult a healthcare professional immediately",
            "Do not eat, drink, or use laxatives",
            "Seek emergency care if pain is severe",
            "Lying down with knees drawn to chest may help"
        ]
    },
    {
        id: 11,
        name: "Meningitis",
        category: "Neurological Infection",
        description: "Inflammation of the protective membranes covering the brain and spinal cord.",
        symptoms: {
            "Headache": 0.95,
            "Stiff neck": 1.0,
            "Fever": 0.95,
            "Light sensitivity": 1.0,
            "Confusion": 0.9,
            "Nausea": 0.7,
            "Vomiting": 0.6,
            "Rash": 0.5
        },
        severity: "severe",
        recommendations: [
            "SEEK EMERGENCY MEDICAL CARE IMMEDIATELY",
            "Meningitis can be life-threatening",
            "Note use of recent antibiotics",
            "Identify anyone else who might have been exposed"
        ]
    },
    {
        id: 12,
        name: "Strep Throat",
        category: "Respiratory Infection",
        description: "Bacterial infection that causes inflammation and pain in the throat.",
        symptoms: {
            "Sore throat": 1.0,
            "Fever": 0.9,
            "Difficulty swallowing": 0.85,
            "Headache": 0.6,
            "Nausea": 0.5,
            "Body aches": 0.5,
            "Fatigue": 0.6
        },
        severity: "moderate",
        recommendations: [
            "Consult doctor for strep test",
            "Antibiotics are required if bacterial",
            "Gargle with warm salt water",
            "Stay hydrated and rest"
        ]
    },
    {
        id: 13,
        name: "Anxiety Disorder",
        category: "Mental Health",
        description: "Excessive worry and physical symptoms of anxiety, often presenting as panic attacks.",
        symptoms: {
            "Palpitations": 0.9,
            "Dizziness": 0.8,
            "Tremors": 0.85,
            "Shortness of breath": 0.8,
            "Sweating": 0.7,
            "Nausea": 0.6,
            "Fatigue": 0.65,
            "Chest pain": 0.6
        },
        severity: "mild-moderate",
        recommendations: [
            "Practice deep breathing exercises",
            "Consider cognitive behavioral therapy",
            "Consult mental health professional",
            "Differentiate from heart issues if chest pain is new"
        ]
    },
    {
        id: 14,
        name: "Dehydration",
        category: "General/Systemic",
        description: "Condition caused by the excessive loss of water from the body.",
        symptoms: {
            "Thirst": 1.0,
            "Dizziness": 0.9,
            "Fatigue": 0.9,
            "Headache": 0.75,
            "Dry skin": 0.8,
            "Confusion": 0.6,
            "Palpitations": 0.5
        },
        severity: "mild-moderate",
        recommendations: [
            "Drink water or electrolyte solutions immediately",
            "Rest in cool environment",
            "Seek medical care if severe or persistent",
            "Monitor urine color (should be light yellow)"
        ]
    },
    {
        id: 15,
        name: "Pneumonia",
        category: "Respiratory Infection",
        description: "Infection that inflames the air sacs in one or both lungs.",
        symptoms: {
            "Cough": 0.95,
            "Fever": 0.9,
            "Shortness of breath": 0.95,
            "Chest pain": 0.85,
            "Phlegm production": 0.9,
            "Chills": 0.8,
            "Fatigue": 0.85,
            "Sweating": 0.7
        },
        severity: "moderate-severe",
        recommendations: [
            "Seek medical attention immediately",
            "Antibiotics if bacterial",
            "Use humidifier and stay hydrated",
            "Monitor breathing and oxygen levels"
        ]
    },
    {
        id: 16,
        name: "Bronchitis",
        category: "Respiratory",
        description: "Inflammation of the lining of your bronchial tubes.",
        symptoms: {
            "Cough": 1.0,
            "Phlegm production": 0.95,
            "Shortness of breath": 0.75,
            "Chest pain": 0.65,
            "Fatigue": 0.7,
            "Wheezing": 0.8,
            "Sore throat": 0.5
        },
        severity: "moderate",
        recommendations: [
            "Rest and drink plenty of fluids",
            "Use humidifier",
            "Avoid smoke and other irritants",
            "Consult doctor if cough persists beyond 3 weeks"
        ]
    },
    {
        id: 17,
        name: "Sinusitis",
        category: "Respiratory",
        description: "Inflammation or swelling of the tissue lining the sinuses.",
        symptoms: {
            "Nasal congestion": 1.0,
            "Headache": 0.9,
            "Phlegm production": 0.85,
            "Cough": 0.7,
            "Sore throat": 0.6,
            "Fatigue": 0.6,
            "Fever": 0.5
        },
        severity: "mild-moderate",
        recommendations: [
            "Use saline nasal spray",
            "Apply warm compress to face",
            "Stay hydrated",
            "Decongestants as directed"
        ]
    },
    {
        id: 18,
        name: "Acid Reflux (GERD)",
        category: "Gastrointestinal",
        description: "Chronic digestive disease where stomach acid flows back into your food pipe.",
        symptoms: {
            "Heartburn": 1.0,
            "Chest pain": 0.75,
            "Difficulty swallowing": 0.8,
            "Sore throat": 0.6,
            "Cough": 0.5,
            "Bloating": 0.5
        },
        severity: "mild-moderate",
        recommendations: [
            "Avoid trigger foods (spicy, fatty)",
            "Eat smaller meals",
            "Avoid lying down after meals",
            "Maintain a healthy weight"
        ]
    },
    {
        id: 19,
        name: "Vertigo",
        category: "Neurological",
        description: "A sensation of spinning or loss of balance, often related to inner ear problems.",
        symptoms: {
            "Dizziness": 1.0,
            "Loss of balance": 0.95,
            "Nausea": 0.85,
            "Vomiting": 0.7,
            "Blurred vision": 0.65,
            "Headache": 0.5
        },
        severity: "moderate",
        recommendations: [
            "Sit or lie down immediately during an attack",
            "Avoid sudden movements",
            "Consult doctor for Epley maneuver or medication",
            "Avoid driving during episodes"
        ]
    },
    {
        id: 20,
        name: "Anemia",
        category: "Hematological",
        description: "A condition in which you lack enough healthy red blood cells to carry adequate oxygen to the body's tissues.",
        symptoms: {
            "Fatigue": 1.0,
            "Dizziness": 0.85,
            "Shortness of breath": 0.8,
            "Palpitations": 0.75,
            "Headache": 0.7,
            "Chest pain": 0.6,
            "Numbness": 0.4
        },
        severity: "mild-moderate",
        recommendations: [
            "Consult doctor for blood tests",
            "Increase iron-rich foods in diet",
            "Vitamin supplements as recommended",
            "Determine the underlying cause"
        ]
    },
    {
        id: 21,
        name: "UTI (Urinary Tract Infection)",
        category: "Urinary",
        description: "An infection in any part of your urinary system.",
        symptoms: {
            "Abdominal pain": 0.85,
            "Back pain": 0.75,
            "Fever": 0.7,
            "Fatigue": 0.75,
            "Confusion": 0.5,
            "Nausea": 0.4
        },
        severity: "moderate",
        recommendations: [
            "Drink plenty of water",
            "Antibiotics are required to clear infection",
            "Avoid irritants (caffeine, alcohol)",
            "Seek care immediately if high fever and back pain occur"
        ]
    },
    {
        id: 22,
        name: "Diabetes Complication (Hyperglycemia)",
        category: "Endocrine",
        description: "Excessively high blood glucose levels, potentially leading to DKA.",
        symptoms: {
            "Thirst": 1.0,
            "Fatigue": 0.9,
            "Blurred vision": 0.85,
            "Confusion": 0.7,
            "Nausea": 0.6,
            "Abdominal pain": 0.5,
            "Weight loss": 0.8
        },
        severity: "moderate-severe",
        recommendations: [
            "Check blood glucose levels immediately",
            "Follow your diabetes management plan",
            "Stay hydrated (water)",
            "Seek emergency care if confusion or vomiting occurs"
        ]
    },
    {
        id: 23,
        name: "Pulmonary Embolism",
        category: "Cardiovascular/Respiratory",
        description: "A blockage in one of the pulmonary arteries in your lungs, usually by a blood clot.",
        symptoms: {
            "Shortness of breath": 1.0,
            "Chest pain": 0.95,
            "Coughing blood": 0.9,
            "Palpitations": 0.8,
            "Sweating": 0.75,
            "Dizziness": 0.7,
            "Fainting": 0.8
        },
        severity: "severe",
        recommendations: [
            "CALL EMERGENCY SERVICES (911) IMMEDIATELY",
            "Do not drive yourself",
            "A blood clot in the lung is life-threatening",
            "Keep movement to a minimum while waiting"
        ]
    },
    {
        id: 24,
        name: "Fibromyalgia",
        category: "Musculoskeletal",
        description: "A disorder characterized by widespread musculoskeletal pain accompanied by fatigue, sleep, memory and mood issues.",
        symptoms: {
            "Body aches": 1.0,
            "Fatigue": 1.0,
            "Muscle stiffness": 0.9,
            "Headache": 0.8,
            "Joint pain": 0.8,
            "Numbness": 0.6,
            "Tingling sensation": 0.7
        },
        severity: "moderate",
        recommendations: [
            "Establish a regular sleep routine",
            "Gentle regular exercise (walking, swimming)",
            "Stress reduction techniques",
            "Consult a specialist for pain management"
        ]
    },
    {
        id: 25,
        name: "Dengue Fever",
        category: "Systemic Infection",
        description: "A mosquito-borne viral infection. Also known as 'breakbone fever' due to severe body aches.",
        symptoms: {
            "Fever": 1.0,
            "Headache": 0.9,
            "Joint pain": 1.0,
            "Body aches": 1.0,
            "Rash": 0.85,
            "Nausea": 0.8,
            "Vomiting": 0.7,
            "Sweating": 0.6
        },
        severity: "moderate-severe",
        recommendations: [
            "Maintain high fluid intake",
            "Take paracetamol for fever/pain (avoid aspirin/ibuprofen)",
            "Consult doctor for blood count monitoring",
            "Seek emergency care if bleeding symptoms occur"
        ]
    }
];

module.exports = diseaseDatabase;
