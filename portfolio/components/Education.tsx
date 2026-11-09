


import { GraduationCap } from "lucide-react";
import { education } from "@/data/portfolio";
import Image from "next/image";

const certificateGallery = [
  { title: "Modern Web Application Development with MERN Stack", issuer: "KAHE · KGiSL MicroCollege", date: "5–9 January 2026 · 30 hours", file: "certificate-1.jpeg" },
  { title: "Acquiring Data", issuer: "FutureSkills Prime · nasscom", date: "16 March 2026", file: "certificate-2.jpeg" },
  { title: "Data Science & Analytics", issuer: "HP LIFE · HP Foundation", date: "2025", file: "certificate-3.jpeg" },
  { title: "Python Flask Development with Docker", issuer: "Alison", date: "15 April 2026", file: "certificate-4.jpeg" },
  { title: "Machine Learning with Artificial Intelligence", issuer: "Alison", date: "16 April 2026", file: "certificate-5.jpeg" },
];

export default function Education() {
 return <section id="education" className="section-padding">
  <div style={{maxWidth:1280,margin:"0 auto"}}>
   <p className="section-label">Academic foundations</p><h2 className="section-title">Education & Certifications</h2>
   <article className="card" style={{marginTop:28,maxWidth:800}}>
    <GraduationCap size={28} aria-hidden="true" />
    <h3 style={{fontSize:22,fontWeight:650,marginTop:16}}>{education.degree.title}</h3>
    <p style={{color:"var(--accent)",marginTop:10}}>{education.degree.institution}</p>
    <p style={{color:"var(--text-secondary)",marginTop:10}}>{education.degree.duration} · {education.degree.location}</p>
    <p style={{color:"var(--text-secondary)",marginTop:16,lineHeight:1.8}}>{education.degree.description}</p>
   </article>
  </div>
      <div id="certificates" className="certificate-gallery" style={{ maxWidth: "1280px", margin: "3rem auto 0", scrollMarginTop: "100px" }}>
        <h3 style={{ fontSize: "1.4rem", fontWeight: 700, marginBottom: "1.5rem" }}>Certificate Gallery</h3>
        <div className="certificate-gallery-grid">
          {certificateGallery.map(cert => <article className="certificate-gallery-card" key={cert.file}>
            <a className="certificate-preview" href={`/certificates/${cert.file}`} target="_blank" rel="noopener noreferrer" aria-label={`View certificate: ${cert.title}`}>
              <Image src={`/certificates/${cert.file}`} alt={`${cert.title} certificate awarded to Bebin`} fill sizes="(max-width: 700px) 90vw, (max-width: 1100px) 45vw, 380px" style={{ objectFit: "contain" }} />
            </a>
            <div className="certificate-details">
              <h4>{cert.title}</h4><p>{cert.issuer}</p><p className="certificate-date">{cert.date}</p>
              <a href={`/certificates/${cert.file}`} target="_blank" rel="noopener noreferrer" aria-label={`View certificate ↗: ${cert.title}`}>View certificate ↗</a>
            </div>
          </article>)}
        </div>
      </div>

 </section>;
}
