interface ArtList {
    title: string,
    tagz: string,
    description: string,
    href?: string,
    imgSrc?: string,
  }
  
  const projectsData: ArtList[] = [
    {
      title: 'Hoppla Template',
      tagz: 'Template Blogger',
      description: `Template blogspot dengan gaya simpel,responsive dan lainnya.`,
      imgSrc: '/images/art/hopplatemplate.png',
      href: 'work/hoppla',
    },
    {
      title: 'Rock n Troll Template',
      tagz: 'Template Blogger',
      description: `Template blogspot.`,
      imgSrc: '/images/art/rockntrolltemplate.png',
      href: 'work/rockntroll',
    },    
    {
        title: 'MinSim Template',
        tagz: 'Template Blogger',
        description: `Template blogspot yang didesign dengan gaya simpel dan memiliki beberapa fitur.`,
        imgSrc: '/images/art/minsimtemplate.png',
        href: 'work/minsim',
      },
    {
      title: 'Kopizine',
      tagz: 'HTML & CSS',
      description: `Sebuah keisengan membuat typograph.`,
      imgSrc: '/images/art/codepenkopizine.png',
      href: 'https://codepen.io/yourbaemyb/pen/bmPBxr',
    
    },
  ]
  
  export default projectsData
  