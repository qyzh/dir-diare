interface ArtList {
    title: string,
    tagz: string,
    description: string,
    href?: string,
    imgSrc?: string,
  }
  
  const projectsData: ArtList[] = [
    {
      title: 'Tode Squad',
      tagz: 'Photoshop',
      description: `Logo yang dibuat dengan photoshop untuk Team TodeSquad.`,
      imgSrc: '/images/art/todesquad.jpg',
      href: 'work/todesquad',
    
    },
    {
      title: 'Hoppla Template',
      tagz: 'Template Blogger',
      description: `Template minimalist ini dapat anda gunakan pada blog anda dengan gratis.Pada template ini terdapat beberapa fitur yaitu, Responsive, HTML5, CSS3, dan beberapa lagi lainnya.`,
      imgSrc: '/images/art/hopplatemplate.png',
      href: 'work/hoppla',
    },
    {
      title: 'Rock n Troll Template',
      tagz: 'Template Blogger',
      description: `Template blogspot.`,
      imgSrc: '/images/art/rockntroll.png',
      href: 'work/rockntroll',
    },    
    {
        title: 'MinSim Template',
        tagz: 'Template Blogger',
        description: `Template yang kelihatan minimalist tapi elegant.`,
        imgSrc: '/images/art/minsim.png',
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
  