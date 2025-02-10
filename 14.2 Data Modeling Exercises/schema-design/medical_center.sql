-- Drop existing databases
DROP DATABASE IF EXISTS medical_center_db;

-- Create the database
CREATE DATABASE medical_center_db;

\c medical_center_db

-- Medical Center Table
CREATE TABLE medical_center (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  address TEXT UNIQUE NOT NULL
);

-- Doctors Table
CREATE TABLE doctors (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  specialty TEXT,
  medical_center_id INT NOT NULL,
  FOREIGN KEY (medical_center_id) REFERENCES medical_center(id)
);

-- Patients Table
CREATE TABLE patients (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  date_of_birth DATE NOT NULL,
  address TEXT
);

-- Diseases Table
CREATE TABLE diseases (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT
);

-- Doctor-Patient Visits Table 
CREATE TABLE doctor_patient_visits (
  doctor_id INT NOT NULL,
  patient_id INT NOT NULL,
  visit_date DATE NOT NULL,
  PRIMARY KEY (doctor_id, patient_id, visit_date),
  FOREIGN KEY (doctor_id) REFERENCES doctors(id),
  FOREIGN KEY (patient_id) REFERENCES patients(id)
);

-- Disease Diagnosis Table 
CREATE TABLE disease_diagnosis (
  patient_id INT NOT NULL,
  disease_id INT NOT NULL,
  visit_date DATE NOT NULL,
  doctor_id INT NOT NULL,
  PRIMARY KEY (patient_id, disease_id, visit_date),
  FOREIGN KEY (patient_id) REFERENCES patients(id),
  FOREIGN KEY (disease_id) REFERENCES diseases(id),
  FOREIGN KEY (doctor_id, patient_id, visit_date) REFERENCES doctor_patient_visits(doctor_id, patient_id, visit_date)
);




-- Inserting a medical center
INSERT INTO medical_center (name, address)
VALUES ('City Health Medical Center', '123 Health St, Health City');

-- Inserting doctors into the system
INSERT INTO doctors (name, specialty, medical_center_id)
VALUES
  ('Dr. John Smith', 'Cardiologist', 1),
  ('Dr. Sarah Johnson', 'Neurologist', 1);

-- Inserting patients into the system
INSERT INTO patients (name, date_of_birth, address)
VALUES
  ('Alice Williams', '1985-03-10', '456 Maple Ave'),
  ('Bob Brown', '1990-07-22', '789 Oak St');

-- Inserting some diseases
INSERT INTO diseases (name, description)
VALUES
  ('Hypertension', 'A condition where the blood pressure is consistently too high'),
  ('Parkinson''s Disease', 'A neurodegenerative disorder that affects movement');

-- Inserting visit records for patients
INSERT INTO doctor_patient_visits (doctor_id, patient_id, visit_date)
VALUES
  (1, 1, '2025-02-01'),  -- Dr. John Smith saw Alice Williams on 2025-02-01
  (2, 2, '2025-02-02');  -- Dr. Sarah Johnson saw Bob Brown on 2025-02-02

-- Inserting disease diagnoses for patients
INSERT INTO disease_diagnosis (patient_id, disease_id, visit_date, doctor_id)
VALUES
  (1, 1, '2025-02-01', 1),  -- Alice Williams diagnosed with Hypertension during her visit to Dr. John Smith
  (2, 2, '2025-02-02', 2);  -- Bob Brown diagnosed with Parkinson's Disease during his visit to Dr. Sarah Johnson




-- Get Alice Williams' disease diagnosis
SELECT p.name AS patient_name, d.name AS disease_name, pd.visit_date, doc.name AS doctor_name
FROM disease_diagnosis dd
JOIN patients p ON dd.patient_id = p.id
JOIN diseases d ON dd.disease_id = d.id
JOIN doctor_patient_visits pd ON dd.visit_date = pd.visit_date AND dd.patient_id = pd.patient_id AND dd.doctor_id = pd.doctor_id
JOIN doctors doc ON dd.doctor_id = doc.id
WHERE p.name = 'Alice Williams' AND d.name = 'Hypertension';

-- Get Dr. Sarah Johnson's visit record for Bob Brown
SELECT p.name AS patient_name, doc.name AS doctor_name, pd.visit_date
FROM doctor_patient_visits pd
JOIN patients p ON pd.patient_id = p.id
JOIN doctors doc ON pd.doctor_id = doc.id
WHERE doc.name = 'Dr. Sarah Johnson' AND p.name = 'Bob Brown';
