import type {MetadataRoute} from 'next';
import {portfolioUrl,portraitUrl} from '@/lib/identity';

export default function sitemap():MetadataRoute.Sitemap{
  return [
    {url:portfolioUrl+'/',images:[portraitUrl]},
    {url:portfolioUrl+'/writing/kahe-task-workflow'},
  ];
}
