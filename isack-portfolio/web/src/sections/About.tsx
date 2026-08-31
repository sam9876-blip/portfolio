import { SectionHeading } from '../components/Reveal'

export default function About() {
  return (
    <section id="about" className="section relative">
      <div className="container-x">
        <SectionHeading
          eyebrow="About Me"
          title={<>About <span className="gradient-text">Me</span></>}
        />

        <div className="mx-auto max-w-3xl space-y-6 text-center">
          <p className="text-lg leading-relaxed text-slate-600 dark:text-slate-300">
            I am a Fullstack software developer with 3+ years experience in both Web and Native
            App development. My secondary skill is UI/UX Designer.
          </p>
          <p className="text-lg leading-relaxed text-slate-600 dark:text-slate-300">
            I strive to build awesome web and mobile applications, with great functionality
            through carefully crafted code and user-centric design. Am focused in dependable
            development, safety-critical development, real-time data sync in development,
            high-performance development.
          </p>
        </div>
      </div>
    </section>
  )
}
