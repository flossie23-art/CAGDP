# AGENTS.md

# Graduate Career Guidance & Opportunity Platform

## 1. PROJECT IDENTITY

**Project Name:** Graduate Career Guidance & Opportunity Platform

**Project Type:** Web Application

**Primary Audience:** Secondary-school graduates, recent graduates, students preparing for tertiary education, career changers, educators, and guidance counselors.

**Primary Geographic Context:** Nigeria

**Primary Goal:**

Build a web platform that helps graduates understand their interests, strengths, subjects, goals, and preferences, and then uses that information to suggest relevant:

* University courses
* Polytechnics and colleges
* Vocational and technical skills
* Career paths
* Online courses
* Entry-level opportunities
* Scholarships
* Admission resources

The platform must be educational, accessible, explainable, mobile-friendly, and easy to maintain.

---

# 2. ROLE OF THE CODING AGENT

You are the primary software engineering agent responsible for designing and implementing this project.

Act as a senior full-stack engineer, software architect, UI/UX engineer, database designer, QA engineer, and technical reviewer.

You must:

1. Understand the requirements before implementing them.
2. Follow the architecture defined in this document.
3. Write maintainable and readable code.
4. Avoid unnecessary complexity.
5. Prefer simple solutions over premature optimization.
6. Validate assumptions before introducing dependencies.
7. Never silently change major architectural decisions.
8. Never remove working functionality without a clear reason.
9. Keep the application responsive.
10. Prioritize accessibility.
11. Write reusable components.
12. Validate all user input.
13. Handle errors gracefully.
14. Protect user data.
15. Test important functionality before considering it complete.
16. Keep documentation synchronized with implementation.

---

# 3. CORE PRODUCT VISION

The application should answer one fundamental question:

> "Based on who I am, what I enjoy, what I am good at, and what I want to achieve, what educational and career opportunities might be suitable for me?"

The system should NOT simply output a random list of careers.

It should explain recommendations using information supplied by the user.

For example:

A graduate indicates:

* Enjoys Mathematics
* Enjoys Computer Science
* Likes solving problems
* Enjoys working with technology
* Prefers analytical work
* Wants a technology career

The platform may recommend:

### Career Paths

* Software Engineering
* Data Analysis
* Cybersecurity
* Data Science
* Systems Analysis

### Courses

* Computer Science
* Software Engineering
* Information Technology
* Cybersecurity
* Statistics

### Skills

* Python
* SQL
* Web Development
* Networking
* Data Analysis

The recommendation system should also explain WHY each recommendation was made.

---

# 4. DEVELOPMENT PRINCIPLES

The following principles are mandatory.

## 4.1 Simplicity

Prefer:

```text
Simple + maintainable
```

over:

```text
Complex + clever
```

Do not introduce advanced architecture unless there is a demonstrated need.

---

## 4.2 Mobile First

The application must work well on:

* Mobile phones
* Tablets
* Laptops
* Desktop computers

Mobile responsiveness is not optional.

Design mobile layouts first, then expand for larger screens.

---

## 4.3 Accessibility

Follow accessible web-development practices.

The application should support:

* Keyboard navigation
* Semantic HTML
* Visible focus states
* Accessible labels
* Sufficient contrast
* Screen readers
* Appropriate heading hierarchy
* Accessible forms
* Error messages that clearly explain problems

Do not rely exclusively on color to communicate information.

---

## 4.4 Performance

Avoid unnecessary:

* JavaScript
* API calls
* database queries
* image sizes
* dependencies
* re-renders

Optimize only after identifying an actual performance problem.

---

## 4.5 Security

Never trust user input.

Validate and sanitize data on the server.

Never expose:

* API keys
* database credentials
* secret tokens
* private environment variables

Never commit `.env` files containing secrets.

---

# 5. TARGET USERS

The platform should support several user types.

## 5.1 Graduate / Student

Can:

* Create an account
* Complete an interest assessment
* View recommendations
* Explore careers
* Explore courses
* Explore institutions
* Explore scholarships
* Save opportunities
* Track interests
* Update their profile

---

## 5.2 Counselor / Educator

Potential future functionality:

* View anonymized student trends
* Help students interpret results
* Share resources
* Provide guidance

Do not implement counselor functionality unless explicitly requested.

---

## 5.3 Administrator

Administrators may eventually manage:

* Courses
* Institutions
* Careers
* Scholarships
* Online courses
* Opportunities
* Questionnaire questions
* Recommendation rules

Build the application in a way that allows this functionality to be added later.

---

# 6. PRIMARY USER JOURNEY

The main user journey should be:

```text
Landing Page
      ↓
Create Account / Continue as Guest
      ↓
Career Questionnaire
      ↓
Questionnaire Results
      ↓
Recommendation Engine
      ↓
Recommended Careers
      ↓
Recommended Courses
      ↓
Recommended Institutions
      ↓
Recommended Skills
      ↓
Online Learning Opportunities
      ↓
Scholarships / Admission Resources
```

The experience should feel progressive rather than overwhelming.

---

# 7. REQUIRED FEATURES

## 7.1 Landing Page

The landing page must communicate:

1. What the platform does.
2. Who it is for.
3. How it works.
4. Why recommendations are useful.
5. A clear call-to-action.

Primary CTA:

> "Find My Career Path"

Secondary CTA:

> "Explore Careers"

Suggested sections:

```text
Hero
↓
How It Works
↓
What We Recommend
↓
Popular Career Areas
↓
Educational Opportunities
↓
Scholarships
↓
Call To Action
↓
Footer
```

---

# 8. CAREER-INTEREST QUESTIONNAIRE

The questionnaire is the core feature.

It must collect enough information to produce meaningful recommendations without becoming unnecessarily long.

Organize questions into categories.

## 8.1 Interest

Examples:

* Which subjects do you enjoy?
* What activities do you enjoy?
* What topics do you naturally research?
* What type of problems do you enjoy solving?

Possible categories:

```text
Technology
Science
Mathematics
Business
Arts
Communication
Healthcare
Engineering
Education
Law
Agriculture
Media
Design
Social Sciences
Trades
```

---

## 8.2 Strengths

Ask users to identify strengths such as:

* Problem solving
* Communication
* Creativity
* Leadership
* Organization
* Numerical reasoning
* Critical thinking
* Teamwork
* Writing
* Technical thinking
* Practical/manual skills

---

## 8.3 Subjects

Allow users to select subjects they:

* Enjoy
* Perform well in
* Want to study further

Example:

```text
Mathematics
English
Physics
Chemistry
Biology
Computer Science
Economics
Government
Geography
Literature
Accounting
Agricultural Science
Technical Drawing
```

---

## 8.4 Work Preferences

Ask questions such as:

* Do you prefer working with people or technology?
* Do you prefer practical or theoretical work?
* Do you prefer independent or team-based work?
* Do you prefer indoor or outdoor work?
* Do you enjoy solving structured problems?
* Do you enjoy creating things?

---

## 8.5 Career Goals

Ask:

* What type of career interests you?
* What industries interest you?
* Do you want to start working quickly?
* Are you interested in university education?
* Are you interested in technical training?
* Would you consider remote work?
* Are you interested in entrepreneurship?

---

# 9. QUESTIONNAIRE UX REQUIREMENTS

The questionnaire must NOT display every question on one giant page.

Use a multi-step flow.

Example:

```text
Step 1 / 6
Interests

Step 2 / 6
Strengths

Step 3 / 6
Subjects

Step 4 / 6
Work Preferences

Step 5 / 6
Goals

Step 6 / 6
Review
```

Display a progress indicator.

Example:

```text
████████░░░░ 65%
```

The user must be able to:

* Go back
* Continue
* Review answers
* Change answers
* Submit

Do not lose questionnaire data when navigating between steps.

---

# 10. RECOMMENDATION ENGINE

The recommendation engine is the most important technical component.

Do NOT initially use an unnecessarily complex AI model.

Start with a transparent rule-based scoring system.

Example:

```text
Career: Software Engineering

Mathematics interest       +20
Computer Science interest  +25
Problem solving            +20
Technology interest        +15
Analytical thinking        +15
Programming interest       +20

Total Score = 115
```

Normalize scores where appropriate.

---

# 11. RECOMMENDATION MODEL

Every career should have associated attributes.

Example:

```json
{
  "career": "Software Engineer",
  "subjects": [
    "Mathematics",
    "Computer Science",
    "Physics"
  ],
  "interests": [
    "Technology",
    "Problem Solving",
    "Programming"
  ],
  "strengths": [
    "Logical Thinking",
    "Problem Solving",
    "Analytical Thinking"
  ],
  "skills": [
    "Programming",
    "Git",
    "Databases",
    "Web Development"
  ],
  "courses": [
    "Computer Science",
    "Software Engineering",
    "Information Technology"
  ]
}
```

---

# 12. RECOMMENDATION OUTPUT

Never show recommendations without context.

Each recommendation should include:

### Career

**Software Engineering**

### Match

**Strong Match**

### Why?

```text
You selected Mathematics and Computer Science,
and indicated that you enjoy solving technical
problems and working with technology.
```

### Related Courses

* Computer Science
* Software Engineering
* Information Technology

### Skills to Learn

* Python
* JavaScript
* Git
* SQL

### Learn More

Button:

> Explore Career

---

# 13. MATCH LEVELS

Use descriptive categories rather than pretending the system has perfect certainty.

Possible categories:

```text
Strong Match
Good Match
Possible Match
Explore Further
```

Do not present recommendations as guaranteed career outcomes.

The platform provides guidance, not certainty.

---

# 14. CAREER DATABASE

Create a structured career dataset.

Each career should contain:

```text
id
name
slug
description
industry
requiredSkills
recommendedSubjects
recommendedInterests
recommendedStrengths
relatedCourses
educationRequirements
entryPaths
workEnvironment
salaryInformation
growthInformation
resources
```

Avoid hardcoding career information directly inside UI components.

---

# 15. COURSE DATABASE

Courses should contain:

```text
id
name
slug
description
field
subjects
careerPaths
institutions
entryRequirements
duration
qualification
```

Examples:

```text
Computer Science
Software Engineering
Accounting
Economics
Medicine
Nursing
Engineering
Mass Communication
Agriculture
Education
Architecture
Law
Statistics
```

Do not assume that every institution offers every course.

---

# 16. INSTITUTION DATABASE

Institutions should support:

```text
name
type
location
website
courses
admissionInformation
accreditationInformation
```

Institution types:

```text
University
Polytechnic
College
Technical Institution
Vocational Training Centre
```

When institutional information may change, design the system so it can be updated without modifying application code.

---

# 17. NIGERIAN EDUCATION CONTEXT

The platform is primarily intended for Nigerian users.

The architecture should accommodate Nigerian educational pathways including:

```text
University
Polytechnic
College of Education
Technical/Vocational Education
Professional Training
Online Learning
Apprenticeship / Skills Training
```

Where admission information is provided, distinguish between:

* General guidance
* Institution-specific requirements
* Official admission requirements

Never present outdated admission requirements as current.

Official sources should be preferred when available.

---

# 18. SCHOLARSHIP FEATURE

Scholarship records should contain:

```text
id
name
provider
description
eligibility
deadline
location
studyLevel
field
applicationUrl
source
status
```

The UI should clearly display:

```text
Deadline
Eligibility
Study Level
Field
Provider
Application Link
```

Never fabricate scholarship information.

If scholarship data is not verified, label it accordingly or exclude it.

---

# 19. ONLINE COURSE FEATURE

Online courses should contain:

```text
id
title
provider
description
skillArea
level
duration
price
url
```

Possible skill areas:

```text
Programming
Data Analysis
Cybersecurity
Digital Marketing
Graphic Design
UI/UX
Cloud Computing
Networking
Business
Communication
Entrepreneurship
```

---

# 20. ENTRY-LEVEL OPPORTUNITIES

The platform may eventually include:

* Internships
* Apprenticeships
* Graduate programs
* Entry-level jobs
* Volunteer opportunities
* Freelance opportunities

Opportunity records should contain:

```text
title
organization
type
location
remote
description
requirements
deadline
applicationUrl
source
```

Do not fabricate jobs or opportunities.

---

# 21. SEARCH

The application should eventually provide global search.

Users should be able to search:

```text
Careers
Courses
Institutions
Scholarships
Skills
Opportunities
```

Search should support:

* Exact matches
* Partial matches
* Case-insensitive searching
* Relevant filtering

---

# 22. FILTERS

Where appropriate, provide filters such as:

### Career

* Industry
* Education level
* Skill area
* Interest

### Institution

* Institution type
* Location
* Course

### Scholarship

* Study level
* Field
* Deadline
* Eligibility

### Courses

* Field
* Institution type
* Career path

---

# 23. USER ACCOUNT

Users should eventually have:

```text
Profile
Questionnaire History
Recommendations
Saved Careers
Saved Courses
Saved Institutions
Saved Scholarships
Saved Opportunities
```

The application must not require account creation before the user can understand the product.

Prefer allowing the questionnaire to be completed as a guest.

Prompt the user to create an account when they want to:

* Save results
* Save opportunities
* Track recommendations
* Return later

---

# 24. DATABASE DESIGN

Keep database models normalized enough to avoid excessive duplication.

Suggested conceptual entities:

```text
User
Profile
Questionnaire
Question
QuestionOption
QuestionnaireResponse
Career
Course
Institution
Scholarship
OnlineCourse
Opportunity
Skill
Recommendation
SavedItem
```

Relationships should be explicit.

Avoid storing large JSON blobs when a relational structure is more appropriate.

However, JSON may be used for flexible questionnaire metadata when justified.

---

# 25. FRONTEND ARCHITECTURE

Use a component-based architecture.

Suggested structure:

```text
src/
├── components/
│   ├── ui/
│   ├── questionnaire/
│   ├── career/
│   ├── course/
│   ├── institution/
│   ├── scholarship/
│   └── opportunity/
│
├── pages/
│
├── layouts/
│
├── hooks/
│
├── services/
│
├── utils/
│
├── data/
│
├── types/
│
└── styles/
```

Adjust this structure if the selected framework has a better convention.

Do not force this exact structure onto frameworks where it conflicts with established conventions.

---

# 26. COMPONENT RULES

Components should have a single clear responsibility.

Avoid giant components such as:

```text
CareerPage.tsx
```

containing hundreds or thousands of lines.

Instead use:

```text
CareerHeader
CareerDescription
CareerSkills
CareerEducation
CareerPath
CareerResources
```

---

# 27. UI DESIGN SYSTEM

The interface should feel:

* Modern
* Trustworthy
* Educational
* Friendly
* Professional
* Simple
* Accessible

Avoid excessive visual effects.

Avoid:

* Excessive gradients
* Excessive animations
* Cluttered dashboards
* Tiny text
* Poor contrast
* Overuse of cards
* Unnecessary popups

---

# 28. COLOR SYSTEM

Define colors centrally.

Example conceptual palette:

```text
Primary
Secondary
Background
Surface
Text
Muted Text
Success
Warning
Error
Border
```

Do not scatter arbitrary color values throughout components.

Use design tokens or CSS variables.

---

# 29. TYPOGRAPHY

Use a readable font system.

Maintain a clear hierarchy:

```text
H1
H2
H3
Body
Small
Caption
```

Do not use excessively small body text.

---

# 30. RESPONSIVE BREAKPOINTS

The interface must be tested at approximately:

```text
320px
375px
414px
768px
1024px
```
