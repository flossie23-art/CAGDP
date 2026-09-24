export interface Scholarship {
  id: string
  name: string
  provider: string
  description: string
  eligibility: string
  deadline: string
  location: string
  studyLevel: string
  field: string
  applicationUrl: string
  source: string
  status: 'verified' | 'unverified'
}

export const scholarships: Scholarship[] = [
  {
    id: 'nlng',
    name: 'NLNG Scholarship',
    provider: 'Nigeria Liquefied Natural Gas',
    description: 'Annual scholarship scheme for Nigerian students pursuing degrees in science, technology, engineering, and mathematics at recognized Nigerian universities.',
    eligibility: 'Must be a Nigerian citizen, currently in SS2 or SS3, and have excellent academic records.',
    deadline: 'August 2025',
    location: 'Nigeria',
    studyLevel: 'Undergraduate',
    field: 'STEM',
    applicationUrl: 'https://www.nlng.com/scholarship',
    source: 'NLNG Official Website',
    status: 'verified',
  },
  {
    id: 'mtn-foundation',
    name: 'MTN Foundation Scholarship',
    provider: 'MTN Foundation',
    description: 'Scholarship for outstanding Nigerian students in science, technology, engineering, and mathematics disciplines at Nigerian universities.',
    eligibility: 'Must be a Nigerian citizen, currently in SS2 or SS3, and have minimum of 5 credits including Mathematics and English.',
    deadline: 'September 2025',
    location: 'Nigeria',
    studyLevel: 'Undergraduate',
    field: 'STEM',
    applicationUrl: 'https://www.mtnfoundation.org',
    source: 'MTN Foundation Official Website',
    status: 'verified',
  },
  {
    id: 'agbami',
    name: 'Agbami Medical and Engineering Scholarship',
    provider: 'Agbami Fellowship',
    description: 'Scholarship for Nigerian students studying medicine, engineering, and related fields at Nigerian universities.',
    eligibility: 'Must be a Nigerian citizen, admitted to a Nigerian university, and studying medicine or engineering.',
    deadline: 'Ongoing',
    location: 'Nigeria',
    studyLevel: 'Undergraduate',
    field: 'Medicine / Engineering',
    applicationUrl: 'https://www.agbami.org',
    source: 'Agbami Fellowship Official Website',
    status: 'verified',
  },
  {
    id: 'efsf',
    name: 'Education Support Scheme Fund',
    provider: 'Education Support Scheme Fund (ESSF)',
    description: 'Financial support for Nigerian students in need of assistance to pursue tertiary education.',
    eligibility: 'Must be a Nigerian citizen, admitted to a recognized tertiary institution, and demonstrate financial need.',
    deadline: 'Ongoing',
    location: 'Nigeria',
    studyLevel: 'Undergraduate',
    field: 'All Fields',
    applicationUrl: 'https://www.essf.gov.ng',
    source: 'Federal Government of Nigeria',
    status: 'verified',
  },
  {
    id: 'chevening',
    name: 'Chevening Scholarship',
    provider: 'UK Foreign, Commonwealth and Development Office',
    description: 'UK government\'s global scholarship programme for future leaders to study postgraduate courses in the United Kingdom.',
    eligibility: 'Must be a Nigerian citizen, have a first degree, and have at least 2 years of work experience.',
    deadline: 'November 2025',
    location: 'United Kingdom',
    studyLevel: 'Postgraduate',
    field: 'All Fields',
    applicationUrl: 'https://www.chevening.org',
    source: 'UK Government Official Website',
    status: 'verified',
  },
  {
    id: 'african-leaders',
    name: 'African Leaders of Tomorrow Scholarship',
    provider: 'Government of Canada',
    description: 'Scholarship for African students to pursue master\'s degrees in Canada.',
    eligibility: 'Must be a citizen of an African country, have a first degree, and meet academic requirements.',
    deadline: 'February 2025',
    location: 'Canada',
    studyLevel: 'Postgraduate',
    field: 'All Fields',
    applicationUrl: 'https://www.canada.ca/en/immigration-refugees-citizenship',
    source: 'Government of Canada Official Website',
    status: 'verified',
  },
  {
    id: 'google-scholarship',
    name: 'Google Career Certificates Scholarship',
    provider: 'Google',
    description: 'Scholarship for African learners to gain in-demand digital skills through Google Career Certificates on Coursera.',
    eligibility: 'Must be at least 18 years old, have a device and internet access, and be based in an eligible African country.',
    deadline: 'Ongoing',
    location: 'Online',
    studyLevel: 'Professional',
    field: 'Technology / Digital Skills',
    applicationUrl: 'https://grow.google/scholarships',
    source: 'Google Official Website',
    status: 'verified',
  },
]
