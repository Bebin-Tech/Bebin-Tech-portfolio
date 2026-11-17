import {companyUrl} from '@/lib/identity';

export default function OfficialPresence(){
  return <section id="bebin-tech" className="section-padding">
    <div style={{maxWidth:1280,margin:'0 auto'}}>
      <p className="section-label">Company & official presence</p>
      <h2 className="section-title">Founder of Bebin Tech</h2>
      <p style={{maxWidth:800,color:'var(--text-secondary)',lineHeight:1.8,marginTop:20}}>
        I founded Bebin Tech to provide software projects and development services for students and businesses.
        Our work covers web applications, mobile applications, custom software and ERP solutions.
      </p>
      <div style={{display:'flex',flexWrap:'wrap',gap:16,marginTop:24}}>
        <a className="btn-primary" href={companyUrl+'/'}>Bebin Tech — company & project store ↗</a>
        <a className="btn-secondary" href={companyUrl+'/bebin-r'} rel="me">Bebin R — founder biography ↗</a>
      </div>
    </div>
  </section>;
}
