export interface Institution {
  id: string
  name: string
  slug: string
  type: 'University' | 'Polytechnic' | 'College' | 'Technical Institution' | 'Vocational Training Centre'
  location: string
  website: string
  courses: string[]
  admissionInformation: string
  accreditationInformation: string
}

export const institutions: Institution[] = [
  {
    id: 'unilag',
    name: 'University of Lagos',
    slug: 'university-of-lagos',
    type: 'University',
    location: 'Lagos, Nigeria',
    website: 'https://www.unilag.edu.ng',
    courses: ['Computer Science', 'Accounting', 'Law', 'Economics', 'Medicine', 'Mass Communication'],
    admissionInformation: 'JAMB UTME with minimum of 200 points, O-Level credits in relevant subjects, and post-UTME screening.',
    accreditationInformation: 'Accredited by the National Universities Commission (NUC) and approved by the National Board for Technical Education (NBTE) where applicable.',
  },
  {
    id: 'futa',
    name: 'Federal University of Technology Akure',
    slug: 'federal-university-of-technology-akure',
    type: 'University',
    location: 'Akure, Nigeria',
    website: 'https://www.futa.edu.ng',
    courses: ['Computer Science', 'Engineering', 'Mathematics', 'Physics', 'Chemistry'],
    admissionInformation: 'JAMB UTME with minimum of 200 points, O-Level credits in Mathematics, Physics, and Chemistry.',
    accreditationInformation: 'Accredited by the National Universities Commission (NUC).',
  },
  {
    id: 'yaba-tech',
    name: 'Yaba College of Technology',
    slug: 'yaba-college-of-technology',
    type: 'Polytechnic',
    location: 'Lagos, Nigeria',
    website: 'https://www.yabatech.edu.ng',
    courses: ['Computer Science', 'Information Technology', 'Engineering', 'Mass Communication'],
    admissionInformation: 'O-Level credits in relevant subjects, JAMB result, and polytechnic screening process.',
    accreditationInformation: 'Accredited by the National Board for Technical Education (NBTE).',
  },
  {
    id: 'federal-poly-ekiti',
    name: 'Federal Polytechnic Ado-Ekiti',
    slug: 'federal-poly-ado-ekiti',
    type: 'Polytechnic',
    location: 'Ado-Ekiti, Nigeria',
    website: 'https://www.fedpolyado.edu.ng',
    courses: ['Computer Science', 'Information Technology', 'Business Administration', 'Accounting'],
    admissionInformation: 'O-Level credits in relevant subjects, JAMB result, and polytechnic screening.',
    accreditationInformation: 'Accredited by the National Board for Technical Education (NBTE).',
  },
  {
    id: 'coea',
    name: 'College of Education, Abeokuta',
    slug: 'college-of-education-abeokuta',
    type: 'College',
    location: 'Abeokuta, Nigeria',
    website: 'https://www.coea.edu.ng',
    courses: ['Education', 'English Language', 'Mathematics Education', 'Science Education'],
    admissionInformation: 'O-Level credits including English and Mathematics. NCE programme requires relevant subject combinations.',
    accreditationInformation: 'Accredited by the National Commission for Colleges of Education (NCCE).',
  },
  {
    id: 'kwara-state-poly',
    name: 'Kwara State Polytechnic',
    slug: 'kwara-state-polytechnic',
    type: 'Polytechnic',
    location: 'Ilorin, Nigeria',
    website: 'https://www.kwapoly.edu.ng',
    courses: ['Computer Science', 'Business Administration', 'Accounting', 'Mass Communication'],
    admissionInformation: 'O-Level credits in relevant subjects, JAMB result, and polytechnic screening.',
    accreditationInformation: 'Accredited by the National Board for Technical Education (NBTE).',
  },
  {
    id: 'alx',
    name: 'Andela Learning City',
    slug: 'andalearningcity',
    type: 'Technical Institution',
    location: 'Lagos, Nigeria',
    website: 'https://andela.com',
    courses: ['Software Engineering', 'Web Development', 'Data Science'],
    admissionInformation: 'Application and interview process. No JAMB result required. Focus on aptitude and passion for technology.',
    accreditationInformation: 'Industry-recognized certifications. Partners with global tech companies.',
  },
  {
    id: 'gmic',
    name: 'General Assembly Lagos',
    slug: 'general-assembly-lagos',
    type: 'Technical Institution',
    location: 'Lagos, Nigeria',
    website: 'https://generalassemb.ly',
    courses: ['Web Development', 'Data Analysis', 'UX Design', 'Digital Marketing'],
    admissionInformation: 'Application and interview process. Bootcamp-style intensive learning programmes.',
    accreditationInformation: 'Industry-recognized certifications. Global network of tech education providers.',
  },
]
