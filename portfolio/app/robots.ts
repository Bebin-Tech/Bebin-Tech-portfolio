import type {MetadataRoute} from 'next';
import {portfolioUrl} from '@/lib/identity';

export default function robots():MetadataRoute.Robots{
  return {rules:{userAgent:'*',allow:'/'},sitemap:portfolioUrl+'/sitemap.xml'};
}
