const categories = [
  {
    name: 'Infectious Diseases',
    description:
      'Vector-borne and communicable diseases with high prevalence in sub-Saharan Africa, requiring rapid diagnosis and community-level prevention.',
  },
  {
    name: 'Chronic Conditions',
    description:
      'Long-term metabolic and cardiovascular illnesses that are increasing alongside urbanisation, calling for lifestyle management and regular screening.',
  },
  {
    name: 'Maternal & Child Health',
    description:
      'Conditions that disproportionately affect pregnant people, infants, and young children across the continent.',
  },
  {
    name: 'Public Health Alerts',
    description:
      'Emerging or seasonal health threats that benefit from coordinated surveillance, vaccination, and education.',
  },
];

const topics = [
  {
    title: 'Malaria Prevention & Rapid Treatment',
    summary:
      'Essential guidance on insecticide-treated nets, indoor residual spraying, and prompt ACT treatment to reduce malaria illness and deaths.',
    content: [
      'Malaria transmission remains intense in equatorial Africa, with children under five and pregnant women most at risk. Sleeping under WHO-approved insecticide-treated nets every night and ensuring proper ventilation in sleeping areas significantly cuts mosquito contact.',
      'Community campaigns should combine indoor residual spraying, larval source management, and education on early symptom recognition. Anyone with a fever should receive a rapid diagnostic test within 24 hours. Positive cases require artemisinin-based combination therapy (ACT) dosed according to national guidelines.',
      'Pregnant people benefit from intermittent preventive treatment with sulfadoxine-pyrimethamine (IPTp-SP) after quick antenatal screening. Stock adequate ACTs and rapid tests at primary facilities before rainy seasons, and coordinate with community health workers for follow-up.',
    ].join('\n'),
    tags: ['malaria', 'fever', 'vector control', 'ACT'],
    sources: [
      {
        label: 'WHO Malaria Guidelines 2023',
        url: 'https://www.who.int/publications/i/item/guidelines-for-malaria',
      },
      {
        label: 'Africa CDC Malaria Scorecard',
        url: 'https://africacdc.org/document/africa-malaria-scorecard',
      },
    ],
    category: 'Infectious Diseases',
    estimatedReadTime: 6,
  },
  {
    title: 'HIV Care Continuum & Undetectable = Untransmittable',
    summary:
      'Practical steps for expanding HIV testing, linking clients to ART within seven days, and supporting viral load suppression across communities.',
    content: [
      'Scaling HIV services depends on convenient testing: self-test kits, community outreach, and provider-initiated counselling in all outpatient departments. Once diagnosed, clients should start integrase inhibitor–based ART (e.g., dolutegravir) within one week unless contraindicated.',
      'Retention hinges on differentiated service delivery: multi-month dispensing for stable clients, peer navigators for adolescents, and integrated TB/HIV visits. Track viral load at six months, twelve months, and annually; communicate that undetectable viral load virtually eliminates sexual transmission (U=U).',
      'Address stigma through community champions and integrate PrEP for high-risk negative partners. Ensure stocked commodities by forecasting with national supply chain portals.',
    ].join('\n'),
    tags: ['HIV', 'ART', 'viral load', 'U=U'],
    sources: [
      {
        label: 'UNAIDS Fast-Track Targets',
        url: 'https://www.unaids.org/en/resources/909090',
      },
      {
        label: 'PEPFAR Site-Level Guidance',
        url: 'https://www.state.gov/pepfar/',
      },
    ],
    category: 'Infectious Diseases',
    estimatedReadTime: 7,
  },
  {
    title: 'Tuberculosis Case Finding & DOT Support',
    summary:
      'Guidance on active case finding, GeneXpert testing, and adherence support through directly observed therapy for drug-sensitive TB.',
    content: [
      'Persistent cough (>2 weeks), night sweats, and weight loss should trigger TB screening at every outpatient visit. Collect sputum for GeneXpert MTB/RIF testing to rapidly detect rifampicin resistance and start the appropriate regimen.',
      'Directly observed therapy (DOT) can be facility-based or community-based. Train treatment supporters to watch daily dosing for the first intensive phase (two months) and monitor side effects like hepatitis or neuropathy.',
      'Household contacts require symptom screening and, for young children, preventive therapy. Coordinate TB/HIV co-management, ensuring people living with HIV receive TB preventive therapy once active disease is ruled out.',
    ].join('\n'),
    tags: ['TB', 'DOT', 'GeneXpert', 'cough'],
    sources: [
      {
        label: 'WHO TB Handbook for African Region',
        url: 'https://www.afro.who.int/publications/handbook-tuberculosis',
      },
    ],
    category: 'Infectious Diseases',
    estimatedReadTime: 5,
  },
  {
    title: 'Hypertension (High Blood Pressure) Self-Management',
    summary:
      'Lifestyle counselling, low-cost medication protocols, and community screening approaches for blood pressure control.',
    content: [
      'Noncommunicable diseases account for a rising share of mortality in Africa. Adults over 30 should receive annual blood pressure screening at outpatient visits, pharmacies, or community drives. Readings ≥140/90 mmHg on two separate days confirm hypertension.',
      'Counsel on reducing salt intake, increasing fruits and vegetables, maintaining physical activity, and limiting alcohol. Combine lifestyle support with standardized pharmacologic protocols such as low-dose thiazide + ACE inhibitor combinations when lifestyle changes are insufficient.',
      'Follow-up every three months to titrate medications, check kidney function, and reinforce adherence. Integrate digital reminders or community health worker visits for high-risk clients.',
    ].join('\n'),
    tags: ['hypertension', 'blood pressure', 'cardiovascular', 'self-management'],
    sources: [
      {
        label: 'WHO HEARTS Hypertension Module',
        url: 'https://www.who.int/teams/noncommunicable-diseases/hearts',
      },
    ],
    category: 'Chronic Conditions',
    estimatedReadTime: 4,
  },
  {
    title: 'Type 2 Diabetes Lifestyle & Glucose Monitoring',
    summary:
      'Community-friendly education on diet, exercise, HbA1c targets, and preventing foot complications for people living with diabetes.',
    content: [
      'Rapid urbanisation has increased type 2 diabetes across African cities. Diagnosis typically follows repeated fasting plasma glucose ≥7.0 mmol/L or HbA1c ≥6.5%. Provide structured education on portion control, reducing refined carbohydrates, and incorporating affordable high-fibre staples such as millet or beans.',
      'Encourage at least 150 minutes of moderate activity weekly and integrate peer support groups. Initiate metformin unless contraindicated, then consider sulfonylureas or insulin if targets are not met. Aim for HbA1c ≤7% while avoiding hypoglycaemia.',
      'Screen annually for neuropathy, nephropathy, and retinopathy. Teach daily foot inspections, proper footwear, and immediate care for wounds to prevent amputations.',
    ].join('\n'),
    tags: ['diabetes', 'HbA1c', 'nutrition', 'foot care'],
    sources: [
      {
        label: 'International Diabetes Federation Africa Atlas',
        url: 'https://idf.org/our-network/regions-members/africa.html',
      },
    ],
    category: 'Chronic Conditions',
    estimatedReadTime: 6,
  },
  {
    title: 'Sickle Cell Disease Pain Crisis Management',
    summary:
      'Protocols for rapid assessment, hydration, analgesia, and infection prophylaxis for people living with sickle cell disease.',
    content: [
      'Sickle cell disease is one of the most common inherited disorders in West and Central Africa. Families need education on recognizing vaso-occlusive crises early: sudden bone pain, fever, or swelling. Provide fast-track triage in emergency units to assess vitals, oxygen saturation, and hydration status.',
      'Management includes aggressive hydration (oral or IV), NSAIDs or opioids for severe pain, and oxygen for hypoxia. Screen for triggers such as infection; start empiric antibiotics if fever is present. Hydroxyurea therapy reduces crisis frequency and should be offered to eligible children and adults.',
      'Long-term care involves newborn screening, daily folic acid, penicillin prophylaxis, and vaccination against pneumococcus and meningococcus.',
    ].join('\n'),
    tags: ['sickle cell', 'pain crisis', 'hydroxyurea'],
    sources: [
      {
        label: 'WHO Sickle Cell Disease Strategy',
        url: 'https://www.who.int/initiatives/sickle-cell-disease',
      },
    ],
    category: 'Chronic Conditions',
    estimatedReadTime: 5,
  },
];

module.exports = { categories, topics };

