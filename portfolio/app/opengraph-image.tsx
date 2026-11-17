import { ImageResponse } from "next/og";
import {readFile} from "node:fs/promises";
import {join} from "node:path";
export const alt = "Bebin R — AI & Data Science student, full-stack projects and machine learning";
export const size = { width:1200, height:630 };
export const contentType = "image/png";
export default async function SocialImage() {
 const photo=await readFile(join(process.cwd(),"public/images/bebin-r.png"));
 return new ImageResponse(<div style={{width:"100%",height:"100%",display:"flex",alignItems:"center",gap:60,padding:60,background:"#071428",color:"#f5f6ff"}}>
  {/* A real portrait keeps this preview tied to the person named on the page. */}
  {/* eslint-disable-next-line @next/next/no-img-element */}
  <img src={"data:image/png;base64,"+photo.toString("base64")} alt="Bebin R" width={400} height={510} style={{objectFit:"cover",borderRadius:28}}/>
  <div style={{display:"flex",flexDirection:"column",flex:1}}>
   <div style={{display:"flex",fontSize:76,fontWeight:700}}>Bebin R</div>
   <div style={{display:"flex",fontSize:30,marginTop:24,color:"#8cdded"}}>Founder of Bebin Tech</div>
   <div style={{display:"flex",fontSize:28,marginTop:28}}>Full Stack Development</div>
   <div style={{display:"flex",fontSize:28,marginTop:12}}>AI & Data Science</div>
   <div style={{display:"flex",fontSize:23,marginTop:48,color:"#c4c5e2"}}>bebin-tech.vercel.app</div>
  </div>
 </div>,size);
}
