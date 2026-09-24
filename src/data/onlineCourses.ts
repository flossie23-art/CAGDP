export interface OnlineCourse {
  id: string
  title: string
  provider: string
  description: string
  skillArea: string
  level: 'Beginner' | 'Intermediate' | 'Advanced'
  duration: string
  price: string
  url: string
}

export const onlineCourses: OnlineCourse[] = [
  {
    id: 'python-101',
    title: 'Python for Everybody',
    provider: 'Coursera / University of Michigan',
    description: 'Learn Python programming from the ground up. Covers data structures, web scraping, and databases.',
    skillArea: 'Programming',
    level: 'Beginner',
    duration: '8 weeks',
    price: 'Free (with certificate option)',
    url: 'https://www.coursera.org/specializations/python',
  },
  {
    id: 'web-dev',
    title: 'The Web Developer Bootcamp',
    provider: 'Udemy',
    description: 'Comprehensive web development course covering HTML, CSS, JavaScript, Node.js, and databases.',
    skillArea: 'Programming',
    level: 'Beginner',
    duration: '50 hours',
    price: '₦2,000 - ₦5,000',
    url: 'https://www.udemy.com/course/the-web-developer-bootcamp/',
  },
  {
    id: 'data-analysis',
    title: 'Data Analysis with Python',
    provider: 'IBM / Coursera',
    description: 'Learn data analysis using Python, pandas, NumPy, and data visualization techniques.',
    skillArea: 'Data Analysis',
    level: 'Intermediate',
    duration: '10 weeks',
    price: 'Free (with certificate option)',
    url: 'https://www.coursera.org/professional-certificates/data-analysis',
  },
  {
    id: 'cybersecurity',
    title: 'Cybersecurity Fundamentals',
    provider: 'IBM / edX',
    description: 'Introduction to cybersecurity concepts, network security, and threat detection.',
    skillArea: 'Cybersecurity',
    level: 'Beginner',
    duration: '6 weeks',
    price: 'Free (with certificate option)',
    url: 'https://www.edx.org/course/cybersecurity-fundamentals',
  },
  {
    id: 'digital-marketing',
    title: 'Digital Marketing Specialization',
    provider: 'Coursera / University of Illinois',
    description: 'Learn digital marketing strategies including SEO, social media, email marketing, and content marketing.',
    skillArea: 'Digital Marketing',
    level: 'Beginner',
    duration: '8 months',
    price: 'Free (with certificate option)',
    url: 'https://www.coursera.org/specializations/digital-marketing',
  },
  {
    id: 'ui-ux',
    title: 'UI/UX Design Specialization',
    provider: 'CalArts / Coursera',
    description: 'Learn the fundamentals of UI/UX design, user research, wireframing, and prototyping.',
    skillArea: 'UI/UX',
    level: 'Beginner',
    duration: '8 months',
    price: 'Free (with certificate option)',
    url: 'https://www.coursera.org/specializations/ui-ux-design',
  },
  {
    id: 'cloud-computing',
    title: 'Cloud Computing with AWS',
    provider: 'AWS / Coursera',
    description: 'Learn cloud computing concepts, AWS services, and deployment strategies.',
    skillArea: 'Cloud Computing',
    level: 'Intermediate',
    duration: '6 weeks',
    price: 'Free (with certificate option)',
    url: 'https://www.coursera.org/specializations/aws-cloud-practitioner',
  },
  {
    id: 'networking',
    title: 'Computer Networking',
    provider: 'Google / Coursera',
    description: 'Learn the fundamentals of computer networks, TCP/IP, and network administration.',
    skillArea: 'Networking',
    level: 'Beginner',
    duration: '4 weeks',
    price: 'Free (with certificate option)',
    url: 'https://www.coursera.org/learn/computer-networking',
  },
  {
    id: 'entrepreneurship',
    title: 'Entrepreneurship Specialization',
    provider: 'Coursera / University of Pennsylvania',
    description: 'Learn the fundamentals of entrepreneurship, business planning, and venture creation.',
    skillArea: 'Entrepreneurship',
    level: 'Beginner',
    duration: '6 months',
    price: 'Free (with certificate option)',
    url: 'https://www.coursera.org/specializations/entrepreneurship',
  },
  {
    id: 'communication',
    title: 'Business Communication',
    provider: 'University of Washington / Coursera',
    description: 'Develop professional communication skills including writing, presenting, and negotiating.',
    skillArea: 'Communication',
    level: 'Beginner',
    duration: '4 weeks',
    price: 'Free (with certificate option)',
    url: 'https://www.coursera.org/learn/business-communication',
  },
]
