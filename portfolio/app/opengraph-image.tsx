import { ImageResponse } from "next/og";
export const alt = "Bebin R — AI & Data Science student, full-stack projects and machine learning";
export const size = { width:1200, height:630 };
export const contentType = "image/png";
export default function SocialImage() {
 return new ImageResponse(<div style={{width:"100%",height:"100%",display:"flex",flexDirection:"column",justifyContent:"center",padding:80,background:"linear-gradient(120deg,#071428,#302052)",color:"#f5f6ff"}}><div style={{display:"flex",fontSize:24,color:"#8cdded",marginBottom:32}}>BEBIN TECH · PORTFOLIO</div><div style={{display:"flex",fontSize:90,fontWeight:700}}>Bebin R</div><div style={{display:"flex",fontSize:34,marginTop:20}}>AI & Data Science · Full Stack Development</div><div style={{display:"flex",fontSize:24,marginTop:42,color:"#c4c5e2"}}>React · Django · Flask · Python</div></div>,size);
}
