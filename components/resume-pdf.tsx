"use client"
import { Document, Page, Text, View, StyleSheet, Font } from "@react-pdf/renderer"

// Register fonts
Font.register({
  family: "Roboto",
  fonts: [
    {
      src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-regular-webfont.ttf",
      fontWeight: 400,
    },
    { src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-bold-webfont.ttf", fontWeight: 700 },
  ],
})

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#FFFFFF",
    padding: 30,
    fontFamily: "Roboto",
  },
  header: {
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 700,
    marginBottom: 5,
  },
  title: {
    fontSize: 14,
    marginBottom: 10,
  },
  contact: {
    fontSize: 12,
    marginBottom: 5,
  },
  section: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 700,
    marginBottom: 10,
    borderBottom: "1px solid #10b981",
    paddingBottom: 3,
  },
  experienceItem: {
    marginBottom: 10,
  },
  experienceTitle: {
    fontSize: 14,
    fontWeight: 700,
  },
  experiencePeriod: {
    fontSize: 12,
    fontStyle: "italic",
    marginBottom: 5,
  },
  bulletPoint: {
    flexDirection: "row",
    marginBottom: 3,
  },
  bullet: {
    width: 10,
    fontSize: 12,
  },
  bulletText: {
    flex: 1,
    fontSize: 12,
  },
  skillItem: {
    flexDirection: "row",
    marginBottom: 5,
  },
  skillBullet: {
    width: 10,
    fontSize: 12,
  },
  skillText: {
    flex: 1,
    fontSize: 12,
  },
})

// Create Document Component
const ResumePDF = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.name}>Forget Nukeri</Text>
        <Text style={styles.title}>Software Developer/Engineer | IT (Final Year) Student | Tech Secure</Text>
        <Text style={styles.contact}>Gauteng | (+27)762852630 | nhlamuloftee@gmail.com</Text>
        <Text style={styles.contact}>Forget (F-tee) Nukeri | LinkedIn</Text>
      </View>

      {/* Skills Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>SKILLS</Text>
        <View style={styles.skillItem}>
          <Text style={styles.skillBullet}>●</Text>
          <Text style={styles.skillText}>Programming Languages: Python, C#, C++, SQL</Text>
        </View>
        <View style={styles.skillItem}>
          <Text style={styles.skillBullet}>●</Text>
          <Text style={styles.skillText}>Technical Skills: Threat Detection, Discrete Mathematics</Text>
        </View>
        <View style={styles.skillItem}>
          <Text style={styles.skillBullet}>●</Text>
          <Text style={styles.skillText}>Soft Skills: Problem Solving, Effective Communication</Text>
        </View>
      </View>

      {/* Experience Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>EXPERIENCE</Text>

        <View style={styles.experienceItem}>
          <Text style={styles.experienceTitle}>Founder of FSolution.-Dev</Text>
          <Text style={styles.bulletText}>
            Innovative software developer and founder of FSolution.-Dev, specializing in cutting-edge technology
            solutions, cybersecurity, and IT consulting. Passionate about building scalable applications, optimizing
            tech infrastructure, and delivering secure, high-performance software.
          </Text>
        </View>

        <View style={styles.experienceItem}>
          <Text style={styles.experienceTitle}>Team Leader</Text>
          <Text style={styles.experiencePeriod}>
            RCL (Representative Council of Learners) – Public Relations Officer | 2019– 2021
          </Text>
          <View style={styles.bulletPoint}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.bulletText}>Managed team operations and coordinated public relations initiatives.</Text>
          </View>
        </View>

        <View style={styles.experienceItem}>
          <Text style={styles.experienceTitle}>
            North West University Vanderbijlpark - Marketing and Pro Officer (Gaza Nation Student Society)
          </Text>
          <Text style={styles.experiencePeriod}>August 2023 - July 2024</Text>
          <View style={styles.bulletPoint}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.bulletText}>Developing and Implementing Marketing Strategies</Text>
          </View>
          <View style={styles.bulletPoint}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.bulletText}>Building and Maintaining Public Relations</Text>
          </View>
          <View style={styles.bulletPoint}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.bulletText}>Conducting Market Research and Analysis</Text>
          </View>
        </View>

        <View style={styles.experienceItem}>
          <Text style={styles.experienceTitle}>North West University Vanderbiljpark - Student Assistant (Cmpg121)</Text>
          <Text style={styles.experiencePeriod}>July 2024 - November 2024</Text>
          <View style={styles.bulletPoint}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.bulletText}>Assisting in course material preparation</Text>
          </View>
          <View style={styles.bulletPoint}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.bulletText}>
              Supporting students with assignments and understanding course concepts
            </Text>
          </View>
          <View style={styles.bulletPoint}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.bulletText}>Providing technical help in various software tools and technologies</Text>
          </View>
          <View style={styles.bulletPoint}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.bulletText}>Collaborating with faculty to enhance the student learning experience</Text>
          </View>
        </View>
      </View>

      {/* Education Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>EDUCATION</Text>

        <View style={styles.experienceItem}>
          <Text style={styles.experienceTitle}>North-West University</Text>
          <Text style={styles.experiencePeriod}>
            Bachelor of Science (BSc) in Information Technology — Final Year | Feb 2022 – Present (Expected Graduation:
            2026)
          </Text>
          <View style={styles.bulletPoint}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.bulletText}>
              Currently pursuing a comprehensive curriculum covering software development, systems analysis, database
              management, and emerging technologies.
            </Text>
          </View>
          <View style={styles.bulletPoint}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.bulletText}>
              Final-year coursework includes advanced programming, cybersecurity, and IT project management.
            </Text>
          </View>
        </View>

        <View style={styles.experienceItem}>
          <Text style={styles.experienceTitle}>Matimu High School</Text>
          <Text style={styles.experiencePeriod}>National Senior Certificate | Jan 2016 - Dec 2020</Text>
          <Text style={styles.bulletText}>Highest grade passed: 12</Text>
          <Text style={styles.bulletText}>
            Subjects: Mathematics, English FAL, Life Sciences, Life Orientation, Physical Sciences, Geography, Xitsonga
            HL
          </Text>
          <Text style={styles.bulletText}>Year: 2020</Text>
        </View>
      </View>

      {/* Certificates Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>CERTIFICATES & LINKS</Text>
        <Text style={styles.bulletText}>LinkedIn Certificates</Text>
        <Text style={styles.bulletText}>Github link: Github Account</Text>
      </View>

      {/* Software Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>SOFTWARE</Text>
        <View style={styles.bulletPoint}>
          <Text style={styles.bullet}>•</Text>
          <Text style={styles.bulletText}>Python, C++, Java, React</Text>
        </View>
        <View style={styles.bulletPoint}>
          <Text style={styles.bullet}>•</Text>
          <Text style={styles.bulletText}>Microsoft Office</Text>
        </View>
        <View style={styles.bulletPoint}>
          <Text style={styles.bullet}>•</Text>
          <Text style={styles.bulletText}>Excel</Text>
        </View>
        <View style={styles.bulletPoint}>
          <Text style={styles.bullet}>•</Text>
          <Text style={styles.bulletText}>MySql Work-Bench</Text>
        </View>
        <View style={styles.bulletPoint}>
          <Text style={styles.bullet}>•</Text>
          <Text style={styles.bulletText}>Visual Studio Code</Text>
        </View>
      </View>

      {/* Languages Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>LANGUAGES</Text>
        <Text style={styles.bulletText}>English | Tsonga | Zulu</Text>
      </View>
    </Page>
  </Document>
)

export default ResumePDF

