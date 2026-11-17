import {personalInfo} from '@/data/portfolio';

export const portfolioUrl='https://bebin-tech.vercel.app';
export const companyUrl='https://bebin-tech-projects.vercel.app';
export const personId=companyUrl+'/bebin-r#person';
export const organizationId=companyUrl+'/#organization';
export const portraitUrl=portfolioUrl+'/images/bebin-r.png';
export const identityDescription=personalInfo.bio+' He is also the founder of Bebin Tech, providing software projects and development services for students and businesses.';

export const identityGraph={
  '@context':'https://schema.org',
  '@graph':[
    {
      '@type':'Person','@id':personId,name:personalInfo.name,
      url:portfolioUrl+'/',image:portraitUrl,description:identityDescription,
      jobTitle:'Founder & Software Developer',
      sameAs:[companyUrl+'/bebin-r',personalInfo.github],
      worksFor:{'@id':organizationId},
      knowsAbout:['Full Stack Development','Web Development','Mobile App Development','Python','Machine Learning','ERP Solutions'],
      subjectOf:{'@id':companyUrl+'/bebin-r#profile'},
    },
    {
      '@type':'Organization','@id':organizationId,name:'Bebin Tech',
      url:companyUrl+'/',logo:companyUrl+'/bebin-logo.png',
      description:'Software projects and development services for students and businesses, including web applications, mobile applications and ERP solutions.',
      founder:{'@id':personId},sameAs:[personalInfo.github],
    },
    {
      '@type':'ProfilePage','@id':portfolioUrl+'/#profile',
      url:portfolioUrl+'/',name:'Bebin R — Developer & Founder of Bebin Tech',
      mainEntity:{'@id':personId},
      primaryImageOfPage:{'@type':'ImageObject',url:portraitUrl,contentUrl:portraitUrl,caption:'Bebin R — software developer and founder of Bebin Tech'},
    },
    {
      '@type':'WebSite','@id':portfolioUrl+'/#website',url:portfolioUrl+'/',
      name:'Bebin R',alternateName:'Bebin R Portfolio',publisher:{'@id':personId},
    },
  ],
};
